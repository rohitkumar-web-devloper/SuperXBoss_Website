'use client';

import React from 'react';

const ProductsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex flex-col items-start rounded gap-1.5 w-full max-w-[220px] p-2 bg-gray-100">
                        <div className="relative rounded bg-gray-200 w-full border border-gray-300 aspect-square animate-pulse">
                            <div className="absolute top-2 right-2 bg-gray-300 p-2 rounded-full shadow-md"></div>
                        </div>

                        <div className="w-full px-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>

                            <div className="flex justify-between items-center mt-2">
                                <div className="space-y-1">
                                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-8 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export default ProductsSkeleton;