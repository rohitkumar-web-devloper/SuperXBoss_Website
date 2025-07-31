"use client";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { ReactSelect } from "../ui/ReactSelect";
import { Radio } from "../ui/Radio";
import { Button } from "../ui/Button";

type StateOption = { value: string; label: string };
type LanguageOption = { value: string; label: string };
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

export const CustomerDetailForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    selectedState: null as StateOption | null,
    selectedLanguages: [] as LanguageOption[],
    userType: "Customer" as UserType,
    businessType: "",
    businessName: "",
    gstNumber: "",
    businessContact: "",
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
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error("First and last names are required");
      }

      if (!formData.selectedState) {
        throw new Error("Please select your state");
      }

      if (formData.selectedLanguages.length === 0) {
        throw new Error("Please select at least one language");
      }

      if (formData.userType === "B2B") {
        if (!formData.businessType.trim()) throw new Error("Business Type is required");
        if (!formData.businessName.trim()) throw new Error("Business Name is required");
        if (!formData.gstNumber.trim()) throw new Error("GST Number is required");
        if (!formData.businessContact.trim()) throw new Error("Business Contact Number is required");
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        state: formData.selectedState.value,
        languages: formData.selectedLanguages.map((lang) => lang.value),
        userType: formData.userType,
        ...(formData.userType === "B2B" && {
          businessType: formData.businessType.trim(),
          businessName: formData.businessName.trim(),
          gstNumber: formData.gstNumber.trim(),
          businessContact: formData.businessContact.trim(),
        }),
      };

      console.log("Form submitted:", payload);
      alert("User details submitted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit form");
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
        {/* Personal Information */}
        <div className="grid xl:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            placeholder="Enter First Name"
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            placeholder="Enter Last Name"
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
            label="Languages"
            options={languages}
            value={formData.selectedLanguages}
            onChange={(value) => handleChange("selectedLanguages", value || [])}
            required
            placeholder="Select languages"
            closeMenuOnSelect={false}
            // isMulti
          />
        </div>

        {/* User Type Selection */}
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

        {/* Business Information (Conditional) */}
        {formData.userType === "B2B" && (
          <div className="grid xl:grid-cols-2 gap-4 border-t pt-4">
            <Input
              label="Business Type"
              value={formData.businessType}
              onChange={(e) => handleChange("businessType", e.target.value)}
              required
              placeholder="Enter Business Type"
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
