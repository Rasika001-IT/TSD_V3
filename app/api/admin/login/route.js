import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-server';

// Server-side sign-in: reads Supabase env at runtime (always present) and sets
// the session cookie. Avoids depending on NEXT_PUBLIC_* being inlined at build.
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: error.message }, { status: 401 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Sign-in failed' }, { status: 500 });
  }
}
