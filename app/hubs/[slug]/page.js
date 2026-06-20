import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Newsletter from '@/components/sections/Newsletter';
import Container from '@/components/layout/Container';
import { getHub, getHubPosts, getHubSeries } from '@/lib/hubs';

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hub = await getHub(slug);
  if (!hub) return { title: 'Hub · The Success Digest' };
  return {
    title: `${hub.name} · The Success Digest`,
    description: hub.intro_copy || `${hub.name} news, rankings and reports from The Success Digest.`,
  };
}

export default async function HubPage({ params }) {
  const { slug } = await params;
  const hub = await getHub(slug);
  if (!hub) notFound();
  const [posts, series] = await Promise.all([getHubPosts(hub.id), getHubSeries(hub.id)]);

  return (
    <>
      <Navbar />
      <main className="bg-[#FCF9F4] min-h-screen">
        {/* HEADER */}
        <section
          className="py-16 bg-[#1D1F26] text-white bg-cover bg-center"
          style={hub.header_image ? { backgroundImage: `linear-gradient(rgba(29,31,38,.7),rgba(29,31,38,.7)), url(${hub.header_image})` } : {}}
        >
          <Container>
            <p className="text-primary uppercase tracking-widest text-xs mb-2">Industry Hub</p>
            <h1 className="font-heading text-4xl sm:text-5xl">{hub.name}</h1>
            {hub.intro_copy && <p className="text-white/80 mt-4 max-w-2xl">{hub.intro_copy}</p>}
            {series.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {series.map((s) => (
                  <span key={s.id} className="text-xs border border-white/30 rounded-full px-3 py-1">{s.name}</span>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* LATEST */}
        <section className="py-12">
          <Container>
            <h2 className="font-heading text-2xl mb-6">Latest in {hub.name}</h2>
            {posts.length === 0 ? (
              <p className="text-gray-500">No stories linked to this hub yet. Assign categories to it in the CMS.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((p) => (
                  <Link key={p.slug} href={`/article/${p.slug}`} className="group">
                    {p.image && <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-3" />}
                    <h3 className="font-heading text-lg leading-snug group-hover:text-primary" dangerouslySetInnerHTML={{ __html: p.title }} />
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
