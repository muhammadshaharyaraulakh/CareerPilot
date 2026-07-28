import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

const companyCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function TopCompanies({ featuredCompanies = [] }) {
    const companyList = featuredCompanies || [];

    // Custom Brand Colors for Fallback Logo Rendering if Image Fails
    const getCompanyBrand = (name = '') => {
        const lower = name.toLowerCase();
        if (lower.includes('dribbble')) return { bg: 'bg-[#EA4C89]', text: 'text-white', letter: 'D' };
        if (lower.includes('google')) return { bg: 'bg-[#4285F4]', text: 'text-white', letter: 'G' };
        if (lower.includes('microsoft')) return { bg: 'bg-[#00A4EF]', text: 'text-white', letter: 'M' };
        if (lower.includes('apple')) return { bg: 'bg-[#18191C]', text: 'text-white', letter: 'A' };
        if (lower.includes('amazon')) return { bg: 'bg-[#FF9900]', text: 'text-white', letter: 'A' };
        if (lower.includes('figma')) return { bg: 'bg-[#F24E1E]', text: 'text-white', letter: 'F' };
        return { bg: 'bg-[#0A65CC]', text: 'text-white', letter: name.charAt(0).toUpperCase() || 'C' };
    };

    return (
        <section className="w-full bg-white py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-[1320px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 sm:mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium leading-tight text-[#18191C] tracking-tight">
                        Top companies
                    </h2>
                </motion.div>

                {/* 6 Company Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-40px" }}
                    variants={gridContainerVariants}
                >
                    {companyList.slice(0, 6).map((comp) => {
                        const brand = getCompanyBrand(comp.name);
                        const openPositions = comp.jobs_count ?? comp.positions ?? 0;
                        const isFeatured = comp.is_featured ?? comp.featured ?? true;
                        const logoUrl = comp.logo ? (comp.logo.startsWith('/') ? comp.logo : `/storage/${comp.logo}`) : null;

                        return (
                            <motion.div
                                key={comp.id}
                                variants={companyCardVariants}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="bg-white rounded-xl border border-[#EDF0F5] p-5 flex flex-col justify-between hover:shadow-md hover:border-[#0A65CC]/30 transition-all duration-200 group"
                            >
                                {/* Top Header Info */}
                                <div className="flex items-start gap-4 mb-5">
                                    {/* Company Logo Icon Box */}
                                    <div className="w-12 h-12 rounded-lg bg-gray-50/80 border border-gray-100 p-2 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden relative">
                                        {logoUrl ? (
                                            <img
                                                src={logoUrl}
                                                alt={comp.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    if (e.target.nextSibling) {
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className={`hidden absolute inset-0 ${brand.bg} ${brand.text} font-bold text-xl items-center justify-center`}
                                        >
                                            {brand.letter}
                                        </div>
                                    </div>

                                    {/* Name, Featured Badge, Location */}
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base font-medium text-[#18191C] truncate group-hover:text-[#0A65CC] transition-colors duration-150">
                                                {comp.name}
                                            </h3>
                                            {isFeatured && (
                                                <span className="bg-[#FCEAEB] text-[#E05138] text-[12px] font-normal px-2.5 py-0.5 rounded-full flex-shrink-0 leading-none">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-[#767E94] font-normal mt-1 truncate">
                                            <MapPinIcon className="w-3.5 h-3.5 text-[#939AAD] flex-shrink-0" />
                                            <span className="truncate">{comp.location || 'Location Not Specified'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Open Position Action Button */}
                                <a
                                    href="#"
                                    className="w-full bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white font-semibold text-sm py-2.5 rounded-md transition-colors duration-200 text-center block"
                                >
                                    Open Position ({openPositions})
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
