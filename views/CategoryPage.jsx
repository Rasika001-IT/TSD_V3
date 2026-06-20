"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import useCategoryPosts from "../hooks/useCategoryPosts";

const sidebarSections = [
  {
    title: "Blogs",
    path: "/blogs",
    links: [
      { name: "Crypto", path: "/blogs/crypto-blogs" },
      { name: "Events", path: "/blogs/events" },
      { name: "Explainers", path: "/blogs/explainers" },
      { name: "How to", path: "/blogs/how-to" },
      { name: "Lifestyle", path: "/blogs/lifestyle" },
      { name: "Sports", path: "/blogs/sports" },
      { name: "Travel", path: "/blogs/travel" },
    ],
  },
  {
    title: "Editor's Highlights",
    path: "/category/editors-highlights",
    links: [],
  },
  {
    title: "Featured Articles",
    path: "/featured-articles",
    links: [],
  },
  {
    title: "Magazine",
    path: "/magazine",
    links: [],
  },
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
  {
    title: "Women of Impact",
    path: "/women-in-business",
    links: [],
  },
  {
    title: "Uncategorized",
    path: "/blogs",
    links: [],
  },
];

const CategoryPage = () => {
  const { category } = useParams();
  const location = usePathname();

  const { posts, loading } = useCategoryPosts(category);

  const [visiblePosts, setVisiblePosts] = useState(4);

  useEffect(() => {
    setVisiblePosts(4);
  }, [category]);

  const formattedTitle = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 4);
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">
        <section className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="grid grid-cols-12 gap-16">

            {/* SIDEBAR */}
            <aside className="col-span-3">
              <div className="bg-[#F7F4EE] rounded-xl p-10 sticky top-28">

                <h2 className="font-heading text-4xl font-medium mb-8">
                  Category
                </h2>

                <div className="space-y-8">
                  {sidebarSections.map((section, index) => (
                    <div key={index}>
                      {section.path ? (
  <Link
    href={section.path}
    className={`block font-body font-semibold text-lg mb-4 transition ${
      location.startsWith(section.path)
        ? "text-primary"
        : "text-[#1D1F26] hover:text-primary"
    }`}
  >
    {section.title}
  </Link>
) : (
  <h3 className="font-body font-semibold text-lg mb-4">
    {section.title}
  </h3>
)}

                      <div className="flex flex-col gap-3">
                        {section.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.path}
                            className={`font-body text-sm hover:underline transition ${
                              location === link.path
                                ? "font-semibold text-primary"
                                : "text-[#1D1F26]"
                            }`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="col-span-9">

              <h1 className="font-heading text-6xl font-medium mb-12">
                {formattedTitle}
              </h1>

              {loading ? (
                <p className="font-body">Loading articles...</p>
              ) : posts.length === 0 ? (
                <p className="font-body">No articles found.</p>
              ) : (
                <>
                  <div className="space-y-16">
                    {posts.slice(0, visiblePosts).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/article/${post.slug}`}
                      >
                        <article className="group">

                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-[320px] object-cover mb-6"
                          />

                          <h2 className="font-heading text-4xl leading-tight font-medium mb-4 text-[#1D1F26] group-hover:text-primary transition">
                            {post.title.replace(/<[^>]+>/g, "")}
                          </h2>

                          <p
                            className="font-body text-[16px] text-gray-600 leading-relaxed mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt,
                            }}
                          />

                          <span className="font-body text-sm underline font-medium">
                            Read More
                          </span>

                        </article>
                      </Link>
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