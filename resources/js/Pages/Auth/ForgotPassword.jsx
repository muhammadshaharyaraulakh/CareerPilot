import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen w-full bg-white text-[#18191C] font-sans antialiased flex flex-col justify-center selection:bg-transparent selection:text-[#0A65CC]">
            <Head title="Forgot Password - Jobpilot" />

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
                                Forgot Password.
                            </h1>
                            <p className="text-sm text-[#767E94] mt-2 leading-relaxed">
                                Enter your email address below and we'll send you a password reset link to recover your account.
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-5 text-sm font-medium text-emerald-700 bg-emerald-50 p-3.5 rounded-none border border-emerald-200">
                                {status}
                            </div>
                        )}

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
                                    required
                                    autoFocus
                                    className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                />
                                <InputError message={errors.email} className="mt-1 text-xs text-[#E05151]" />
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

                        {/* Secondary Links */}
                        <div className="mt-8 pt-6 border-t border-[#E4E5E8] flex flex-wrap items-center justify-between text-xs text-[#767E94] gap-2">
                            <span>
                                Remember password?{' '}
                                <Link href={route('login')} className="font-semibold text-[#0A65CC] no-underline hover:opacity-90">
                                    Log In
                                </Link>
                            </span>

                            <span>
                                Don't have account?{' '}
                                <Link href={route('register')} className="font-semibold text-[#0A65CC] no-underline hover:opacity-90">
                                    Create Account
                                </Link>
                            </span>
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 items-center justify-center">
                        <img
                            src="/images/auth/forgotPassword.png"
                            alt="Forgot Password Illustration"
                            className="w-full max-w-[540px] h-auto object-contain mx-auto rounded-none"
                        />
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
