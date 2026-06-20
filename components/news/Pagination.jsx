"use client";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPages = () => {
    const pages = [];

    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="w-9 h-9 md:w-10 md:h-10 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          1
        </button>
      );

      if (currentPage > 4) {
        pages.push(
          <span
            key="ellipsis-start"
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-500"
          >
            ...
          </span>
        );
      }
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-md text-sm font-medium transition ${
            i === currentPage
              ? "bg-[#C89B3C] text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="ellipsis-end"
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-500"
          >
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="w-9 h-9 md:w-10 md:h-10 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-10 md:mt-12 px-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Prev
      </button>

      <div className="flex gap-1 flex-wrap justify-center">
        {renderPages()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;