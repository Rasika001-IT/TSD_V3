import { stripHtml } from "../utils/stripHtml";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import HeroFeature from "../components/sections/women/HeroFeature";
import FeaturedStoryBlock from "../components/sections/women/FeaturedStoryBlock";
import StoryRow from "../components/sections/women/StoryRow";

// Server component: posts (Women of Impact, cat 135) are fetched on the server
// (app/women-in-business/page.js) and rendered into the HTML — no loader.
const WomenInBusiness = ({ posts = [], covers = null }) => {
  // Landing image (curated portrait) per post, falling back to the article image.
  const landingFor = (post) => covers?.byPost?.[post?.uuid] || post?.image;

  // Hero = the manually-marked article if set, else the most-recent one.
  const heroPost =
    (covers?.heroPostId && posts.find((p) => p.uuid === covers.heroPostId)) || posts[0];
  const rest = posts.filter((p) => p.uuid !== heroPost?.uuid);
  const featuredPost = rest[0];
  const storyPosts = rest.slice(1, 4);

  const hero = heroPost
    ? {
        title: heroPost.title,
        description: stripHtml(heroPost.excerpt),
        image: landingFor(heroPost),
        href: `/article/${heroPost.slug}`,
      }
    : null;

  return (
    <>
      <Navbar />

      {hero && <HeroFeature data={hero} />}

      {featuredPost && (
        <FeaturedStoryBlock
          data={{
            title: featuredPost.title,
            description: stripHtml(featuredPost.excerpt),
            image: landingFor(featuredPost),
            slug: featuredPost.slug,
          }}
        />
      )}

      {storyPosts.map((story, index) => (
        <StoryRow
          key={story.id}
          title={story.title}
          description={stripHtml(story.excerpt)}
          image={landingFor(story)}
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
