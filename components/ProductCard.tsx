"use client"
import React from 'react';
import Image from 'next/image';
import { Icons } from "@/assets/assets";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    isNew?: boolean;
    handleNavigate?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    originalPrice,
    imageUrl,
    isNew,
    handleNavigate,
}) => {
    const discount =
        originalPrice && originalPrice > price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : null;

    return (
        <div className="group flex flex-col items-start rounded-lg shadow-md gap-1.5 w-full max-w-[220px] cursor-pointer hover:-translate-y-2 duration-300 p-2 bg-gray-50 transition-all sm:hover:shadow-xl">
            <div className="relative rounded-lg bg-white w-full border border-gray-200 aspect-square flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain w-4 h-4/5 group-hover:scale-105 p-6 transition-transform duration-300"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}


                <button
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
                    aria-label="Add to wishlist"
                >
                    <Image
                        src={Icons.heart_icon}
                        alt="heart icon"
                        width={12}
                        height={12}
                    />
                </button>

                {discount && (
                    <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-md shadow-sm">
                            <span className="relative">{discount}% OFF</span>
                        </span>
                    </div>
                )}

                {/* View Detail Button - appears on hover */}
                <div className="hidden absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 sm:flex items-end justify-center opacity-0 group-hover:opacity-100 pb-4">
                    <button
                        onClick={handleNavigate}
                        className="bg-white text-gray-800 py-2 px-4 rounded-md font-medium text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-50 border border-gray-200"
                    >
                        View Details
                    </button>
                </div>
            </div>

            <div className="w-full px-1">
                <h3 className="font-medium text-sm line-clamp-2 h-[2.5em] leading-tight text-gray-800">
                    {name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="font-bold text-sm text-gray-900">₹{price.toFixed(2)}</p>
                        {originalPrice && originalPrice > price && (
                            <p className="text-xs text-gray-500 line-through">
                                ₹{originalPrice.toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>

                {/* View Detail Button for mobile - always visible */}
                <button
                    onClick={handleNavigate}
                    className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-md text-xs font-medium transition-colors md:hidden border border-gray-300"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;