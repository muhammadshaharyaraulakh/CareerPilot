import React, { useState, useRef } from "react";
import {
    FolderGit2,
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

export default function ProjectsTab() {
    // Projects state
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "CareerPilot - Job Finder & AI Recruiter Platform",
            description:
                "Built a comprehensive job discovery platform with interactive candidate dashboard, resume builder, and AI skill mapping.",
            project_url: "https://github.com/example/careerpilot",
            start_date: "2024-01-15",
            end_date: "2024-06-30",
            thumbnail:
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80",
        },
        {
            id: 2,
            title: "MarketMind AI - Marketing Analytics Hub",
            description:
                "Real-time social media performance tracker and automated report generation engine using Gemini AI.",
            project_url: "https://marketmind-demo.app",
            start_date: "2023-08-01",
            end_date: "2023-12-20",
            thumbnail:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80",
        },
    ]);

    // Project Modal state
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const thumbnailInputRef = useRef(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: "",
        description: "",
        project_url: "",
        start_date: "",
        end_date: "",
    });
    const [showProjectSuccess, setShowProjectSuccess] = useState(false);

    // Handlers
    const handleOpenAddProject = () => {
        setEditingProjectId(null);
        setProjectForm({
            title: "",
            description: "",
            project_url: "",
            start_date: "",
            end_date: "",
        });
        setThumbnailPreview(null);
        setIsProjectModalOpen(true);
    };

    const handleOpenEditProject = (item) => {
        setEditingProjectId(item.id);
        setProjectForm({
            title: item.title,
            description: item.description || "",
            project_url: item.project_url || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
        });
        setThumbnailPreview(item.thumbnail || null);
        setIsProjectModalOpen(true);
    };

    const handleThumbnailSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveProjectSubmit = (e) => {
        e.preventDefault();
        if (!projectForm.title.trim()) return;

        if (editingProjectId) {
            setProjects((prev) =>
                prev.map((item) =>
                    item.id === editingProjectId
                        ? { ...item, ...projectForm, thumbnail: thumbnailPreview }
                        : item
                )
            );
        } else {
            const newProject = {
                id: Date.now(),
                ...projectForm,
                thumbnail: thumbnailPreview,
            };
            setProjects((prev) => [newProject, ...prev]);
        }

        setIsProjectModalOpen(false);
        setShowProjectSuccess(true);
        setTimeout(() => setShowProjectSuccess(false), 3000);
    };

    const handleDeleteProject = (id) => {
        setProjects((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {showProjectSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Projects portfolio updated successfully!</span>
                </div>
            )}

            <div className="flex items-center justify-between pb-2 border-b border-[#E4E5E8]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none">
                        <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Projects Portfolio
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Showcase key projects, case studies, software applications, or open-source work
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddProject}
                    className="px-4 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none flex items-center gap-2 cursor-pointer transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </button>
            </div>

            {/* Saved Projects List */}
            {projects.length === 0 ? (
                <div className="p-8 border border-dashed border-[#E4E5E8] bg-[#F8F9FA] text-center space-y-3">
                    <FolderGit2 className="w-12 h-12 text-[#9199A3] mx-auto" />
                    <h4 className="text-sm font-bold text-[#18191C]">
                        No Projects Added Yet
                    </h4>
                    <p className="text-xs text-[#767E94] max-w-md mx-auto">
                        Displaying your real-world projects helps demonstrate practical skills and experience to employers.
                    </p>
                    <button
                        type="button"
                        onClick={handleOpenAddProject}
                        className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs rounded-none border-none cursor-pointer"
                    >
                        Add Project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((item) => (
                        <div
                            key={item.id}
                            className="border border-[#E4E5E8] bg-white rounded-none hover:border-[#0A65CC]/40 transition-all flex flex-col justify-between overflow-hidden"
                        >
                            {/* Project Thumbnail Header */}
                            {item.thumbnail ? (
                                <div className="h-40 w-full overflow-hidden border-b border-[#E4E5E8] bg-[#F8F9FA] relative group">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ) : (
                                <div className="h-28 w-full bg-[#F8F9FA] border-b border-[#E4E5E8] flex items-center justify-center text-[#9199A3]">
                                    <FolderGit2 className="w-10 h-10 text-[#0A65CC]/40" />
                                </div>
                            )}

                            {/* Body Content */}
                            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-[#18191C] leading-snug line-clamp-2">
                                        {item.title}
                                    </h4>

                                    {(item.start_date || item.end_date) && (
                                        <div className="flex items-center gap-1 text-[11px] text-[#9199A3]">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {item.start_date ? item.start_date : "Start"} —{" "}
                                                {item.end_date ? item.end_date : "Present"}
                                            </span>
                                        </div>
                                    )}

                                    {item.description && (
                                        <p className="text-xs text-[#5E6670] leading-relaxed line-clamp-3">
                                            {item.description}
                                        </p>
                                    )}

                                    {item.project_url && (
                                        <a
                                            href={item.project_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs text-[#0A65CC] font-semibold hover:underline pt-1"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>View Project Link</span>
                                        </a>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 pt-3 border-t border-[#E4E5E8] justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEditProject(item)}
                                        className="px-3 py-1.5 bg-[#F1F2F4] hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs rounded-none flex items-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Edit2 className="w-3.5 h-3.5 text-[#0A65CC]" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteProject(item.id)}
                                        className="px-3 py-1.5 bg-[#FFF0F0] hover:bg-[#FFE5E5] text-[#E05151] font-semibold text-xs rounded-none flex items-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD/EDIT PROJECT MODAL */}
            <AnimatePresence>
                {isProjectModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsProjectModalOpen(false)}
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
                                    <FolderGit2 className="w-5 h-5 text-[#0A65CC]" />
                                    <h3 className="text-base font-bold text-[#18191C]">
                                        {editingProjectId ? "Edit Project" : "Add Project"}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsProjectModalOpen(false)}
                                    className="p-1 text-[#767E94] hover:text-[#18191C] rounded-full hover:bg-[#E4E5E8] transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProjectSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={projectForm.title}
                                        onChange={(e) =>
                                            setProjectForm({ ...projectForm, title: e.target.value })
                                        }
                                        placeholder="e.g. E-Commerce Platform API"
                                        className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Project URL / Repository Link
                                    </label>
                                    <input
                                        type="url"
                                        value={projectForm.project_url}
                                        onChange={(e) =>
                                            setProjectForm({ ...projectForm, project_url: e.target.value })
                                        }
                                        placeholder="e.g. https://github.com/username/project"
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
                                            value={projectForm.start_date}
                                            onChange={(e) =>
                                                setProjectForm({ ...projectForm, start_date: e.target.value })
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
                                            value={projectForm.end_date}
                                            onChange={(e) =>
                                                setProjectForm({ ...projectForm, end_date: e.target.value })
                                            }
                                            className="w-full h-12 px-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors text-[#18191C]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Project Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={projectForm.description}
                                        onChange={(e) =>
                                            setProjectForm({ ...projectForm, description: e.target.value })
                                        }
                                        placeholder="Describe features, tech stack, and key highlights of this project..."
                                        className="w-full p-4 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8] resize-y"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#18191C] block mb-1">
                                        Project Cover / Thumbnail Image
                                    </label>
                                    <input
                                        type="file"
                                        ref={thumbnailInputRef}
                                        onChange={handleThumbnailSelect}
                                        accept="image/*"
                                        className="hidden"
                                    />

                                    <div className="border border-[#E4E5E8] rounded-none p-3 bg-white space-y-3">
                                        <div className="h-32 bg-[#F8F9FA] flex items-center justify-center overflow-hidden border border-[#E4E5E8] relative">
                                            {thumbnailPreview ? (
                                                <img
                                                    src={thumbnailPreview}
                                                    alt="Thumbnail Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center text-[#767E94] p-3">
                                                    <UploadCloud className="w-6 h-6 mx-auto mb-1 text-[#0A65CC]" />
                                                    <span className="text-xs font-medium text-[#18191C] block">
                                                        Upload Cover Thumbnail
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-[#767E94]">Thumbnail Image</span>
                                            <div className="flex items-center gap-3">
                                                {thumbnailPreview && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setThumbnailPreview(null)}
                                                        className="text-[#767E94] hover:text-[#E05151] font-semibold cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => thumbnailInputRef.current?.click()}
                                                    className="text-[#0A65CC] hover:underline font-semibold cursor-pointer"
                                                >
                                                    {thumbnailPreview ? "Replace" : "Browse Thumbnail"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4E5E8]">
                                    <button
                                        type="button"
                                        onClick={() => setIsProjectModalOpen(false)}
                                        className="px-6 h-12 bg-[#F1F2F4] text-[#18191C] hover:bg-[#E4E5E8] font-bold text-sm rounded-none border-none transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer"
                                    >
                                        {editingProjectId ? "Update Project" : "Save Project"}
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
