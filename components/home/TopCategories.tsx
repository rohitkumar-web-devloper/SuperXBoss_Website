"use client";

import { FaLaptop, FaShirt, FaMobile, FaCouch, FaKitchenSet } from "react-icons/fa6";

const TopCategories = () => {
    const categories = [
        { title: "Electronics", icon: <FaLaptop className="text-2xl" /> },
        { title: "Fashion", icon: <FaShirt className="text-2xl" /> },
        { title: "Mobiles", icon: <FaMobile className="text-2xl" /> },
        { title: "Furniture", icon: <FaCouch className="text-2xl" /> },
        { title: "Appliances", icon: <FaKitchenSet className="text-2xl" /> },
    ];

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
                <p className="text-gray-600">Discover our most popular collections</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center shadow p-6 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                    >
                        <div className="p-3 mb-3 text-[#1B4B66] bg-[#F1F1F1] rounded-full">
                            {category.icon}
                        </div>
                        <h3 className="font-medium text-[#1B4B66]">{category.title}</h3>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    Browse All
                </button>
            </div>
        </section>
    );
};

export default TopCategories;