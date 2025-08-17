import { useQuery } from "@tanstack/react-query";
import { getNoAuthBrands, getNoAuthCategories, getNoAuthProducts, NoAuthBrandsParams, NoAuthProductsParams } from "@/services/apis/publicApis/publicApis";

export const useNoAuthCategoriesQuery = () => {
    return useQuery({
        queryKey: ["noAuthCategories"],
        queryFn: getNoAuthCategories,
    });
};

export const useNoAuthBrandsQuery = (params: NoAuthBrandsParams) => {
    return useQuery({
        queryKey: ["noAuthBrands", params],
        queryFn: () => getNoAuthBrands(params),
    });
};
export const useNoAuthProductsQuery = (params: NoAuthProductsParams) => {
    return useQuery({
        queryKey: ["noAuthProducts", params],
        queryFn: () => getNoAuthProducts(params),
    });
};