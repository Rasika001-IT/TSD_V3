import { NextResponse } from 'next/server';
import { getTags } from '@/lib/posts';

export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(await getTags());
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
