import React, { useState } from "react";
import {
    Bookmark,
    MapPin,
    DollarSign,
    Calendar,
    XCircle,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function CandidateFavoriteJobsView({ onViewJobDetails }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkedIds, setBookmarkedIds] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

    const favoriteJobs = [
        {
            id: 1,
            title: "UI/UX Designer",
            company: "YouTube",
            logo: null,
            logoBg: "bg-[#FF0000]",
            logoText: "▶",
            type: "Full Time",
            location: "Minnesota, USA",
            salary: "$10K-$15K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 2,
            title: "Senior UX Designer",
            company: "Slack",
            logo: null,
            logoBg: "bg-[#4A154B]",
            logoText: "S",
            type: "Full Time",
            location: "United Kingdom of Great Britain",
            salary: "$30K-$35K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 3,
            title: "Junior Graphic Designer",
            company: "Facebook",
            logo: null,
            logoBg: "bg-[#1877F2]",
            logoText: "f",
            type: "Full Time",
            location: "Mymensingh, Bangladesh",
            salary: "$40K-$50K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 4,
            title: "Technical Support Specialist",
            company: "Google",
            logo: "/images/about/google.svg",
            logoBg: "bg-[#4285F4]",
            logoText: "G",
            type: "Full Time",
            location: "Idaho, USA",
            salary: "$15K-$20K",
            remaining: "Job Expired",
            isExpired: true,
        },
        {
            id: 5,
            title: "Product Designer",
            company: "Twitter",
            logo: null,
            logoBg: "bg-[#1DA1F2]",
            logoText: "t",
            type: "Full Time",
            location: "Sivas, Turkey",
            salary: "$50K-$70K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 6,
            title: "Project Manager",
            company: "Udemy",
            logo: null,
            logoBg: "bg-[#A435F0]",
            logoText: "U",
            type: "Full Time",
            location: "Ohio, USA",
            salary: "$50K-$80K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 7,
            title: "Technical Support Specialist",
            company: "Google",
            logo: "/images/about/google.svg",
            logoBg: "bg-[#4285F4]",
            logoText: "G",
            type: "Full Time",
            location: "Idaho, USA",
            salary: "$15K-$20K",
            remaining: "Job Expired",
            isExpired: true,
        },
        {
            id: 8,
            title: "Technical Support Specialist",
            company: "Google",
            logo: "/images/about/google.svg",
            logoBg: "bg-[#4285F4]",
            logoText: "G",
            type: "Full Time",
            location: "Idaho, USA",
            salary: "$15K-$20K",
            remaining: "Job Expired",
            isExpired: true,
        },
        {
            id: 9,
            title: "Marketing Manager",
            company: "Microsoft",
            logo: "/images/about/microsoft.svg",
            logoBg: "bg-[#F25022]",
            logoText: "田",
            type: "Temporary",
            location: "Konya, Turkey",
            salary: "$20K-$25K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 10,
            title: "Visual Designer",
            company: "Apple",
            logo: "/images/about/apple.svg",
            logoBg: "bg-[#000000]",
            logoText: "",
            type: "Part Time",
            location: "Washington, USA",
            salary: "$10K-$15K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
        {
            id: 11,
            title: "Interaction Designer",
            company: "Figma",
            logo: "/images/about/figma.svg",
            logoBg: "bg-[#F24E1E]",
            logoText: "F",
            type: "Remote",
            location: "Penn, USA",
            salary: "$35K-$40K",
            remaining: "4 Days Remaining",
            isExpired: false,
        },
    ];

    const toggleBookmark = (id) => {
        setBookmarkedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-6 font-sans text-[#18191C]">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                    Favorite Jobs
                </h2>
                <p className="text-xs sm:text-sm text-[#767E94] mt-0.5">
                    Jobs you have bookmarked for later application
                </p>
            </div>

            {/* Horizontal Job List Cards (Matching Screenshot 2) */}
            <div className="space-y-3">
                {favoriteJobs.map((job) => {
                    const isBookmarked = bookmarkedIds.includes(job.id);
                    return (
                        <div
                            key={job.id}
                            className="bg-white border border-[#E4E5E8] hover:border-[#0A65CC] p-4 sm:p-5 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-all cursor-pointer"
                        >
                            {/* Left: Logo & Job Details */}
                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                {/* Logo */}
                                <div
                                    className={`w-12 h-12 rounded-none shrink-0 flex items-center justify-center p-2.5 shadow-2xs ${
                                        job.logo
                                            ? "bg-white border border-[#E4E5E8]"
                                            : job.logoBg + " text-white font-bold text-base"
                                    }`}
                                >
                                    {job.logo ? (
                                        <img
                                            src={job.logo}
                                            alt={job.company}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span>{job.logoText}</span>
                                    )}
                                </div>

                                {/* Title, Badge & Meta info */}
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-sm sm:text-base text-[#18191C] group-hover:text-[#0A65CC] transition-colors truncate">
                                            {job.title}
                                        </h3>
                                        <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-[#E8F1FF] text-[#0A65CC] rounded-full shrink-0">
                                            {job.type}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-[#767E94] mt-1.5 flex-wrap">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-[#9199A3]" />
                                            <span>{job.location}</span>
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3.5 h-3.5 text-[#9199A3]" />
                                            <span>{job.salary}</span>
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            {job.isExpired ? (
                                                <>
                                                    <XCircle className="w-3.5 h-3.5 text-[#E05151]" />
                                                    <span className="text-[#E05151] font-semibold">
                                                        {job.remaining}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Calendar className="w-3.5 h-3.5 text-[#9199A3]" />
                                                    <span>{job.remaining}</span>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Bookmark & Action Button */}
                            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                                {/* Bookmark icon button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(job.id);
                                    }}
                                    className={`p-2.5 rounded-none transition-colors cursor-pointer ${
                                        isBookmarked
                                            ? "text-[#18191C] bg-[#F1F2F4]"
                                            : "text-[#9199A3] hover:text-[#18191C] hover:bg-[#F1F2F4]"
                                    }`}
                                    title="Bookmark"
                                >
                                    <Bookmark
                                        className={`w-5 h-5 ${
                                            isBookmarked ? "fill-[#18191C]" : ""
                                        }`}
                                    />
                                </button>

                                {/* Apply Now or Deadline Expired Button */}
                                {job.isExpired ? (
                                    <button
                                        type="button"
                                        disabled
                                        className="h-11 sm:h-12 px-5 sm:px-6 text-xs sm:text-sm font-bold bg-[#F1F2F4] text-[#9199A3] cursor-not-allowed rounded-none border-none"
                                    >
                                        Deadline Expired
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onViewJobDetails(job);
                                        }}
                                        className="h-11 sm:h-12 px-5 sm:px-6 text-xs sm:text-sm font-bold bg-[#E8F1FF] text-[#0A65CC] group-hover:bg-[#0A65CC] group-hover:text-white rounded-none transition-all cursor-pointer border-none flex items-center gap-2 shadow-2xs"
                                    >
                                        <span>Apply Now</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls (Matching Screenshot 1 & 2) */}
            <div className="flex items-center justify-center gap-2 pt-6">
                <button
                    disabled={currentPage === 1}
                    className="w-10 h-10 border border-[#E4E5E8] flex items-center justify-center text-[#767E94] hover:border-[#0A65CC] hover:text-[#0A65CC] rounded-full disabled:opacity-40 cursor-pointer transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 bg-[#0A65CC] text-white font-bold text-xs flex items-center justify-center rounded-full shadow-xs">
                    01
                </button>
                <button className="w-10 h-10 bg-[#F1F2F4] text-[#5E6670] hover:bg-[#E8F1FF] hover:text-[#0A65CC] font-semibold text-xs flex items-center justify-center rounded-full transition-colors cursor-pointer">
                    02
                </button>
                <button className="w-10 h-10 bg-[#F1F2F4] text-[#5E6670] hover:bg-[#E8F1FF] hover:text-[#0A65CC] font-semibold text-xs flex items-center justify-center rounded-full transition-colors cursor-pointer">
                    03
                </button>
                <button className="w-10 h-10 bg-[#F1F2F4] text-[#5E6670] hover:bg-[#E8F1FF] hover:text-[#0A65CC] font-semibold text-xs flex items-center justify-center rounded-full transition-colors cursor-pointer">
                    04
                </button>
                <button className="w-10 h-10 bg-[#F1F2F4] text-[#5E6670] hover:bg-[#E8F1FF] hover:text-[#0A65CC] font-semibold text-xs flex items-center justify-center rounded-full transition-colors cursor-pointer">
                    05
                </button>
                <button className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center hover:bg-[#0A65CC] hover:text-white rounded-full cursor-pointer transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
