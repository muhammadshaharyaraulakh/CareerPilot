import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Item",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    isDeleting = false,
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden z-10 border border-[#E4E5E8]"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-5 border-b border-[#E4E5E8] bg-[#F8F9FA]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-none bg-[#FCE8E8] text-[#E05151] flex items-center justify-center">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-[#18191C]">
                                    {title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 text-[#767E94] hover:text-[#18191C] hover:bg-[#E4E5E8] transition-colors rounded-none cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-3">
                            <p className="text-sm text-[#474C54] leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#E4E5E8] bg-[#F8F9FA]">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isDeleting}
                                className="px-5 h-11 bg-white border border-[#E4E5E8] text-[#18191C] hover:bg-[#F1F2F4] font-semibold text-sm rounded-none transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="px-5 h-11 bg-[#E05151] hover:bg-[#C93B3B] text-white font-semibold text-sm rounded-none border-none transition-colors cursor-pointer flex items-center gap-2"
                            >
                                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
