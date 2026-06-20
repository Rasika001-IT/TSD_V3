"use client";
import SmartImage from "../../ui/SmartImage";
import Link from "next/link";

const FeaturedStoryBlock = ({ data }) => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Link
          href={`/article/${data.slug}`}
          className="block"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* TEXT */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-4 text-center lg:text-left">

              <h2 className="text-[28px] md:text-[42px] font-heading font-semibold leading-[1.2]">
                {data.title}
              </h2>

              <p className="text-gray-600 leading-[1.8] text-[15px] md:text-[16px]">
                {data.description}
              </p>

              <p className="text-sm font-medium">
                Read Full Article
              </p>

            </div>

            {/* IMAGE */}
            <div className="w-[628px] lg:w-1/2 order-1 lg:order-2 overflow-hidden">
              <SmartImage
                src={data.image}
                alt={data.title}
                className="w-[638px] h-[240px] sm:h-[320px] md:h-[314px] object-cover"
              />
            </div>

          </div>
        </Link>

      </div>
    </section>
  );
};

export default FeaturedStoryBlock;