import { stripHtml } from "../utils/stripHtml";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import HeroFeature from "../components/sections/women/HeroFeature";
import FeaturedStoryBlock from "../components/sections/women/FeaturedStoryBlock";
import StoryRow from "../components/sections/women/StoryRow";

// Server component: posts (Women of Impact, cat 135) are fetched on the server
// (app/women-in-business/page.js) and rendered into the HTML — no loader.
const WomenInBusiness = ({ posts = [] }) => {
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
            description: stripHtml(heroPost.excerpt),
            image: heroPost.image,
            slug: heroPost.slug,
          }}
        />
      )}

      {featuredPost && (
        <FeaturedStoryBlock
          data={{
            title: featuredPost.title,
            description: stripHtml(featuredPost.excerpt),
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
