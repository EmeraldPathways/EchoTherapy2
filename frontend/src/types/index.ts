export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  // 'model' field is less relevant now as it's always the same Assistant via backend
  // but can be kept for consistency or future use if you add other AI types.
  model?: string; // e.g., "AI Companion"
  explanation?: string;
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