"use client";
import React from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    containerClass?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ label, containerClass = "", className = "", ...props }, ref) => {
        return (
            <label className={`flex items-center space-x-2 ${containerClass}`}>
                <input
                    type="radio"
                    ref={ref}
                    className={`h-4 w-4 accent-[#1B4B66]  focus:ring-[#1B4B66] border-gray-300 ${className}`}
                    {...props}
                />
                <span className="text-sm text-gray-700">{label}</span>
            </label>
        );
    }
);

Radio.displayName = "Radio";
