import React, { useState } from 'react';
import { ArrowRightIcon, MapPinIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

export default function FeaturedJobs() {
    const [bookmarkedJobs, setBookmarkedJobs] = useState({});

    const toggleBookmark = (id) => {
        setBookmarkedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const jobs = [
        {
            id: 1,
            title: 'Technical Support Specialist',
            type: 'PART-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: true,
        },
        {
            id: 2,
            title: 'Senior UX Designer',
            type: 'FULL-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: true,
        },
        {
            id: 3,
            title: 'Marketing Officer',
            type: 'INTERNSHIP',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 4,
            title: 'Junior Graphic Designer',
            type: 'INTERNSHIP',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 5,
            title: 'Interaction Designer',
            type: 'PART-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 6,
            title: 'Project Manager',
            type: 'FULL-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 7,
            title: 'Software Engineer',
            type: 'FULL-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 8,
            title: 'Visual Designer',
            type: 'FULL-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 9,
            title: 'Project Manager',
            type: 'FULL-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: true,
        },
        {
            id: 10,
            title: 'Front End Developer',
            type: 'PART-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 11,
            title: 'Senior UX Designer',
            type: 'FULL-TIME',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
        {
            id: 12,
            title: 'Marketing Manager',
            type: 'INTERNSHIP',
            salary: '$20,000 - $25,000',
            company: 'Google Inc.',
            location: 'Dhaka, Bangladesh',
            highlighted: false,
        },
    ];

    // Helper for job type badge colors
    const getBadgeStyle = (type) => {
        switch (type) {
            case 'PART-TIME':
                return 'bg-[#E7F0FA] text-[#0A65CC]';
            case 'FULL-TIME':
                return 'bg-[#E7F6EA] text-[#0BA02C]';
            case 'INTERNSHIP':
                return 'bg-[#FFF6E6] text-[#E05138]';
            default:
                return 'bg-[#F1F2F4] text-[#474C54]';
        }
    };

    return (
        <section className="w-full bg-[#F8F9FA] py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] tracking-tight">
                        Featured job
                    </h2>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E7F0FA] text-[#0A65CC] text-sm font-semibold hover:bg-[#0A65CC] hover:text-white hover:border-[#0A65CC] transition-all duration-200 group bg-white shadow-sm"
                    >
                        <span>View All</span>
                        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>

                {/* 12 Job Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {jobs.map((job) => {
                        const isBookmarked = bookmarkedJobs[job.id];
                        return (
                            <div
                                key={job.id}
                                className={`rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                                    job.highlighted
                                        ? 'bg-[#FFF9F2] border-[#FFE6CC] hover:border-[#F2994A] hover:shadow-md'
                                        : 'bg-white border-gray-200/80 hover:border-[#0A65CC]/40 hover:shadow-md'
                                }`}
                            >
                                <div>
                                    {/* Job Title */}
                                    <h3 className="text-base sm:text-lg font-bold text-[#18191C] group-hover:text-[#0A65CC] transition-colors duration-150 mb-2 truncate">
                                        {job.title}
                                    </h3>

                                    {/* Type Badge & Salary */}
                                    <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                                        <span
                                            className={`text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase ${getBadgeStyle(
                                                job.type
                                            )}`}
                                        >
                                            {job.type}
                                        </span>
                                        <span className="text-xs text-[#767E94]">
                                            Salary: <span className="text-[#474C54] font-medium">{job.salary}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Row: Logo, Company, Location, Bookmark */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100/60 mt-2">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {/* Google Logo SVG */}
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 p-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path
                                                    fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                                />
                                                <path
                                                    fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                                />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                            <h4 className="text-sm font-semibold text-[#18191C] truncate">
                                                {job.company}
                                            </h4>
                                            <div className="flex items-center gap-1 text-xs text-[#767E94] truncate">
                                                <MapPinIcon className="w-3.5 h-3.5 text-[#939AAD] flex-shrink-0" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bookmark Button */}
                                    <button
                                        onClick={() => toggleBookmark(job.id)}
                                        className="p-1.5 rounded-md hover:bg-gray-100/80 transition-colors text-[#939AAD] hover:text-[#0A65CC] flex-shrink-0"
                                        title="Save Job"
                                    >
                                        {isBookmarked ? (
                                            <BookmarkSolidIcon className="w-5 h-5 text-[#0A65CC]" />
                                        ) : (
                                            <BookmarkIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
