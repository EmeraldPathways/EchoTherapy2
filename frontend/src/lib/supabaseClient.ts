import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Supabase URL is not defined. Check your .env.local file for NEXT_PUBLIC_SUPABASE_URL.");
}
if (!supabaseAnonKey) {
  throw new Error("Supabase Anon Key is not defined. Check your .env.local file for NEXT_PUBLIC_SUPABASE_ANON_KEY.");
}

// Create a single Supabase client for interacting with your database
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);