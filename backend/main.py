import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import docs

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="Technical Documentation Generator API",
    description="API for generating technical documentation using Claude and GitHub",
    version="1.0.0"
)

# Set up CORS to allow all origins for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(docs.router, prefix="/api/v1")

@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint to verify the service is running."""
    return {"status": "ok"}
