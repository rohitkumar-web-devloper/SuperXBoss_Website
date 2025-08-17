"use client";

import React from "react";

const TopCategoriesSkeleton = () => {
  return (
    <section className="py-12 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center shadow p-6 rounded-lg bg-white border border-gray-100"
          >
            <div className="w-16 h-16 mb-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="inline-block h-10 w-36 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </section>
  );
};

export default TopCategoriesSkeleton;