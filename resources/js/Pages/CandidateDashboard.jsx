import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Menu } from "lucide-react";
import TopHeader from "@/Components/Welcome/TopHeader";
import CandidateNavbar from "@/Components/CandidateDashboard/CandidateNavbar";
import CandidateSidebar from "@/Components/CandidateDashboard/CandidateSidebar";
import CandidateOverview from "@/Components/CandidateDashboard/CandidateOverview";
import CandidateAppliedJobsView from "@/Components/CandidateDashboard/CandidateAppliedJobsView";
import CandidateFavoriteJobsView from "@/Components/CandidateDashboard/CandidateFavoriteJobsView";
import CandidateJobAlertsView from "@/Components/CandidateDashboard/CandidateJobAlertsView";
import CandidateSettingsView from "@/Components/CandidateDashboard/CandidateSettingsView";
import JobDetailsModal from "@/Components/EmployerDashboard/JobDetailsModal";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateDashboard({ auth }) {
    const candidateName = auth?.user?.name || "Esther Howard";
    const candidateAvatar =
        auth?.user?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

    const [activeItem, setActiveItem] = useState("Overview");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Job Details Modal state
    const [selectedJob, setSelectedJob] = useState(null);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);

    const handleViewJobDetails = (job) => {
        setSelectedJob(job);
        setIsJobModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-[#18191C] antialiased selection:bg-[#0A65CC] selection:text-white">
            <Head title="Candidate Dashboard - CareerPilot" />

            {/* Upper Top Header (Candidates link active) */}
            <TopHeader activeLink="Candidates" />

            {/* Candidate Navbar */}
            <CandidateNavbar
                userName={candidateName}
                userAvatar={candidateAvatar}
                onMobileSidebarToggle={() => setIsMobileOpen(true)}
            />

            {/* Main Dashboard Body Container (Matching Employer Dashboard layout) */}
            <div className="flex-1 w-full bg-white">
                <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row w-full min-h-[calc(100vh-100px)]">
                    
                    {/* Left Sidebar */}
                    <CandidateSidebar
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        isMobileOpen={isMobileOpen}
                        setIsMobileOpen={setIsMobileOpen}
                        jobAlertsCount="09"
                    />

                    {/* Right Main Content Area */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full bg-white">
                        {/* Mobile Navigation Trigger Button (<1024px) */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setIsMobileOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm font-semibold text-[#0A65CC] shadow-2xs hover:bg-[#E8F1FF] transition-colors cursor-pointer"
                            >
                                <Menu className="w-4 h-4" />
                                <span>Candidate Navigation</span>
                            </button>
                        </div>

                        {/* Animated Main Content per Active Tab */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.18 }}
                            >
                                {activeItem.toLowerCase() === "overview" && (
                                    <CandidateOverview
                                        userName={candidateName}
                                        userAvatar={candidateAvatar}
                                        onNavigateToSettings={() => setActiveItem("Settings")}
                                        onNavigateToAppliedJobs={() => setActiveItem("Applied Jobs")}
                                        onViewJobDetails={handleViewJobDetails}
                                    />
                                )}

                                {activeItem.toLowerCase() === "applied jobs" && (
                                    <CandidateAppliedJobsView
                                        onViewJobDetails={handleViewJobDetails}
                                    />
                                )}

                                {activeItem.toLowerCase() === "favorite jobs" && (
                                    <CandidateFavoriteJobsView
                                        onViewJobDetails={handleViewJobDetails}
                                    />
                                )}

                                {activeItem.toLowerCase() === "job alert" && (
                                    <CandidateJobAlertsView />
                                )}

                                {activeItem.toLowerCase() === "settings" && (
                                    <CandidateSettingsView />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Job Details Popup Modal */}
            <JobDetailsModal
                isOpen={isJobModalOpen}
                onClose={() => setIsJobModalOpen(false)}
                job={selectedJob}
            />

            {/* Strictly NO FOOTER rendered here as requested */}
        </div>
    );
}
