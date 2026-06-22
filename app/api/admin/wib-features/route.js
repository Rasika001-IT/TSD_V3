import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { saveWibFeature } from '@/lib/wib';
import { revalidatePublicContent } from '@/lib/revalidate';

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.article_url) {
      return NextResponse.json({ error: 'An article link is required' }, { status: 400 });
    }
    const result = await saveWibFeature(body, null);
    revalidatePublicContent();
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to create feature' }, { status: 500 });
  }
}
