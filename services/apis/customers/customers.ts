import { api } from "@/services/apiClient";
import { CUSTOMER_ENDPOINTS } from "@/services/endpoints";
import { CustomerResponse } from "@/types/customersTypes";

export const login = async (credentials: { mobile: string }): Promise<any> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.LOGIN, credentials);
    return response.data;
};

export const verifyOTP = async (data: { mobile: string, otp: string }): Promise<any> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.VERIFY_OTP, { fcm_token: "sjakhask", ...data });
    return response.data;
};

export const updateCustomer = async (formData: FormData): Promise<CustomerResponse> => {
    const response = await api.put(CUSTOMER_ENDPOINTS.UPDATE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};