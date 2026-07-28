import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
};

const jobCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function FeaturedJobs({ featuredJobs = [] }) {
    const [bookmarkedJobs, setBookmarkedJobs] = useState({});

    const toggleBookmark = (id) => {
        setBookmarkedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Brand color map for company logo fallbacks
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

    // Helper for job type badge styles - uniform light-green badge across all types
    const getBadgeStyle = () => {
        return 'bg-[#E7F6EA] text-[#0BA02C]';
    };

    // Always display the latest 12 featured jobs received from backend props
    const latest12Jobs = (featuredJobs || []).slice(0, 12);

    return (
        <section className="w-full bg-[#F8F9FA] py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-[1320px] mx-auto">
                {/* Header Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#18191C] tracking-tight leading-tight">
                        Featured job
                    </h2>
                    <a
                        href="#"
                        className="inline-flex items-center justify-center gap-2.5 h-[50px] px-6 text-base font-normal text-[#0A65CC] bg-white border border-[#CEE0F5] hover:bg-[#E7F0FA] rounded-md transition-colors duration-200 group"
                    >
                        <span>View All</span>
                        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </motion.div>

                {/* Latest 12 Featured Job Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-40px" }}
                    variants={gridContainerVariants}
                >
                    {latest12Jobs.map((job, idx) => {
                        const isBookmarked = bookmarkedJobs[job.id];
                        const companyName = job.company?.name || 'Company';
                        const companyLogo = job.company?.logo;
                        const location = job.location || job.company?.location || 'Dhaka, Bangladesh';
                        const brand = getCompanyBrand(companyName);

                        // Highlight 1st, 2nd, and 9th cards matching reference design
                        const isWarmHighlighted = idx === 0 || idx === 1 || idx === 8;

                        const logoUrl = companyLogo ? (companyLogo.startsWith('/') ? companyLogo : `/storage/${companyLogo}`) : null;

                        return (
                            <motion.div
                                key={job.id}
                                variants={jobCardVariants}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                                    isWarmHighlighted
                                        ? 'bg-[#FFF9F2] border-[#FFE6CC] hover:border-[#F2994A] hover:shadow-md'
                                        : 'bg-white border-[#EDF0F5] hover:border-[#0A65CC]/40 hover:shadow-md'
                                }`}
                            >
                                <div>
                                    {/* Job Title */}
                                    <h3 className="text-base font-normal text-[#18191C] group-hover:text-[#0A65CC] transition-colors duration-150 mb-2 truncate">
                                        {job.title}
                                    </h3>

                                    {/* Type Badge & Salary */}
                                    <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                                        <span
                                            className={`text-[12px] font-semibold px-2.5 py-1 rounded-md uppercase ${getBadgeStyle()}`}
                                        >
                                            {job.job_type || job.type || 'FULL-TIME'}
                                        </span>
                                        <span className="text-xs text-[#767E94]">
                                            Salary: <span className="text-[#767E94] font-normal">{job.salary || '$20,000 - $25,000'}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Row: Logo, Company, Location, Bookmark */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100/60 mt-2">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        {/* Company Logo Container */}
                                        <div className="w-10 h-10 rounded-lg bg-gray-50/80 border border-gray-100 flex items-center justify-center flex-shrink-0 p-1.5 overflow-hidden relative shadow-xs">
                                            {logoUrl ? (
                                                <img
                                                    src={logoUrl}
                                                    alt={companyName}
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
                                                className={`hidden absolute inset-0 ${brand.bg} ${brand.text} font-bold text-sm items-center justify-center`}
                                            >
                                                {brand.letter}
                                            </div>
                                        </div>

                                        <div className="flex flex-col min-w-0 flex-1">
                                            <h4 className="text-sm font-medium text-[#18191C] truncate">
                                                {companyName}
                                            </h4>
                                            <div className="flex items-center gap-1 text-xs text-[#767E94] truncate mt-0.5">
                                                <MapPinIcon className="w-3.5 h-3.5 text-[#939AAD] flex-shrink-0" />
                                                <span className="truncate">{location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bookmark Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleBookmark(job.id);
                                        }}
                                        className="p-1.5 rounded-md hover:bg-gray-100/80 transition-colors text-[#939AAD] hover:text-[#0A65CC] flex-shrink-0 ml-2"
                                        title="Save Job"
                                    >
                                        {isBookmarked ? (
                                            <BookmarkSolidIcon className="w-5 h-5 text-[#0A65CC]" />
                                        ) : (
                                            <BookmarkIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

