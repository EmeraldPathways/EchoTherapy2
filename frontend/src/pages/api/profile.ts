import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import type { UserProfile } from '@/types'; // Your defined types

// Initialize Supabase client with the SERVICE_ROLE_KEY for server-side operations
// These should be set as environment variables in your Vercel project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase URL or Service Role Key is not defined. Check Vercel environment variables.");
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Authenticate the user using the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }
  const token = authHeader.split(' ')[1];

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    console.error('Profile API - Auth Error:', authError?.message);
    return res.status(401).json({ error: authError?.message || 'Invalid or expired token' });
  }

  // User is authenticated, proceed with GET or POST
  if (req.method === 'GET') {
    try {
      const { data: profile, error: dbError } = await supabaseAdmin
        .from('users') // Your public.users table
        .select('*') // Select all fields or specific ones: 'name, email, subscription_status'
        .eq('id', user.id)
        .single(); // Expects a single row

      if (dbError) {
        // PGRST116 means " بالضبط صف واحد لم يتم العثور عليه" (exactly one row not found)
        // This can happen if the user profile row hasn't been created by the trigger yet,
        // or if there's a mismatch. For a GET, it's okay to return an empty object or 404.
        if (dbError.code === 'PGRST116') {
          return res.status(200).json(null); // Or 404 if you prefer: res.status(404).json({ error: 'Profile not found' });
        }
        console.error('Profile API - DB Error (GET):', dbError.message);
        throw dbError; // Let global error handler catch it or handle specifically
      }
      
      return res.status(200).json(profile);

    } catch (error: any) {
      console.error('Profile API - GET Error:', error.message);
      return res.status(500).json({ error: error.message || 'Failed to fetch profile' });
    }
  } else if (req.method === 'POST' || req.method === 'PUT') { // Allow PUT for updates too
    try {
      const { name /*, age, interests, personality_notes */ } = req.body as Partial<UserProfile>;

      // Construct the object with only the fields to be updated
      const profileUpdates: Partial<UserProfile> = {
        updated_at: new Date().toISOString(),
      };
      if (name !== undefined) profileUpdates.name = name;
      // Add other fields similarly if they are part of the request body
      // if (age !== undefined) profileUpdates.age = age;
      // if (interests !== undefined) profileUpdates.interests = interests;
      // if (personality_notes !== undefined) profileUpdates.personality_notes = personality_notes;


      // Note: The user's email and id should not be updatable directly by this form.
      // Email is managed by Supabase Auth. ID is fixed.
      // The trigger `handle_new_user` should have already created the row with id and email.
      // So, we are always updating here.

      const { data: updatedProfile, error: dbError } = await supabaseAdmin
        .from('users')
        .update(profileUpdates)
        .eq('id', user.id) // Ensure users can only update their own profile
        .select() // Return the updated profile
        .single();

      if (dbError) {
        console.error('Profile API - DB Error (POST/PUT):', dbError.message);
        throw dbError;
      }

      return res.status(200).json(updatedProfile);

    } catch (error: any) {
      console.error('Profile API - POST/PUT Error:', error.message);
      return res.status(500).json({ error: error.message || 'Failed to update profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}