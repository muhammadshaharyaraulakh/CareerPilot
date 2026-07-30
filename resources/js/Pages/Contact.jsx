import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import MainNavbar from "@/Components/Welcome/MainNavbar";

export default function Contact({ auth }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 30, scale: 0.96 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <Head title="Contact Us - CareerPilot" />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Main Navigation Bar Only (No Top Header) */}
                <MainNavbar auth={auth} />

                {/* 2. Sub Header / Breadcrumb Bar */}
                <div className="w-full bg-[#F1F2F4] border-b border-[#E4E5E8] py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[1320px] mx-auto flex items-center justify-between">
                        <h1 className="text-lg sm:text-xl font-medium text-[#18191C]">
                            Contact
                        </h1>
                        {/* Hidden on screens smaller than 576px */}
                        <nav className="hidden min-[576px]:flex items-center gap-2 text-xs sm:text-sm text-[#767E94]">
                            <Link
                                href="/"
                                className="hover:text-[#0A65CC] transition-colors"
                            >
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[#18191C] font-medium">
                                Contact
                            </span>
                        </nav>
                    </div>
                </div>

                {/* 3. Main Hero & Contact Form Section */}
                <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex items-center justify-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full"
                    >
                        {/* Left Column: Who We Are & Customer Care Info (Hidden on mobile/small screens below lg) */}
                        <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 flex-col items-start text-left">
                            <motion.span
                                variants={fadeInUp}
                                className="text-xs sm:text-sm font-semibold text-[#0A65CC] tracking-wide mb-2 sm:mb-3"
                            >
                                Who we are
                            </motion.span>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-[52px] font-medium text-[#18191C] tracking-tight leading-[1.15] mb-4 sm:mb-6"
                            >
                                We care about customer services
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed mb-6 sm:mb-8 max-w-lg"
                            >
                                Want to chat? We'd love to hear from you! Get in
                                touch with our Customer Success Team to inquire
                                about speaking events, advertising rates, or
                                just say hello.
                            </motion.p>

                            <motion.div variants={fadeInUp}>
                                <a
                                    href="mailto:support@careerpilot.com"
                                    className="h-12 px-6 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm  transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                                >
                                    Email Support
                                </a>
                            </motion.div>
                        </div>

                        {/* Right Column: Get in Touch Card / Form (Centered on mobile) */}
                        <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end w-full max-w-xl mx-auto lg:max-w-none">
                            <motion.div
                                variants={fadeInRight}
                                className="bg-white border border-[#E4E5E8] rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#000000]/5 max-w-xl w-full"
                            >
                                <h2 className="text-xl sm:text-2xl font-semibold text-[#18191C] mb-6">
                                    Get in Touch
                                </h2>

                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-md text-[#0BA02C] text-sm font-medium flex items-center gap-2"
                                    >
                                        <span>✓</span> Thank you! Your message
                                        has been sent successfully. We will get
                                        back to you shortly.
                                    </motion.div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4 sm:gap-5"
                                    >
                                        {/* Name Field */}
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                                            />
                                        </div>

                                        {/* Subject Field */}
                                        <div>
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Subjects"
                                                className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                                            />
                                        </div>

                                        {/* Message Field */}
                                        <div>
                                            <textarea
                                                name="message"
                                                rows="5"
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Message"
                                                className="w-full p-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full h-12 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm  transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                                        >
                                            <span>Send Message</span>
                                            <span className="rotate-300">
                                                <PaperAirplaneIcon className="w-4 h-4" />
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
