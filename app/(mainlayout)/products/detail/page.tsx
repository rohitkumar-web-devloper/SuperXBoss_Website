'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icons } from "@/assets/assets";

const ProductDetailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    // Calculate discount percentage if applicable
    const discountPercentage = product.discount_customer_price && product.customer_price > product.discount_customer_price
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

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Product Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square  rounded-lg overflow-hidden border border-gray-200">
                                {product.images && product.images.length > 0 ? (
                                    <Image
                                        src={product.images[selectedImage]}
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
                                    {/* {product.new_arrival && (
                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md">
                                            NEW
                                        </span>
                                    )} */}
                                    {discountPercentage > 0 && (
                                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                                            {discountPercentage}% OFF
                                        </span>
                                    )}
                                    {product.trend_part && (
                                        <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-md">
                                            TRENDING
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images.map((image: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`relative aspect-square  rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-default-500' : 'border-gray-200'}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} view ${index + 1}`}
                                                fill
                                                className="object-contain"
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
                                    <p className="text-gray-600 mt-1">Brand: {product.brand.name}</p>
                                )}
                                <p className="text-gray-500 text-sm mt-1">Part No: {product.part_no}</p>
                            </div>

                            {/* Price Section */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {formatPrice(product.discount_customer_price || product.customer_price)}
                                    </span>
                                    {product.discount_customer_price && product.customer_price > product.discount_customer_price && (
                                        <span className="text-lg text-gray-500 line-through">
                                            {formatPrice(product.customer_price)}
                                        </span>
                                    )}
                                </div>

                                {product.bulk_discount && product.bulk_discount.length > 0 && (
                                    <div className="bg-gray-50 p-3 rounded-md">
                                        <h3 className="font-medium text-default mb-1">Bulk Discounts Available</h3>
                                        {product.bulk_discount.map((discount: any, index: number) => (
                                            <p key={index} className="text-sm text-default-700">
                                                Buy {discount.count}+ units: Get {discount.discount}% off
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div>
                                <p className={`text-sm font-medium ${product.item_stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.item_stock > 0 ? `In Stock (${product.item_stock} available)` : 'Out of Stock'}
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            {/* <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">{quantity}</span>
                                    <button
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= (product.item_stock || 10)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div> */}

                            {/* Action Buttons */}
                            {/* <div className="flex flex-col sm:flex-row gap-3">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2">
                                    <Image src={Icons.star_icon} alt="Cart" width={16} height={16} />
                                    Add to Cart
                                </button>
                                <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-medium">
                                    Buy Now
                                </button>
                                <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                                    <Image src={Icons.heart_icon} alt="Wishlist" width={20} height={20} />
                                </button>
                            </div> */}

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {product.min_qty > 1 && (
                                    <div>
                                        <span className="text-gray-600">Minimum Qty:</span>
                                        <span className="ml-2 font-medium">{product.min_qty}</span>
                                    </div>
                                )}
                                {product.hsn_code && (
                                    <div>
                                        <span className="text-gray-600">HSN Code:</span>
                                        <span className="ml-2 font-medium">{product.hsn_code}</span>
                                    </div>
                                )}
                                {product.tax && (
                                    <div>
                                        <span className="text-gray-600">Tax:</span>
                                        <span className="ml-2 font-medium">{product.tax}%</span>
                                    </div>
                                )}
                                {product.unit && (
                                    <div>
                                        <span className="text-gray-600">Unit:</span>
                                        <span className="ml-2 font-medium">{product.unit.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="border-t border-gray-200">
                        <div className="flex border-b border-gray-200">
                            <button
                                className={`px-6 py-3 font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button
                                className={`px-6 py-3 font-medium ${activeTab === 'specifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('specifications')}
                            >
                                Specifications
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'description' && (
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Product Description</h3>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {product.description || 'No description available for this product.'}
                                    </p>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium mb-4">Product Details</h3>
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
                                        {/* {product.segment_type && product.segment_type.length > 0 && (
                                            <div className="flex">
                                                <span className="text-gray-600 w-40">Segment Type</span>
                                                <span className="font-medium">{product.segment_type.join(', ')}</span>
                                            </div>
                                        )} */}
                                        {product.hsn_code && (
                                            <div className="flex">
                                                <span className="text-gray-600 w-40">HSN Code</span>
                                                <span className="font-medium">{product.hsn_code}</span>
                                            </div>
                                        )}
                                        {product.tax && (
                                            <div className="flex">
                                                <span className="text-gray-600 w-40">Tax Rate</span>
                                                <span className="font-medium">{product.tax}%</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium mb-4">Pricing & Inventory</h3>
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Customer Price</span>
                                            <span className="font-medium">{formatPrice(product.customer_price)}</span>
                                        </div>
                                        {product.discount_customer_price && (
                                            <div className="flex">
                                                <span className="text-gray-600 w-40">Discounted Price</span>
                                                <span className="font-medium">{formatPrice(product.discount_customer_price)}</span>
                                            </div>
                                        )}
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">B2B Price</span>
                                            <span className="font-medium">{formatPrice(product.b2b_price)}</span>
                                        </div>
                                        {product.discount_b2b_price && (
                                            <div className="flex">
                                                <span className="text-gray-600 w-40">Discounted B2B Price</span>
                                                <span className="font-medium">{formatPrice(product.discount_b2b_price)}</span>
                                            </div>
                                        )}
                                        <div className="flex">
                                            <span className="text-gray-600 w-40">Stock Available</span>
                                            <span className="font-medium">{product.item_stock || 0} units</span>
                                        </div>
                                        {product.min_qty > 1 && (
                                            <div className="flex">
                                                <span className="text-gray-600 w-40">Minimum Order Qty</span>
                                                <span className="font-medium">{product.min_qty}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products Section - You can implement this with actual data */}
                {/* <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                            Related products will appear here
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ProductDetailPage;