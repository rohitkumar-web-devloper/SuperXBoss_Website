'use client';

import { createContext, useContext } from 'react';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { login as apiLogin,  verifyOTP } from '@/services/apis/customers/customers';
import { useRouter } from 'next/navigation';

type User = {
    id: string;
    name: string;
    phone: string;
} | null;

type AuthContextType = {
    user: User | null | undefined;
    loginMutation: UseMutationResult<string, Error, string, unknown>;
    verifyOTPMutation: UseMutationResult<any, Error, { phone: string; otp: string }, unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: user } = useQuery<User>({
        queryKey: ['auth-user'],
        initialData: null,
        staleTime: Infinity,
        queryFn: async () => {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        },
    });

    // Login mutation: send OTP
    const loginMutation = useMutation({
        mutationFn: async (phone: string) => {
            const response = await apiLogin({ mobile: phone });
            if (!response.success) {
                throw new Error(response.message || 'Failed to send OTP');
            }
            return phone;
        },
        onSuccess: (phone) => {
            queryClient.setQueryData(['auth-phone'], phone);
            queryClient.setQueryData(['auth-otp-sent'], true);
        },
    });

    // Verify OTP mutation
    const verifyOTPMutation = useMutation({
        mutationKey: ['verify-otp'],
        mutationFn: ({ phone, otp }: { phone: string; otp: string }) =>
        verifyOTP({ mobile: phone, otp }), 
    });
    const value: AuthContextType = {
        user,
        loginMutation,
        verifyOTPMutation,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
