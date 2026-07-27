import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

export default function TopCompanies() {
    const companies = [
        { id: 1, name: 'Dribbble', featured: true, location: 'Dhaka, Bangladesh', positions: 3 },
        { id: 2, name: 'Dribbble', featured: true, location: 'Dhaka, Bangladesh', positions: 3 },
        { id: 3, name: 'Dribbble', featured: true, location: 'Dhaka, Bangladesh', positions: 3 },
        { id: 4, name: 'Dribbble', featured: true, location: 'Dhaka, Bangladesh', positions: 3 },
        { id: 5, name: 'Dribbble', featured: true, location: 'Dhaka, Bangladesh', positions: 3 },
        { id: 6, name: 'Dribbble', featured: true, location: 'Dhaka, Bangladesh', positions: 3 },
    ];

    return (
        <section className="w-full bg-white py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header Row */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] mb-8 sm:mb-10 tracking-tight">
                    Top companies
                </h2>

                {/* 6 Company Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {companies.map((comp) => (
                        <div
                            key={comp.id}
                            className="bg-white rounded-xl border border-gray-200/80 p-5 flex flex-col justify-between hover:shadow-lg hover:border-[#0A65CC]/30 transition-all duration-200 group"
                        >
                            {/* Top Info */}
                            <div className="flex items-start gap-4 mb-5">
                                {/* Dribbble Logo Container */}
                                <div className="w-12 h-12 rounded-lg bg-[#EA4C89] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                                    {/* Dribbble Basketball SVG */}
                                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.002 8.002 0 0 1 2.29 5.285 14.73 14.73 0 0 0-4.661-.955 35.83 35.83 0 0 0-2.025-4.07 8.077 8.077 0 0 1 4.396-.26zM12 4.004c.73 0 1.437.098 2.112.28a34.34 34.34 0 0 1 1.95 3.928 13.916 13.916 0 0 0-5.772 1.34 35.32 35.32 0 0 1-2.073-3.693A7.973 7.973 0 0 1 12 4.004zM6.634 6.745a37.28 37.28 0 0 0 2.052 3.652 14.764 14.764 0 0 1-4.646 1.83 8.003 8.003 0 0 1 2.594-5.482zM4.003 12.7c.05-.005.101-.007.151-.007a13.784 13.784 0 0 0 5.283-1.077 34.34 34.34 0 0 1 1.936 4.305 14.61 14.61 0 0 0-6.904 2.875A7.973 7.973 0 0 1 4.003 12.7zm9.957 7.29a7.975 7.975 0 0 1-3.668.008 13.626 13.626 0 0 1 6.55-2.732 35.845 35.845 0 0 1 1.868 3.528 8.005 8.005 0 0 1-4.75-.804zm6.035-1.92a37.38 37.38 0 0 0-1.89-3.553 15.688 15.688 0 0 1 4.364.887 8.005 8.005 0 0 1-2.474 2.666z" />
                                    </svg>
                                </div>

                                {/* Title, Badge, Location */}
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-[#18191C] truncate group-hover:text-[#0A65CC] transition-colors duration-150">
                                            {comp.name}
                                        </h3>
                                        {comp.featured && (
                                            <span className="bg-[#FCEAEB] text-[#E05138] text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 uppercase tracking-wide">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-[#767E94] mt-1 truncate">
                                        <MapPinIcon className="w-3.5 h-3.5 text-[#939AAD] flex-shrink-0" />
                                        <span className="truncate">{comp.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Open Position Button */}
                            <a
                                href="#"
                                className="w-full bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white font-semibold text-sm py-2.5 rounded-lg transition-colors duration-200 text-center block"
                            >
                                Open Position ({comp.positions})
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
