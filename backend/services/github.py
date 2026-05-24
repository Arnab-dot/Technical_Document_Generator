import httpx
import re
import time
from typing import List, Dict, Optional

class GitHubRateLimitError(Exception):
    """Custom exception raised when GitHub API rate limits are exceeded."""
    def __init__(self, message: str, reset_time: Optional[int] = None):
        super().__init__(message)
        self.reset_time = reset_time

class GitHubService:
    def __init__(self, token: str):
        self.token = token
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        self.base_url = "https://api.github.com"
        
    def _check_response(self, response: httpx.Response):
        """
        Check response for errors. Handles rate limits gracefully by
        raising a custom exception containing the reset timestamp.
        """
        # GitHub returns 403 for rate limit exceeded (with x-ratelimit headers)
        if response.status_code in (403, 429) and "x-ratelimit-remaining" in response.headers:
            if response.headers["x-ratelimit-remaining"] == "0":
                # Get the Unix epoch reset time
                reset_time = int(response.headers.get("x-ratelimit-reset", time.time() + 3600))
                raise GitHubRateLimitError(
                    "GitHub API rate limit exceeded.",
                    reset_time=reset_time
                )
        
        # Raise standard HTTP errors for everything else
        response.raise_for_status()

    def _parse_pr_url(self, pr_url: str):
        """Extract owner, repo, and PR number from a GitHub PR URL."""
        match = re.match(r"https?://(?:www\.)?github\.com/([^/]+)/([^/]+)/pull/(\d+)", pr_url)
        if not match:
            raise ValueError("Invalid GitHub PR URL format. Expected: https://github.com/owner/repo/pull/123")
        return match.groups()

    def _parse_repo_url(self, repo_url: str):
        """Extract owner and repo from a GitHub repo URL."""
        match = re.match(r"https?://(?:www\.)?github\.com/([^/]+)/([^/]+)", repo_url)
        if not match:
            raise ValueError("Invalid GitHub Repository URL format. Expected: https://github.com/owner/repo")
        owner, repo = match.groups()
        # Remove trailing .git if present
        if repo.endswith(".git"):
            repo = repo[:-4]
        return owner, repo

    async def fetch_pr_files(self, pr_url: str) -> List[Dict[str, str]]:
        """
        Fetch files modified in a GitHub PR.
        Returns a list of dicts with: filename, patch, and status (e.g., added, modified, removed).
        """
        owner, repo, pr_number = self._parse_pr_url(pr_url)
        url = f"{self.base_url}/repos/{owner}/{repo}/pulls/{pr_number}/files"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            self._check_response(response)
            
            data = response.json()
            files = []
            for item in data:
                files.append({
                    "filename": item.get("filename", ""),
                    "patch": item.get("patch", ""),  # patch might be empty for binary files
                    "status": item.get("status", "")
                })
            return files

    async def fetch_raw_file(self, repo_url: str, file_path: str, ref: str = "main") -> str:
        """
        Fetch the raw content of a file from a GitHub repository.
        """
        owner, repo = self._parse_repo_url(repo_url)
        url = f"{self.base_url}/repos/{owner}/{repo}/contents/{file_path}"
        
        headers = self.headers.copy()
        # GitHub's custom Accept header to return raw file content directly
        headers["Accept"] = "application/vnd.github.v3.raw"
        
        params = {"ref": ref}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
            self._check_response(response)
            
            return response.text
