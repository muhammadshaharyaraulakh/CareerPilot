import React from "react";
import {
    ChartBarIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    UsersIcon,
    BanknotesIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminSidebar({
    activeItem,
    setActiveItem,
    isMobileOpen,
    setIsMobileOpen,
    counts = { companies: 12, jobs: 24, blogs: 8 },
}) {
    const navItems = [
        {
            name: "Overview",
            icon: ChartBarIcon,
        },
        {
            name: "Companies & Plans",
            icon: BuildingOfficeIcon,
            badge: counts.companies,
        },
        {
            name: "Jobs Moderation",
            icon: BriefcaseIcon,
            badge: counts.jobs,
        },
        {
            name: "Blogs & Content",
            icon: DocumentTextIcon,
            badge: counts.blogs,
        },
        {
            name: "Email Broadcaster",
            icon: EnvelopeIcon,
        },
        {
            name: "Candidates & Users",
            icon: UsersIcon,
        },
        {
            name: "Subscriptions & Revenue",
            icon: BanknotesIcon,
        },
        {
            name: "Settings",
            icon: Cog6ToothIcon,
        },
    ];

    const handleSelect = (name) => {
        setActiveItem(name);
        if (setIsMobileOpen) {
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Sidebar (lg breakpoint and above) */}
            <aside className="hidden lg:flex flex-col w-64 border-r border-[#E4E5E8] bg-white p-4 min-h-[calc(100vh-65px)] shrink-0">
                <div className="text-[11px] font-bold text-[#9199A3] uppercase tracking-wider px-3 mb-3">
                    Admin Management
                </div>
                <nav className="flex flex-col gap-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.name;
                        return (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => handleSelect(item.name)}
                                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-[#E8F1FF] text-[#0A65CC] shadow-2xs"
                                        : "text-[#5E6670] hover:bg-[#F8F9FA] hover:text-[#18191C]"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        className={`w-5 h-5 ${
                                            isActive
                                                ? "text-[#0A65CC]"
                                                : "text-[#767E94]"
                                        }`}
                                    />
                                    <span>{item.name}</span>
                                </div>
                                {item.badge > 0 && (
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            isActive
                                                ? "bg-[#0A65CC] text-white"
                                                : "bg-[#E8F1FF] text-[#0A65CC]"
                                        }`}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Drawer Navigation (<1024px) */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    {/* Content Drawer */}
                    <div className="relative w-72 max-w-[85vw] bg-white h-full p-5 flex flex-col justify-between z-50 shadow-2xl overflow-y-auto">
                        <div>
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E4E5E8]">
                                <span className="text-sm font-bold text-[#18191C]">
                                    Admin Navigation
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="p-1 rounded-md text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-1.5">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeItem === item.name;
                                    return (
                                        <button
                                            key={item.name}
                                            type="button"
                                            onClick={() => handleSelect(item.name)}
                                            className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold transition-all ${
                                                isActive
                                                    ? "bg-[#E8F1FF] text-[#0A65CC]"
                                                    : "text-[#5E6670] hover:bg-[#F8F9FA]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-5 h-5" />
                                                <span>{item.name}</span>
                                            </div>
                                            {item.badge > 0 && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A65CC] text-white">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
