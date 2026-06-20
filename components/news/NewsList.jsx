"use client";
import Container from "../layout/Container";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";

const NewsList = ({ horizontalPosts, verticalPosts }) => {
  return (
    <section className="mt-12 md:mt-20 mb-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-12 md:gap-14">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-10 md:gap-12">
            {horizontalPosts.map((post) => (
              <NewsCardHorizontal key={post.id} post={post} />
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col gap-10 md:gap-12 lg:border-l border-gray-200 lg:pl-12 lg:mt-[2px] pt-4 lg:pt-0">
            {verticalPosts.map((post) => (
              <NewsCardVertical key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsList;