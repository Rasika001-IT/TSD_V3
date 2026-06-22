import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { saveMagazine } from '@/lib/magazines';
import { revalidatePublicContent } from '@/lib/revalidate';

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.fliphtml5_url) {
      return NextResponse.json({ error: 'A FlipHTML5 link is required' }, { status: 400 });
    }
    const result = await saveMagazine(body, null);
    revalidatePublicContent();
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to create magazine' }, { status: 500 });
  }
}
