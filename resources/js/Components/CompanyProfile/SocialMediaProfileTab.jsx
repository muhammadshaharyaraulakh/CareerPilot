import React, { useState } from "react";
import { ArrowRight, Plus, Trash2, Check } from "lucide-react";

export default function SocialMediaProfileTab({ formData, updateFormData, onNext, onPrev }) {
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const socialLinks = formData.socialLinks || [
        { platform: "Facebook", url: "" },
        { platform: "Twitter", url: "" },
        { platform: "LinkedIn", url: "" },
    ];

    const handleLinkChange = (index, value) => {
        const updated = [...socialLinks];
        updated[index].url = value;
        updateFormData({ socialLinks: updated });
    };

    const handlePlatformChange = (index, value) => {
        const updated = [...socialLinks];
        updated[index].platform = value;
        updateFormData({ socialLinks: updated });
    };

    const addSocialLink = () => {
        const updated = [...socialLinks, { platform: "Facebook", url: "" }];
        updateFormData({ socialLinks: updated });
    };

    const removeSocialLink = (index) => {
        const updated = socialLinks.filter((_, i) => i !== index);
        updateFormData({ socialLinks: updated });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessMsg(true);
        setTimeout(() => {
            setShowSuccessMsg(false);
            if (onNext) onNext();
        }, 600);
    };

    // Platform SVG icons mapping
    const getPlatformIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case "facebook":
                return (
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                );
            case "twitter":
            case "x":
                return (
                    <svg className="w-4 h-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                );
            case "linkedin":
                return (
                    <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                );
            case "instagram":
                return (
                    <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                );
            case "youtube":
                return (
                    <svg className="w-5 h-5 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 sm:space-y-8">
            {showSuccessMsg && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-md text-[#0BA02C] text-xs sm:text-sm font-medium flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Social Media Info saved! Moving to next step</span>
                </div>
            )}

            <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#18191C]">
                    Social Media Profile
                </h3>

                {socialLinks.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        {/* Select Platform */}
                        <div className="w-36 sm:w-44 shrink-0">
                            <select
                                value={item.platform}
                                onChange={(e) => handlePlatformChange(index, e.target.value)}
                                className="w-full h-12 px-3 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all cursor-pointer"
                            >
                                <option value="Facebook">Facebook</option>
                                <option value="Twitter">Twitter / X</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Instagram">Instagram</option>
                                <option value="YouTube">YouTube</option>
                            </select>
                        </div>

                        {/* Input URL */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                {getPlatformIcon(item.platform)}
                            </div>
                            <input
                                type="url"
                                value={item.url}
                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                placeholder={`Profile link or URL for ${item.platform}`}
                                className="w-full h-12 pl-11 pr-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                            />
                        </div>

                        {/* Remove Link Button */}
                        {socialLinks.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSocialLink(index)}
                                className="p-3 text-[#9199A3] hover:text-[#E05151] hover:bg-[#F1F2F4] rounded-md transition-colors shrink-0"
                                title="Remove Social Link"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}

                {/* Add New Link Button */}
                <button
                    type="button"
                    onClick={addSocialLink}
                    className="mt-2 text-xs sm:text-sm font-semibold text-[#0A65CC] hover:text-[#0852A8] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Social Link</span>
                </button>
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
