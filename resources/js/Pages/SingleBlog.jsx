import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MagnifyingGlassIcon,
    CalendarIcon,
    ChatBubbleLeftEllipsisIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    XMarkIcon,
    ShareIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import TopHeader from "@/Components/Welcome/TopHeader";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import Footer from "@/Components/Welcome/Footer";

export default function SingleBlog({ auth, blog }) {
    // Default mock data for single blog post if backend prop is not supplied
    const defaultBlog = {
        id: 1,
        title: "20 cool fonts for web and graphic design",
        author: "Kevin Gilbert",
        author_avatar: null,
        date: "Nov 12, 2021",
        comments_count: 25,
        category: "Graphics & Design",
        image: null, // Large Hero Image container slot for 100% backend image fit
        intro:
            "Check out these 20 cool fonts for your next web or graphic design project. Typography, font, and typeface are focal design elements.",
        paragraph1:
            "Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you will find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And do not worry, we have included both free and paid fonts!",
        paragraph2:
            "The Graphik family has 18 different styles, from bold to regular, compact light, semibold, medium, and so on. Graphik is a gorgeous typeface with a wide range of font styles, each contemporary in its own respect.",
        quote:
            "Vintage meets vogue is the only way to describe this serif typeface. Neue World encompasses the mode high fashion aesthetic of the 1960s with a commercial take.",
        subheading: "EB Garamond and Relative (free+paid).",
        paragraph3:
            "Relative is an OpenType sans serif font known for its range. Designed by The Entente in 2011, this type font family comes in two halves: Book to Black (with italics) and faux monospace. This range gives you versatility and readability. Coming in four weights and 12 styles, Relative is great for both personal and commercial use due to its duality.",
        paragraph4:
            "If you are looking for a serif font that is both refined and versatile but want to explore typefaces outside of the typical Playfair Display, EB Garamond is the font you have been seeking.",
        galleryImages: [null, null, null, null], // 4-grid image container boxes for 100% backend image fit
    };

    const currentBlog = blog || defaultBlog;

    // Sidebar States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Graphics & Design");
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);

    // Comment Form State
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);

    // Mock Comments List matching screenshot design
    const [commentsList, setCommentsList] = useState([
        {
            id: 1,
            author: "Cody Fisher",
            time: "1 sec ago",
            text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
            replies: [],
        },
        {
            id: 2,
            author: "Bessie Cooper",
            time: "10 min ago",
            text: "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
            replies: [
                {
                    id: 21,
                    author: "Bessie Cooper",
                    time: "10 min ago",
                    text: "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                },
                {
                    id: 22,
                    author: "Bessie Cooper",
                    time: "10 min ago",
                    text: "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                },
                {
                    id: 23,
                    author: "Bessie Cooper",
                    time: "10 min ago",
                    text: "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                },
            ],
        },
        {
            id: 3,
            author: "Courtney Henry",
            time: "21 min ago",
            text: "Exercitation veniam consequat sunt nostrud amet.",
            replies: [],
        },
        {
            id: 4,
            author: "Jerome Bell",
            time: "30 min ago",
            text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
            replies: [],
        },
    ]);

    // Categories List
    const categories = [
        { name: "Graphics & Design", count: 14 },
        { name: "Code & Programming", count: 42 },
        { name: "Digital Marketing", count: 19 },
        { name: "Video & Animation", count: 8 },
        { name: "Music & Audio", count: 12 },
        { name: "Finance & Accounting", count: 23 },
        { name: "Health & Care", count: 16 },
        { name: "Data Science", count: 27 },
    ];

    // Recent Posts for Sidebar Widget
    const recentPosts = [
        {
            id: 101,
            title: "Proin sit amet massa eget odio consectetur ultricies.",
            date: "Nov 12, 2021",
            comments_count: 25,
            image: null,
        },
        {
            id: 102,
            title: "Praesent tristique sagittis malesuada. Nulla vulputate pretium",
            date: "Nov 12, 2021",
            comments_count: 25,
            image: null,
        },
        {
            id: 103,
            title: "Integer volutpat fringilla ipsum, nec tempor risus facilisis eget.",
            date: "Nov 12, 2021",
            comments_count: 25,
            image: null,
        },
    ];

    const handlePostComment = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        const newComment = {
            id: Date.now(),
            author: auth?.user?.name || "Guest User",
            time: "Just now",
            text: commentText,
            replies: [],
        };
        setCommentsList([newComment, ...commentsList]);
        setCommentText("");
    };

    const handlePostReply = (parentId) => {
        if (!replyText.trim()) return;
        setCommentsList(
            commentsList.map((item) => {
                if (item.id === parentId) {
                    return {
                        ...item,
                        replies: [
                            ...item.replies,
                            {
                                id: Date.now(),
                                author: auth?.user?.name || "Guest User",
                                time: "Just now",
                                text: replyText,
                            },
                        ],
                    };
                }
                return item;
            })
        );
        setReplyText("");
        setActiveReplyId(null);
    };

    return (
        <>
            <Head title={`${currentBlog.title} - CareerPilot`} />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Top Header & Main Navigation Bar */}
                <TopHeader />
                <MainNavbar auth={auth} />

                {/* 2. Main Container (Blog Detail Main Content + Sidebar) */}
                <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* ================= LEFT MAIN ARTICLE AREA ================= */}
                        <article className="lg:col-span-8 xl:col-span-8 flex flex-col">
                            {/* Blog Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] leading-tight mb-4"
                            >
                                {currentBlog.title}
                            </motion.h1>

                            {/* Author & Metadata Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#767E94] mb-6 pb-6 border-b border-[#E4E5E8]"
                            >
                                {/* Author */}
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-[#0A65CC]/10 text-[#0A65CC] font-bold text-xs flex items-center justify-center overflow-hidden border border-[#0A65CC]/20">
                                        {currentBlog.author_avatar ? (
                                            <img
                                                src={currentBlog.author_avatar}
                                                alt={currentBlog.author}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span>
                                                {currentBlog.author
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-semibold text-[#18191C]">
                                        {currentBlog.author}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-1.5">
                                    <CalendarIcon className="w-4 h-4 text-[#0A65CC]" />
                                    <span>{currentBlog.date}</span>
                                </div>

                                {/* Comments Count */}
                                <div className="flex items-center gap-1.5">
                                    <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#0A65CC]" />
                                    <span>{currentBlog.comments_count} Comments</span>
                                </div>
                            </motion.div>

                            {/* Main Hero Image Slot Container (Fitting backend images 100%) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="w-full h-[260px] sm:h-[380px] md:h-[440px] lg:h-[480px] bg-[#F1F2F4] border border-[#E4E5E8] rounded-2xl overflow-hidden relative flex items-center justify-center mb-8 shadow-xs"
                            >
                                {currentBlog.image ? (
                                    <img
                                        src={currentBlog.image}
                                        alt={currentBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    /* Box Placeholder slot fitting 100% backend image */
                                    <div className="w-full h-full bg-gradient-to-br from-[#F8F9FA] via-[#E4E5E8]/40 to-[#F1F2F4] flex flex-col items-center justify-center p-6 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-white border border-[#E4E5E8] shadow-xs flex items-center justify-center text-[#0A65CC] mb-3">
                                            <svg
                                                className="w-8 h-8"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-xs sm:text-sm font-semibold text-[#18191C] tracking-wide uppercase">
                                            Featured Image Container Slot
                                        </span>
                                        <span className="text-xs text-[#767E94] mt-1">
                                            Dynamic backend image will fit 100% here
                                        </span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Article Body Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className="prose prose-slate max-w-none text-sm sm:text-base text-[#5E6670] leading-relaxed flex flex-col gap-5"
                            >
                                {/* Lead Highlight Paragraph */}
                                <p className="text-base sm:text-lg font-semibold text-[#18191C] leading-snug">
                                    {currentBlog.intro}
                                </p>

                                <p>{currentBlog.paragraph1}</p>

                                <p>{currentBlog.paragraph2}</p>

                                {/* Featured Blockquote Box */}
                                <div className="bg-[#F0F5FC] border-l-4 border-[#0A65CC] p-6 sm:p-8 rounded-r-2xl my-4 relative shadow-xs">
                                    <div className="flex gap-4">
                                        <span className="text-3xl sm:text-4xl text-[#0A65CC] font-serif leading-none select-none">
                                            “
                                        </span>
                                        <p className="text-sm sm:text-base font-medium text-[#18191C] italic leading-relaxed">
                                            {currentBlog.quote}
                                        </p>
                                    </div>
                                </div>

                                {/* Subheading */}
                                <h3 className="text-lg sm:text-xl font-bold text-[#18191C] mt-4 mb-1">
                                    {currentBlog.subheading}
                                </h3>

                                <p>{currentBlog.paragraph3}</p>
                                <p>{currentBlog.paragraph4}</p>

                                {/* 4-Grid Image Gallery Box Slot Container */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
                                    {currentBlog.galleryImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="w-full h-48 sm:h-56 md:h-60 bg-[#F1F2F4] border border-[#E4E5E8] rounded-xl overflow-hidden relative flex items-center justify-center shadow-xs"
                                        >
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt={`Gallery Image ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#F8F9FA] via-[#E4E5E8]/50 to-[#F1F2F4] flex flex-col items-center justify-center p-4 text-center">
                                                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E5E8] shadow-xs flex items-center justify-center text-[#0A65CC] mb-2">
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1.5}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="text-[11px] font-semibold text-[#767E94]">
                                                        Image Slot {idx + 1}
                                                    </span>
                                                    <span className="text-[10px] text-[#9199A3]">
                                                        100% backend fit
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Share Post Section Bar */}
                            <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-[#E4E5E8] my-8">
                                <span className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    Share this post:
                                </span>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <button
                                        type="button"
                                        className="h-9 px-3.5 bg-[#F1F2F4] hover:bg-[#1877F2] hover:text-white text-[#1877F2] text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        Facebook
                                    </button>
                                    <button
                                        type="button"
                                        className="h-9 px-3.5 bg-[#F1F2F4] hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                                        </svg>
                                        Twitter
                                    </button>
                                    <button
                                        type="button"
                                        className="h-9 px-3.5 bg-[#F1F2F4] hover:bg-[#E60023] hover:text-white text-[#E60023] text-xs font-semibold rounded-md flex items-center gap-2 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.627 0 11.993-5.367 11.993-11.987C24.01 5.367 18.644 0 12.017 0z" />
                                        </svg>
                                        Pinterest
                                    </button>
                                </div>
                            </div>

                            {/* Comments Form Section */}
                            <section className="mt-4 mb-8">
                                <h3 className="text-lg sm:text-xl font-bold text-[#18191C] mb-4">
                                    Write a Comment
                                </h3>
                                <form onSubmit={handlePostComment} className="flex flex-col gap-3">
                                    <textarea
                                        rows={4}
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Share your thoughts on this post..."
                                        className="w-full p-4 bg-white border border-[#E4E5E8] rounded-xl text-sm text-[#18191C] placeholder:text-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all resize-y"
                                    />
                                    <div>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0852A8] text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                                        >
                                            Post A Comment
                                        </button>
                                    </div>
                                </form>
                            </section>

                            {/* Comments Display List */}
                            <section className="mt-6">
                                <h3 className="text-lg sm:text-xl font-bold text-[#18191C] mb-6">
                                    Comments
                                </h3>

                                <div className="flex flex-col gap-6">
                                    {commentsList.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col gap-3 pb-6 border-b border-[#E4E5E8]"
                                        >
                                            {/* Single Comment Row */}
                                            <div className="flex items-start gap-3.5">
                                                <div className="w-10 h-10 rounded-full bg-[#0A65CC]/10 text-[#0A65CC] font-bold text-xs flex items-center justify-center shrink-0">
                                                    {item.author
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="text-sm font-bold text-[#18191C]">
                                                            {item.author}
                                                        </h4>
                                                        <span className="text-xs text-[#9199A3]">
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed mb-2">
                                                        {item.text}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveReplyId(
                                                                activeReplyId === item.id
                                                                    ? null
                                                                    : item.id
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A65CC] hover:underline cursor-pointer"
                                                    >
                                                        <ChatBubbleLeftEllipsisIcon className="w-3.5 h-3.5" />
                                                        <span>
                                                            Reply
                                                            {item.replies.length > 0 &&
                                                                ` (${item.replies.length < 10 ? `0${item.replies.length}` : item.replies.length})`}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Reply Input Field */}
                                            {activeReplyId === item.id && (
                                                <div className="ml-8 sm:ml-12 mt-2 flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        value={replyText}
                                                        onChange={(e) =>
                                                            setReplyText(e.target.value)
                                                        }
                                                        placeholder="Share your thoughts on this reply?"
                                                        className="flex-1 h-10 px-3.5 bg-white border border-[#E4E5E8] rounded-md text-xs text-[#18191C] placeholder:text-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePostReply(item.id)}
                                                        className="h-10 px-4 bg-[#0A65CC] hover:bg-[#0852A8] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer shrink-0"
                                                    >
                                                        Post Reply
                                                    </button>
                                                </div>
                                            )}

                                            {/* Nested Replies List */}
                                            {item.replies && item.replies.length > 0 && (
                                                <div className="ml-6 sm:ml-10 flex flex-col gap-4 mt-2 pl-4 border-l-2 border-[#E4E5E8]">
                                                    {item.replies.map((reply) => (
                                                        <div
                                                            key={reply.id}
                                                            className="flex items-start gap-3"
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-[#0A65CC]/10 text-[#0A65CC] font-bold text-xs flex items-center justify-center shrink-0">
                                                                {reply.author
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h5 className="text-xs font-bold text-[#18191C]">
                                                                        {reply.author}
                                                                    </h5>
                                                                    <span className="text-[11px] text-[#9199A3]">
                                                                        {reply.time}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-[#5E6670] leading-relaxed mb-1">
                                                                    {reply.text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-left">
                                    <button
                                        type="button"
                                        className="px-5 py-2.5 bg-[#E8F0FB] hover:bg-[#0A65CC] hover:text-white text-[#0A65CC] text-xs font-semibold rounded-md transition-all cursor-pointer shadow-xs"
                                    >
                                        Load More
                                    </button>
                                </div>
                            </section>
                        </article>

                        {/* ================= RIGHT SIDEBAR ================= */}
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
                                        onChange={(e) => setSearchQuery(e.target.value)}
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
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
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
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-3.5 pl-3 sm:pl-4 mt-4 pt-1">
                                                {categories.map((cat, idx) => {
                                                    const isChecked = selectedCategory === cat.name;
                                                    return (
                                                        <label
                                                            key={idx}
                                                            onClick={() =>
                                                                setSelectedCategory(
                                                                    isChecked ? "" : cat.name
                                                                )
                                                            }
                                                            className="flex items-center justify-between text-xs sm:text-sm text-[#5E6670] hover:text-[#0A65CC] cursor-pointer group transition-colors"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
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
                                                    <span>{post.comments_count} Comments</span>
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
                    </div>
                </main>

                {/* 3. Footer */}
                <Footer />
            </div>
        </>
    );
}
