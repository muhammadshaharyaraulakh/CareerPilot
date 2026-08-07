import React, { useState, useEffect } from "react";
import {
    Share2,
    Plus,
    Trash2,
    Check,
    Globe,
    Loader2,
} from "lucide-react";
import Toast from "@/Components/Toast";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function SocialLinksTab() {
    const [socialLinks, setSocialLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // Delete confirmation state
    const [deleteTargetItem, setDeleteTargetItem] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const platformOptions = [
        "LinkedIn",
        "GitHub",
        "Twitter / X",
        "Facebook",
        "YouTube",
        "Instagram",
        "Dribbble",
        "Behance",
        "Stack Overflow",
        "Portfolio Website",
        "Other",
    ];

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
    };

    const showToast = (text, type = "success", duration = 3000) => {
        setToast({ text, type, duration });
    };

    const fetchSocialLinks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/social-links", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                // Normalize data structure
                const normalized = json.data.map((item) => ({
                    id: item.id,
                    provider: item.provider || item.platform_name || "LinkedIn",
                    url: item.url || item.profile_url || "",
                }));
                setSocialLinks(normalized);
            }
        } catch (err) {
            console.error("Failed to fetch social links:", err);
            showToast("Failed to load social links", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
    }, []);

    const getPlatformIcon = (platform) => {
        switch ((platform || "").toLowerCase()) {
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
            case "instagram":
                return (
                    <svg className="w-4 h-4 text-[#E4405F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                );
            default:
                return <Globe className="w-4 h-4 text-[#0A65CC] shrink-0" />;
        }
    };

    const handleAddSocialLink = () => {
        const tempId = "new_" + Date.now();
        const newLink = {
            id: tempId,
            provider: "LinkedIn",
            url: "",
        };
        setSocialLinks((prev) => [...prev, newLink]);
    };

    const handleUpdateSocialLink = (id, key, value) => {
        setSocialLinks((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
        );
    };

    const handlePromptDeleteSocialLink = (item) => {
        if (!item.id || String(item.id).startsWith("new_")) {
            setSocialLinks((prev) => prev.filter((i) => i.id !== item.id));
            return;
        }
        setDeleteTargetItem(item);
    };

    const confirmDeleteSocialLink = async () => {
        if (!deleteTargetItem) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/candidate/social-links/${deleteTargetItem.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                showToast("Social link deleted successfully!", "success");
                setSocialLinks((prev) => prev.filter((i) => i.id !== deleteTargetItem.id));
                setDeleteTargetItem(null);
            } else {
                showToast(json.message || json.error || "Failed to delete social link", "error");
            }
        } catch (err) {
            console.error("Delete social link error:", err);
            showToast("Server exception while deleting social link", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSaveSocialLinks = async (e) => {
        if (e) e.preventDefault();
        setFormErrors({});
        setIsSubmitting(true);

        const linksPayload = socialLinks.map((item) => ({
            id: item.id,
            provider: item.provider || item.platform_name || "LinkedIn",
            url: item.url || item.profile_url || "",
        }));

        try {
            const res = await fetch("/candidate/social-links", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: JSON.stringify({ links: linksPayload }),
            });

            const json = await res.json();

            if (res.status === 422 || json.errors) {
                setFormErrors(json.errors || {});
                return;
            }

            if (json.success) {
                showToast(json.message || "Social links saved successfully!", "success");
                fetchSocialLinks();
            } else {
                showToast(json.message || json.error || "Failed to save social links", "error");
            }
        } catch (err) {
            console.error("Save social links error:", err);
            showToast("Server exception while saving social links", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <Toast toast={toast} onClose={() => setToast(null)} />

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

            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading social links...</p>
                </div>
            ) : (
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
                            {socialLinks.map((item, index) => {
                                const platformVal = item.provider || item.platform_name || "LinkedIn";
                                const urlVal = item.url || item.profile_url || "";
                                const urlError =
                                    formErrors[`links.${index}.url`]?.[0] ||
                                    formErrors[`links.${index}.profile_url`]?.[0] ||
                                    formErrors[`links.${index}.provider`]?.[0];

                                return (
                                    <div key={item.id || index} className="space-y-1">
                                        <div className="flex items-center gap-3 bg-white p-3 border border-[#E4E5E8] rounded-none flex-col sm:flex-row">
                                            {/* Platform Dropdown */}
                                            <div className="flex items-center gap-2.5 w-full sm:w-56 shrink-0 bg-[#F8F9FA] px-3 h-11 border border-[#E4E5E8]">
                                                {getPlatformIcon(platformVal)}
                                                <select
                                                    value={platformVal}
                                                    onChange={(e) =>
                                                        handleUpdateSocialLink(item.id, "provider", e.target.value)
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
                                                    type="text"
                                                    value={urlVal}
                                                    onChange={(e) => {
                                                        handleUpdateSocialLink(item.id, "url", e.target.value);
                                                        if (formErrors[`links.${index}.url`]) {
                                                            const newErrs = { ...formErrors };
                                                            delete newErrs[`links.${index}.url`];
                                                            setFormErrors(newErrs);
                                                        }
                                                    }}
                                                    placeholder={`https://${platformVal.toLowerCase().replace(/[^a-z0-9]/g, "")}.com/...`}
                                                    className={`w-full h-11 px-4 text-sm bg-white border ${
                                                        urlError ? "border-[#E05151]" : "border-[#E4E5E8]"
                                                    } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                                />
                                            </div>

                                            {/* Delete Button */}
                                            <button
                                                type="button"
                                                onClick={() => handlePromptDeleteSocialLink(item)}
                                                className="p-2.5 text-[#767E94] hover:text-[#E05151] hover:bg-[#FFF0F0] transition-colors rounded-none shrink-0 self-end sm:self-center cursor-pointer"
                                                title="Remove link"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {urlError && (
                                            <p className="text-xs text-[#E05151] font-medium pl-1">
                                                {urlError}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {formErrors.links && (
                        <p className="text-xs text-[#E05151] font-medium">
                            {formErrors.links[0]}
                        </p>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>Save Social Links</span>
                        </button>
                    </div>
                </form>
            )}

            <DeleteConfirmationModal
                isOpen={Boolean(deleteTargetItem)}
                onClose={() => setDeleteTargetItem(null)}
                onConfirm={confirmDeleteSocialLink}
                isDeleting={isDeleting}
                title="Remove Social Link"
                message="Are you sure you want to remove this social link? This action cannot be undone."
            />
        </div>
    );
}
