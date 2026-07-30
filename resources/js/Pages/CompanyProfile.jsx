import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import CompanyProfileHeader from "@/Components/CompanyProfile/CompanyProfileHeader";
import CompanyProfileTabs from "@/Components/CompanyProfile/CompanyProfileTabs";
import CompanyInfoTab from "@/Components/CompanyProfile/CompanyInfoTab";
import FoundingInfoTab from "@/Components/CompanyProfile/FoundingInfoTab";
import SocialMediaProfileTab from "@/Components/CompanyProfile/SocialMediaProfileTab";
import ContactTab from "@/Components/CompanyProfile/ContactTab";
import CompletionStep from "@/Components/CompanyProfile/CompletionStep";
import CompanyProfileFooter from "@/Components/CompanyProfile/CompanyProfileFooter";

export default function CompanyProfile() {
    const [activeTab, setActiveTab] = useState("company_info");

    const [formData, setFormData] = useState({
        companyName: "",
        aboutUs: "",
        logoFile: null,
        logoPreview: null,
        bannerFile: null,
        bannerPreview: null,
        organizationType: "",
        industryType: "",
        teamSize: "",
        establishmentYear: "",
        website: "",
        vision: "",
        socialLinks: [
            { platform: "Facebook", url: "" },
            { platform: "Twitter", url: "" },
            { platform: "LinkedIn", url: "" },
        ],
        address: "",
        phone: "",
        email: "",
    });

    const updateFormData = (newFields) => {
        setFormData((prev) => ({ ...prev, ...newFields }));
    };

    // Calculate setup progress percentage per user specification
    const getProgressPercentage = () => {
        switch (activeTab) {
            case "company_info":
                return 0;
            case "founding_info":
                return 25;
            case "social_media":
                return 50;
            case "contact":
                return 75;
            case "completed":
                return 100;
            default:
                return 0;
        }
    };

    const handleNextTab = () => {
        if (activeTab === "company_info") setActiveTab("founding_info");
        else if (activeTab === "founding_info") setActiveTab("social_media");
        else if (activeTab === "social_media") setActiveTab("contact");
        else if (activeTab === "contact") setActiveTab("completed");
    };

    const handlePrevTab = () => {
        if (activeTab === "founding_info") setActiveTab("company_info");
        else if (activeTab === "social_media") setActiveTab("founding_info");
        else if (activeTab === "contact") setActiveTab("social_media");
    };

    const handleComplete = () => {
        setActiveTab("completed");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-[#18191C] antialiased">
            <Head title="Company Profile Setup" />

            {/* Header with setup progress */}
            <CompanyProfileHeader progress={getProgressPercentage()} />

            {/* Main Content Area - Form sits directly on page background */}
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
                {activeTab !== "completed" ? (
                    <div className="w-full">
                        {/* Tab Bar */}
                        <CompanyProfileTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Animated Tab Body */}
                        <div className="mt-6 sm:mt-8">
                            <AnimatePresence mode="wait">
                                {activeTab === "company_info" && (
                                    <motion.div
                                        key="company_info"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <CompanyInfoTab
                                            formData={formData}
                                            updateFormData={updateFormData}
                                            onNext={handleNextTab}
                                        />
                                    </motion.div>
                                )}

                                {activeTab === "founding_info" && (
                                    <motion.div
                                        key="founding_info"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FoundingInfoTab
                                            formData={formData}
                                            updateFormData={updateFormData}
                                            onNext={handleNextTab}
                                            onPrev={handlePrevTab}
                                        />
                                    </motion.div>
                                )}

                                {activeTab === "social_media" && (
                                    <motion.div
                                        key="social_media"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <SocialMediaProfileTab
                                            formData={formData}
                                            updateFormData={updateFormData}
                                            onNext={handleNextTab}
                                            onPrev={handlePrevTab}
                                        />
                                    </motion.div>
                                )}

                                {activeTab === "contact" && (
                                    <motion.div
                                        key="contact"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ContactTab
                                            formData={formData}
                                            updateFormData={updateFormData}
                                            onPrev={handlePrevTab}
                                            onComplete={handleComplete}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    /* Completion View directly on page background */
                    <div className="w-full my-auto">
                        <CompletionStep />
                    </div>
                )}
            </main>

            {/* Footer */}
            <CompanyProfileFooter />
        </div>
    );
}
