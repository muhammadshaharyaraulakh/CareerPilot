import React from "react";
import {
    X,
    Star,
    Mail,
    UserCheck,
    Download,
    Globe,
    MapPin,
    Phone,
    Calendar,
    Award,
    GraduationCap,
    Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateDetailsModal({ isOpen, onClose, candidate }) {
    if (!isOpen || !candidate) return null;

    const initials = candidate.name
        ? candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "EH";

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

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-4xl bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8] my-8 max-h-[90vh] flex flex-col"
                >
                    {/* Top Header Close Button */}
                    <div className="p-4 border-b border-[#E4E5E8] flex justify-end bg-white sticky top-0 z-20">
                        <button
                            onClick={onClose}
                            className="p-2 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-full transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
                        {/* Top Profile Summary Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E4E5E8]">
                            <div className="flex items-center gap-4">
                                {/* Placeholder Div for Avatar (No real images as requested) */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E8F1FF] text-[#0A65CC] font-bold text-xl sm:text-2xl flex items-center justify-center rounded-full border border-[#0A65CC]/20 shrink-0">
                                    {initials}
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                                        {candidate.name || "Esther Howard"}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#767E94] mt-1 font-medium">
                                        {candidate.role || "Website Designer (UI/UX)"}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
                                <button className="p-2.5 bg-white border border-[#E4E5E8] text-[#0A65CC] hover:bg-[#E8F1FF] rounded-none transition-colors cursor-pointer" title="Save Candidate">
                                    <Star className="w-4 h-4 fill-current text-[#0A65CC]" />
                                </button>
                                <button className="px-4 py-2.5 bg-white border border-[#0A65CC] text-[#0A65CC] hover:bg-[#E8F1FF] font-semibold text-xs sm:text-sm rounded-none flex items-center gap-2 transition-colors cursor-pointer">
                                    <Mail className="w-4 h-4" />
                                    <span>Send Mail</span>
                                </button>
                                <button className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                                    <UserCheck className="w-4 h-4" />
                                    <span>Hire Candidate</span>
                                </button>
                            </div>
                        </div>

                        {/* Two Columns Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Biography & Cover Letter (7 cols) */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* BIOGRAPHY */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#18191C] mb-3">
                                        BIOGRAPHY
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed">
                                        I have been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs.
                                    </p>
                                </div>

                                {/* COVER LETTER */}
                                <div className="pt-4 border-t border-[#E4E5E8]">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#18191C] mb-3">
                                        COVER LETTER
                                    </h4>
                                    <div className="text-xs sm:text-sm text-[#5E6670] leading-relaxed space-y-3">
                                        <p>Dear Sir/Madam,</p>
                                        <p>
                                            I am writing to express my interest in the UI/UX Designer position that is currently available. I learned of the opening through your platform's job database and am confident that my academic background and design skills would be successfully utilized in this role.
                                        </p>
                                        <p>
                                            During my career experience, I developed and initiated multi-week design sprint sequences for web and mobile platforms. This collaborative unit involved working with cross-functional teams culminating in top user engagement metrics.
                                        </p>
                                        <p>Sincerely,</p>
                                        <p className="font-semibold text-[#18191C]">{candidate.name || "Esther Howard"}</p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="pt-4 border-t border-[#E4E5E8]">
                                    <h5 className="text-xs font-semibold text-[#767E94] mb-3">
                                        Follow me Social Media
                                    </h5>
                                    <div className="flex items-center gap-2">
                                        {/* Facebook */}
                                        <button className="p-2.5 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white rounded-none transition-colors cursor-pointer" title="Facebook">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </button>
                                        {/* Twitter / X */}
                                        <button className="p-2.5 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white rounded-none transition-colors cursor-pointer" title="Twitter">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                                            </svg>
                                        </button>
                                        {/* LinkedIn */}
                                        <button className="p-2.5 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white rounded-none transition-colors cursor-pointer" title="LinkedIn">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </button>
                                        {/* Share */}
                                        <button className="p-2.5 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white rounded-none transition-colors cursor-pointer" title="Share">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Key Details & Resume Card (5 cols) */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Grid Info Details */}
                                <div className="bg-[#F8F9FA] p-5 border border-[#E4E5E8] rounded-none grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                            <Calendar className="w-3 h-3 text-[#0A65CC]" />
                                            <span>DATE OF BIRTH</span>
                                        </div>
                                        <p className="text-xs font-semibold text-[#18191C]">14 June, 1996</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                            <Globe className="w-3 h-3 text-[#0A65CC]" />
                                            <span>NATIONALITY</span>
                                        </div>
                                        <p className="text-xs font-semibold text-[#18191C]">United States</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                            <UserCheck className="w-3 h-3 text-[#0A65CC]" />
                                            <span>MARITAL STATUS</span>
                                        </div>
                                        <p className="text-xs font-semibold text-[#18191C]">Single</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                            <Award className="w-3 h-3 text-[#0A65CC]" />
                                            <span>EXPERIENCE</span>
                                        </div>
                                        <p className="text-xs font-semibold text-[#18191C]">7 Years</p>
                                    </div>

                                    <div className="col-span-2">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#767E94] uppercase mb-1">
                                            <GraduationCap className="w-3 h-3 text-[#0A65CC]" />
                                            <span>EDUCATIONS</span>
                                        </div>
                                        <p className="text-xs font-semibold text-[#18191C]">Master Degree in Design</p>
                                    </div>
                                </div>

                                {/* Download Resume Card */}
                                <div className="bg-white p-5 border border-[#E4E5E8] rounded-none space-y-3">
                                    <h5 className="text-xs font-bold text-[#18191C] uppercase tracking-wider">
                                        Download My Resume
                                    </h5>
                                    <div className="flex items-center justify-between p-3 bg-[#F8F9FA] border border-[#E4E5E8] rounded-none">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#E8F1FF] text-[#0A65CC] rounded-none">
                                                <Download className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-[#18191C]">
                                                    {candidate.name || "Esther Howard"} Resume
                                                </p>
                                                <p className="text-[10px] text-[#767E94]">PDF File • 2.4 MB</p>
                                            </div>
                                        </div>
                                        <button className="p-2 bg-[#0A65CC] text-white hover:bg-[#0851A8] rounded-none transition-colors cursor-pointer">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-white p-5 border border-[#E4E5E8] rounded-none space-y-4">
                                    <h5 className="text-xs font-bold text-[#18191C] uppercase tracking-wider">
                                        Contact Information
                                    </h5>
                                    <div className="space-y-3 text-xs text-[#5E6670]">
                                        <div className="flex items-start gap-2.5">
                                            <Globe className="w-4 h-4 text-[#0A65CC] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] font-semibold text-[#767E94] uppercase">WEBSITE</p>
                                                <p className="font-semibold text-[#0A65CC]">www.estherhoward.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="w-4 h-4 text-[#0A65CC] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] font-semibold text-[#767E94] uppercase">LOCATION</p>
                                                <p className="font-semibold text-[#18191C]">Beverly Hills, California 90202</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <Phone className="w-4 h-4 text-[#0A65CC] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] font-semibold text-[#767E94] uppercase">PHONE</p>
                                                <p className="font-semibold text-[#18191C]">+1 202 555 0141</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <Mail className="w-4 h-4 text-[#0A65CC] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] font-semibold text-[#767E94] uppercase">EMAIL ADDRESS</p>
                                                <p className="font-semibold text-[#18191C]">esther.howard@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
