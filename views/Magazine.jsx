"use client";
import Navbar from "../components/layout/Navbar";
import MagazineGrid from "../components/magazine/MagazineGrid";

import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";

const Magazine = () => {
  return (
    <div className="bg-[#1D1F26] min-h-screen">
      <Navbar />

      <MagazineGrid />

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Magazine;