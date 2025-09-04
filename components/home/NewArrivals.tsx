"use client";
import Image from "next/image";
import NewArrivalsSkeleton from "../skeletons/home/NewArrivalsSkeleton";
import defa from "@assets/cannon_camera_image.png";
import { useRouter } from "next/navigation";

const NewArrivals = ({ data, isLoading }: any) => {
    const router = useRouter();

    if (isLoading) {
        return <NewArrivalsSkeleton />;
    }

    const handleNavigate = (product: any) => {
        if (!product.slug) return;
        router.push(`/products/product_detail/${encodeURIComponent(product.slug)}`);
    };


    const products = data?._payload || [];

    const calculateDiscount = (customer_price: number, discount_customer_price: number) => {
        if (!customer_price || !discount_customer_price) return 0;
        return Math.round(((customer_price - discount_customer_price) / customer_price) * 100);
    };

    return (
        <section className="mt-14 mb-12">
            <div className="flex flex-col items-center">
                <p className="text-3xl font-medium">New Arrivals</p>
                <div className="w-28 h-0.5 bg-default mt-2"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-14 mt-12">
                {products.slice(0, 8).map((product: any, i: number) => {
                    const { images, name, description, customer_price, discount_customer_price } = product;
                    const discount = calculateDiscount(customer_price, discount_customer_price);

                    return (
                        <div
                            key={i}
                            className="relative group shadow h-72 md:h-80 w-full border border-gray-100 cursor-pointer"
                            onClick={() => handleNavigate(product)}
                        >
                            <Image
                                src={images?.[0] || defa}
                                fill
                                alt={name}
                                className="transition duration-300 w-full h-auto object-contain p-10"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50 transition-opacity duration-300 flex items-end p-6"></div>

                            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-1.5">
                                <p className="font-semibold text-lg">{name}</p>
                                <p className="text-xs leading-4 max-w-52 line-clamp-2">{description}</p>

                                {/* ✅ Show prices */}
                                <div className="flex items-center gap-2 mt-1">
                                    {discount_customer_price ? (
                                        <>
                                            <span className="text-lg font-bold text-yellow-300">
                                                ₹{discount_customer_price}
                                            </span>
                                            <span className="text-sm line-through text-gray-300">
                                                ₹{customer_price}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold text-yellow-300">
                                            ₹{customer_price}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {discount > 0 && (
                                <div className="absolute top-2 left-2">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-md shadow-sm">
                                        <span className="relative">{discount}% OFF</span>
                                    </span>
                                </div>
                            )}
                        </div>

                    );
                })}
            </div>

            {products.length > 8 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push("/products/new-arrivals")}
                        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
                    >
                        See More
                    </button>
                </div>
            )}
        </section>
    );
};

export default NewArrivals;
