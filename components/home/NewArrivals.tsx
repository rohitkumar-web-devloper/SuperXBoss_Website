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
        const query = encodeURIComponent(JSON.stringify(product));
        router.push(`/products/detail?data=${query}`);
    };

    const products = data?._payload || [];

    return (
        <section className="mt-14 mb-12">
            <div className="flex flex-col items-center">
                <p className="text-3xl font-medium">New Arrivals</p>
                <div className="w-28 h-0.5 bg-default mt-2"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-14 mt-12 inset-0">
                {products.slice(0, 8).map(({ images, name, description }: any, i: number) => (
                    <div
                        key={i}
                        className="relative group shadow h-72 md:h-80 w-full border border-gray-100 cursor-pointer"
                        onClick={() => handleNavigate({ images, name, description })}
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
                        </div>
                    </div>
                ))}
            </div>

            {products.length > 8 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push("/products")}
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

// "use client";

// import { Icons } from "@/assets/assets";
// import Image from "next/image";
// import { FaArrowRight } from "react-icons/fa";
// import img1 from "@assets/cannon_camera_image.png";
// import img2 from "@assets/jbl_soundbox_image.png";
// import img3 from "@assets/macbook_image.png";


// const products = [
//     {
//         id: 1,
//         image: img1,
//         title: "Premium Headphones",
//         description: "Crystal-clear sound with deep bass.",
//     },
//     {
//         id: 2,
//         image: img2,
//         title: "Wireless Earbuds",
//         description: "Compact, stylish, and powerful.",
//     },
//     {
//         id: 3,
//         image: img3,
//         title: "Gaming Laptop",
//         description: "High performance for work and play.",
//     },
//     {
//         id: 4,
//         image: img2,
//         title: "Smart Watch",
//         description: "Track fitness and stay updated.",
//     },
// ];

// const SchemesAndNewArrivals = () => {
//     return (
//         <section className="mt-14">
//             <div className="flex flex-col items-center">
//         <p className="text-3xl font-medium">New Arrivals</p>
//         <div className="w-28 h-0.5 bg-default mt-2"></div>
//       </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-14 mt-12 md:px-14 px-4 inset-0">
//                 {products.map(({ id, image, title, description }) => (
//                     <div key={id} className="relative group shadow">
//                         <Image
//                             src={image}
//                             alt={title}
//                             className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
//                         />

//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50 transition-opacity duration-300 flex items-end p-6"></div>

//                         <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-1.5">
//                             <p className="font-semibold text-lg">{title}</p>
//                             <p className="text-xs leading-4 max-w-52">{description}</p>
//                             <button className="flex items-center gap-1.5 bg-default px-3 py-1.5 text-sm rounded">
//                                 Buy now <FaArrowRight className="text-xs mt-0.5" />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default SchemesAndNewArrivals;
