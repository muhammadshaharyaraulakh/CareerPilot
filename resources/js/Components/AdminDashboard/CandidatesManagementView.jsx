import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";

export default function CandidatesManagementView() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTab, setFilterTab] = useState("All");

    const [candidatesList, setCandidatesList] = useState([
        {
            id: 1,
            name: "Esther Howard",
            email: "esther.howard@gmail.com",
            title: "Senior UI UX Designer",
            completion: 98,
            applications: 14,
            status: "Verified",
            isBlocked: false,
        },
        {
            id: 2,
            name: "Wade Warren",
            email: "wade.warren@gmail.com",
            title: "Fullstack React & Node Developer",
            completion: 92,
            applications: 28,
            status: "Verified",
            isBlocked: false,
        },
        {
            id: 3,
            name: "Jenny Wilson",
            email: "jenny.wilson@gmail.com",
            title: "Digital Marketing Strategist",
            completion: 85,
            applications: 6,
            status: "Unverified",
            isBlocked: false,
        },
        {
            id: 4,
            name: "Guy Hawkins",
            email: "guy.hawkins@gmail.com",
            title: "Financial Controller",
            completion: 60,
            applications: 2,
            status: "Unverified",
            isBlocked: true,
        },
    ]);

    const handleToggleBlock = (id) => {
        setCandidatesList(
            candidatesList.map((cand) =>
                cand.id === id ? { ...cand, isBlocked: !cand.isBlocked } : cand
            )
        );
    };

    const handleToggleVerify = (id) => {
        setCandidatesList(
            candidatesList.map((cand) =>
                cand.id === id
                    ? {
                          ...cand,
                          status:
                              cand.status === "Verified"
                                  ? "Unverified"
                                  : "Verified",
                      }
                    : cand
            )
        );
    };

    const filteredCandidates = candidatesList.filter((cand) => {
        const matchesFilter =
            filterTab === "All" ||
            (filterTab === "Verified" && cand.status === "Verified") ||
            (filterTab === "Unverified" && cand.status === "Unverified") ||
            (filterTab === "Blocked" && cand.isBlocked);

        const matchesSearch =
            cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cand.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cand.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E4E5E8]">
                <div>
                    <h2 className="text-lg font-bold text-[#18191C]">
                        Candidate Profile Verification & Moderation
                    </h2>
                    <p className="text-xs text-[#767E94] mt-0.5">
                        Manage registered job candidates, verify resume authenticity, or restrict accounts.
                    </p>
                </div>
                <div className="text-xs font-semibold text-[#0A65CC] bg-[#E8F1FF] px-3.5 py-2 rounded-lg border border-[#CEE0F5]">
                    Total Registered: 45,800 Candidates
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    {["All", "Verified", "Unverified", "Blocked"].map((tab) => (
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
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <MagnifyingGlassIcon className="w-4 h-4 text-[#767E94] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search candidate name or email..."
                        className="w-full h-10 pl-9 pr-3 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                    />
                </div>
            </div>

            {/* Candidates Table */}
            <div className="overflow-x-auto border border-[#E4E5E8] rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8F9FA] border-b border-[#E4E5E8] text-[11px] font-bold text-[#767E94] uppercase tracking-wider">
                            <th className="py-3.5 px-4">Candidate</th>
                            <th className="py-3.5 px-4">Profile Strength</th>
                            <th className="py-3.5 px-4">Job Applications</th>
                            <th className="py-3.5 px-4">Verification</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E5E8] text-xs text-[#18191C]">
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map((cand) => (
                                <tr key={cand.id} className="hover:bg-[#F8F9FA]/60 transition-colors">
                                    {/* Candidate Avatar + Name + Title */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[#0A65CC]/10 text-[#0A65CC] font-bold text-xs flex items-center justify-center shrink-0">
                                                {cand.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#18191C]">
                                                    {cand.name}
                                                </h4>
                                                <p className="text-[11px] text-[#767E94]">
                                                    {cand.title} • {cand.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Profile Completion Bar */}
                                    <td className="py-4 px-4">
                                        <div className="w-32">
                                            <div className="flex justify-between text-[11px] font-semibold text-[#5E6670] mb-1">
                                                <span>Completion</span>
                                                <span>{cand.completion}%</span>
                                            </div>
                                            <div className="w-full bg-[#E4E5E8] h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-[#0A65CC] h-full rounded-full"
                                                    style={{ width: `${cand.completion}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Job Applications Count */}
                                    <td className="py-4 px-4 font-semibold text-[#18191C]">
                                        {cand.applications} Submitted
                                    </td>

                                    {/* Verification Status */}
                                    <td className="py-4 px-4">
                                        {cand.status === "Verified" ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7F6EA] text-[#0BA02C] text-[11px] font-semibold rounded-full">
                                                <CheckCircleIcon className="w-3.5 h-3.5" /> Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-[#767E94] text-[11px] font-semibold rounded-full">
                                                Unverified
                                            </span>
                                        )}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleVerify(cand.id)}
                                                className="px-2.5 py-1.5 bg-[#F0F5FC] text-[#0A65CC] border border-[#CEE0F5] hover:bg-[#E8F1FF] text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                                            >
                                                {cand.status === "Verified"
                                                    ? "Revoke Verification"
                                                    : "Mark Verified"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleBlock(cand.id)}
                                                className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md border transition-colors cursor-pointer ${
                                                    cand.isBlocked
                                                        ? "bg-[#E7F6EA] text-[#0BA02C] border-[#B3E6BE]"
                                                        : "bg-white border-[#E4E5E8] text-[#E05151] hover:bg-[#FDF0F0]"
                                                }`}
                                            >
                                                {cand.isBlocked ? "Unblock" : "Block User"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-[#767E94]">
                                    No candidates match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
