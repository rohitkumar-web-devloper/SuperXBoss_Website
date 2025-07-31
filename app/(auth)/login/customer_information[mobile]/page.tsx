"use client";

import Image from "next/image";
import detail from "@assets/detail.svg";
import { CustomerDetailForm } from "@/components/auth/CustomerDetailForm";


const CustomerInformation = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white sm:rounded sm:border border-gray-200 sm:shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
                
                <div className="hidden md:flex items-center justify-center bg-gray-50 p-10">
                    <Image
                        src={detail}
                        alt="Detail Illustration"
                        width={350}
                        height={350}
                        priority
                    />
                </div>

                <div className="p-6">
                    <CustomerDetailForm />
                </div>
            </div>
        </div>
    );
};

export default CustomerInformation;
