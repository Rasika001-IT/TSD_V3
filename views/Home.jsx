"use client";
import Navbar from "../components/layout/Navbar";

import Hero from "../components/sections/Hero";
import TrendingMarquee from "../components/sections/TrendingMarquee";
import FeaturedArticles from "../components/sections/FeaturedArticles";
import WomenInBusiness from "../components/sections/WomenInBusiness";
import BusinessFinance from "../components/sections/BusinessFinance";
import MoreSections from "../components/sections/MoreSections";
import Blogs from "../components/sections/Blogs";
import EditorsPick from "../components/sections/EditorsPick";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";

import MagazineSection from "../components/MagazineSection";

import usePosts from "../hooks/usePosts";

import Loader from "../components/ui/Loader";

const Home = () => {
  const {
    posts,
    loading,
    categories,
  } = usePosts();

  // SINGLE GLOBAL LOADER
  if (loading) {
    return <Loader text="Loading homepage..." />;
  }

  return (
    <div className="bg-[#FCF9F4]">
      <Navbar />

      <Hero />

      <TrendingMarquee posts={posts} />

      <FeaturedArticles
        posts={posts}
        categories={categories}
      />

      <MagazineSection />

      <WomenInBusiness posts={posts} />

      <BusinessFinance posts={posts} />

      <MoreSections posts={posts} />

      <Blogs posts={posts} />

      <EditorsPick posts={posts} />

      <Newsletter />

      <Footer />
    </div>
  );
};

export default Home;