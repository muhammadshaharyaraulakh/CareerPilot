import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bookmark,
    ArrowRight,
    MapPin,
    Calendar,
    Clock,
    Briefcase,
    GraduationCap,
    Wallet,
    Link as LinkIcon,
    X,
    Check,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Share2,
    DollarSign,
    Globe,
} from "lucide-react";
import TopHeader from "@/Components/Welcome/TopHeader";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import Footer from "@/Components/Welcome/Footer";

export default function JobDetails({ auth }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [showApplySuccess, setShowApplySuccess] = useState(false);

    const handleApplySubmit = (e) => {
        e.preventDefault();
        setIsApplyModalOpen(false);
        setShowApplySuccess(true);
        setTimeout(() => setShowApplySuccess(false), 4000);
    };

    return (
        <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-[#F1F2F4]/30 text-[#18191C] font-sans flex flex-col justify-between antialiased">
            <Head title="Job Details - Senior UX Designer - CareerPilot" />

            {/* Header Components */}
            <TopHeader activeLink="Find Job" />
            <MainNavbar auth={auth} />

            {/* Sub Header / Breadcrumb Bar */}
            <div className="bg-[#F1F2F4] border-b border-[#E4E5E8] py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1320px] mx-auto flex items-center justify-between">
                    <h1 className="text-base sm:text-lg font-bold text-[#18191C]">
                        Job Details
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-[#767E94]">
                        <Link href="/" className="hover:text-[#0A65CC]">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/find-job" className="hover:text-[#0A65CC]">
                            Find Job
                        </Link>
                        <span>/</span>
                        <span className="text-[#767E94]">Graphics & Design</span>
                        <span>/</span>
                        <span className="text-[#18191C] font-semibold">Job Details</span>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <main className="flex-1 w-full max-w-[1320px] mx-auto px-4 py-8 space-y-8">
                {/* Apply Success Alert */}
                {showApplySuccess && (
                    <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                        <Check className="w-5 h-5" />
                        <span>
                            Your application for Senior UX Designer has been submitted successfully!
                        </span>
                    </div>
                )}

                {/* HERO HEADER CARD */}
                <div className="bg-white border border-[#E4E5E8] p-6 sm:p-8 rounded-none shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start sm:items-center gap-5">
                        {/* Facebook Logo */}
                        <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center shrink-0 shadow-md">
                            <svg
                                className="w-9 h-9 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                                    Senior UX Designer
                                </h2>
                                <span className="px-3 py-0.5 bg-[#EAF6ED] text-[#0BA02C] text-xs font-bold uppercase rounded-none">
                                    FULL-TIME
                                </span>
                                <span className="px-3 py-0.5 bg-[#FFF0F0] text-[#E05151] text-xs font-bold rounded-none">
                                    Featured
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#767E94]">
                                at <span className="font-semibold text-[#18191C]">Facebook</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className="p-3 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#D4E4FF] rounded-none border border-[#CEE0F5] transition-colors cursor-pointer"
                            title="Bookmark Job"
                        >
                            <Bookmark
                                className="w-5 h-5"
                                fill={isBookmarked ? "currentColor" : "none"}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsApplyModalOpen(true)}
                            className="h-12 px-7 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                        >
                            <span>Apply Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* MAIN 2-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: DESCRIPTION & REQUIREMENTS */}
                    <div className="lg:col-span-2 space-y-8 bg-white border border-[#E4E5E8] p-6 sm:p-8 rounded-none">
                        {/* Job Description */}
                        <div className="space-y-3">
                            <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                                Job Description
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!
                            </p>
                            <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.
                            </p>
                            <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform.
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Want to work with us? You're in good company!
                            </p>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-3">
                            <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                                Requirements
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                <li>
                                    Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on
                                </li>
                                <li>
                                    3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications
                                </li>
                                <li>Experience with HTML, JavaScript, CSS, PHP, Symphony and/or Laravel</li>
                                <li>Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc)</li>
                                <li>
                                    Have experience/awareness in Agile application development, commercial off-the-shelf software, middleware, servers and storage, and database management.
                                </li>
                                <li>Familiarity with version control and project management systems (e.g., Github, Jira)</li>
                                <li>Ambitious and hungry to grow your career in a fast-growing agency</li>
                            </ul>
                        </div>

                        {/* Desirable */}
                        <div className="space-y-3">
                            <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                                Desirable:
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                <li>
                                    Working knowledge of eCommerce platforms, ideally Shopify but also others e.g. Magento, WooCommerce, Visualsoft to enable seamless migrations.
                                </li>
                                <li>Working knowledge of payment gateways</li>
                                <li>API platform experience / Building restful APIs</li>
                            </ul>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-3">
                            <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                                Benefits
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
                                <li>28 days holiday (including bank holidays) rising by 1 day per year PLUS an additional day off on your birthday</li>
                                <li>Generous annual bonus.</li>
                                <li>Healthcare package</li>
                                <li>Paid community days to volunteer for a charity of your choice</li>
                                <li>£100 contribution for your own personal learning and development</li>
                                <li>Free Breakfast on Mondays and free snacks in the office</li>
                                <li>Access to Perkbox with numerous discounts plus free points from the company to spend as you wish.</li>
                                <li>Cycle 2 Work Scheme</li>
                                <li>Brand new MacBook Pro</li>
                                <li>Joining an agency on the cusp of exponential growth and being part of this exciting story.</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: OVERVIEW WIDGETS */}
                    <div className="space-y-6">
                        {/* Salary & Location Widget */}
                        <div className="bg-white border border-[#E4E5E8] p-6 rounded-none grid grid-cols-2 gap-4">
                            <div className="space-y-1 text-center border-r border-[#E4E5E8] pr-2">
                                <DollarSign className="w-6 h-6 text-[#0A65CC] mx-auto mb-1" />
                                <h4 className="text-xs text-[#767E94]">Salary (USD)</h4>
                                <p className="text-xs sm:text-sm font-bold text-[#0BA02C]">
                                    $100,000 - $120,000
                                </p>
                                <span className="text-[11px] text-[#9199A3]">Yearly salary</span>
                            </div>

                            <div className="space-y-1 text-center pl-2">
                                <Globe className="w-6 h-6 text-[#0A65CC] mx-auto mb-1" />
                                <h4 className="text-xs text-[#767E94]">Job Location</h4>
                                <p className="text-xs sm:text-sm font-bold text-[#18191C]">
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                        {/* Job Benefits Tags */}
                        <div className="bg-white border border-[#E4E5E8] p-6 rounded-none space-y-3">
                            <h3 className="text-xs font-bold text-[#18191C] uppercase tracking-wide">
                                Job Benefits
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "401k Salary",
                                    "Async",
                                    "Learning budget",
                                    "Vision Insurance",
                                    "4 day workweek",
                                    "Profit Sharing",
                                    "Free gym membership",
                                    "Equity Compensation",
                                    "No politics at work",
                                ].map((b) => (
                                    <span
                                        key={b}
                                        className="px-2.5 py-1 bg-[#EAF6ED] text-[#0BA02C] text-xs font-semibold rounded-none"
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Job Overview Widget */}
                        <div className="bg-white border border-[#E4E5E8] p-6 rounded-none space-y-4">
                            <h3 className="text-xs font-bold text-[#18191C] uppercase tracking-wide">
                                Job Overview
                            </h3>

                            <div className="grid grid-cols-3 gap-4 text-left">
                                <div className="space-y-1">
                                    <Calendar className="w-5 h-5 text-[#0A65CC]" />
                                    <span className="text-[10px] text-[#767E94] uppercase font-bold block">
                                        Job Posted:
                                    </span>
                                    <p className="text-xs font-bold text-[#18191C]">
                                        14 Jun, 2021
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <Clock className="w-5 h-5 text-[#0A65CC]" />
                                    <span className="text-[10px] text-[#767E94] uppercase font-bold block">
                                        Job Expire In:
                                    </span>
                                    <p className="text-xs font-bold text-[#18191C]">
                                        14 Aug, 2021
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <Briefcase className="w-5 h-5 text-[#0A65CC]" />
                                    <span className="text-[10px] text-[#767E94] uppercase font-bold block">
                                        Job Level:
                                    </span>
                                    <p className="text-xs font-bold text-[#18191C]">
                                        Entry Level
                                    </p>
                                </div>

                                <div className="space-y-1 pt-3">
                                    <Wallet className="w-5 h-5 text-[#0A65CC]" />
                                    <span className="text-[10px] text-[#767E94] uppercase font-bold block">
                                        Experience:
                                    </span>
                                    <p className="text-xs font-bold text-[#18191C]">
                                        $50k-80k/month
                                    </p>
                                </div>

                                <div className="space-y-1 pt-3">
                                    <GraduationCap className="w-5 h-5 text-[#0A65CC]" />
                                    <span className="text-[10px] text-[#767E94] uppercase font-bold block">
                                        Education:
                                    </span>
                                    <p className="text-xs font-bold text-[#18191C]">
                                        Graduation
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Share Job Widget */}
                        <div className="bg-white border border-[#E4E5E8] p-6 rounded-none space-y-3">
                            <h3 className="text-xs font-bold text-[#18191C] uppercase tracking-wide">
                                Share this job:
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => alert("Job link copied!")}
                                    className="px-3 py-2 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#0A65CC] font-semibold text-xs rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <LinkIcon className="w-3.5 h-3.5" />
                                    <span>Copy Links</span>
                                </button>

                                <div className="flex items-center gap-2">
                                    <a
                                        href="#linkedin"
                                        className="p-2 bg-[#E8F1FF] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors rounded-none"
                                    >
                                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#facebook"
                                        className="p-2 bg-[#E8F1FF] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors rounded-none"
                                    >
                                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                            <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#twitter"
                                        className="p-2 bg-[#E8F1FF] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors rounded-none"
                                    >
                                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Job Tags Widget */}
                        <div className="bg-white border border-[#E4E5E8] p-6 rounded-none space-y-3">
                            <h3 className="text-xs font-bold text-[#18191C] uppercase tracking-wide">
                                Job tags:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Back-end", "PHP", "Laravel", "Development", "Front-end"].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 bg-[#F1F2F4] text-[#5E6670] text-xs font-medium rounded-none hover:bg-[#E4E5E8] cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Remote Job Widget */}
                        <div className="bg-white border border-[#E4E5E8] p-6 rounded-none text-center space-y-2">
                            <Briefcase className="w-8 h-8 text-[#0A65CC] mx-auto" />
                            <h4 className="text-sm font-bold text-[#18191C]">Remote Job</h4>
                            <p className="text-xs text-[#767E94]">Worldwide</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* APPLY JOB MODAL POPUP (Image 4) */}
            <AnimatePresence>
                {isApplyModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsApplyModalOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="relative w-full max-w-lg bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-[#E4E5E8] flex items-center justify-between">
                                <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                                    Apply Job: Senior UX Designer
                                </h3>
                                <button
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#F1F2F4] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleApplySubmit} className="p-6 space-y-5">
                                {/* Choose Resume / Apply as Jobpilot Profile Option */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Choose Resume
                                    </label>
                                    <select
                                        value={selectedResume}
                                        onChange={(e) => setSelectedResume(e.target.value)}
                                        required
                                        className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC] cursor-pointer"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Professional Resume.pdf">
                                            Professional Resume.pdf
                                        </option>
                                        <option value="Product Designer.pdf">
                                            Product Designer.pdf
                                        </option>
                                        <option value="Visual Designer.pdf">
                                            Visual Designer.pdf
                                        </option>
                                        <option value="Apply with Jobpilot Profile">
                                            Apply with Jobpilot Profile
                                        </option>
                                    </select>
                                </div>

                                {/* Cover Letter Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Cover Letter
                                    </label>
                                    <div className="border border-[#E4E5E8] bg-white rounded-none overflow-hidden focus-within:border-[#0A65CC]">
                                        <textarea
                                            rows={5}
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            placeholder="Write down your biography here. Let the employers know who you are..."
                                            className="w-full p-3.5 text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none focus:outline-none bg-transparent resize-y"
                                        />
                                        <div className="p-2 bg-[#F8F9FA] border-t border-[#E4E5E8] flex items-center gap-2 text-[#767E94]">
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <Bold className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <Italic className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <Underline className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <Strikethrough className="w-4 h-4" />
                                            </button>
                                            <span className="h-4 w-px bg-[#E4E5E8] mx-1" />
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <List className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer"
                                            >
                                                <ListOrdered className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer Buttons */}
                                <div className="flex items-center justify-between pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsApplyModalOpen(false)}
                                        className="h-11 px-6 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#D4E4FF] font-bold text-xs sm:text-sm rounded-none border-none transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="h-11 px-7 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                                    >
                                        <span>Apply Now</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}
