"use client";
import React, { useState } from "react";

import NewsHero from "../components/news/NewsHero";
import NewsList from "../components/news/NewsList";
import Pagination from "../components/news/Pagination";

import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";
import Navbar from "../components/layout/Navbar";

const POSTS_PER_PAGE = 7;

// Posts come from the server (app/news/page.js); page 1 is in the SSR HTML.
// Pagination is an instant client-side slice (no fetch, no loader).
const News = ({ posts = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

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