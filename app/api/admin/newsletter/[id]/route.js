import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase';
import { sendBulk, emailConfigured } from '@/lib/email';
import { stripHtml } from '@/utils/stripHtml';

// Send a published post to all subscribers, then stamp newsletter_sent_at.
export async function POST(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!emailConfigured()) {
    return NextResponse.json(
      { error: 'Email not configured — set EMAIL_HOST/EMAIL_USER/EMAIL_PASS on the service.' },
      { status: 400 },
    );
  }

  try {
    const { id } = await params;
    const db = createAdminClient();
    const { data: post } = await db
      .from('posts')
      .select('title, slug, excerpt, featured_image')
      .eq('id', id)
      .maybeSingle();
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    const { data: subs } = await db.from('subscribers').select('email');
    const recipients = (subs || []).map((s) => s.email);
    if (!recipients.length) return NextResponse.json({ error: 'No subscribers yet' }, { status: 400 });

    const url = `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://thesuccessdigest.org').replace(/\/$/, '')}/article/${post.slug}`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
        ${post.featured_image ? `<img src="${post.featured_image}" alt="" style="width:100%;border-radius:8px"/>` : ''}
        <h1 style="font-size:22px">${stripHtml(post.title)}</h1>
        <p style="color:#444">${stripHtml(post.excerpt || '')}</p>
        <p><a href="${url}" style="background:#C89632;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Read the full story →</a></p>
        <hr/><p style="font-size:12px;color:#999">The Success Digest</p>
      </div>`;

    const sent = await sendBulk(recipients, stripHtml(post.title), html);
    await db.from('posts').update({ newsletter_sent_at: new Date().toISOString() }).eq('id', id);

    return NextResponse.json({ ok: true, sent });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Send failed' }, { status: 500 });
  }
}
