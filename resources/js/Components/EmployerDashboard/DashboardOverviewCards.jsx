import React from "react";
import { Briefcase, UserCheck } from "lucide-react";

export default function DashboardOverviewCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mb-8">
            {/* Open Jobs Card */}
            <div className="bg-[#E8F1FF] rounded-lg p-5 sm:p-6 flex items-center justify-between transition-transform hover:scale-[1.01]">
                <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#18191C]">
                        589
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#5E6670]">
                        Open Jobs
                    </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-md flex items-center justify-center shadow-xs shrink-0">
                    <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A65CC]" />
                </div>
            </div>

            {/* Saved Candidates Card */}
            <div className="bg-[#FFF6E6] rounded-lg p-5 sm:p-6 flex items-center justify-between transition-transform hover:scale-[1.01]">
                <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#18191C]">
                        2,517
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#5E6670]">
                        Saved Candidates
                    </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-md flex items-center justify-center shadow-xs shrink-0">
                    <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFAA00]" />
                </div>
            </div>
        </div>
    );
}
