"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "outline" | "danger";
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            isLoading = false,
            variant = "primary",
            fullWidth = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const baseClasses = `rounded-md font-medium py-2 px-4 transition duration-200 flex items-center justify-center ${fullWidth ? "w-full" : ""
            } ${className}`;

        const variantClasses = {
            primary: "bg-[#1B4B66] hover:bg-[#143A52] text-white",
            secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
            outline: "border border-[#1B4B66] text-[#1B4B66] hover:bg-[#1B4B66]/10",
            danger: "bg-red-600 hover:bg-red-700 text-white",
        };

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${variantClasses[variant]}`}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";