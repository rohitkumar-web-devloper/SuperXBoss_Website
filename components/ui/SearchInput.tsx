"use client";

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string;
    onChange: (value: string) => void; // our custom handler
    placeholder?: string;
    debounceDelay?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    debounceDelay = 500,
    ...props
}) => {
    const [localValue, setLocalValue] = useState(value);

    // sync with external value
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            onChange(localValue);
        }, debounceDelay);

        return () => clearTimeout(handler);
    }, [localValue, debounceDelay, onChange]);

    return (
        <div className="relative w-full">
            <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
            />
            <input
                {...props}
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border rounded-2xl shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>
    );
};

export default SearchInput;
