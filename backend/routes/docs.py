import os
import pathlib
from fastapi import APIRouter, HTTPException, status
from models.schemas import PRGenerateRequest, CodeGenerateRequest, DocGenerateResponse
from services.github import GitHubService, GitHubRateLimitError
from services.claude import ClaudeService
from utils.chunking import chunk_code, clean_git_patch

router = APIRouter(prefix="/docs", tags=["Documentation"])

ALLOWED_EXTENSIONS = {'.py', '.js', '.ts', '.java', '.go', '.rs', '.cpp', '.c', '.cs', '.rb'}

def get_services():
    github_token = os.getenv("GITHUB_TOKEN")
    anthropic_key = os.getenv("ANTHROPIC_API_KEY")
    if not github_token or not anthropic_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Server configuration error: Missing API keys in environment variables."
        )
    return GitHubService(token=github_token), ClaudeService(api_key=anthropic_key)

def get_prompts():
    """
    Load system and user prompts from the relative path assuming this runs 
    inside the Technical_Document_Generator structure.
    """
    base_dir = pathlib.Path(__file__).parent.parent.parent
    try:
        with open(base_dir / "prompts" / "system_prompt.txt", "r") as f:
            system_prompt = f.read()
        with open(base_dir / "prompts" / "user_prompt.txt", "r") as f:
            user_prompt = f.read()
        return system_prompt, user_prompt
    except Exception:
        # Graceful fallback if files are missing or pathing is incorrect
        return (
            "You are a senior software engineer writing internal technical documentation.",
            "File: {filename}\n{part_number}\n\nCode:\n```\n{code_content}\n```"
        )

@router.post("/generate/from-pr", response_model=list[DocGenerateResponse])
async def generate_from_pr(request: PRGenerateRequest):
    """
    Fetch a PR from GitHub, filter valid code files, chunk their diffs, 
    and generate comprehensive markdown documentation using Claude.
    """
    github_service, claude_service = get_services()
    system_prompt, user_prompt = get_prompts()
    
    try:
        pr_files = await github_service.fetch_pr_files(request.pr_url)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except GitHubRateLimitError as e:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail=f"{str(e)} Resets at: {e.reset_time}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=f"GitHub API Error: {str(e)}")

    results = []
    
    for file_info in pr_files:
        filename = file_info.get("filename", "")
        patch = file_info.get("patch", "")
        file_status = file_info.get("status", "")
        
        # Skip removed files or binary files with no patch
        if not filename or file_status == "removed" or not patch:
            continue
            
        ext = pathlib.Path(filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            continue
            
        cleaned_code = clean_git_patch(patch)
        if not cleaned_code.strip():
            continue
            
        # Chunk with max token equivalent of ~4000
        chunks = chunk_code(cleaned_code, max_tokens=4000)
        language = ext[1:] if len(ext) > 1 else "text"
        
        try:
            markdown_doc = await claude_service.generate_documentation(
                chunks=chunks,
                filename=filename,
                language=language,
                system_prompt=system_prompt,
                user_prompt_template=user_prompt
            )
            results.append(DocGenerateResponse(filename=filename, markdown=markdown_doc))
        except Exception as e:
            # We don't fail the entire PR if one file's generation fails
            results.append(DocGenerateResponse(filename=filename, markdown=f"Error generating documentation: {str(e)}"))

    return results

@router.post("/generate/from-code", response_model=list[DocGenerateResponse])
async def generate_from_code(request: CodeGenerateRequest):
    """
    Accepts raw code string directly, chunks it, and generates documentation using Claude.
    """
    _, claude_service = get_services()
    system_prompt, user_prompt = get_prompts()
    
    if not request.code.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Provided code string is empty.")
        
    chunks = chunk_code(request.code, max_tokens=4000)
    language = request.language if request.language else "text"
    
    try:
        markdown_doc = await claude_service.generate_documentation(
            chunks=chunks,
            filename=request.filename,
            language=language,
            system_prompt=system_prompt,
            user_prompt_template=user_prompt
        )
        return [DocGenerateResponse(filename=request.filename, markdown=markdown_doc)]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to generate documentation: {str(e)}")
