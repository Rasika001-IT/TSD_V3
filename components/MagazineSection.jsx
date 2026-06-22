"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { useRef } from "react";

import Container from "./layout/Container";

const leftArrow = "/assets/icons/arrow-left.svg";
const rightArrow = "/assets/icons/arrow-right.svg";

// `magazines` come from the CMS (Supabase) via the homepage server component.
const MagazineSection = ({ magazines = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSubscribeClick = () => {
    const newsletterSection = document.getElementById("newsletter");
    if (!newsletterSection) return;
    // Lenis owns the scroll on the public site, so drive it through the shared
    // instance; native scrollIntoView is a no-op while Lenis is active.
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(newsletterSection, { offset: -80 });
    } else {
      newsletterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-[#F5F2ED] py-20 overflow-hidden">

      <Container>

        {/* HEADER */}
        <div className="text-center font-bold text-4xl mb-14">
          <span className="text-[#C89632] uppercase tracking-[0.3em] text-xs">
            Latest Issues
          </span>

          <h2 className="font-heading text-5xl mt-4">
            The Magazine
          </h2>

          <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-5" />
        </div>

        {/* SLIDER */}
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
            <img
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
            <img
              src={rightArrow}
              alt="Next"
              className="w-7 h-7 opacity-60 hover:opacity-100 transition"
            />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={35}
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
            {magazines.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  onClick={() =>
                    window.open(
                      `/magazine/${item.slug}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="cursor-pointer group text-center"
                >

                  {/* COVER */}
                  <div className="overflow-hidden">
                    <img
                      src={item.cover_image}
                      alt={item.edition_title || item.post?.title || ""}
                      className="
                        w-[290px] h-[375px]
                        aspect-[291/372]
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      font-heading
                      text-2xl
                      mt-5
                      leading-snug
                      group-hover:text-[#C89632]
                      transition-colors
                    "
                  >
                    {item.edition_title || item.post?.title}
                  </h3>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-16">
          <button
            onClick={handleSubscribeClick}
            className="bg-black text-white px-6 py-3 text-sm rounded-[5px] hover:opacity-80 transition"
          >
            Subscribe to Print + Digital
          </button>
        </div>

      </Container>

    </section>
  );
};

export default MagazineSection;