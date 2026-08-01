import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function CandidateNavbar({
    userName = "Esther Howard",
    userAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    onMobileSidebarToggle,
}) {
    const [selectedCountry, setSelectedCountry] = useState("India");

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
                <div className="hidden md:flex items-center flex-1 max-w-2xl gap-0 border border-[#E4E5E8] rounded-none bg-white overflow-hidden shadow-2xs focus-within:border-[#0A65CC] transition-colors">
                    {/* Country selector */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F9FA] border-r border-[#E4E5E8] shrink-0 cursor-pointer hover:bg-[#F1F2F4] transition-colors">
                        <svg className="w-5 h-3.5 object-cover rounded-xs" viewBox="0 0 640 480">
                            <path fill="#ff9933" d="0 0h640v160H0z" />
                            <path fill="#fff" d="0 160h640v160H0z" />
                            <path fill="#138808" d="0 320h640v160H0z" />
                            <circle cx="320" cy="240" r="60" fill="none" stroke="#000080" strokeWidth="12" />
                        </svg>
                        <span className="text-xs sm:text-sm font-semibold text-[#18191C]">
                            {selectedCountry}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#767E94]" />
                    </div>

                    {/* Search Input */}
                    <div className="flex items-center flex-1 px-3">
                        <Search className="w-4 h-4 text-[#0A65CC] shrink-0 mr-2" />
                        <input
                            type="text"
                            placeholder="Job title, keyword, company"
                            className="w-full py-2 text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Right: Notification Bell & Candidate Profile Avatar */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {/* Notifications Bell */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative p-2 text-[#18191C] hover:text-[#0A65CC] hover:bg-[#F1F2F4] rounded-full transition-colors cursor-pointer"
                    >
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E05151] rounded-full ring-2 ring-white" />
                    </button>

                    {/* User Avatar */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#E4E5E8] shrink-0">
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    e.target.src =
                                        "https://ui-avatars.com/api/?name=Esther+Howard&background=0A65CC&color=fff";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
