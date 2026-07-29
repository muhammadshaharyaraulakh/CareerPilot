import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function ComingSoon() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [imgSrc, setImgSrc] = useState("/images/banners/ComingSoon.png");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
        hidden: { opacity: 0, x: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <Head title="Coming Soon - CareerPilot" />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between p-4 sm:p-8 lg:p-12 antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Header / Logo Bar */}
                <motion.header
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[1320px] mx-auto flex items-center justify-between py-2"
                >
                    <Link href="/" className="flex items-center shrink-0 group">
                        <ApplicationLogo className="h-8 sm:h-9 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-105" />
                    </Link>
                </motion.header>

                {/* 2. Main Content Hero Grid */}
                <main className="w-full max-w-[1320px] mx-auto my-auto py-8 sm:py-12 lg:py-16">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                    >
                        {/* Left Column: Heading, Subtitle & Form */}
                        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-medium text-[#18191C] tracking-tight leading-[1.12] mb-4 sm:mb-6"
                            >
                                Our website is under construction
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed mb-6 sm:mb-8 max-w-lg"
                            >
                                We're building something exciting behind the
                                scenes. Our team is working hard to create a
                                faster, smarter, and more enjoyable experience
                                for you. Thank you for your patience . We'll be
                                launching soon with new features and a fresh
                                look. Stay tuned!
                            </motion.p>

                            {/* Email Subscription Form */}
                            <motion.div
                                variants={fadeInUp}
                                className="w-full max-w-lg mb-6 sm:mb-10"
                            >
                                {subscribed ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-md text-[#0BA02C] text-sm font-medium flex items-center gap-2"
                                    >
                                        Thank you for subscribing! We will
                                        notify you when we launch.
                                    </motion.div>
                                ) : (
                                    <form
                                        onSubmit={handleSubscribe}
                                        className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3"
                                    >
                                        <div className="relative flex-1">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0A65CC]">
                                                <EnvelopeIcon className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="Email Address"
                                                className="w-full h-14 pl-12 pr-4 bg-white border border-[#E4E5E8]  text-sm sm:text-base text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="h-14 px-16 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
                                        >
                                            <span>Subscribe</span>
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column: Illustration / Banner Image */}
                        <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end">
                            <motion.div
                                variants={fadeInRight}
                                className="w-full max-w-md lg:max-w-xl xl:max-w-2xl flex justify-center items-center"
                            >
                                <motion.img
                                    src={imgSrc}
                                    onError={() => {
                                        if (
                                            imgSrc ===
                                            "/images/banners/ComingSoon.png"
                                        ) {
                                            setImgSrc(
                                                "/images/banner/ComingSoon.png"
                                            );
                                        }
                                    }}
                                    alt="Our website is under construction"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="w-full h-auto max-h-[360px] sm:max-h-[440px] lg:max-h-[500px] object-contain drop-shadow-sm"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </main>

                {/* 3. Footer Bar: Social Links & Copyright */}
                <motion.footer
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-full max-w-[1320px] mx-auto pt-6 border-t border-[#F1F2F4] flex flex-col min-[576px]:flex-row items-center justify-between gap-4"
                >
                    {/* Social Media Links */}
                    <div className="flex flex-col min-[400px]:flex-row items-center gap-3">
                        <div className="flex items-center gap-2">
                            {/* Facebook */}
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-9 h-9 rounded bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* Twitter */}
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="w-9 h-9 rounded bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="w-9 h-9 rounded bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="w-9 h-9 rounded bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </>
    );
}
