import React, { useState } from "react";
import {
    Download,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    SlidersHorizontal,
    Edit2,
    Trash2,
} from "lucide-react";
import CandidateDetailsModal from "./CandidateDetailsModal";

export default function JobApplicationsView({ jobTitle = "Senior UI/UX Designer", onBackToJobs }) {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [sortOption, setSortOption] = useState("Newest");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // 10 Mock Candidates with placeholder div avatars (no real images as requested)
    const mockCandidates = [
        {
            id: 1,
            name: "Ronald Richards",
            role: "UI/UX Designer",
            experience: "7 Years Experience",
            education: "Education: Master Degree",
            applied: "Applied: Jan 23, 2026",
            status: "All",
            avatarBg: "bg-[#E8F1FF]",
            avatarTextColor: "text-[#0A65CC]",
        },
        {
            id: 2,
            name: "Theresa Webb",
            role: "Product Designer",
            experience: "5 Years Experience",
            education: "Education: High School Degree",
            applied: "Applied: Jan 23, 2026",
            status: "All",
            avatarBg: "bg-[#FFF0F0]",
            avatarTextColor: "text-[#E05151]",
        },
        {
            id: 3,
            name: "Darrell Steward",
            role: "UI/UX Designer",
            experience: "7 Years Experience",
            education: "Education: Intermediate Degree",
            applied: "Applied: Jan 23, 2026",
            status: "Shortlisted",
            avatarBg: "bg-[#E6F4EA]",
            avatarTextColor: "text-[#0BA02C]",
        },
        {
            id: 4,
            name: "Jenny Wilson",
            role: "UI Designer",
            experience: "4 Years Experience",
            education: "Education: Bachelor Degree",
            applied: "Applied: Jan 23, 2026",
            status: "Shortlisted",
            avatarBg: "bg-[#FFF3E0]",
            avatarTextColor: "text-[#D97706]",
        },
        {
            id: 5,
            name: "Guy Hawkins",
            role: "Technical Support Specialist",
            experience: "3 Years Experience",
            education: "Education: Bachelor Degree",
            applied: "Applied: Jan 22, 2026",
            status: "All",
            avatarBg: "bg-[#F3E8FF]",
            avatarTextColor: "text-[#9333EA]",
        },
        {
            id: 6,
            name: "Jacob Jones",
            role: "Product Designer",
            experience: "6 Years Experience",
            education: "Education: Master Degree",
            applied: "Applied: Jan 21, 2026",
            status: "All",
            avatarBg: "bg-[#E0F2FE]",
            avatarTextColor: "text-[#0284C7]",
        },
        {
            id: 7,
            name: "Cameron Williamson",
            role: "Marketing Officer",
            experience: "4 Years Experience",
            education: "Education: Bachelor Degree",
            applied: "Applied: Jan 20, 2026",
            status: "All",
            avatarBg: "bg-[#ECFDF5]",
            avatarTextColor: "text-[#059669]",
        },
        {
            id: 8,
            name: "Robert Fox",
            role: "Marketing Manager",
            experience: "8 Years Experience",
            education: "Education: Master Degree",
            applied: "Applied: Jan 19, 2026",
            status: "All",
            avatarBg: "bg-[#FEF3C7]",
            avatarTextColor: "text-[#D97706]",
        },
        {
            id: 9,
            name: "Kathryn Murphy",
            role: "Junior Graphic Designer",
            experience: "2 Years Experience",
            education: "Education: Bachelor Degree",
            applied: "Applied: Jan 18, 2026",
            status: "All",
            avatarBg: "bg-[#F1F5F9]",
            avatarTextColor: "text-[#475569]",
        },
        {
            id: 10,
            name: "Darlene Robertson",
            role: "Visual Designer",
            experience: "5 Years Experience",
            education: "Education: Bachelor Degree",
            applied: "Applied: Jan 17, 2026",
            status: "All",
            avatarBg: "bg-[#FCE7F3]",
            avatarTextColor: "text-[#DB2777]",
        },
    ];

    const candidatesPerPage = 6;
    const totalPages = Math.ceil(mockCandidates.length / candidatesPerPage);
    const displayedCandidates = mockCandidates.slice(
        (currentPage - 1) * candidatesPerPage,
        currentPage * candidatesPerPage
    );

    const handleViewProfile = (candidate) => {
        setSelectedCandidate(candidate);
        setIsDetailsOpen(true);
    };

    const allApps = displayedCandidates.filter((c) => c.status === "All");
    const shortlistedApps = displayedCandidates.filter((c) => c.status === "Shortlisted");

    return (
        <div className="w-full bg-white font-sans text-[#18191C] space-y-6">
            {/* Top Navigation & Breadcrumb */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E5E8]">
                <div>
                    <div className="flex items-center gap-2 text-xs text-[#767E94] mb-1">
                        <button
                            onClick={onBackToJobs}
                            className="hover:text-[#0A65CC] flex items-center gap-1 cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>My Jobs</span>
                        </button>
                        <span>/</span>
                        <span className="font-medium text-[#18191C]">{jobTitle}</span>
                        <span>/</span>
                        <span className="text-[#0A65CC] font-semibold">Applications</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                        Job Applications
                    </h2>
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-3 relative">
                    <button className="h-10 px-4 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs rounded-none border-none flex items-center gap-2 transition-colors cursor-pointer">
                        <SlidersHorizontal className="w-4 h-4 text-[#5E6670]" />
                        <span>Filter</span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="h-10 px-4 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs rounded-none border-none flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                        >
                            <span>Sort: {sortOption}</span>
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 top-12 z-30 w-44 bg-white border border-[#E4E5E8] rounded-none shadow-xl py-2">
                                <div className="px-4 py-1.5 text-[10px] font-bold text-[#767E94] uppercase tracking-wider">
                                    SORT APPLICATION
                                </div>
                                <button
                                    onClick={() => {
                                        setSortOption("Newest");
                                        setIsSortOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#18191C] hover:bg-[#E8F1FF] hover:text-[#0A65CC] transition-colors"
                                >
                                    Newest
                                </button>
                                <button
                                    onClick={() => {
                                        setSortOption("Oldest");
                                        setIsSortOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#18191C] hover:bg-[#E8F1FF] hover:text-[#0A65CC] transition-colors"
                                >
                                    Oldest
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Candidates Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {/* Column 1: All Applications */}
                <div className="bg-[#F8F9FA] p-4 border border-[#E4E5E8] rounded-none space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E4E5E8]">
                        <h3 className="text-xs font-bold text-[#18191C] uppercase tracking-wider">
                            All Application ({mockCandidates.length})
                        </h3>
                        <button className="text-[#767E94] hover:text-[#18191C]">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {allApps.map((candidate) => {
                            const initials = candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2);

                            return (
                                <div
                                    key={candidate.id}
                                    className="bg-white p-4 border border-[#E4E5E8] rounded-none shadow-2xs hover:border-[#0A65CC]/40 transition-all"
                                >
                                    {/* Candidate Card Header */}
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Placeholder Div (No real image as requested) */}
                                            <div className={`w-10 h-10 ${candidate.avatarBg} ${candidate.avatarTextColor} font-bold text-xs flex items-center justify-center rounded-full shrink-0 border border-current/20`}>
                                                {initials}
                                            </div>
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-bold text-[#18191C]">
                                                    {candidate.name}
                                                </h4>
                                                <p className="text-[11px] text-[#767E94]">
                                                    {candidate.role}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === candidate.id ? null : candidate.id)}
                                            className="text-[#767E94] hover:text-[#18191C] p-1"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Details List */}
                                    <ul className="text-xs text-[#5E6670] space-y-1.5 mb-4 pl-2">
                                        <li className="list-disc">{candidate.experience}</li>
                                        <li className="list-disc">{candidate.education}</li>
                                        <li className="list-disc">{candidate.applied}</li>
                                    </ul>

                                    {/* Card Footer Action Buttons */}
                                    <div className="flex items-center justify-between pt-3 border-t border-[#F1F2F4]">
                                        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0A65CC] hover:text-[#0851A8] transition-colors cursor-pointer">
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download Cv</span>
                                        </button>

                                        <button
                                            onClick={() => handleViewProfile(candidate)}
                                            className="px-3 py-1.5 bg-[#E8F1FF] hover:bg-[#0A65CC] hover:text-white text-[#0A65CC] font-semibold text-xs rounded-none transition-colors cursor-pointer flex items-center gap-1"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>View Profile</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Column 2: Shortlisted Applications */}
                <div className="bg-[#F8F9FA] p-4 border border-[#E4E5E8] rounded-none space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E4E5E8]">
                        <h3 className="text-xs font-bold text-[#18191C] uppercase tracking-wider">
                            Shortlisted ({shortlistedApps.length})
                        </h3>
                        <button className="text-[#767E94] hover:text-[#18191C]">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {shortlistedApps.map((candidate) => {
                            const initials = candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2);

                            return (
                                <div
                                    key={candidate.id}
                                    className="bg-white p-4 border border-[#0A65CC]/30 rounded-none shadow-2xs hover:border-[#0A65CC] transition-all"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${candidate.avatarBg} ${candidate.avatarTextColor} font-bold text-xs flex items-center justify-center rounded-full shrink-0 border border-current/20`}>
                                                {initials}
                                            </div>
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-bold text-[#18191C]">
                                                    {candidate.name}
                                                </h4>
                                                <p className="text-[11px] text-[#767E94]">
                                                    {candidate.role}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-[#767E94] hover:text-[#18191C] p-1">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <ul className="text-xs text-[#5E6670] space-y-1.5 mb-4 pl-2">
                                        <li className="list-disc">{candidate.experience}</li>
                                        <li className="list-disc">{candidate.education}</li>
                                        <li className="list-disc">{candidate.applied}</li>
                                    </ul>

                                    <div className="flex items-center justify-between pt-3 border-t border-[#F1F2F4]">
                                        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0A65CC] hover:text-[#0851A8] transition-colors cursor-pointer">
                                            <Download className="w-3.5 h-3.5" />
                                            <span>Download Cv</span>
                                        </button>

                                        <button
                                            onClick={() => handleViewProfile(candidate)}
                                            className="px-3 py-1.5 bg-[#0A65CC] text-white font-semibold text-xs rounded-none transition-colors cursor-pointer flex items-center gap-1"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>View Profile</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-[#E4E5E8]">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-2 border border-[#E4E5E8] disabled:opacity-40 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = currentPage === pageNum;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 text-xs font-bold rounded-none border transition-colors cursor-pointer ${
                                isActive
                                    ? "bg-[#0A65CC] text-white border-[#0A65CC]"
                                    : "bg-white text-[#18191C] border-[#E4E5E8] hover:bg-[#F1F2F4]"
                            }`}
                        >
                            {pageNum < 10 ? `0${pageNum}` : pageNum}
                        </button>
                    );
                })}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 border border-[#E4E5E8] disabled:opacity-40 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none cursor-pointer"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Candidate Details Modal */}
            <CandidateDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                candidate={selectedCandidate}
            />
        </div>
    );
}
