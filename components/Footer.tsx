"use client";
import React from "react";
import logo from "../assets/logo.svg";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="flex flex-col md:flex-row items-start justify-between px-6 md:px-16 gap-10 py-14 border-y border-gray-300 text-gray-600">
                <div className="w-full md:w-2/5">
                    <Image
                        className="w-28 md:w-32"
                        src={logo}
                        alt="TechShop Logo"
                        width={128}
                        height={32}
                    />
                    <p className="mt-6 text-sm leading-relaxed">
                        TechShop is your premier destination for cutting-edge technology and electronics.
                        Since 2010, we've been providing high-quality gadgets, computers, and accessories
                        to tech enthusiasts and professionals alike.
                    </p>
                </div>

                <div className="w-full md:w-1/5">
                    <h2 className="font-medium text-gray-900 mb-5 text-lg">Quick Links</h2>
                    <ul className="text-sm space-y-3">
                        <li>
                            <Link href="/" className="hover:text-gray-900 transition hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-gray-900 transition hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className="hover:text-gray-900 transition hover:underline">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-gray-900 transition hover:underline">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:text-gray-900 transition hover:underline">
                                Terms & Conditions
                            </Link>
                        </li>
                    </ul>
                </div>
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
            <div className="py-6 text-center text-xs md:text-sm text-gray-500">
                <p>Copyright © {new Date().getFullYear()} TechShop. All Rights Reserved.</p>
                {/* <p className="mt-1">Designed with ❤️ by Rohit Team</p> */}
            </div>
        </footer>
    );
};

export default Footer;