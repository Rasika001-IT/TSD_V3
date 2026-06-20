"use client";
import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import HeroFeature from "../components/sections/women/HeroFeature";
import FeaturedStoryBlock from "../components/sections/women/FeaturedStoryBlock";
import StoryRow from "../components/sections/women/StoryRow";

import { fetchPostsByCategory } from "../services/wordpress";

import Loader from "../components/ui/Loader";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(
    html,
    "text/html"
  );

  return doc.body.textContent || "";
};

const WomenInBusiness = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWomenPosts = async () => {
      try {
        const data = await fetchPostsByCategory(135);

        setPosts(data.slice(0, 5));
      } catch (error) {
        console.error(
          "Failed to fetch women posts:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadWomenPosts();
  }, []);

  // GLOBAL LOADER
  if (loading) {
    return (
      <>
        <Navbar />

        <Loader text="Loading stories..." />

        <Footer />
      </>
    );
  }

  if (!posts.length) return null;

  const heroPost = posts[0];
  const featuredPost = posts[1];
  const storyPosts = posts.slice(2, 5);

  return (
    <>
      <Navbar />

      {heroPost && (
        <HeroFeature
          data={{
            title: heroPost.title,
            description: stripHtml(
              heroPost.excerpt
            ),
            image: heroPost.image,
            slug: heroPost.slug,
          }}
        />
      )}

      {featuredPost && (
        <FeaturedStoryBlock
          data={{
            title: featuredPost.title,
            description: stripHtml(
              featuredPost.excerpt
            ),
            image: featuredPost.image,
            slug: featuredPost.slug,
          }}
        />
      )}

      {storyPosts.map((story, index) => (
        <StoryRow
          key={story.id}
          title={story.title}
          description={stripHtml(story.excerpt)}
          image={story.image}
          slug={story.slug}
          reverse={index % 2 !== 0}
        />
      ))}

      <Newsletter />

      <Footer />
    </>
  );
};

export default WomenInBusiness;