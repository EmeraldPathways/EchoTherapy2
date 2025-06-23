import type { NextApiRequest, NextApiResponse } from 'next'; // RE-ADDED THIS LINE
import { createClient } from '@supabase/supabase-js';
import type { Conversation } from '@/types'; // Your defined types

// Note: NextApiRequest and NextApiResponse are now explicitly imported.
// The 'json' import from 'stream/consumers' was commented out earlier as "Not typically needed here, ensure it's not a typo".
// For now, we will leave it out as it was explicitly mentioned as not needed.

const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey: string | undefined = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("CRITICAL: One or more Supabase environment variables are missing for /api/conversations. App may not function.");
  throw new Error("Server configuration error: Missing Supabase environment variables for conversations API.");
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Conversation[] | { error: string | { message: string } }>
) {
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];

    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !authData.user) {
      console.error('Conversations API - Auth Error:', authError?.message);
      return res.status(401).json({ error: authError?.message || 'Invalid or expired token' });
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('conversations')
        .select('*')
        .eq('user_id', authData.user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Conversations API - Supabase fetch error:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data as Conversation[]);
    } catch (error: any) {
      console.error('Conversations API - Server error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
