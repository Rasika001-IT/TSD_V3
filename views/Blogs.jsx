"use client";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import BlogHero from "../components/blogs/BlogHero";
import BlogGrid from "../components/blogs/BlogGrid";

import usePosts from "../hooks/usePosts";
import Loader from "../components/ui/Loader";

const Blogs = () => {
  const { posts, loading, pagination, changePage } = usePosts(
    null,
    9,
    true,
    "blogs"
  );

  // ONE GLOBAL LOADER
  if (loading && pagination.currentPage === 1) {
    return <Loader text="Loading blogs..." />;
  }

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