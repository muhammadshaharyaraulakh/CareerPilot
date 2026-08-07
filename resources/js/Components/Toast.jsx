import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Info, X } from "lucide-react";

/**
 * Reusable Global Toast Notification Component
 * 
 * @param {Object} props
 * @param {Object|null} props.toast - Toast state object e.g. { text: 'Message', type: 'success'|'error'|'info', duration: 2000 }
 * @param {Function} props.onClose - Callback function triggered when toast is dismissed or timer expires
 */
export default function Toast({ toast, onClose }) {
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, toast.duration || 2000);

        return () => clearTimeout(timer);
    }, [toast, onClose]);

    if (!toast) return null;

    const isSuccess = toast.type === "success";
    const isError = toast.type === "error";

    return (
        <AnimatePresence>
            {toast && (
                <div className="fixed top-5 right-5 z-50 pointer-events-auto max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 border shadow-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold rounded-none backdrop-blur-xs ${
                            isSuccess
                                ? "bg-[#EAF6ED] border-[#0BA02C]/40 text-[#0BA02C]"
                                : isError
                                ? "bg-[#FDF2F2] border-[#E05151]/40 text-[#E05151]"
                                : "bg-[#EBF3FC] border-[#0A65CC]/40 text-[#0A65CC]"
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            {isSuccess && <Check className="w-5 h-5 shrink-0 text-[#0BA02C]" />}
                            {isError && <AlertCircle className="w-5 h-5 shrink-0 text-[#E05151]" />}
                            {!isSuccess && !isError && <Info className="w-5 h-5 shrink-0 text-[#0A65CC]" />}
                            <span>{toast.text}</span>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
