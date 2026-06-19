import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/posts';

export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(await getCategories());
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
