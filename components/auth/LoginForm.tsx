"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";



const COUNTDOWN_DURATION = 30;

export const LoginForm = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Clean up timer when component unmounts
        return () => {
            setCountdown(0);
        };
    }, []);

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (!/^[0-9]{10}$/.test(phone)) {
                throw new Error("Please enter a valid 10-digit phone number");
            }

            setIsOtpSent(true);
            startCountdown();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Simulate verification
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (!/^[0-9]{6}$/.test(otp)) {
                throw new Error("Please enter a valid 6-digit OTP");
            }

            // On successful login
            router.push("/login/user_information");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to verify OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const startCountdown = () => {
        setCountdown(COUNTDOWN_DURATION);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    };

    const resendOtp = () => {
        if (countdown > 0) return;
        startCountdown();
        // In a real app, you would call your API to resend OTP here
    };

    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back</h1>
                <p className="text-gray-500 text-sm">
                    {isOtpSent ? "Enter your verification code" : "Sign in with your phone number"}
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            {!isOtpSent ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <Input
                        label="Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="00000 00000"
                        required
                        leftIcon={<span className="text-gray-500">+91</span>}
                        pattern="[0-9]{10}"
                        maxLength={10}
                    />

                    <Button type="submit" isLoading={isLoading} fullWidth>
                        Send Verification Code
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <Input
                        label="Verification Code"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit code"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                    />

                    <p className="text-xs text-gray-500">
                        We've sent a code to +91{phone}
                    </p>

                    <Button type="submit" isLoading={isLoading} fullWidth>
                        Verify
                    </Button>

                    <div className="text-center text-xs">
                        {countdown > 0 ? (
                            <span className="text-gray-500">Resend code in {countdown}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={resendOtp}
                                className="text-[#1B4B66] hover:text-[#143A52] font-medium"
                                disabled={countdown > 0}
                            >
                                Resend Code
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};