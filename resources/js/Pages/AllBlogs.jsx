import React, { useState, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MagnifyingGlassIcon,
    CalendarIcon,
    ChatBubbleLeftEllipsisIcon,
    ArrowRightIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FunnelIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import TopHeader from "@/Components/Welcome/TopHeader";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import Footer from "@/Components/Welcome/Footer";

export default function AllBlogs({ auth, blogs }) {
    // Front-end mock data with 10 detailed blog posts if props from backend are not yet populated
    const defaultBlogsData = {
        current_page: 1,
        last_page: 3,
        total: 28,
        per_page: 10,
        data: [
            {
                id: 1,
                title: "Proin sit amet massa eget odio consectetur ultricies.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 12, 2021",
                comments_count: 25,
                category: "Code & Programming",
                image: null, // Square/Rectangle slot where image will fit 100% from backend
            },
            {
                id: 2,
                title: "Praesent tristique sagittis malesuada. Nulla vulputate pretium",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 12, 2021",
                comments_count: 25,
                category: "Code & Programming",
                image: null,
            },
            {
                id: 3,
                title: "Integer volutpat fringilla ipsum, nec tempor risus facilisis eget.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 12, 2021",
                comments_count: 25,
                category: "Digital Marketing",
                image: null,
            },
            {
                id: 4,
                title: "Pellentesque lobortis diam in dictum maximus.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 12, 2021",
                comments_count: 25,
                category: "Graphics & Design",
                image: null,
            },
            {
                id: 5,
                title: "Class aptent taciti sociosqu ad litora torquent per.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 12, 2021",
                comments_count: 25,
                category: "Finance & Accounting",
                image: null,
            },
            {
                id: 6,
                title: "Curabitur feugiat urna quis ante aliquet, nec tincidunt sem mollis.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 12, 2021",
                comments_count: 25,
                category: "Code & Programming",
                image: null,
            },
            {
                id: 7,
                title: "Mauris at sapien non ex hendrerit accumsan et ac ipsum.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 10, 2021",
                comments_count: 18,
                category: "Data Science",
                image: null,
            },
            {
                id: 8,
                title: "Aenean imperdiet massa at eros varius cursus elementum.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 08, 2021",
                comments_count: 14,
                category: "Video & Animation",
                image: null,
            },
            {
                id: 9,
                title: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 05, 2021",
                comments_count: 32,
                category: "Health & Care",
                image: null,
            },
            {
                id: 10,
                title: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
                excerpt:
                    "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
                date: "Nov 01, 2021",
                comments_count: 9,
                category: "Musica & Audio",
                image: null,
            },
        ],
        links: [
            { url: null, label: "&laquo; Previous", active: false },
            { url: "/blogs?page=1", label: "1", active: true },
            { url: "/blogs?page=2", label: "2", active: false },
            { url: "/blogs?page=3", label: "3", active: false },
            { url: "/blogs?page=4", label: "4", active: false },
            { url: "/blogs?page=5", label: "5", active: false },
            { url: "/blogs?page=2", label: "Next &raquo;", active: false },
        ],
    };

    // Use backend prop if provided, else fallback to default front-end data
    const activeBlogList = blogs?.data ? blogs : defaultBlogsData;

    // Filter and Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("Code & Programming");
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(
        activeBlogList.current_page || 1
    );

    // Sidebar Categories List with mock counts
    const categories = [
        { name: "Graphics & Design", count: 14 },
        { name: "Code & Programming", count: 42 },
        { name: "Digital Marketig", count: 19 },
        { name: "Video & Animation", count: 8 },
        { name: "Musica & Audio", count: 12 },
        { name: "Finance & Accounting", count: 23 },
        { name: "Health & Care", count: 16 },
        { name: "Data Science", count: 27 },
    ];

    // Recent Posts for Widget
    const recentPosts = activeBlogList.data.slice(2, 5);

    // Filter Logic
    const filteredBlogs = useMemo(() => {
        return activeBlogList.data.filter((post) => {
            const matchesSearch =
                !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                !selectedCategory || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [activeBlogList.data, searchQuery, selectedCategory]);

    // Handle Page Navigation
    const handlePageChange = (pageNumber, pageUrl) => {
        setCurrentPage(pageNumber);
        if (blogs?.data && pageUrl) {
            router.get(
                pageUrl,
                {},
                { preserveState: true, preserveScroll: true }
            );
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <Head title="Blogs - CareerPilot" />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Header Navigation Bar (TopHeader + MainNavbar) */}
                <TopHeader />
                <MainNavbar auth={auth} />

                {/* 2. Main Content Grid (Sidebar + Blog List) */}
                <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                        {/* ================= LEFT SIDEBAR ================= */}
                        <aside className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6">
                            {/* Widget 1: Search Box */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-xs"
                            >
                                <h3 className="text-base font-normal text-[#18191C] mb-4">
                                    Search
                                </h3>
                                <div className="relative w-full">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-[#0A65CC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search"
                                        className="w-full h-12 pl-10 pr-9 bg-white border border-[#E4E5E8] rounded-md text-sm text-[#18191C] placeholder:text-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9199A3] hover:text-[#18191C] p-1 cursor-pointer"
                                        >
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>

                            {/* Widget 2: Category Accordion */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-xs"
                            >
                                <button
                                    onClick={() =>
                                        setIsCategoryOpen(!isCategoryOpen)
                                    }
                                    className="w-full flex items-center justify-between text-base font-normal text-[#18191C] mb-4 focus:outline-none cursor-pointer"
                                >
                                    <span>Category</span>
                                    {isCategoryOpen ? (
                                        <ChevronUpIcon className="w-4 h-4 text-[#5E6670]" />
                                    ) : (
                                        <ChevronDownIcon className="w-4 h-4 text-[#5E6670]" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isCategoryOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-3.5 pl-3 sm:pl-4 mt-4 pt-1">
                                                {categories.map((cat, idx) => {
                                                    const isChecked =
                                                        selectedCategory ===
                                                        cat.name;
                                                    return (
                                                        <label
                                                            key={idx}
                                                            onClick={() =>
                                                                setSelectedCategory(
                                                                    isChecked
                                                                        ? ""
                                                                        : cat.name
                                                                )
                                                            }
                                                            className="flex items-center justify-between text-xs sm:text-sm text-[#5E6670] hover:text-[#0A65CC] cursor-pointer group transition-colors"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onChange={() => {}}
                                                                    className="w-4 h-4 rounded text-[#0A65CC] border-[#E4E5E8] focus:ring-[#0A65CC] cursor-pointer"
                                                                />
                                                                <span
                                                                    className={
                                                                        isChecked
                                                                            ? "font-semibold text-[#18191C]"
                                                                            : "group-hover:text-[#0A65CC]"
                                                                    }
                                                                >
                                                                    {cat.name}
                                                                </span>
                                                            </div>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Widget 3: Recent Post */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-xs"
                            >
                                <h3 className="text-base font-normal text-[#18191C] mb-4">
                                    Recent Post
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {recentPosts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="flex items-center gap-3.5 group cursor-pointer"
                                        >
                                            {/* Square Box Container where backend image will fit 100% */}
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#F1F2F4] border border-[#E4E5E8] rounded-lg overflow-hidden relative flex items-center justify-center">
                                                {post.image ? (
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#E4E5E8]/60 to-[#F8F9FA] flex flex-col items-center justify-center p-1">
                                                        <div className="w-6 h-6 rounded border border-dashed border-[#0A65CC]/30 flex items-center justify-center text-[10px] text-[#0A65CC] font-bold">
                                                            IMG
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 text-[11px] text-[#767E94] mb-1">
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span>
                                                        {post.comments_count}{" "}
                                                        Comments
                                                    </span>
                                                </div>
                                                <h4 className="text-xs sm:text-sm font-medium text-[#18191C] group-hover:text-[#0A65CC] line-clamp-2 leading-snug transition-colors">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </aside>

                        {/* ================= RIGHT BLOG LIST AREA ================= */}
                        <section className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
                            {/* Active Filters Bar */}
                            {(selectedCategory || searchQuery) && (
                                <div className="bg-white border border-[#E4E5E8] rounded-xl p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5E6670]">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className=" text-[#18191C]">
                                            Active Filters:
                                        </span>
                                        {selectedCategory && (
                                            <span className="bg-[#0A65CC]/10 text-[#0A65CC] font-medium px-3 py-1.5 rounded flex items-center gap-1.5">
                                                Category: {selectedCategory}
                                                <XMarkIcon
                                                    onClick={() =>
                                                        setSelectedCategory("")
                                                    }
                                                    className="w-3.5 h-3.5 cursor-pointer hover:text-[#18191C]"
                                                />
                                            </span>
                                        )}
                                        {searchQuery && (
                                            <span className="bg-[#0A65CC]/10 text-[#0A65CC] font-medium px-2.5 py-1 rounded flex items-center gap-1.5">
                                                Search: "{searchQuery}"
                                                <XMarkIcon
                                                    onClick={() =>
                                                        setSearchQuery("")
                                                    }
                                                    className="w-3.5 h-3.5 cursor-pointer hover:text-[#18191C]"
                                                />
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory("");
                                            setSearchQuery("");
                                        }}
                                        className="text-[#0A65CC] hover:underline font-medium"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}

                            {/* Blog Items Container */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col gap-6"
                            >
                                {filteredBlogs.length > 0 ? (
                                    filteredBlogs.map((blog) => (
                                        <motion.article
                                            key={blog.id}
                                            variants={cardVariants}
                                            whileHover={{ y: -2 }}
                                            className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center md:items-stretch gap-6 group"
                                        >
                                            {/* Image Container Box (Matching Image 2 closely - rounded-md box fitting backend image 100%) */}
                                            <div className="w-full md:w-[280px] lg:w-[320px] h-52 sm:h-56 md:h-auto shrink-0 bg-[#F1F2F4] border border-[#E4E5E8] rounded-lg overflow-hidden relative flex items-center justify-center group-hover:border-[#0A65CC]/30 transition-colors">
                                                {blog.image ? (
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    /* Box placeholder matching 100% fit requirement */
                                                    <div className="w-full h-full min-h-[190px] bg-gradient-to-br from-[#F8F9FA] via-[#E4E5E8]/40 to-[#F1F2F4] flex flex-col items-center justify-center p-6 text-center">
                                                        <div className="w-12 h-12 rounded-xl bg-white border border-[#E4E5E8] shadow-xs flex items-center justify-center text-[#0A65CC] mb-2 group-hover:scale-110 transition-transform">
                                                            <svg
                                                                className="w-6 h-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-[11px] font-semibold text-[#767E94] tracking-wider uppercase">
                                                            Blog Image Slot
                                                        </span>
                                                        <span className="text-[10px] text-[#9199A3] mt-0.5">
                                                            Fits 100% from
                                                            backend
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Content Area */}
                                            <div className="flex-1 flex flex-col justify-between text-left py-1 w-full">
                                                <div>
                                                    {/* Meta Metadata Row */}
                                                    <div className="flex items-center gap-4 text-xs text-[#767E94] mb-2.5">
                                                        <div className="flex items-center gap-1.5">
                                                            <CalendarIcon className="w-4 h-4 text-[#0A65CC]" />
                                                            <span>
                                                                {blog.date}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#0A65CC]" />
                                                            <span>
                                                                {
                                                                    blog.comments_count
                                                                }{" "}
                                                                Comments
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#18191C] group-hover:text-[#0A65CC] leading-snug mb-2.5 transition-colors">
                                                        {blog.title}
                                                    </h2>

                                                    {/* Excerpt */}
                                                    <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed line-clamp-3 mb-4">
                                                        {blog.excerpt}
                                                    </p>
                                                </div>

                                                {/* Read More Action Link */}
                                                <div>
                                                    <Link
                                                        href="/blog/1"
                                                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A65CC] hover:text-[#0852A8] transition-all group/btn cursor-pointer"
                                                    >
                                                        <span>Read more</span>
                                                        <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))
                                ) : (
                                    <div className="bg-white border border-[#E4E5E8] rounded-xl p-12 text-center">
                                        <h3 className="text-lg font-bold text-[#18191C] mb-2">
                                            No blogs found
                                        </h3>
                                        <p className="text-sm text-[#5E6670] mb-4">
                                            Try adjusting your search query or
                                            clear selected category filter.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory("");
                                                setSearchQuery("");
                                            }}
                                            className="px-4 py-2 bg-[#0A65CC] text-white text-xs font-semibold rounded-lg"
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                )}
                            </motion.div>

                            {/* ================= PAGINATION BAR ================= */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-6 flex items-center justify-center"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {/* Previous Page Arrow */}
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                Math.max(1, currentPage - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                            currentPage === 1
                                                ? "text-[#C8CCD1] cursor-not-allowed"
                                                : "text-[#0A65CC] hover:bg-[#0A65CC]/10 cursor-pointer"
                                        }`}
                                    >
                                        <ChevronLeftIcon className="w-5 h-5" />
                                    </button>

                                    {/* Page Number Buttons */}
                                    {[1, 2, 3, 4, 5].map((pageNum) => {
                                        const isActive =
                                            currentPage === pageNum;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() =>
                                                    handlePageChange(pageNum)
                                                }
                                                className={`w-10 h-10 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
                                                    isActive
                                                        ? "bg-[#0A65CC] text-white shadow-xs"
                                                        : "bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#5E6670] hover:text-[#18191C]"
                                                }`}
                                            >
                                                {pageNum < 10
                                                    ? `0${pageNum}`
                                                    : pageNum}
                                            </button>
                                        );
                                    })}

                                    {/* Next Page Arrow */}
                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                Math.min(5, currentPage + 1)
                                            )
                                        }
                                        disabled={currentPage === 5}
                                        className={`w-10 h-10 rounded-full bg-[#E8F0FB] flex items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer shadow-xs`}
                                    >
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        </section>
                    </div>
                </main>

                {/* 3. Footer Component */}
                <Footer />
            </div>
        </>
    );
}
