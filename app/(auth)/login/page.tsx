"use client";
import React from 'react';
import logo from "@assets/logo.svg";
import login from "@assets/login.svg";
import detail from "@assets/detail.svg";
import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';

const LoginCustomer = () => {
    return (
        <div className="min-h-screen bg-white  flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white sm:rounded sm:border border-gray-200 sm:shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
                
                {/* Left Side Image (login.svg) */}
                <div className="hidden md:flex items-center justify-center bg-gray-50 p-14">
                    <Image
                        src={login}
                        alt="Login Illustration"
                        width={400}
                        height={400}
                        priority
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-center pt-6 mb-6 mt-2">
                            <div className="flex items-center space-x-2">
                                <Image alt="logo" src={logo} width={160} priority />
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <LoginForm />
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
                        <p className="text-gray-500 text-xs">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-[#1B4B66] hover:underline">Terms</a> and{' '}
                            <a href="#" className="text-[#1B4B66] hover:underline">Privacy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCustomer;
