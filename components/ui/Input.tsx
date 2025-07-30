"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClass?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, containerClass, leftIcon, rightIcon, className, ...props }, ref) => {
        return (
            <div className={containerClass}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        placeholder={props.placeholder}
                        className={`w-full px-4 py-2 border rounded-md transition-all duration-200
                            placeholder:text-sm placeholder:text-gray-400
                            ${leftIcon ? "pl-10" : ""}
                            ${rightIcon ? "pr-10" : ""}
                            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#1B4B66]"}
                            focus:outline-none focus:ring-1
                            bg-gray-50
                            ${className || ""}
                        `}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
