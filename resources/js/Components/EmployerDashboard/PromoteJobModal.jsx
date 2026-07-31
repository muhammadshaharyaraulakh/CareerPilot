import React, { useState } from "react";
import { X, ArrowRight, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoteJobModal({ isOpen, onClose, jobTitle = "UI/UX Designer", onPromoteSuccess }) {
    const [selectedOption, setSelectedOption] = useState("featured");

    if (!isOpen) return null;

    const handlePromote = (e) => {
        e.preventDefault();
        onPromoteSuccess(selectedOption);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-2xl bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-full transition-colors z-10 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <form onSubmit={handlePromote} className="p-6 sm:p-8 space-y-6">
                        {/* Header */}
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                                Promote Job: {jobTitle}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#767E94] mt-2 leading-relaxed">
                                Promote your job listing to get up to 10x more candidate views and top priority positioning in candidate searches.
                            </p>
                        </div>

                        {/* 2 Promotion Options Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Option 1: Featured Your Job */}
                            <div
                                onClick={() => setSelectedOption("featured")}
                                className={`p-4 border transition-all cursor-pointer rounded-none flex flex-col justify-between ${
                                    selectedOption === "featured"
                                        ? "border-[#0A65CC] bg-[#E8F1FF]/30 ring-1 ring-[#0A65CC]"
                                        : "border-[#E4E5E8] hover:border-gray-300 bg-white"
                                }`}
                            >
                                <div>
                                    {/* Preview Box */}
                                    <div className="bg-[#F8F9FA] p-3 border border-[#E4E5E8] mb-4 rounded-none space-y-2">
                                        <div className="text-[10px] font-bold text-[#767E94] uppercase">
                                            ALWAYS ON THE TOP
                                        </div>
                                        <div className="p-2.5 bg-[#0A65CC] text-white text-xs font-semibold rounded-none flex items-center justify-between">
                                            <span>{jobTitle}</span>
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                        <div className="p-2 bg-[#E4E5E8] text-[10px] text-[#767E94] rounded-none">
                                            Regular Job Listings
                                        </div>
                                    </div>

                                    {/* Radio & Title */}
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="promoteType"
                                            checked={selectedOption === "featured"}
                                            onChange={() => setSelectedOption("featured")}
                                            className="w-4 h-4 text-[#0A65CC] focus:ring-0 mt-0.5 cursor-pointer"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-[#18191C]">
                                                Featured Your Job
                                            </h4>
                                            <p className="text-xs text-[#767E94] mt-1 leading-relaxed">
                                                Pinned at the top of search results and candidate recommendations for maximum exposure.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Option 2: Highlight Your Job */}
                            <div
                                onClick={() => setSelectedOption("highlight")}
                                className={`p-4 border transition-all cursor-pointer rounded-none flex flex-col justify-between ${
                                    selectedOption === "highlight"
                                        ? "border-[#0A65CC] bg-[#E8F1FF]/30 ring-1 ring-[#0A65CC]"
                                        : "border-[#E4E5E8] hover:border-gray-300 bg-white"
                                }`}
                            >
                                <div>
                                    {/* Preview Box */}
                                    <div className="bg-[#F8F9FA] p-3 border border-[#E4E5E8] mb-4 rounded-none space-y-2">
                                        <div className="text-[10px] font-bold text-[#767E94] uppercase">
                                            HIGHLIGHT JOB WITH COLOR
                                        </div>
                                        <div className="p-2.5 bg-[#FFF9E6] border border-[#FFC107] text-[#D97706] text-xs font-semibold rounded-none flex items-center justify-between">
                                            <span>{jobTitle}</span>
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="p-2 bg-[#E4E5E8] text-[10px] text-[#767E94] rounded-none">
                                            Regular Job Listings
                                        </div>
                                    </div>

                                    {/* Radio & Title */}
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="promoteType"
                                            checked={selectedOption === "highlight"}
                                            onChange={() => setSelectedOption("highlight")}
                                            className="w-4 h-4 text-[#0A65CC] focus:ring-0 mt-0.5 cursor-pointer"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-[#18191C]">
                                                Highlight Your Job
                                            </h4>
                                            <p className="text-xs text-[#767E94] mt-1 leading-relaxed">
                                                Stands out with a distinctive highlight background color in job feeds.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#E4E5E8]">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#5E6670] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-md flex items-center gap-2 transition-all cursor-pointer"
                            >
                                <span>PROMOTE JOB</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
