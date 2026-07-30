import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import Footer from "@/Components/Welcome/Footer";

export default function Forbidden({ auth }) {
    const [imgSrc, setImgSrc] = useState("/images/banners/403.png");

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "/";
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
            <Head title="403 Access Denied - CareerPilot" />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Main Navigation Bar */}
                <MainNavbar auth={auth} />

                {/* 2. Main Hero Section */}
                <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 flex items-center justify-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full"
                    >
                        {/* Left Column: Heading, Message & Buttons */}
                        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
                            <motion.span
                                variants={fadeInUp}
                                className="text-xs sm:text-sm font-semibold text-[#E05151] tracking-wide uppercase mb-2"
                            >
                                Error 403
                            </motion.span>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#18191C] tracking-tight leading-[1.15] mb-4 sm:mb-6"
                            >
                                Oops! Access Denied
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed mb-4 max-w-md"
                            >
                                You do not have the required permissions to view this resource. Access to this page is restricted to authorized accounts or requires a different account level.
                            </motion.p>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed mb-6 sm:mb-8 max-w-md"
                            >
                                Please verify your account credentials or return to the homepage to explore candidate and employer services.
                            </motion.p>

                            {/* Action Buttons */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full"
                            >
                                <Link
                                    href="/"
                                    className="h-12 px-6 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                                >
                                    <span>Home</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleGoBack}
                                    className="h-12 px-6 bg-white border border-[#E4E5E8] hover:border-[#0A65CC] text-[#0A65CC] font-semibold text-xs sm:text-sm rounded-md transition-all flex items-center justify-center cursor-pointer active:scale-[0.98]"
                                >
                                    Go Back
                                </button>
                            </motion.div>
                        </div>

                        {/* Right Column: 403 Illustration / Image */}
                        <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end">
                            <motion.div
                                variants={fadeInRight}
                                className="w-full max-w-md lg:max-w-xl xl:max-w-2xl flex justify-center items-center"
                            >
                                <motion.img
                                    src={imgSrc}
                                    onError={() => {
                                        setImgSrc(
                                            "/images/banners/illustration.svg"
                                        );
                                    }}
                                    alt="403 Access Denied"
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

                {/* 3. Footer Component */}
                <Footer />
            </div>
        </>
    );
}
