import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import TopHeader from '../Components/Welcome/TopHeader';
import MainNavbar from '../Components/Welcome/MainNavbar';
import HeroSection from '../Components/Welcome/HeroSection';
import StatsSection from '../Components/Welcome/StatsSection';
import PopularVacancies from '../Components/Welcome/PopularVacancies';
import HowItWorks from '../Components/Welcome/HowItWorks';
import FeaturedJobs from '../Components/Welcome/FeaturedJobs';
import TopCompanies from '../Components/Welcome/TopCompanies';
import Testimonials from '../Components/Welcome/Testimonials';
import DualBanner from '../Components/Welcome/DualBanner';
import Footer from '../Components/Welcome/Footer';

// Section Animation Variants
const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
};

const slideRightVariants = {
    hidden: { opacity: 0, x: -35 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const slideLeftVariants = {
    hidden: { opacity: 0, x: 35 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function Welcome({ auth, laravelVersion, phpVersion, categories, featuredCompanies, featuredJobs }) {
    return (
        <>
            <Head title="Jobpilot - Find A Job That Suits Your Interest & Skills" />
            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-[#F8F9FA] text-[#18191C] font-sans flex flex-col antialiased selection:bg-transparent selection:text-[#0A65CC]">
                {/* 1. Top Header Bar */}
                <TopHeader />

                {/* 2. Main Navigation Bar */}
                <MainNavbar auth={auth} />

                {/* Main Content Body */}
                <main className="flex-1 flex flex-col">
                    {/* 3. Hero Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={fadeUpVariants}
                    >
                        <HeroSection />
                    </motion.div>

                    {/* 4. Statistics Grid Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={scaleUpVariants}
                    >
                        <StatsSection />
                    </motion.div>

                    {/* 5. Most Popular Vacancies Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={slideRightVariants}
                    >
                        <PopularVacancies categories={categories} />
                    </motion.div>

                    {/* 6. How Jobpilot Work Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={fadeUpVariants}
                    >
                        <HowItWorks />
                    </motion.div>

                    {/* 7. Featured Job Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={slideLeftVariants}
                    >
                        <FeaturedJobs featuredJobs={featuredJobs} />
                    </motion.div>

                    {/* 8. Top Companies Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={scaleUpVariants}
                    >
                        <TopCompanies featuredCompanies={featuredCompanies} />
                    </motion.div>

                    {/* 9. Clients Testimonial Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={fadeUpVariants}
                    >
                        <Testimonials />
                    </motion.div>

                    {/* 10. Dual Candidate/Employer Banner Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={scaleUpVariants}
                    >
                        <DualBanner />
                    </motion.div>
                </main>

                {/* 11. Jobpilot Dark Footer */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-30px" }}
                    variants={fadeUpVariants}
                >
                    <Footer />
                </motion.div>
            </div>
        </>
    );
}

