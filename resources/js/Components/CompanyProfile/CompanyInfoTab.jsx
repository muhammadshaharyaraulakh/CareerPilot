import React, { useState, useRef } from "react";
import { CloudUpload, ArrowRight, X, Check } from "lucide-react";

export default function CompanyInfoTab({ formData, updateFormData, onNext }) {
    const logoInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    const [logoPreview, setLogoPreview] = useState(formData?.logoPreview || null);
    const [bannerPreview, setBannerPreview] = useState(formData?.bannerPreview || null);
    const [isDragOverLogo, setIsDragOverLogo] = useState(false);
    const [isDragOverBanner, setIsDragOverBanner] = useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    // Handle Logo File Selection
    const handleLogoFile = (file) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("Logo photo size must be less than 5 MB");
            return;
        }
        const url = URL.createObjectURL(file);
        setLogoPreview(url);
        updateFormData({ logoFile: file, logoPreview: url });
    };

    // Handle Banner File Selection
    const handleBannerFile = (file) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("Banner image size must be less than 5 MB");
            return;
        }
        const url = URL.createObjectURL(file);
        setBannerPreview(url);
        updateFormData({ bannerFile: file, bannerPreview: url });
    };

    // Form text updates
    const handleInputChange = (e) => {
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
            {/* Success Alert Banner */}
            {showSuccessMsg && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-md text-[#0BA02C] text-xs sm:text-sm font-medium flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Company Info saved successfully! Moving to next step</span>
                    </div>
                </div>
            )}

            {/* Section 1: Logo & Banner Image Header */}
            <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#18191C] mb-4">
                    Logo & Banner Image
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                    {/* Upload Logo Box */}
                    <div className="md:col-span-4 flex flex-col gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#18191C]">
                            Upload Logo
                        </span>

                        <input
                            type="file"
                            ref={logoInputRef}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) => handleLogoFile(e.target.files[0])}
                        />

                        {logoPreview ? (
                            <div className="relative border border-[#E4E5E8] rounded-md p-4 bg-white flex flex-col items-center justify-center min-h-[200px] group">
                                <img
                                    src={logoPreview}
                                    alt="Logo preview"
                                    className="max-h-[140px] w-auto object-contain rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLogoPreview(null);
                                        updateFormData({ logoFile: null, logoPreview: null });
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-[#EDF2F7] hover:bg-[#E2E8F0] text-[#475156] rounded-full transition-colors"
                                    title="Remove Logo"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => logoInputRef.current?.click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragOverLogo(true);
                                }}
                                onDragLeave={() => setIsDragOverLogo(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragOverLogo(false);
                                    if (e.dataTransfer.files?.[0]) handleLogoFile(e.dataTransfer.files[0]);
                                }}
                                className={`border-2 border-dashed rounded-md p-6 sm:p-8 bg-[#F1F2F4]/40 hover:bg-[#F1F2F4]/70 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[200px] ${
                                    isDragOverLogo
                                        ? "border-[#0A65CC] bg-[#0A65CC]/5"
                                        : "border-[#CCCCCC]"
                                }`}
                            >
                                <div className="w-14 h-14 rounded-full bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center mb-3 transition-transform hover:scale-105">
                                    <CloudUpload className="w-8 h-8" />
                                </div>
                                <p className="text-xs sm:text-sm text-[#18191C] font-normal mb-1">
                                    <span className="font-semibold text-[#18191C]">Browse photo</span> or drop here
                                </p>
                                <p className="text-[11px] sm:text-xs text-[#767E94] max-w-[200px] leading-relaxed">
                                    A photo larger than 400 pixels work best. Max photo size 5 MB.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Banner Image Box */}
                    <div className="md:col-span-8 flex flex-col gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#18191C]">
                            Banner Image
                        </span>

                        <input
                            type="file"
                            ref={bannerInputRef}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) => handleBannerFile(e.target.files[0])}
                        />

                        {bannerPreview ? (
                            <div className="relative border border-[#E4E5E8] rounded-md p-4 bg-white flex flex-col items-center justify-center min-h-[200px] group">
                                <img
                                    src={bannerPreview}
                                    alt="Banner preview"
                                    className="max-h-[160px] w-full object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setBannerPreview(null);
                                        updateFormData({ bannerFile: null, bannerPreview: null });
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-[#EDF2F7] hover:bg-[#E2E8F0] text-[#475156] rounded-full transition-colors"
                                    title="Remove Banner"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => bannerInputRef.current?.click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragOverBanner(true);
                                }}
                                onDragLeave={() => setIsDragOverBanner(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragOverBanner(false);
                                    if (e.dataTransfer.files?.[0]) handleBannerFile(e.dataTransfer.files[0]);
                                }}
                                className={`border-2 border-dashed rounded-md p-6 sm:p-8 bg-[#F1F2F4]/40 hover:bg-[#F1F2F4]/70 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[200px] ${
                                    isDragOverBanner
                                        ? "border-[#0A65CC] bg-[#0A65CC]/5"
                                        : "border-[#CCCCCC]"
                                }`}
                            >
                                <div className="w-14 h-14 rounded-full bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center mb-3 transition-transform hover:scale-105">
                                    <CloudUpload className="w-8 h-8" />
                                </div>
                                <p className="text-xs sm:text-sm text-[#18191C] font-normal mb-1">
                                    <span className="font-semibold text-[#18191C]">Browse photo</span> or drop here
                                </p>
                                <p className="text-[11px] sm:text-xs text-[#767E94] max-w-[360px] leading-relaxed">
                                    Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Section 2: Company Name Input */}
            <div className="flex flex-col gap-2">
                <label htmlFor="companyName" className="text-xs sm:text-sm font-medium text-[#18191C]">
                    Company name
                </label>
                <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full h-12 px-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                />
            </div>

            {/* Section 3: Simple About Us Textarea */}
            <div className="flex flex-col gap-2">
                <label htmlFor="aboutUs" className="text-xs sm:text-sm font-medium text-[#18191C]">
                    About Us
                </label>

                <textarea
                    id="aboutUs"
                    name="aboutUs"
                    rows="6"
                    value={formData.aboutUs || ""}
                    onChange={handleInputChange}
                    placeholder="Write down about your company here. Let the candidate know who we are"
                    className="w-full p-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all resize-none"
                ></textarea>
            </div>

            {/* Section 4: Action Button */}
            <div className="pt-2">
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
