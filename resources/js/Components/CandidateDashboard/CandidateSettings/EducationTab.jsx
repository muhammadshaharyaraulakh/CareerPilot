import React, { useState, useRef } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EducationTab() {
    // Education state
    const [educations, setEducations] = useState([
        {
            id: 1,
            degree: "Bachelor of Science",
            institution: "National University of Sciences & Technology (NUST)",
            field: "Computer Science & Engineering",
            start_date: "2018-09-01",
            end_date: "2022-06-30",
            is_current: false,
            degree_image:
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80",
        },
        {
            id: 2,
            degree: "Master of Information Technology",
            institution: "FAST-NUCES Islamabad",
            field: "Software Engineering & Interactive Media",
            start_date: "2022-09-01",
            end_date: "",
            is_current: true,
            degree_image: null,
        },
    ]);

    // Education modal state
    const [isEduModalOpen, setIsEduModalOpen] = useState(false);
    const [editingEduId, setEditingEduId] = useState(null);
    const degreeImageInputRef = useRef(null);
    const [degreeImagePreview, setDegreeImagePreview] = useState(null);
    const [eduForm, setEduForm] = useState({
        degree: "",
        institution: "",
        field: "",
        start_date: "",
        end_date: "",
        is_current: false,
    });
    const [showEduSuccess, setShowEduSuccess] = useState(false);

    // Handlers
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
        setDegreeImagePreview(null);
        setIsEduModalOpen(true);
    };

    const handleOpenEditEdu = (item) => {
        setEditingEduId(item.id);
        setEduForm({
            degree: item.degree,
            institution: item.institution,
            field: item.field || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
            is_current: item.is_current || false,
        });
        setDegreeImagePreview(item.degree_image || null);
        setIsEduModalOpen(true);
    };

    const handleDegreeImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setDegreeImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveEduSubmit = (e) => {
        e.preventDefault();
        if (!eduForm.degree.trim() || !eduForm.institution.trim()) return;

        if (editingEduId) {
            setEducations((prev) =>
                prev.map((item) =>
                    item.id === editingEduId
                        ? { ...item, ...eduForm, degree_image: degreeImagePreview }
                        : item
                )
            );
        } else {
            const newEdu = {
                id: Date.now(),
                ...eduForm,
                degree_image: degreeImagePreview,
            };
            setEducations((prev) => [newEdu, ...prev]);
        }

        setIsEduModalOpen(false);
        setShowEduSuccess(true);
        setTimeout(() => setShowEduSuccess(false), 3000);
    };

    const handleDeleteEdu = (id) => {
        setEducations((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {showEduSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Education qualifications updated successfully!</span>
                </div>
            )}

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
            {educations.length === 0 ? (
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
                                            {item.degree}
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

                                    {item.field && (
                                        <p className="text-xs text-[#767E94]">
                                            <span className="font-medium text-[#18191C]">Field:</span>{" "}
                                            {item.field}
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
                                    onClick={() => handleDeleteEdu(item.id)}
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

                            <form onSubmit={handleSaveEduSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Degree / Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={eduForm.degree}
                                        onChange={(e) =>
                                            setEduForm({ ...eduForm, degree: e.target.value })
                                        }
                                        placeholder="e.g. Bachelor of Science"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Institution / University *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={eduForm.institution}
                                        onChange={(e) =>
                                            setEduForm({ ...eduForm, institution: e.target.value })
                                        }
                                        placeholder="e.g. NUST University"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Field of Study
                                    </label>
                                    <input
                                        type="text"
                                        value={eduForm.field}
                                        onChange={(e) =>
                                            setEduForm({ ...eduForm, field: e.target.value })
                                        }
                                        placeholder="e.g. Computer Science"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={eduForm.start_date}
                                            onChange={(e) =>
                                                setEduForm({ ...eduForm, start_date: e.target.value })
                                            }
                                            className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C]"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            disabled={eduForm.is_current}
                                            value={eduForm.is_current ? "" : eduForm.end_date}
                                            onChange={(e) =>
                                                setEduForm({ ...eduForm, end_date: e.target.value })
                                            }
                                            className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C] disabled:bg-[#F8F9FA] disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer pt-1">
                                    <input
                                        type="checkbox"
                                        checked={eduForm.is_current}
                                        onChange={(e) =>
                                            setEduForm({ ...eduForm, is_current: e.target.checked })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-[#18191C]">
                                        Currently studying here
                                    </span>
                                </label>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Degree Certificate / Image
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
                                                    alt="Degree Image"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center text-[#767E94] p-3">
                                                    <UploadCloud className="w-6 h-6 mx-auto mb-1 text-[#0A65CC]" />
                                                    <span className="text-xs font-medium text-[#18191C] block">
                                                        Upload Degree Image
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
                                                        onClick={() => setDegreeImagePreview(null)}
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
                                </div>

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
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                                    >
                                        {editingEduId ? "Update Education" : "Save Education"}
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
