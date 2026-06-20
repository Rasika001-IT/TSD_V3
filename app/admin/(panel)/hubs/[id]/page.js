import { notFound } from 'next/navigation';
import HubEditor from '@/components/admin/HubEditor';
import { getAdminHub } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function EditHub({ params }) {
  const { id } = await params;
  const data = await getAdminHub(id);
  if (!data) notFound();
  return <HubEditor hub={data.hub} categories={data.categories} />;
}
