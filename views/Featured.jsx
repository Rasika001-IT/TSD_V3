"use client";
import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";

import FeaturedLayout from "../components/featured/FeaturedLayout";

import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";

import Loader from "../components/ui/Loader";

import {
  fetchCategories,
  fetchPostsByCategory,
} from "../services/wordpress";

const Featured = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [visibleCount, setVisibleCount] = useState(4);

  const [loading, setLoading] = useState(true);

  // FILTER POSTS WITH IMAGES
  const filterValidPosts = (posts = []) => {
    return posts.filter(
      (post) => post.image !== null
    );
  };

  useEffect(() => {
    const loadFeaturedPage = async () => {
      try {
        setLoading(true);

        const categoriesData =
          await fetchCategories();

        setCategories(categoriesData);

        const featuredCategory =
          categoriesData.find(
            (cat) =>
              cat.slug === "featured-articles"
          );

        const blogCategory = categoriesData.find(
          (cat) => cat.slug === "blogs"
        );

        if (
          !featuredCategory ||
          !blogCategory
        )
          return;

        const [featuredData, blogData] =
          await Promise.all([
            fetchPostsByCategory(
              featuredCategory.id,
              50
            ),

            fetchPostsByCategory(
              blogCategory.id,
              6
            ),
          ]);

        setFeaturedPosts(
          filterValidPosts(featuredData)
        );

        setBlogPosts(
          filterValidPosts(blogData)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPage();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // GLOBAL LOADER
  if (loading) {
    return (
      <>
        <Navbar />

        <Loader text="Loading featured articles..." />

        <Footer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F5EF] min-h-screen">
      <Navbar />

      <Container>

        <h1 className="text-4xl font-heading font-bold mt-12 mb-10">
          Featured Articles
        </h1>

        <FeaturedLayout
          featuredPosts={featuredPosts.slice(
            0,
            visibleCount
          )}
          blogPosts={blogPosts}
          categories={categories}
          onLoadMore={handleLoadMore}
          hasMore={
            visibleCount <
            featuredPosts.length
          }
        />

      </Container>

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Featured;