import React from "react";
import { Link } from "@inertiajs/react";
import {
    Layers,
    Briefcase,
    Bookmark,
    Bell,
    Settings,
    LogOut,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateSidebar({
    activeItem = "Overview",
    setActiveItem,
    isMobileOpen = false,
    setIsMobileOpen = () => {},
    jobAlertsCount = "09",
}) {
    const navItems = [
        { name: "Overview", icon: Layers },
        { name: "Applied Jobs", icon: Briefcase },
        { name: "Favorite Jobs", icon: Bookmark },
        { name: "Job Alert", icon: Bell, badge: jobAlertsCount },
        { name: "Settings", icon: Settings },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full py-6 px-3 sm:px-4 justify-between bg-white text-[#5E6670] font-sans">
            <div>
                {/* Nav Links */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem.toLowerCase() === item.name.toLowerCase();
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    if (setActiveItem) setActiveItem(item.name);
                                    setIsMobileOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-3 text-xs sm:text-sm font-medium transition-all cursor-pointer relative ${
                                    isActive
                                        ? "bg-[#E8F1FF] text-[#0A65CC] font-semibold border-l-4 border-[#0A65CC] rounded-none"
                                        : "hover:bg-[#F1F2F4] hover:text-[#18191C] rounded-none"
                                }`}
                            >
                                <div className="flex items-center gap-3 truncate">
                                    <Icon
                                        className={`w-5 h-5 shrink-0 ${
                                            isActive ? "text-[#0A65CC]" : "text-[#767E94]"
                                        }`}
                                    />
                                    <span className="truncate">{item.name}</span>
                                </div>

                                {item.badge && (
                                    <span
                                        className={`px-2 py-0.5 text-[11px] font-bold rounded-none ${
                                            isActive
                                                ? "bg-[#0A65CC] text-white"
                                                : "bg-[#E4E5E8] text-[#18191C]"
                                        }`}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Button at bottom */}
            <div className="pt-6 border-t border-[#E4E5E8] mt-6">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-none text-xs sm:text-sm font-medium text-[#767E94] hover:bg-[#FFF0F0] hover:text-[#E05151] transition-all cursor-pointer"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span>Log out</span>
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar (lg screens and up: >=1024px) */}
            <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-[#E4E5E8] min-h-[calc(100vh-100px)]">
                <SidebarContent />
            </aside>

            {/* Mobile Drawer Panel (<1024px down to 320px) */}
            <AnimatePresence>
                {isMobileOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Drawer panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 26, stiffness: 260 }}
                            className="fixed top-0 left-0 w-[280px] xs:w-[320px] max-w-[85vw] h-full bg-white shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-4 border-b border-[#E4E5E8] flex items-center justify-between">
                                <span className="text-sm font-bold text-[#18191C]">
                                    Candidate Menu
                                </span>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="p-1.5 text-gray-500 hover:text-gray-900 rounded-none hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <SidebarContent />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
