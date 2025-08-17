// components/skeletons/CategoriesSkeleton.tsx
import React from 'react';

const CategoriesSkeleton = () => {
  return (
    <div className="px-6 xl:px-16 max-w-[1540px] mx-auto py-8">
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-80 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-40">
            <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;