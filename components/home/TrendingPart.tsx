"use client"
import React from 'react';
import ProductCard from '../ProductCard';
import { useNoAuthProductsQuery } from '@/services/apis/publicApis/hooks';
import TrendingPartSkeleton from '../skeletons/home/TrendingPartSkeleton';
import { useRouter } from 'next/navigation';

const TrendingPart = () => {
    const router = useRouter();
    const { data, isLoading, isError } = useNoAuthProductsQuery({
        trend_part: true,
        page: 1,
        limit: 10
    });

    const products = data?._payload || [];
    if (isLoading) {
        return <TrendingPartSkeleton />
    }

    return (
        <div className="flex flex-col items-center pt-14">
            <p className="text-2xl font-medium text-left w-full">Popular products</p>

            {isError ? (
                <div className="text-center text-red-500 py-10">Error loading products</div>
            ) : products.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                        {products.map((product: any) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.discount_customer_price || product.customer_price}
                                originalPrice={product.customer_price}
                                imageUrl={product.images?.[0] || ''}
                                isNew={product.new_arrival}
                                handleNavigate={() => {
                                    // Your navigation logic here
                                    const query = encodeURIComponent(JSON.stringify(product));
                                    router.push(`/products/detail?data=${query}`);
                                }}
                            />
                        ))}
                    </div>
                    <button onClick={() => router.push("/products")} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                        See more
                    </button>
                </>
            ) : (
                <div className="text-center py-10">No trending products found</div>
            )}
        </div>
    );
};

export default TrendingPart;