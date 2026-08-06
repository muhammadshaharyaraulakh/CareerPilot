import React, { useState } from "react";
import {
    Wrench,
    Plus,
    Edit2,
    Trash2,
    Check,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsTab() {
    // Skills state with simple proficiency badges
    const [skills, setSkills] = useState([
        { id: 1, name: "React.js", proficiency: "Expert" },
        { id: 2, name: "Laravel", proficiency: "Advanced" },
        { id: 3, name: "Tailwind CSS", proficiency: "Expert" },
        { id: 4, name: "TypeScript", proficiency: "Intermediate" },
        { id: 5, name: "Node.js / Express", proficiency: "Intermediate" },
        { id: 6, name: "MySQL", proficiency: "Advanced" },
        { id: 7, name: "Git & GitHub", proficiency: "Expert" },
        { id: 8, name: "REST APIs", proficiency: "Master" },
    ]);

    // Skill modal state
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [skillForm, setSkillForm] = useState({
        name: "",
        proficiency: "Intermediate",
    });
    const [showSkillSuccess, setShowSkillSuccess] = useState(false);

    // Handlers
    const handleOpenAddSkill = () => {
        setEditingSkillId(null);
        setSkillForm({
            name: "",
            proficiency: "Intermediate",
        });
        setIsSkillModalOpen(true);
    };

    const handleOpenEditSkill = (item) => {
        setEditingSkillId(item.id);
        setSkillForm({
            name: item.name,
            proficiency: item.proficiency || "Intermediate",
        });
        setIsSkillModalOpen(true);
    };

    const handleSaveSkillSubmit = (e) => {
        e.preventDefault();
        if (!skillForm.name.trim()) return;

        if (editingSkillId) {
            setSkills((prev) =>
                prev.map((item) =>
                    item.id === editingSkillId ? { ...item, ...skillForm } : item
                )
            );
        } else {
            const newSkill = {
                id: Date.now(),
                ...skillForm,
            };
            setSkills((prev) => [...prev, newSkill]);
        }

        setIsSkillModalOpen(false);
        setShowSkillSuccess(true);
        setTimeout(() => setShowSkillSuccess(false), 3000);
    };

    const handleDeleteSkill = (id) => {
        setSkills((prev) => prev.filter((item) => item.id !== id));
    };

    const getProficiencyBadgeClass = (level) => {
        switch (level) {
            case "Beginner":
                return "bg-[#F1F2F4] text-[#5E6670] border-[#E4E5E8]";
            case "Intermediate":
                return "bg-[#E8F1FF] text-[#0A65CC] border-[#0A65CC]/30";
            case "Advanced":
                return "bg-[#EAF6ED] text-[#0BA02C] border-[#0BA02C]/30";
            case "Expert":
                return "bg-[#FFF6E6] text-[#E08A00] border-[#E08A00]/30";
            case "Master":
                return "bg-[#F3E8FF] text-[#7E22CE] border-[#7E22CE]/30";
            default:
                return "bg-[#E8F1FF] text-[#0A65CC] border-[#0A65CC]/30";
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {showSkillSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Skills updated successfully!</span>
                </div>
            )}

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
            {skills.length === 0 ? (
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
                    {skills.map((item) => (
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
                                        item.proficiency
                                    )}`}
                                >
                                    {item.proficiency}
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
                                    onClick={() => handleDeleteSkill(item.id)}
                                    className="p-1.5 text-[#767E94] hover:text-[#E05151] hover:bg-[#FFF0F0] transition-colors cursor-pointer"
                                    title="Delete Skill"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
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
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Skill Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={skillForm.name}
                                        onChange={(e) =>
                                            setSkillForm({ ...skillForm, name: e.target.value })
                                        }
                                        placeholder="e.g. React.js, Python, Figma"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Proficiency Level *
                                    </label>
                                    <select
                                        value={skillForm.proficiency}
                                        onChange={(e) =>
                                            setSkillForm({ ...skillForm, proficiency: e.target.value })
                                        }
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C] font-medium cursor-pointer"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                        <option value="Master">Master</option>
                                    </select>
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
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                                    >
                                        {editingSkillId ? "Update Skill" : "Save Skill"}
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
