import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function CompanyProfileHeader({ progress = 0 }) {
    return (
        <header className="w-full bg-white border-b border-[#E4E5E8] py-4 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <ApplicationLogo className="h-8 w-auto text-[#0A65CC]" />
                
                <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-[#767E94] font-medium hidden sm:inline">
                        Setup Progress
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="w-28 sm:w-48 h-1.5 bg-[#E4E5E8] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0A65CC] transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#0A65CC] whitespace-nowrap">
                            {progress}% {progress === 100 ? "Completed" : "Complete"}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
