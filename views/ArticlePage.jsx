"use client";
import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import StandardArticleTemplate from "../components/articles/StandardArticleTemplate";
import FeaturedArticleTemplate from "../components/articles/FeaturedArticleTemplate";
import RankingTemplate from "../components/articles/RankingTemplate";
import ReportTemplate from "../components/articles/ReportTemplate";

// Receives fully-resolved data from the server (app/article/[slug]/page.js).
// Only the FAQ accordion needs client state — the article itself is in the
// server-rendered HTML on first paint.
const ArticlePage = ({
  post,
  taxonomyData = [],
  faqs = [],
  mustReadPosts = [],
  isFeaturedArticle = false,
  rankingEntries = [],
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

  // Choose template by post type, then featured fallback.
  let body;
  if (post.post_type === "ranking") {
    body = <RankingTemplate post={post} taxonomyData={taxonomyData} mustReadPosts={mustReadPosts} rankingEntries={rankingEntries} />;
  } else if (post.post_type === "report") {
    body = <ReportTemplate post={post} taxonomyData={taxonomyData} mustReadPosts={mustReadPosts} />;
  } else {
    const Template = isFeaturedArticle ? FeaturedArticleTemplate : StandardArticleTemplate;
    body = (
      <Template
        post={post}
        taxonomyData={taxonomyData}
        faqs={faqs}
        openFAQ={openFAQ}
        setOpenFAQ={setOpenFAQ}
        mustReadPosts={mustReadPosts}
      />
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">
        {body}

        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default ArticlePage;
