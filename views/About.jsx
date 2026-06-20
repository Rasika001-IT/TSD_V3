"use client";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";

import AboutHero from "../components/sections/about/AboutHero";
import AboutServices from "../components/sections/about/AboutServices";
import Newsletter from "../components/sections/Newsletter";

const About = () => {
  return (
    <>
      <Navbar />

      {/* ✅ SINGLE DARK BOX WRAPPER */}
      <section className="bg-[#FCF9F4] py-16 px-4">
        <div className="max-w-6xl mx-auto bg-[#1D1F26] text-white rounded-lg py-16 px-8 md:px-16">

          <AboutHero />
          <AboutServices />

        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default About;