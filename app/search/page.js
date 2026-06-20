import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import Container from '@/components/layout/Container';
import SmartImage from '@/components/ui/SmartImage';
import { searchPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  return { title: q ? `Search: ${q} · The Success Digest` : 'Search · The Success Digest' };
}

export default async function SearchPage({ searchParams }) {
  const { q = '' } = await searchParams;
  const results = q ? await searchPosts(q) : [];

  return (
    <>
      <Navbar />
      <main className="bg-[#FCF9F4] min-h-screen py-12">
        <Container>
          <h1 className="font-heading text-3xl mb-1">Search</h1>
          <p className="text-gray-500 mb-8">
            {q ? `${results.length} result${results.length === 1 ? '' : 's'} for “${q}”` : 'Type a query in the search bar.'}
          </p>

          {q && results.length === 0 && (
            <p className="text-gray-500">No articles matched “{q}”. Try a different term.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((p) => (
              <Link key={p.slug} href={`/article/${p.slug}`} className="group">
                {p.image && <SmartImage src={p.image} alt={p.title} className="w-full h-48 rounded-lg mb-3" />}
                <h3 className="font-heading text-lg leading-snug group-hover:text-primary" dangerouslySetInnerHTML={{ __html: p.title }} />
                <p className="text-xs text-gray-400 mt-1">By {p.author}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
