import React, { useState, useRef } from "react";
import {
    UploadCloud,
    Link as LinkIcon,
    MapPin,
    Check,
    FileText,
    MoreHorizontal,
    Edit2,
    Trash2,
    Plus,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";

export default function PersonalTab() {
    // File input refs
    const profilePicInputRef = useRef(null);
    const bannerPicInputRef = useRef(null);
    const cnicInputRef = useRef(null);

    // Image previews state
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [bannerPicPreview, setBannerPicPreview] = useState(null);
    const [cnicPreview, setCnicPreview] = useState(null);

    // Personal / Basic Information State
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "",
        headline: "",
        website: "",
        phone: "",
        countryCode: "+92",
        location: "",
        isPublic: true,
        domicile: "",
        gender: "",
        maritalStatus: "",
        dateOfBirth: "",
        postalAddress: "",
    });

    // CV / Resume state
    const [resumes, setResumes] = useState([
        { id: 1, name: "Professional Resume", size: "3.5 MB" },
        { id: 2, name: "Product Designer", size: "4.7 MB" },
        { id: 3, name: "Visual Designer", size: "1.3 MB" },
    ]);

    const [activeMenuId, setActiveMenuId] = useState(null);
    const [isAddCvModalOpen, setIsAddCvModalOpen] = useState(false);
    const [newCvName, setNewCvName] = useState("");
    const [showPersonalSuccess, setShowPersonalSuccess] = useState(false);

    const handleSavePersonalSection = (e) => {
        if (e) e.preventDefault();
        setShowPersonalSuccess(true);
        setTimeout(() => setShowPersonalSuccess(false), 3000);
    };

    const handleProfilePicSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    const handleBannerPicSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerPicPreview(URL.createObjectURL(file));
        }
    };

    const handleCnicSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setCnicPreview(URL.createObjectURL(file));
        }
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

    return (
        <div className="space-y-8 max-w-4xl">
            {showPersonalSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Personal profile details saved successfully!</span>
                </div>
            )}

            {/* Basic Information Section */}
            <form onSubmit={handleSavePersonalSection} className="space-y-5">
                <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                    Basic Information
                </h3>

                {/* Profile Picture & Banner Picture Upload Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Profile Picture */}
                    <div className="md:col-span-4">
                        <input
                            type="file"
                            ref={profilePicInputRef}
                            onChange={handleProfilePicSelect}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                            <div className="h-44 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                {profilePicPreview ? (
                                    <img
                                        src={profilePicPreview}
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-[#767E94] p-4">
                                        <UploadCloud className="w-8 h-8 mx-auto mb-1 text-[#0A65CC]" />
                                        <span className="text-xs font-medium text-[#18191C] block">
                                            Profile Picture
                                        </span>
                                        <span className="text-[11px] text-[#9199A3]">
                                            Max 5 MB
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[#767E94]">
                                    Profile Picture
                                </span>
                                <div className="flex items-center gap-3">
                                    {profilePicPreview && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setProfilePicPreview(null)
                                            }
                                            className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            profilePicInputRef.current?.click()
                                        }
                                        className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                    >
                                        Upload/Replace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner Picture */}
                    <div className="md:col-span-8">
                        <input
                            type="file"
                            ref={bannerPicInputRef}
                            onChange={handleBannerPicSelect}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                            <div className="h-44 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8]">
                                {bannerPicPreview ? (
                                    <img
                                        src={bannerPicPreview}
                                        alt="Banner Picture"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-[#767E94] p-4">
                                        <UploadCloud className="w-8 h-8 mx-auto mb-1 text-[#0A65CC]" />
                                        <span className="text-xs font-medium text-[#18191C] block">
                                            Banner Picture
                                        </span>
                                        <span className="text-[11px] text-[#9199A3]">
                                            1200x300 recommended
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[#767E94]">
                                    Banner Picture
                                </span>
                                <div className="flex items-center gap-3">
                                    {bannerPicPreview && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setBannerPicPreview(null)
                                            }
                                            className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            bannerPicInputRef.current?.click()
                                        }
                                        className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                    >
                                        Upload/Replace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Name Field */} 

                {/* Headline Field */}
                <div>
                    <textarea
                        rows={3}
                        value={personalInfo.headline}
                        onChange={(e) =>
                            setPersonalInfo({
                                ...personalInfo,
                                headline: e.target.value,
                            })
                        }
                        placeholder="Headline"
                        className="w-full p-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8] resize-y"
                    />
                </div>

                {/* Personal Website */}
                <div>
                    <div className="relative flex items-center">
                        <LinkIcon className="w-4 h-4 text-[#0A65CC] absolute left-4 pointer-events-none" />
                        <input
                            type="url"
                            value={personalInfo.website}
                            onChange={(e) =>
                                setPersonalInfo({
                                    ...personalInfo,
                                    website: e.target.value,
                                })
                            }
                            placeholder="Personal Website"
                            className="w-full h-12 pl-11 pr-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <div className="flex items-center w-full h-12 border border-[#E4E5E8] rounded-none bg-white focus-within:ring-1 focus-within:ring-[#0A65CC] focus-within:border-[#0A65CC] transition-colors">
                        <div className="flex items-center gap-2 px-3 border-r border-[#E4E5E8] h-full bg-[#F8F9FA] shrink-0 text-sm font-medium text-[#18191C]">
                            <svg
                                className="w-5 h-3.5 object-cover rounded-xs"
                                viewBox="0 0 900 600"
                            >
                                <rect width="900" height="600" fill="#01411C" />
                                <rect width="225" height="600" fill="#FFFFFF" />
                                <circle
                                    cx="562.5"
                                    cy="300"
                                    r="180"
                                    fill="#FFFFFF"
                                />
                                <circle
                                    cx="612.5"
                                    cy="250"
                                    r="162"
                                    fill="#01411C"
                                />
                                <polygon
                                    points="562.5,165 577.8,212.1 627.3,212.1 587.3,241.2 602.6,288.3 562.5,259.2 522.4,288.3 537.7,241.2 497.7,212.1 547.2,212.1"
                                    fill="#FFFFFF"
                                />
                            </svg>
                            <span>+92</span>
                        </div>
                        <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) =>
                                setPersonalInfo({
                                    ...personalInfo,
                                    phone: e.target.value,
                                })
                            }
                            placeholder="Phone Number"
                            className="w-full h-full px-4 text-sm text-[#18191C] placeholder:text-[#9199A8] focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <div className="relative flex items-center">
                        <MapPin className="w-4 h-4 text-[#0A65CC] absolute left-4 pointer-events-none" />
                        <input
                            type="text"
                            value={personalInfo.location}
                            onChange={(e) =>
                                setPersonalInfo({
                                    ...personalInfo,
                                    location: e.target.value,
                                })
                            }
                            placeholder="Location"
                            className="w-full h-12 pl-11 pr-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                        />
                    </div>
                </div>

                {/* Demographic & Profile Details */}
                <div className="pt-4 border-t border-[#E4E5E8] space-y-5">
                    <h4 className="text-base sm:text-lg font-bold text-[#18191C]">
                        Personal Details & Identification
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Gender */}
                        <div>
                            <select
                                value={personalInfo.gender}
                                onChange={(e) =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        gender: e.target.value,
                                    })
                                }
                                className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C] cursor-pointer font-medium"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Marital Status */}
                        <div>
                            <select
                                value={personalInfo.maritalStatus}
                                onChange={(e) =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        maritalStatus: e.target.value,
                                    })
                                }
                                className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C] cursor-pointer font-medium"
                            >
                                <option value="">Select Marital Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="unmarried">Unmarried</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <DatePickerInput
                                value={personalInfo.dateOfBirth}
                                onChange={(e) =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        dateOfBirth: e.target.value,
                                    })
                                }
                                name="dateOfBirth"
                                placeholder="Date of Birth (dd/mm/yyyy)"
                            />
                        </div>

                        {/* Domicile */}
                        <div>
                            <input
                                type="text"
                                value={personalInfo.domicile}
                                onChange={(e) =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        domicile: e.target.value,
                                    })
                                }
                                placeholder="Domicile"
                                className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                            />
                        </div>

                        {/* Postal Address */}
                        <div>
                            <input
                                type="text"
                                value={personalInfo.postalAddress}
                                onChange={(e) =>
                                    setPersonalInfo({
                                        ...personalInfo,
                                        postalAddress: e.target.value,
                                    })
                                }
                                placeholder="Postal Address"
                                className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                            />
                        </div>
                    </div>

                    {/* CNIC Card / Document Image Upload */}
                    <div className="space-y-2 pt-2">
                        <input
                            type="file"
                            ref={cnicInputRef}
                            onChange={handleCnicSelect}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                            <div className="h-40 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                {cnicPreview ? (
                                    <img
                                        src={cnicPreview}
                                        alt="CNIC Document"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-[#767E94] p-4">
                                        <UploadCloud className="w-8 h-8 mx-auto mb-1 text-[#0A65CC]" />
                                        <span className="text-xs font-semibold text-[#18191C] block">
                                            CNIC Document Image
                                        </span>
                                        <span className="text-[11px] text-[#9199A3]">
                                            Upload front or back copy of CNIC
                                            (Max 5MB)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-[#767E94]">
                                    CNIC Card Image / Document (JPG, PNG up to 5
                                    MB)
                                </span>
                                <div className="flex items-center gap-3">
                                    {cnicPreview && (
                                        <button
                                            type="button"
                                            onClick={() => setCnicPreview(null)}
                                            className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            cnicInputRef.current?.click()
                                        }
                                        className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                    >
                                        {cnicPreview
                                            ? "Replace CNIC"
                                            : "Upload CNIC Image"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors"
                >
                    Save Changes
                </button>
            </form>

            {/* Resume Section */}
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
                                    <p className="text-[11px] text-[#767E94]">
                                        {res.size}
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveMenuId(
                                            activeMenuId === res.id
                                                ? null
                                                : res.id
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
                                                onClick={() =>
                                                    setActiveMenuId(null)
                                                }
                                                className="w-full px-3 py-1.5 text-left text-xs text-[#0A65CC] hover:bg-[#F1F2F4] flex items-center gap-2 cursor-pointer font-semibold"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                                <span>Edit Resume</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteCv(res.id)
                                                }
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

            {/* ADD CV MODAL */}
            <AnimatePresence>
                {isAddCvModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddCvModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                        >
                            <div className="p-5 border-b border-[#E4E5E8] flex items-center justify-between bg-[#F8F9FA]">
                                <h3 className="text-base font-bold text-[#18191C]">
                                    Add Cv/Resume
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setIsAddCvModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={handleAddCvSubmit}
                                className="p-6 space-y-4"
                            >
                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        CV/Resume Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newCvName}
                                        onChange={(e) =>
                                            setNewCvName(e.target.value)
                                        }
                                        placeholder="e.g. Senior Developer Resume"
                                        className="w-full h-11 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div className="border-2 border-dashed border-[#E4E5E8] p-6 text-center bg-[#F8F9FA] space-y-2">
                                    <UploadCloud className="w-8 h-8 text-[#0A65CC] mx-auto" />
                                    <p className="text-xs font-medium text-[#18191C]">
                                        Browse file or drop PDF here
                                    </p>
                                    <p className="text-[11px] text-[#767E94]">
                                        Max file size 12 MB
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsAddCvModalOpen(false)
                                        }
                                        className="px-5 h-11 bg-[#F1F2F4] text-[#18191C] hover:bg-[#E4E5E8] font-bold text-xs rounded-none border-none cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 h-11 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                                    >
                                        Upload Resume
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
