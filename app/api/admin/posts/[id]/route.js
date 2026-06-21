import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { savePost, deletePost } from '@/lib/post-write';
import { revalidatePublicContent } from '@/lib/revalidate';

export async function PUT(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const result = await savePost(body, id);
    revalidatePublicContent();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await deletePost(id);
    revalidatePublicContent();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to delete post' }, { status: 500 });
  }
}
