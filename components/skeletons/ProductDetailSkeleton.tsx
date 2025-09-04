'use client';

import React from 'react';

const ProductDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Left Side: Media Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-200 animate-pulse" />

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square rounded-md overflow-hidden border border-gray-200 bg-gray-200 animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Product Info */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />

                            {/* Brand */}
                            <div className="flex items-center space-x-3">
                                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Product IDs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                                ))}
                            </div>

                            {/* Price + Unit */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Stock */}
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />

                            {/* Quantity */}
                            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />

                            {/* Purchase Button */}
                            <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t border-gray-200 p-6 space-y-4">
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Videos */}
                    <div className="p-6 space-y-4">
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
