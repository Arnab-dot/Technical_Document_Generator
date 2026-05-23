import urllib.request
import urllib.error
import json

# Hardcoded sample code resembling a moderately complex backend module
SAMPLE_CODE = """
import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import httpx

# External library usage: httpx, sqlalchemy, fastapi
router = APIRouter()

class DatabaseConnection:
    def __init__(self, uri: str):
        self.uri = uri
        self.connected = False

    def connect(self):
        # Fake connection logic
        self.connected = True
        return self

class PaymentProcessor:
    def __init__(self, db_session: Session):
        self.db = db_session

    def process_transaction(self, user_id: int, amount: float) -> bool:
        # Obvious code smell: Magic number (1000)
        if amount > 1000:
            logging.warning("Large transaction detected")
            
        # Obvious code smell: missing error handling around external API call
        response = httpx.post("https://api.fake-payment-gateway.com/charge", json={"uid": user_id, "amt": amount})
        
        if response.status_code == 200:
            return True
        return False

def get_db_session():
    # Dependency injection placeholder
    db = DatabaseConnection("sqlite:///mem.db").connect()
    yield db

def calculate_discount(amount: float, user_tier: str) -> float:
    # Obvious code smell: magic numbers for tiers
    if user_tier == "gold":
        return amount * 0.8
    elif user_tier == "silver":
        return amount * 0.9
    return amount

@router.post("/checkout")
def checkout(user_id: int, total_amount: float, tier: str, db: Session = Depends(get_db_session)):
    discounted_amount = calculate_discount(total_amount, tier)
    processor = PaymentProcessor(db)
    
    success = processor.process_transaction(user_id, discounted_amount)
    
    if not success:
        raise HTTPException(status_code=400, detail="Payment failed")
        
    return {"status": "success", "paid": discounted_amount, "timestamp": datetime.now().isoformat()}
"""

def run_demo():
    url = "http://localhost:8000/generate/from-code"
    
    payload = {
        "code": SAMPLE_CODE,
        "filename": "checkout_routes.py",
        "language": "python"
    }
    
    data = json.dumps(payload).encode('utf-8')

    print("Sending demo code to Technical Documentation Generator API...")
    
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=30.0) as response:
            if response.status != 200:
                print(f"Error! API returned status {response.status}")
                return

            response_data = response.read().decode('utf-8')
            data = json.loads(response_data)
            
            # Format the output
            output_markdown = ""
            for item in data:
                filename = item.get("filename", "unknown.py")
                markdown_content = item.get("markdown", "")
                
                output_markdown += f"# Documentation for {filename}\n\n"
                output_markdown += markdown_content
                output_markdown += "\n\n---\n\n"
                
                print(f"\n--- Generated Docs for {filename} ---")
                print(markdown_content)
                
            # Save to file
            with open("demo-output.md", "w") as f:
                f.write(output_markdown)
                
            print("\nSuccessfully saved output to demo-output.md")

    except urllib.error.URLError as e:
        print(f"Failed to connect or process request: {e}")

if __name__ == "__main__":
    run_demo()
