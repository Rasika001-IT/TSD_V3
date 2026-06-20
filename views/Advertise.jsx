"use client";
// src/pages/Advertise.jsx

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";
import AdvertiseContent from "../components/advertise/AdvertiseContent";

const Advertise = () => {
  return (
    <div className="bg-[#FCF9F4]">
      <Navbar />
      <AdvertiseContent />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Advertise;