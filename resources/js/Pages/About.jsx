import React from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import MainNavbar from "@/Components/Welcome/MainNavbar";
import StatsSection from "@/Components/Welcome/StatsSection";
import Testimonials from "@/Components/Welcome/Testimonials";
import DualBanner from "@/Components/Welcome/DualBanner";
import Footer from "@/Components/Welcome/Footer";

export default function About({ auth }) {
    // Brand SVG files from public/images/about/ with Company Names
    const brands = [
        { name: "Amazon", logo: "/images/about/amazon.svg" },
        { name: "Apple", logo: "/images/about/apple.svg" },
        { name: "Dribbble", logo: "/images/about/dribbble.svg" },
        { name: "Figma", logo: "/images/about/figma.svg" },
        { name: "Google", logo: "/images/about/google.svg" },
        { name: "Microsoft", logo: "/images/about/microsoft.svg" },
    ];

    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    const fadeInLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const scaleUp = {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <Head title="About Us - CareerPilot" />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Main Navigation Bar Only */}
                <MainNavbar auth={auth} />

                {/* 2. Main Content Sections */}
                <main className="flex-1 w-full overflow-x-hidden">
                    {/* SECTION 1: 100vh Hero Section with Expanded Humanized Text & bg-[#f1f2f4] */}
                    <section className="w-full bg-[#f1f2f4] min-h-screen lg:min-h-[calc(100vh-80px)] flex flex-col justify-between pt-6 min-[360px]:pt-8 sm:pt-12 lg:pt-14 pb-6 sm:pb-10 px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                        <div className="max-w-[1320px] mx-auto w-full flex-1 flex flex-col justify-center my-auto">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="w-full flex flex-col items-start text-left space-y-3 min-[360px]:space-y-4 sm:space-y-4"
                            >
                                <motion.span
                                    variants={fadeInUp}
                                    className="text-[11px] min-[360px]:text-xs sm:text-sm font-semibold text-[#0A65CC] tracking-wide uppercase"
                                >
                                    Who we are
                                </motion.span>

                                <motion.h1
                                    variants={fadeInUp}
                                    className="text-xl min-[360px]:text-2xl sm:text-4xl lg:text-[48px] font-medium text-[#18191C] tracking-tight leading-[1.2] w-full mb-1"
                                >
                                    We're highly skilled and professionals team.
                                </motion.h1>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed w-full"
                                >
                                    CareerPilot is a next generation career ecosystem designed to empower candidates and streamline employer recruitment globally. Our highly skilled team of engineers, designers, product strategists, and career specialists work tirelessly to craft modern hiring tools, verified job matching, and transparent career pathways.
                                </motion.p>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed w-full"
                                >
                                    Founded on the belief that job searching should be intuitive, transparent, and rewarding, we bridge the gap between world class talent and innovative global companies across technology, design, finance, and enterprise industries.
                                </motion.p>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed w-full"
                                >
                                    We leverage intelligent matching algorithms, real time application tracking, and accurate salary benchmarking to ensure candidates discover workplaces where they can thrive, while helping employers build high performing teams with speed and confidence.
                                </motion.p>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed w-full"
                                >
                                    Our platform reimagines the recruitment experience from the ground up by putting human connections and genuine career alignment at the center of everything we do. We provide job seekers with deep company insights, interview prep resources, and verified workplace reviews so candidates can make informed decisions about their professional growth.
                                </motion.p>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed w-full"
                                >
                                    For growing organizations and enterprise hiring teams, CareerPilot offers intuitive candidate discovery tools, direct messaging, and collaborative talent pipelines. By eliminating repetitive manual screening and focusing on skill based hiring, we empower companies to discover exceptional talent while saving time and resources.
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Hero Component Stats Section integrated into 100vh flex bottom */}
                        <div className="w-full max-w-[1320px] mx-auto pt-4 sm:pt-6">
                            <StatsSection />
                        </div>
                    </section>

                    {/* SECTION 2: Brand SVG Logos with Names (Animated & Responsive 320px) */}
                    <section className="w-full bg-white border-y border-[#E4E5E8] py-5 sm:py-7">
                        <div className="max-w-[1320px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-30px" }}
                                className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-6 items-center justify-items-center gap-3 min-[360px]:gap-4 sm:gap-6"
                            >
                                {brands.map((brand, bIdx) => (
                                    <motion.div
                                        key={bIdx}
                                        variants={fadeInUp}
                                        className="flex items-center justify-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 hover:scale-105 transition-transform duration-200 cursor-pointer w-full"
                                    >
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="h-6 min-[360px]:h-7 sm:h-8 md:h-9 w-auto max-w-[36px] min-[360px]:max-w-[45px] sm:max-w-[55px] object-contain shrink-0"
                                        />
                                        <span className="text-xs min-[360px]:text-sm sm:text-base font-semibold text-[#475156] tracking-tight truncate">
                                            {brand.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    {/* SECTION 3: Photo Gallery Grid (Full Width & Staggered Animations) */}
                    <section className="max-w-[1320px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-3 min-[360px]:gap-4 sm:gap-6 items-stretch"
                        >
                            {/* Column 1: Large Left Photo (Image 1) */}
                            <motion.div
                                variants={fadeInLeft}
                                className="md:col-span-5 overflow-hidden h-[280px] min-[360px]:h-[320px] sm:h-[400px] md:h-[450px]"
                            >
                                <img
                                    src="/images/about/about-1.png"
                                    alt="Team Working"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-none border-0 outline-none"
                                />
                            </motion.div>

                            {/* Column 2: Stacked Middle Photos (Image 2 & Image 3) */}
                            <motion.div
                                variants={scaleUp}
                                className="md:col-span-3 flex flex-col gap-3 min-[360px]:gap-4 sm:gap-6"
                            >
                                <div className="overflow-hidden h-[134px] min-[360px]:h-[152px] sm:h-[188px] md:h-[213px]">
                                    <img
                                        src="/images/about/about-2.png"
                                        alt="Office Discussion"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-none border-0 outline-none"
                                    />
                                </div>
                                <div className="overflow-hidden h-[134px] min-[360px]:h-[152px] sm:h-[188px] md:h-[213px]">
                                    <img
                                        src="/images/about/about-3.png"
                                        alt="Remote Meeting"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-none border-0 outline-none"
                                    />
                                </div>
                            </motion.div>

                            {/* Column 3: Tall Right Photo (Image 4) */}
                            <motion.div
                                variants={fadeInRight}
                                className="md:col-span-4 overflow-hidden h-[280px] min-[360px]:h-[320px] sm:h-[400px] md:h-[450px]"
                            >
                                <img
                                    src="/images/about/about-4.png"
                                    alt="Team Collaboration"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-none border-0 outline-none"
                                />
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* SECTION 4: Our Mission Section (100vh Height & Animated) */}
                    <section className="w-full bg-white min-h-screen flex flex-col justify-center py-8 sm:py-12 px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                        <div className="max-w-[1320px] mx-auto w-full">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-[360px]:gap-8 lg:gap-12 items-center"
                            >
                                {/* Left Text */}
                                <div className="lg:col-span-6 flex flex-col items-start text-left">
                                    <motion.span
                                        variants={fadeInUp}
                                        className="text-[11px] min-[360px]:text-xs sm:text-sm font-semibold text-[#0A65CC] tracking-wide mb-2 sm:mb-3 uppercase"
                                    >
                                        Our Mission
                                    </motion.span>

                                    <motion.h2
                                        variants={fadeInUp}
                                        className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#18191C] tracking-tight leading-[1.2] mb-3 sm:mb-5"
                                    >
                                        Our mission is help people to find the
                                        perfect job.
                                    </motion.h2>

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed mb-3 sm:mb-4"
                                    >
                                        At CareerPilot, we believe that everyone
                                        deserves a career that aligns with their
                                        passion, skills, and ambitions. We are
                                        dedicated to removing the friction from
                                        job hunting by offering transparent
                                        employer insights, personalized position
                                        recommendations, and streamlined
                                        application workflows.
                                    </motion.p>

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed mb-3 sm:mb-4"
                                    >
                                        For employers, we provide an intelligent
                                        recruitment platform that connects
                                        talent acquisition teams directly with
                                        verified candidates, helping
                                        organizations build diverse, world class
                                        teams with speed and confidence.
                                    </motion.p>

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-xs min-[360px]:text-sm sm:text-base text-[#5E6670] leading-relaxed"
                                    >
                                        Through continuous technological
                                        innovation and candidate first design,
                                        we are shaping the future of global
                                        employment, making career growth
                                        accessible and fulfilling for talent
                                        across every industry.
                                    </motion.p>
                                </div>

                                {/* Right Mission Image */}
                                <div className="lg:col-span-6 flex justify-center w-full">
                                    <motion.div
                                        variants={fadeInRight}
                                        className="w-full max-w-md lg:max-w-lg"
                                    >
                                        <img
                                            src="/images/about/About.svg"
                                            alt="Our Mission"
                                            className="w-full h-auto object-contain max-h-[300px] min-[360px]:max-h-[360px] sm:max-h-[440px] mx-auto rounded-none border-0 outline-none"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* SECTION 5: Testimonials Component */}
                    <Testimonials />

                    {/* SECTION 6: Become a Candidate / Employer DualBanner Component */}
                    <DualBanner />
                </main>

                {/* 4. Footer Component */}
                <Footer />
            </div>
        </>
    );
}
