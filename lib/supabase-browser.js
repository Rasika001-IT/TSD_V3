import { createBrowserClient } from '@supabase/ssr';

// Browser client for the login form (signInWithPassword) and client-side
// session in the admin UI.
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
