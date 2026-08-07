import React, { useState, useRef, useEffect } from "react";
import {
    Award,
    Plus,
    Calendar,
    Edit2,
    Trash2,
    Check,
    X,
    UploadCloud,
    ExternalLink,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/Components/Toast";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function CertificationsTab() {
    const [certifications, setCertifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Delete confirmation state
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Certification modal state
    const [isCertModalOpen, setIsCertModalOpen] = useState(false);
    const [editingCertId, setEditingCertId] = useState(null);
    const certImageInputRef = useRef(null);
    const [selectedCertFile, setSelectedCertFile] = useState(null);
    const [certImagePreview, setCertImagePreview] = useState(null);
    const [certForm, setCertForm] = useState({
        title: "",
        issuing_organization: "",
        issue_date: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
    };

    const showToast = (text, type = "success", duration = 3000) => {
        setToast({ text, type, duration });
    };

    const fetchCertifications = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/certifications", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setCertifications(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch certifications:", err);
            showToast("Failed to load certifications", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const handleOpenAddCert = () => {
        setEditingCertId(null);
        setCertForm({
            title: "",
            issuing_organization: "",
            issue_date: "",
        });
        setSelectedCertFile(null);
        setCertImagePreview(null);
        setFormErrors({});
        setIsCertModalOpen(true);
    };

    const handleOpenEditCert = (item) => {
        setEditingCertId(item.id);
        setCertForm({
            title: item.title || "",
            issuing_organization: item.issuing_organization || "",
            issue_date: item.issue_date || "",
        });
        setSelectedCertFile(null);
        setCertImagePreview(item.certification_image || item.certificate_image || null);
        setFormErrors({});
        setIsCertModalOpen(true);
    };

    const handleCertImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedCertFile(file);
            setCertImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveCertSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", certForm.title || "");
        formData.append("issuing_organization", certForm.issuing_organization || "");
        if (certForm.issue_date) formData.append("issue_date", certForm.issue_date);
        if (selectedCertFile) {
            formData.append("certification_image", selectedCertFile);
        }

        const url = editingCertId
            ? `/candidate/certifications/${editingCertId}`
            : "/candidate/certifications";

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

            if (res.status === 422 || json.errors) {
                setFormErrors(json.errors || {});
                return;
            }

            if (json.success) {
                showToast(
                    json.message ||
                        (editingCertId
                            ? "Certification updated successfully!"
                            : "Certification added successfully!"),
                    "success"
                );
                setIsCertModalOpen(false);
                fetchCertifications();
            } else {
                showToast(json.message || json.error || "Failed to save certification", "error");
            }
        } catch (err) {
            console.error("Save certification error:", err);
            showToast("Server exception while saving certification", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePromptDeleteCert = (id) => {
        setDeleteTargetId(id);
    };

    const confirmDeleteCert = async () => {
        if (!deleteTargetId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/candidate/certifications/${deleteTargetId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                showToast("Certification deleted successfully!", "success");
                setCertifications((prev) => prev.filter((item) => item.id !== deleteTargetId));
                setDeleteTargetId(null);
            } else {
                showToast(json.message || json.error || "Failed to delete certification", "error");
            }
        } catch (err) {
            console.error("Delete certification error:", err);
            showToast("Server exception while deleting certification", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <Toast toast={toast} onClose={() => setToast(null)} />

            <div className="flex items-center justify-between pb-2 border-b border-[#E4E5E8]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Licenses & Certifications
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Add industry credentials, verified licenses, and digital badges
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddCert}
                    className="px-4 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 cursor-pointer transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Certification</span>
                </button>
            </div>

            {/* Saved Certifications List */}
            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading certifications...</p>
                </div>
            ) : certifications.length === 0 ? (
                <div className="p-8 border border-dashed border-[#E4E5E8] bg-[#F8F9FA] text-center space-y-3">
                    <Award className="w-12 h-12 text-[#9199A3] mx-auto" />
                    <h4 className="text-sm font-bold text-[#18191C]">
                        No Certifications Added
                    </h4>
                    <p className="text-xs text-[#767E94] max-w-md mx-auto">
                        Highlight professional accreditations to stand out to hiring managers and recruiters.
                    </p>
                    <button
                        type="button"
                        onClick={handleOpenAddCert}
                        className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                    >
                        Add Certification
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {certifications.map((item) => (
                        <div
                            key={item.id}
                            className="p-5 border border-[#E4E5E8] bg-white rounded-none hover:border-[#0A65CC]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-[#F8F9FA] border border-[#E4E5E8] flex items-center justify-center shrink-0 overflow-hidden rounded-none">
                                    {(item.certification_image || item.certificate_image) ? (
                                        <img
                                            src={item.certification_image || item.certificate_image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Award className="w-7 h-7 text-[#0A65CC]" />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-[#18191C]">
                                        {item.title}
                                    </h4>

                                    <p className="text-xs font-semibold text-[#5E6670]">
                                        {item.issuing_organization}
                                    </p>

                                    {item.issue_date && (
                                        <div className="flex items-center gap-1 text-[11px] text-[#9199A3]">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Issued {item.issue_date}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditCert(item)}
                                    className="px-3 py-1.5 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs rounded-none flex items-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Edit2 className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePromptDeleteCert(item.id)}
                                    className="px-3 py-1.5 bg-[#FFF0F0] hover:bg-[#FFE5E5] text-[#E05151] font-semibold text-xs rounded-none flex items-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD/EDIT CERTIFICATION MODAL */}
            <AnimatePresence>
                {isCertModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCertModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-lg bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                        >
                            <div className="p-5 border-b border-[#E4E5E8] flex items-center justify-between bg-[#F8F9FA]">
                                <div className="flex items-center gap-2.5">
                                    <Award className="w-5 h-5 text-[#0A65CC]" />
                                    <h3 className="text-base font-bold text-[#18191C]">
                                        {editingCertId ? "Edit Certification" : "Add Certification"}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsCertModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveCertSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto pb-36">
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={certForm.title}
                                        onChange={(e) => {
                                            setCertForm({ ...certForm, title: e.target.value });
                                            if (formErrors.title) setFormErrors({ ...formErrors, title: null });
                                        }}
                                        placeholder="Certification Title *"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.title ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.title && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.title[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="issuing_organization"
                                        value={certForm.issuing_organization}
                                        onChange={(e) => {
                                            setCertForm({ ...certForm, issuing_organization: e.target.value });
                                            if (formErrors.issuing_organization) setFormErrors({ ...formErrors, issuing_organization: null });
                                        }}
                                        placeholder="Issuing Organization *"
                                        className={`w-full h-12 px-4 text-sm bg-[#ffffff] border ${
                                            formErrors.issuing_organization ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.issuing_organization && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.issuing_organization[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <DatePickerInput
                                        name="issue_date"
                                        value={certForm.issue_date}
                                        placeholder="Issue Date"
                                        onChange={(e) => {
                                            setCertForm({ ...certForm, issue_date: e.target.value });
                                            if (formErrors.issue_date) setFormErrors({ ...formErrors, issue_date: null });
                                        }}
                                    />
                                    {formErrors.issue_date && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.issue_date[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Certification Document / Badge Image
                                    </label>
                                    <input
                                        type="file"
                                        ref={certImageInputRef}
                                        onChange={handleCertImageSelect}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                                        <div className="h-32 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                            {certImagePreview ? (
                                                <img
                                                    src={certImagePreview}
                                                    alt="Certification Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center text-[#767E94] p-3">
                                                    <UploadCloud className="w-6 h-6 mx-auto mb-1 text-[#0A65CC]" />
                                                    <span className="text-xs font-medium text-[#18191C] block">
                                                        Upload Certificate Image
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-[#767E94]">Certificate Image</span>
                                            <div className="flex items-center gap-3">
                                                {certImagePreview && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCertFile(null);
                                                            setCertImagePreview(null);
                                                        }}
                                                        className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => certImageInputRef.current?.click()}
                                                    className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                                >
                                                    {certImagePreview ? "Replace" : "Browse Image"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {formErrors.certification_image && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.certification_image[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={() => setIsCertModalOpen(false)}
                                        className="px-6 h-12 bg-[#F1F2F4] text-[#18191C] hover:bg-[#E4E5E8] font-bold text-sm rounded-none border-none transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>{editingCertId ? "Update Certification" : "Save Certification"}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <DeleteConfirmationModal
                isOpen={Boolean(deleteTargetId)}
                onClose={() => setDeleteTargetId(null)}
                onConfirm={confirmDeleteCert}
                isDeleting={isDeleting}
                title="Delete Certification"
                message="Are you sure you want to delete this certification? This action cannot be undone."
            />
        </div>
    );
}
