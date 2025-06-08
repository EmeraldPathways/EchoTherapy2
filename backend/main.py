from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
from typing import Optional
import asyncio
import time
import stripe
from fastapi import Request, Header, HTTPException
from supabase import create_client, Client

# Load environment variables first
load_dotenv()

# Then initialize FastAPI and other clients
app = FastAPI()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize OpenAI client safely
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or api_key == "your_openai_api_key_here":
        return None
    try:
        # Simple initialization with just the API key
        return OpenAI(api_key=api_key)
    except Exception as e:
        print(f"Warning: Could not initialize OpenAI client: {e}")
        return None

client = get_openai_client()

# Create FastAPI instance
app = FastAPI(
    title="AI Companion Backend",
    description="Backend API for AI Companion application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    text: str
    thread_id: Optional[str] = None

class ChatResponse(BaseModel):
    result: str
    new_thread_id: str
    explanation: Optional[str] = None

# Root endpoint
@app.get("/")
async def root():
    return {"message": "AI Companion Backend is running"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Check if OpenAI API key is configured
@app.get("/config")
async def config_check():
    openai_key = os.getenv("OPENAI_API_KEY")
    return {
        "openai_configured": bool(openai_key and openai_key != "your_openai_api_key_here"),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

# OPTIONS handler for chat endpoint (CORS preflight)
@app.options("/chat")
async def chat_options():
    return {"message": "OK"}

# Chat endpoint using OpenAI Assistants API
@app.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(request: ChatRequest):
    try:
        # Retrieve ASSISTANT_ID from environment variable
        assistant_id = os.getenv("OPENAI_ASSISTANT_ID")
        if not assistant_id or assistant_id == "your_assistant_id_here_optional":
            raise HTTPException(status_code=500, detail="OpenAI Assistant ID not configured in environment variables")
        
        # Check if OpenAI client is available
        if not client:
            raise HTTPException(status_code=500, detail="OpenAI client not initialized. Please check your API key.")
        
        # Thread Management
        try:            # Check if thread_id is provided and valid
            effective_thread_id = None
            
            if not request.thread_id or request.thread_id == "":
                # Create a new thread if no thread_id is provided
                thread = client.beta.threads.create()
                effective_thread_id = thread.id
            else:
                # Use the provided thread_id
                effective_thread_id = request.thread_id
            
            # Add the user's message to the thread
            client.beta.threads.messages.create(
                thread_id=effective_thread_id,
                role="user",
                content=request.text
            )
              # Run the assistant on the thread
            run = client.beta.threads.runs.create(
                thread_id=effective_thread_id,
                assistant_id=assistant_id
            )
            
            # Wait for the run to complete without blocking
            while run.status in ["queued", "in_progress"]:
                await asyncio.sleep(0.5)  # Non-blocking sleep for half second
                run = client.beta.threads.runs.retrieve(
                    thread_id=effective_thread_id,
                    run_id=run.id
                )
              # Check if run completed successfully
            if run.status == "completed":
                # Get the latest message from the thread (the assistant's response)
                messages = client.beta.threads.messages.list(
                    thread_id=effective_thread_id
                )
                
                # Get the most recent assistant message
                assistant_messages = [msg for msg in messages.data if msg.role == "assistant"]
                if assistant_messages and len(assistant_messages) > 0:
                    latest_msg = assistant_messages[0]  # Most recent assistant message
                      # Extract the text content from the message
                    if latest_msg.content and len(latest_msg.content) > 0:
                        content_block = latest_msg.content[0]
                        if hasattr(content_block, 'text'):
                            response_text = content_block.text.value
                        else:
                            response_text = str(content_block)
                    else:
                        response_text = "I'm sorry, I couldn't generate a response. Please try again."
                else:
                    response_text = "I'm sorry, I couldn't generate a response. Please try again."
                
                return ChatResponse(
                    result=response_text,
                    new_thread_id=effective_thread_id
                )
            else:
                # Handle failed run
                error_message = f"Assistant run failed with status: {run.status}"
                if hasattr(run, 'last_error') and run.last_error:
                    error_message += f" - {run.last_error}"
                
                raise HTTPException(status_code=500, detail=error_message)
                
        except Exception as e:
            print(f"Error in Assistants API interaction: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to process with Assistants API: {str(e)}")
        
            
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get response from AI assistant: {str(e)}")

# Startup event to verify Assistant configuration
@app.on_event("startup")
async def verify_assistant_config():
    assistant_id = os.getenv("OPENAI_ASSISTANT_ID")
    if not assistant_id or assistant_id == "your_assistant_id_here_optional":
        print("⚠️  WARNING: OpenAI Assistant ID not configured in environment variables")
        print("Run setup_assistant.py first to create and configure your Assistant")
    else:
        try:
            if client:
                # Try to retrieve the assistant to verify it exists
                assistant = client.beta.assistants.retrieve(assistant_id)
                print(f"✅ Successfully connected to OpenAI Assistant: {assistant.name} ({assistant.id})")
                print(f"Model: {assistant.model}")
                print("-------------------------------------------")
            else:
                print("⚠️  WARNING: OpenAI client not initialized. Check your API key.")
        except Exception as e:
            print(f"⚠️  WARNING: Could not verify OpenAI Assistant: {str(e)}")

@app.post("/stripe-webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()
    sig_header = stripe_signature

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = session["metadata"].get("userId")
        price_id = session["metadata"].get("priceId")

        # Subscription
        if price_id == "price_1RXRIFBXTiymeaeXaxwTd1rd":
            supabase.table("usage").update({
                "is_subscribed": True,
                "message_count": 0,
                "free_quota": 0,
                "paid_quota": 0
            }).eq("user_id", user_id).execute()
        # One-time 500 messages
        elif price_id == "price_1RXRImBXTiymeaeXaT5L7FGj":
            usage = supabase.table("usage").select("paid_quota").eq("user_id", user_id).single().execute()
            current_paid = usage.data["paid_quota"] if usage.data else 0
            supabase.table("usage").update({
                "paid_quota": current_paid + 500
            }).eq("user_id", user_id).execute()

    return {"status": "success"}
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
