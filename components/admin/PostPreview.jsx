import Link from "next/link";
import { MORE_SECTIONS, HOME_SECTIONS } from "../../lib/home-sections";

// #7 "Where this post appears" — a visual site map. Each public surface the
// post lands on is drawn as a low-fidelity skeleton wireframe of that page
// (grey placeholder blocks), with the post's own slot highlighted and filled
// with its real image + title, so an editor instantly sees "this is where my
// post shows up." Inspired by newsroom CMS preview maps.

const TYPE_MAIN = {
  news: { label: "News", href: "/news" },
  blog: { label: "Blogs", href: "/blogs" },
  feature: { label: "Featured Articles", href: "/featured" },
  ranking: { label: "Featured Articles", href: "/featured" },
  report: { label: "Featured Articles", href: "/featured" },
};

/* ---------- skeleton primitives ---------- */
const Bar = ({ w = "w-full", h = "h-2.5", c = "bg-gray-200" }) => (
  <div className={`${w} ${h} ${c} rounded`} />
);

const Chrome = ({ path, children }) => (
  <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white">
    <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      <span className="ml-2 flex-1 truncate rounded bg-white border border-gray-200 px-2 py-0.5 text-[11px] text-gray-400">
        thesuccessdigest.org{path}
      </span>
    </div>
    <div className="p-4 bg-[#FCF9F4]">{children}</div>
  </div>
);

const NavSkel = () => (
  <div className="flex items-center justify-between mb-3">
    <Bar w="w-16" h="h-4" c="bg-gray-300" />
    <div className="flex gap-3">
      {[...Array(5)].map((_, i) => (
        <Bar key={i} w="w-8" h="h-2" />
      ))}
    </div>
    <Bar w="w-12" h="h-4" c="bg-gray-800" />
  </div>
);

const PostImg = ({ src, className }) =>
  src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={`object-cover ${className}`} />
  ) : (
    <div className={`bg-gray-300 ${className}`} />
  );

// The highlighted slot — wraps real post content in a gold ring + tag.
const Slot = ({ children, className = "" }) => (
  <div className={`relative ring-2 ring-primary rounded-md bg-primary/5 ${className}`}>
    <span className="absolute -top-2 left-2 z-10 bg-primary text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
      THIS POST
    </span>
    {children}
  </div>
);

const Title = ({ post, className }) => (
  <div
    className={`font-heading text-[#1D1F26] leading-snug ${className}`}
    dangerouslySetInnerHTML={{ __html: post.title }}
  />
);

/* ---------- post slot variants ---------- */
const HeroSlot = ({ post }) => (
  <Slot className="p-2">
    <PostImg src={post.featured_image} className="w-full aspect-[2/1] rounded" />
    <Title post={post} className="text-sm mt-2 line-clamp-2" />
    <div className="mt-1 space-y-1">
      <Bar w="w-full" h="h-1.5" />
      <Bar w="w-4/5" h="h-1.5" />
    </div>
  </Slot>
);

const CardSlot = ({ post }) => (
  <Slot className="p-1.5">
    <PostImg src={post.featured_image} className="w-full aspect-[2/1] rounded" />
    <Title post={post} className="text-[11px] mt-1.5 line-clamp-2" />
  </Slot>
);

const RowSlot = ({ post }) => (
  <Slot className="p-2 flex gap-3">
    <PostImg src={post.featured_image} className="w-24 h-16 rounded shrink-0" />
    <div className="flex-1 min-w-0">
      <Title post={post} className="text-xs line-clamp-2" />
      <div className="mt-1 space-y-1">
        <Bar w="w-full" h="h-1.5" />
        <Bar w="w-2/3" h="h-1.5" />
      </div>
    </div>
  </Slot>
);

/* ---------- grey placeholder cards ---------- */
const GhostCard = () => (
  <div className="p-1.5 rounded-md border border-gray-200 bg-white/60">
    <div className="w-full aspect-[2/1] rounded bg-gray-200" />
    <div className="mt-1.5 space-y-1">
      <Bar h="h-1.5" />
      <Bar w="w-3/4" h="h-1.5" />
    </div>
  </div>
);

const GhostRow = () => (
  <div className="p-2 flex gap-3 rounded-md border border-gray-200 bg-white/60">
    <div className="w-24 h-16 rounded bg-gray-200 shrink-0" />
    <div className="flex-1 space-y-1.5 pt-1">
      <Bar h="h-2" />
      <Bar w="w-full" h="h-1.5" />
      <Bar w="w-2/3" h="h-1.5" />
    </div>
  </div>
);

/* ---------- page wireframes ---------- */
const SectionLabel = ({ children, active }) => (
  <p
    className={`text-[10px] uppercase tracking-wide font-semibold mb-2 ${
      active ? "text-primary" : "text-gray-400"
    }`}
  >
    {children}
  </p>
);

const HomeWire = ({ post, highlightNames }) => {
  const isHot = (n) => highlightNames.includes(n);
  return (
    <Chrome path="/">
      <NavSkel />
      <div className="w-full h-16 rounded bg-gray-200 mb-4" />
      {[
        { name: "Featured Articles", cols: 3 },
        { name: "Women in Business", cols: 4 },
        { name: "Business & Finance", cols: 3 },
        { name: "More Sections", cols: 4 },
        { name: "Blogs", cols: 4 },
      ].map((sec) => {
        const hot = isHot(sec.name);
        return (
          <div key={sec.name} className={`mb-4 ${hot ? "p-2 -mx-2 rounded-lg bg-primary/5" : ""}`}>
            <SectionLabel active={hot}>{sec.name}</SectionLabel>
            <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${sec.cols}, minmax(0,1fr))` }}>
              {hot && <CardSlot post={post} />}
              {[...Array(sec.cols - (hot ? 1 : 0))].map((_, i) => (
                <GhostCard key={i} />
              ))}
            </div>
          </div>
        );
      })}
    </Chrome>
  );
};

const ListingWire = ({ post, path }) => (
  <Chrome path={path}>
    <NavSkel />
    <Bar w="w-32" h="h-5" c="bg-gray-300" />
    <div className="grid grid-cols-3 gap-2 mt-3">
      <CardSlot post={post} />
      <GhostCard />
      <GhostCard />
      <GhostCard />
      <GhostCard />
      <GhostCard />
    </div>
  </Chrome>
);

const CategoryWire = ({ post, path, title }) => (
  <Chrome path={path}>
    <NavSkel />
    <div className="flex gap-4">
      <div className="w-28 shrink-0 space-y-2">
        <Bar w="w-20" h="h-4" c="bg-gray-300" />
        {[...Array(7)].map((_, i) => (
          <Bar key={i} w={i % 2 ? "w-16" : "w-20"} h="h-2" />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <Bar w="w-40" h="h-5" c="bg-gray-300" />
        <div className="space-y-2 mt-3">
          <RowSlot post={post} />
          <GhostRow />
          <GhostRow />
        </div>
      </div>
    </div>
  </Chrome>
);

const ArticleWire = ({ post }) => (
  <Chrome path={`/article/${post.slug || ""}`}>
    <NavSkel />
    <Slot className="p-3">
      <Title post={post} className="text-lg line-clamp-3" />
      <div className="flex gap-2 mt-2 mb-3">
        <Bar w="w-16" h="h-1.5" />
        <Bar w="w-12" h="h-1.5" />
      </div>
      <PostImg src={post.featured_image} className="w-full aspect-[2/1] rounded" />
      <div className="mt-3 space-y-1.5">
        {[...Array(5)].map((_, i) => (
          <Bar key={i} w={i === 4 ? "w-2/3" : "w-full"} h="h-1.5" />
        ))}
      </div>
    </Slot>
  </Chrome>
);

/* ---------- surface section wrapper ---------- */
const Surface = ({ title, subtitle, href, children }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div>
        <h2 className="font-heading text-base text-[#1D1F26]">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary hover:underline whitespace-nowrap"
        >
          View live ↗
        </Link>
      )}
    </div>
    {children}
  </div>
);

// Live iframe of the real public page, scrolled to + highlighting the post via
// the ?ph=<slug> param (handled by PreviewHighlighter on the public side).
const LiveFrame = ({ title, path, src }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50">
      <div>
        <h2 className="font-heading text-sm text-[#1D1F26]">{title}</h2>
        <p className="text-[11px] text-gray-400">{path}</p>
      </div>
      <Link href={src} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline whitespace-nowrap">
        Open ↗
      </Link>
    </div>
    <iframe src={src} title={title} loading="lazy" className="w-full h-[540px] bg-white" />
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
  const isFeatured = post.post_type === "feature" || post.promotion === "featured" || post.promotion === "hero";
  const main = TYPE_MAIN[post.post_type] || { label: "Article", href: "/" };

  // Which homepage sections light up for this post — computed from the post's
  // REAL category slugs against the shared home-sections config, so the preview
  // matches the live layout instead of guessing from post_type.
  const postSlugs = cats.map((c) => c.slug);
  const hasAny = (slugs) => slugs.some((s) => postSlugs.includes(s));
  const highlightNames = [];
  if (isFeatured || hasAny(HOME_SECTIONS.featuredArticles.slugs))
    highlightNames.push("Featured Articles");
  if (hasAny(HOME_SECTIONS.womenInBusiness.slugs)) highlightNames.push("Women in Business");
  if (hasAny(HOME_SECTIONS.businessFinance.slugs)) highlightNames.push("Business & Finance");
  if (MORE_SECTIONS.some((s) => postSlugs.includes(s.slug))) highlightNames.push("More Sections");
  if (post.post_type === "blog" || hasAny(HOME_SECTIONS.blogs.slugs))
    highlightNames.push("Blogs");

  // A post only appears in the real live listings once published — so render
  // the actual pages (iframes, post highlighted in place) for published posts,
  // and fall back to the wireframe map (which uses the post's own data) for
  // drafts/unpublished, which wouldn't show up in the live sections yet.
  const published = post.status === "published";
  const slug = post.slug;
  const ph = slug ? `?ph=${slug}` : "";

  const liveSurfaces = [
    { title: "Homepage", path: "/", src: `/${ph}` },
    { title: `Main ${main.label} page`, path: main.href, src: `${main.href}${ph}` },
    ...subCats.map((c) => ({ title: `${c.name} category page`, path: c.href, src: `${c.href}${ph}` })),
    ...(isWomen
      ? [{ title: "Women in Business", path: "/women-in-business", src: `/women-in-business${ph}` }]
      : []),
    ...(slug ? [{ title: "Full article page", path: `/article/${slug}`, src: `/article/${slug}` }] : []),
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading text-2xl text-[#1D1F26]">Where this post appears</h1>
        <Link href={`/admin/posts/${post.id}`} className="text-sm text-primary hover:underline">
          ← Back to editor
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        {published ? (
          <>
            Each frame is the live page with this post{" "}
            <span className="text-primary font-medium">highlighted</span> where it appears.
          </>
        ) : (
          <>
            Map of where this post will appear, based on its categories. It’s{" "}
            <span className="text-amber-600">{post.status}</span> — publish it to see it on the real
            pages below. Each section shows the most-recent posts, so it appears once it’s recent
            enough.
          </>
        )}
      </p>

      {!post.featured_image && (
        <p className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          No featured image set — news &amp; blog posts need one before they can be published.
        </p>
      )}

      {published ? (
        <div className="grid xl:grid-cols-2 gap-6">
          {liveSurfaces.map((s) => (
            <LiveFrame key={s.path} title={s.title} path={s.path} src={s.src} />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <Surface title="Homepage" subtitle="/" href="/">
            <HomeWire post={post} highlightNames={highlightNames} />
          </Surface>

          <Surface title={`Main ${main.label} page`} subtitle={main.href} href={main.href}>
            <ListingWire post={post} path={main.href} />
          </Surface>

          {subCats.map((c) => (
            <Surface key={c.id} title={`${c.name} category page`} subtitle={c.href} href={c.href}>
              <CategoryWire post={post} path={c.href} title={c.name} />
            </Surface>
          ))}

          {isWomen && (
            <Surface title="Women in Business" subtitle="/women-in-business" href="/women-in-business">
              <CategoryWire post={post} path="/women-in-business" title="Women in Business" />
            </Surface>
          )}

          <Surface
            title="Full article page"
            subtitle={post.slug ? `/article/${post.slug}` : "—"}
            href={post.slug ? `/article/${post.slug}` : undefined}
          >
            <ArticleWire post={post} />
          </Surface>
        </div>
      )}
    </div>
  );
}
