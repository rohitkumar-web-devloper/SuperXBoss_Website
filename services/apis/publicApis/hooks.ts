import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    getNoAuthBrands, 
    getNoAuthCategories, 
    getNoAuthProducts, 
    NoAuthBrandsParams, 
    NoAuthProductsParams, 
    submitContactQuery, 
    ContactUsPayload, 
    getNoAuthDocuments
} from "@/services/apis/publicApis/publicApis";

export const useNoAuthCategoriesQuery = ({ page = 1, limit = 10 }: any) => {
    return useQuery({
        queryKey: ["noAuthCategories", page, limit],
        queryFn: () => getNoAuthCategories({ page, limit }),
    });
};

export const useNoAuthBrandsQuery = (params?: NoAuthBrandsParams) => {
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


export const useSubmitContactQuery = () => {
    return useMutation({
        mutationFn: (payload: ContactUsPayload) => submitContactQuery(payload),
    });
};


export const useNoAuthDocumentsQuery = () => {
    return useQuery({
        queryKey: ["noAuthDocuments"],
        queryFn: () => getNoAuthDocuments(),
    });
};
