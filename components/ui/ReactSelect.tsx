"use client";
import React from "react";
import Select, { GroupBase, Props, StylesConfig } from "react-select";

interface OptionType {
    value: string;
    label: string;
}

interface ReactSelectProps extends Props<OptionType, false, GroupBase<OptionType>> {
    label?: string;
    error?: string;
    containerClass?: string;
    required?: boolean;
}

export const ReactSelect = React.forwardRef<any, ReactSelectProps>(
    ({ label, error, containerClass = "", required, ...props }, ref) => {
        const customStyles: StylesConfig<OptionType, false> = {
            control: (provided, state) => ({
                ...provided,
                minHeight: "40px",
                border: error
                    ? "1px solid #EF4444"
                    : state.isFocused
                    ? "1px  #1B4B66"
                    : "1px solid #d1d5dc",
                borderRadius: "6px",
                boxShadow: state.isFocused ? "0 0 0 1px #1B4B66" : "none",
                backgroundColor: "#F9FAFB",
                "&:hover": {
                    borderColor: error ? "#EF4444" : "#1B4B66",
                },
                fontSize: "14px",
            }),
            menu: (provided) => ({
                ...provided,
                maxHeight: "160px",
                overflowY: "hidden",
                zIndex: 9999,
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                    ? "#1B4B66"
                    : state.isFocused
                    ? "#F0F7FF"
                    : "white",
                color: state.isSelected ? "white" : "#1F2937",
                "&:active": {
                    backgroundColor: "#1B4B66",
                    color: "white",
                },
                fontSize: "14px",
            }),
            placeholder: (provided) => ({
                ...provided,
                color: "#9CA3AF",
                fontSize: "14px",
            }),
            singleValue: (provided) => ({
                ...provided,
                color: "#1F2937",
            }),
            indicatorSeparator: () => ({
                display: "none",
            }),
            dropdownIndicator: (provided) => ({
                ...provided,
                color: "#6B7280",
                padding: "2px",
                width: "20px",
                height: "20px",
                "& svg": {
                    width: "14px",
                    height: "14px",
                },
                "&:hover": {
                    color: "#4B5563",
                },
            }),
            menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
            }),
        };

        return (
            <div className={`relative ${containerClass}`}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <Select
                    ref={ref}
                    styles={customStyles}
                    classNamePrefix="react-select"
                    menuPlacement="auto"
                    menuPosition="fixed"
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuShouldScrollIntoView={false}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

ReactSelect.displayName = "ReactSelect";
