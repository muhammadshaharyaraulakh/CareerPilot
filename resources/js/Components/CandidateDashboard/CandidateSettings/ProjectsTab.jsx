import React, { useState, useRef, useEffect } from "react";
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
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/Components/Toast";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function ProjectsTab() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    // Delete confirmation state
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Project Modal state
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const thumbnailInputRef = useRef(null);
    const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: "",
        description: "",
        project_url: "",
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

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/projects", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setProjects(json.data);
            }
        } catch (err) {
            console.error("Failed to fetch projects:", err);
            showToast("Failed to load projects", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenAddProject = () => {
        setEditingProjectId(null);
        setProjectForm({
            title: "",
            description: "",
            project_url: "",
            start_date: "",
            end_date: "",
            is_current: false,
        });
        setSelectedThumbnailFile(null);
        setThumbnailPreview(null);
        setFormErrors({});
        setIsProjectModalOpen(true);
    };

    const handleOpenEditProject = (item) => {
        setEditingProjectId(item.id);
        setProjectForm({
            title: item.title || "",
            description: item.description || "",
            project_url: item.project_url || "",
            start_date: item.start_date || "",
            end_date: item.end_date || "",
            is_current: Boolean(item.is_current),
        });
        setSelectedThumbnailFile(null);
        setThumbnailPreview(item.thumbnail || null);
        setFormErrors({});
        setIsProjectModalOpen(true);
    };

    const handleThumbnailSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveProjectSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", projectForm.title || "");
        formData.append("description", projectForm.description || "");
        formData.append("project_url", projectForm.project_url || "");
        if (projectForm.start_date) formData.append("start_date", projectForm.start_date);
        if (projectForm.end_date && !projectForm.is_current) formData.append("end_date", projectForm.end_date);
        formData.append("is_current", projectForm.is_current ? "1" : "0");
        if (selectedThumbnailFile && !projectForm.is_current) {
            formData.append("thumbnail", selectedThumbnailFile);
        }

        const url = editingProjectId
            ? `/candidate/projects/${editingProjectId}`
            : "/candidate/projects";

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
                        (editingProjectId
                            ? "Project updated successfully!"
                            : "Project added successfully!"),
                    "success"
                );
                setIsProjectModalOpen(false);
                fetchProjects();
            } else {
                showToast(json.message || json.error || "Failed to save project", "error");
            }
        } catch (err) {
            console.error("Save project error:", err);
            showToast("Server exception while saving project", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePromptDeleteProject = (id) => {
        setDeleteTargetId(id);
    };

    const confirmDeleteProject = async () => {
        if (!deleteTargetId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/candidate/projects/${deleteTargetId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
            });

            const json = await res.json();
            if (json.success) {
                showToast("Project deleted successfully!", "success");
                setProjects((prev) => prev.filter((item) => item.id !== deleteTargetId));
                setDeleteTargetId(null);
            } else {
                showToast(json.message || json.error || "Failed to delete project", "error");
            }
        } catch (err) {
            console.error("Delete project error:", err);
            showToast("Server exception while deleting project", "error");
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
            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading projects...</p>
                </div>
            ) : projects.length === 0 ? (
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
                                        onClick={() => handlePromptDeleteProject(item.id)}
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

                            <form onSubmit={handleSaveProjectSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto pb-36">
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={projectForm.title}
                                        onChange={(e) => {
                                            setProjectForm({ ...projectForm, title: e.target.value });
                                            if (formErrors.title) setFormErrors({ ...formErrors, title: null });
                                        }}
                                        placeholder="Project Title *"
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
                                        name="project_url"
                                        value={projectForm.project_url}
                                        onChange={(e) => {
                                            setProjectForm({ ...projectForm, project_url: e.target.value });
                                            if (formErrors.project_url) setFormErrors({ ...formErrors, project_url: null });
                                        }}
                                        placeholder="Project Link"
                                        className={`w-full h-12 px-4 text-sm bg-white border ${
                                            formErrors.project_url ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.project_url && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.project_url[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <textarea
                                        rows={3}
                                        name="description"
                                        value={projectForm.description}
                                        onChange={(e) => {
                                            setProjectForm({ ...projectForm, description: e.target.value });
                                            if (formErrors.description) setFormErrors({ ...formErrors, description: null });
                                        }}
                                        placeholder="Description"
                                        className={`w-full p-3 text-sm bg-white border ${
                                            formErrors.description ? "border-[#E05151]" : "border-[#E4E5E8]"
                                        } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                                    />
                                    {formErrors.description && (
                                        <p className="text-xs text-[#E05151] mt-1 font-medium">
                                            {formErrors.description[0]}
                                        </p>
                                    )}
                                </div>

                                <div className={`grid grid-cols-1 ${projectForm.is_current ? "" : "sm:grid-cols-2"} gap-4`}>
                                    <div>
                                        <DatePickerInput
                                            name="start_date"
                                            value={projectForm.start_date}
                                            placeholder="Start Date"
                                            onChange={(e) => {
                                                setProjectForm({ ...projectForm, start_date: e.target.value });
                                                if (formErrors.start_date) setFormErrors({ ...formErrors, start_date: null });
                                            }}
                                        />
                                        {formErrors.start_date && (
                                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                                {formErrors.start_date[0]}
                                            </p>
                                        )}
                                    </div>

                                    {!projectForm.is_current && (
                                        <div>
                                            <DatePickerInput
                                                name="end_date"
                                                value={projectForm.end_date}
                                                alignRight={true}
                                                placeholder="End Date"
                                                onChange={(e) => {
                                                    setProjectForm({ ...projectForm, end_date: e.target.value });
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
                                        checked={projectForm.is_current}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setProjectForm({
                                                ...projectForm,
                                                is_current: isChecked,
                                                end_date: isChecked ? "" : projectForm.end_date,
                                            });
                                            if (isChecked) {
                                                setSelectedThumbnailFile(null);
                                                setThumbnailPreview(null);
                                            }
                                        }}
                                        className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-[#18191C]">
                                        I am currently working on this project
                                    </span>
                                </label>

                                {!projectForm.is_current && (
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
                                                        alt="Project Thumbnail"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-center text-[#767E94] p-3">
                                                        <UploadCloud className="w-6 h-6 mx-auto mb-1 text-[#0A65CC]" />
                                                        <span className="text-xs font-medium text-[#18191C] block">
                                                            Upload Thumbnail Image
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
                                                            onClick={() => {
                                                                setSelectedThumbnailFile(null);
                                                                setThumbnailPreview(null);
                                                            }}
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
                                                        {thumbnailPreview ? "Replace" : "Browse Image"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {formErrors.thumbnail && (
                                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                                {formErrors.thumbnail[0]}
                                            </p>
                                        )}
                                    </div>
                                )}

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
                                        disabled={isSubmitting}
                                        className="px-6 h-12 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-sm rounded-none border-none shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>{editingProjectId ? "Update Project" : "Save Project"}</span>
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
                onConfirm={confirmDeleteProject}
                isDeleting={isDeleting}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </div>
    );
}
