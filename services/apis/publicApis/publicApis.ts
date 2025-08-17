import { api } from "@/services/apiClient";
import { NO_AUTH_ENDPOINTS } from "@/services/endpoints";

export interface NoAuthProductsParams {
    trend_part?: boolean;
    pop_item?: boolean;
    new_arrival?: boolean;
    search?: string;
    page: number;
    limit: number;
}

export interface NoAuthBrandsParams {
    type?: "Vehicle" | "Spare Parts";
    page?: number;
    limit?: number;
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