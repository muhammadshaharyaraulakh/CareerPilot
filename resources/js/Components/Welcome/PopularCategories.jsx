import React from 'react';
import {
    PaintBrushIcon,
    CodeBracketIcon,
    SpeakerWaveIcon,
    FilmIcon,
    MusicalNoteIcon,
    ChartBarIcon,
    BuildingOffice2Icon,
    CircleStackIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function PopularCategories() {
    const categories = [
        {
            id: 1,
            title: 'Graphics & Design',
            positions: '357 Open position',
            icon: PaintBrushIcon,
            active: false,
        },
        {
            id: 2,
            title: 'Code & Programing',
            positions: '312 Open position',
            icon: CodeBracketIcon,
            active: false,
        },
        {
            id: 3,
            title: 'Digital Marketing',
            positions: '297 Open position',
            icon: SpeakerWaveIcon,
            active: false,
        },
        {
            id: 4,
            title: 'Video & Animation',
            positions: '247 Open position',
            icon: FilmIcon,
            active: false,
        },
        {
            id: 5,
            title: 'Music & Audio',
            positions: '204 Open position',
            icon: MusicalNoteIcon,
            active: false,
        },
        {
            id: 6,
            title: 'Account & Finance',
            positions: '167 Open position',
            icon: ChartBarIcon,
            active: false,
        },
        {
            id: 7,
            title: 'Health & Care',
            positions: '125 Open position',
            icon: BuildingOffice2Icon,
            active: false,
        },
        {
            id: 8,
            title: 'Data & Science',
            positions: '57 Open position',
            icon: CircleStackIcon,
            active: true, // Featured active card in white with shadow
        },
    ];

    return (
        <section className="w-full bg-white py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] tracking-tight">
                        Popular category
                    </h2>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E7F0FA] text-[#0A65CC] text-sm font-semibold hover:bg-[#0A65CC] hover:text-white hover:border-[#0A65CC] transition-all duration-200 group"
                    >
                        <span>View All</span>
                        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>

                {/* 8 Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                            <div
                                key={cat.id}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                                    cat.active
                                        ? 'bg-white shadow-xl shadow-gray-200/80 border border-gray-100 z-10 scale-[1.02]'
                                        : 'bg-[#F8F9FA]/60 hover:bg-white hover:shadow-md hover:shadow-gray-100 border border-transparent hover:border-gray-100'
                                }`}
                            >
                                {/* Icon Badge */}
                                <div
                                    className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                        cat.active
                                            ? 'bg-[#0A65CC] text-white shadow-md shadow-[#0A65CC]/30'
                                            : 'bg-[#E7F0FA] text-[#0A65CC] group-hover:bg-[#0A65CC] group-hover:text-white'
                                    }`}
                                >
                                    <IconComponent className="w-7 h-7 stroke-[1.8]" />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col min-w-0">
                                    <h3
                                        className={`text-base font-bold truncate transition-colors duration-200 ${
                                            cat.active
                                                ? 'text-[#0A65CC]'
                                                : 'text-[#18191C] group-hover:text-[#0A65CC]'
                                        }`}
                                    >
                                        {cat.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#767E94] font-normal truncate mt-0.5">
                                        {cat.positions}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
