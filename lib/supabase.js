import { createClient } from '@supabase/supabase-js';

// Public (anon) client — used by server components / public read paths. RLS applies.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Admin (service-role) client — server-only. Bypasses RLS; use ONLY in route
// handlers / scripts that have already authenticated the editor. Never import
// this into client components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );
}
