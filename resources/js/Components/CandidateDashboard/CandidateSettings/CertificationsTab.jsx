import React, { useState, useRef } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificationsTab() {
    // Certifications state
    const [certifications, setCertifications] = useState([
        {
            id: 1,
            title: "AWS Certified Solutions Architect – Associate",
            issuing_organization: "Amazon Web Services (AWS)",
            credential_id: "AWS-PSA-89421",
            credential_url: "https://aws.amazon.com/verification",
            issue_date: "2023-05-10",
            expiration_date: "2026-05-10",
            does_not_expire: false,
            certificate_image: null,
        },
        {
            id: 2,
            title: "Meta Certified Professional Frontend Developer",
            issuing_organization: "Meta / Coursera",
            credential_id: "META-FRONTEND-2022",
            credential_url: "https://coursera.org/verify/meta-frontend",
            issue_date: "2022-11-01",
            expiration_date: "",
            does_not_expire: true,
            certificate_image: null,
        },
    ]);

    // Certification modal state
    const [isCertModalOpen, setIsCertModalOpen] = useState(false);
    const [editingCertId, setEditingCertId] = useState(null);
    const certImageInputRef = useRef(null);
    const [certImagePreview, setCertImagePreview] = useState(null);
    const [certForm, setCertForm] = useState({
        title: "",
        issuing_organization: "",
        credential_id: "",
        credential_url: "",
        issue_date: "",
        expiration_date: "",
        does_not_expire: false,
    });
    const [showCertSuccess, setShowCertSuccess] = useState(false);

    // Handlers
    const handleOpenAddCert = () => {
        setEditingCertId(null);
        setCertForm({
            title: "",
            issuing_organization: "",
            credential_id: "",
            credential_url: "",
            issue_date: "",
            expiration_date: "",
            does_not_expire: false,
        });
        setCertImagePreview(null);
        setIsCertModalOpen(true);
    };

    const handleOpenEditCert = (item) => {
        setEditingCertId(item.id);
        setCertForm({
            title: item.title,
            issuing_organization: item.issuing_organization,
            credential_id: item.credential_id || "",
            credential_url: item.credential_url || "",
            issue_date: item.issue_date || "",
            expiration_date: item.expiration_date || "",
            does_not_expire: item.does_not_expire || false,
        });
        setCertImagePreview(item.certificate_image || null);
        setIsCertModalOpen(true);
    };

    const handleCertImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setCertImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveCertSubmit = (e) => {
        e.preventDefault();
        if (!certForm.title.trim() || !certForm.issuing_organization.trim()) return;

        if (editingCertId) {
            setCertifications((prev) =>
                prev.map((item) =>
                    item.id === editingCertId
                        ? { ...item, ...certForm, certificate_image: certImagePreview }
                        : item
                )
            );
        } else {
            const newCert = {
                id: Date.now(),
                ...certForm,
                certificate_image: certImagePreview,
            };
            setCertifications((prev) => [newCert, ...prev]);
        }

        setIsCertModalOpen(false);
        setShowCertSuccess(true);
        setTimeout(() => setShowCertSuccess(false), 3000);
    };

    const handleDeleteCert = (id) => {
        setCertifications((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {showCertSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Certifications & licenses updated successfully!</span>
                </div>
            )}

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
            {certifications.length === 0 ? (
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
                                    {item.certificate_image ? (
                                        <img
                                            src={item.certificate_image}
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

                                    {(item.issue_date || item.expiration_date || item.does_not_expire) && (
                                        <div className="flex items-center gap-1 text-[11px] text-[#9199A3]">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                Issued {item.issue_date || "N/A"} —{" "}
                                                {item.does_not_expire
                                                    ? "No Expiration"
                                                    : `Expires ${item.expiration_date || "N/A"}`}
                                            </span>
                                        </div>
                                    )}

                                    {item.credential_id && (
                                        <p className="text-xs text-[#767E94]">
                                            <span className="font-medium text-[#18191C]">Credential ID:</span>{" "}
                                            {item.credential_id}
                                        </p>
                                    )}

                                    {item.credential_url && (
                                        <a
                                            href={item.credential_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-[#0A65CC] font-semibold hover:underline pt-0.5"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Verify Credential</span>
                                        </a>
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
                                    onClick={() => handleDeleteCert(item.id)}
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

                            <form onSubmit={handleSaveCertSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Certification Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={certForm.title}
                                        onChange={(e) =>
                                            setCertForm({ ...certForm, title: e.target.value })
                                        }
                                        placeholder="e.g. AWS Certified Developer"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Issuing Organization *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={certForm.issuing_organization}
                                        onChange={(e) =>
                                            setCertForm({
                                                ...certForm,
                                                issuing_organization: e.target.value,
                                            })
                                        }
                                        placeholder="e.g. Amazon Web Services, Google, Coursera"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Credential ID
                                    </label>
                                    <input
                                        type="text"
                                        value={certForm.credential_id}
                                        onChange={(e) =>
                                            setCertForm({ ...certForm, credential_id: e.target.value })
                                        }
                                        placeholder="e.g. ABC-123456"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Verification URL
                                    </label>
                                    <input
                                        type="url"
                                        value={certForm.credential_url}
                                        onChange={(e) =>
                                            setCertForm({ ...certForm, credential_url: e.target.value })
                                        }
                                        placeholder="e.g. https://example.com/verify/123"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                            Issue Date
                                        </label>
                                        <input
                                            type="date"
                                            value={certForm.issue_date}
                                            onChange={(e) =>
                                                setCertForm({ ...certForm, issue_date: e.target.value })
                                            }
                                            className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C]"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                            Expiration Date
                                        </label>
                                        <input
                                            type="date"
                                            disabled={certForm.does_not_expire}
                                            value={certForm.does_not_expire ? "" : certForm.expiration_date}
                                            onChange={(e) =>
                                                setCertForm({
                                                    ...certForm,
                                                    expiration_date: e.target.value,
                                                })
                                            }
                                            className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C] disabled:bg-[#F8F9FA] disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer pt-1">
                                    <input
                                        type="checkbox"
                                        checked={certForm.does_not_expire}
                                        onChange={(e) =>
                                            setCertForm({
                                                ...certForm,
                                                does_not_expire: e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-[#18191C]">
                                        This certification does not expire
                                    </span>
                                </label>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Certificate Badge / Document Image
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
                                                    alt="Certificate Image"
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
                                            <span className="text-[#767E94]">Badge / Certificate</span>
                                            <div className="flex items-center gap-3">
                                                {certImagePreview && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setCertImagePreview(null)}
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
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                                    >
                                        {editingCertId ? "Update Certificate" : "Save Certificate"}
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
