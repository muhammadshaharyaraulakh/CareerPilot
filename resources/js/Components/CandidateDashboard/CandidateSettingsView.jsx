import React, { useState } from "react";
import {
    User,
    FileText,
    Share2,
    Lock,
    UploadCloud,
    Plus,
    MoreHorizontal,
    Edit2,
    Trash2,
    X,
    Calendar,
    Link as LinkIcon,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Check,
    Mail,
    MapPin,
    Briefcase,
    ChevronDown,
    Eye,
    EyeOff,
    XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateSettingsView() {
    const [activeTab, setActiveTab] = useState("Account Setting");

    // CV / Resume state
    const [resumes, setResumes] = useState([
        { id: 1, name: "Professional Resume", size: "3.5 MB" },
        { id: 2, name: "Product Designer", size: "4.7 MB" },
        { id: 3, name: "Visual Designer", size: "1.3 MB" },
    ]);

    const [activeMenuId, setActiveMenuId] = useState(2);
    const [isAddCvModalOpen, setIsAddCvModalOpen] = useState(false);
    const [newCvName, setNewCvName] = useState("");

    // Social Links state (Matching Employer Social Media Profile layout)
    const [socialLinks, setSocialLinks] = useState([
        { platform: "Facebook", url: "https://facebook.com/esther.howard" },
        { platform: "Twitter", url: "https://twitter.com/esther.howard" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/esther-howard" },
    ]);
    const [showSocialSuccess, setShowSocialSuccess] = useState(false);

    // Account Setting States
    const [contactInfo, setContactInfo] = useState({
        mapLocation: "",
        countryCode: "+880",
        phone: "",
        email: "",
    });

    const [notifications, setNotifications] = useState({
        shortlisted: true,
        savedProfile: false,
        appliedJobsExpire: false,
        rejected: true,
        jobAlertsLimit: true,
    });

    const [jobAlerts, setJobAlerts] = useState({
        role: "",
        location: "",
    });

    const [privacy, setPrivacy] = useState({
        profilePublic: true,
        resumePublic: false,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showAccountSuccess, setShowAccountSuccess] = useState(false);

    const handleSaveAccountSection = (e) => {
        if (e) e.preventDefault();
        setShowAccountSuccess(true);
        setTimeout(() => setShowAccountSuccess(false), 3000);
    };

    const handleLinkChange = (index, value) => {
        const updated = [...socialLinks];
        updated[index].url = value;
        setSocialLinks(updated);
    };

    const handlePlatformChange = (index, value) => {
        const updated = [...socialLinks];
        updated[index].platform = value;
        setSocialLinks(updated);
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { platform: "Facebook", url: "" }]);
    };

    const removeSocialLink = (index) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

    const handleSaveSocialLinks = (e) => {
        e.preventDefault();
        setShowSocialSuccess(true);
        setTimeout(() => setShowSocialSuccess(false), 3000);
    };

    const handleAddCvSubmit = (e) => {
        e.preventDefault();
        if (!newCvName.trim()) return;
        const newDoc = {
            id: Date.now(),
            name: newCvName,
            size: "2.4 MB",
        };
        setResumes((prev) => [...prev, newDoc]);
        setNewCvName("");
        setIsAddCvModalOpen(false);
    };

    const handleDeleteCv = (id) => {
        setResumes((prev) => prev.filter((r) => r.id !== id));
        setActiveMenuId(null);
    };

    // Platform SVG icons mapping matching Employer dashboard
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
        <div className="space-y-8 font-sans text-[#18191C]">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                    Settings
                </h2>
            </div>

            {/* Success Feedback Alert */}
            {showAccountSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Account settings saved successfully!</span>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="border-b border-[#E4E5E8] flex items-center gap-6 overflow-x-auto">
                {[
                    { key: "Personal", label: "Personal", icon: User },
                    { key: "Profile", label: "Profile", icon: FileText },
                    { key: "Social Links", label: "Social Links", icon: Share2 },
                    { key: "Account Setting", label: "Account Setting", icon: Lock },
                ].map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-3.5 px-1 font-semibold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-colors cursor-pointer shrink-0 ${
                                isActive
                                    ? "border-[#0A65CC] text-[#0A65CC]"
                                    : "border-transparent text-[#767E94] hover:text-[#18191C]"
                            }`}
                        >
                            <IconComp className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* TAB 1: PERSONAL INFO */}
            {activeTab === "Personal" && (
                <div className="space-y-8 max-w-4xl">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-base font-bold text-[#18191C]">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Profile Picture Upload Box */}
                            <div className="md:col-span-1">
                                <label className="block text-xs font-semibold text-[#18191C] mb-2">
                                    Profile Picture
                                </label>
                                <div className="border-2 border-dashed border-[#E4E5E8] hover:border-[#0A65CC] p-6 text-center rounded-none bg-[#F8F9FA] transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[210px]">
                                    <UploadCloud className="w-10 h-10 text-[#0A65CC] mb-2" />
                                    <p className="text-xs font-bold text-[#18191C]">
                                        Browse photo <span className="font-normal text-[#767E94]">or drop here</span>
                                    </p>
                                    <p className="text-[11px] text-[#9199A3] mt-1 leading-tight max-w-[200px]">
                                        A photo larger than 400 pixels work best. Max photo size 5 MB.
                                    </p>
                                </div>
                            </div>

                            {/* Form Input Fields */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                            Tittle/headline
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                            Experience
                                        </label>
                                        <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                            <option value="">Select</option>
                                            <option value="1-2">1 to 2 Years</option>
                                            <option value="3-5">3 to 5 Years</option>
                                            <option value="5+">5 Plus Years</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                            Educations
                                        </label>
                                        <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                            <option value="">Select</option>
                                            <option value="bachelor">Bachelor Degree</option>
                                            <option value="master">Master Degree</option>
                                            <option value="phd">PhD</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Personal Website
                                    </label>
                                    <div className="relative flex items-center">
                                        <LinkIcon className="w-4 h-4 text-[#0A65CC] absolute left-3.5 pointer-events-none" />
                                        <input
                                            type="url"
                                            placeholder="Website url"
                                            className="w-full h-11 pl-10 pr-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>

                    {/* Your CV / Resume Section */}
                    <div className="pt-6 border-t border-[#E4E5E8] space-y-4">
                        <h3 className="text-base font-bold text-[#18191C]">
                            Your Cv/Resume
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {resumes.map((res) => (
                                <div
                                    key={res.id}
                                    className="bg-[#F1F2F4] border border-[#E4E5E8] p-4 rounded-none flex items-center justify-between relative"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <FileText className="w-6 h-6 text-[#0A65CC] shrink-0" />
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-[#18191C] truncate">
                                                {res.name}
                                            </h4>
                                            <p className="text-[11px] text-[#767E94]">{res.size}</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveMenuId(
                                                    activeMenuId === res.id ? null : res.id
                                                )
                                            }
                                            className="p-1.5 text-[#767E94] hover:text-[#18191C] rounded-none transition-colors cursor-pointer"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>

                                        <AnimatePresence>
                                            {activeMenuId === res.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#E4E5E8] shadow-xl z-30 py-1.5 rounded-none"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveMenuId(null)}
                                                        className="w-full px-3 py-1.5 text-left text-xs text-[#0A65CC] hover:bg-[#F1F2F4] flex items-center gap-2 cursor-pointer font-semibold"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                        <span>Edit Resume</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteCv(res.id)}
                                                        className="w-full px-3 py-1.5 text-left text-xs text-[#E05151] hover:bg-[#FFF0F0] flex items-center gap-2 cursor-pointer font-semibold"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        <span>Delete</span>
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => setIsAddCvModalOpen(true)}
                                className="border-2 border-dashed border-[#CEE0F5] hover:border-[#0A65CC] p-4 text-center rounded-none bg-white hover:bg-[#E8F1FF]/30 transition-colors cursor-pointer flex items-center gap-3 min-h-[72px]"
                            >
                                <div className="w-8 h-8 rounded-full border-2 border-[#0A65CC] text-[#0A65CC] flex items-center justify-center shrink-0">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xs font-bold text-[#18191C]">
                                        Add Cv/Resume
                                    </h4>
                                    <p className="text-[11px] text-[#767E94]">
                                        Browse file or drop here. only pdf
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: PROFILE */}
            {activeTab === "Profile" && (
                <div className="space-y-6 max-w-4xl">
                    <h3 className="text-base font-bold text-[#18191C]">
                        Settings
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                Nationality
                            </label>
                            <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                <option value="">Select</option>
                                <option value="american">American</option>
                                <option value="british">British</option>
                                <option value="indian">Indian</option>
                                <option value="canadian">Canadian</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                Date of Birth
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    className="w-full h-11 pr-10 pl-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                                />
                                <Calendar className="w-4 h-4 text-[#767E94] absolute right-3 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                Gender
                            </label>
                            <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                Marital Status
                            </label>
                            <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                <option value="">Select</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                Education
                            </label>
                            <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                <option value="">Select</option>
                                <option value="highschool">High School</option>
                                <option value="bachelor">Bachelor</option>
                                <option value="master">Master</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                Experience
                            </label>
                            <select className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#767E94] focus:outline-none focus:border-[#0A65CC] cursor-pointer">
                                <option value="">Select</option>
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Biography
                        </label>
                        <div className="border border-[#E4E5E8] bg-white rounded-none overflow-hidden focus-within:border-[#0A65CC]">
                            <textarea
                                rows={5}
                                placeholder="Write down your biography here. Let the employers know who you are"
                                className="w-full p-3.5 text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] border-none focus:outline-none bg-transparent resize-y"
                            />
                            <div className="p-2 bg-[#F8F9FA] border-t border-[#E4E5E8] flex items-center gap-2 text-[#767E94]">
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <Bold className="w-4 h-4" />
                                </button>
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <Italic className="w-4 h-4" />
                                </button>
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <Underline className="w-4 h-4" />
                                </button>
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <Strikethrough className="w-4 h-4" />
                                </button>
                                <span className="h-4 w-px bg-[#E4E5E8] mx-1" />
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <LinkIcon className="w-4 h-4" />
                                </button>
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <List className="w-4 h-4" />
                                </button>
                                <button type="button" className="p-1 hover:text-[#18191C] hover:bg-[#E4E5E8] rounded-none cursor-pointer">
                                    <ListOrdered className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            )}

            {/* TAB 3: SOCIAL LINKS (Identical to Employer Dashboard Social Media Profile) */}
            {activeTab === "Social Links" && (
                <form onSubmit={handleSaveSocialLinks} className="space-y-6 max-w-3xl">
                    {showSocialSuccess && (
                        <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                            <Check className="w-4 h-4" />
                            <span>Social Media Profile links saved successfully!</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-[#18191C]">
                            Social Media Profile
                        </h3>

                        {socialLinks.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {/* Select Platform */}
                                <div className="w-36 sm:w-44 shrink-0">
                                    <select
                                        value={item.platform}
                                        onChange={(e) => handlePlatformChange(index, e.target.value)}
                                        className="w-full h-11 px-3 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC] cursor-pointer font-semibold"
                                    >
                                        <option value="Facebook">Facebook</option>
                                        <option value="Twitter">Twitter / X</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="YouTube">YouTube</option>
                                    </select>
                                </div>

                                {/* Input URL with Brand SVG Icon */}
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        {getPlatformIcon(item.platform)}
                                    </div>
                                    <input
                                        type="url"
                                        value={item.url}
                                        onChange={(e) => handleLinkChange(index, e.target.value)}
                                        placeholder={`Profile link or URL for ${item.platform}`}
                                        className="w-full h-11 pl-11 pr-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                </div>

                                {/* Remove Link Button */}
                                {socialLinks.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSocialLink(index)}
                                        className="p-3 text-[#9199A3] hover:text-[#E05151] hover:bg-[#F1F2F4] rounded-none transition-colors shrink-0 cursor-pointer"
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

                    <div>
                        <button
                            type="submit"
                            className="h-11 px-6 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            )}

            {/* TAB 4: ACCOUNT SETTING (Matching Exact User Screenshot) */}
            {activeTab === "Account Setting" && (
                <div className="space-y-8 font-sans max-w-4xl">
                    {/* SECTION 1: Contact Info */}
                    <form onSubmit={handleSaveAccountSection} className="space-y-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Contact Info
                        </h3>

                        {/* Map Location */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#18191C]">
                                Map Location
                            </label>
                            <input
                                type="text"
                                value={contactInfo.mapLocation}
                                onChange={(e) =>
                                    setContactInfo({ ...contactInfo, mapLocation: e.target.value })
                                }
                                placeholder=""
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            />
                        </div>

                        {/* Phone with Country selector */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#18191C]">
                                Phone
                            </label>
                            <div className="flex items-center w-full h-11 border border-[#E4E5E8] rounded-none bg-white focus-within:border-[#0A65CC]">
                                {/* Country Code Dropdown */}
                                <div className="flex items-center gap-2 px-3 border-r border-[#E4E5E8] h-full bg-white shrink-0 text-xs sm:text-sm font-medium text-[#18191C]">
                                    <svg
                                        className="w-5 h-3.5 object-cover rounded-xs"
                                        viewBox="0 0 640 480"
                                    >
                                        <rect width="640" height="480" fill="#006a4e" />
                                        <circle cx="280" cy="240" r="160" fill="#f42a41" />
                                    </svg>
                                    <span>{contactInfo.countryCode}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-[#767E94]" />
                                </div>
                                <input
                                    type="tel"
                                    value={contactInfo.phone}
                                    onChange={(e) =>
                                        setContactInfo({ ...contactInfo, phone: e.target.value })
                                    }
                                    placeholder="Phone number.."
                                    className="w-full h-full px-4 text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Email with Mail Icon */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#18191C]">
                                Email
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="w-4 h-4 text-[#0A65CC] absolute left-3.5 pointer-events-none" />
                                <input
                                    type="email"
                                    value={contactInfo.email}
                                    onChange={(e) =>
                                        setContactInfo({ ...contactInfo, email: e.target.value })
                                    }
                                    placeholder="Email address"
                                    className="w-full h-11 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="h-11 px-7 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <div className="border-t border-[#E4E5E8]" />

                    {/* SECTION 2: Notification */}
                    <div className="space-y-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Notification
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Column 1 */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-[#18191C]">
                                    <input
                                        type="checkbox"
                                        checked={notifications.shortlisted}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                shortlisted: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span>Notify me when employers shortlisted me</span>
                                </label>

                                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-[#767E94]">
                                    <input
                                        type="checkbox"
                                        checked={notifications.appliedJobsExpire}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                appliedJobsExpire: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span>Notify me when my applied jobs are expire</span>
                                </label>

                                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-[#18191C]">
                                    <input
                                        type="checkbox"
                                        checked={notifications.jobAlertsLimit}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                jobAlertsLimit: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span>Notify me when I have up to 5 job alerts</span>
                                </label>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-[#767E94]">
                                    <input
                                        type="checkbox"
                                        checked={notifications.savedProfile}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                savedProfile: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span>Notify me when employers saved my profile</span>
                                </label>

                                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-medium text-[#18191C]">
                                    <input
                                        type="checkbox"
                                        checked={notifications.rejected}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                rejected: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span>Notify me when employers rejected me</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#E4E5E8]" />

                    {/* SECTION 3: Job Alerts */}
                    <form onSubmit={handleSaveAccountSection} className="space-y-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Job Alerts
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Role */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#18191C]">
                                    Role
                                </label>
                                <div className="relative flex items-center">
                                    <Briefcase className="w-4 h-4 text-[#0A65CC] absolute left-3.5 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={jobAlerts.role}
                                        onChange={(e) =>
                                            setJobAlerts({ ...jobAlerts, role: e.target.value })
                                        }
                                        placeholder="Your job roles"
                                        className="w-full h-11 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#18191C]">
                                    Location
                                </label>
                                <div className="relative flex items-center">
                                    <MapPin className="w-4 h-4 text-[#0A65CC] absolute left-3.5 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={jobAlerts.location}
                                        onChange={(e) =>
                                            setJobAlerts({ ...jobAlerts, location: e.target.value })
                                        }
                                        placeholder="City, state, country name"
                                        className="w-full h-11 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="h-11 px-7 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <div className="border-t border-[#E4E5E8]" />

                    {/* SECTION 4: Profile Privacy & Resume Privacy */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Profile Privacy */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-[#18191C]">
                                Profile Privacy
                            </h4>
                            <div className="flex items-center gap-3 p-3 bg-white border border-[#E4E5E8] rounded-none">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPrivacy({
                                            ...privacy,
                                            profilePublic: !privacy.profilePublic,
                                        })
                                    }
                                    className={`relative inline-flex h-6 w-14 items-center rounded-full transition-colors cursor-pointer ${
                                        privacy.profilePublic ? "bg-[#0A65CC]" : "bg-[#CCCCCC]"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                            privacy.profilePublic ? "translate-x-8" : "translate-x-0.5"
                                        }`}
                                    />
                                    <span
                                        className={`absolute text-[10px] font-bold uppercase px-1.5 pointer-events-none ${
                                            privacy.profilePublic
                                                ? "left-1 text-white"
                                                : "right-1 text-[#767E94]"
                                        }`}
                                    >
                                        {privacy.profilePublic ? "YES" : "NO"}
                                    </span>
                                </button>
                                <span className="text-xs text-[#767E94]">
                                    Your profile is public now
                                </span>
                            </div>
                        </div>

                        {/* Resume Privacy */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-[#18191C]">
                                Resume Privacy
                            </h4>
                            <div className="flex items-center gap-3 p-3 bg-white border border-[#E4E5E8] rounded-none">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPrivacy({
                                            ...privacy,
                                            resumePublic: !privacy.resumePublic,
                                        })
                                    }
                                    className={`relative inline-flex h-6 w-14 items-center rounded-full transition-colors cursor-pointer ${
                                        privacy.resumePublic ? "bg-[#0A65CC]" : "bg-[#CCCCCC]"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                            privacy.resumePublic ? "translate-x-8" : "translate-x-0.5"
                                        }`}
                                    />
                                    <span
                                        className={`absolute text-[10px] font-bold uppercase px-1.5 pointer-events-none ${
                                            privacy.resumePublic
                                                ? "left-1 text-white"
                                                : "right-1 text-[#E05151]"
                                        }`}
                                    >
                                        {privacy.resumePublic ? "YES" : "NO"}
                                    </span>
                                </button>
                                <span className="text-xs text-[#767E94]">
                                    Your resume is private now
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#E4E5E8]" />

                    {/* SECTION 5: Change Password */}
                    <form onSubmit={handleSaveAccountSection} className="space-y-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Change Password
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Current Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#18191C]">
                                    Current Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={passwordData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Password"
                                        className="w-full h-11 pl-4 pr-10 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 text-[#767E94] hover:text-[#18191C] cursor-pointer"
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#18191C]">
                                    New Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Password"
                                        className="w-full h-11 pl-4 pr-10 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 text-[#767E94] hover:text-[#18191C] cursor-pointer"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#18191C]">
                                    Confirm Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={passwordData.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Password"
                                        className="w-full h-11 pl-4 pr-10 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 text-[#767E94] hover:text-[#18191C] cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="h-11 px-7 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <div className="border-t border-[#E4E5E8]" />

                    {/* SECTION 6: Delete Your Account */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Delete Your Account
                        </h3>

                        <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-2xl">
                            If you delete your Jobpilot account, you will no longer be able to get information
                            about the matched jobs, following employers, and job alert, shortlisted jobs and
                            more. You will be abandoned from all the services of Jobpilot.com.
                        </p>

                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm("Are you sure you want to close your account?")) {
                                        alert("Account deletion request submitted.");
                                    }
                                }}
                                className="inline-flex items-center gap-2 text-[#E05151] hover:text-[#C93B3B] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                            >
                                <XCircle className="w-4 h-4 text-[#E05151]" />
                                <span>Close Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD CV / RESUME POPUP MODAL */}
            <AnimatePresence>
                {isAddCvModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddCvModalOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="relative w-full max-w-md bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                        >
                            {/* Modal Header */}
                            <div className="p-5 border-b border-[#E4E5E8] flex items-center justify-between">
                                <h3 className="text-base font-bold text-[#18191C]">
                                    Add Cv/Resume
                                </h3>
                                <button
                                    onClick={() => setIsAddCvModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#F1F2F4] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleAddCvSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Cv/Resume Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newCvName}
                                        onChange={(e) => setNewCvName(e.target.value)}
                                        placeholder="e.g. Senior Product Designer"
                                        required
                                        className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Upload your Cv/Resume
                                    </label>
                                    <div className="border-2 border-dashed border-[#E4E5E8] hover:border-[#0A65CC] p-6 text-center rounded-none bg-[#F8F9FA] transition-colors cursor-pointer flex flex-col items-center justify-center">
                                        <UploadCloud className="w-10 h-10 text-[#0A65CC] mb-2" />
                                        <p className="text-xs font-bold text-[#18191C]">
                                            Browse File <span className="font-normal text-[#767E94]">or drop here</span>
                                        </p>
                                        <p className="text-[11px] text-[#9199A3] mt-1">
                                            Only PDF format available . Max file size 12 MB.
                                        </p>
                                    </div>
                                </div>

                                {/* Modal Footer Buttons */}
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddCvModalOpen(false)}
                                        className="px-5 py-2.5 bg-[#E8F1FF] text-[#0A65CC] hover:bg-[#D4E4FF] font-bold text-xs sm:text-sm rounded-none border-none transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                                    >
                                        Add Cv/Resume
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
