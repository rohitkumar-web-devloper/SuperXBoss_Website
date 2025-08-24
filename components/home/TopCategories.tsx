"use client";

import { useNoAuthCategoriesQuery } from "@/services/apis/publicApis/hooks";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import TopCategoriesSkeleton from "../skeletons/home/TopCategoriesSkeleton";

const TopCategories = () => {
    const { data, isLoading } = useNoAuthCategoriesQuery({page:1, limit: 5});
    // const router = useRouter();
    const categories = (data as any)?._payload || [];
    // const categories = (data as any)?._payload?.slice(0, 5) || [];
    if (isLoading) {
        return <TopCategoriesSkeleton />
    }
    return (
        <section className="py-12  md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Shop by Category</h2>
                <p className="text-gray-600">Discover our most popular collections</p>
            </div>

            {categories.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                            </div>
                        ))}
                    </div>

                    {/* <div className="text-center mt-8 w-full">
                        <button onClick={() => { router.push("/categories") }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                            Browse All
                        </button>
                    </div> */}
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