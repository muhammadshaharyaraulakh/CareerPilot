import React from "react";
import { X, CheckCircle2, ArrowRight, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostJobSuccessModal({ isOpen, onClose, onViewJobs }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                {/* Backdrop Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Modal Dialog Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8] p-6 sm:p-8 text-center"
                >
                    {/* Top Right Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Celebration Icon Header */}
                    <div className="mx-auto w-16 h-16 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none mb-5">
                        <PartyPopper className="w-8 h-8" />
                    </div>

                    {/* Congratulation Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#18191C] mb-2">
                        Congratulation, Your Job is successfully posted!
                    </h3>

                    {/* Subtitle (Strictly 'my jobs', no hyphens) */}
                    <p className="text-xs sm:text-sm text-[#767E94] mb-8 max-w-sm mx-auto leading-relaxed">
                        You can manage your form my jobs section in your dashboard
                    </p>

                    {/* CTA Button: View Jobs */}
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={onViewJobs}
                            className="h-12 px-6 border-2 border-[#0A65CC] text-[#0A65CC] hover:bg-[#E8F1FF] font-semibold text-xs sm:text-sm rounded-none transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <span>View Jobs</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
