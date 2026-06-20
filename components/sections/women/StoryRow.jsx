"use client";
import SmartImage from "../../ui/SmartImage";
import Link from "next/link";

const StoryRow = ({ title, description, image, reverse, slug }) => {
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Link
          href={`/article/${slug}`}
          className="block"
        >
          <div
            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
              reverse ? "lg:flex-row-reverse" : ""
            }`}
          >

            {/* IMAGE */}
            <div className="w-[628px] lg:w-1/2 overflow-hidden">
              <SmartImage
                src={image}
                alt={title}
                className="w-[628px] h-[240px] sm:h-[320px] md:h-[314px] object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">

              <h3 className="text-[28px] md:text-[40px] font-heading font-semibold leading-[1.2]">
                {title}
              </h3>

              <p className="text-gray-600 leading-[1.8] text-[15px] md:text-[16px]">
                {description}
              </p>

              <p className="text-sm font-medium">
                Read Full Article
              </p>

            </div>

          </div>
        </Link>

      </div>
    </section>
  );
};

export default StoryRow;