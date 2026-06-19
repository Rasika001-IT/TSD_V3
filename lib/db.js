import { createClient } from '@supabase/supabase-js';

// Server-side read client for the public API route handlers.
// Uses the publishable (anon) key so RLS is the backstop — only
// published + public rows are ever returned to readers.
export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);
