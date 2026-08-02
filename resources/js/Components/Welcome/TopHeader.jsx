import React from 'react';
import { Link } from '@inertiajs/react';
import { PhoneIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function TopHeader({ activeLink = 'Home' }) {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Find Job', href: '/find-job' },
        { name: 'Employers', href: '/find-employers' },
        { name: 'Candidates', href: '/CandidateDashboard' },
        { name: 'Pricing Plans', href: '/ComingSoon' },
        { name: 'Customer Supports', href: '/Contact' },
    ];

    return (
        <div className="hidden min-[576px]:block w-full bg-[#F1F2F4] border-b border-gray-200/80 text-xs sm:text-sm text-[#5E6670] px-4 sm:px-6 lg:px-8 transition-colors duration-150">
            <div className="max-w-[1320px] mx-auto">
                <div className="flex items-center justify-between h-[44px]">
                    <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto w-full min-[950px]:w-auto no-scrollbar h-full justify-between min-[950px]:justify-start">
                        {navItems.map((item) => {
                            const isActive = activeLink.toLowerCase() === item.name.toLowerCase();
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center h-full relative transition-colors duration-200 shrink-0 ${
                                        isActive
                                            ? "text-[#0A65CC] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0A65CC]"
                                            : "hover:text-[#0A65CC] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[3px] hover:after:bg-[#0A65CC]"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden min-[950px]:flex items-center gap-4 sm:gap-6 text-xs text-[#18191C] font-medium shrink-0">
                        <div className="flex items-center gap-2 hover:text-[#0A65CC] cursor-pointer transition-colors">
                            <PhoneIcon className="w-4 h-4 text-[#18191C]" />
                            <span>+92 3104510283</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 hover:text-[#0A65CC] cursor-pointer transition-colors">
                            <span className="flex items-center overflow-hidden rounded-[2px] w-5 h-3.5 shadow-xs relative">
                                <img
                                    src="/images/flags/pk.svg"
                                    alt="Pakistan Flag"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        if (e.target.nextElementSibling) {
                                            e.target.nextElementSibling.style.display = 'block';
                                        }
                                    }}
                                />
                                <svg
                                    viewBox="0 0 300 200"
                                    className="hidden w-full h-full object-cover"
                                >
                                    <rect width="300" height="200" fill="#01411C" />
                                    <rect width="75" height="200" fill="#FFFFFF" />
                                    <circle cx="187.5" cy="100" r="45" fill="#FFFFFF" />
                                    <circle cx="198" cy="92" r="40" fill="#01411C" />
                                    <polygon
                                        points="198,62 203,77 218,77 206,86 210,101 198,92 186,101 190,86 178,77 193,77"
                                        fill="#FFFFFF"
                                    />
                                </svg>
                            </span>
                            <span>Pakistan</span>
                            <ChevronDownIcon className="w-3.5 h-3.5 text-[#5E6670]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
