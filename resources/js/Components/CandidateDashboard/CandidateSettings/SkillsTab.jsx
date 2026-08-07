import React, { useState, useEffect } from "react";
import {
    Wrench,
    Plus,
    Edit2,
    Trash2,
    Check,
    X,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/Components/Toast";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function SkillsTab() {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Delete confirmation state
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Skill modal state
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [skillForm, setSkillForm] = useState({
        name: "",
        proficiency_level: "Intermediate",
    });
    const [formErrors, setFormErrors] = useState({});

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
    };

    const showToast = (text, type = "success", duration = 3000) => {
        setToast({ text, type, duration });
    };

    const fetchSkills = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/skills", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setSkills(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch skills:", err);
            showToast("Failed to load skills", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleOpenAddSkill = () => {
        setEditingSkillId(null);
        setSkillForm({
            name: "",
            proficiency_level: "Intermediate",
        });
        setFormErrors({});
        setIsSkillModalOpen(true);
    };

    const handleOpenEditSkill = (item) => {
        setEditingSkillId(item.id);
        const currentProficiency =
            item.pivot?.proficiency_level || item.proficiency_level || item.proficiency || "Intermediate";
        setSkillForm({
            name: item.name || "",
            proficiency_level: currentProficiency,
        });
        setFormErrors({});
        setIsSkillModalOpen(true);
    };

    const handleSaveSkillSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setIsSubmitting(true);

        const payload = editingSkillId
            ? { proficiency_level: skillForm.proficiency_level }
            : {
                  name: skillForm.name,
                  proficiency_level: skillForm.proficiency_level,
              };

        const url = editingSkillId
            ? `/candidate/skills/${editingSkillId}`
            : "/candidate/skills";

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
                        (editingSkillId
                            ? "Skill updated successfully!"
                            : "Skill added successfully!"),
                    "success"
                );
                setIsSkillModalOpen(false);
                fetchSkills();
            } else {
                showToast(json.message || json.error || "Failed to save skill", "error");
            }
        } catch (err) {
            console.error("Save skill error:", err);
            showToast("Server exception while saving skill", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePromptDeleteSkill = (id) => {
        setDeleteTargetId(id);
    };

    const confirmDeleteSkill = async () => {
        if (!deleteTargetId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/candidate/skills/${deleteTargetId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                showToast("Skill removed successfully!", "success");
                setSkills((prev) => prev.filter((item) => item.id !== deleteTargetId));
                setDeleteTargetId(null);
            } else {
                showToast(json.message || json.error || "Failed to remove skill", "error");
            }
        } catch (err) {
            console.error("Delete skill error:", err);
            showToast("Server exception while removing skill", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    const getProficiencyBadgeClass = (level) => {
        switch (level) {
            case "Beginner":
                return "bg-[#F1F2F4] text-[#5E6670] border-[#E4E5E8]";
            case "Intermediate":
                return "bg-[#E8F1FF] text-[#0A65CC] border-[#0A65CC]/30";
            case "Expert":
                return "bg-[#FFF6E6] text-[#E08A00] border-[#E08A00]/30";
            default:
                return "bg-[#E8F1FF] text-[#0A65CC] border-[#0A65CC]/30";
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <Toast toast={toast} onClose={() => setToast(null)} />

            <div className="flex items-center justify-between pb-2 border-b border-[#E4E5E8]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none">
                        <Wrench className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Skills & Proficiencies
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Add technical skills, tools, and expertise levels to highlight on your candidate profile
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddSkill}
                    className="px-4 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 cursor-pointer transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                </button>
            </div>

            {/* Flat Skills List */}
            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading skills...</p>
                </div>
            ) : skills.length === 0 ? (
                <div className="p-8 border border-dashed border-[#E4E5E8] bg-[#F8F9FA] text-center space-y-3">
                    <Wrench className="w-12 h-12 text-[#9199A3] mx-auto" />
                    <h4 className="text-sm font-bold text-[#18191C]">
                        No Skills Added
                    </h4>
                    <p className="text-xs text-[#767E94] max-w-md mx-auto">
                        Add key skills and proficiency levels to improve candidate searching and matching score.
                    </p>
                    <button
                        type="button"
                        onClick={handleOpenAddSkill}
                        className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                    >
                        Add Skill
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {skills.map((item) => {
                        const level =
                            item.pivot?.proficiency_level ||
                            item.proficiency_level ||
                            item.proficiency ||
                            "Intermediate";

                        return (
                            <div
                                key={item.id}
                                className="p-3.5 border border-[#E4E5E8] bg-white rounded-none hover:border-[#0A65CC]/40 transition-all flex items-center justify-between gap-2"
                            >
                                <div className="space-y-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#18191C] truncate">
                                        {item.name}
                                    </h4>
                                    <span
                                        className={`inline-block px-2 py-0.5 text-[11px] font-semibold border rounded-none ${getProficiencyBadgeClass(
                                            level
                                        )}`}
                                    >
                                        {level}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEditSkill(item)}
                                        className="p-1.5 text-[#767E94] hover:text-[#0A65CC] hover:bg-[#F1F2F4] transition-colors cursor-pointer"
                                        title="Edit Skill"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePromptDeleteSkill(item.id)}
                                        className="p-1.5 text-[#767E94] hover:text-[#E05151] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
                                        title="Delete Skill"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ADD/EDIT SKILL MODAL */}
            <AnimatePresence>
                {isSkillModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSkillModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                        >
                            <div className="p-5 border-b border-[#E4E5E8] flex items-center justify-between bg-[#F8F9FA]">
                                <div className="flex items-center gap-2.5">
                                    <Wrench className="w-5 h-5 text-[#0A65CC]" />
                                    <h3 className="text-base font-bold text-[#18191C]">
                                        {editingSkillId ? "Edit Skill" : "Add Skill"}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsSkillModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveSkillSubmit} className="p-6 space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        disabled={Boolean(editingSkillId)}
                                        value={skillForm.name}
                                        onChange={(e) => {
                                            setSkillForm({ ...skillForm, name: e.target.value });
                                            if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                                        }}
                                        placeholder="Skill Name *"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.name ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8] disabled:bg-[#F8F9FA]`}
                                    />
                                    {formErrors.name && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.name[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <select
                                        name="proficiency_level"
                                        value={skillForm.proficiency_level}
                                        onChange={(e) => {
                                            setSkillForm({ ...skillForm, proficiency_level: e.target.value });
                                            if (formErrors.proficiency_level) setFormErrors({ ...formErrors, proficiency_level: null });
                                        }}
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.proficiency_level ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C]`}
                                    >
                                        <option value="" disabled>Proficiency Level *</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                    {formErrors.proficiency_level && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.proficiency_level[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={() => setIsSkillModalOpen(false)}
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
                                        <span>{editingSkillId ? "Update Skill" : "Save Skill"}</span>
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
                onConfirm={confirmDeleteSkill}
                isDeleting={isDeleting}
                title="Remove Skill"
                message="Are you sure you want to remove this skill? This action cannot be undone."
            />
        </div>
    );
}
