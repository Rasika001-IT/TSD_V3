import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { saveMagazine, deleteMagazine } from '@/lib/magazines';
import { revalidatePublicContent } from '@/lib/revalidate';

export async function PUT(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    if (!body.fliphtml5_url) {
      return NextResponse.json({ error: 'A FlipHTML5 link is required' }, { status: 400 });
    }
    const result = await saveMagazine(body, id);
    revalidatePublicContent();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to update magazine' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await deleteMagazine(id);
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to delete magazine' }, { status: 500 });
  }
}
