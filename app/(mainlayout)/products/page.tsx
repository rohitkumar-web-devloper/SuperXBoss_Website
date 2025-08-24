'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNoAuthProducts } from '@/services/apis/publicApis/publicApis';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';
import ProductsSkeleton from '@/components/skeletons/ProductsSkeleton';
import { useRouter } from 'next/navigation';


const ProductsPage = () => {
    const limit = 10;
    const router = useRouter();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam = 1 }) =>
            getNoAuthProducts({
                page: pageParam,
                limit: limit,
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination.page >= lastPage.pagination.totalPages) {
                return undefined;
            }
            return lastPage.pagination.page + 1;
        },
        initialPageParam: 1,
        staleTime: 0
    });

    React.useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status === 'pending' && !isFetchingNextPage) {
        return <ProductsSkeleton />;
    }

    if (status === 'error') {
        return <div className="text-center py-10">Error loading products</div>;
    }

    const handleNavigate = (product: any) => {
        const query = encodeURIComponent(JSON.stringify(product));
        router.push(`/products/detail?data=${query}`);
    };

    return (
        <div className="px-6 xl:px-16 max-w-[1540px] mx-auto py-8">
            <h1 className="text-xl md:text-2xl font-bold mb-8">All Products</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data?.pages?.map((page, i) => (
                    <React.Fragment key={i}>
                        {page._payload?.map((product: any) => (
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
                    </React.Fragment>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                {isFetchingNextPage ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                ) : hasNextPage ? (
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        variant="outline"
                    >
                        Load More
                    </Button>
                ) : (
                    <p className="text-gray-500">No more products to load</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;