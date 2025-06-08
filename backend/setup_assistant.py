#!/usr/bin/env python3
"""
OpenAI Assistant Setup Script
This script helps you create and configure an OpenAI Assistant for your project.
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

def create_assistant():
    """Create a new OpenAI Assistant"""
    api_key = os.getenv("OPENAI_API_KEY")
      if not api_key or api_key == "your_openai_api_key_here":
        print("❌ Error: OpenAI API key not configured in .env file")
        print("Please add your OpenAI API key to the .env file")
        return None
    
    # Safe client initialization
    try:
        client = OpenAI(api_key=api_key)
    except Exception as e:
        print(f"❌ Error initializing OpenAI client: {str(e)}")
        return None
    
    try:
        # Create assistant
        assistant = client.beta.assistants.create(
            name="AI Companion",
            instructions="""You are a helpful AI companion designed to provide support, guidance, and conversation. 
            You should be empathetic, understanding, and provide thoughtful responses. 
            Help users with their questions and provide emotional support when needed.
            
            Be conversational, friendly, and supportive. Tailor your responses to be helpful and encouraging.""",
            model="gpt-4-1106-preview",
            tools=[]  # You can add tools like code_interpreter, retrieval, etc.
        )
        
        print(f"✅ Successfully created AI Companion Assistant!")
        print(f"Assistant ID: {assistant.id}")
        print(f"Assistant Name: {assistant.name}")
        
        # Update .env file with assistant ID
        env_path = ".env"
        if os.path.exists(env_path):
            with open(env_path, "r") as f:
                content = f.read()
            
            if "OPENAI_ASSISTANT_ID=" in content:
                # Replace existing assistant ID
                lines = content.split("\n")
                for i, line in enumerate(lines):
                    if line.startswith("OPENAI_ASSISTANT_ID="):
                        lines[i] = f"OPENAI_ASSISTANT_ID={assistant.id}"
                        break
                content = "\n".join(lines)
            else:
                # Add assistant ID
                content += f"\nOPENAI_ASSISTANT_ID={assistant.id}"
            
            with open(env_path, "w") as f:
                f.write(content)
            
            print(f"✅ Updated .env file with Assistant ID")
        
        return assistant.id
        
    except Exception as e:
        print(f"❌ Error creating assistant: {str(e)}")
        return None

def test_assistant(assistant_id):
    """Test the assistant with a simple message"""
    api_key = os.getenv("OPENAI_API_KEY")
    
    # Safe client initialization
    try:
        client = OpenAI(api_key=api_key)
    except Exception as e:
        print(f"❌ Error initializing OpenAI client: {str(e)}")
        return False
    
    try:
        # Create a thread
        thread = client.beta.threads.create()
        
        # Add a message
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content="Hello! Can you introduce yourself?"
        )
        
        # Run the assistant
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant_id
        )
        
        # Wait for completion
        import time
        while run.status in ["queued", "in_progress"]:
            time.sleep(1)
            run = client.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )
        
        if run.status == "completed":
            # Get the response
            messages = client.beta.threads.messages.list(thread_id=thread.id)
            assistant_message = messages.data[0]
            
            if assistant_message.content and len(assistant_message.content) > 0:
                content = assistant_message.content[0]
                if hasattr(content, 'text'):
                    response_text = content.text.value
                else:
                    response_text = str(content)
                
                print("✅ Assistant test successful!")
                print(f"Assistant response: {response_text}")
                return True
            
        print(f"❌ Assistant test failed with status: {run.status}")
        return False
        
    except Exception as e:
        print(f"❌ Error testing assistant: {str(e)}")
        return False

if __name__ == "__main__":
    print("🤖 OpenAI Assistant Setup for AI Companion")
    print("=" * 50)
    
    existing_assistant_id = os.getenv("OPENAI_ASSISTANT_ID")
    
    if existing_assistant_id and existing_assistant_id != "your_assistant_id_here_optional":
        print(f"Found existing Assistant ID: {existing_assistant_id}")
        choice = input("Do you want to test the existing assistant? (y/n): ").lower().strip()
        if choice == 'y':
            test_assistant(existing_assistant_id)
        else:
            choice = input("Do you want to create a new assistant? (y/n): ").lower().strip()
            if choice == 'y':
                create_assistant()
    else:
        print("No existing assistant found. Creating a new one...")
        assistant_id = create_assistant()
        if assistant_id:
            print("\nTesting the new assistant...")
            test_assistant(assistant_id)
    
    print("\n🚀 Setup complete! The OpenAI Assistant is configured and ready to use.")
    print("✅ Your FastAPI backend will now use the Assistants API when you run the application.")
