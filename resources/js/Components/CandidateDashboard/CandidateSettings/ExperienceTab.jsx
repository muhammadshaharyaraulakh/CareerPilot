import React, { useState, useRef } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceTab() {
    // Experience state
    const [experiences, setExperiences] = useState([
        {
            id: 1,
            title: "Senior Full Stack Engineer",
            company_name: "Techlogix Solutions",
            location: "Lahore, Pakistan",
            description:
                "Leading frontend architecture with React & Next.js and building high-scale Laravel API backends.",
            start_date: "2022-07-01",
            end_date: "",
            is_current: true,
            company_logo: null,
        },
        {
            id: 2,
            title: "Frontend Developer",
            company_name: "Systems Limited",
            location: "Islamabad, Pakistan",
            description:
                "Developed responsive web dashboards and optimized web performance across multiple enterprise applications.",
            start_date: "2020-03-01",
            end_date: "2022-06-30",
            is_current: false,
            company_logo: null,
        },
    ]);

    // Experience Modal state
    const [isExpModalOpen, setIsExpModalOpen] = useState(false);
    const [editingExpId, setEditingExpId] = useState(null);
    const companyLogoInputRef = useRef(null);
    const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
    const [expForm, setExpForm] = useState({
        title: "",
        company_name: "",
        location: "",
        description: "",
        start_date: "",
        end_date: "",
        is_current: false,
    });
    const [showExpSuccess, setShowExpSuccess] = useState(false);

    // Handlers
    const handleOpenAddExp = () => {
        setEditingExpId(null);
        setExpForm({
            title: "",
            company_name: "",
            location: "",
            description: "",
            start_date: "",
            end_date: "",
            is_current: false,
        });
        setCompanyLogoPreview(null);
        setIsExpModalOpen(true);
    };

    const handleOpenEditExp = (item) => {
        setEditingExpId(item.id);
        setExpForm({
            title: item.title,
            company_name: item.company_name,
            location: item.location || "",
            description: item.description || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
            is_current: item.is_current || false,
        });
        setCompanyLogoPreview(item.company_logo || null);
        setIsExpModalOpen(true);
    };

    const handleCompanyLogoSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setCompanyLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveExpSubmit = (e) => {
        e.preventDefault();
        if (!expForm.title.trim() || !expForm.company_name.trim()) return;

        if (editingExpId) {
            setExperiences((prev) =>
                prev.map((item) =>
                    item.id === editingExpId
                        ? { ...item, ...expForm, company_logo: companyLogoPreview }
                        : item
                )
            );
        } else {
            const newExp = {
                id: Date.now(),
                ...expForm,
                company_logo: companyLogoPreview,
            };
            setExperiences((prev) => [newExp, ...prev]);
        }

        setIsExpModalOpen(false);
        setShowExpSuccess(true);
        setTimeout(() => setShowExpSuccess(false), 3000);
    };

    const handleDeleteExp = (id) => {
        setExperiences((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {showExpSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Work experience records updated successfully!</span>
                </div>
            )}

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
            {experiences.length === 0 ? (
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
                                    {item.company_logo ? (
                                        <img
                                            src={item.company_logo}
                                            alt={item.company_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Building className="w-6 h-6 text-[#0A65CC]" />
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-sm font-bold text-[#18191C]">
                                            {item.title}
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

                                    {item.description && (
                                        <p className="text-xs text-[#5E6670] leading-relaxed pt-1">
                                            {item.description}
                                        </p>
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
                                    onClick={() => handleDeleteExp(item.id)}
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

                            <form onSubmit={handleSaveExpSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Job Title / Designation *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={expForm.title}
                                        onChange={(e) =>
                                            setExpForm({ ...expForm, title: e.target.value })
                                        }
                                        placeholder="e.g. Senior Software Engineer"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={expForm.company_name}
                                        onChange={(e) =>
                                            setExpForm({ ...expForm, company_name: e.target.value })
                                        }
                                        placeholder="e.g. Google Inc."
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={expForm.location}
                                        onChange={(e) =>
                                            setExpForm({ ...expForm, location: e.target.value })
                                        }
                                        placeholder="e.g. San Francisco, CA or Remote"
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
                                            value={expForm.start_date}
                                            onChange={(e) =>
                                                setExpForm({ ...expForm, start_date: e.target.value })
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
                                            disabled={expForm.is_current}
                                            value={expForm.is_current ? "" : expForm.end_date}
                                            onChange={(e) =>
                                                setExpForm({ ...expForm, end_date: e.target.value })
                                            }
                                            className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C] disabled:bg-[#F8F9FA] disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer pt-1">
                                    <input
                                        type="checkbox"
                                        checked={expForm.is_current}
                                        onChange={(e) =>
                                            setExpForm({ ...expForm, is_current: e.target.checked })
                                        }
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-[#18191C]">
                                        I currently work in this role
                                    </span>
                                </label>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Responsibilities & Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={expForm.description}
                                        onChange={(e) =>
                                            setExpForm({ ...expForm, description: e.target.value })
                                        }
                                        placeholder="Describe your key achievements, team leadership, or tech stack used..."
                                        className="w-full p-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8] resize-y"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Company Logo / Image
                                    </label>
                                    <input
                                        type="file"
                                        ref={companyLogoInputRef}
                                        onChange={handleCompanyLogoSelect}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                                        <div className="h-28 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                            {companyLogoPreview ? (
                                                <img
                                                    src={companyLogoPreview}
                                                    alt="Company Logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center text-[#767E94] p-3">
                                                    <UploadCloud className="w-6 h-6 mx-auto mb-1 text-[#0A65CC]" />
                                                    <span className="text-xs font-medium text-[#18191C] block">
                                                        Upload Logo
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-[#767E94]">Company Logo</span>
                                            <div className="flex items-center gap-3">
                                                {companyLogoPreview && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setCompanyLogoPreview(null)}
                                                        className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => companyLogoInputRef.current?.click()}
                                                    className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                                >
                                                    {companyLogoPreview ? "Replace" : "Browse Logo"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                                    >
                                        {editingExpId ? "Update Experience" : "Save Experience"}
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
