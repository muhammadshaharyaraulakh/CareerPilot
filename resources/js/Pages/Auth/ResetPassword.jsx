import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { 
    EyeIcon,
    EyeSlashIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen w-full bg-white text-[#18191C] font-sans antialiased flex flex-col justify-center selection:bg-transparent selection:text-[#0A65CC]">
            <Head title="Reset Password - Jobpilot" />

            {/* Main Content Layout Container */}
            <main className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                    {/* Left Form Column */}
                    <div className="lg:col-span-6 xl:col-span-6 w-full max-w-[480px] mx-auto lg:mx-0">
                        
                        {/* Header Logo */}
                        <div className="mb-6">
                            <Link href="/" className="inline-block hover:opacity-90 transition-opacity no-underline">
                                <ApplicationLogo className="h-9 w-auto" />
                            </Link>
                        </div>

                        {/* Title & Description */}
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#18191C] tracking-tight">
                                Reset Password.
                            </h1>
                            <p className="text-sm text-[#767E94] mt-1">
                                Enter your new password below to reset your account password.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-4">
                            {/* Email Address */}
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email address"
                                    readOnly
                                    required
                                    autoComplete="username"
                                    className="w-full h-12 px-4 text-sm bg-[#F1F2F4] text-[#5E6670] border border-[#E4E5E8] rounded-none cursor-not-allowed focus:outline-none placeholder:text-[#9199A8]"
                                />
                                <InputError message={errors.email} className="mt-1 text-xs text-[#E05151]" />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="New Password"
                                    required
                                    autoComplete="new-password"
                                    className="w-full h-12 pl-4 pr-11 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                                <InputError message={errors.password} className="mt-1 text-xs text-[#E05151]" />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirm New Password"
                                    required
                                    autoComplete="new-password"
                                    className="w-full h-12 pl-4 pr-11 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                                <InputError message={errors.password_confirmation} className="mt-1 text-xs text-[#E05151]" />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 h-12 px-6 bg-[#0A65CC] hover:bg-[#0851A8] active:bg-[#074793] disabled:opacity-60 text-white font-semibold text-sm rounded-none shadow-sm transition-all duration-200 cursor-pointer"
                                >
                                    <span>Reset Password</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </form>

                        {/* Back to Login Link */}
                        <div className="mt-6 text-center text-sm text-[#767E94]">
                            <Link href={route('login')} className="font-semibold text-[#0A65CC] no-underline hover:opacity-90">
                                Back to Log In
                            </Link>
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 items-center justify-center">
                        <img
                            src="/images/auth/resetPassword.png"
                            alt="Reset Password Illustration"
                            className="w-full max-w-[540px] h-auto object-contain mx-auto rounded-none"
                        />
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
