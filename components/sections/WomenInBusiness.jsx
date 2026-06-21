"use client";
import SmartImage from "../ui/SmartImage";
import { stripHtml } from "../../utils/stripHtml";
import { useRef } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import Container from "../layout/Container";

// STATIC IMAGES
const JeevantikaImg = "/assets/images/women/jeevantika.png";
const KamiyaImg = "/assets/images/women/kamiya.png";
const KristineImg = "/assets/images/women/kristin.png";
const TiaImg = "/assets/images/women/tia.png";
const ZarineImg = "/assets/images/women/zarine.png";

const leftArrow = "/assets/icons/arrow-left.svg";
const rightArrow = "/assets/icons/arrow-right.svg";

const WOMEN_IMAGES = [
  JeevantikaImg,
  KamiyaImg,
  TiaImg,
  ZarineImg,
  KristineImg,
];

const EXCLUDED_POST_ID = 4259;



const truncateText = (
  text,
  limit
) => {
  if (text.length <= limit)
    return text;

  return (
    text.substring(0, limit).trim() +
    "..."
  );
};

const WomenInBusiness = ({
  posts = [],
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const womenPosts = posts
    .filter(
      (post) =>
        post.categories.includes(
          135
        ) &&
        post.id !==
          EXCLUDED_POST_ID
    )
    .slice(0, 5);

  if (!womenPosts.length) {
    console.log(
      "No Women of Impact posts found."
    );

    return null;
  }

  return (
    <section className="bg-[#C89632]/5 py-24 overflow-hidden">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
            Special Features
          </span>

          <h2 className="font-heading text-4xl font-bold mt-4">
            Women in Business
          </h2>

          <p className="text-sm text-black/70 max-w-xl mx-auto mt-3 leading-relaxed">
            Celebrating the visionary women who are breaking barriers and reshaping industries across the globe.
          </p>

          <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-4"></div>
        </div>

        {/* CAROUSEL */}
        <div className="relative px-8">

          {/* LEFT */}
          <button
            ref={prevRef}
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              z-10
            "
          >
            <SmartImage
              src={leftArrow}
              alt="Previous"
              className="w-7 h-7 opacity-60 hover:opacity-100 transition"
            />
          </button>

          {/* RIGHT */}
          <button
            ref={nextRef}
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              z-10
            "
          >
            <SmartImage
              src={rightArrow}
              alt="Next"
              className="w-7 h-7 opacity-60 hover:opacity-100 transition"
            />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl =
                prevRef.current;

              swiper.params.navigation.nextEl =
                nextRef.current;
            }}
          >
            {womenPosts.map(
              (post, index) => (
                <SwiperSlide key={post.id}>
                  <Link
                    href={`/article/${post.slug}`}
                  >
                    <div className="relative group cursor-pointer overflow-hidden">

                      <SmartImage
                        src={
                          WOMEN_IMAGES[
                            index %
                              WOMEN_IMAGES.length
                          ]
                        }
                        alt={stripHtml(
                          post.title
                        )}
                        className="w-full h-[452px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/75 transition-all duration-500 text-white">

                        <h3
                          className="font-heading font-semibold text-lg"
                          dangerouslySetInnerHTML={{
                            __html:
                              post.title,
                          }}
                        />

                        <p className="text-xs mt-2 italic opacity-80">
                          "
                          {truncateText(
                            stripHtml(
                              post.excerpt
                            ),
                            70
                          )}
                          "
                        </p>

                        <p className="text-xs mt-3 font-medium">
                          Read Story →
                        </p>

                      </div>

                    </div>
                  </Link>
                </SwiperSlide>
              )
            )}
          </Swiper>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-14">
          <Link href="/women-in-business">
            <button className="bg-black text-white px-6 py-3 text-sm rounded-[5px] hover:opacity-80 transition">
              Explore All Profiles
            </button>
          </Link>
        </div>

      </Container>
    </section>
  );
};

export default WomenInBusiness;