import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Search, Menu, ChevronDown } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import UserProfileDropdown from "@/Components/UserProfileDropdown";

export default function CandidateNavbar({
    userName = "Esther Howard",
    userAvatar: initialUserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    onMobileSidebarToggle,
}) {
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");

    return (
        <header className="w-full bg-white border-b border-[#E4E5E8] py-3.5 px-4 sm:px-6 lg:px-8 relative z-40 font-sans">
            <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
                {/* Left: Mobile Menu Toggle & Logo */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMobileSidebarToggle}
                        className="lg:hidden p-2 text-[#5E6670] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none transition-colors cursor-pointer"
                        aria-label="Open Sidebar"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <Link href="/" className="flex items-center shrink-0">
                        <ApplicationLogo className="h-8 sm:h-9 w-auto text-[#0A65CC]" />
                    </Link>
                </div>

                {/* Center: Country Selector & Search Bar */}
                <div className="hidden md:flex items-center flex-1 max-w-2xl h-[54px] border border-[#E4E5E8] rounded-none bg-white overflow-hidden shadow-2xs focus-within:border-[#0A65CC] focus-within:ring-1 focus-within:ring-[#0A65CC] transition-all">
                    {/* Country selector */}
                    <div className="flex items-center gap-2 px-3.5 h-full bg-[#F8F9FA] border-r border-[#E4E5E8] shrink-0 cursor-pointer hover:bg-[#F1F2F4] transition-colors">
                        <svg
                            className="w-5 h-3.5 object-cover rounded-xs"
                            viewBox="0 0 900 600"
                        >
                            <rect width="900" height="600" fill="#01411C" />
                            <rect width="225" height="600" fill="#FFFFFF" />
                            <circle cx="562.5" cy="300" r="180" fill="#FFFFFF" />
                            <circle cx="612.5" cy="250" r="162" fill="#01411C" />
                            <polygon
                                points="562.5,165 577.8,212.1 627.3,212.1 587.3,241.2 602.6,288.3 562.5,259.2 522.4,288.3 537.7,241.2 497.7,212.1 547.2,212.1"
                                fill="#FFFFFF"
                            />
                        </svg>
                        <span className="text-xs sm:text-sm font-semibold text-[#18191C]">
                            {selectedCountry}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#767E94]" />
                    </div>

                    {/* Search Input */}
                    <div className="flex items-center flex-1 px-3.5 h-full">
                        <Search className="w-4 h-4 text-[#0A65CC] shrink-0 mr-2.5" />
                        <input
                            type="text"
                            placeholder="Job title, keyword, company"
                            className="w-full h-full text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none p-0 bg-transparent"
                        />
                    </div>
                </div>

                {/* Right: Candidate Profile Avatar Dropdown */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <UserProfileDropdown
                        defaultName={userName}
                        defaultAvatar={initialUserAvatar}
                    />
                </div>
            </div>
        </header>
    );
}
