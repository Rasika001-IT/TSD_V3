import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { sendMail, emailConfigured } from '@/lib/email';

const ORG_EMAIL = process.env.ORG_EMAIL || 'thesuccessdigest@gmail.com';

export async function POST(request) {
  try {
    const { email, name } = await request.json();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ message: 'Please enter a valid email' }, { status: 400 });
    }
    const clean = email.toLowerCase().trim();

    const db = createAdminClient();
    const { error } = await db
      .from('subscribers')
      .upsert({ email: clean }, { onConflict: 'email', ignoreDuplicates: true });
    if (error) throw error;

    // Fire emails (don't fail the subscription if SMTP hiccups).
    if (emailConfigured()) {
      const welcome = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
          <h1 style="font-family:Georgia,serif">Welcome to The Success Digest</h1>
          <p>Hi${name ? ` ${name}` : ''}, thanks for subscribing. You'll now get our latest
          business news, rankings and reports straight to your inbox.</p>
          <p style="color:#888;font-size:12px">— The Success Digest</p>
        </div>`;
      try {
        await Promise.all([
          sendMail(clean, 'Welcome to The Success Digest', welcome),
          sendMail(
            ORG_EMAIL,
            'New newsletter subscriber',
            `<p>New subscriber: <strong>${clean}</strong>${name ? ` (${name})` : ''}</p>`,
          ),
        ]);
      } catch (mailErr) {
        console.error('Subscribe email failed:', mailErr.message);
      }
    }

    return NextResponse.json({ message: "You're subscribed — check your inbox for a welcome email." });
  } catch (e) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
