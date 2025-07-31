"use client";
import React from "react";

import logo from "../assets/logo.svg";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const pathname = usePathname();
    const hiddenPaths = ["/login", "/register"];
    const isVisible = !hiddenPaths.includes(pathname);

    if (!isVisible) return null;

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
            <Image
                className="cursor-pointer w-28 md:w-32"
                src={logo}
                alt="logo"
                width={128}
                height={32}
            />

            <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                <Link href="/" className="hover:text-gray-900 transition">
                    Home
                </Link>
                <Link href="/all-products" className="hover:text-gray-900 transition">
                    Shop
                </Link>
                <Link href="/about" className="hover:text-gray-900 transition">
                    About Us
                </Link>
                <Link href="/categoris" className="hover:text-gray-900 transition">
                    Categories
                </Link>
            </div>

            <ul className="hidden md:flex items-center gap-6">
                <button className="hover:text-gray-900 transition">
                    <FiHeart className="w-5 h-5" />
                </button>
                <button className="hover:text-gray-900 transition">
                    <FiShoppingCart className="w-5 h-5" />
                </button>
                {/* Optional account button
                <button className="flex items-center gap-2 hover:text-gray-900 transition">
                    <Image
                        src="/user-icon.svg"
                        alt="user icon"
                        width={24}
                        height={24}
                    />
                    <span className="max-lg:hidden">Account</span>
                </button> */}
            </ul>
        </nav>
    );
};

export default Navbar;
