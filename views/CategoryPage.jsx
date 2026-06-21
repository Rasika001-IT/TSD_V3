"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";
import SmartImage from "../components/ui/SmartImage";
import { stripHtml } from "../utils/stripHtml";

import useCategoryPosts from "../hooks/useCategoryPosts";

// Sidebar mirrors the public nav. Sections with `links` are collapsible
// dropdowns (Figma "Dropdowns" screen); the rest are plain navigation links.
const sidebarSections = [
  {
    title: "Blogs",
    path: "/blogs",
    links: [
      { name: "Crypto", path: "/blogs/crypto" },
      { name: "Events", path: "/blogs/events" },
      { name: "Explainers", path: "/blogs/explainers" },
      { name: "How To", path: "/blogs/how-to" },
      { name: "Lifestyle", path: "/blogs/lifestyle" },
      { name: "Sports", path: "/blogs/sports" },
      { name: "Travel", path: "/blogs/travel" },
    ],
  },
  { title: "Editor's Highlights", path: "/category/editors-highlights", links: [] },
  { title: "Featured Articles", path: "/featured", links: [] },
  { title: "Magazine", path: "/magazine", links: [] },
  {
    title: "News",
    path: "/news",
    links: [
      { name: "Breaking News", path: "/news/breaking-news" },
      { name: "Crypto", path: "/news/crypto" },
      { name: "Industries", path: "/news/industries" },
      { name: "Markets", path: "/news/markets" },
      { name: "Regulations", path: "/news/regulations" },
      { name: "Sports", path: "/news/sports" },
      { name: "Startups", path: "/news/startups" },
    ],
  },
  { title: "Women of Impact", path: "/women-in-business", links: [] },
];

const Chevron = ({ open }) => (
  <svg
    className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategoryPage = () => {
  const { category } = useParams();
  const location = usePathname();

  const { posts, loading } = useCategoryPosts(category);

  const [visiblePosts, setVisiblePosts] = useState(4);
  // Which dropdown sections are expanded. Auto-open the one the user is in.
  const [openSections, setOpenSections] = useState(() => {
    const init = {};
    sidebarSections.forEach((s) => {
      if (s.links.length && location?.startsWith(s.path)) init[s.title] = true;
    });
    return init;
  });

  useEffect(() => {
    setVisiblePosts(4);
    setOpenSections((prev) => {
      const next = { ...prev };
      sidebarSections.forEach((s) => {
        if (s.links.length && location?.startsWith(s.path)) next[s.title] = true;
      });
      return next;
    });
  }, [category, location]);

  const toggleSection = (title) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const formattedTitle = (category || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleLoadMore = () => setVisiblePosts((prev) => prev + 4);

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">
        <section className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* SIDEBAR */}
            <aside className="lg:col-span-3">
              <div className="bg-[#F7F4EE] rounded-xl p-8 lg:sticky lg:top-28">
                <h2 className="font-heading text-3xl font-medium mb-8">Category</h2>

                <div className="space-y-5">
                  {sidebarSections.map((section) => {
                    const isActiveSection = location?.startsWith(section.path);
                    const hasLinks = section.links.length > 0;
                    const open = !!openSections[section.title];

                    return (
                      <div key={section.title}>
                        <div className="flex items-center justify-between gap-2">
                          <Link
                            href={section.path}
                            className={`font-body font-semibold text-lg transition ${
                              isActiveSection
                                ? "text-primary"
                                : "text-[#1D1F26] hover:text-primary"
                            }`}
                          >
                            {section.title}
                          </Link>

                          {hasLinks && (
                            <button
                              type="button"
                              aria-label={`Toggle ${section.title}`}
                              onClick={() => toggleSection(section.title)}
                              className="text-[#1D1F26] hover:text-primary p-1"
                            >
                              <Chevron open={open} />
                            </button>
                          )}
                        </div>

                        {hasLinks && open && (
                          <div className="flex flex-col gap-2.5 mt-3 pl-1">
                            {section.links.map((link) => (
                              <Link
                                key={link.path}
                                href={link.path}
                                className={`font-body text-sm transition ${
                                  location === link.path
                                    ? "font-semibold text-primary"
                                    : "text-[#1D1F26] hover:text-primary"
                                }`}
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="lg:col-span-9">
              <h1 className="font-heading text-5xl lg:text-6xl font-medium mb-12">
                {formattedTitle}
              </h1>

              {loading ? (
                <p className="font-body">Loading articles…</p>
              ) : posts.length === 0 ? (
                <p className="font-body">No articles found.</p>
              ) : (
                <>
                  <div className="space-y-14">
                    {posts.slice(0, visiblePosts).map((post) => (
                      <article key={post.slug} className="group">
                        <Link href={`/article/${post.slug}`}>
                          <SmartImage
                            src={post.image}
                            alt={stripHtml(post.title)}
                            className="w-full aspect-[2/1] rounded-md mb-5"
                          />
                        </Link>

                        <p className="font-body text-xs uppercase tracking-wide text-primary mb-2">
                          {formattedTitle}
                          {post.author ? ` · By ${post.author}` : ""}
                        </p>

                        <Link href={`/article/${post.slug}`}>
                          <h2
                            className="font-heading text-3xl lg:text-4xl leading-tight font-medium mb-3 text-[#1D1F26] group-hover:text-primary transition"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                        </Link>

                        <p
                          className="font-body text-[16px] text-gray-600 leading-relaxed mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />

                        <Link
                          href={`/article/${post.slug}`}
                          className="font-body text-sm underline font-medium hover:text-primary transition"
                        >
                          Read More
                        </Link>
                      </article>
                    ))}
                  </div>

                  {visiblePosts < posts.length && (
                    <button
                      onClick={handleLoadMore}
                      className="mt-14 bg-black text-white px-10 py-3 rounded-md hover:bg-black/80 transition"
                    >
                      View More
                    </button>
                  )}
                </>
              )}
            </section>

          </div>
        </section>

        <Newsletter />
        <Footer />
      </main>
    </>
  );
};

export default CategoryPage;
