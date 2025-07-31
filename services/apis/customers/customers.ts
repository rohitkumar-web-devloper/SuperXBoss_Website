import { api } from "@/services/apiClient";
import { CUSTOMER_ENDPOINTS } from "@/services/endpoints";

export const login = async (credentials: { mobile: string }): Promise<any> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.LOGIN, credentials);
    return response.data;
};

export const verifyOTP = async (data: { mobile: string, otp: string }): Promise<any> => {
    const response = await api.post(CUSTOMER_ENDPOINTS.VERIFY_OTP, { fcm_token: "sjakhask", ...data });
    return response.data;
};