import { notFound } from 'next/navigation';
import MagazineReader from '@/views/MagazineReader';
import { getMagazineBySlug } from '@/lib/magazines';

export const revalidate = 300; // ISR

export default async function Page({ params }) {
  const { slug } = await params;
  const magazine = await getMagazineBySlug(slug);
  if (!magazine) notFound();
  return <MagazineReader magazine={magazine} />;
}
