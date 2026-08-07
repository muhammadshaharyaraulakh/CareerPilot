import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Search, Menu, ChevronDown } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function CandidateNavbar({
    userName = "Esther Howard",
    userAvatar: initialUserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    onMobileSidebarToggle,
}) {
    const [selectedCountry, setSelectedCountry] = useState("Pakistan");
    const [avatarUrl, setAvatarUrl] = useState(initialUserAvatar);

    const fetchAvatar = async () => {
        try {
            const res = await fetch("/candidate/personal-profile/avatar");
            const json = await res.json();
            if (json.success && json.data && json.data.profile_picture) {
                setAvatarUrl(json.data.profile_picture);
            }
        } catch (err) {
            console.error("Failed to fetch candidate avatar:", err);
        }
    };

    useEffect(() => {
        fetchAvatar();

        const handleAvatarUpdate = (e) => {
            if (e.detail && e.detail.profile_picture !== undefined) {
                if (e.detail.profile_picture) {
                    setAvatarUrl(e.detail.profile_picture);
                } else {
                    setAvatarUrl(initialUserAvatar);
                }
            } else {
                fetchAvatar();
            }
        };

        window.addEventListener("profile-picture-updated", handleAvatarUpdate);
        return () => {
            window.removeEventListener("profile-picture-updated", handleAvatarUpdate);
        };
    }, []);

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
                    <div className="flex items-center flex-1 px-3">
                        <Search className="w-4 h-4 text-[#0A65CC] shrink-0 mr-2" />
                        <input
                            type="text"
                            placeholder="Job title, keyword, company"
                            className="w-full py-2 text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Right: Candidate Profile Avatar */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {/* User Avatar */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#E4E5E8] shrink-0">
                            <img
                                src={avatarUrl}
                                alt={userName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    e.target.src =
                                        "https://ui-avatars.com/api/?name=" +
                                        encodeURIComponent(userName) +
                                        "&background=0A65CC&color=fff";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
