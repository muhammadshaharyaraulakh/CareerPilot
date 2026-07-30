import React from "react";
import { Link } from "@inertiajs/react";
import { CheckCheck, ArrowRight } from "lucide-react";

export default function CompletionStep() {
    return (
        <div className="w-full py-16 sm:py-24 px-4 flex flex-col items-center justify-center text-center animate-fadeIn">
            {/* Double Check Circle Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center mb-6 sm:mb-8 transition-transform hover:scale-105 shadow-sm">
                <CheckCheck className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.5]" />
            </div>

            {/* Title (No Emojis) */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#18191C] mb-3">
                Congratulations, You profile is 100% complete!
            </h2>

            {/* Meaningful Subtitle / Description */}
            <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-lg mb-8 sm:mb-10">
                Your company profile is completely set up. You can now start posting job openings and connecting with qualified candidates across the platform.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
                <Link
                    href="/dashboard"
                    className="h-12 px-6 bg-[#E8F1FF] hover:bg-[#D6E4FF] text-[#0A65CC] font-semibold text-xs sm:text-sm rounded-md transition-all flex items-center justify-center cursor-pointer active:scale-[0.98]"
                >
                    View Dashboard
                </Link>

                <Link
                    href="/post-job"
                    className="h-12 px-6 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                    <span>Post Job</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
