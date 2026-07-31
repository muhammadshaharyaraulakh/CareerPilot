import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

// Components
import TopHeader from "@/Components/Welcome/TopHeader";
import EmployerNavbar from "@/Components/EmployerDashboard/EmployerNavbar";
import EmployerSidebar from "@/Components/EmployerDashboard/EmployerSidebar";
import DashboardOverviewCards from "@/Components/EmployerDashboard/DashboardOverviewCards";
import RecentlyPostedJobsTable from "@/Components/EmployerDashboard/RecentlyPostedJobsTable";
import PricingSubscriptionCards from "@/Components/EmployerDashboard/PricingSubscriptionCards";
import CheckoutModal from "@/Components/EmployerDashboard/CheckoutModal";
import PostAJobForm from "@/Components/EmployerDashboard/PostAJobForm";
import PostJobSuccessModal from "@/Components/EmployerDashboard/PostJobSuccessModal";
import JobApplicationsView from "@/Components/EmployerDashboard/JobApplicationsView";
import SavedCandidatesView from "@/Components/EmployerDashboard/SavedCandidatesView";
import EmployerSettingsView from "@/Components/EmployerDashboard/EmployerSettingsView";

export default function CompanyDashboard({ auth }) {
    const [activeTab, setActiveTab] = useState("Overview");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Job Applications Detail Navigation state
    const [viewingJobApplicationsTitle, setViewingJobApplicationsTitle] = useState(null);

    // Subscription & Post Job Flow State
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const userCompany = auth?.user?.name || "Instagram";

    const handleSelectPlan = (plan) => {
        setSelectedPlanForCheckout(plan);
        setIsCheckoutOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsCheckoutOpen(false);
        setHasActiveSubscription(true);
    };

    const handleJobPostedSuccess = () => {
        setIsSuccessModalOpen(true);
    };

    const handleViewJobsFromSuccess = () => {
        setIsSuccessModalOpen(false);
        setActiveTab("My Jobs");
        setViewingJobApplicationsTitle(null);
    };

    const handleOpenJobApplications = (jobTitle) => {
        setViewingJobApplicationsTitle(jobTitle || "Senior UI/UX Designer");
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setViewingJobApplicationsTitle(null);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-[#18191C] antialiased">
            <Head title="Employers Dashboard - CareerPilot" />

            {/* Upper Top Header (Employers link marked active) */}
            <TopHeader activeLink="Employers" />

            {/* Employer Dashboard Header/Navbar */}
            <EmployerNavbar userCompany={userCompany} />

            {/* Main Dashboard Body Container */}
            <div className="flex-1 w-full bg-white">
                <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row w-full min-h-[calc(100vh-100px)]">
                    
                    {/* Left Sidebar */}
                    <EmployerSidebar
                        activeItem={activeTab}
                        setActiveItem={handleTabChange}
                        isMobileOpen={isMobileSidebarOpen}
                        setIsMobileOpen={setIsMobileSidebarOpen}
                    />

                    {/* Right Content Area */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full bg-white">
                        {/* Mobile Navigation Trigger Button (<1024px) */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm font-semibold text-[#0A65CC] shadow-2xs hover:bg-[#E8F1FF] transition-colors cursor-pointer"
                            >
                                <Menu className="w-4 h-4" />
                                <span>Employer Navigation</span>
                            </button>
                        </div>

                        {/* Top Greeting Header */}
                        <div className="mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                                Hello, {userCompany}
                            </h1>
                            <p className="text-xs sm:text-sm text-[#767E94] mt-1">
                                Here is your daily activities and applications
                            </p>
                        </div>

                        {/* Animated Main Content per Active Tab */}
                        <motion.div
                            key={activeTab + (viewingJobApplicationsTitle ? `-apps-${viewingJobApplicationsTitle}` : "")}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* If currently viewing job applications detail */}
                            {viewingJobApplicationsTitle ? (
                                <JobApplicationsView
                                    jobTitle={viewingJobApplicationsTitle}
                                    onBackToJobs={() => setViewingJobApplicationsTitle(null)}
                                />
                            ) : (
                                <>
                                    {activeTab === "Overview" && (
                                        <>
                                            <DashboardOverviewCards />
                                            <RecentlyPostedJobsTable
                                                onViewApplications={handleOpenJobApplications}
                                            />
                                        </>
                                    )}

                                    {(activeTab === "Post a Job" || activeTab === "Plans & Billing") && (
                                        <>
                                            {!hasActiveSubscription ? (
                                                <PricingSubscriptionCards onSelectPlan={handleSelectPlan} />
                                            ) : (
                                                <PostAJobForm onJobPosted={handleJobPostedSuccess} />
                                            )}
                                        </>
                                    )}

                                    {activeTab === "My Jobs" && (
                                        <RecentlyPostedJobsTable
                                            onViewApplications={handleOpenJobApplications}
                                        />
                                    )}

                                    {activeTab === "Saved Candidate" && (
                                        <SavedCandidatesView />
                                    )}

                                    {activeTab === "Settings" && (
                                        <EmployerSettingsView />
                                    )}

                                    {activeTab !== "Overview" &&
                                        activeTab !== "Post a Job" &&
                                        activeTab !== "Plans & Billing" &&
                                        activeTab !== "My Jobs" &&
                                        activeTab !== "Saved Candidate" &&
                                        activeTab !== "Settings" && (
                                            <div className="bg-white rounded-none border border-[#E4E5E8] p-8 sm:p-12 text-center text-[#767E94]">
                                                <h3 className="text-lg font-semibold text-[#18191C] mb-2">
                                                    {activeTab} Section
                                                </h3>
                                                <p className="text-xs sm:text-sm">
                                                    Manage your {activeTab.toLowerCase()} settings and records here.
                                                </p>
                                            </div>
                                        )}
                                </>
                            )}
                        </motion.div>
                    </main>
                </div>
            </div>

            {/* Checkout Payment Modal */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                selectedPlan={selectedPlanForCheckout}
                onPaymentSuccess={handlePaymentSuccess}
            />

            {/* Post Job Success Celebration Modal */}
            <PostJobSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                onViewJobs={handleViewJobsFromSuccess}
            />
        </div>
    );
}
