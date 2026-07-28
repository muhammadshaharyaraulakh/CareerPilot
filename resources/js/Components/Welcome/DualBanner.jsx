import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DualBanner() {
    return (
        <section className="w-full bg-white py-10 sm:py-14 lg:py-20 px-3 sm:px-6 lg:px-8 transition-colors overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                {/* 1. Become a Candidate Banner */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#E9ECEF] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[220px] sm:min-h-[260px] group shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    {/* Background AI Banner Image (Spans Full Card, Right Aligned) */}
                    <img
                        src="/images/banners/candidate_banner.png"
                        alt="Candidate Workspace"
                        className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Banner Content on Left */}
                    <div className="relative z-10 max-w-[55%] sm:max-w-[50%] flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#18191C] mb-2 sm:mb-3 leading-tight">
                                Become a Candidate
                            </h3>
                            <p className="text-xs sm:text-sm text-[#2D3748] leading-relaxed mb-4 sm:mb-6">
                                Build your professional profile,<br></br>explore verified job openings <br /> and accelerate your career <br /> path today.
                            </p>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center justify-center h-[50px] px-6 text-base font-medium text-[#0A65CC] bg-white border border-[#CEE0F5] hover:bg-[#E7F0FA] rounded-md transition-colors"
                        >
                            <span>Register </span>
                            <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        </a>
                    </div>
                </motion.div>

                {/* 2. Become an Employer Banner */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#0066CC] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[220px] sm:min-h-[260px] group shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    {/* Background AI Banner Image (Spans Full Card, Right Aligned) */}
                    <img
                        src="/images/banners/employer_banner.png"
                        alt="Employer"
                        className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Banner Content on Left */}
                    <div className="relative z-10 max-w-[55%] sm:max-w-[50%] flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-white mb-2 sm:mb-3 leading-tight">
                                Become an Employer
                            </h3>
                            <p className="text-xs sm:text-sm font-normal text-white leading-relaxed mb-4 sm:mb-6">
                                Discover top talent, post job opportunities <br /> and build high <br />performing teams  <br /> with smart hiring tools.
                            </p>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center justify-center h-[50px] px-6 text-base font-medium text-[#0A65CC] bg-white border border-[#CEE0F5] hover:bg-[#E7F0FA] rounded-md transition-colors"
                        >
                            <span>Register</span>
                            <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
