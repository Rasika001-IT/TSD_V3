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

// Server component: data is fetched on the server (app/page.js) and passed in,
// so the whole homepage is in the HTML on first paint — no loader, no client fetch.
const Home = ({ posts = [], categories = [], magazines = [], wibFeature = null }) => {
  return (
    <div className="bg-[#FCF9F4]">
      <Navbar />

      <Hero />

      <TrendingMarquee posts={posts} />

      <FeaturedArticles
        posts={posts}
        categories={categories}
      />

      <MagazineSection magazines={magazines} />

      <WomenInBusiness posts={posts} feature={wibFeature} />

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
