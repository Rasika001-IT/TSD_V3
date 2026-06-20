import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { savePost } from '@/lib/post-write';

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const result = await savePost(body, null);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to create post' }, { status: 500 });
  }
}
