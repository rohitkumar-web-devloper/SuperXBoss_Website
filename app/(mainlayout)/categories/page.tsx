"use client"
"use client";

import { useNoAuthCategoriesQuery } from "@/services/apis/publicApis/hooks";
import Image from "next/image";

const TopCategories = () => {
    const { data, isLoading, isError } = useNoAuthCategoriesQuery();

    // Safely access the categories array with optional chaining
    const categories = data?._payload || [];

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className=" text-xl md:text-2xl font-bold mb-2">Shop by Category</h2>
                <p className="text-gray-600">Discover our most popular collections</p>
            </div>

            {isLoading ? (
                <div className="text-center">Loading categories...</div>
            ) : isError ? (
                <div className="text-center text-red-500">Error loading categories</div>
            ) : categories.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                        {categories.map((category: any) => (
                            <div
                                key={category._id}
                                className="flex flex-col items-center shadow p-6 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                            >
                                {category.picture && (
                                    <div className="relative w-16 h-16 mb-4">
                                        <Image
                                            src={category.picture}
                                            alt={category.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                )}
                                <h3 className="font-medium text-[#1B4B66] text-center text-sm">
                                    {category.name}
                                </h3>
                                {category.description && (
                                    <p className="text-xs text-gray-500 mt-2 text-center line-clamp-2">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">
                    No categories available
                </div>
            )}
        </section>
    );
};

export default TopCategories;