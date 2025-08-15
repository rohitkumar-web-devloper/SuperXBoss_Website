// contexts/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login as apiLogin, verifyOTP, updateCustomer } from '@/services/apis/customers/customers';
import { CustomerPayload } from '@/types/customersTypes';

type AuthContextType = {
    user: CustomerPayload | null;
    setUser: React.Dispatch<React.SetStateAction<CustomerPayload | null>>;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginMutation: UseMutationResult<string, Error, string, unknown>;
    verifyOTPMutation: UseMutationResult<any, Error, { phone: string; otp: string }, unknown>;
    updateCustomerMutation: UseMutationResult<any, Error, FormData, unknown>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CustomerPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, []);

    const loginMutation = useMutation({
        mutationKey: ['send-otp'],
        mutationFn: async (phone: string) => await apiLogin({ mobile: phone }),
    });

    const verifyOTPMutation = useMutation({
        mutationKey: ['verify-otp'],
        mutationFn: async ({ phone, otp }: { phone: string; otp: string }) => {
            const data = await verifyOTP({ mobile: phone, otp });
            localStorage.setItem('token', data._payload.token);
            setUser(data._payload.user);
            return data;
        },
    });

    const updateCustomerMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const updatedUser = await updateCustomer(formData);
            setUser(updatedUser._payload);
            return updatedUser;
        },
    });

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        setUser,
        isAuthenticated: !!user,
        isLoading,
        loginMutation,
        verifyOTPMutation,
        updateCustomerMutation,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};