import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Container from '@/components/layout/Container';
import { getHubs } from '@/lib/hubs';

export const revalidate = 3600;

export const metadata = {
  title: 'Industry Hubs · The Success Digest',
  description: 'Vertical deep-dives across Technology, Finance, Healthcare and more.',
};

export default async function HubsIndex() {
  const hubs = await getHubs();
  return (
    <>
      <Navbar />
      <main className="bg-[#FCF9F4] min-h-screen py-12">
        <Container>
          <h1 className="font-heading text-4xl mb-2">Industry Hubs</h1>
          <p className="text-gray-600 mb-10">Vertical deep-dives across the industries shaping business.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((h) => (
              <Link
                key={h.id}
                href={`/hubs/${h.slug}`}
                className="block border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition"
              >
                <h2 className="font-heading text-xl">{h.name}</h2>
                {h.intro_copy && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{h.intro_copy}</p>}
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
