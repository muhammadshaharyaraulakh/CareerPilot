import React, { useState } from "react";
import {
    Star,
    ArrowRight,
    MoreVertical,
    Mail,
    Download,
    ChevronLeft,
    ChevronRight,
    Info,
} from "lucide-react";
import CandidateDetailsModal from "./CandidateDetailsModal";

export default function SavedCandidatesView() {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // 10 Mock Saved Candidates (using div placeholder avatars)
    const savedCandidatesList = [
        {
            id: 1,
            name: "Guy Hawkins",
            role: "Technical Support Specialist",
            avatarBg: "bg-[#86EFAC]",
            avatarTextColor: "text-[#166534]",
        },
        {
            id: 2,
            name: "Jacob Jones",
            role: "Product Designer",
            avatarBg: "bg-[#93C5FD]",
            avatarTextColor: "text-[#1E40AF]",
        },
        {
            id: 3,
            name: "Cameron Williamson",
            role: "Marketing Officer",
            avatarBg: "bg-[#FDE047]",
            avatarTextColor: "text-[#854D0E]",
        },
        {
            id: 4,
            name: "Robert Fox",
            role: "Marketing Manager",
            avatarBg: "bg-[#FCA5A5]",
            avatarTextColor: "text-[#991B1B]",
        },
        {
            id: 5,
            name: "Kathryn Murphy",
            role: "Junior Graphic Designer",
            avatarBg: "bg-[#C4B5FD]",
            avatarTextColor: "text-[#5B21B6]",
        },
        {
            id: 6,
            name: "Darlene Robertson",
            role: "Visual Designer",
            avatarBg: "bg-[#F472B6]",
            avatarTextColor: "text-[#831843]",
        },
        {
            id: 7,
            name: "Kristin Watson",
            role: "Senior UX Designer",
            avatarBg: "bg-[#CBD5E1]",
            avatarTextColor: "text-[#334155]",
        },
        {
            id: 8,
            name: "Jenny Wilson",
            role: "Interaction Designer",
            avatarBg: "bg-[#FED7AA]",
            avatarTextColor: "text-[#9A3412]",
        },
        {
            id: 9,
            name: "Marvin McKinney",
            role: "Networking Engineer",
            avatarBg: "bg-[#A7F3D0]",
            avatarTextColor: "text-[#065F46]",
        },
        {
            id: 10,
            name: "Theresa Webb",
            role: "Software Engineer",
            avatarBg: "bg-[#E9D5FF]",
            avatarTextColor: "text-[#6B21A8]",
        },
    ];

    const candidatesPerPage = 5;
    const totalPages = Math.ceil(savedCandidatesList.length / candidatesPerPage);
    const displayedCandidates = savedCandidatesList.slice(
        (currentPage - 1) * candidatesPerPage,
        currentPage * candidatesPerPage
    );

    const handleViewProfile = (candidate) => {
        setSelectedCandidate(candidate);
        setIsDetailsOpen(true);
    };

    return (
        <div className="w-full bg-white font-sans text-[#18191C] space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E5E8]">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                        Saved Candidates
                    </h2>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#767E94]">
                    <Info className="w-4 h-4 text-[#0A65CC] shrink-0" />
                    <span>All of the candidates are visible until 24 march, 2026</span>
                </div>
            </div>

            {/* Candidates List Rows */}
            <div className="space-y-3">
                {displayedCandidates.map((candidate) => {
                    const isMenuOpen = openMenuId === candidate.id;
                    const initials = candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2);

                    return (
                        <div
                            key={candidate.id}
                            className={`p-4 border transition-all rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                                isMenuOpen
                                    ? "border-[#0A65CC] bg-[#E8F1FF]/30"
                                    : "border-[#E4E5E8] hover:border-[#0A65CC]/40 bg-white"
                            }`}
                        >
                            {/* Left: Avatar + Name */}
                            <div className="flex items-center gap-4">
                                {/* Placeholder Div for Avatar (No real images as requested) */}
                                <div className={`w-12 h-12 ${candidate.avatarBg} ${candidate.avatarTextColor} font-bold text-sm flex items-center justify-center rounded-none border border-current/20 shrink-0`}>
                                    {initials}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#18191C]">
                                        {candidate.name}
                                    </h4>
                                    <p className="text-xs text-[#767E94] mt-0.5">
                                        {candidate.role}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-3 self-end sm:self-auto relative">
                                <button
                                    className="p-2 text-[#0A65CC] hover:bg-[#E8F1FF] rounded-none transition-colors cursor-pointer"
                                    title="Saved"
                                >
                                    <Star className="w-4 h-4 fill-current text-[#0A65CC]" />
                                </button>

                                <button
                                    onClick={() => handleViewProfile(candidate)}
                                    className="px-4 py-2 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs rounded-none border-none flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                                >
                                    <span>View Profile</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>

                                {/* 3 Dots Menu Button */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(isMenuOpen ? null : candidate.id)}
                                        className="p-2 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none transition-colors cursor-pointer"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {/* Menu Dropdown */}
                                    {isMenuOpen && (
                                        <div className="absolute right-0 top-10 z-30 w-44 bg-white border border-[#E4E5E8] rounded-none shadow-xl py-1 text-left">
                                            <button
                                                onClick={() => setOpenMenuId(null)}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-[#5E6670] hover:bg-[#F1F2F4] font-medium transition-colors cursor-pointer"
                                            >
                                                <Mail className="w-3.5 h-3.5 text-[#0A65CC]" />
                                                <span>Send Email</span>
                                            </button>
                                            <button
                                                onClick={() => setOpenMenuId(null)}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-[#5E6670] hover:bg-[#F1F2F4] font-medium transition-colors cursor-pointer border-t border-[#F1F2F4]"
                                            >
                                                <Download className="w-3.5 h-3.5 text-[#0A65CC]" />
                                                <span>Download Cv</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
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
