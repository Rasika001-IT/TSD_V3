import { NextResponse } from 'next/server';
import { getPostsPaginated } from '@/lib/posts';

export const revalidate = 300;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = parseInt(searchParams.get('per_page')) || 9;
    return NextResponse.json(await getPostsPaginated(page, perPage));
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
