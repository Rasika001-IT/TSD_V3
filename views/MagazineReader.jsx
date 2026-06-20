"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { magazines } from "../data/magazines";
import { fetchPostBySlug } from "../services/wordpress";

import Navbar from "../components/layout/Navbar";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";

const MagazineReader = () => {
  const { slug } = useParams();

  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const magazine = magazines.find((m) => m.slug === slug);

  useEffect(() => {
    const loadFeatured = async () => {
      if (!magazine?.featured?.articleSlug) return;

      try {
        setLoading(true);

        const post = await fetchPostBySlug(
          magazine.featured.articleSlug
        );

        setFeaturedPost(post);
      } catch (err) {
        console.error("Error fetching featured article:", err);
      } finally {
        setLoading(false);
      }
    };

    if (magazine) loadFeatured();
  }, [slug]);

  if (!magazine) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Magazine not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-[#F5F2ED] py-16">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-center">
          <h1 className="text-3xl font-serif">Read Here</h1>

          <Link
            href="/magazine"
            className="text-sm text-gray-600 hover:text-[#C89632]"
          >
            ← Back to Magazines
          </Link>
        </div>

        {/* VIEWER */}
        <div className="max-w-6xl mx-auto bg-[#1E222B] p-10 rounded-lg flex justify-center relative">

          <button className="absolute left-6 text-white text-2xl opacity-60 hover:opacity-100">
            ‹
          </button>

          {magazine.embedUrl ? (
            <div className="relative w-[700px] h-[495px] max-w-full">
              <iframe
                src={magazine.embedUrl}
                title={magazine.title}
                className="absolute w-full h-full border-none"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-[350px] h-[495px] flex items-center justify-center bg-gray-700 text-white">
              Coming Soon
            </div>
          )}

          <button className="absolute right-6 text-white text-2xl opacity-60 hover:opacity-100">
            ›
          </button>
        </div>

        {/* FEATURED ARTICLE */}
        {featuredPost && (
  <Link href={`/article/${featuredPost.slug}`}>
    <div className="max-w-6xl mx-auto mt-20 px-6 cursor-pointer group">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="w-[560px] h-[280px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
  <img
    src={featuredPost.image}
    alt={featuredPost.title}
    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
  />
</div>

        {/* CONTENT */}
        <div>
          <span className="text-[#C89632] text-xs uppercase tracking-wide">
            Cover Story
          </span>

          <h2 className="text-3xl font-serif mt-3 group-hover:text-[#C89632] transition-colors">
            {featuredPost.title}
          </h2>

          <div
  className="mt-4 text-gray-600 line-clamp-4"
  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
/>

          {/* Now just visual, not a link */}
          <p className="mt-6 text-[#C89632] font-medium">
            Read Full Story →
          </p>
        </div>

      </div>

    </div>
  </Link>
)}

      </div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default MagazineReader;