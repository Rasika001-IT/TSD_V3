import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';

export const revalidate = 300;

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
