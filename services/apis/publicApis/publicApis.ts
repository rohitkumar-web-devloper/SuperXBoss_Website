import { api } from "@/services/apiClient";
import { NO_AUTH_ENDPOINTS } from "@/services/endpoints";
import { NoAuthProductBySlugResponse } from "@/types/productTypes";

export interface NoAuthProductsParams {
    trend_part?: boolean;
    pop_item?: boolean;
    new_arrival?: boolean;
    search?: string;
    page: number;
    limit: number;
    brand?: string;  
    categories?: string;   
    vehicle_brand?: string; 
}

export interface NoAuthBrandsParams {
    type?: "Vehicle" | "Spare Parts";
    page?: number;
    limit?: number;
}

export interface ContactUsPayload {
    name: string;
    mobile: string;
    message: string;
}

export const getNoAuthProducts = async (params: NoAuthProductsParams): Promise<any> => {
    const response = await api.get(NO_AUTH_ENDPOINTS.GET_PRODUCTS, {
        params,
    });
    return response.data;
};

export const getNoAuthCategories = async (params?: { page?: number, limit?: number }): Promise<any> => {
    const response = await api.get(NO_AUTH_ENDPOINTS.GET_CATEGORIES, {
        params
    });
    return response.data;
};

export const getNoAuthBrands = async (params?: NoAuthBrandsParams): Promise<any> => {
    const response = await api.get(NO_AUTH_ENDPOINTS.GET_BRANDS, {
        params,
    });
    return response.data;
};

// ✅ New API for Contact Queries
export const submitContactQuery = async (payload: ContactUsPayload): Promise<any> => {
    const response = await api.post(NO_AUTH_ENDPOINTS.CONTACT_US, payload);
    return response.data;
};


export const getNoAuthDocuments = async (): Promise<any> => {
    const response = await api.get(NO_AUTH_ENDPOINTS.DOCUMENTS);
    return response.data;
};


export const getNoAuthProductBySlug = async (slug: string): Promise<NoAuthProductBySlugResponse> => {
    if (!slug) throw new Error("Slug is required");
    const endpoint = NO_AUTH_ENDPOINTS.GET_PRODUCT_BY_SLUG.replace(":slug", encodeURIComponent(slug));
    const response = await api.get(endpoint);
    return response.data;
};
