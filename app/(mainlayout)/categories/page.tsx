'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { getNoAuthCategories } from '@/services/apis/publicApis/publicApis';
import CategoriesSkeleton from '@/components/skeletons/CategoriesSkeleton';

const CategoriesPage = () => {
    const limit = 10;

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['categories'],
        queryFn: ({ pageParam = 1 }) =>
            getNoAuthCategories({
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
        staleTime:0
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
        return <CategoriesSkeleton />;
    }

    if (status === 'error') {
        return <div className="text-center py-10">Error loading categories</div>;
    }

    return (
        <div className="px-6 xl:px-16 max-w-[1540px] mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-xl md:text-2xl font-bold mb-2">All Categories</h1>
                <p className="text-gray-600">Explore our wide range of product categories</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {data?.pages?.map((page, i) => (
                    <React.Fragment key={i}>
                        {page._payload?.map((category: any) => (
                            <Link
                                href={`/categories/${category._id}`}
                                key={category._id}
                                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 h-40 hover:border-primary-500"
                                aria-label={`View ${category.name} products`}
                            >
                                {category.picture ? (
                                    <div className="relative w-full h-24">
                                        <Image
                                            src={category.picture}
                                            alt={category.name}
                                            fill
                                            className="object-contain transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100px, 150px"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-24 flex items-center justify-center text-gray-400">
                                        {category.name}
                                    </div>
                                )}
                                <h3 className="mt-3 text-sm font-medium text-center text-gray-700">
                                    {category.name}
                                </h3>
                            </Link>
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
                        className="min-w-32"
                    >
                        Load More
                    </Button>
                ) : (
                    <p className="text-gray-500">You've seen all our categories</p>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;