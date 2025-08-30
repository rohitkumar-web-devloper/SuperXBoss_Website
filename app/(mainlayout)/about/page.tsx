"use client";

import { useNoAuthDocumentsQuery } from "@/services/apis/publicApis/hooks";

const AboutUs = () => {
    const { data, isLoading, isError } = useNoAuthDocumentsQuery();

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (isError || !data?._payload?.aboutUs?.url)
        return <div className="flex items-center justify-center h-screen text-red-500">Failed to load document.</div>;

    const aboutUsDoc = data._payload.aboutUs;

    return (
        <div className="px-4 sm:px-6 md:px-16 py-8 bg-white min-h-screen">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center py-6 mb-6 bg-white rounded-lg shadow">
                About Us
            </h1>
            <div className="h-[90vh] border rounded-lg overflow-hidden bg-white shadow">
                <iframe
                    src={`${aboutUsDoc.url}#toolbar=0`}
                    title={aboutUsDoc.fileName}
                    className="w-full h-full bg-white"
                    style={{ backgroundColor: "white" }}
                />
            </div>

        </div>
    );
};

export default AboutUs;



// "use client"
// import Image from "next/image"
// import { FaLeaf, FaAward, FaUsers } from "react-icons/fa"
// import aboutHero from "@assets/about-hero.jpg"
// import { FiArrowRight } from "react-icons/fi"

// const AboutUs = () => {
//   return (
//     <div className="px-4 sm:px-6 md:px-16 py-8">
//       {/* Hero Section */}
//       <div className="flex flex-col md:flex-row items-center justify-between bg-[#E6E9F2] rounded-lg p-6 md:p-10 lg:p-14 mb-12 md:mb-16">
//         <div className="md:w-1/2 mb-6 md:mb-0">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
//           <p className="text-base sm:text-lg text-gray-700 mb-6">
//             Founded in 2015, we started as a small team passionate about bringing quality products to tech enthusiasts.
//             Today, we're a leading e-commerce platform serving millions worldwide.
//           </p>
//           <button className="flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-default text-white rounded-full font-medium hover:bg-default-dark transition">
//             Meet Our Team <FiArrowRight className="text-lg" />
//           </button>
//         </div>
//         <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
//           <Image
//             src={aboutHero}
//             alt="Our team"
//             width={500}
//             height={350}
//             className="rounded-lg shadow-lg w-full max-w-md"
//             priority
//           />
//         </div>
//       </div>

//       {/* Values Section */}
//       <div className="mb-12 md:mb-16">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">Our Core Values</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             { icon: <FaLeaf className="text-default text-2xl" />, title: "Sustainability", desc: "We're committed to eco-friendly practices in our operations." },
//             { icon: <FaAward className="text-default text-2xl" />, title: "Quality", desc: "Every product meets our high standards of excellence." },
//             { icon: <FaUsers className="text-default text-2xl" />, title: "Customer First", desc: "Your satisfaction is our top priority." }
//           ].map((item, index) => (
//             <div key={index} className="bg-white p-5 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition">
//               <div className="bg-default/10 p-3 rounded-full w-max mb-4">
//                 {item.icon}
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
//               <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-default/5 p-6 sm:p-8 rounded-lg mb-12 md:mb-16">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">By The Numbers</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
//           {[
//             { value: "10M+", label: "Happy Customers" },
//             { value: "50+", label: "Countries" },
//             { value: "500+", label: "Brands" },
//             { value: "24/7", label: "Support" }
//           ].map((stat, index) => (
//             <div key={index} className="p-3 sm:p-4">
//               <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-default mb-1 sm:mb-2">{stat.value}</p>
//               <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-sm">
//         <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Join Our Growing Team</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
//           We're always looking for passionate individuals to join our mission.
//         </p>
//         <button className="px-6 sm:px-8 py-2.5 sm:py-3 border border-default text-default rounded-full font-medium hover:bg-default/10 transition">
//           View Open Positions
//         </button>
//       </div>
//     </div>
//   )
// }

// export default AboutUs