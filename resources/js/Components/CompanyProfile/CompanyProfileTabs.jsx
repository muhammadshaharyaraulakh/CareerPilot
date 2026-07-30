import React from "react";
import { User, Users, Globe, AtSign } from "lucide-react";

export default function CompanyProfileTabs({ activeTab, onTabChange }) {
    const tabs = [
        {
            id: "companyinfo",
            label: "Company Info",
            icon: User,
        },
        {
            id: "foundinginfo",
            label: "Founding Info",
            icon: Users,
        },
        {
            id: "socialmedia",
            label: "Social Media Info",
            icon: Globe,
        },
        {
            id: "contact",
            label: "Contact",
            icon: AtSign,
        },
    ];

    return (
        <div className="w-full bg-white border-b border-[#E4E5E8] px-4 sm:px-8">
            <div className="max-w-[1000px] mx-auto flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-8">
                {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center gap-2.5 py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "border-[#0A65CC] text-[#0A65CC]"
                                    : "border-transparent text-[#767E94] hover:text-[#18191C] hover:border-[#E4E5E8]"
                            }`}
                        >
                            <IconComponent
                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                                    isActive ? "text-[#0A65CC]" : "text-[#9199A3]"
                                }`}
                            />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
