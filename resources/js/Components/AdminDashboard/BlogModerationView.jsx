import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentTextIcon,
    PlusIcon,
    EyeIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function BlogModerationView() {
    const [filterTab, setFilterTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // New Blog Form state
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("Graphics & Design");
    const [newAuthor, setNewAuthor] = useState("Editorial Team");
    const [newContent, setNewContent] = useState("");

    const [blogsList, setBlogsList] = useState([
        {
            id: 1,
            title: "20 cool fonts for web and graphic design",
            author: "Kevin Gilbert",
            category: "Graphics & Design",
            date: "Nov 12, 2021",
            status: "Pending Approval",
            image: null,
        },
        {
            id: 2,
            title: "Great Software Engineer Resume Examples that Work in 2026",
            author: "Sarah Jenkins",
            category: "Code & Programming",
            date: "Jul 28, 2026",
            status: "Published",
            image: null,
        },
        {
            id: 3,
            title: "How to Ace Your Tech Interview with Confidence and Style",
            author: "Alex Morgan",
            category: "Career Guidance",
            date: "Jul 22, 2026",
            status: "Published",
            image: null,
        },
        {
            id: 4,
            title: "Top 10 High Paying Remote Careers Across Tech and Finance",
            author: "David Chen",
            category: "Finance & Accounting",
            date: "Jul 18, 2026",
            status: "Pending Approval",
            image: null,
        },
    ]);

    const handleApproveBlog = (id) => {
        setBlogsList(
            blogsList.map((blog) =>
                blog.id === id ? { ...blog, status: "Published" } : blog
            )
        );
    };

    const handleDeleteBlog = (id) => {
        setBlogsList(blogsList.filter((blog) => blog.id !== id));
    };

    const handleCreateBlog = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        const newBlogItem = {
            id: Date.now(),
            title: newTitle,
            author: newAuthor || "Editorial Team",
            category: newCategory,
            date: "Just Now",
            status: "Published",
            image: null,
        };
        setBlogsList([newBlogItem, ...blogsList]);
        setNewTitle("");
        setNewContent("");
        setIsCreateModalOpen(false);
    };

    const filteredBlogs = blogsList.filter((blog) => {
        const matchesFilter =
            filterTab === "All" ||
            (filterTab === "Pending" && blog.status === "Pending Approval") ||
            (filterTab === "Published" && blog.status === "Published");

        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
            {/* Header Title & Create Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E4E5E8]">
                <div>
                    <h2 className="text-lg font-bold text-[#18191C]">
                        Blog Moderation & Article Publishing
                    </h2>
                    <p className="text-xs text-[#767E94] mt-0.5">
                        Review submitted articles, publish community posts, or write fresh platform blogs.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Publish New Blog</span>
                </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Tabs */}
                <div className="flex items-center gap-2">
                    {["All", "Pending", "Published"].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setFilterTab(tab)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                filterTab === tab
                                    ? "bg-[#0A65CC] text-white shadow-2xs"
                                    : "bg-[#F8F9FA] text-[#5E6670] hover:bg-gray-100"
                            }`}
                        >
                            {tab}
                            {tab === "Pending" && (
                                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-[#E05151] text-white rounded-full font-bold">
                                    {
                                        blogsList.filter(
                                            (b) => b.status === "Pending Approval"
                                        ).length
                                    }
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <MagnifyingGlassIcon className="w-4 h-4 text-[#767E94] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search blog title or category..."
                        className="w-full h-10 pl-9 pr-3 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC]"
                    />
                </div>
            </div>

            {/* Blogs Table */}
            <div className="overflow-x-auto border border-[#E4E5E8] rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8F9FA] border-b border-[#E4E5E8] text-[11px] font-bold text-[#767E94] uppercase tracking-wider">
                            <th className="py-3.5 px-4">Article Title</th>
                            <th className="py-3.5 px-4">Author</th>
                            <th className="py-3.5 px-4">Category</th>
                            <th className="py-3.5 px-4">Date</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E5E8] text-xs text-[#18191C]">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-[#F8F9FA]/60 transition-colors">
                                    {/* Blog Title & Image Slot */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            {/* Image Container Slot fitting 100% backend image */}
                                            <div className="w-12 h-12 rounded-lg bg-[#F1F2F4] border border-[#E4E5E8] overflow-hidden flex items-center justify-center shrink-0">
                                                {blog.image ? (
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <DocumentTextIcon className="w-5 h-5 text-[#0A65CC]" />
                                                )}
                                            </div>
                                            <span className="font-bold text-[#18191C] line-clamp-2 max-w-sm">
                                                {blog.title}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Author */}
                                    <td className="py-4 px-4 text-[#5E6670] font-medium">
                                        {blog.author}
                                    </td>

                                    {/* Category */}
                                    <td className="py-4 px-4">
                                        <span className="px-2.5 py-1 bg-[#F0F5FC] text-[#0A65CC] text-[11px] font-semibold rounded-md border border-[#CEE0F5]">
                                            {blog.category}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="py-4 px-4 text-[#5E6670]">
                                        {blog.date}
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-4">
                                        {blog.status === "Published" ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7F6EA] text-[#0BA02C] text-[11px] font-semibold rounded-full">
                                                <CheckCircleIcon className="w-3.5 h-3.5" /> Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF5E6] text-[#F7A531] text-[11px] font-semibold rounded-full">
                                                Pending Review
                                            </span>
                                        )}
                                    </td>

                                    {/* One-Click Action Controls */}
                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            {blog.status !== "Published" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleApproveBlog(blog.id)}
                                                    className="px-3 py-1.5 bg-[#0BA02C] text-white text-[11px] font-semibold rounded-md hover:bg-[#098223] transition-colors cursor-pointer"
                                                >
                                                    Approve & Publish
                                                </button>
                                            )}
                                            <a
                                                href="/blog/1"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 text-[#0A65CC] hover:bg-[#E8F1FF] rounded-md transition-colors"
                                                title="Preview Article"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteBlog(blog.id)}
                                                className="p-1.5 text-[#E05151] hover:bg-[#FDF0F0] rounded-md transition-colors cursor-pointer"
                                                title="Delete Blog"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-[#767E94]">
                                    No blogs match your filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create New Blog Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                        onClick={() => setIsCreateModalOpen(false)}
                    />
                    <div className="relative bg-white rounded-2xl border border-[#E4E5E8] shadow-2xl w-full max-w-xl p-6 z-50">
                        <h3 className="text-lg font-bold text-[#18191C] mb-1">
                            Publish New Admin Blog Post
                        </h3>
                        <p className="text-xs text-[#767E94] mb-5">
                            Write and publish a new official article to the platform blog stream.
                        </p>

                        <form onSubmit={handleCreateBlog} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#18191C] mb-1">
                                    Blog Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Enter compelling article title..."
                                    className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                                    >
                                        <option value="Graphics & Design">Graphics & Design</option>
                                        <option value="Code & Programming">Code & Programming</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Finance & Accounting">Finance & Accounting</option>
                                        <option value="Career Guidance">Career Guidance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1">
                                        Author Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newAuthor}
                                        onChange={(e) => setNewAuthor(e.target.value)}
                                        placeholder="Editorial Team"
                                        className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#18191C] mb-1">
                                    Article Body Content
                                </label>
                                <textarea
                                    rows={5}
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Write full blog article body content here..."
                                    className="w-full p-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2.5 bg-white border border-[#E4E5E8] text-xs font-semibold text-[#5E6670] rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                                >
                                    Publish Article Immediately
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
