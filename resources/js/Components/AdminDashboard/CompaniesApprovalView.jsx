import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    StarIcon,
    BuildingOfficeIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

export default function CompaniesApprovalView() {
    const [filterTab, setFilterTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const [companiesList, setCompaniesList] = useState([
        {
            id: 1,
            name: "TechCorp Global Solutions",
            email: "contact@techcorp.com",
            plan: "Enterprise ($599/mo)",
            status: "Pending Approval",
            isFeatured: false,
            joinedDate: "Aug 01, 2026",
            logo: null,
        },
        {
            id: 2,
            name: "Figma Design Studio",
            email: "hr@figma.com",
            plan: "Premium ($299/mo)",
            status: "Approved",
            isFeatured: true,
            joinedDate: "Jul 28, 2026",
            logo: null,
        },
        {
            id: 3,
            name: "Instagram Media Inc",
            email: "careers@instagram.com",
            plan: "Enterprise ($599/mo)",
            status: "Approved",
            isFeatured: true,
            joinedDate: "Jul 20, 2026",
            logo: null,
        },
        {
            id: 4,
            name: "Spotify Music Stream",
            email: "jobs@spotify.com",
            plan: "Standard ($99/mo)",
            status: "Pending Approval",
            isFeatured: false,
            joinedDate: "Jul 15, 2026",
            logo: null,
        },
        {
            id: 5,
            name: "CyberSecurity Labs",
            email: "verify@cyberlab.io",
            plan: "Standard ($99/mo)",
            status: "Suspended",
            isFeatured: false,
            joinedDate: "Jun 10, 2026",
            logo: null,
        },
    ]);

    const handleApprove = (id) => {
        setCompaniesList(
            companiesList.map((comp) =>
                comp.id === id ? { ...comp, status: "Approved" } : comp
            )
        );
    };

    const handleSuspend = (id) => {
        setCompaniesList(
            companiesList.map((comp) =>
                comp.id === id ? { ...comp, status: "Suspended" } : comp
            )
        );
    };

    const handleToggleFeatured = (id) => {
        setCompaniesList(
            companiesList.map((comp) =>
                comp.id === id ? { ...comp, isFeatured: !comp.isFeatured } : comp
            )
        );
    };

    const filteredCompanies = companiesList.filter((comp) => {
        const matchesFilter =
            filterTab === "All" ||
            (filterTab === "Pending" && comp.status === "Pending Approval") ||
            (filterTab === "Approved" && comp.status === "Approved") ||
            (filterTab === "Featured" && comp.isFeatured) ||
            (filterTab === "Suspended" && comp.status === "Suspended");

        const matchesSearch =
            comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.email.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E4E5E8]">
                <div>
                    <h2 className="text-lg font-bold text-[#18191C]">
                        Companies & Subscription Plan Moderation
                    </h2>
                    <p className="text-xs text-[#767E94] mt-0.5">
                        Verify registered employer accounts, assign subscription plans, and toggle featured badge.
                    </p>
                </div>
                <div className="text-xs font-semibold text-[#0A65CC] bg-[#E8F1FF] px-3.5 py-2 rounded-lg border border-[#CEE0F5]">
                    Total Registered: {companiesList.length} Companies
                </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {["All", "Pending", "Approved", "Featured", "Suspended"].map(
                        (tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setFilterTab(tab)}
                                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                    filterTab === tab
                                        ? "bg-[#0A65CC] text-white shadow-2xs"
                                        : "bg-[#F8F9FA] text-[#5E6670] hover:bg-gray-100"
                                }`}
                            >
                                {tab}
                                {tab === "Pending" && (
                                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-[#E05151] text-white rounded-full font-bold">
                                        {
                                            companiesList.filter(
                                                (c) => c.status === "Pending Approval"
                                            ).length
                                        }
                                    </span>
                                )}
                            </button>
                        )
                    )}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <MagnifyingGlassIcon className="w-4 h-4 text-[#767E94] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search company name or email..."
                        className="w-full h-10 pl-9 pr-3 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                    />
                </div>
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto border border-[#E4E5E8] rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8F9FA] border-b border-[#E4E5E8] text-[11px] font-bold text-[#767E94] uppercase tracking-wider">
                            <th className="py-3.5 px-4">Company</th>
                            <th className="py-3.5 px-4">Subscription Plan</th>
                            <th className="py-3.5 px-4">Joined Date</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Featured</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E5E8] text-xs text-[#18191C]">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((comp) => (
                                <tr key={comp.id} className="hover:bg-[#F8F9FA]/60 transition-colors">
                                    {/* Company Logo + Name + Email */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            {/* Logo Slot Fitting 100% Backend Image */}
                                            <div className="w-10 h-10 rounded-lg bg-[#F1F2F4] border border-[#E4E5E8] overflow-hidden flex items-center justify-center shrink-0">
                                                {comp.logo ? (
                                                    <img
                                                        src={comp.logo}
                                                        alt={comp.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="font-bold text-[#0A65CC] text-xs uppercase">
                                                        {comp.name.substring(0, 2)}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#18191C]">
                                                    {comp.name}
                                                </h4>
                                                <span className="text-[11px] text-[#767E94]">
                                                    {comp.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Subscription Plan */}
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F0F5FC] text-[#0A65CC] border border-[#CEE0F5]">
                                            {comp.plan}
                                        </span>
                                    </td>

                                    {/* Joined Date */}
                                    <td className="py-4 px-4 text-[#5E6670]">
                                        {comp.joinedDate}
                                    </td>

                                    {/* Verification Status */}
                                    <td className="py-4 px-4">
                                        {comp.status === "Approved" && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7F6EA] text-[#0BA02C] text-[11px] font-semibold rounded-full">
                                                <CheckCircleIcon className="w-3.5 h-3.5" /> Approved
                                            </span>
                                        )}
                                        {comp.status === "Pending Approval" && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF5E6] text-[#F7A531] text-[11px] font-semibold rounded-full">
                                                Pending Approval
                                            </span>
                                        )}
                                        {comp.status === "Suspended" && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FDF0F0] text-[#E05151] text-[11px] font-semibold rounded-full">
                                                <XCircleIcon className="w-3.5 h-3.5" /> Suspended
                                            </span>
                                        )}
                                    </td>

                                    {/* Featured Badge Toggle */}
                                    <td className="py-4 px-4">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleFeatured(comp.id)}
                                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 transition-all cursor-pointer ${
                                                comp.isFeatured
                                                    ? "bg-[#FFF5E6] text-[#F7A531] border border-[#FFE3B3]"
                                                    : "bg-gray-100 text-[#767E94] hover:bg-gray-200"
                                            }`}
                                        >
                                            <StarIcon
                                                className={`w-3.5 h-3.5 ${
                                                    comp.isFeatured ? "fill-current" : ""
                                                }`}
                                            />
                                            {comp.isFeatured ? "Featured" : "Standard"}
                                        </button>
                                    </td>

                                    {/* One-Click Action Buttons */}
                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            {comp.status !== "Approved" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleApprove(comp.id)}
                                                    className="px-3 py-1.5 bg-[#0BA02C] text-white text-[11px] font-semibold rounded-md hover:bg-[#098223] transition-colors cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {comp.status !== "Suspended" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSuspend(comp.id)}
                                                    className="px-3 py-1.5 bg-white border border-[#E4E5E8] text-[#E05151] hover:bg-[#FDF0F0] text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                                                >
                                                    Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-[#767E94]">
                                    No companies match your current search or filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
