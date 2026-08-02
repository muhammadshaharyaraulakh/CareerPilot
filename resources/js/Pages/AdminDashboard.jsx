import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

// Components
import AdminNavbar from "@/Components/AdminDashboard/AdminNavbar";
import AdminSidebar from "@/Components/AdminDashboard/AdminSidebar";
import AdminOverviewCards from "@/Components/AdminDashboard/AdminOverviewCards";
import CompaniesApprovalView from "@/Components/AdminDashboard/CompaniesApprovalView";
import JobsModerationView from "@/Components/AdminDashboard/JobsModerationView";
import BlogModerationView from "@/Components/AdminDashboard/BlogModerationView";
import PromotionalEmailBroadcaster from "@/Components/AdminDashboard/PromotionalEmailBroadcaster";
import CandidatesManagementView from "@/Components/AdminDashboard/CandidatesManagementView";
import SubscriptionsRevenueView from "@/Components/AdminDashboard/SubscriptionsRevenueView";
import AdminSettingsView from "@/Components/AdminDashboard/AdminSettingsView";

export default function AdminDashboard({ auth }) {
    const [activeTab, setActiveTab] = useState("Overview");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const adminName = auth?.user?.name || "System Administrator";

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-[#18191C] antialiased">
            <Head title="Admin Dashboard - CareerPilot" />

            {/* Top Admin Navbar */}
            <AdminNavbar adminUser={adminName} />

            {/* Main Admin Dashboard Body Container */}
            <div className="flex-1 w-full bg-white">
                <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row w-full min-h-[calc(100vh-65px)]">
                    
                    {/* Left Admin Sidebar */}
                    <AdminSidebar
                        activeItem={activeTab}
                        setActiveItem={setActiveTab}
                        isMobileOpen={isMobileSidebarOpen}
                        setIsMobileOpen={setIsMobileSidebarOpen}
                    />

                    {/* Right Content Workspace Area */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full bg-white">
                        {/* Mobile Navigation Trigger Button (<1024px) */}
                        <div className="lg:hidden mb-4">
                            <button
                                type="button"
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E4E5E8] rounded-lg text-xs font-semibold text-[#0A65CC] shadow-2xs hover:bg-[#E8F1FF] transition-colors cursor-pointer"
                            >
                                <Menu className="w-4 h-4" />
                                <span>Admin Navigation Menu</span>
                            </button>
                        </div>

                        {/* Top Greeting & Active Section Title */}
                        <div className="mb-6">
                            <h1 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                                {activeTab}
                            </h1>
                            <p className="text-xs sm:text-sm text-[#767E94] mt-0.5">
                                Welcome back, {adminName}. Manage platform moderation, companies, and communications.
                            </p>
                        </div>

                        {/* Animated Tab Content Container */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "Overview" && (
                                <AdminOverviewCards onNavigateTab={setActiveTab} />
                            )}

                            {activeTab === "Companies & Plans" && (
                                <CompaniesApprovalView />
                            )}

                            {activeTab === "Jobs Moderation" && (
                                <JobsModerationView />
                            )}

                            {activeTab === "Blogs & Content" && (
                                <BlogModerationView />
                            )}

                            {activeTab === "Email Broadcaster" && (
                                <PromotionalEmailBroadcaster />
                            )}

                            {activeTab === "Candidates & Users" && (
                                <CandidatesManagementView />
                            )}

                            {activeTab === "Subscriptions & Revenue" && (
                                <SubscriptionsRevenueView />
                            )}

                            {activeTab === "Settings" && (
                                <AdminSettingsView />
                            )}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
