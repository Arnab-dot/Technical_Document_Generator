# DocDraft AI — FastAPI Backend

This is the FastAPI backend workspace for DocDraft AI (Technical Documentation Generator). It handles GitHub PR file retrieval, code sanitization and token-aware chunking, and interfaces with the Google Gemini API (`gemini-2.5-flash`) via the `google-genai` SDK to compile technical documentation.

For full system information, setup guides, and frontend setup instructions, please see the root [README.md](../README.md).

---

## Technical Highlights

- **FastAPI Framework**: Full async request handlers with CORSMiddleware configured for frontend communication.
- **Google GenAI Client Integration**: Uses the new `google-genai` Python library with robust exponential backoff retry mechanisms for handling rate limit exceptions or network timeouts.
- **Code-Sensitive Chunker**: Custom algorithm in `utils/chunking.py` that estimates tokens based on character boundaries and performs semantic split points (e.g., at blank lines between top-level declarations) to prevent breaking code blocks mid-function.
- **Git Patch Parser**: Extracts added or modified lines (lines starting with `+` excluding header `+++`) from git patches to generate documentation only on changed structures.

---

## Directory Overview

```text
backend/
├── models/
│   └── schemas.py          # Request and Response Pydantic models
├── routes/
│   └── docs.py             # Route controller for PR and manual code endpoints
├── services/
│   ├── gemini.py           # Google GenAI wrapper with retry logic
│   └── github.py           # GitHub client for fetching PRs and raw files
├── utils/
│   └── chunking.py         # Git diff patch extraction and code chunking logic
├── main.py                 # Application entry point with CORS policies
├── requirements.txt        # PIP installation dependencies
└── .env.example            # Environment variables template
```

---

## API Endpoints

### 1. Health Status
- **Route**: `GET /health`
- **Description**: Verification route checking backend status.
- **Response**: `{"status": "ok"}`

### 2. Generate from PR
- **Route**: `POST /api/v1/docs/generate/from-pr`
- **Request Body**:
  ```json
  {
    "pr_url": "https://github.com/owner/repo/pull/123"
  }
  ```
- **Description**: Fetches modified files from the specified Pull Request, extracts patch diffs, filters for code files, chunks them, and sends chunks to Gemini for documentation.
- **Response**: Array of file objects:
  ```json
  [
    {
      "filename": "src/utils.py",
      "markdown": "## Overview\n..."
    }
  ]
  ```

### 3. Generate from Code Snippet
- **Route**: `POST /api/v1/docs/generate/from-code`
- **Request Body**:
  ```json
  {
    "code": "def hello():\n    return 'world'",
    "filename": "hello.py",
    "language": "python"
  }
  ```
- **Description**: Receives a raw code block and metadata, splits it into chunks if necessary, and generates documentation.
- **Response**: Array containing a single documentation object:
  ```json
  [
    {
      "filename": "hello.py",
      "markdown": "## Overview\n..."
    }
  ]
  ```

---

## Local Setup & Run

1. **Initialize virtual environment and dependencies**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Configure environment**:
   Make a copy of `.env.example` as `.env` and fill in `GITHUB_TOKEN` and `GEMINI_API_KEY`.
3. **Start server**:
   ```bash
   fastapi dev main.py
   ```
4. **Interactive Docs**:
   Access the Swagger UI at [http://localhost:8000/docs](http://localhost:8000/docs).
