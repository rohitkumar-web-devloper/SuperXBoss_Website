export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CUSTOMER_ENDPOINTS = {
    LOGIN: '/customer/login',
    VERIFY_OTP: '/customer/verify_otp',
    UPDATE: '/customer/',
    GET_BY_ID: (id: string) => `/users/${id}`,
};

export const NO_AUTH_ENDPOINTS = {
    GET_CATEGORIES: "/no-auth-categories",
    GET_PRODUCTS: "/no-auth-products",
    GET_BRANDS: "/no-auth-brands",
    CONTACT_US: "/contact-us", 
};
