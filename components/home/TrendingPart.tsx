"use client"
import React from 'react';

import img1 from '@assets/cannon_camera_image.png';
import img2 from '@assets/jbl_soundbox_image.png';
import img3 from '@assets/macbook_image.png';
import ProductCard from '../ProductCard';

const trendingProducts = [
    {
        id: '1',
        name: 'Canon DSLR Camera',
        price: 599.99,
        originalPrice: 749.99,
        rating: 4.7,
        imageUrl: img1,
        isNew: true,
    },
    {
        id: '2',
        name: 'JBL Soundbox Pro',
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.4,
        imageUrl: img2,
        isNew: false,
    },
    {
        id: '3',
        name: 'Apple MacBook Pro M2',
        price: 1499.99,
        originalPrice: 1699.99,
        rating: 4.9,
        imageUrl: img3,
        isNew: true,
    },
    {
        id: '1',
        name: 'Canon DSLR Camera',
        price: 599.99,
        originalPrice: 749.99,
        rating: 4.7,
        imageUrl: img1,
        isNew: true,
    },
    {
        id: '2',
        name: 'JBL Soundbox Pro',
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.4,
        imageUrl: img2,
        isNew: false,
    },
    // {
    //     id: '3',
    //     name: 'Apple MacBook Pro M2',
    //     price: 1499.99,
    //     originalPrice: 1699.99,
    //     rating: 4.9,
    //     imageUrl: img3,
    //     isNew: true,
    // },
];

const TrendingPart = () => {
    return (
        <div className="flex flex-col items-center pt-14">
            <p className="text-2xl font-medium text-left w-full">Popular products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                {trendingProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        rating={product.rating}
                        imageUrl={product.imageUrl}
                        isNew={product.isNew}
                    />
                ))}
            </div>
            <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                See more
            </button>
        </div>
    );
};

export default TrendingPart;
