import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example functions for using the database
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createTherapySession = async (userId: string, title: string) => {
  const { data, error } = await supabase
    .from('therapy_sessions')
    .insert([
      { user_id: userId, title }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const saveChatMessage = async (
  sessionId: string,
  userId: string,
  content: string,
  role: 'user' | 'assistant'
) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      { session_id: sessionId, user_id: userId, content, role }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}; 