"use client";
import Image from "next/image";
import { useNoAuthBrandsQuery } from "@/services/apis/publicApis/hooks";

import { useRouter } from "next/navigation";

type SectionProps = {
    heading: string;
    subheading?: string;
    type?: "Vehicle" | "Spare Parts";
};
const Brands = ({ heading, subheading, type }: SectionProps) => {
    const { data, isLoading, isError } = useNoAuthBrandsQuery({ type: type });
    const router = useRouter()
    if (isLoading) {
        return (
            <div className="a">sasa</div>
        );
    }

    if (isError) {
        return (
            <div className="px-6 xl:px-16 max-w-[1540px] mx-auto py-14 text-center text-red-500">
                Error loading brands
            </div>
        );
    }

    const brands = data?._payload || [];

    return (
        <section className="py-12  md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{heading}</h2>
                <p className="text-gray-600">{subheading}</p>
            </div>


            {brands.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {brands.slice(0, 6).map((brand: any) => (
                            <div
                                key={brand._id}
                                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow h-32"
                            >
                                {brand.logo && (
                                    <div className="relative w-full h-20">
                                        <Image
                                            src={brand.logo}
                                            alt={brand.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100px, 150px"
                                        />
                                    </div>
                                )}
                                <h3 className="mt-2 text-sm font-medium text-center">{brand.name}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={() => { router.push("/brands") }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                            Browse All
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-10">No brands available</div>
            )}
        </section>
    );
};

export default Brands;