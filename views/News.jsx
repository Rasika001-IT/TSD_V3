"use client";
import React, { useState } from "react";
import usePosts from "../hooks/usePosts";

import NewsHero from "../components/news/NewsHero";
import NewsList from "../components/news/NewsList";
import Pagination from "../components/news/Pagination";

import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";
import Navbar from "../components/layout/Navbar";

import Loader from "../components/ui/Loader";

const POSTS_PER_PAGE = 7;

const News = () => {
  const { posts, loading } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);

  // GLOBAL LOADER
  if (loading) {
    return <Loader text="Loading news..." />;
  }

  const totalPages = Math.ceil(
    posts.length / POSTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * POSTS_PER_PAGE;

  const currentPosts = posts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const heroPost = currentPosts[0];

  const leftPosts = currentPosts.slice(1, 5);

  const rightPosts = currentPosts.slice(5, 7);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <NewsHero post={heroPost} />

      <NewsList
        horizontalPosts={leftPosts}
        verticalPosts={rightPosts}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Newsletter />

      <Footer />
    </>
  );
};

export default News;