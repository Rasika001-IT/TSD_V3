import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ message: 'Please enter a valid email' }, { status: 400 });
    }
    const db = createAdminClient();
    const { error } = await db
      .from('subscribers')
      .upsert({ email: email.toLowerCase().trim() }, { onConflict: 'email', ignoreDuplicates: true });
    if (error) throw error;
    return NextResponse.json({ message: "You're subscribed — welcome to TSD." });
  } catch (e) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
