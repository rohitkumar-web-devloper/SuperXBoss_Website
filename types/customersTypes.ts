export interface CustomerPayload {
    _id: string;
    id: string; 
    mobile: string;
    point: string;
    language: string;
    type: string;
    status: boolean;
    wallet_amount: string;
    otp: string | null;
    __v?: number;
    fcm_token: string;
    first_name: string;
    last_name: string;
    state: string;
    full_name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    _payload: T;
    type: string;
    message: string;
    success: boolean;
}

export type CustomerResponse = ApiResponse<CustomerPayload>;