"use client";

import React from 'react';

const TrendingPartSkeleton = () => {
  return (
    <div className="flex flex-col items-center pt-14">
      {/* Title Skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse self-start"></div>
      
      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col items-start rounded shadow gap-1.5 w-full p-2 bg-gray-100 animate-pulse">
            {/* Product Image */}
            <div className="relative rounded bg-gray-200 w-full aspect-square"></div>
            
            {/* Product Info */}
            <div className="w-full px-1 space-y-2 mt-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* See More Button Skeleton */}
      <div className="h-10 w-36 bg-gray-200 rounded animate-pulse mb-14"></div>
    </div>
  );
};

export default TrendingPartSkeleton;