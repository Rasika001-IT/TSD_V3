import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { saveWibCover, removeWibCover, setWibHero } from '@/lib/wib';
import { revalidatePublicContent } from '@/lib/revalidate';

export async function PUT(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    if (body.action === 'set-hero') {
      await setWibHero(body.post_id);
    } else if (body.action === 'clear-hero') {
      await setWibHero(null);
    } else if (body.action === 'remove') {
      await removeWibCover(body.post_id);
    } else {
      if (!body.post_id || !body.landing_image) {
        return NextResponse.json({ error: 'post_id and landing_image are required' }, { status: 400 });
      }
      await saveWibCover(body.post_id, body.landing_image);
    }
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to save' }, { status: 500 });
  }
}
