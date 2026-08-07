import React, { useState, useRef, useEffect } from "react";
import {
    UploadCloud,
    Link as LinkIcon,
    MapPin,
    FileText,
    MoreHorizontal,
    Edit2,
    Trash2,
    Plus,
    X,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";
import Toast from "@/Components/Toast";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function PersonalTab() {
    // File input refs
    const profilePicInputRef = useRef(null);
    const bannerPicInputRef = useRef(null);
    const cnicInputRef = useRef(null);
    const cvFileInputRef = useRef(null);

    // Delete confirmation state for CV
    const [deleteTargetCvId, setDeleteTargetCvId] = useState(null);
    const [isDeletingCv, setIsDeletingCv] = useState(false);

    // Image previews state
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [bannerPicPreview, setBannerPicPreview] = useState(null);
    const [cnicPreview, setCnicPreview] = useState(null);

    // Loading states for image operations
    const [isUploadingImage, setIsUploadingImage] = useState({
        profile_picture: false,
        banner_picture: false,
        cnic: false,
    });

    // Global Toast state (Success/Error for images & Success for forms)
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (text, type = "success", duration = 2000) => {
        setToastMessage({ text, type, duration });
    };

    // Personal / Basic Information State
    const [personalInfo, setPersonalInfo] = useState({
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

    const [isLoadingPersonal, setIsLoadingPersonal] = useState(true);
    const [isSavingPersonal, setIsSavingPersonal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // CV / Resume state
    const [resumes, setResumes] = useState([]);
    const [isLoadingResumes, setIsLoadingResumes] = useState(true);
    const [activeMenuId, setActiveMenuId] = useState(null);

    // Add / Edit CV Modal state
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);
    const [editingCvId, setEditingCvId] = useState(null);
    const [cvFormName, setCvFormName] = useState("");
    const [selectedCvFile, setSelectedCvFile] = useState(null);
    const [isSubmittingCv, setIsSubmittingCv] = useState(false);
    const [cvFormErrors, setCvFormErrors] = useState({});

    // Helper to get CSRF token
    const getCsrfToken = () => {
        return (
            document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || ""
        );
    };

    // Fetch Personal Profile details on component mount
    const fetchPersonalData = async () => {
        setIsLoadingPersonal(true);
        try {
            const res = await fetch("/candidate/personal-profile", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && json.data) {
                const data = json.data;
                let rawPhone = data.phone || "";
                if (rawPhone.startsWith("+92")) {
                    rawPhone = rawPhone.substring(3);
                }

                setPersonalInfo({
                    headline: data.headline || "",
                    website: data.website || "",
                    phone: rawPhone,
                    countryCode: "+92",
                    location: data.location || "",
                    isPublic: data.is_public ?? true,
                    domicile: data.domicile || "",
                    gender: data.gender || "",
                    maritalStatus: data.marital_status || "",
                    dateOfBirth: "",
                    postalAddress: data.postal_address || "",
                });
                setProfilePicPreview(data.profile_picture || null);
                setBannerPicPreview(data.banner_picture || null);
                setCnicPreview(data.cnic || null);
            }
        } catch (err) {
            console.error("Failed to fetch personal data:", err);
        } finally {
            setIsLoadingPersonal(false);
        }
    };

    // Fetch Resumes list on component mount
    const fetchResumesData = async () => {
        setIsLoadingResumes(true);
        try {
            const res = await fetch("/candidate/resumes", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setResumes(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch resumes:", err);
        } finally {
            setIsLoadingResumes(false);
        }
    };

    useEffect(() => {
        fetchPersonalData();
        fetchResumesData();
    }, []);

    // Helper label for field names
    const getFieldLabel = (field) => {
        if (field === "profile_picture") return "Profile picture";
        if (field === "banner_picture") return "Banner picture";
        if (field === "cnic") return "CNIC document";
        return "Image";
    };

    // Upload or replace image separately via API call (Displays Success/Error Toast)
    const handleImageUpload = async (field, file) => {
        if (!file) return;

        setIsUploadingImage((prev) => ({ ...prev, [field]: true }));
        const formData = new FormData();
        formData.append(field, file);

        try {
            const res = await fetch("/candidate/personal-profile/images", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: formData,
            });
            const json = await res.json();
            if (json.success && json.data) {
                if (field === "profile_picture") {
                    setProfilePicPreview(json.data.profile_picture);
                    window.dispatchEvent(
                        new CustomEvent("profile-picture-updated", {
                            detail: { profile_picture: json.data.profile_picture },
                        })
                    );
                }
                if (field === "banner_picture") setBannerPicPreview(json.data.banner_picture);
                if (field === "cnic") setCnicPreview(json.data.cnic);

                showToast(`${getFieldLabel(field)} uploaded successfully!`, "success");
            } else {
                showToast(json.message || `Failed to upload ${getFieldLabel(field)}`, "error");
            }
        } catch (err) {
            console.error(`Failed to upload ${field}:`, err);
            showToast(`Error uploading ${getFieldLabel(field)}`, "error");
        } finally {
            setIsUploadingImage((prev) => ({ ...prev, [field]: false }));
        }
    };

    // Delete image separately via API call (Displays Success/Error Toast)
    const handleImageDelete = async (field) => {
        setIsUploadingImage((prev) => ({ ...prev, [field]: true }));
        try {
            const res = await fetch(`/candidate/personal-profile/images?type=${field}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: field }),
            });
            const json = await res.json();
            if (json.success) {
                if (field === "profile_picture") {
                    setProfilePicPreview(null);
                    window.dispatchEvent(
                        new CustomEvent("profile-picture-updated", {
                            detail: { profile_picture: null },
                        })
                    );
                }
                if (field === "banner_picture") setBannerPicPreview(null);
                if (field === "cnic") setCnicPreview(null);

                showToast(`${getFieldLabel(field)} removed successfully!`, "success");
            } else {
                showToast(json.message || `Failed to remove ${getFieldLabel(field)}`, "error");
            }
        } catch (err) {
            console.error(`Failed to delete ${field}:`, err);
            showToast(`Error removing ${getFieldLabel(field)}`, "error");
        } finally {
            setIsUploadingImage((prev) => ({ ...prev, [field]: false }));
        }
    };

    // Save Personal Text Information (Toast for SUCCESS only, errors displayed per field)
    const handleSavePersonalSection = async (e) => {
        if (e) e.preventDefault();
        setIsSavingPersonal(true);
        setFormErrors({});

        try {
            const res = await fetch("/candidate/personal-profile/update", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    headline: personalInfo.headline,
                    website: personalInfo.website,
                    phone: personalInfo.phone,
                    location: personalInfo.location,
                    is_public: personalInfo.isPublic,
                    domicile: personalInfo.domicile,
                    gender: personalInfo.gender,
                    marital_status: personalInfo.maritalStatus,
                    postal_address: personalInfo.postalAddress,
                }),
            });
            const json = await res.json();
            if (json.success) {
                showToast("Personal profile details saved successfully!", "success");
            } else if (json.errors) {
                setFormErrors(json.errors);
            }
        } catch (err) {
            console.error("Failed to save personal profile:", err);
        } finally {
            setIsSavingPersonal(false);
        }
    };

    // Resume Modal handlers
    const openAddCvModal = () => {
        setEditingCvId(null);
        setCvFormName("");
        setSelectedCvFile(null);
        setCvFormErrors({});
        setIsCvModalOpen(true);
    };

    const openEditCvModal = (resume) => {
        setEditingCvId(resume.id);
        setCvFormName(resume.name);
        setSelectedCvFile(null);
        setCvFormErrors({});
        setActiveMenuId(null);
        setIsCvModalOpen(true);
    };

    const closeCvModal = () => {
        setIsCvModalOpen(false);
        setEditingCvId(null);
        setCvFormName("");
        setSelectedCvFile(null);
        setCvFormErrors({});
    };

    // Submit Resume Form (Toast for SUCCESS only, errors displayed per field)
    const handleCvModalSubmit = async (e) => {
        e.preventDefault();

        setIsSubmittingCv(true);
        setCvFormErrors({});

        const formData = new FormData();
        formData.append("name", cvFormName.trim());
        if (selectedCvFile) {
            formData.append("resume_file", selectedCvFile);
        }

        const url = editingCvId ? `/candidate/resumes/${editingCvId}` : "/candidate/resumes";

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: formData,
            });
            const json = await res.json();
            if (json.success && json.data) {
                if (editingCvId) {
                    setResumes((prev) =>
                        prev.map((r) => (r.id === editingCvId ? json.data : r))
                    );
                    showToast("Resume updated successfully!", "success");
                } else {
                    setResumes((prev) => [json.data, ...prev]);
                    showToast("Resume uploaded successfully!", "success");
                }
                closeCvModal();
            } else if (json.errors) {
                setCvFormErrors(json.errors);
            }
        } catch (err) {
            console.error("Failed to save resume:", err);
        } finally {
            setIsSubmittingCv(false);
        }
    };

    const handlePromptDeleteCv = (id) => {
        setActiveMenuId(null);
        setDeleteTargetCvId(id);
    };

    const confirmDeleteCv = async () => {
        if (!deleteTargetCvId) return;
        setIsDeletingCv(true);
        try {
            const res = await fetch(`/candidate/resumes/${deleteTargetCvId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });
            const json = await res.json();
            if (json.success) {
                setResumes((prev) => prev.filter((r) => r.id !== deleteTargetCvId));
                showToast("Resume deleted successfully!", "success");
                setDeleteTargetCvId(null);
            } else {
                showToast(json.message || json.error || "Failed to delete resume", "error");
            }
        } catch (err) {
            console.error("Failed to delete resume:", err);
            showToast("Server exception while deleting resume", "error");
        } finally {
            setIsDeletingCv(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl relative">
            {/* Global Reusable Toast Notification */}
            <Toast toast={toastMessage} onClose={() => setToastMessage(null)} />

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
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload("profile_picture", file);
                            }}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                            <div className="h-44 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                {isUploadingImage.profile_picture ? (
                                    <div className="flex flex-col items-center gap-2 text-[#0A65CC]">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span className="text-xs font-semibold">Processing...</span>
                                    </div>
                                ) : profilePicPreview ? (
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

                            {/* Dynamic Buttons: 1 Upload button if NO picture, 2 Change/Remove buttons if picture exists */}
                            {profilePicPreview ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => profilePicInputRef.current?.click()}
                                        disabled={isUploadingImage.profile_picture}
                                        className="flex-1 h-9 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-bold rounded-none flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                    >
                                        <UploadCloud className="w-3.5 h-3.5" />
                                        <span>Change</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete("profile_picture")}
                                        disabled={isUploadingImage.profile_picture}
                                        className="flex-1 h-9 bg-[#FFF0F0] hover:bg-[#FFE0E0] text-[#E05151] border border-[#E05151]/20 text-xs font-bold rounded-none flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => profilePicInputRef.current?.click()}
                                    disabled={isUploadingImage.profile_picture}
                                    className="w-full h-10 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-bold rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    <span>Upload Profile Picture</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Banner Picture */}
                    <div className="md:col-span-8">
                        <input
                            type="file"
                            ref={bannerPicInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload("banner_picture", file);
                            }}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                            <div className="h-44 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                {isUploadingImage.banner_picture ? (
                                    <div className="flex flex-col items-center gap-2 text-[#0A65CC]">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span className="text-xs font-semibold">Processing...</span>
                                    </div>
                                ) : bannerPicPreview ? (
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

                            {/* Dynamic Buttons: 1 Upload button if NO picture, 2 Change/Remove buttons if picture exists */}
                            {bannerPicPreview ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => bannerPicInputRef.current?.click()}
                                        disabled={isUploadingImage.banner_picture}
                                        className="flex-1 h-9 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-bold rounded-none flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                    >
                                        <UploadCloud className="w-3.5 h-3.5" />
                                        <span>Change Banner</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete("banner_picture")}
                                        disabled={isUploadingImage.banner_picture}
                                        className="flex-1 h-9 bg-[#FFF0F0] hover:bg-[#FFE0E0] text-[#E05151] border border-[#E05151]/20 text-xs font-bold rounded-none flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Remove Banner</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => bannerPicInputRef.current?.click()}
                                    disabled={isUploadingImage.banner_picture}
                                    className="w-full h-10 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-bold rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    <span>Upload Banner Picture</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

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
                    {formErrors.headline && (
                        <p className="text-xs text-[#E05151] mt-1">{formErrors.headline[0]}</p>
                    )}
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
                    {formErrors.website && (
                        <p className="text-xs text-[#E05151] mt-1">{formErrors.website[0]}</p>
                    )}
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
                            placeholder="Phone Number (10 digits)"
                            className="w-full h-full px-4 text-sm text-[#18191C] placeholder:text-[#9199A8] focus:outline-none bg-transparent"
                        />
                    </div>
                    {formErrors.phone && (
                        <p className="text-xs text-[#E05151] mt-1">{formErrors.phone[0]}</p>
                    )}
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
                    {formErrors.location && (
                        <p className="text-xs text-[#E05151] mt-1">{formErrors.location[0]}</p>
                    )}
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
                            {formErrors.gender && (
                                <p className="text-xs text-[#E05151] mt-1">{formErrors.gender[0]}</p>
                            )}
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
                            {formErrors.marital_status && (
                                <p className="text-xs text-[#E05151] mt-1">{formErrors.marital_status[0]}</p>
                            )}
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
                            {formErrors.date_of_birth && (
                                <p className="text-xs text-[#E05151] mt-1">{formErrors.date_of_birth[0]}</p>
                            )}
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
                            {formErrors.domicile && (
                                <p className="text-xs text-[#E05151] mt-1">{formErrors.domicile[0]}</p>
                            )}
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
                            {formErrors.postal_address && (
                                <p className="text-xs text-[#E05151] mt-1">{formErrors.postal_address[0]}</p>
                            )}
                        </div>
                    </div>

                    {/* CNIC Card / Document Image Upload */}
                    <div className="space-y-2 pt-2">
                        <input
                            type="file"
                            ref={cnicInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload("cnic", file);
                            }}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                            <div className="h-40 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                {isUploadingImage.cnic ? (
                                    <div className="flex flex-col items-center gap-2 text-[#0A65CC]">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span className="text-xs font-semibold">Processing...</span>
                                    </div>
                                ) : cnicPreview ? (
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
                                            Upload front or back copy of CNIC (Max 5MB)
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Dynamic Buttons: 1 Upload button if NO picture, 2 Change/Remove buttons if picture exists */}
                            {cnicPreview ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => cnicInputRef.current?.click()}
                                        disabled={isUploadingImage.cnic}
                                        className="flex-1 h-9 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-bold rounded-none flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                                    >
                                        <UploadCloud className="w-3.5 h-3.5" />
                                        <span>Change CNIC</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete("cnic")}
                                        disabled={isUploadingImage.cnic}
                                        className="flex-1 h-9 bg-[#FFF0F0] hover:bg-[#FFE0E0] text-[#E05151] border border-[#E05151]/20 text-xs font-bold rounded-none flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Remove CNIC</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => cnicInputRef.current?.click()}
                                    disabled={isUploadingImage.cnic}
                                    className="w-full h-10 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-bold rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    <span>Upload CNIC Image</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSavingPersonal}
                    className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors flex items-center gap-2"
                >
                    {isSavingPersonal && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Save Changes</span>
                </button>
            </form>

            {/* Resume Section */}
            <div className="pt-6 border-t border-[#E4E5E8] space-y-4">
                <h3 className="text-base font-bold text-[#18191C]">
                    Your Cv/Resume
                </h3>

                {isLoadingResumes ? (
                    <div className="p-8 text-center text-sm text-[#767E94] flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-[#0A65CC]" />
                        <span>Loading resumes...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resumes.map((res) => (
                            <div
                                key={res.id}
                                className="bg-[#F1F2F4] border border-[#E4E5E8] p-4 rounded-none flex items-center justify-between relative"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <FileText className="w-6 h-6 text-[#0A65CC] shrink-0" />
                                    <div className="min-w-0">
                                        <a
                                            href={res.file_path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-[#18191C] hover:text-[#0A65CC] truncate block hover:underline"
                                            title={res.name}
                                        >
                                            {res.name}
                                        </a>
                                        <p className="text-[11px] text-[#767E94]">
                                            {res.file_size || "PDF"}
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
                                                    onClick={() => openEditCvModal(res)}
                                                    className="w-full px-3 py-1.5 text-left text-xs text-[#0A65CC] hover:bg-[#F1F2F4] flex items-center gap-2 cursor-pointer font-semibold"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                    <span>Edit Resume</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handlePromptDeleteCv(res.id)}
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
                            onClick={openAddCvModal}
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
                )}
            </div>

            {/* ADD / EDIT CV MODAL */}
            <AnimatePresence>
                {isCvModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeCvModal}
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
                                    {editingCvId ? "Edit Cv/Resume" : "Add Cv/Resume"}
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeCvModal}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCvModalSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        CV/Resume Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={cvFormName}
                                        onChange={(e) => setCvFormName(e.target.value)}
                                        placeholder="e.g. Senior Developer Resume"
                                        className={`w-full h-11 px-4 text-sm bg-white border ${
                                            cvFormErrors.name ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {cvFormErrors.name && (
                                        <p className="text-xs text-[#E05151] mt-1">{cvFormErrors.name[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="file"
                                        ref={cvFileInputRef}
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setSelectedCvFile(file);
                                        }}
                                    />

                                    <div
                                        onClick={() => cvFileInputRef.current?.click()}
                                        className={`border-2 border-dashed ${
                                            cvFormErrors.resume_file ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } hover:border-[#0A65CC] p-6 text-center bg-[#F8F9FA] space-y-2 cursor-pointer transition-colors`}
                                    >
                                        <UploadCloud className="w-8 h-8 text-[#0A65CC] mx-auto" />
                                        <p className="text-xs font-medium text-[#18191C]">
                                            {selectedCvFile
                                                ? selectedCvFile.name
                                                : editingCvId
                                                ? "Click to replace PDF file (optional)"
                                                : "Browse file or drop PDF here *"}
                                        </p>
                                        <p className="text-[11px] text-[#767E94]">
                                            Max file size 12 MB (Only PDF)
                                        </p>
                                    </div>
                                    {cvFormErrors.resume_file && (
                                        <p className="text-xs text-[#E05151] mt-1">{cvFormErrors.resume_file[0]}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={closeCvModal}
                                        className="px-5 h-11 bg-[#F1F2F4] text-[#18191C] hover:bg-[#E4E5E8] font-bold text-xs rounded-none border-none cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmittingCv}
                                        className="px-5 h-11 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer flex items-center gap-2"
                                    >
                                        {isSubmittingCv && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>{editingCvId ? "Update Resume" : "Upload Resume"}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <DeleteConfirmationModal
                isOpen={Boolean(deleteTargetCvId)}
                onClose={() => setDeleteTargetCvId(null)}
                onConfirm={confirmDeleteCv}
                isDeleting={isDeletingCv}
                title="Delete Resume"
                message="Are you sure you want to delete this resume? This action cannot be undone."
            />
        </div>
    );
}
