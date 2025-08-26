"use client";

import React from 'react';

const NewArrivalsSkeleton = () => {
    return (
        <section className="mt-14 mb-10">
            {/* Title Section */}
            <div className="flex flex-col items-center">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-28 h-0.5 bg-gray-200 mt-2 animate-pulse"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-14 mt-12  inset-0">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="relative group shadow h-64 bg-gray-200 animate-pulse rounded overflow-hidden">
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {/* Text Content Placeholder */}
                        <div className="absolute bottom-8 left-8 space-y-2 w-3/4">
                            <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivalsSkeleton;