import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { MagnifyingGlassIcon, ChevronDownIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function MainNavbar({ auth }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [country, setCountry] = useState('India');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-gray-100 py-3.5 px-4 sm:px-6 lg:px-8 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Left: Logo & Header Search Bar */}
                <div className="flex items-center gap-6 lg:gap-10 flex-1">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                        <div className="w-10 h-10 bg-[#0A65CC] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#0A65CC]/20 group-hover:scale-105 transition-transform duration-200">
                            <BriefcaseIcon className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <span className="text-2xl font-bold text-[#18191C] tracking-tight group-hover:text-[#0A65CC] transition-colors">
                            Jobpilot
                        </span>
                    </Link>

                    {/* Integrated Country Selector & Quick Search */}
                    <div className="hidden md:flex items-center flex-1 max-w-xl border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#0A65CC] focus-within:ring-2 focus-within:ring-[#0A65CC]/15 transition-all duration-200">
                        {/* Country Selector */}
                        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50/50 border-r border-gray-200 cursor-pointer hover:bg-gray-100/60 transition-colors shrink-0">
                            <span className="flex items-center rounded-sm overflow-hidden w-5 h-3.5 shadow-xs">
                                <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                                    <path fill="#058535" d="M0 0h640v160H0z"/>
                                    <path fill="#fff" d="M0 160h640v160H0z"/>
                                    <path fill="#000" d="M0 320h640v160H0z"/>
                                    <circle cx="320" cy="240" r="60" fill="none" stroke="#000080" strokeWidth="12"/>
                                </svg>
                            </span>
                            <span className="text-xs font-semibold text-[#18191C]">{country}</span>
                            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center flex-1 px-3 py-2 bg-white">
                            <MagnifyingGlassIcon className="w-5 h-5 text-[#0A65CC] mr-2.5 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Job title, keyword, company"
                                className="w-full text-xs sm:text-sm text-[#18191C] placeholder-gray-400 border-none outline-none focus:ring-0 p-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Auth Action Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                    {auth && auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0A65CC] hover:bg-[#0851A8] rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#0A65CC] border border-[#0A65CC]/30 hover:border-[#0A65CC] hover:bg-[#0A65CC]/5 rounded-md transition-all duration-200"
                            >
                                Sign In
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0A65CC] hover:bg-[#0851A8] rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                Post A Jobs
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar (visible on screens < 768px down to 320px) */}
            <div className="mt-3 md:hidden">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#0A65CC] focus-within:ring-2 focus-within:ring-[#0A65CC]/15 transition-all">
                    <div className="flex items-center flex-1 px-3 py-2 bg-white">
                        <MagnifyingGlassIcon className="w-4 h-4 text-[#0A65CC] mr-2 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Job title, keyword, company..."
                            className="w-full text-xs text-[#18191C] placeholder-gray-400 border-none outline-none focus:ring-0 p-0"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
