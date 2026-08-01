import React, { useState } from "react";
import {
    Search,
    MapPin,
    DollarSign,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function CandidateAppliedJobsView({ onViewJobDetails }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const allAppliedJobs = [
        {
            id: 1,
            title: "Networking Engineer",
            company: "Upwork",
            logo: null,
            logoBg: "bg-[#6fda44]",
            logoText: "Up",
            type: "Remote",
            location: "Washington",
            salary: "$50k-80k/month",
            dateApplied: "Feb 2, 2019 19:28",
            status: "Active",
        },
        {
            id: 2,
            title: "Product Designer",
            company: "Dribbble",
            logo: "/images/about/dribbble.svg",
            logoBg: "bg-[#EA4C89]",
            logoText: "🏀",
            type: "Full Time",
            location: "Dhaka",
            salary: "$50k-80k/month",
            dateApplied: "Dec 7, 2019 23:26",
            status: "Active",
        },
        {
            id: 3,
            title: "Junior Graphic Designer",
            company: "Apple",
            logo: "/images/about/apple.svg",
            logoBg: "bg-[#000000]",
            logoText: "",
            type: "Temporary",
            location: "Brazil",
            salary: "$50k-80k/month",
            dateApplied: "Feb 2, 2019 19:28",
            status: "Active",
        },
        {
            id: 4,
            title: "Visual Designer",
            company: "Microsoft",
            logo: "/images/about/microsoft.svg",
            logoBg: "bg-[#F25022]",
            logoText: "田",
            type: "Contract Base",
            location: "Wisconsin",
            salary: "$50k-80k/month",
            dateApplied: "Dec 7, 2019 23:26",
            status: "Active",
        },
        {
            id: 5,
            title: "Marketing Officer",
            company: "Twitter",
            logo: null,
            logoBg: "bg-[#1DA1F2]",
            logoText: "t",
            type: "Full Time",
            location: "United States",
            salary: "$50k-80k/month",
            dateApplied: "Dec 4, 2019 21:42",
            status: "Active",
        },
        {
            id: 6,
            title: "UI/UX Designer",
            company: "Facebook",
            logo: null,
            logoBg: "bg-[#1877F2]",
            logoText: "f",
            type: "Full Time",
            location: "North Dakota",
            salary: "$50k-80k/month",
            dateApplied: "Dec 30, 2019 07:52",
            status: "Active",
        },
        {
            id: 7,
            title: "Software Engineer",
            company: "Slack",
            logo: null,
            logoBg: "bg-[#4A154B]",
            logoText: "S",
            type: "Full Time",
            location: "New York",
            salary: "$50k-80k/month",
            dateApplied: "Dec 30, 2019 05:18",
            status: "Active",
        },
        {
            id: 8,
            title: "Front End Developer",
            company: "Reddit",
            logo: null,
            logoBg: "bg-[#FF4500]",
            logoText: "r",
            type: "Full Time",
            location: "Michigan",
            salary: "$50k-80k/month",
            dateApplied: "Mar 20, 2019 23:14",
            status: "Active",
        },
    ];

    const filteredJobs = allAppliedJobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "All" || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 font-sans text-[#18191C]">
            {/* Header & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                        Applied Jobs ({filteredJobs.length})
                    </h2>
                    <p className="text-xs sm:text-sm text-[#767E94] mt-0.5">
                        Track and manage all your submitted job applications
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex items-center min-w-[220px]">
                        <Search className="w-4 h-4 text-[#0A65CC] absolute left-3 pointer-events-none" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search jobs..."
                            className="w-full h-10 pl-9 pr-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm focus:outline-none focus:border-[#0A65CC]"
                        />
                    </div>

                    <div className="flex items-center border border-[#E4E5E8] rounded-none bg-white p-1">
                        {["All", "Active", "Shortlisted", "Rejected"].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-none cursor-pointer transition-colors ${
                                    statusFilter === st
                                        ? "bg-[#0A65CC] text-white"
                                        : "text-[#767E94] hover:text-[#18191C]"
                                }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-[#E4E5E8] rounded-none overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-[#F1F2F4] text-[#767E94] uppercase text-[11px] font-bold border-b border-[#E4E5E8]">
                            <th className="py-3 px-4">JOBS</th>
                            <th className="py-3 px-4">DATE APPLIED</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4 text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E5E8]">
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-xs sm:text-sm text-[#767E94]">
                                    No applied jobs match your search criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredJobs.map((job) => (
                                <tr
                                    key={job.id}
                                    className="group hover:bg-[#E8F1FF]/30 hover:outline hover:outline-2 hover:outline-[#0A65CC] hover:-outline-offset-2 transition-all cursor-pointer"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3.5">
                                            <div
                                                className={`w-12 h-12 rounded-none shrink-0 flex items-center justify-center p-2.5 shadow-2xs ${
                                                    job.logo ? "bg-white border border-[#E4E5E8]" : job.logoBg + " text-white font-bold text-base"
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
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm sm:text-base text-[#18191C] group-hover:text-[#0A65CC] transition-colors">
                                                        {job.title}
                                                    </span>
                                                    <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-[#E8F1FF] text-[#0A65CC] rounded-full">
                                                        {job.type}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-[#767E94] mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5 text-[#9199A3]" />
                                                        <span>{job.location}</span>
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-3.5 h-3.5 text-[#9199A3]" />
                                                        <span>{job.salary}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-xs sm:text-sm text-[#5E6670] font-medium">
                                        {job.dateApplied}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0BA02C]">
                                            <CheckCircle2 className="w-4 h-4 text-[#0BA02C]" />
                                            <span>Active</span>
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewJobDetails(job);
                                            }}
                                            className="h-11 sm:h-12 px-5 sm:px-6 text-xs sm:text-sm font-bold bg-[#F1F2F4] text-[#0A65CC] group-hover:bg-[#0A65CC] group-hover:text-white rounded-none transition-all cursor-pointer border-none shadow-2xs"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Circular Pagination Controls (Matching Screenshot 1) */}
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
