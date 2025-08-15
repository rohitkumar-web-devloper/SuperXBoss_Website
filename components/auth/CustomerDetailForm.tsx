"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { ReactSelect } from "../ui/ReactSelect";
import { Radio } from "../ui/Radio";
import { Button } from "../ui/Button";
import { useAuth } from "@/contexts/AuthProvider";

type StateOption = { value: string; label: string };
type LanguageOption = { value: string; label: string };
type BusinessTypeOption = { value: string; label: string };
type UserType = "Customer" | "B2B";

const states: StateOption[] = [
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "delhi", label: "Delhi" },
    { value: "gujarat", label: "Gujarat" },
    { value: "karnataka", label: "Karnataka" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
];

const languages: LanguageOption[] = [
    { value: "hindi", label: "Hindi" },
    { value: "english", label: "English" },
    { value: "gujarati", label: "Gujarati" },
    { value: "punjabi", label: "Punjabi" },
    { value: "tamil", label: "Tamil" },
];

const businessTypes: BusinessTypeOption[] = [
    { value: "B2B", label: "B2B" },
    { value: "B2C", label: "B2C" },
    { value: "C2C", label: "C2C" },
    { value: "B2G", label: "B2G" },
];

export const CustomerDetailForm = () => {
    const { updateCustomerMutation, setUser } = useAuth();
    const router = useRouter();
    const params = useParams();
    const info = params?.info as string[] | undefined;

    const phone = info?.[0];
    const customerId = info?.[1];

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        selectedState: null as StateOption | null,
        selectedLanguage: null as LanguageOption | null,
        userType: "Customer" as UserType,
        businessType: null as BusinessTypeOption | null,
        businessName: "",
        gstNumber: "",
        businessContact: "",
        referenceCode: "",
        referCode: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const {
                firstName,
                lastName,
                selectedState,
                selectedLanguage,
                userType,
                businessType,
                businessName,
                gstNumber,
                businessContact,
                referenceCode,
                referCode,
            } = formData;

            if ( !customerId) throw new Error("Invalid request: phone or customerId missing.");
            if (!selectedState) throw new Error("Please select your state.");
            if (!selectedLanguage) throw new Error("Please select your language.");

            if (userType === "Customer") {
                if (!firstName.trim() || !lastName.trim()) throw new Error("First and Last Name are required.");
                if (!referenceCode.trim()) throw new Error("Reference Code is required.");
            }

            if (userType === "B2B") {
                if (!businessType) throw new Error("Business Type is required.");
                if (!businessName.trim()) throw new Error("Business Name is required.");
                if (!gstNumber.trim()) throw new Error("GST Number is required.");
                if (!businessContact.trim()) throw new Error("Business Contact Number is required.");
            }

            const formDataToSend = new FormData();
            // formDataToSend.append("phone", phone);
            formDataToSend.append("customerId", customerId);
            formDataToSend.append("type", userType.toLowerCase());
            formDataToSend.append("state", selectedState.value);
            formDataToSend.append("language", selectedLanguage.value);

            if (userType === "Customer") {
                formDataToSend.append("first_name", firstName.trim());
                formDataToSend.append("last_name", lastName.trim());
                formDataToSend.append("refrence_code", referenceCode.trim());
            }

            if (referCode.trim()) {
                formDataToSend.append("refer_code", referCode.trim());
            }

            if (userType === "B2B") {
                formDataToSend.append("business_type", businessType?.value || "");
                formDataToSend.append("business_name", businessName.trim());
                formDataToSend.append("gst_number", gstNumber.trim());
                formDataToSend.append("business_contact_no", businessContact.trim());
            }

            const result = await updateCustomerMutation.mutateAsync(formDataToSend);
            localStorage.setItem("user", JSON.stringify(result));
            setUser(result);
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Form submission failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800 mb-1">Customer Detail</h1>
                <p className="text-gray-500 text-sm">Please fill in your details</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid xl:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Enter First Name"
                        required={formData.userType === "Customer"}
                    />
                    <Input
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Enter Last Name"
                        required={formData.userType === "Customer"}
                    />
                    <ReactSelect
                        label="State"
                        options={states}
                        value={formData.selectedState}
                        onChange={(value) => handleChange("selectedState", value)}
                        required
                        placeholder="Select your state"
                        isClearable
                    />
                    <ReactSelect
                        label="Language"
                        options={languages}
                        value={formData.selectedLanguage}
                        onChange={(value) => handleChange("selectedLanguage", value)}
                        required
                        placeholder="Select language"
                        isClearable
                    />
                </div>

                {/* User Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                        <Radio
                            label="Customer"
                            name="userType"
                            checked={formData.userType === "Customer"}
                            onChange={() => handleChange("userType", "Customer")}
                        />
                        <Radio
                            label="B2B"
                            name="userType"
                            checked={formData.userType === "B2B"}
                            onChange={() => handleChange("userType", "B2B")}
                        />
                    </div>
                </div>

                {/* Customer Fields */}
                {formData.userType === "Customer" && (
                    <div className="grid xl:grid-cols-2 gap-4 border-t pt-4">
                        <Input
                            label="Reference Code"
                            value={formData.referenceCode}
                            onChange={(e) => handleChange("referenceCode", e.target.value)}
                            required
                            placeholder="Enter Reference Code"
                        />
                        <Input
                            label="Refer Code (optional)"
                            value={formData.referCode}
                            onChange={(e) => handleChange("referCode", e.target.value)}
                            placeholder="Enter Refer Code"
                        />
                    </div>
                )}

                {/* B2B Fields */}
                {formData.userType === "B2B" && (
                    <div className="grid xl:grid-cols-2 gap-4 border-t pt-4">
                        <ReactSelect
                            label="Business Type"
                            options={businessTypes}
                            value={formData.businessType}
                            onChange={(value) => handleChange("businessType", value)}
                            required
                            placeholder="Select Business Type"
                            isClearable
                        />
                        <Input
                            label="Business Name"
                            value={formData.businessName}
                            onChange={(e) => handleChange("businessName", e.target.value)}
                            required
                            placeholder="Enter Business Name"
                        />
                        <Input
                            label="GST Number"
                            value={formData.gstNumber}
                            onChange={(e) => handleChange("gstNumber", e.target.value)}
                            required
                            placeholder="Enter GST Number"
                        />
                        <Input
                            label="Business Contact Number"
                            value={formData.businessContact}
                            onChange={(e) => handleChange("businessContact", e.target.value)}
                            required
                            placeholder="Enter Contact Number"
                        />
                    </div>
                )}

                <Button type="submit" isLoading={isLoading} fullWidth disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </div>
    );
};
