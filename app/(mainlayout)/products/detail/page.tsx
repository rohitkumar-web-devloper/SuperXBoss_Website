'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const ProductDetailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedMedia, setSelectedMedia] = useState(0);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showAppPopup, setShowAppPopup] = useState(false);

    useEffect(() => {
        // Get product data from query parameter
        const productData = searchParams.get('data');

        if (productData) {
            try {
                const decodedProduct = JSON.parse(decodeURIComponent(productData));
                setProduct(decodedProduct);
            } catch (error) {
                console.error('Error parsing product data:', error);
            }
        }
        setLoading(false);
    }, [searchParams]);

    // Calculate discount percentage if applicable
    const discountPercentage = product?.discount_customer_price && product?.customer_price > product?.discount_customer_price
        ? Math.round(((product.customer_price - product.discount_customer_price) / product.customer_price) * 100)
        : 0;

    // Format price with Indian rupee symbol
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(price);
    };

    // Handle quantity changes
    const handleQuantityChange = (value: number) => {
        const minQty = product?.min_qty || 1;
        const newValue = Math.max(minQty, value);
        setQuantity(newValue);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product) {
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

    // Check if product has videos
    const hasVideos = product.videos && product.videos.length > 0;
    // Only use images for the main gallery
    const images = product.images || [];
    const videos = product.videos || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
    
                {/* App Download Popup */}
                {showAppPopup && (
                    <div className="fixed inset-0  bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
                            <p className="text-gray-600 mb-6">
                                For the best shopping experience, please download our mobile app.
                            </p>
                            <div className="flex flex-col space-y-4">
                                <a 
                                    href="https://play.google.com/store/apps/details?id=com.yourcompany.yourapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.781 9.186l-2.857-2.857-7.111 7.111 9.968-4.254zm-9.968 2.254l7.111 7.111 2.857-2.857-9.968-4.254z" fill="currentColor"/>
                                    </svg>
                                    Get on Google Play
                                </a>
                                <a 
                                    href="https://apps.apple.com/app/your-app-id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                                        <path d="M17.05 12.04C17.03 9.53 19.18 8.1 19.25 8.04C17.99 6.12 16.04 5.89 15.36 5.86C13.78 5.69 12.24 6.96 11.46 6.96C10.67 6.96 9.39 5.88 8.03 5.91C6.3 5.94 4.74 6.99 3.87 8.56C2.04 11.63 3.33 16.28 5.05 18.71C5.92 19.95 6.95 21.33 8.3 21.27C9.62 21.21 10.1 20.41 11.69 20.41C13.27 20.41 13.72 21.27 15.1 21.25C16.5 21.23 17.41 19.99 18.24 18.75C19.18 17.37 19.58 16.02 19.6 15.96C19.56 15.94 17.07 14.9 17.05 12.04ZM15.28 4.1C15.94 3.27 16.38 2.13 16.24 1C15.22 1.05 14.02 1.66 13.33 2.49C12.72 3.22 12.18 4.4 12.34 5.5C13.45 5.58 14.59 4.96 15.28 4.1Z" fill="currentColor"/>
                                    </svg>
                                    Download on App Store
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Product Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Media Gallery */}
                        <div className="space-y-4">
                            {/* Main Media */}
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

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                    {discountPercentage > 0 && (
                                        <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                                            {discountPercentage}% OFF
                                        </span>
                                    )}
                                    {product.trend_part && (
                                        <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                                            TRENDING
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {images.map((item: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedMedia === index ? 'border-default-500' : 'border-gray-200'}`}
                                            onClick={() => setSelectedMedia(index)}
                                        >
                                            <Image
                                                src={item}
                                                alt={`${product.name} view ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                                {product.brand && (
                                    <p className="text-gray-600 mt-2">Brand: <span className="font-medium">{product.brand.name}</span></p>
                                )}
                                <p className="text-gray-500 text-sm mt-1">Part No: {product.part_no}</p>
                            </div>

                            {/* Price Section */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {formatPrice(product.discount_customer_price || product.customer_price||0)}
                                    </span>
                                    {product.discount_customer_price && product.customer_price > product.discount_customer_price && (
                                        <span className="text-xl text-gray-500 line-through">
                                            {formatPrice(product.customer_price)}
                                        </span>
                                    )}
                                </div>
                                {discountPercentage > 0 && (
                                    <p className="text-green-600 font-medium">You save {formatPrice(product.customer_price - product.discount_customer_price)} ({discountPercentage}%)</p>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div>
                                <p className={`text-sm font-medium ${product.item_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.item_stock > 0 ? 
                                        `In Stock (${product.item_stock} available)` : 
                                        'Out of Stock'}
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Quantity:</span>
                                {/* <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= (product.min_qty || 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 border-l border-r border-gray-300">{quantity}</span>
                                    <button
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div> */}
                                {product.min_qty > 1 && (
                                    <span className="text-sm text-gray-500">Minimum: {product.min_qty}</span>
                                )}
                            </div>

                            {/* Action Button - Opens App Download Popup */}
                            <div className="pt-4">
                                <button 
                                    onClick={() => setShowAppPopup(true)}
                                    className="w-full bg-default-600 text-white py-3 px-6 rounded-md hover:bg-default-700 transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Continue to Purchase
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-4 border-t border-gray-200">
                                {product.hsn_code && (
                                    <div className="flex">
                                        <span className="text-gray-600 w-32">HSN Code:</span>
                                        <span className="font-medium">{product.hsn_code}</span>
                                    </div>
                                )}
                                {product.tax && (
                                    <div className="flex">
                                        <span className="text-gray-600 w-32">Tax:</span>
                                        <span className="font-medium">{product.tax}%</span>
                                    </div>
                                )}
                                {product.unit && (
                                    <div className="flex">
                                        <span className="text-gray-600 w-32">Unit:</span>
                                        <span className="font-medium">{product.unit.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section - All data shown by default */}
                    <div className="border-t border-gray-200 p-6 space-y-8">
                        {/* Product Description */}
                        <div>
                            <h3 className="text-xl font-medium mb-4">Product Description</h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {product.description || 'No description available for this product.'}
                            </p>
                        </div>

                        {/* Product Specifications */}
                        <div>
                            <h3 className="text-xl font-medium mb-4">Product Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    {product.part_no && (
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Part Number</span>
                                            <span className="font-medium">{product.part_no}</span>
                                        </div>
                                    )}
                                    {product.brand && (
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Brand</span>
                                            <span className="font-medium">{product.brand.name}</span>
                                        </div>
                                    )}
                                    {product.hsn_code && (
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">HSN Code</span>
                                            <span className="font-medium">{product.hsn_code}</span>
                                        </div>
                                    )}
                                    {product.unit && (
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Unit</span>
                                            <span className="font-medium">{product.unit.name}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {product.tax && (
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Tax Rate</span>
                                            <span className="font-medium">{product.tax}%</span>
                                        </div>
                                    )}
                                    <div className="flex">
                                        <span className="text-gray-600 w-40">Customer Price</span>
                                        <span className="font-medium">{formatPrice(product.customer_price||0)}</span>
                                    </div>
                                    {product.discount_customer_price && (
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Discounted Price</span>
                                            <span className="font-medium">{formatPrice(product.discount_customer_price)}</span>
                                        </div>
                                    )}
                                    <div className="flex">
                                        <span className="text-gray-600 w-40">Stock Status</span>
                                        <span className={`font-medium ${product.item_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.item_stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video Section */}
                        {hasVideos && (
                            <div>
                                <h3 className="text-xl font-medium mb-4">Product Videos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {videos.map((video: string, index: number) => (
                                        <div key={index} className="rounded-lg overflow-hidden bg-black aspect-video">
                                            <video 
                                                src={video} 
                                                controls
                                                className="w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;