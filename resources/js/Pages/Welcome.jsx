import React from 'react';
import { Head } from '@inertiajs/react';
import TopHeader from '../Components/Welcome/TopHeader';
import MainNavbar from '../Components/Welcome/MainNavbar';
import HeroSection from '../Components/Welcome/HeroSection';
import StatsSection from '../Components/Welcome/StatsSection';
import PopularVacancies from '../Components/Welcome/PopularVacancies';
import HowItWorks from '../Components/Welcome/HowItWorks';
import PopularCategories from '../Components/Welcome/PopularCategories';
import FeaturedJobs from '../Components/Welcome/FeaturedJobs';
import TopCompanies from '../Components/Welcome/TopCompanies';
import Testimonials from '../Components/Welcome/Testimonials';
import DualBanner from '../Components/Welcome/DualBanner';
import Footer from '../Components/Welcome/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Jobpilot - Find A Job That Suits Your Interest & Skills" />
            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-[#F8F9FA] text-[#18191C] font-sans flex flex-col antialiased selection:bg-[#0A65CC] selection:text-white">
                {/* 1. Top Header Bar */}
                <TopHeader />

                {/* 2. Main Navigation Bar */}
                <MainNavbar auth={auth} />

                {/* Main Content Body */}
                <main className="flex-1 flex flex-col">
                    {/* 3. Hero Section */}
                    <HeroSection />

                    {/* 4. Statistics Grid Section */}
                    <StatsSection />

                    {/* 5. Most Popular Vacancies Section */}
                    <PopularVacancies />

                    {/* 6. How Jobpilot Work Section */}
                    <HowItWorks />

                    {/* 7. Popular Category Section */}
                    <PopularCategories />

                    {/* 8. Featured Job Section */}
                    <FeaturedJobs />

                    {/* 9. Top Companies Section */}
                    <TopCompanies />

                    {/* 10. Clients Testimonial Section */}
                    <Testimonials />

                    {/* 11. Dual Candidate/Employer Banner Section */}
                    <DualBanner />
                </main>

                {/* 12. Jobpilot Dark Footer */}
                <Footer />
            </div>
        </>
    );
}
