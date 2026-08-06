import React, { useState } from "react";
import {
    Share2,
    Plus,
    Trash2,
    Check,
    Globe,
} from "lucide-react";

export default function SocialLinksTab() {
    // Social links list state
    const [socialLinks, setSocialLinks] = useState([
        { id: 1, platform: "LinkedIn", url: "https://linkedin.com/in/username" },
        { id: 2, platform: "GitHub", url: "https://github.com/username" },
        { id: 3, platform: "Twitter / X", url: "https://x.com/username" },
    ]);

    const [showSocialSuccess, setShowSocialSuccess] = useState(false);

    const platformOptions = [
        "LinkedIn",
        "GitHub",
        "Twitter / X",
        "Facebook",
        "YouTube",
        "Dribbble",
        "Behance",
        "Stack Overflow",
        "Personal Website",
        "Other",
    ];

    const getPlatformIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case "linkedin":
                return (
                    <svg className="w-4 h-4 text-[#0A66C2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                );
            case "github":
                return (
                    <svg className="w-4 h-4 text-[#181717] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                );
            case "twitter / x":
            case "twitter":
                return (
                    <svg className="w-4 h-4 text-[#1DA1F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                );
            case "facebook":
                return (
                    <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                );
            case "youtube":
                return (
                    <svg className="w-4 h-4 text-[#FF0000] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                );
            default:
                return <Globe className="w-4 h-4 text-[#0A65CC] shrink-0" />;
        }
    };

    const handleAddSocialLink = () => {
        const newLink = {
            id: Date.now(),
            platform: "LinkedIn",
            url: "",
        };
        setSocialLinks((prev) => [...prev, newLink]);
    };

    const handleUpdateSocialLink = (id, key, value) => {
        setSocialLinks((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
        );
    };

    const handleDeleteSocialLink = (id) => {
        setSocialLinks((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSaveSocialLinks = (e) => {
        if (e) e.preventDefault();
        setShowSocialSuccess(true);
        setTimeout(() => setShowSocialSuccess(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {showSocialSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Social links saved successfully!</span>
                </div>
            )}

            <div className="flex items-center justify-between pb-2 border-b border-[#E4E5E8]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none">
                        <Share2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Social Profiles & Media Links
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Connect your online presence, code repositories, and portfolios
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="px-4 py-2.5 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 cursor-pointer transition-colors"
                >
                    <Plus className="w-4 h-4 text-[#0A65CC]" />
                    <span>Add New Link</span>
                </button>
            </div>

            <form onSubmit={handleSaveSocialLinks} className="space-y-4">
                {socialLinks.length === 0 ? (
                    <div className="p-8 border border-dashed border-[#E4E5E8] bg-[#F8F9FA] text-center space-y-3">
                        <Share2 className="w-12 h-12 text-[#9199A3] mx-auto" />
                        <h4 className="text-sm font-bold text-[#18191C]">
                            No Social Links Added
                        </h4>
                        <p className="text-xs text-[#767E94] max-w-md mx-auto">
                            Adding social profiles like LinkedIn and GitHub increases recruiter engagement.
                        </p>
                        <button
                            type="button"
                            onClick={handleAddSocialLink}
                            className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                        >
                            Add Social Link
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {socialLinks.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 bg-white p-3 border border-[#E4E5E8] rounded-none flex-col sm:flex-row"
                            >
                                {/* Platform Dropdown */}
                                <div className="flex items-center gap-2.5 w-full sm:w-56 shrink-0 bg-[#F8F9FA] px-3 h-11 border border-[#E4E5E8]">
                                    {getPlatformIcon(item.platform)}
                                    <select
                                        value={item.platform}
                                        onChange={(e) =>
                                            handleUpdateSocialLink(item.id, "platform", e.target.value)
                                        }
                                        className="w-full h-full bg-transparent text-xs font-bold text-[#18191C] focus:outline-none cursor-pointer"
                                    >
                                        {platformOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* URL Input */}
                                <div className="flex-1 w-full">
                                    <input
                                        type="url"
                                        value={item.url}
                                        onChange={(e) =>
                                            handleUpdateSocialLink(item.id, "url", e.target.value)
                                        }
                                        placeholder={`https://${item.platform.toLowerCase().replace(/[^a-z0-9]/g, "")}.com/...`}
                                        className="w-full h-11 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSocialLink(item.id)}
                                    className="p-2.5 text-[#767E94] hover:text-[#E05151] hover:bg-[#FFF0F0] transition-colors rounded-none shrink-0 self-end sm:self-center cursor-pointer"
                                    title="Remove link"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors"
                    >
                        Save Social Links
                    </button>
                </div>
            </form>
        </div>
    );
}
