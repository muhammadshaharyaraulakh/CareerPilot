import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    Crosshair,
    ArrowRight,
} from "lucide-react";
import TopHeader from "@/Components/Welcome/TopHeader";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import Footer from "@/Components/Welcome/Footer";

export default function FindEmployers({ auth }) {
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [activeTag, setActiveTag] = useState("PHP");
    const [currentPage, setCurrentPage] = useState(1);

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

    const employers = Array.from({ length: 18 }, (_, index) => ({
        id: index + 1,
        name: [
            "Dribbble",
            "Google Inc.",
            "Facebook",
            "Apple Inc.",
            "Amazon",
            "Figma",
        ][index % 6],
        featured: true,
        location: "Dhaka, Bangladesh",
        openPositions: 3,
        logo: [
            "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/dribbble.svg",
            "https://www.google.com/favicon.ico",
            "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/facebook.svg",
            "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/apple.svg",
            "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/amazon.svg",
            "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/figma.svg",
        ][index % 6],
        color: [
            "bg-[#EA4C89]",
            "bg-[#4285F4]",
            "bg-[#1877F2]",
            "bg-[#000000]",
            "bg-[#FF9900]",
            "bg-[#F24E1E]",
        ][index % 6],
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04 },
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
            <Head title="Find Employers - CareerPilot" />

            {/* Header Components */}
            <TopHeader activeLink="Employers" />
            <MainNavbar auth={auth} />

            {/* Sub-Header / Breadcrumb */}
            <div className="bg-[#F1F2F4] border-b border-[#E4E5E8] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1320px] mx-auto flex items-center justify-between">
                    <h1 className="text-base sm:text-lg font-bold text-[#18191C]">
                        Find Employers
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-[#767E94]">
                        <Link href="/" className="hover:text-[#0A65CC]">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-[#18191C] font-semibold">
                            Find Employers
                        </span>
                    </div>
                </div>
            </div>

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

                {/* Employers Card Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {employers.map((company) => (
                        <motion.div
                            key={company.id}
                            variants={itemVariants}
                            onClick={() => router.visit("/company-profile")}
                            className="bg-white border border-[#E4E5E8] hover:border-[#0A65CC] p-5 rounded-none transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4 group"
                        >
                            <div className="flex items-center gap-4">
                                {/* Logo Box */}
                                <div
                                    className={`w-12 h-12 ${company.color} rounded-none flex items-center justify-center p-2.5 shrink-0 shadow-xs`}
                                >
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-[#18191C] group-hover:text-[#0A65CC] transition-colors">
                                            {company.name}
                                        </h3>
                                        {company.featured && (
                                            <span className="px-2 py-0.5 bg-[#FFF0F0] text-[#E05151] text-[10px] font-bold rounded-none">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#767E94] flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-[#9199A3]" />
                                        <span>{company.location}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Open Position Button */}
                            <button
                                type="button"
                                className="w-full h-11 bg-[#E8F1FF] text-[#0A65CC] group-hover:bg-[#0A65CC] group-hover:text-white font-bold text-xs sm:text-sm rounded-none border-none transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Open Position ({company.openPositions})</span>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Circular Pagination */}
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

            {/* Footer Component */}
            <Footer />
        </div>
    );
}
