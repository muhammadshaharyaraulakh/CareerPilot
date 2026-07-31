import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowRight,
    CheckCircle2,
    XCircle,
    Users,
    MoreVertical,
    PlusCircle,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PromoteJobModal from "./PromoteJobModal";
import JobDetailsModal from "./JobDetailsModal";

export default function RecentlyPostedJobsTable({ onViewApplications }) {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [promoteModalJobTitle, setPromoteModalJobTitle] = useState(null);
    const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
    const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);
    const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);

    // 15 Mock Jobs to support 10 items per page + pagination
    const allJobsList = [
        {
            id: 1,
            title: "UI/UX Designer",
            type: "Full Time",
            remaining: "27 days remaining",
            status: "Active",
            applications: "798 Applications",
        },
        {
            id: 2,
            title: "Senior UX Designer",
            type: "Internship",
            remaining: "8 days remaining",
            status: "Active",
            applications: "185 Applications",
        },
        {
            id: 3,
            title: "Technical Support Specialist",
            type: "Part Time",
            remaining: "4 days remaining",
            status: "Active",
            applications: "556 Applications",
        },
        {
            id: 4,
            title: "Junior Graphic Designer",
            type: "Full Time",
            remaining: "24 days remaining",
            status: "Active",
            applications: "583 Applications",
        },
        {
            id: 5,
            title: "Front End Developer",
            type: "Full Time",
            remaining: "Dec 7, 2026",
            status: "Expire",
            applications: "740 Applications",
        },
        {
            id: 6,
            title: "DevOps Engineer",
            type: "Full Time",
            remaining: "18 days remaining",
            status: "Active",
            applications: "320 Applications",
        },
        {
            id: 7,
            title: "Product Manager",
            type: "Full Time",
            remaining: "12 days remaining",
            status: "Active",
            applications: "412 Applications",
        },
        {
            id: 8,
            title: "Backend Developer (Node)",
            type: "Contract",
            remaining: "15 days remaining",
            status: "Active",
            applications: "290 Applications",
        },
        {
            id: 9,
            title: "QA Automation Lead",
            type: "Full Time",
            remaining: "Jan 15, 2026",
            status: "Expire",
            applications: "150 Applications",
        },
        {
            id: 10,
            title: "Data Analyst Specialist",
            type: "Full Time",
            remaining: "29 days remaining",
            status: "Active",
            applications: "610 Applications",
        },
        {
            id: 11,
            title: "Full Stack Engineer",
            type: "Full Time",
            remaining: "20 days remaining",
            status: "Active",
            applications: "840 Applications",
        },
        {
            id: 12,
            title: "Content Marketing Strategist",
            type: "Part Time",
            remaining: "10 days remaining",
            status: "Active",
            applications: "210 Applications",
        },

    ];

    const jobsPerPage = 10;
    const totalPages = Math.ceil(allJobsList.length / jobsPerPage);
    const displayedJobs = allJobsList.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleOpenPromoteModal = (jobTitle) => {
        setOpenMenuId(null);
        setPromoteModalJobTitle(jobTitle);
        setIsPromoteModalOpen(true);
    };

    return (
        <div className="w-full bg-white p-1 sm:p-2 space-y-6 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                    Recently Posted Jobs
                </h3>
                <Link
                    href="#"
                    className="text-xs sm:text-sm font-medium text-[#767E94] hover:text-[#0A65CC] flex items-center gap-1.5 transition-colors"
                >
                    <span>View all</span>
                    <ArrowRight className="w-4 h-4 text-[#767E94]" />
                </Link>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto no-scrollbar border border-[#E4E5E8] rounded-none pb-12 sm:pb-0">
                <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                        <tr className="bg-[#F1F2F4] text-[11px] font-semibold tracking-wider text-[#767E94] uppercase border-b border-[#E4E5E8]">
                            <th className="py-3.5 px-4 rounded-none">JOBS</th>
                            <th className="py-3.5 px-4">STATUS</th>
                            <th className="py-3.5 px-4">APPLICATIONS</th>
                            <th className="py-3.5 px-4 text-right rounded-none">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E5E8] text-xs sm:text-sm text-[#18191C]">
                        {displayedJobs.map((job, index) => {
                            const isMenuOpen = openMenuId === job.id;
                            const isActiveStatus = job.status === "Active";
                            const isLastItems = index >= displayedJobs.length - 2;

                            return (
                                <tr
                                    key={job.id}
                                    className={`transition-all relative border-b border-[#E4E5E8] ${
                                        isMenuOpen
                                            ? "outline-2 outline-[#0A65CC] bg-white rounded-none z-20"
                                            : "hover:bg-[#F8F9FA]"
                                    }`}
                                >
                                    {/* Job Title & Meta */}
                                    <td className="py-4 px-4">
                                        <div className="font-semibold text-[#18191C] hover:text-[#0A65CC] transition-colors cursor-pointer text-sm">
                                            {job.title}
                                        </div>
                                        <div className="text-xs text-[#767E94] mt-1 flex items-center gap-2">
                                            <span>{job.type}</span>
                                            <span>•</span>
                                            <span>{job.remaining}</span>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-4">
                                        {isActiveStatus ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0BA02C]">
                                                <CheckCircle2 className="w-4 h-4 text-[#0BA02C]" />
                                                <span>Active</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#E05151]">
                                                <XCircle className="w-4 h-4 text-[#E05151]" />
                                                <span>Expire</span>
                                            </span>
                                        )}
                                    </td>

                                    {/* Applications */}
                                    <td className="py-4 px-4">
                                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#5E6670]">
                                            <Users className="w-4 h-4 text-[#767E94]" />
                                            <span>{job.applications}</span>
                                        </div>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-4 px-4 text-right relative">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* View Applications Button */}
                                            <button
                                                onClick={() => onViewApplications && onViewApplications(job.title)}
                                                className={`h-10 px-4 font-semibold text-xs rounded-none border-none transition-all cursor-pointer ${
                                                    isMenuOpen
                                                        ? "bg-[#0A65CC] text-white"
                                                        : "bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#0A65CC]"
                                                }`}
                                            >
                                                View Applications
                                            </button>

                                            {/* 3 Dots Menu Button */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleMenu(job.id)}
                                                    className={`p-2.5 rounded-none border-none transition-colors cursor-pointer ${
                                                        isMenuOpen
                                                            ? "bg-[#F1F2F4] text-[#18191C]"
                                                            : "hover:bg-[#F1F2F4] text-[#767E94]"
                                                    }`}
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>

                                                {/* Action Dropdown Menu */}
                                                <AnimatePresence>
                                                    {isMenuOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95, y: isLastItems ? 4 : -4 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.95, y: isLastItems ? 4 : -4 }}
                                                            transition={{ duration: 0.15 }}
                                                            className={`absolute right-0 z-40 w-48 bg-white rounded-none shadow-xl border border-[#E4E5E8] py-1 text-left ${
                                                                isLastItems ? "bottom-12" : "top-12"
                                                            }`}
                                                        >
                                                            <button
                                                                onClick={() => handleOpenPromoteModal(job.title)}
                                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#0A65CC] bg-[#E8F1FF] font-semibold transition-colors cursor-pointer rounded-none border-none"
                                                            >
                                                                <PlusCircle className="w-4 h-4 text-[#0A65CC]" />
                                                                <span>Promote Job</span>
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setOpenMenuId(null);
                                                                    setSelectedJobForDetails(job);
                                                                    setIsJobDetailsModalOpen(true);
                                                                }}
                                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#5E6670] hover:bg-[#F1F2F4] font-medium transition-colors cursor-pointer rounded-none border-none"
                                                            >
                                                                <Eye className="w-4 h-4 text-[#5E6670]" />
                                                                <span>View Detail</span>
                                                            </button>

                                                            <button
                                                                onClick={() => setOpenMenuId(null)}
                                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#767E94] hover:text-[#E05151] hover:bg-[#FFF0F0] font-medium transition-colors cursor-pointer rounded-none border-none border-t border-[#E4E5E8]"
                                                            >
                                                                <XCircle className="w-4 h-4 text-[#767E94]" />
                                                                <span>Mark as expired</span>
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls (10 jobs per page) */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#E4E5E8]">
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

            {/* Promote Job Modal */}
            <PromoteJobModal
                isOpen={isPromoteModalOpen}
                onClose={() => setIsPromoteModalOpen(false)}
                jobTitle={promoteModalJobTitle || "UI/UX Designer"}
                onPromoteSuccess={() => setIsPromoteModalOpen(false)}
            />

            {/* Job Details Modal */}
            <JobDetailsModal
                isOpen={isJobDetailsModalOpen}
                onClose={() => setIsJobDetailsModalOpen(false)}
                job={selectedJobForDetails}
            />
        </div>
    );
}
