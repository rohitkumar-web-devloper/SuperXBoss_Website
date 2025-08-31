'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNoAuthProductBySlugQuery } from '@/services/apis/publicApis/hooks';

const ProductDetailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    const [selectedMedia, setSelectedMedia] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showAppPopup, setShowAppPopup] = useState(false);

    const { data, isLoading, isError } = useNoAuthProductBySlugQuery(slug || "");
    const product = data?._payload;

    const discountPercentage = product?.discount_customer_price && product?.customer_price > product?.discount_customer_price
        ? Math.round(((product.customer_price - product.discount_customer_price) / product.customer_price) * 100)
        : 0;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(price);

    const handleQuantityChange = (value: number) => {
        const minQty = product?.min_qty || 1;
        setQuantity(Math.max(minQty, value));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product || isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const images = product.images || [];
    const videos = product.videos || [];
    const hasVideos = videos.length > 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* App Download Popup */}
                {showAppPopup && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Download Our App</h3>
                                <button
                                    onClick={() => setShowAppPopup(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-gray-600 mb-6">For the best shopping experience, please download our mobile app.</p>
                            <div className="flex flex-col space-y-4">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.yourcompany.yourapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Get on Google Play
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Section */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Media Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                {images.length > 0 ? (
                                    <Image
                                        src={images[selectedMedia]}
                                        alt={product.name}
                                        fill
                                        className="object-contain w-full h-full p-4"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">No Image Available</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                    {discountPercentage > 0 && (
                                        <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">{discountPercentage}% OFF</span>
                                    )}
                                    {product.trend_part && (
                                        <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">TRENDING</span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {images.map((item: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedMedia === index ? 'border-default-500' : 'border-gray-200'}`}
                                            onClick={() => setSelectedMedia(index)}
                                        >
                                            <Image src={item} alt={`${product.name} view ${index + 1}`} fill className="object-contain" unoptimized />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center space-x-3">
                                {product.name}
                            </h1>
                            {product.brand && (
                                <p className="text-gray-600 mt-2 flex text-lg items-center space-x-2">
                                    Brand:
                                    <span className="font-medium flex items-center space-x-2">
                                        {product.brand.name}
                                        {product.brand.logo && (
                                            <Image
                                                src={product.brand.logo}
                                                alt={product.brand.name}
                                                width={60}
                                                height={60}
                                                className="object-contain rounded"
                                                unoptimized
                                            />
                                        )}
                                    </span>
                                </p>
                            )}
                            <p className="text-gray-500 text-sm mt-1">Part No: {product.part_no}</p>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold text-gray-900">{formatPrice(product.discount_customer_price || product.customer_price || 0)}</span>
                                    {product.discount_customer_price && product.customer_price > product.discount_customer_price && (
                                        <span className="text-xl text-gray-500 line-through">{formatPrice(product.customer_price)}</span>
                                    )}
                                </div>
                                {discountPercentage > 0 && (
                                    <p className="text-green-600 font-medium">You save {formatPrice(product.customer_price - (product.discount_customer_price || 0))} ({discountPercentage}%)</p>
                                )}
                            </div>

                            {/* Stock */}
                            <p className={`text-sm font-medium ${product.item_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.item_stock > 0 ? `In Stock (${product.item_stock} available)` : 'Out of Stock'}
                            </p>

                            {/* Quantity Selector */}
                            {product.min_qty && product.min_qty > 1 && <span className="text-sm text-gray-500">Minimum: {product.min_qty}</span>}

                            {/* Purchase Button */}
                            <button
                                onClick={() => setShowAppPopup(true)}
                                className="w-full bg-default-600 text-white py-3 px-6 rounded-md hover:bg-default-700 transition-colors flex items-center justify-center"
                            >
                                Continue to Purchase
                            </button>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="border-t border-gray-200 p-6 space-y-8">
                        <h3 className="text-xl font-medium mb-4">Product Description</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {product.description || 'No description available for this product.'}
                        </p>
                    </div>

                    {/* Videos */}
                    {hasVideos && (
                        <div className="p-6">
                            <h3 className="text-xl font-medium mb-4">Product Videos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {videos.map((video: string, idx: number) => (
                                    <div key={idx} className="rounded-lg overflow-hidden bg-black aspect-video">
                                        <video src={video} controls className="w-full h-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
