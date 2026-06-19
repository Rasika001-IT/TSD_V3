import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 300; // ISR — replaces the old 5-min WordPress refresh

export async function GET() {
  try {
    return NextResponse.json(await getAllPosts());
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
