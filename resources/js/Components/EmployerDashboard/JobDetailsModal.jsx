import React from "react";
import {
    X,
    Briefcase,
    MapPin,
    DollarSign,
    Calendar,
    Users,
    CheckCircle2,
    XCircle,
    Clock,
    Tag,
    Edit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobDetailsModal({ isOpen, onClose, job }) {
    if (!isOpen || !job) return null;

    const isActiveStatus = job.status === "Active";

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
                    className="relative w-full max-w-3xl bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8] my-8 max-h-[90vh] flex flex-col font-sans text-[#18191C]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[#E4E5E8] flex items-start justify-between gap-4 bg-white sticky top-0 z-10">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap mb-1.5">
                                <h3 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                                    {job.title}
                                </h3>
                                {isActiveStatus ? (
                                    <span className="px-2.5 py-0.5 bg-[#E6F4EA] text-[#0BA02C] font-semibold text-xs rounded-none border border-[#0BA02C]/20 flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>Active</span>
                                    </span>
                                ) : (
                                    <span className="px-2.5 py-0.5 bg-[#FFF0F0] text-[#E05151] font-semibold text-xs rounded-none border border-[#E05151]/20 flex items-center gap-1">
                                        <XCircle className="w-3.5 h-3.5" />
                                        <span>Expired</span>
                                    </span>
                                )}
                            </div>
                            <p className="text-xs sm:text-sm text-[#767E94]">
                                Posted on Jan 12, 2026 • {job.remaining || "27 days remaining"}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-full transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8F9FA] border border-[#E4E5E8] rounded-none">
                            <div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                    <Briefcase className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>JOB TYPE</span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-[#18191C]">{job.type || "Full Time"}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                    <DollarSign className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>SALARY</span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-[#18191C]">$50,000 - $80,000 / yr</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                    <MapPin className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>LOCATION</span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-[#18191C]">New York, USA</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                    <Users className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>APPLICATIONS</span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-[#0A65CC]">{job.applications || "0 Applications"}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18191C] mb-2">
                                JOB DESCRIPTION
                            </h4>
                            <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                We are seeking a highly skilled and creative {job.title} to join our growing product design team. You will be responsible for creating user-centered designs, conducting user research, developing wireframes, and building interactive prototypes that deliver exceptional user experiences across all web and mobile platforms.
                            </p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18191C] mb-2">
                                KEY RESPONSIBILITIES
                            </h4>
                            <ul className="text-xs sm:text-sm text-[#5E6670] space-y-2 list-disc pl-5">
                                <li>Collaborate with product managers and engineers to define and execute product vision.</li>
                                <li>Create high-fidelity UI mockups, user flows, and interactive prototypes.</li>
                                <li>Conduct usability testing sessions and iterate designs based on quantitative feedback.</li>
                                <li>Maintain and contribute to our design system component libraries.</li>
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18191C] mb-2">
                                REQUIREMENTS & SKILLS
                            </h4>
                            <ul className="text-xs sm:text-sm text-[#5E6670] space-y-2 list-disc pl-5">
                                <li>3+ years of professional design experience in digital product teams.</li>
                                <li>Proficiency in Figma, Adobe Creative Suite, and prototyping software.</li>
                                <li>Strong understanding of web accessibility guidelines (WCAG) and responsive web design.</li>
                                <li>Bachelor's degree in Design, Computer Science, or relevant field.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 sm:p-6 border-t border-[#E4E5E8] flex items-center justify-between bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#5E6670] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none transition-colors cursor-pointer"
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Job</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
