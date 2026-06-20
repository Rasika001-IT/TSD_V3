"use client";
import React, { useState } from "react";

import NewsHero from "../components/news/NewsHero";
import NewsList from "../components/news/NewsList";
import NewsListSkeleton from "../components/news/NewsListSkeleton";
import Pagination from "../components/news/Pagination";

import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";
import Navbar from "../components/layout/Navbar";

import { fetchPostsWithPagination } from "../services/wordpress";

const POSTS_PER_PAGE = 7;

// Page 1 is server-rendered (initialPosts/initialPagination), so the hero +
// cards are in the SSR HTML. Paging fetches that page client-side (only ~7
// posts, not all 472) and shows the skeleton shimmer while loading.
const News = ({ initialPosts = [], initialPagination }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const heroPost = posts[0];
  const leftPosts = posts.slice(1, 5);
  const rightPosts = posts.slice(5, 7);

  const handlePageChange = async (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === pagination.currentPage
    )
      return;

    setLoading(true);
    try {
      const result = await fetchPostsWithPagination(page, POSTS_PER_PAGE);
      setPosts((result.posts || []).filter((p) => p.image !== null));
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalPosts: result.totalPosts,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error("Failed to load news page", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <NewsListSkeleton />
      ) : (
        <>
          <NewsHero post={heroPost} />
          <NewsList horizontalPosts={leftPosts} verticalPosts={rightPosts} />
        </>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      <Newsletter />

      <Footer />
    </>
  );
};

export default News;
