import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
    const [titleKeyword, setTitleKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // search action
    };

    return (
        <section className="w-full bg-[#F8F9FA] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* Left Content Column */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18191C] leading-[1.15] tracking-tight">
                        Find a job that suits <br className="hidden sm:inline" />
                        your interest &amp; skills.
                    </h1>

                    {/* Subtitle Paragraph */}
                    <p className="text-xs sm:text-sm lg:text-base text-[#5E6670] leading-relaxed max-w-xl">
                        Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in
                        scelerisque leo, eget sollicitudin velit vestibulum.
                    </p>

                    {/* Dual Search Form Bar */}
                    <form 
                        onSubmit={handleSearch}
                        className="w-full bg-white p-2.5 sm:p-3 rounded-xl shadow-lg shadow-gray-200/60 border border-gray-100 flex flex-col md:flex-row items-center gap-3 transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#0A65CC]/20"
                    >
                        {/* Job title / Keyword input */}
                        <div className="flex items-center flex-1 w-full px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                            <MagnifyingGlassIcon className="w-5 h-5 text-[#0A65CC] mr-3 shrink-0" />
                            <input
                                type="text"
                                value={titleKeyword}
                                onChange={(e) => setTitleKeyword(e.target.value)}
                                placeholder="Job title, Keyword..."
                                className="w-full text-xs sm:text-sm text-[#18191C] placeholder-gray-400 border-none outline-none focus:ring-0 p-0"
                            />
                        </div>

                        {/* Location input */}
                        <div className="flex items-center flex-1 w-full px-3 py-2">
                            <MapPinIcon className="w-5 h-5 text-[#0A65CC] mr-3 shrink-0" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Your Location"
                                className="w-full text-xs sm:text-sm text-[#18191C] placeholder-gray-400 border-none outline-none focus:ring-0 p-0"
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="w-full md:w-auto px-7 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md shadow-[#0A65CC]/30 transition-all duration-200 shrink-0 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            Find Job
                        </button>
                    </form>

                    {/* Suggestions line */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#767E94] pt-1">
                        <span className="font-medium text-[#5E6670]">Suggestion:</span>
                        <a href="#" className="hover:text-[#0A65CC] transition-colors">Designer,</a>
                        <a href="#" className="hover:text-[#0A65CC] transition-colors">Programing,</a>
                        <a href="#" className="text-[#0A65CC] font-semibold underline underline-offset-2 hover:text-[#0851A8] transition-colors">Digital Marketing,</a>
                        <a href="#" className="hover:text-[#0A65CC] transition-colors">Video,</a>
                        <a href="#" className="hover:text-[#0A65CC] transition-colors">Animation.</a>
                    </div>
                </div>

                {/* Right Illustration Column */}
                <div className="lg:col-span-5 flex items-center justify-center relative">
                    <div className="w-full max-w-lg relative group">
                        {/* Soft ambient background glow */}
                        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl transform group-hover:scale-105 transition-transform duration-500"></div>

                        {/* Vector Illustration matching exact aesthetic */}
                        <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10 drop-shadow-sm">
                            {/* Floating decorative elements */}
                            {/* Bookshelf background */}
                            <path d="M380 50 H450 M390 50 V30 M410 50 V20 M430 50 V35" stroke="#18191C" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M390 110 H450 M400 110 V90 M420 110 V95" stroke="#18191C" strokeWidth="2" strokeLinecap="round"/>
                            
                            {/* Floating idea icons & spark lines */}
                            <path d="M310 120 L325 80" stroke="#18191C" strokeWidth="2" strokeDasharray="3 3"/>
                            {/* Pencil */}
                            <g transform="translate(305, 55) rotate(-45)">
                                <rect x="0" y="0" width="12" height="40" rx="2" fill="#0A65CC"/>
                                <path d="M0 40 L6 50 L12 40 Z" fill="#18191C"/>
                            </g>

                            {/* Lightbulb / Idea bubble */}
                            <circle cx="320" cy="115" r="10" fill="#0A65CC" opacity="0.15"/>
                            <path d="M320 107 C316 107 313 110 313 114 C313 117 315 119 317 120 L317 123 L323 123 L323 120 C325 119 327 117 327 114 C327 110 324 107 320 107 Z" fill="#0A65CC"/>

                            {/* Thumbs up badge */}
                            <circle cx="340" cy="140" r="12" fill="#E7F0FA"/>
                            <path d="M336 142 h2 v5 h-2 z M340 142 h3 l2-4 c0-1-1-1-1-1 s-1 0-1 1 l-1 2 h-2 v6 h4" stroke="#0A65CC" strokeWidth="1.5" fill="none"/>

                            {/* Heart bubble */}
                            <circle cx="325" cy="170" r="9" fill="#0A65CC"/>
                            <path d="M325 174 C322 171 320 169 320 167 C320 165 322 164 324 165 C325 166 325 166 325 166 C325 166 325 166 326 165 C328 164 330 165 330 167 C330 169 328 171 325 174 Z" fill="#FFFFFF"/>

                            {/* Main Desk */}
                            <path d="M280 230 L450 250 L380 300 L210 270 Z" fill="#FFFFFF" stroke="#18191C" strokeWidth="2.5"/>
                            <path d="M210 270 L210 280 L380 310 L380 300 Z" fill="#F1F2F4" stroke="#18191C" strokeWidth="2"/>
                            <path d="M450 250 L450 260 L380 310 L380 300 Z" fill="#E4E5E8" stroke="#18191C" strokeWidth="2"/>

                            {/* Laptop */}
                            <path d="M250 195 L330 208 L330 260 L250 247 Z" fill="#FFFFFF" stroke="#18191C" strokeWidth="2.5"/>
                            <circle cx="290" cy="228" r="6" fill="#0A65CC"/>
                            <path d="M240 245 L340 262 L320 270 L220 253 Z" fill="#E4E5E8" stroke="#18191C" strokeWidth="2"/>

                            {/* Character (Person with glasses in blue shirt) */}
                            {/* Hair & Head */}
                            <ellipse cx="370" cy="140" rx="22" ry="24" fill="#A0AEC0"/>
                            <circle cx="370" cy="145" r="18" fill="#F7FAFC" stroke="#18191C" strokeWidth="2"/>
                            {/* Glasses */}
                            <circle cx="363" cy="143" r="6" stroke="#18191C" strokeWidth="2" fill="none"/>
                            <circle cx="377" cy="145" r="6" stroke="#18191C" strokeWidth="2" fill="none"/>
                            <path d="M369 143 H371" stroke="#18191C" strokeWidth="2"/>
                            {/* Smile */}
                            <path d="M366 155 Q370 159 374 155" stroke="#18191C" strokeWidth="2" fill="none"/>

                            {/* Body in vibrant blue shirt */}
                            <path d="M340 180 C340 165 355 160 370 160 C385 160 400 165 400 180 L395 240 C380 245 360 245 345 240 Z" fill="#0A65CC" stroke="#18191C" strokeWidth="2.5"/>

                            {/* Arms leaning on desk */}
                            <path d="M345 200 L320 235 L350 240" stroke="#18191C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            <path d="M390 200 L400 230 L380 238" stroke="#18191C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

                            {/* Paper documents on desk */}
                            <path d="M400 255 L430 260 L415 290 L385 285 Z" fill="#FFFFFF" stroke="#18191C" strokeWidth="1.5"/>
                            <line x1="400" y1="265" x2="420" y2="268" stroke="#767E94" strokeWidth="1.5"/>
                            <line x1="398" y1="272" x2="415" y2="275" stroke="#767E94" strokeWidth="1.5"/>

                            <path d="M410 260 L440 265 L425 295 L395 290 Z" fill="#FFFFFF" stroke="#18191C" strokeWidth="1.5"/>
                            <line x1="410" y1="270" x2="430" y2="273" stroke="#767E94" strokeWidth="1.5"/>
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}
