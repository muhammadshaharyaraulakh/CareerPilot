import React from 'react';
import { Link } from '@inertiajs/react';
import { PhoneIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function TopHeader() {
    return (
        <div className="w-full bg-[#F1F2F4] border-b border-gray-200/80 text-xs sm:text-sm text-[#5E6670] transition-colors duration-150">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between min-h-[44px] py-2 md:py-0 gap-2 md:gap-0">
                    {/* Navigation Links */}
                    <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto w-full md:w-auto no-scrollbar py-1 md:py-0">
                        <Link 
                            href="#" 
                            className="font-medium text-[#0A65CC] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0A65CC] after:rounded-full shrink-0"
                        >
                            Home
                        </Link>
                        <Link href="#" className="hover:text-[#0A65CC] transition-colors duration-200 shrink-0">
                            Find Job
                        </Link>
                        <Link href="#" className="hover:text-[#0A65CC] transition-colors duration-200 shrink-0">
                            Employers
                        </Link>
                        <Link href="#" className="hover:text-[#0A65CC] transition-colors duration-200 shrink-0">
                            Candidates
                        </Link>
                        <Link href="#" className="hover:text-[#0A65CC] transition-colors duration-200 shrink-0">
                            Pricing Plans
                        </Link>
                        <Link href="#" className="hover:text-[#0A65CC] transition-colors duration-200 shrink-0">
                            Customer Supports
                        </Link>
                    </nav>

                    {/* Right side Info: Phone & Language */}
                    <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#18191C] font-medium shrink-0 self-end md:self-auto">
                        <div className="flex items-center gap-2 hover:text-[#0A65CC] cursor-pointer transition-colors">
                            <PhoneIcon className="w-4 h-4 text-[#18191C]" />
                            <span>+1-202-555-0178</span>
                        </div>
                        
                        {/* Language Selector */}
                        <div className="flex items-center gap-1.5 hover:text-[#0A65CC] cursor-pointer transition-colors">
                            <span className="flex items-center overflow-hidden rounded-[2px] w-5 h-3.5 shadow-sm">
                                <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                                    <g fillRule="evenodd">
                                        <g strokeWidth="1pt">
                                            <path fill="#bd3d44" d="M0 0h640v480H0z"/>
                                            <path fill="#fff" d="M0 36.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0zm0 73.9h640v36.9H0zm0 73.8h640v36.9H0z"/>
                                        </g>
                                        <path fill="#192f5d" d="M0 0h295.4v258.5H0z"/>
                                    </g>
                                </svg>
                            </span>
                            <span>English</span>
                            <ChevronDownIcon className="w-3.5 h-3.5 text-[#5E6670]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
