import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase';

export async function PUT(request, { params }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const { intro_copy, header_image, category_ids = [] } = await request.json();
    const db = createAdminClient();

    await db
      .from('hub_pages')
      .update({ intro_copy: intro_copy || null, header_image: header_image || null, updated_at: new Date().toISOString() })
      .eq('id', id);

    // Reassign categories: clear this hub's current links, then set the chosen ones.
    await db.from('categories').update({ hub_id: null }).eq('hub_id', id);
    if (category_ids.length) {
      await db.from('categories').update({ hub_id: id }).in('id', category_ids);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to update hub' }, { status: 500 });
  }
}
