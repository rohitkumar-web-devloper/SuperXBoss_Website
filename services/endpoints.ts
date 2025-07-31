
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CUSTOMER_ENDPOINTS = {
    LOGIN: '/customer/login',
    VERIFY_OTP: '/customer/verify_otp', 
    GET_BY_ID: (id: string) => `/users/${id}`,
};