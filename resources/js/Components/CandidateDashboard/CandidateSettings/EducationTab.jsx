import React, { useState, useRef, useEffect } from "react";
import {
    GraduationCap,
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

export default function EducationTab() {
    const [educations, setEducations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Delete confirmation state
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Education modal state
    const [isEduModalOpen, setIsEduModalOpen] = useState(false);
    const [editingEduId, setEditingEduId] = useState(null);
    const degreeImageInputRef = useRef(null);
    const [selectedDegreeFile, setSelectedDegreeFile] = useState(null);
    const [degreeImagePreview, setDegreeImagePreview] = useState(null);
    const [eduForm, setEduForm] = useState({
        degree: "",
        institution: "",
        field: "",
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

    const fetchEducations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/educations", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setEducations(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch education records:", err);
            showToast("Failed to load education records", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    const handleOpenAddEdu = () => {
        setEditingEduId(null);
        setEduForm({
            degree: "",
            institution: "",
            field: "",
            start_date: "",
            end_date: "",
            is_current: false,
        });
        setSelectedDegreeFile(null);
        setDegreeImagePreview(null);
        setFormErrors({});
        setIsEduModalOpen(true);
    };

    const handleOpenEditEdu = (item) => {
        setEditingEduId(item.id);
        setEduForm({
            degree: item.degree || "",
            institution: item.institution || "",
            field: item.field || item.field_of_study || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
            is_current: Boolean(item.is_current),
        });
        setSelectedDegreeFile(null);
        setDegreeImagePreview(item.degree_image || null);
        setFormErrors({});
        setIsEduModalOpen(true);
    };

    const handleDegreeImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedDegreeFile(file);
            setDegreeImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveEduSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("degree", eduForm.degree || "");
        formData.append("institution", eduForm.institution || "");
        formData.append("field", eduForm.field || "");
        if (eduForm.start_date) formData.append("start_date", eduForm.start_date);
        if (eduForm.end_date && !eduForm.is_current) formData.append("end_date", eduForm.end_date);
        formData.append("is_current", eduForm.is_current ? "1" : "0");
        if (selectedDegreeFile && !eduForm.is_current) {
            formData.append("degree_image", selectedDegreeFile);
        }

        const url = editingEduId
            ? `/candidate/educations/${editingEduId}`
            : "/candidate/educations";

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
                        (editingEduId
                            ? "Education updated successfully!"
                            : "Education added successfully!"),
                    "success"
                );
                setIsEduModalOpen(false);
                fetchEducations();
            } else {
                showToast(json.message || json.error || "Failed to save education", "error");
            }
        } catch (err) {
            console.error("Save education error:", err);
            showToast("Server exception while saving education", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePromptDeleteEdu = (id) => {
        setDeleteTargetId(id);
    };

    const confirmDeleteEdu = async () => {
        if (!deleteTargetId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/candidate/educations/${deleteTargetId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                showToast("Education record deleted successfully!", "success");
                setEducations((prev) => prev.filter((item) => item.id !== deleteTargetId));
                setDeleteTargetId(null);
            } else {
                showToast(json.message || json.error || "Failed to delete education record", "error");
            }
        } catch (err) {
            console.error("Delete education error:", err);
            showToast("Server exception while deleting education", "error");
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
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Educational Qualifications
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Manage your degrees, institutions, fields of study, and certificates
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddEdu}
                    className="px-4 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 cursor-pointer transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Education</span>
                </button>
            </div>

            {/* Saved Educations List */}
            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading education records...</p>
                </div>
            ) : educations.length === 0 ? (
                <div className="p-8 border border-dashed border-[#E4E5E8] bg-[#F8F9FA] text-center space-y-3">
                    <GraduationCap className="w-12 h-12 text-[#9199A3] mx-auto" />
                    <h4 className="text-sm font-bold text-[#18191C]">
                        No Education Records Added
                    </h4>
                    <p className="text-xs text-[#767E94] max-w-md mx-auto">
                        Add your degrees, diplomas, and academic background to showcase your
                        qualification to potential employers.
                    </p>
                    <button
                        type="button"
                        onClick={handleOpenAddEdu}
                        className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                    >
                        Add Education
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {educations.map((item) => (
                        <div
                            key={item.id}
                            className="p-5 border border-[#E4E5E8] bg-white rounded-none hover:border-[#0A65CC]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-[#F8F9FA] border border-[#E4E5E8] flex items-center justify-center shrink-0 overflow-hidden rounded-none">
                                    {item.degree_image ? (
                                        <img
                                            src={item.degree_image}
                                            alt={item.degree}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <GraduationCap className="w-7 h-7 text-[#0A65CC]" />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-sm font-bold text-[#18191C]">
                                            {item.degree || item.title || "Degree / Title"}
                                        </h4>
                                        {item.is_current && (
                                            <span className="px-2 py-0.5 bg-[#E8F1FF] text-[#0A65CC] text-[10px] font-bold uppercase rounded-none">
                                                Currently Studying
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-[#5E6670]">
                                        <Building className="w-3.5 h-3.5 text-[#0A65CC]" />
                                        <span className="font-semibold">{item.institution}</span>
                                    </div>

                                    {(item.field || item.field_of_study) && (
                                        <p className="text-xs text-[#767E94]">
                                            <span className="font-medium text-[#18191C]">Field:</span>{" "}
                                            {item.field || item.field_of_study}
                                        </p>
                                    )}

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
                            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEditEdu(item)}
                                    className="px-3 py-1.5 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs rounded-none flex items-center gap-1.5 cursor-pointer transition-colors"
                                >
                                    <Edit2 className="w-3.5 h-3.5 text-[#0A65CC]" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePromptDeleteEdu(item.id)}
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

            {/* ADD/EDIT EDUCATION MODAL */}
            <AnimatePresence>
                {isEduModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEduModalOpen(false)}
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
                                    <GraduationCap className="w-5 h-5 text-[#0A65CC]" />
                                    <h3 className="text-base font-bold text-[#18191C]">
                                        {editingEduId ? "Edit Education" : "Add Education"}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEduModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveEduSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto pb-36">
                                <div>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={eduForm.degree}
                                        onChange={(e) => {
                                            setEduForm({ ...eduForm, degree: e.target.value });
                                            if (formErrors.degree) setFormErrors({ ...formErrors, degree: null });
                                        }}
                                        placeholder="Degree Title *"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.degree ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.degree && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.degree[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={eduForm.institution}
                                        onChange={(e) => {
                                            setEduForm({ ...eduForm, institution: e.target.value });
                                            if (formErrors.institution) setFormErrors({ ...formErrors, institution: null });
                                        }}
                                        placeholder="Institution *"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.institution ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.institution && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.institution[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="field"
                                        value={eduForm.field}
                                        onChange={(e) => {
                                            setEduForm({ ...eduForm, field: e.target.value });
                                            if (formErrors.field) setFormErrors({ ...formErrors, field: null });
                                        }}
                                        placeholder="Field of Study"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.field ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.field && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.field[0]}
                                        </p>
                                    )}
                                </div>

                                <div className={`grid grid-cols-1 ${eduForm.is_current ? "" : "sm:grid-cols-2"} gap-4`}>
                                    <div>
                                        <DatePickerInput
                                            name="start_date"
                                            value={eduForm.start_date}
                                            placeholder="Start Date *"
                                            onChange={(e) => {
                                                setEduForm({ ...eduForm, start_date: e.target.value });
                                                if (formErrors.start_date) setFormErrors({ ...formErrors, start_date: null });
                                            }}
                                        />
                                        {formErrors.start_date && (
                                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                                {formErrors.start_date[0]}
                                            </p>
                                        )}
                                    </div>

                                    {!eduForm.is_current && (
                                        <div>
                                            <DatePickerInput
                                                name="end_date"
                                                value={eduForm.end_date}
                                                alignRight={true}
                                                placeholder="End Date"
                                                onChange={(e) => {
                                                    setEduForm({ ...eduForm, end_date: e.target.value });
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
                                        checked={eduForm.is_current}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setEduForm({
                                                ...eduForm,
                                                is_current: isChecked,
                                                end_date: isChecked ? "" : eduForm.end_date,
                                            });
                                            if (isChecked) {
                                                setSelectedDegreeFile(null);
                                                setDegreeImagePreview(null);
                                            }
                                        }}
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-[#18191C]">
                                        I am currently studying here
                                    </span>
                                </label>

                                {!eduForm.is_current && (
                                    <div>
                                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                            Degree / Transcript Document Image
                                        </label>
                                        <input
                                            type="file"
                                            ref={degreeImageInputRef}
                                            onChange={handleDegreeImageSelect}
                                            accept="image/*"
                                            className="hidden"
                                        />

                                        <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                                            <div className="h-32 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                                {degreeImagePreview ? (
                                                    <img
                                                        src={degreeImagePreview}
                                                        alt="Degree Document"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-center text-[#767E94] p-3">
                                                        <UploadCloud className="w-6 h-6 mx-auto mb-1 text-[#0A65CC]" />
                                                        <span className="text-xs font-medium text-[#18191C] block">
                                                            Upload Degree / Transcript Image
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-[#767E94]">Degree Image</span>
                                                <div className="flex items-center gap-3">
                                                    {degreeImagePreview && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedDegreeFile(null);
                                                                setDegreeImagePreview(null);
                                                            }}
                                                            className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => degreeImageInputRef.current?.click()}
                                                        className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                                    >
                                                        {degreeImagePreview ? "Replace" : "Browse Image"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {formErrors.degree_image && (
                                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                                {formErrors.degree_image[0]}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={() => setIsEduModalOpen(false)}
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
                                        <span>{editingEduId ? "Update Education" : "Save Education"}</span>
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
                onConfirm={confirmDeleteEdu}
                isDeleting={isDeleting}
                title="Delete Education Record"
                message="Are you sure you want to delete this education record? This action cannot be undone."
            />
        </div>
    );
}
