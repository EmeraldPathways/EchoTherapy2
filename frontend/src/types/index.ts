export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  // 'model' field is less relevant now as it's always the same Assistant via backend
  // but can be kept for consistency or future use if you add other AI types.
  model?: string; // e.g., "AI Companion"
  explanation?: string;
  created_at?: string; // Add created_at for sorting and display
}

// This type is no longer used to select different models in the UI
// export type AiModel = "mentallama"; 

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  location?: string;
  message_count?: number;
  // Add other fields as needed
}

export interface Conversation {
  id: string;
  user_id: string;
  openai_thread_id: string;
  title: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface ChatServiceRequest {
  text: string;
  thread_id: string | null;
  conversation_db_id: string | null;
}

export interface ChatServiceResponse {
  result: string; // Changed from 'reply' to 'result' to match backend
  openai_thread_id: string;
  conversation_db_id: string;
  explanation?: string; // Optional explanation from the AI
} 