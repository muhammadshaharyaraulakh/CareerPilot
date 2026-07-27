import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DualBanner() {
    return (
        <section className="w-full bg-white py-14 lg:py-20 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* 1. Become a Candidate Banner */}
                <div className="bg-[#EBF0F5] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[280px] group shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Background Overlay Graphic Image */}
                    <img
                        src="/images/banners/candidate_banner.png"
                        alt="Candidate Laptop Desk"
                        className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[48%] h-full object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Banner Content */}
                    <div className="relative z-10 max-w-[62%] sm:max-w-[58%] flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#18191C] mb-3 leading-tight">
                                Become a Candidate
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.
                            </p>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center gap-2.5 bg-white text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white px-5 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-colors duration-200 w-fit"
                        >
                            <span>Register Now</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* 2. Become a Employers Banner */}
                <div className="bg-[#0066E0] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[280px] group shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Background Overlay Graphic Image */}
                    <img
                        src="/images/banners/employer_banner.png"
                        alt="Employer Businessman"
                        className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[48%] h-full object-cover object-top pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Banner Content */}
                    <div className="relative z-10 max-w-[62%] sm:max-w-[58%] flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                                Become a Employers
                            </h3>
                            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                                Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu.
                            </p>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center gap-2.5 bg-white text-[#0A65CC] hover:bg-[#18191C] hover:text-white px-5 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-colors duration-200 w-fit"
                        >
                            <span>Register Now</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
