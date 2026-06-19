import { NextResponse } from 'next/server';
import { getPostsByTag } from '@/lib/posts';

export const revalidate = 300;

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const perPage = parseInt(searchParams.get('per_page')) || 50;
    return NextResponse.json(await getPostsByTag(parseInt(id), perPage));
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
