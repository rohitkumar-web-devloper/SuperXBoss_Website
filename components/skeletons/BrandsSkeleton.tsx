'use client';

import React from 'react';

const BrandsSkeleton = () => {
    return (
        <div className="px-6 xl:px-16 max-w-[1540px] mx-auto py-8">
            <div className="mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-40 animate-pulse"></div>
                ))}
            </div>
        </div>
    );
};

export default BrandsSkeleton;