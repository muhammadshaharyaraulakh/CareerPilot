import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const suggestions = [
        { label: 'Designer,', keyword: 'Designer', highlight: false },
        { label: 'Programing,', keyword: 'Programing', highlight: false },
        { label: 'Digital Marketing,', keyword: 'Digital Marketing', highlight: true },
        { label: 'Video,', keyword: 'Video', highlight: false },
        { label: 'Animation.', keyword: 'Animation', highlight: false },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle search
    };

    return (
        <section className="w-full overflow-hidden bg-[#f1f2f4] px-4 pb-4 sm:pb-6 lg:pb-8 pt-10 sm:pt-14 lg:pt-[72px] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1320px]">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left Content */}
                    <div className="flex flex-col gap-6 sm:gap-8">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <h1 className="m-0 text-[28px] sm:text-[40px] lg:text-[56px] font-medium leading-[1.2] lg:leading-[64px] tracking-tight text-gray-900">
                                Find a job that suits your interest and skills.
                            </h1>
                            <p className="m-0 max-w-[536px] text-xs sm:text-base lg:text-lg leading-6 sm:leading-7 text-[#5E6670]">
                                Great platform for job seekers searching for new career opportunities and employers looking to hire top talent worldwide.
                            </p>
                        </div>

                        {/* Dual Search Form */}
                        <form className="flex flex-col gap-3 sm:gap-4 max-w-[670px] w-full" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3 rounded-xl border border-[#E4E5E8] bg-white p-2.5 min-[576px]:p-3 shadow-[0_12px_40px_rgba(0,44,109,0.04)] min-[576px]:flex-row min-[576px]:items-center min-[576px]:h-[80px]">
                                <div className="flex min-w-0 flex-1 flex-col gap-2 min-[576px]:flex-row min-[576px]:items-center min-[576px]:h-full">
                                    {/* Keyword Input */}
                                    <div className="relative flex-1 min-w-0 min-[576px]:h-full flex items-center">
                                        <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#0A65CC]" />
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            placeholder="Job title, Keyword..."
                                            className="h-11 min-[576px]:h-full w-full border-0 bg-transparent pl-12 pr-3 text-sm min-[576px]:text-base text-[#18191C] placeholder:text-[#939AAD] focus:outline-none focus:ring-0"
                                        />
                                    </div>

                                    {/* Separator Divider */}
                                    <span className="hidden h-8 w-px bg-[#E4E5E8] min-[576px]:block shrink-0" />

                                    {/* Location Input */}
                                    <div className="relative flex-1 min-w-0 min-[576px]:max-w-[210px] min-[576px]:h-full flex items-center">
                                        <MapPinIcon className="pointer-events-none absolute left-3.5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#0A65CC]" />
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Your Location"
                                            className="h-11 min-[576px]:h-full w-full border-0 bg-transparent pl-12 pr-3 text-sm min-[576px]:text-base text-[#18191C] placeholder:text-[#939AAD] focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                </div>

                                {/* Find Job Button (Matches Register / Post A Job Button) */}
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center h-12 min-[576px]:h-[56px] px-7 shrink-0 text-base font-medium text-white bg-[#0A65CC] hover:bg-[#0851A8] rounded-md transition-colors"
                                >
                                    Find Job
                                </button>
                            </div>

                            {/* Suggestion tags */}
                            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm pt-1">
                                <span className="text-[#939AAD] font-medium">Suggestion:</span>
                                {suggestions.map((s) => (
                                    <button
                                        key={s.label}
                                        type="button"
                                        onClick={() => setKeyword(s.keyword)}
                                        className={`whitespace-nowrap bg-transparent p-0 transition-colors hover:text-[#0A65CC] ${
                                            s.highlight ? 'font-medium text-[#0A65CC] underline underline-offset-2' : 'text-[#5E6670]'
                                        }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </div>

                    {/* Right Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-[420px] lg:max-w-[492px]">
                            {/* Vector Illustration Image */}
                            <img
                                src="/images/banners/illustration.svg"
                                alt="Job search illustration"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
