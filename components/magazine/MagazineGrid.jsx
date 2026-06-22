"use client";
import Container from "../layout/Container";
import Link from "next/link";
import { useState } from "react";

// `magazines` come from the CMS (Supabase) via the /magazine server component.
const MagazineGrid = ({ magazines = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(magazines.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = magazines.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 pt-6 sm:pt-10">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 px-2">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white leading-tight">
            The Magazine
          </h2>

          <p className="font-body text-sm sm:text-base text-gray-400 mb-5 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Discover inspiring journeys, bold ideas, and success stories from
            leaders across industries.
          </p>

          <div className="w-20 sm:w-24 h-[2px] bg-primary mx-auto"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
          {currentItems.map((item) => (
            <Link
              key={item.id}
              href={`/magazine/${item.slug}`}
              className="w-full"
            >
              <div className="group cursor-pointer w-full">
                <div className="overflow-hidden rounded-md bg-[#252830]">
                  <img
                    src={item.cover_image}
                    alt={item.edition_title || item.post?.title || ""}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h3 className="mt-3 sm:mt-5 px-1 font-heading font-semibold text-sm sm:text-lg lg:text-xl text-gray-200 leading-snug group-hover:text-primary transition-colors duration-300">
                  {item.edition_title || item.post?.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-10 sm:mt-16 flex-wrap">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm rounded transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-white text-black font-medium"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default MagazineGrid;