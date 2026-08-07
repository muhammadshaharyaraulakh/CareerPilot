import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfileDropdown({ auth, defaultName, defaultAvatar }) {
    const pageProps = usePage().props;
    const currentUser = auth?.user || pageProps?.auth?.user;

    const userName = currentUser?.name || defaultName || "Candidate User";
    const userRole = currentUser?.role || "Candidate";
    const userEmail = currentUser?.email || "";

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [avatarUrl, setAvatarUrl] = useState(() => {
        if (currentUser?.profile_picture) return currentUser.profile_picture;
        if (defaultAvatar) return defaultAvatar;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0A65CC&color=fff`;
    });

    const getDashboardRoute = (role) => {
        const lowerRole = (role || "").toLowerCase();
        if (lowerRole === "admin") return "AdminDashboard";
        if (lowerRole === "company" || lowerRole === "employee") return "CompanyDashboard";
        return "CandidateDashboard";
    };

    const fetchAvatar = async () => {
        try {
            const res = await fetch("/candidate/personal-profile/avatar");
            const json = await res.json();
            if (json.success && json.data && json.data.profile_picture) {
                setAvatarUrl(json.data.profile_picture);
            }
        } catch (err) {
            console.error("Failed to fetch user avatar:", err);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchAvatar();

        const handleAvatarUpdate = (e) => {
            if (e.detail && e.detail.profile_picture !== undefined) {
                if (e.detail.profile_picture) {
                    setAvatarUrl(e.detail.profile_picture);
                } else {
                    setAvatarUrl(
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0A65CC&color=fff`
                    );
                }
            } else {
                fetchAvatar();
            }
        };

        window.addEventListener("profile-picture-updated", handleAvatarUpdate);
        return () => {
            window.removeEventListener("profile-picture-updated", handleAvatarUpdate);
        };
    }, [userName]);

    return (
        <div className="relative font-sans z-50" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full sm:rounded-lg hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer group"
                aria-label="User profile menu"
            >
                {/* Avatar Circle */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#E4E5E8] shrink-0 bg-[#0A65CC]/10 flex items-center justify-center">
                    <img
                        src={avatarUrl}
                        alt={userName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0A65CC&color=fff`;
                        }}
                    />
                </div>

                {/* Name & Subtitle */}
                <div className="hidden sm:flex flex-col text-left">
                    <span className="text-sm font-semibold text-[#18191C] leading-tight truncate max-w-[130px]">
                        {userName}
                    </span>
                    <span className="text-xs text-[#767E94] capitalize">
                        {userRole}
                    </span>
                </div>

                {/* Chevron Arrow */}
                <ChevronDown
                    className={`w-4 h-4 text-[#767E94] transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-[#0A65CC]" : "group-hover:text-[#18191C]"
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E4E5E8] py-1.5 z-50 overflow-hidden font-sans"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-[#E4E5E8] bg-[#F8F9FA]">
                            <p className="text-sm font-bold text-[#18191C] truncate">
                                {userName}
                            </p>
                            {userEmail && (
                                <p className="text-xs text-[#767E94] truncate mt-0.5">
                                    {userEmail}
                                </p>
                            )}
                        </div>

                        {/* Navigation Items */}
                        <div className="py-1">
                            <Link
                                href={route(getDashboardRoute(userRole))}
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#18191C] hover:bg-[#E8F1FF] hover:text-[#0A65CC] transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4 text-[#0A65CC]" />
                                Dashboard
                            </Link>
                        </div>

                        {/* Log Out */}
                        <div className="border-t border-[#E4E5E8] pt-1">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                onClick={() => setIsDropdownOpen(false)}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#E05151] hover:bg-[#FFF0F0] transition-colors text-left cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 text-[#E05151]" />
                                Log Out
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
