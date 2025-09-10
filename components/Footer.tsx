"use client";
import React from "react";
import logo from "../assets/logo.svg";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Hide footer only on /products or /brands pages
    if (pathname === "/products" || pathname === "/brands") return null;

    return (
        <footer className="bg-white">
            <div className="flex flex-col md:flex-row items-start justify-between px-6 xl:px-16 gap-10 py-14 border-y border-gray-300 text-gray-600">
                {/* Logo and Description */}
                <div className="w-full md:w-2/5">
                    <Image
                        className="cursor-pointer w-36 md:w-44" // ⬅️ Increased size
                        src={logo}
                        alt="logo"
                        width={180}   // ⬅️ Updated width
                        height={60}   // ⬅️ Updated height
                    />

                    <p className="mt-6 text-sm leading-relaxed">
                        A heavy commercial vehicle (HCV) parts business supplies spare parts for large trucks and commercial vehicles, focusing on an extensive range of components like engine, brake, and suspension parts to support the logistics, construction, and mining industries. This involves sourcing and distributing genuine, OEM, or aftermarket parts, managing inventory to ensure timely availability, providing expert parts identification and technical support to fleet operators and technicians, and building strong customer relationships within the heavy-duty vehicle sector.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="w-full md:w-1/5">
                    <h2 className="font-medium text-gray-900 mb-5 text-lg">Quick Links</h2>
                    <ul className="text-sm space-y-3">
                        {[
                            { name: "Home", path: "/" },
                            { name: "About Us", path: "/about" },
                            { name: "Products", path: "/products" },
                            { name: "Contact Us", path: "/contact" },
                            { name: "Terms & Conditions", path: "/terms" },
                            { name: "Privacy Policy", path: "/privacy" },
                        ].map((link) => (
                            <li key={link.name}>
                                <button
                                    className="hover:text-gray-900 transition hover:underline text-left"
                                    onClick={() => router.push(link.path)}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="w-full md:w-1/4">
                    <h2 className="font-medium text-gray-900 mb-5 text-lg">Contact Us</h2>
                    <div className="text-sm space-y-4">
                        <div className="flex items-start gap-3">
                            <FiPhone className="text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-medium text-gray-900">Phone</p>
                                <p>+1 (555) 123-4567</p>
                                <p>Mon-Fri: 9am-6pm EST</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FiMail className="text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-medium text-gray-900">Email</p>
                                <p>sales@techshop.com</p>
                                <p>support@techshop.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FiMapPin className="text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-medium text-gray-900">Address</p>
                                <p>123 Tech Street</p>
                                <p>San Francisco, CA 94107</p>
                                <p>United States</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
