import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { saveWibFeature, setActiveWibFeature, deleteWibFeature } from '@/lib/wib';
import { revalidatePublicContent } from '@/lib/revalidate';

export async function PUT(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    // `{ activate: true }` is the lightweight "Set as active" action from the list.
    if (body.activate) {
      await setActiveWibFeature(id);
    } else {
      if (!body.article_url) {
        return NextResponse.json({ error: 'An article link is required' }, { status: 400 });
      }
      await saveWibFeature(body, id);
    }
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to update feature' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await deleteWibFeature(id);
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to delete feature' }, { status: 500 });
  }
}
