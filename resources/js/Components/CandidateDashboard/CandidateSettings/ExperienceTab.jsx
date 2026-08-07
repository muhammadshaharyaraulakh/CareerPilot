import React, { useState, useRef, useEffect } from "react";
import {
    Briefcase,
    Plus,
    Building,
    Calendar,
    Edit2,
    Trash2,
    Check,
    X,
    UploadCloud,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/Components/Toast";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function ExperienceTab() {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Delete confirmation state
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Experience Modal state
    const [isExpModalOpen, setIsExpModalOpen] = useState(false);
    const [editingExpId, setEditingExpId] = useState(null);
    const [expForm, setExpForm] = useState({
        job_title: "",
        company_name: "",
        location: "",
        start_date: "",
        end_date: "",
        is_current: false,
    });
    const [formErrors, setFormErrors] = useState({});

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
    };

    const showToast = (text, type = "success", duration = 3000) => {
        setToast({ text, type, duration });
    };

    const fetchExperiences = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/experiences", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setExperiences(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch experiences:", err);
            showToast("Failed to load work experiences", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleOpenAddExp = () => {
        setEditingExpId(null);
        setExpForm({
            job_title: "",
            company_name: "",
            location: "",
            start_date: "",
            end_date: "",
            is_current: false,
        });
        setFormErrors({});
        setIsExpModalOpen(true);
    };

    const handleOpenEditExp = (item) => {
        setEditingExpId(item.id);
        setExpForm({
            job_title: item.job_title || item.title || "",
            company_name: item.company_name || "",
            location: item.location || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
            is_current: Boolean(item.is_current),
        });
        setFormErrors({});
        setIsExpModalOpen(true);
    };

    const handleSaveExpSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setIsSubmitting(true);

        const payload = {
            job_title: expForm.job_title,
            company_name: expForm.company_name,
            location: expForm.location || null,
            start_date: expForm.start_date || null,
            end_date: expForm.is_current ? null : expForm.end_date || null,
            is_current: expForm.is_current ? 1 : 0,
        };

        const url = editingExpId
            ? `/candidate/experiences/${editingExpId}`
            : "/candidate/experiences";

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (res.status === 422 || json.errors) {
                setFormErrors(json.errors || {});
                return;
            }

            if (json.success) {
                showToast(
                    json.message ||
                        (editingExpId
                            ? "Work experience updated successfully!"
                            : "Work experience added successfully!"),
                    "success"
                );
                setIsExpModalOpen(false);
                fetchExperiences();
            } else {
                showToast(json.message || json.error || "Failed to save work experience", "error");
            }
        } catch (err) {
            console.error("Save experience error:", err);
            showToast("Server exception while saving work experience", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePromptDeleteExp = (id) => {
        setDeleteTargetId(id);
    };

    const confirmDeleteExp = async () => {
        if (!deleteTargetId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/candidate/experiences/${deleteTargetId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                showToast("Work experience deleted successfully!", "success");
                setExperiences((prev) => prev.filter((item) => item.id !== deleteTargetId));
                setDeleteTargetId(null);
            } else {
                showToast(json.message || json.error || "Failed to delete work experience", "error");
            }
        } catch (err) {
            console.error("Delete experience error:", err);
            showToast("Server exception while deleting work experience", "error");
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
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Work Experience
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Add your past and current work history, responsibilities, and achievements
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddExp}
                    className="px-4 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 cursor-pointer transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Experience</span>
                </button>
            </div>

            {/* Saved Experiences List */}
            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading work experiences...</p>
                </div>
            ) : experiences.length === 0 ? (
                <div className="p-8 border border-dashed border-[#E4E5E8] bg-[#F8F9FA] text-center space-y-3">
                    <Briefcase className="w-12 h-12 text-[#9199A3] mx-auto" />
                    <h4 className="text-sm font-bold text-[#18191C]">
                        No Experience Added Yet
                    </h4>
                    <p className="text-xs text-[#767E94] max-w-md mx-auto">
                        Adding your work experience significantly boosts profile views and
                        job match rate from employers.
                    </p>
                    <button
                        type="button"
                        onClick={handleOpenAddExp}
                        className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                    >
                        Add Experience
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {experiences.map((item) => (
                        <div
                            key={item.id}
                            className="p-5 border border-[#E4E5E8] bg-white rounded-none hover:border-[#0A65CC]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#F8F9FA] border border-[#E4E5E8] flex items-center justify-center shrink-0 overflow-hidden rounded-none">
                                    <Building className="w-6 h-6 text-[#0A65CC]" />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-sm font-bold text-[#18191C]">
                                            {item.job_title || item.title || "Job Title"}
                                        </h4>
                                        {item.is_current && (
                                            <span className="px-2 py-0.5 bg-[#EAF6ED] text-[#0BA02C] text-[10px] font-bold uppercase rounded-none">
                                                Current Position
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-[#5E6670] flex-wrap">
                                        <span className="font-semibold text-[#18191C]">
                                            {item.company_name}
                                        </span>
                                        {item.location && <span>• {item.location}</span>}
                                    </div>

                                    {(item.start_date || item.end_date || item.is_current) && (
                                        <div className="flex items-center gap-1 text-[11px] text-[#9199A3]">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {item.start_date ? item.start_date : "Start Date"} —{" "}
                                                {item.is_current ? "Present" : item.end_date || "End Date"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 self-end md:self-start shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditExp(item)}
                                    className="px-3 py-1.5 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs rounded-none flex items-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Edit2 className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePromptDeleteExp(item.id)}
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

            {/* ADD/EDIT EXPERIENCE MODAL */}
            <AnimatePresence>
                {isExpModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExpModalOpen(false)}
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
                                    <Briefcase className="w-5 h-5 text-[#0A65CC]" />
                                    <h3 className="text-base font-bold text-[#18191C]">
                                        {editingExpId ? "Edit Experience" : "Add Experience"}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsExpModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveExpSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto pb-36">
                                <div>
                                    <input
                                        type="text"
                                        name="job_title"
                                        value={expForm.job_title}
                                        onChange={(e) => {
                                            setExpForm({ ...expForm, job_title: e.target.value });
                                            if (formErrors.job_title) setFormErrors({ ...formErrors, job_title: null });
                                        }}
                                        placeholder="Job Title *"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.job_title ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.job_title && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.job_title[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={expForm.company_name}
                                        onChange={(e) => {
                                            setExpForm({ ...expForm, company_name: e.target.value });
                                            if (formErrors.company_name) setFormErrors({ ...formErrors, company_name: null });
                                        }}
                                        placeholder="Company Name *"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.company_name ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.company_name && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.company_name[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="location"
                                        value={expForm.location}
                                        onChange={(e) => {
                                            setExpForm({ ...expForm, location: e.target.value });
                                            if (formErrors.location) setFormErrors({ ...formErrors, location: null });
                                        }}
                                        placeholder="Location"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.location ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.location && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.location[0]}
                                        </p>
                                    )}
                                </div>

                                <div className={`grid grid-cols-1 ${expForm.is_current ? "" : "sm:grid-cols-2"} gap-4`}>
                                    <div>
                                        <DatePickerInput
                                            name="start_date"
                                            value={expForm.start_date}
                                            placeholder="Start Date *"
                                            onChange={(e) => {
                                                setExpForm({ ...expForm, start_date: e.target.value });
                                                if (formErrors.start_date) setFormErrors({ ...formErrors, start_date: null });
                                            }}
                                        />
                                        {formErrors.start_date && (
                                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                                {formErrors.start_date[0]}
                                            </p>
                                        )}
                                    </div>

                                    {!expForm.is_current && (
                                        <div>
                                            <DatePickerInput
                                                name="end_date"
                                                value={expForm.end_date}
                                                alignRight={true}
                                                placeholder="End Date"
                                                onChange={(e) => {
                                                    setExpForm({ ...expForm, end_date: e.target.value });
                                                    if (formErrors.end_date) setFormErrors({ ...formErrors, end_date: null });
                                                }}
                                            />
                                            {formErrors.end_date && (
                                                <p className="text-xs text-[#E05151] mt-1 font-medium">
                                                    {formErrors.end_date[0]}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer pt-1">
                                    <input
                                        type="checkbox"
                                        name="is_current"
                                        checked={expForm.is_current}
                                        onChange={(e) =>
                                            setExpForm({
                                                ...expForm,
                                                is_current: e.target.checked,
                                                end_date: e.target.checked ? "" : expForm.end_date,
                                            })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-[#18191C]">
                                        I currently work here
                                    </span>
                                </label>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpModalOpen(false)}
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
                                        <span>{editingExpId ? "Update Experience" : "Save Experience"}</span>
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
                onConfirm={confirmDeleteExp}
                isDeleting={isDeleting}
                title="Delete Experience Record"
                message="Are you sure you want to delete this work experience record? This action cannot be undone."
            />
        </div>
    );
}
