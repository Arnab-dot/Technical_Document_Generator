from pydantic import BaseModel, Field
from typing import Optional

class PRGenerateRequest(BaseModel):
    pr_url: str = Field(..., min_length=10, description="GitHub Pull Request URL (e.g., https://github.com/owner/repo/pull/123)")

class CodeGenerateRequest(BaseModel):
    code: str = Field(..., min_length=1, description="Raw code string")
    filename: str = Field(..., min_length=1, description="Name of the file")
    language: Optional[str] = Field(None, description="Optional programming language")

class DocGenerateResponse(BaseModel):
    filename: str
    markdown: str
