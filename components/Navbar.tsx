"use client";
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { FiPhone, FiMail, FiMapPin, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex items-center justify-between px-6 xl:px-16 py-3 border-b border-gray-300 text-gray-700 bg-white">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        className="cursor-pointer w-28 md:w-32"
                        src={logo}
                        alt="logo"
                        width={128}
                        height={32}
                    />
                </Link>

                {/* Centered Navigation Links */}
                <div className="flex items-center justify-center gap-4 lg:gap-8 mx-4">
                    <Link href="/" className="hover:text-gray-900 transition-colors duration-200">
                        Home
                    </Link>
                    <Link href="/contact" className="hover:text-gray-900 transition-colors duration-200">
                        Contact
                    </Link>
                    <Link href="/about" className="hover:text-gray-900 transition-colors duration-200">
                        About Us
                    </Link>
                    <Link href="/terms" className="hover:text-gray-900 transition-colors duration-200">
                        Terms
                    </Link>
                </div>

                {/* Contact Info - Right Side */}
                <div className="flex items-center gap-4 text-sm flex-shrink-0">
                    <div className="hidden lg:flex items-center gap-2">
                        <FiPhone className="text-default" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="hidden xl:flex items-center gap-2">
                        <FiMail className="text-default" />
                        <span>sales@techshop.com</span>
                    </div>
                    <div className="hidden 2xl:flex items-center gap-2">
                        <FiMapPin className="text-default" />
                        <span>123 Tech St</span>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="md:hidden flex items-center justify-between px-6 py-3 border-b border-gray-300 text-gray-700 bg-white sticky top-0 z-40">
                <Link href="/">
                    <Image
                        className="cursor-pointer w-28"
                        src={logo}
                        alt="logo"
                        width={128}
                        height={32}
                    />
                </Link>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-700 focus:outline-none transition-transform duration-200 hover:scale-110"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <FiX className="w-6 h-6" />
                    ) : (
                        <FiMenu className="w-6 h-6" />
                    )}
                </button>
            </nav>

            <div className={`md:hidden bg-white fixed inset-0 z-30 pt-20 px-6 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
                <div className="flex flex-col items-center space-y-6 text-sm">
                    <Link
                        href="/"
                        className="hover:text-gray-900 transition-colors duration-200 py-2 w-full text-center border-b"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-gray-900 transition-colors duration-200 py-2 w-full text-center border-b"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-gray-900 transition-colors duration-200 py-2 w-full text-center border-b"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About Us
                    </Link>
                    <Link
                        href="/terms"
                        className="hover:text-gray-900 transition-colors duration-200 py-2 w-full text-center border-b"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Terms
                    </Link>
                </div>

                {/* Contact Info in Mobile Menu */}
                <div className="mt-12 space-y-4 text-sm text-center">
                    <div className="flex items-center justify-center gap-3">
                        <FiPhone className="text-default" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <FiMail className="text-default" />
                        <span>sales@techshop.com</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <FiMapPin className="text-default" />
                        <span>123 Tech St, San Francisco</span>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-8 py-3 bg-default text-white rounded-lg transition-colors duration-200 hover:bg-opacity-90"
                    >
                        Close Menu
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;