import React, { useState } from "react";
import {
    User,
    GraduationCap,
    Briefcase,
    FolderGit2,
    Wrench,
    Award,
    Share2,
    Lock,
} from "lucide-react";

import PersonalTab from "./CandidateSettings/PersonalTab";
import EducationTab from "./CandidateSettings/EducationTab";
import ExperienceTab from "./CandidateSettings/ExperienceTab";
import ProjectsTab from "./CandidateSettings/ProjectsTab";
import SkillsTab from "./CandidateSettings/SkillsTab";
import CertificationsTab from "./CandidateSettings/CertificationsTab";
import SocialLinksTab from "./CandidateSettings/SocialLinksTab";
import AccountSettingsTab from "./CandidateSettings/AccountSettingsTab";

export default function CandidateSettingsView() {
    const [activeTab, setActiveTab] = useState("Personal");

    const tabs = [
        { key: "Personal", label: "Personal", icon: User },
        { key: "Education", label: "Education", icon: GraduationCap },
        { key: "Experience", label: "Experience", icon: Briefcase },
        { key: "Projects", label: "Projects", icon: FolderGit2 },
        { key: "Skills", label: "Skills", icon: Wrench },
        { key: "Certifications", label: "Certifications", icon: Award },
        { key: "Social Links", label: "Social Links", icon: Share2 },
        { key: "Account Setting", label: "Account Setting", icon: Lock },
    ];

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case "Personal":
                return <PersonalTab />;
            case "Education":
                return <EducationTab />;
            case "Experience":
                return <ExperienceTab />;
            case "Projects":
                return <ProjectsTab />;
            case "Skills":
                return <SkillsTab />;
            case "Certifications":
                return <CertificationsTab />;
            case "Social Links":
                return <SocialLinksTab />;
            case "Account Setting":
                return <AccountSettingsTab />;
            default:
                return <PersonalTab />;
        }
    };

    return (
        <div className="space-y-8 font-sans text-[#18191C]">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                    Settings
                </h2>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="border-b border-[#E4E5E8] flex items-center gap-6 overflow-x-auto">
                {tabs.map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-3.5 px-1 font-semibold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-colors cursor-pointer shrink-0 ${
                                isActive
                                    ? "border-[#0A65CC] text-[#0A65CC]"
                                    : "border-transparent text-[#767E94] hover:text-[#18191C]"
                            }`}
                        >
                            <IconComp className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content Section */}
            <div>{renderActiveTabContent()}</div>
        </div>
    );
}
