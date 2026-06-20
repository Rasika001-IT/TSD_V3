"use client";
import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import StandardArticleTemplate from "../components/articles/StandardArticleTemplate";
import FeaturedArticleTemplate from "../components/articles/FeaturedArticleTemplate";

// Receives fully-resolved data from the server (app/article/[slug]/page.js).
// Only the FAQ accordion needs client state — the article itself is in the
// server-rendered HTML on first paint.
const ArticlePage = ({
  post,
  taxonomyData = [],
  faqs = [],
  mustReadPosts = [],
  isFeaturedArticle = false,
}) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-[#FCF9F4]">
          Article not found.
        </div>
        <Footer />
      </>
    );
  }

  const Template = isFeaturedArticle
    ? FeaturedArticleTemplate
    : StandardArticleTemplate;

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">
        <Template
          post={post}
          taxonomyData={taxonomyData}
          faqs={faqs}
          openFAQ={openFAQ}
          setOpenFAQ={setOpenFAQ}
          mustReadPosts={mustReadPosts}
        />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default ArticlePage;
