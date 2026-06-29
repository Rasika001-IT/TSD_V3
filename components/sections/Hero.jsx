"use client";
import Container from "../layout/Container";
import Link from "next/link";
const heroImage = "/assets/images/women/page/George_P_HeroSection.png=";

const Hero = () => {
  return (
    <section className="pt-10 lg:pt-20 pb-16 lg:pb-24 bg-[#C89632]/5">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">

            {/* TAG */}
            <span className="inline-block bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
              Cover Story
            </span>

            {/* HEADING */}
            <h1 className="font-heading text-[42px] lg:text-[56px] leading-[1.1] mt-6">
              The Future of <br />
              <span className="text-[#C89632]">
                Whole-Person Recovery
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-[15px] text-black/70 max-w-lg leading-relaxed">
              Discover how George Patriki is reshaping addiction and mental health care through lived experience, clinical depth, and global education.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-row items-center gap-3 flex-wrap">

              <Link href="/article/jeevantika-lingalwar-redefining-access-in-the-age-of-ai">
                <button className="bg-black text-white px-5 py-3 text-[13px] rounded-md hover:bg-black/80 transition">
                  Read full story →
                </button>
              </Link>

              <Link href="/magazine">
                <button className="border border-black px-5 py-3 text-[13px] rounded-md hover:bg-black hover:text-white transition">
                  Explore Magazine
                </button>
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE + FLOATING CARD */}
          <div className="relative order-1 lg:order-2">

            {/* IMAGE */}
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-auto lg:w-[624px] lg:h-[480px] object-cover"
            />

            {/* FLOATING CARD */}
            <div className="hidden lg:block absolute -bottom-10 left-[-60px] bg-[#F4F4F4] p-6 w-[300px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

              <p className="text-xs text-black/50 mb-3">
                Featured
              </p>

              <p className="text-[15px] leading-snug mb-4 text-black">
                George Patriki: Turning Pain Into Hope in the Fight Against Addiction
              </p>

              <p className="text-[13px] text-[#C89632] leading-snug">
                Clinical Director <br />
                Dual Diagnosis Consultant
              </p>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;