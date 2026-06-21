import Link from "next/link";
import SmartImage from "../ui/SmartImage";
import { stripHtml } from "../../utils/stripHtml";

// #7 "Visual map" — a single screen that shows an editor every public surface a
// post appears on (main listing, landing-page category section, its own
// category page, Women in Business), each rendered in that surface's card
// style. Helps a new editor understand what section reflects which category.

const TYPE_MAIN = {
  news: { label: "News", href: "/news" },
  blog: { label: "Blogs", href: "/blogs" },
  feature: { label: "Featured Articles", href: "/featured" },
  ranking: { label: "Rankings", href: "/featured" },
  report: { label: "Reports", href: "/featured" },
};

const Surface = ({ title, subtitle, href, children }) => (
  <section className="bg-white border border-gray-200 rounded-xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="font-heading text-lg text-[#1D1F26]">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary hover:underline whitespace-nowrap"
        >
          View live ↗
        </Link>
      )}
    </div>
    {children}
  </section>
);

// Large listing card (how it looks on /news, /blogs, /featured)
const HeroCard = ({ post, author }) => (
  <div className="max-w-xl">
    <SmartImage src={post.featured_image} alt={stripHtml(post.title)} className="w-full aspect-[2/1] rounded-md mb-4" />
    <p className="text-xs uppercase tracking-wide text-primary mb-1">{author ? `By ${author}` : " "}</p>
    <h3 className="font-heading text-2xl leading-snug mb-2" dangerouslySetInnerHTML={{ __html: post.title }} />
    <p className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
  </div>
);

// Compact card (how it looks in a landing-page category grid, e.g. MoreSections)
const GridCard = ({ post, label }) => (
  <div className="w-[260px]">
    <p className="text-xs uppercase tracking-wide font-semibold text-[#444] mb-3">{label} →</p>
    <SmartImage src={post.featured_image} alt={stripHtml(post.title)} className="w-full aspect-[2/1] rounded mb-3" />
    <h4 className="font-heading font-semibold text-[17px] leading-snug" dangerouslySetInnerHTML={{ __html: post.title }} />
  </div>
);

// List card (how it looks on a category page row)
const ListCard = ({ post, eyebrow }) => (
  <div className="max-w-2xl">
    <SmartImage src={post.featured_image} alt={stripHtml(post.title)} className="w-full aspect-[2/1] rounded-md mb-4" />
    <p className="text-xs uppercase tracking-wide text-primary mb-2">{eyebrow}</p>
    <h3 className="font-heading text-3xl leading-tight mb-3" dangerouslySetInnerHTML={{ __html: post.title }} />
    <p className="text-[15px] text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
    <span className="text-sm underline font-medium">Read More</span>
  </div>
);

export default function PostPreview({ post, taxonomy }) {
  const cats = (post.category_ids || [])
    .map((id) => (taxonomy.categories || []).find((c) => c.id === id))
    .filter(Boolean);

  const newsParentId = (taxonomy.categories || []).find((c) => c.slug === "news")?.id;
  const blogsParentId = (taxonomy.categories || []).find((c) => c.slug === "blogs")?.id;

  const subCats = cats
    .filter((c) => c.parent_id === newsParentId || c.parent_id === blogsParentId)
    .map((c) => ({
      ...c,
      href: `${c.parent_id === newsParentId ? "/news" : "/blogs"}/${c.slug}`,
    }));

  const isWomen = cats.some((c) => c.slug === "women-of-impact");
  const main = TYPE_MAIN[post.post_type] || { label: "Article", href: "/" };
  const author = (taxonomy.authors || []).find((a) => a.id === post.author_id)?.name || "";

  const hasImage = !!post.featured_image;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading text-2xl text-[#1D1F26]">Where this post appears</h1>
        <Link href={`/admin/posts/${post.id}`} className="text-sm text-primary hover:underline">
          ← Back to editor
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        A preview of every public surface this post surfaces on, based on its type and categories.
        {post.status !== "published" && (
          <span className="ml-1 text-amber-600">
            (This post is {post.status} — it won’t show in live listings until published.)
          </span>
        )}
      </p>

      {!hasImage && (
        <p className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          No featured image set — news &amp; blog posts need one before they can be published.
        </p>
      )}

      <div className="space-y-6">
        <Surface
          title={`Main ${main.label} page`}
          subtitle={main.href}
          href={main.href}
        >
          <HeroCard post={post} author={author} />
        </Surface>

        <Surface
          title="Landing page — category section"
          subtitle="Homepage section grid"
          href="/"
        >
          <GridCard post={post} label={subCats[0]?.name || main.label} />
        </Surface>

        {subCats.map((c) => (
          <Surface
            key={c.id}
            title={`${c.name} category page`}
            subtitle={c.href}
            href={c.href}
          >
            <ListCard post={post} eyebrow={c.name} />
          </Surface>
        ))}

        {isWomen && (
          <Surface
            title="Women in Business"
            subtitle="Landing-page carousel + /women-in-business"
            href="/women-in-business"
          >
            <GridCard post={post} label="Women in Business" />
          </Surface>
        )}

        {post.slug && (
          <Surface title="Full article page" subtitle={`/article/${post.slug}`} href={`/article/${post.slug}`}>
            <p className="text-sm text-gray-600">Open the full rendered article in a new tab.</p>
          </Surface>
        )}
      </div>
    </div>
  );
}
