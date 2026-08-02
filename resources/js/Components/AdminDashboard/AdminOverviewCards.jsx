import React from "react";
import {
    BuildingOfficeIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    BanknotesIcon,
    UsersIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function AdminOverviewCards({ onNavigateTab }) {
    const stats = [
        {
            title: "Total Companies",
            value: "1,420",
            subtitle: "12 pending approval",
            icon: BuildingOfficeIcon,
            color: "bg-[#0A65CC]/10 text-[#0A65CC]",
            border: "border-[#0A65CC]/20",
            tab: "Companies & Plans",
        },
        {
            title: "Active Job Posts",
            value: "8,650",
            subtitle: "24 pending moderation",
            icon: BriefcaseIcon,
            color: "bg-[#0BA02C]/10 text-[#0BA02C]",
            border: "border-[#0BA02C]/20",
            tab: "Jobs Moderation",
        },
        {
            title: "Blog Articles",
            value: "340",
            subtitle: "8 pending approval",
            icon: DocumentTextIcon,
            color: "bg-[#E05151]/10 text-[#E05151]",
            border: "border-[#E05151]/20",
            tab: "Blogs & Content",
        },
        {
            title: "Total Candidates",
            value: "45,800",
            subtitle: "94% profile completed",
            icon: UsersIcon,
            color: "bg-[#F7A531]/10 text-[#F7A531]",
            border: "border-[#F7A531]/20",
            tab: "Candidates & Users",
        },
        {
            title: "Monthly Platform Revenue",
            value: "$48,250",
            subtitle: "+14.2% growth this month",
            icon: BanknotesIcon,
            color: "bg-[#0A65CC]/10 text-[#0A65CC]",
            border: "border-[#0A65CC]/20",
            tab: "Subscriptions & Revenue",
        },
    ];

    return (
        <div className="flex flex-col gap-6 mb-8">
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={idx}
                            onClick={() => onNavigateTab && onNavigateTab(stat.tab)}
                            className="bg-white border border-[#E4E5E8] rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-[#0A65CC]/40 transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-[#767E94]">
                                    {stat.title}
                                </span>
                                <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center border ${stat.color} ${stat.border}`}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#18191C] mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-[11px] text-[#767E94] font-medium">
                                    {stat.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Action Activity Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Pending Approval Task Box */}
                <div className="lg:col-span-7 bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                        <div>
                            <h3 className="text-base font-bold text-[#18191C]">
                                Immediate Moderation Queue
                            </h3>
                            <p className="text-xs text-[#767E94] mt-0.5">
                                Items requiring admin verification and action
                            </p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-[#FFF5E6] text-[#F7A531] rounded-md border border-[#FFE3B3]">
                            44 Items Pending
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Task Item 1 */}
                        <div className="flex items-center justify-between p-3.5 bg-[#F8F9FA] border border-gray-100 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0A65CC]/10 text-[#0A65CC] flex items-center justify-center shrink-0">
                                    <BuildingOfficeIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#18191C]">
                                        TechCorp Global
                                    </h4>
                                    <p className="text-[11px] text-[#767E94]">
                                        Requested Enterprise Plan Approval
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onNavigateTab("Companies & Plans")}
                                className="px-3 py-1.5 bg-[#0A65CC] text-white text-xs font-semibold rounded-md hover:bg-[#0851A8] transition-colors cursor-pointer"
                            >
                                Review
                            </button>
                        </div>

                        {/* Task Item 2 */}
                        <div className="flex items-center justify-between p-3.5 bg-[#F8F9FA] border border-gray-100 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#E05151]/10 text-[#E05151] flex items-center justify-center shrink-0">
                                    <DocumentTextIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#18191C]">
                                        Blog Post: 20 Cool Fonts for Web Design
                                    </h4>
                                    <p className="text-[11px] text-[#767E94]">
                                        Submitted by Kevin Gilbert
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onNavigateTab("Blogs & Content")}
                                className="px-3 py-1.5 bg-[#0A65CC] text-white text-xs font-semibold rounded-md hover:bg-[#0851A8] transition-colors cursor-pointer"
                            >
                                Review
                            </button>
                        </div>

                        {/* Task Item 3 */}
                        <div className="flex items-center justify-between p-3.5 bg-[#F8F9FA] border border-gray-100 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0BA02C]/10 text-[#0BA02C] flex items-center justify-center shrink-0">
                                    <BriefcaseIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#18191C]">
                                        Senior UI UX Lead Developer
                                    </h4>
                                    <p className="text-[11px] text-[#767E94]">
                                        Posted by Design Studio Inc
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => onNavigateTab("Jobs Moderation")}
                                className="px-3 py-1.5 bg-[#0A65CC] text-white text-xs font-semibold rounded-md hover:bg-[#0851A8] transition-colors cursor-pointer"
                            >
                                Review
                            </button>
                        </div>
                    </div>
                </div>

                {/* System Status & Revenue Summary Box */}
                <div className="lg:col-span-5 bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
                    <div>
                        <h3 className="text-base font-bold text-[#18191C] mb-1">
                            Platform Status & Gateways
                        </h3>
                        <p className="text-xs text-[#767E94] mb-4">
                            Realtime infrastructure status
                        </p>

                        <div className="flex flex-col gap-3 text-xs">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8F9FA]">
                                <span className="font-semibold text-[#5E6670]">
                                    Email Broadcaster Engine
                                </span>
                                <span className="inline-flex items-center gap-1 text-[#0BA02C] font-semibold">
                                    <CheckCircleIcon className="w-4 h-4" /> Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8F9FA]">
                                <span className="font-semibold text-[#5E6670]">
                                    Payment Gateway (Stripe/Paypal)
                                </span>
                                <span className="inline-flex items-center gap-1 text-[#0BA02C] font-semibold">
                                    <CheckCircleIcon className="w-4 h-4" /> Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8F9FA]">
                                <span className="font-semibold text-[#5E6670]">
                                    Database & Storage Sync
                                </span>
                                <span className="inline-flex items-center gap-1 text-[#0BA02C] font-semibold">
                                    <CheckCircleIcon className="w-4 h-4" /> Healthy
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-[#767E94]">
                            Last System Audit: Today 12:45 PM
                        </span>
                        <button
                            type="button"
                            onClick={() => onNavigateTab("Settings")}
                            className="text-xs font-semibold text-[#0A65CC] hover:underline"
                        >
                            View Configuration &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
