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
}

const ProductCard: React.FC<ProductCardProps> = ({
    name,
    price,
    originalPrice,
    imageUrl,
    isNew,
}) => {
    const discount =
        originalPrice && originalPrice > price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : null;

    return (
        <div className="flex flex-col items-start rounded shadow gap-1.5 w-full max-w-[220px] cursor-pointer hover:-translate-y-4 duration-300 p-2 bg-gray-100 transition">
            <div className="relative rounded bg-white w-full border border-gray-200 aspect-square flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain w-4 h-4/5 group-hover:scale-105 p-8 transition-transform duration-300"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}

                {isNew && (
                    <div className="absolute top-2 left-2">
                        <span className="relative inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-white transform rotate-[-5deg]">
                            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md transform skew-x-[-10deg]"></span>
                            <span className="relative">NEW</span>
                        </span>
                    </div>
                )}

                <button
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
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
                    <div className="absolute bottom-2 left-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-md shadow-sm">
                            <span className="relative">{discount}% OFF</span>
                        </span>
                    </div>
                )}
            </div>

            <div className="w-full px-1">
                <h3 className="font-medium text-sm line-clamp-2 h-[2.5em] leading-tight">
                    {name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="font-bold text-sm">₹{price.toFixed(2)}</p>
                        {originalPrice && originalPrice > price && (
                            <p className="text-xs text-gray-400 line-through">
                                ₹{originalPrice.toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;