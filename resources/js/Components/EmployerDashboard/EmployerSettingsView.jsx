import React, { useState, useRef } from "react";
import {
    User,
    Users,
    Globe,
    Settings,
    CloudUpload,
    X,
    Check,
    Mail,
    MapPin,
    Eye,
    EyeOff,
    XCircle,
    ChevronDown,
} from "lucide-react";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function EmployerSettingsView() {
    const [activeTab, setActiveTab] = useState("account"); // Defaulting or switching between 'company', 'founding', 'social', 'account'
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    // Delete account modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    // Image previews
    const logoInputRef = useRef(null);
    const bannerInputRef = useRef(null);
    const [logoPreview, setLogoPreview] = useState(
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
    );
    const [bannerPreview, setBannerPreview] = useState(
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80"
    );

    // Form data state
    const [companyInfo, setCompanyInfo] = useState({
        companyName: "CareerPilot Inc.",
        aboutUs:
            "Write down about your company here. Let the candidate know who we are...",
    });

    const [foundingInfo, setFoundingInfo] = useState({
        organizationType: "Private Company",
        industryType: "Software & Technology",
        teamSize: "50-100 Members",
        establishmentYear: "2020-05-15",
        companyWebsite: "https://careerpilot.com",
        vision: "To connect talent with opportunity seamlessly.",
    });

    const [socialInfo, setSocialInfo] = useState({
        facebook: "https://facebook.com/careerpilot",
        twitter: "https://twitter.com/careerpilot",
        linkedin: "https://linkedin.com/company/careerpilot",
        instagram: "https://instagram.com/careerpilot",
        youtube: "https://youtube.com/@careerpilot",
    });

    // Account setting state
    const [accountInfo, setAccountInfo] = useState({
        mapLocation: "",
        countryCode: "+880",
        phone: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Password visibility toggles
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSave = (e) => {
        if (e) e.preventDefault();
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 3000);
    };

    const handleLogoSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleBannerSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-full bg-white font-sans text-[#18191C] space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                    Settings
                </h2>
            </div>

            {/* Success Feedback Alert */}
            {showSuccessMsg && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Settings changes saved successfully!</span>
                </div>
            )}

            {/* 4 Tabs Bar */}
            <div className="flex items-center gap-2 sm:gap-6 border-b border-[#E4E5E8] overflow-x-auto no-scrollbar pb-1">
                <button
                    onClick={() => setActiveTab("company")}
                    className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer rounded-none ${
                        activeTab === "company"
                            ? "border-[#0A65CC] text-[#0A65CC]"
                            : "border-transparent text-[#767E94] hover:text-[#18191C]"
                    }`}
                >
                    <User className="w-4 h-4" />
                    <span>Company Info</span>
                </button>

                <button
                    onClick={() => setActiveTab("founding")}
                    className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer rounded-none ${
                        activeTab === "founding"
                            ? "border-[#0A65CC] text-[#0A65CC]"
                            : "border-transparent text-[#767E94] hover:text-[#18191C]"
                    }`}
                >
                    <Users className="w-4 h-4" />
                    <span>Founding Info</span>
                </button>

                <button
                    onClick={() => setActiveTab("social")}
                    className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer rounded-none ${
                        activeTab === "social"
                            ? "border-[#0A65CC] text-[#0A65CC]"
                            : "border-transparent text-[#767E94] hover:text-[#18191C]"
                    }`}
                >
                    <Globe className="w-4 h-4" />
                    <span>Social Media Profile</span>
                </button>

                <button
                    onClick={() => setActiveTab("account")}
                    className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer rounded-none ${
                        activeTab === "account"
                            ? "border-[#0A65CC] text-[#0A65CC]"
                            : "border-transparent text-[#767E94] hover:text-[#18191C]"
                    }`}
                >
                    <Settings className="w-4 h-4" />
                    <span>Account Setting</span>
                </button>
            </div>

            {/* Tab 1: Company Info */}
            {activeTab === "company" && (
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Logo & Banner Section */}
                    <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#18191C] mb-4">
                            Logo & Banner Image
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Logo */}
                            <div className="md:col-span-4 space-y-2">
                                <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    Upload Logo
                                </label>
                                <input
                                    type="file"
                                    ref={logoInputRef}
                                    onChange={handleLogoSelect}
                                    accept="image/*"
                                    className="hidden"
                                />

                                <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                                    <div className="h-44 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8]">
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Company Logo"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center text-[#767E94]">
                                                <CloudUpload className="w-8 h-8 mx-auto mb-1 text-[#0A65CC]" />
                                                <span className="text-xs">No logo uploaded</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#767E94]">3.5 MB</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setLogoPreview(null)}
                                                className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => logoInputRef.current?.click()}
                                                className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                            >
                                                Replace
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Banner */}
                            <div className="md:col-span-8 space-y-2">
                                <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    Banner Image
                                </label>
                                <input
                                    type="file"
                                    ref={bannerInputRef}
                                    onChange={handleBannerSelect}
                                    accept="image/*"
                                    className="hidden"
                                />

                                <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                                    <div className="h-44 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8]">
                                        {bannerPreview ? (
                                            <img
                                                src={bannerPreview}
                                                alt="Company Banner"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center text-[#767E94]">
                                                <CloudUpload className="w-8 h-8 mx-auto mb-1 text-[#0A65CC]" />
                                                <span className="text-xs">No banner uploaded</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#767E94]">4.3 MB</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setBannerPreview(null)}
                                                className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => bannerInputRef.current?.click()}
                                                className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                            >
                                                Replace
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Name Input */}
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                            Company name
                        </label>
                        <input
                            type="text"
                            value={companyInfo.companyName}
                            onChange={(e) =>
                                setCompanyInfo({ ...companyInfo, companyName: e.target.value })
                            }
                            placeholder="Company name"
                            className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                        />
                    </div>

                    {/* About Us Textarea */}
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                            About us
                        </label>
                        <textarea
                            rows={6}
                            value={companyInfo.aboutUs}
                            onChange={(e) =>
                                setCompanyInfo({ ...companyInfo, aboutUs: e.target.value })
                            }
                            placeholder="Write down about your company here. Let the candidate know who we are..."
                            className="w-full p-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC] resize-none"
                        />
                    </div>

                    {/* Save Button */}
                    <div>
                        <button
                            type="submit"
                            className="h-11 px-6 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                        >
                            Save Change
                        </button>
                    </div>
                </form>
            )}

            {/* Tab 2: Founding Info */}
            {activeTab === "founding" && (
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Organization Type
                            </label>
                            <select
                                value={foundingInfo.organizationType}
                                onChange={(e) =>
                                    setFoundingInfo({ ...foundingInfo, organizationType: e.target.value })
                                }
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            >
                                <option value="Private Company">Private Company</option>
                                <option value="Public Corporation">Public Corporation</option>
                                <option value="Non Profit">Non Profit</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Industry Type
                            </label>
                            <select
                                value={foundingInfo.industryType}
                                onChange={(e) =>
                                    setFoundingInfo({ ...foundingInfo, industryType: e.target.value })
                                }
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            >
                                <option value="Software & Technology">Software & Technology</option>
                                <option value="Finance & Banking">Finance & Banking</option>
                                <option value="Healthcare">Healthcare</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Team Size
                            </label>
                            <select
                                value={foundingInfo.teamSize}
                                onChange={(e) =>
                                    setFoundingInfo({ ...foundingInfo, teamSize: e.target.value })
                                }
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            >
                                <option value="1-10 Members">1-10 Members</option>
                                <option value="11-50 Members">11-50 Members</option>
                                <option value="50-100 Members">50-100 Members</option>
                                <option value="100+ Members">100+ Members</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Establishment Date
                            </label>
                            <DatePickerInput
                                value={foundingInfo.establishmentYear}
                                onChange={(val) =>
                                    setFoundingInfo({ ...foundingInfo, establishmentYear: val })
                                }
                                placeholder="Select establishment date"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                            Company Website URL
                        </label>
                        <input
                            type="url"
                            value={foundingInfo.companyWebsite}
                            onChange={(e) =>
                                setFoundingInfo({ ...foundingInfo, companyWebsite: e.target.value })
                            }
                            placeholder="https://example.com"
                            className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                            Company Vision
                        </label>
                        <textarea
                            rows={4}
                            value={foundingInfo.vision}
                            onChange={(e) =>
                                setFoundingInfo({ ...foundingInfo, vision: e.target.value })
                            }
                            placeholder="Write your company vision..."
                            className="w-full p-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC] resize-none"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="h-11 px-6 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                        >
                            Save Change
                        </button>
                    </div>
                </form>
            )}

            {/* Tab 3: Social Media Profile */}
            {activeTab === "social" && (
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Facebook Profile Link
                            </label>
                            <input
                                type="url"
                                value={socialInfo.facebook}
                                onChange={(e) => setSocialInfo({ ...socialInfo, facebook: e.target.value })}
                                placeholder="https://facebook.com/yourcompany"
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Twitter Profile Link
                            </label>
                            <input
                                type="url"
                                value={socialInfo.twitter}
                                onChange={(e) => setSocialInfo({ ...socialInfo, twitter: e.target.value })}
                                placeholder="https://twitter.com/yourcompany"
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                LinkedIn Profile Link
                            </label>
                            <input
                                type="url"
                                value={socialInfo.linkedin}
                                onChange={(e) => setSocialInfo({ ...socialInfo, linkedin: e.target.value })}
                                placeholder="https://linkedin.com/company/yourcompany"
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Instagram Profile Link
                            </label>
                            <input
                                type="url"
                                value={socialInfo.instagram}
                                onChange={(e) => setSocialInfo({ ...socialInfo, instagram: e.target.value })}
                                placeholder="https://instagram.com/yourcompany"
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="h-11 px-6 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                        >
                            Save Change
                        </button>
                    </div>
                </form>
            )}

            {/* Tab 4: Account Setting (Matching exact user screenshot) */}
            {activeTab === "account" && (
                <div className="space-y-8 font-sans">
                    {/* Section 1: Contact Information */}
                    <form onSubmit={handleSave} className="space-y-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Contact Information
                        </h3>

                        {/* Map Location */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Map Location
                            </label>
                            <input
                                type="text"
                                value={accountInfo.mapLocation}
                                onChange={(e) =>
                                    setAccountInfo({ ...accountInfo, mapLocation: e.target.value })
                                }
                                placeholder=""
                                className="w-full h-11 px-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] focus:outline-none focus:border-[#0A65CC]"
                            />
                        </div>

                        {/* Phone with Country selector */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Phone
                            </label>
                            <div className="flex items-center w-full h-11 border border-[#E4E5E8] rounded-none bg-white focus-within:border-[#0A65CC]">
                                {/* Country Code Dropdown */}
                                <div className="flex items-center gap-2 px-3 border-r border-[#E4E5E8] h-full bg-[#F8F9FA] shrink-0 text-xs sm:text-sm font-medium text-[#18191C]">
                                    {/* Flag SVG for Bangladesh/General */}
                                    <svg
                                        className="w-5 h-3.5 object-cover rounded-xs"
                                        viewBox="0 0 640 480"
                                    >
                                        <rect width="640" height="480" fill="#006a4e" />
                                        <circle cx="280" cy="240" r="160" fill="#f42a41" />
                                    </svg>
                                    <span>{accountInfo.countryCode}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-[#767E94]" />
                                </div>
                                <input
                                    type="tel"
                                    value={accountInfo.phone}
                                    onChange={(e) =>
                                        setAccountInfo({ ...accountInfo, phone: e.target.value })
                                    }
                                    placeholder="Phone number.."
                                    className="w-full h-full px-4 text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Email with mail icon */}
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                Email
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="w-4 h-4 text-[#0A65CC] absolute left-3.5 pointer-events-none" />
                                <input
                                    type="email"
                                    value={accountInfo.email}
                                    onChange={(e) =>
                                        setAccountInfo({ ...accountInfo, email: e.target.value })
                                    }
                                    placeholder="Email address"
                                    className="w-full h-11 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-none text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                                />
                            </div>
                        </div>

                        {/* Save Changes Button */}
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

                    {/* Section 2: Change Password */}
                    <form onSubmit={handleSave} className="space-y-5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Change Password
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Current Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    Current Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={accountInfo.currentPassword}
                                        onChange={(e) =>
                                            setAccountInfo({
                                                ...accountInfo,
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
                                <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    New Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={accountInfo.newPassword}
                                        onChange={(e) =>
                                            setAccountInfo({
                                                ...accountInfo,
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
                                <label className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    Confirm Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={accountInfo.confirmPassword}
                                        onChange={(e) =>
                                            setAccountInfo({
                                                ...accountInfo,
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

                        {/* Change Password Button */}
                        <div>
                            <button
                                type="submit"
                                className="h-11 px-7 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>

                    <div className="border-t border-[#E4E5E8]" />

                    {/* Section 3: Delete Your Company */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                            Delete Your Company
                        </h3>

                        <p className="text-xs sm:text-sm text-[#5E6670] leading-relaxed max-w-2xl">
                            If you delete your Jobpilot account, you will no longer be able to get information
                            about the matched jobs, following employers, and job alert, shortlisted jobs and
                            more. You will be abandoned from all the services of Jobpilot.com.
                        </p>

                        <div>
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="inline-flex items-center gap-2 text-[#E05151] hover:text-[#C93B3B] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                            >
                                <XCircle className="w-4 h-4 text-[#E05151]" />
                                <span>Close Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    setIsDeletingAccount(true);
                    setTimeout(() => {
                        setIsDeletingAccount(false);
                        setIsDeleteModalOpen(false);
                        setShowSuccessMsg(true);
                    }, 600);
                }}
                isDeleting={isDeletingAccount}
                title="Close Company Account"
                message="Are you sure you want to close your company account? All posted jobs, applicant records, and company profile data will be permanently removed. This action cannot be undone."
            />
        </div>
    );
}
