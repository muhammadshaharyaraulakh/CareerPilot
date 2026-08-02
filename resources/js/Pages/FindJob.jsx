import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    MapPin,
    SlidersHorizontal,
    Bookmark,
    X,
    ChevronLeft,
    ChevronRight,
    Crosshair,
    Check,
} from "lucide-react";
import TopHeader from "@/Components/Welcome/TopHeader";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import Footer from "@/Components/Welcome/Footer";

export default function FindJob({ auth }) {
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [activeTag, setActiveTag] = useState("PHP");
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [bookmarkedJobs, setBookmarkedJobs] = useState([2, 5]);
    const [currentPage, setCurrentPage] = useState(1);

    // Active filters state
    const [activeFilters, setActiveFilters] = useState([
        { id: "search", label: "Search : UI/UX" },
        { id: "location", label: "Prague, Czech" },
        { id: "industry", label: "Design" },
        { id: "jobType", label: "Fulltime" },
        { id: "salary", label: "Salary $70,000 - $120,000" },
    ]);

    // Filter controls state
    const [selectedIndustry, setSelectedIndustry] = useState("Business");
    const [selectedJobType, setSelectedJobType] = useState("Full Time");
    const [selectedSalaryPreset, setSelectedSalaryPreset] = useState("Custom");
    const [salaryMinMax, setSalaryMinMax] = useState({ min: 70000, max: 120000 });
    const [isRemoteOnly, setIsRemoteOnly] = useState(false);

    const popularTags = [
        "Front-end",
        "Back-end",
        "Development",
        "PHP",
        "Laravel",
        "Bootstrap",
        "Developer",
        "Team Lead",
        "Product Testing",
        "Javascript",
    ];

    const industries = [
        "All Category",
        "Developments",
        "Business",
        "Finance & Accounting",
        "IT & Software",
        "Office Productivity",
        "Personal Development",
        "Design",
        "Marketing",
        "Photography & Video",
    ];

    const jobTypes = [
        "Full Time",
        "Part-Time",
        "Internship",
        "Temporary",
        "Contract Base",
    ];

    const salaryPresets = [
        "$10 - $100",
        "$100 - $1,000",
        "$1,000 - $10,000",
        "$10,000 - $100,000",
        "$100,000 Up",
        "Custom",
    ];

    const jobs = [
        {
            id: 1,
            title: "Technical Support Specialist",
            type: "PART-TIME",
            typeColor: "bg-[#EAF6ED] text-[#0BA02C]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 2,
            title: "Senior UX Designer",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 3,
            title: "Marketing Officer",
            type: "INTERNSHIP",
            typeColor: "bg-[#FFF6E6] text-[#E05151]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 4,
            title: "Junior Graphic Designer",
            type: "INTERNSHIP",
            typeColor: "bg-[#FFF6E6] text-[#E05151]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 5,
            title: "Interaction Designer",
            type: "PART-TIME",
            typeColor: "bg-[#EAF6ED] text-[#0BA02C]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 6,
            title: "Project Manager",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 7,
            title: "Software Engineer",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 8,
            title: "Visual Designer",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 9,
            title: "Project Manager",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 10,
            title: "UI/UX Designer",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 11,
            title: "Product Designer",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 12,
            title: "Networking Engineer",
            type: "INTERNSHIP",
            typeColor: "bg-[#FFF6E6] text-[#E05151]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 13,
            title: "Front End Developer",
            type: "PART-TIME",
            typeColor: "bg-[#EAF6ED] text-[#0BA02C]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 14,
            title: "Senior UX Designer",
            type: "FULL-TIME",
            typeColor: "bg-[#E8F1FF] text-[#0A65CC]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
        {
            id: 15,
            title: "Marketing Manager",
            type: "INTERNSHIP",
            typeColor: "bg-[#FFF6E6] text-[#E05151]",
            salary: "$20,000 - $25,000",
            company: "Google Inc.",
            location: "Dhaka, Bangladesh",
            logo: "https://www.google.com/favicon.ico",
        },
    ];

    const toggleBookmark = (id, e) => {
        e.stopPropagation();
        setBookmarkedJobs((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const removeActiveFilter = (id) => {
        setActiveFilters(activeFilters.filter((f) => f.id !== id));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-[#F1F2F4]/40 text-[#18191C] font-sans flex flex-col justify-between antialiased">
            <Head title="Find Job - CareerPilot" />

            {/* Header Components */}
            <TopHeader activeLink="Find Job" />
            <MainNavbar auth={auth} />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[1320px] mx-auto px-4 py-8 space-y-6">
                {/* Search Bar Section */}
                <div className="bg-white border border-[#E4E5E8] rounded-none p-3 shadow-xs">
                    <div className="flex flex-col lg:flex-row items-center gap-3">
                        {/* Search Input */}
                        <div className="flex items-center flex-1 w-full px-3 h-12 border-b lg:border-b-0 lg:border-r border-[#E4E5E8]">
                            <Search className="w-5 h-5 text-[#0A65CC] shrink-0 mr-3" />
                            <input
                                type="text"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                placeholder="Search by: Job title, Position, Keyword..."
                                className="w-full text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none outline-none focus:ring-0 bg-transparent"
                            />
                        </div>

                        {/* Location Input */}
                        <div className="flex items-center flex-1 w-full px-3 h-12 border-b lg:border-b-0 lg:border-r border-[#E4E5E8]">
                            <MapPin className="w-5 h-5 text-[#0A65CC] shrink-0 mr-3" />
                            <input
                                type="text"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                placeholder="City, state or zip code"
                                className="w-full text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none outline-none focus:ring-0 bg-transparent"
                            />
                            <button
                                type="button"
                                title="Locate Me"
                                className="p-1.5 text-[#767E94] hover:text-[#0A65CC] shrink-0 transition-colors cursor-pointer"
                            >
                                <Crosshair className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Filter Button & Find Job Button */}
                        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
                            <button
                                type="button"
                                onClick={() => setIsFilterDrawerOpen(true)}
                                className="h-12 px-5 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs sm:text-sm rounded-none border border-[#E4E5E8] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                                <SlidersHorizontal className="w-4 h-4 text-[#18191C]" />
                                <span>Filters</span>
                            </button>

                            <button
                                type="button"
                                className="h-12 px-8 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none transition-colors cursor-pointer"
                            >
                                Find Job
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popular Searches Bar */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#767E94] pt-1">
                    <span className="font-semibold text-[#18191C]">Popular searches:</span>
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-2.5 py-1 rounded-none text-xs transition-colors cursor-pointer ${
                                activeTag === tag
                                    ? "bg-[#18191C] text-white font-bold"
                                    : "hover:text-[#0A65CC] hover:bg-[#E8F1FF]"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Job Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {jobs.map((job) => {
                        const isBookmarked = bookmarkedJobs.includes(job.id);
                        return (
                            <motion.div
                                key={job.id}
                                variants={itemVariants}
                                onClick={() => router.visit(`/job-details/${job.id}`)}
                                className="bg-white border border-[#E4E5E8] hover:border-[#0A65CC] p-5 rounded-none transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between relative group"
                            >
                                <div className="space-y-3">
                                    {/* Title & Badge */}
                                    <div className="space-y-1.5">
                                        <h3 className="text-base font-bold text-[#18191C] group-hover:text-[#0A65CC] transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-none ${job.typeColor}`}
                                            >
                                                {job.type}
                                            </span>
                                            <span className="text-xs text-[#767E94]">
                                                Salary: {job.salary}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Company Info & Bookmark */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#F1F2F4] border border-[#E4E5E8] rounded-none flex items-center justify-center p-2 shrink-0">
                                                <img
                                                    src={job.logo}
                                                    alt={job.company}
                                                    className="w-5 h-5 object-contain"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://via.placeholder.com/20?text=G";
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-[#18191C]">
                                                    {job.company}
                                                </h4>
                                                <p className="text-[11px] text-[#767E94] flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-[#9199A3]" />
                                                    <span>{job.location}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => toggleBookmark(job.id, e)}
                                            className={`p-2 transition-colors cursor-pointer ${
                                                isBookmarked
                                                    ? "text-[#0A65CC]"
                                                    : "text-[#9199A3] hover:text-[#0A65CC]"
                                            }`}
                                            title="Bookmark Job"
                                        >
                                            <Bookmark
                                                className="w-4 h-4"
                                                fill={isBookmarked ? "currentColor" : "none"}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Circular Pagination Bar */}
                <div className="flex items-center justify-center gap-2 pt-6">
                    <button
                        type="button"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className="w-10 h-10 rounded-full bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-colors cursor-pointer ${
                                currentPage === page
                                    ? "bg-[#0A65CC] text-white"
                                    : "bg-[#F1F2F4] text-[#18191C] hover:bg-[#E4E5E8]"
                            }`}
                        >
                            {page < 10 ? `0${page}` : page}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                        className="w-10 h-10 rounded-full bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </main>

            {/* SLIDE-IN FILTER DRAWER MODAL (Image 2) */}
            <AnimatePresence>
                {isFilterDrawerOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden flex">
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterDrawerOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                        />

                        {/* Left Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl z-50 overflow-y-auto flex flex-col justify-between border-r border-[#E4E5E8]"
                        >
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-[#E4E5E8]">
                                    <h2 className="text-base font-bold text-[#18191C]">
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setIsFilterDrawerOpen(false)}
                                        className="p-1.5 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#F1F2F4] transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Active Filters */}
                                {activeFilters.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-[#767E94]">
                                            Active Filters:
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {activeFilters.map((filter) => (
                                                <span
                                                    key={filter.id}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F1F2F4] text-[#18191C] text-xs font-medium rounded-full border border-[#E4E5E8]"
                                                >
                                                    <span>{filter.label}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeActiveFilter(filter.id)}
                                                        className="text-[#767E94] hover:text-[#E05151] cursor-pointer"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Industry List */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-[#0A65CC] uppercase tracking-wide">
                                        Industry
                                    </h3>
                                    <div className="space-y-1">
                                        {industries.map((ind) => (
                                            <button
                                                key={ind}
                                                type="button"
                                                onClick={() => setSelectedIndustry(ind)}
                                                className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-none transition-colors cursor-pointer flex items-center justify-between ${
                                                    selectedIndustry === ind
                                                        ? "bg-[#E8F1FF] text-[#0A65CC] font-bold"
                                                        : "text-[#18191C] hover:bg-[#F1F2F4]"
                                                }`}
                                            >
                                                <span>{ind}</span>
                                                {selectedIndustry === ind && (
                                                    <Check className="w-4 h-4 text-[#0A65CC]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Job Type Radio Options */}
                                <div className="space-y-3 pt-4 border-t border-[#E4E5E8]">
                                    <h3 className="text-xs font-bold text-[#0A65CC] uppercase tracking-wide">
                                        Job Type
                                    </h3>
                                    <div className="space-y-2">
                                        {jobTypes.map((type) => (
                                            <label
                                                key={type}
                                                className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-[#18191C]"
                                            >
                                                <input
                                                    type="radio"
                                                    name="jobType"
                                                    checked={selectedJobType === type}
                                                    onChange={() => setSelectedJobType(type)}
                                                    className="w-4 h-4 text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8]"
                                                />
                                                <span>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Salary Range */}
                                <div className="space-y-3 pt-4 border-t border-[#E4E5E8]">
                                    <h3 className="text-xs font-bold text-[#0A65CC] uppercase tracking-wide">
                                        Salary (yearly)
                                    </h3>
                                    {/* Range Dual Slider Visual */}
                                    <div className="space-y-2">
                                        <input
                                            type="range"
                                            min={10000}
                                            max={200000}
                                            step={5000}
                                            value={salaryMinMax.max}
                                            onChange={(e) =>
                                                setSalaryMinMax({
                                                    ...salaryMinMax,
                                                    max: Number(e.target.value),
                                                })
                                            }
                                            className="w-full accent-[#0A65CC] cursor-pointer"
                                        />
                                        <div className="flex items-center justify-between text-xs text-[#767E94] font-medium">
                                            <span>Min: ${salaryMinMax.min.toLocaleString()}</span>
                                            <span>Max: ${salaryMinMax.max.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Presets */}
                                    <div className="space-y-2 pt-2">
                                        {salaryPresets.map((preset) => (
                                            <label
                                                key={preset}
                                                className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-[#18191C]"
                                            >
                                                <input
                                                    type="radio"
                                                    name="salaryPreset"
                                                    checked={selectedSalaryPreset === preset}
                                                    onChange={() => setSelectedSalaryPreset(preset)}
                                                    className="w-4 h-4 text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8]"
                                                />
                                                <span>{preset}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Remote Job Switch */}
                                <div className="pt-4 border-t border-[#E4E5E8] flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#18191C]">
                                        Remote Job
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setIsRemoteOnly(!isRemoteOnly)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                            isRemoteOnly ? "bg-[#0A65CC]" : "bg-[#CCCCCC]"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                isRemoteOnly ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Footer Submit Button */}
                            <div className="p-6 border-t border-[#E4E5E8] bg-white sticky bottom-0">
                                <button
                                    type="button"
                                    onClick={() => setIsFilterDrawerOpen(false)}
                                    className="w-full h-11 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none transition-colors cursor-pointer"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}
