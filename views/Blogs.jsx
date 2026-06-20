"use client";
import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import BlogHero from "../components/blogs/BlogHero";
import BlogGrid from "../components/blogs/BlogGrid";

import { fetchPostsWithPagination } from "../services/wordpress";

// Page 1 is server-rendered (passed via initialPosts/initialPagination), so the
// grid is in the HTML on first paint. Paging fetches client-side and shows the
// skeleton shimmer in BlogGrid.
const Blogs = ({ initialPosts = [], initialPagination }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const changePage = async (newPage) => {
    if (
      newPage < 1 ||
      newPage > pagination.totalPages ||
      newPage === pagination.currentPage
    )
      return;

    setLoading(true);
    try {
      const result = await fetchPostsWithPagination(newPage, 9);
      setPosts((result.posts || []).filter((p) => p.image !== null));
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalPosts: result.totalPosts,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error("Failed to load blogs page", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <BlogHero posts={posts} />

      <BlogGrid
        posts={posts}
        loading={loading}
        pagination={pagination}
        changePage={changePage}
      />

      <Newsletter />

      <Footer />
    </>
  );
};

export default Blogs;
