"use client";

import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNoAuthProducts } from "@/services/apis/publicApis/publicApis";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import { useParams, useRouter } from "next/navigation";
import SearchInput from "@/components/ui/SearchInput";

const SparePartsProductsPage = () => {
    const limit = 10;
    const router = useRouter();
    const { _id } = useParams();
    const [search, setSearch] = useState("");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["spare-parts-products", _id, search],
        queryFn: ({ pageParam = 1 }) =>
            getNoAuthProducts({
                brand: _id as string,
                page: pageParam,
                limit,
                search,
            }),
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination.page >= lastPage.pagination.totalPages) {
                return undefined;
            }
            return lastPage.pagination.page + 1;
        },
        initialPageParam: 1,
        staleTime: 0,
    });

    //  Infinite scroll
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

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="px-6 xl:px-16 max-w-[1540px] mx-auto py-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6">
                Spare Parts Products
            </h1>

            {/*  Search Input */}
            <div className="max-w-md mb-8">
                <SearchInput
                    value={search}
                    onChange={(val) => setSearch(val)}
                    placeholder="Search spare parts..."
                />
            </div>

            {/*  Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {status === "pending" && !isFetchingNextPage
                    ? Array.from({ length: limit }).map((_, idx) => (
                        <ProductsSkeleton key={idx} />
                    ))
                    : data?.pages?.map((page, i) => (
                        <React.Fragment key={i}>
                            {page._payload?.map((product: any) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    price={
                                        product.discount_customer_price ||
                                        product.customer_price
                                    }
                                    originalPrice={product.customer_price}
                                    imageUrl={product.images?.[0] || ""}
                                    isNew={product.new_arrival}
                                    handleNavigate={() => {
                                        if (!product.slug) return;
                                        router.push(
                                            `/products/product_detail/${encodeURIComponent(
                                                product.slug
                                            )}`
                                        );
                                    }}
                                />
                            ))}
                        </React.Fragment>
                    ))}
            </div>

            {/* ⬇️ Load More Section */}
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
                    <p className="text-gray-500 py-10">
                        No more products to load
                    </p>
                )}
            </div>
        </div>
    );
};

export default SparePartsProductsPage;
