"use client";
import SmartImage from "../../ui/SmartImage";
import Link from "next/link";
const jeevantikaImage = "/assets/images/women/page/jeevantika.png";

const HeroFeature = ({ data }) => {
  return (
    <section className="bg-gradient-to-r from-[#1c1f26] to-[#2a2f3a] py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <Link
          href={`/article/${data.slug}`}
          className="block"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* IMAGE */}
            <div className="w-full lg:w-1/2 overflow-hidden">
              <SmartImage
  src={jeevantikaImage}
  alt={data.title}
  className="w-[480px] h-[280px] sm:h-[380px] md:h-[480px] object-cover"
/>
            </div>

            {/* CONTENT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-5">

              <h1 className="text-[32px] sm:text-[42px] md:text-[52px] font-heading font-bold text-white leading-[1.1]">
                {data.title}
              </h1>

              <p className="text-gray-300 leading-[1.8] text-[15px] md:text-[17px]">
                {data.description}
              </p>

              <p className="inline-block bg-white text-black px-6 py-3 rounded-lg text-sm font-medium">
                Read More
              </p>

            </div>

          </div>
        </Link>

      </div>
    </section>
  );
};

export default HeroFeature;