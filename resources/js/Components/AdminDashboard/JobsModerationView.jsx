import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    StarIcon,
    BriefcaseIcon,
    FlagIcon,
} from "@heroicons/react/24/outline";

export default function JobsModerationView() {
    const [filterTab, setFilterTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const [jobsList, setJobsList] = useState([
        {
            id: 101,
            title: "Senior UI UX Lead Designer",
            company: "Figma Design Studio",
            location: "San Francisco, USA (Remote)",
            salary: "$120,000 - $140,000 / year",
            postedDate: "Aug 01, 2026",
            status: "Pending Moderation",
            isFeatured: false,
        },
        {
            id: 102,
            title: "Senior Software Engineer (React / Laravel)",
            company: "TechCorp Global Solutions",
            location: "New York, USA",
            salary: "$130,000 - $160,000 / year",
            postedDate: "Jul 30, 2026",
            status: "Published",
            isFeatured: true,
        },
        {
            id: 103,
            title: "Digital Marketing Growth Specialist",
            company: "Instagram Media Inc",
            location: "London, UK",
            salary: "$80,000 - $95,000 / year",
            postedDate: "Jul 28, 2026",
            status: "Published",
            isFeatured: true,
        },
        {
            id: 104,
            title: "Data Science Analyst Lead",
            company: "Spotify Music Stream",
            location: "Stockholm, Sweden",
            salary: "$90,000 - $115,000 / year",
            postedDate: "Jul 25, 2026",
            status: "Pending Moderation",
            isFeatured: false,
        },
        {
            id: 105,
            title: "Fullstack Python Engineer",
            company: "CyberSecurity Labs",
            location: "Remote",
            salary: "$100,000 - $125,000 / year",
            postedDate: "Jul 20, 2026",
            status: "Flagged",
            isFeatured: false,
        },
    ]);

    const handleApprove = (id) => {
        setJobsList(
            jobsList.map((job) =>
                job.id === id ? { ...job, status: "Published" } : job
            )
        );
    };

    const handleReject = (id) => {
        setJobsList(jobsList.filter((job) => job.id !== id));
    };

    const handleToggleFeatured = (id) => {
        setJobsList(
            jobsList.map((job) =>
                job.id === id ? { ...job, isFeatured: !job.isFeatured } : job
            )
        );
    };

    const filteredJobs = jobsList.filter((job) => {
        const matchesFilter =
            filterTab === "All" ||
            (filterTab === "Pending" && job.status === "Pending Moderation") ||
            (filterTab === "Published" && job.status === "Published") ||
            (filterTab === "Featured" && job.isFeatured) ||
            (filterTab === "Flagged" && job.status === "Flagged");

        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E4E5E8]">
                <div>
                    <h2 className="text-lg font-bold text-[#18191C]">
                        Job Post Moderation & Featured Management
                    </h2>
                    <p className="text-xs text-[#767E94] mt-0.5">
                        Approve new job postings, flag policy violations, and feature top vacancies.
                    </p>
                </div>
                <div className="text-xs font-semibold text-[#0A65CC] bg-[#E8F1FF] px-3.5 py-2 rounded-lg border border-[#CEE0F5]">
                    Total Active Jobs: {jobsList.length} Posts
                </div>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {["All", "Pending", "Published", "Featured", "Flagged"].map((tab) => (
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
                                        jobsList.filter(
                                            (j) => j.status === "Pending Moderation"
                                        ).length
                                    }
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <MagnifyingGlassIcon className="w-4 h-4 text-[#767E94] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search job title or employer..."
                        className="w-full h-10 pl-9 pr-3 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                    />
                </div>
            </div>

            {/* Jobs Table */}
            <div className="overflow-x-auto border border-[#E4E5E8] rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8F9FA] border-b border-[#E4E5E8] text-[11px] font-bold text-[#767E94] uppercase tracking-wider">
                            <th className="py-3.5 px-4">Job Title & Employer</th>
                            <th className="py-3.5 px-4">Location & Salary</th>
                            <th className="py-3.5 px-4">Date Posted</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Featured Job</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E5E8] text-xs text-[#18191C]">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <tr key={job.id} className="hover:bg-[#F8F9FA]/60 transition-colors">
                                    {/* Job Title & Company */}
                                    <td className="py-4 px-4">
                                        <div>
                                            <h4 className="font-bold text-[#18191C]">
                                                {job.title}
                                            </h4>
                                            <span className="text-[11px] text-[#0A65CC] font-semibold">
                                                {job.company}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Location & Salary */}
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-[#18191C]">
                                                {job.location}
                                            </span>
                                            <span className="text-[11px] text-[#767E94]">
                                                {job.salary}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Date Posted */}
                                    <td className="py-4 px-4 text-[#5E6670]">
                                        {job.postedDate}
                                    </td>

                                    {/* Moderation Status */}
                                    <td className="py-4 px-4">
                                        {job.status === "Published" && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7F6EA] text-[#0BA02C] text-[11px] font-semibold rounded-full">
                                                <CheckCircleIcon className="w-3.5 h-3.5" /> Published
                                            </span>
                                        )}
                                        {job.status === "Pending Moderation" && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF5E6] text-[#F7A531] text-[11px] font-semibold rounded-full">
                                                Pending Review
                                            </span>
                                        )}
                                        {job.status === "Flagged" && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FDF0F0] text-[#E05151] text-[11px] font-semibold rounded-full">
                                                <FlagIcon className="w-3.5 h-3.5" /> Flagged
                                            </span>
                                        )}
                                    </td>

                                    {/* Featured Job Toggle */}
                                    <td className="py-4 px-4">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleFeatured(job.id)}
                                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 transition-all cursor-pointer ${
                                                job.isFeatured
                                                    ? "bg-[#FFF5E6] text-[#F7A531] border border-[#FFE3B3]"
                                                    : "bg-gray-100 text-[#767E94] hover:bg-gray-200"
                                            }`}
                                        >
                                            <StarIcon
                                                className={`w-3.5 h-3.5 ${
                                                    job.isFeatured ? "fill-current" : ""
                                                }`}
                                            />
                                            {job.isFeatured ? "Featured Job" : "Standard"}
                                        </button>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            {job.status !== "Published" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleApprove(job.id)}
                                                    className="px-3 py-1.5 bg-[#0BA02C] text-white text-[11px] font-semibold rounded-md hover:bg-[#098223] transition-colors cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleReject(job.id)}
                                                className="px-3 py-1.5 bg-white border border-[#E4E5E8] text-[#E05151] hover:bg-[#FDF0F0] text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-[#767E94]">
                                    No job posts match your query.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
