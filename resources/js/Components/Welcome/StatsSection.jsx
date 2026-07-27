import React from 'react';
import { BriefcaseIcon, BuildingOffice2Icon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function StatsSection() {
    const stats = [
        {
            id: 1,
            count: '1,75,324',
            label: 'Live Job',
            icon: BriefcaseIcon,
            highlighted: false,
        },
        {
            id: 2,
            count: '97,354',
            label: 'Companies',
            icon: BuildingOffice2Icon,
            highlighted: true, // blue box background for icon as shown in screenshot
        },
        {
            id: 3,
            count: '38,47,154',
            label: 'Candidates',
            icon: UserGroupIcon,
            highlighted: false,
        },
        {
            id: 4,
            count: '7,532',
            label: 'New Jobs',
            icon: BriefcaseIcon,
            highlighted: false,
        },
    ];

    return (
        <section className="w-full bg-[#F8F9FA] pb-16 pt-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 sm:gap-5 group"
                        >
                            {/* Icon Container */}
                            <div
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                                    stat.highlighted
                                        ? 'bg-[#0A65CC] text-white shadow-md shadow-[#0A65CC]/30'
                                        : 'bg-[#E7F0FA] text-[#0A65CC]'
                                }`}
                            >
                                <IconComponent className="w-7 h-7 stroke-[1.8]" />
                            </div>

                            {/* Stat Numbers and Label */}
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold text-[#18191C] tracking-tight group-hover:text-[#0A65CC] transition-colors">
                                    {stat.count}
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-[#767E94] mt-0.5">
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
