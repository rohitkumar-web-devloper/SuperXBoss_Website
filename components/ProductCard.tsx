import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Icons } from "@/assets/assets";
interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl: string | StaticImageData;
    rating?: number;
    isNew?: boolean; // added for future use
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    originalPrice,
    imageUrl,
    rating = 4.5,
    isNew,
}) => {
    return (
        <div className="flex flex-col items-start rounded-lg gap-1.5 w-full max-w-[220px] cursor-pointer hover:shadow-lg transition-shadow duration-300 p-2 rounded-l">
            {/* Product Image */}
            <div className="relative bg-gray-100 rounded-lg w-full aspect-square flex items-center justify-center overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain w-4/5 h-4/5 group-hover:scale-105 transition-transform duration-300"
                />
                {/* <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div> */}
                <button
                    // onClick={handleWishlistClick}
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
            </div>

            {/* Product Info */}
            <div className="w-full px-1">
                <h3 className="font-medium text-sm md:text-base line-clamp-2 h-[2.5em] leading-tight">
                    {name}
                </h3>
                {/* <p className="text-xs text-gray-500 mt-1 line-clamp-2 h-[2.5em]">
          {product.description}
        </p> */}

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                src={index < Math.floor(rating) ? Icons.star_icon : Icons.star_dull_icon}
                                alt={index < rating ? 'filled star' : 'empty star'}
                                width={12}
                                height={12}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">${price.toFixed(2)}</p>
                        {originalPrice && (
                            <p className="text-xs text-gray-400 line-through">
                                ${originalPrice.toFixed(2)}
                            </p>
                        )}
                    </div>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
