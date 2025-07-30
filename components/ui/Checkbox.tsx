// components/ui/Checkbox.tsx
"use client";
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    containerClass?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, containerClass, className, ...props }, ref) => {
        return (
            <label className={`flex items-center space-x-2 ${containerClass}`}>
                <input
                    type="checkbox"
                    ref={ref}
                    className={`h-4 w-4 text-[#1B4B66] rounded border-gray-300 focus:ring-[#1B4B66] ${className}`}
                    {...props}
                />
                <span className="text-sm text-gray-700">{label}</span>
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";