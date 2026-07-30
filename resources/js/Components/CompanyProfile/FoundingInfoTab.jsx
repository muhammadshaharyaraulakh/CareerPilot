import React, { useState } from "react";
import { ArrowRight, Link as LinkIcon, Check } from "lucide-react";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";

export default function FoundingInfoTab({ formData, updateFormData, onNext, onPrev }) {
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessMsg(true);
        setTimeout(() => {
            setShowSuccessMsg(false);
            if (onNext) onNext();
        }, 600);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 sm:space-y-8">
            {showSuccessMsg && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-md text-[#0BA02C] text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Founding Info saved! Moving to next step</span>
                </div>
            )}

            {/* Row 1: Organization Type, Industry Types, Team Size */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {/* Organization Type */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="organizationType" className="text-xs sm:text-sm font-medium text-[#18191C]">
                        Organization Type
                    </label>
                    <div className="relative">
                        <select
                            id="organizationType"
                            name="organizationType"
                            value={formData.organizationType || ""}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled hidden>
                                Select
                            </option>
                            <option value="Private Limited">Private Limited</option>
                            <option value="Public Limited">Public Limited</option>
                            <option value="Non Profit">Non Profit / NGO</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#9199A3]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Industry Types */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="industryType" className="text-xs sm:text-sm font-medium text-[#18191C]">
                        Industry Types
                    </label>
                    <div className="relative">
                        <select
                            id="industryType"
                            name="industryType"
                            value={formData.industryType || ""}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled hidden>
                                Select
                            </option>
                            <option value="Technology & Software">Technology & Software</option>
                            <option value="Finance & Banking">Finance & Banking</option>
                            <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                            <option value="E Commerce & Retail">E Commerce & Retail</option>
                            <option value="Design & Creative">Design & Creative</option>
                            <option value="Education & EdTech">Education & EdTech</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#9199A3]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Team Size */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="teamSize" className="text-xs sm:text-sm font-medium text-[#18191C]">
                        Team Size
                    </label>
                    <div className="relative">
                        <select
                            id="teamSize"
                            name="teamSize"
                            value={formData.teamSize || ""}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all appearance-none cursor-pointer pr-10"
                        >
                            <option value="" disabled hidden>
                                Select
                            </option>
                            <option value="1 to 10">1 to 10 Employees</option>
                            <option value="11 to 50">11 to 50 Employees</option>
                            <option value="51 to 200">51 to 200 Employees</option>
                            <option value="201 to 500">201 to 500 Employees</option>
                            <option value="500+">500+ Employees</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#9199A3]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Year of Establishment & Company Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Year of Establishment with DatePickerInput */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="establishmentYear" className="text-xs sm:text-sm font-medium text-[#18191C]">
                        Year of Establishment
                    </label>
                    <DatePickerInput
                        id="establishmentYear"
                        name="establishmentYear"
                        value={formData.establishmentYear || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Company Website */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="website" className="text-xs sm:text-sm font-medium text-[#18191C]">
                        Company Website
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0A65CC]">
                            <LinkIcon className="w-4 h-4" />
                        </div>
                        <input
                            id="website"
                            type="url"
                            name="website"
                            value={formData.website || ""}
                            onChange={handleChange}
                            placeholder="Website URL"
                            className="w-full h-12 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Row 3: Simple Company Vision Textarea */}
            <div className="flex flex-col gap-2">
                <label htmlFor="vision" className="text-xs sm:text-sm font-medium text-[#18191C]">
                    Company Vision
                </label>

                <textarea
                    id="vision"
                    name="vision"
                    rows="6"
                    value={formData.vision || ""}
                    onChange={handleChange}
                    placeholder="Tell us about your company vision"
                    className="w-full p-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all resize-none"
                ></textarea>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    type="button"
                    onClick={onPrev}
                    className="h-12 px-7 bg-[#E4E5E8]/60 hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs sm:text-sm rounded-md transition-all inline-flex items-center justify-center cursor-pointer"
                >
                    Previous
                </button>

                <button
                    type="submit"
                    className="h-12 px-7 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm rounded-md transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                    <span>Save & Next</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
}
