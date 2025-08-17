"use client";
import React from "react";

const HeaderSliderSkeleton = () => {
    return (
        <div className="overflow-hidden relative w-full">
            <div className="flex">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col-reverse md:flex-row items-center sm:shadow sm:border border-gray-200 justify-between sm:py-8 md:px-14 sm:px-5 mt-6 rounded min-w-full relative"
                    >
                        {/* Discount Badge Skeleton */}
                        <div className="absolute top-4 right-4 bg-gray-200 h-6 w-12 rounded-full animate-pulse"></div>

                        {/* Left Content Skeleton */}
                        <div className="md:pl-8 mt-10 md:mt-0 md:w-1/2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-gray-200 rounded-full h-10 w-10 animate-pulse"></div>
                                <div className="bg-gray-200 h-4 w-24 animate-pulse"></div>
                            </div>
                            
                            <div className="bg-gray-200 h-8 w-3/4 mb-6 animate-pulse"></div>
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-gray-200 h-6 w-16 animate-pulse"></div>
                                <div className="bg-gray-200 h-4 w-12 animate-pulse"></div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                                <div className="bg-gray-200 h-3 w-full animate-pulse"></div>
                                <div className="bg-gray-200 h-3 w-2/3 animate-pulse"></div>
                            </div>
                            
                            <div className="bg-gray-200 h-10 w-32 rounded-full animate-pulse"></div>
                        </div>

                        {/* Right Image Skeleton */}
                        <div className="flex items-center justify-center flex-1 md:w-1/2">
                            <div className="bg-gray-200 md:w-80 w-64 h-64 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Skeleton */}
            <div className="flex items-center justify-center gap-2 mt-8">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="h-3 w-3 rounded-full bg-gray-300 animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
};

export default HeaderSliderSkeleton;