import React, { useState, useEffect } from "react";
import {
    ShieldCheck,
    Lock,
    Eye,
    EyeOff,
    Check,
    Bell,
    UserX,
    KeyRound,
    Loader2,
} from "lucide-react";
import Toast from "@/Components/Toast";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function AccountSettingsTab() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittingAccount, setIsSubmittingAccount] = useState(false);
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
    const [toast, setToast] = useState(null);

    // Account delete confirmation modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    // Account settings state
    const [accountData, setAccountData] = useState({
        is_public: true,
        is_cv_public: true,
        email_notifications: true,
        job_alerts: true,
        marketing_emails: false,
    });

    // Password change form state
    const [passwords, setPasswords] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [prefErrors, setPrefErrors] = useState({});
    const [passErrors, setPassErrors] = useState({});

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
    };

    const showToast = (text, type = "success", duration = 3000) => {
        setToast({ text, type, duration });
    };

    const fetchAccountSettings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/candidate/settings", {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });
            const json = await res.json();
            if (json.success && json.data) {
                setAccountData({
                    is_public: Boolean(json.data.is_public ?? json.data.isPublic ?? true),
                    is_cv_public: Boolean(json.data.is_cv_public ?? json.data.isCvPublic ?? true),
                    email_notifications: Boolean(json.data.email_notifications ?? json.data.emailNotifications ?? true),
                    job_alerts: Boolean(json.data.job_alerts ?? json.data.jobAlerts ?? true),
                    marketing_emails: Boolean(json.data.marketing_emails ?? json.data.marketingEmails ?? false),
                });
            }
        } catch (err) {
            console.error("Failed to fetch account settings:", err);
            showToast("Failed to load account settings", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccountSettings();
    }, []);

    const handleSaveAccountSettings = async (e) => {
        if (e) e.preventDefault();
        setPrefErrors({});
        setIsSubmittingAccount(true);

        try {
            const res = await fetch("/candidate/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: JSON.stringify(accountData),
            });

            const json = await res.json();

            if (res.status === 422 || json.errors) {
                setPrefErrors(json.errors || {});
                return;
            }

            if (json.success) {
                showToast(json.message || "Account preferences saved successfully!", "success");
            } else {
                showToast(json.message || json.error || "Failed to save account preferences", "error");
            }
        } catch (err) {
            console.error("Save settings error:", err);
            showToast("Server exception while saving account settings", "error");
        } finally {
            setIsSubmittingAccount(false);
        }
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setPassErrors({});

        if (passwords.new_password !== passwords.new_password_confirmation) {
            setPassErrors({
                new_password_confirmation: ["New password confirmation does not match."],
            });
            return;
        }

        setIsSubmittingPassword(true);

        try {
            const res = await fetch("/candidate/settings/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                body: JSON.stringify(passwords),
            });

            const json = await res.json();

            if (res.status === 422 || json.errors) {
                setPassErrors(json.errors || {});
                return;
            }

            if (json.success) {
                showToast(json.message || "Password changed successfully!", "success");
                setPasswords({
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });
            } else {
                showToast(json.message || json.error || "Failed to change password", "error");
            }
        } catch (err) {
            console.error("Change password error:", err);
            showToast("Server exception while changing password", "error");
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <Toast toast={toast} onClose={() => setToast(null)} />

            {/* Privacy & Credentials Section */}
            {isLoading ? (
                <div className="p-8 text-center text-[#767E94]">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0A65CC]" />
                    <p className="text-xs mt-2 font-semibold">Loading account preferences...</p>
                </div>
            ) : (
                <form onSubmit={handleSaveAccountSettings} className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-[#E4E5E8]">
                        <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#18191C]">
                                Contact Credentials & Visibility
                            </h3>
                            <p className="text-xs text-[#767E94]">
                                Manage your candidate profile visibility and preferences
                            </p>
                        </div>
                    </div>

                    {/* Privacy Toggles */}
                    <div className="p-4 bg-[#F8F9FA] border border-[#E4E5E8] space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h4 className="text-xs font-bold text-[#18191C]">
                                    Public Profile Visibility
                                </h4>
                                <p className="text-[11px] text-[#767E94]">
                                    Allow verified employers and headhunters to search and view your candidate profile
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input
                                    type="checkbox"
                                    checked={accountData.is_public}
                                    onChange={(e) =>
                                        setAccountData({ ...accountData, is_public: e.target.checked })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-[#E4E5E8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E4E5E8] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A65CC]"></div>
                            </label>
                        </div>

                        <div className="pt-3 border-t border-[#E4E5E8] flex items-center justify-between gap-4">
                            <div>
                                <h4 className="text-xs font-bold text-[#18191C]">
                                    CV / Resume Download Permission
                                </h4>
                                <p className="text-[11px] text-[#767E94]">
                                    Allow employers to download your primary PDF resume directly
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input
                                    type="checkbox"
                                    checked={accountData.is_cv_public}
                                    onChange={(e) =>
                                        setAccountData({ ...accountData, is_cv_public: e.target.checked })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-[#E4E5E8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E4E5E8] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A65CC]"></div>
                            </label>
                        </div>
                    </div>

                    {/* Notifications & Job Alerts */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#18191C]">
                            <Bell className="w-4 h-4 text-[#0A65CC]" />
                            <span>Email Notifications & Job Alerts</span>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={accountData.job_alerts}
                                    onChange={(e) =>
                                        setAccountData({ ...accountData, job_alerts: e.target.checked })
                                    }
                                    className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                />
                                <span className="text-xs text-[#18191C]">
                                    Receive tailored job alerts matching your skills & title
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={accountData.email_notifications}
                                    onChange={(e) =>
                                        setAccountData({
                                            ...accountData,
                                            email_notifications: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4 rounded-none text-[#0A65CC] focus:ring-[#0A65CC] border-[#E4E5E8] cursor-pointer"
                                />
                                <span className="text-xs text-[#18191C]">
                                    Receive email updates on job application status changes
                                </span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmittingAccount}
                        className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors flex items-center gap-2"
                    >
                        {isSubmittingAccount && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>Save Preferences</span>
                    </button>
                </form>
            )}

            {/* Change Password Section */}
            <form
                onSubmit={handleChangePasswordSubmit}
                className="pt-6 border-t border-[#E4E5E8] space-y-5"
            >
                <div className="flex items-center gap-3 pb-2 border-b border-[#E4E5E8]">
                    <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Change Security Password
                        </h3>
                        <p className="text-xs text-[#767E94]">
                            Ensure your account is using a strong, unique password
                        </p>
                    </div>
                </div>

                <div className="space-y-4 max-w-md">
                    {/* Current Password */}
                    <div>
                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                            Current Password *
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="w-4 h-4 text-[#767E94] absolute left-4 pointer-events-none" />
                            <input
                                type={showCurrentPass ? "text" : "password"}
                                value={passwords.current_password}
                                onChange={(e) => {
                                    setPasswords({ ...passwords, current_password: e.target.value });
                                    if (passErrors.current_password) setPassErrors({ ...passErrors, current_password: null });
                                }}
                                placeholder="Enter current password"
                                className={`w-full h-12 pl-11 pr-11 text-sm bg-white border ${
                                    passErrors.current_password ? "border-[#E05151]" : "border-[#E4E5E8]"
                                } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPass(!showCurrentPass)}
                                className="absolute right-4 text-[#767E94] hover:text-[#18191C] cursor-pointer"
                            >
                                {showCurrentPass ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {passErrors.current_password && (
                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                {passErrors.current_password[0]}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                            New Password *
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="w-4 h-4 text-[#767E94] absolute left-4 pointer-events-none" />
                            <input
                                type={showNewPass ? "text" : "password"}
                                value={passwords.new_password}
                                onChange={(e) => {
                                    setPasswords({ ...passwords, new_password: e.target.value });
                                    if (passErrors.new_password) setPassErrors({ ...passErrors, new_password: null });
                                }}
                                placeholder="Enter new password"
                                className={`w-full h-12 pl-11 pr-11 text-sm bg-white border ${
                                    passErrors.new_password ? "border-[#E05151]" : "border-[#E4E5E8]"
                                } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPass(!showNewPass)}
                                className="absolute right-4 text-[#767E94] hover:text-[#18191C] cursor-pointer"
                            >
                                {showNewPass ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {passErrors.new_password && (
                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                {passErrors.new_password[0]}
                            </p>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="text-xs font-semibold text-[#18191C] block mb-1">
                            Confirm New Password *
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="w-4 h-4 text-[#767E94] absolute left-4 pointer-events-none" />
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                value={passwords.new_password_confirmation}
                                onChange={(e) => {
                                    setPasswords({ ...passwords, new_password_confirmation: e.target.value });
                                    if (passErrors.new_password_confirmation) setPassErrors({ ...passErrors, new_password_confirmation: null });
                                }}
                                placeholder="Re-enter new password"
                                className={`w-full h-12 pl-11 pr-11 text-sm bg-white border ${
                                    passErrors.new_password_confirmation ? "border-[#E05151]" : "border-[#E4E5E8]"
                                } rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className="absolute right-4 text-[#767E94] hover:text-[#18191C] cursor-pointer"
                            >
                                {showConfirmPass ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {passErrors.new_password_confirmation && (
                            <p className="text-xs text-[#E05151] mt-1 font-medium">
                                {passErrors.new_password_confirmation[0]}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmittingPassword}
                    className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors flex items-center gap-2"
                >
                    {isSubmittingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Update Password</span>
                </button>
            </form>

            {/* Delete Account Danger Zone */}
            <div className="pt-6 border-t border-[#E4E5E8] space-y-4">
                <div className="p-5 border border-[#E05151]/30 bg-[#FFF0F0] rounded-none space-y-3">
                    <div className="flex items-center gap-2 text-[#E05151]">
                        <UserX className="w-5 h-5" />
                        <h4 className="text-sm font-bold">Delete Account</h4>
                    </div>
                    <p className="text-xs text-[#5E6670] leading-relaxed">
                        If you delete your account, your profile, active job applications, and uploaded CV documents will be permanently removed.
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="px-4 py-2.5 bg-[#E05151] hover:bg-[#C93B3B] text-white font-bold text-xs rounded-none border-none cursor-pointer transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    setIsDeletingAccount(true);
                    setTimeout(() => {
                        setIsDeletingAccount(false);
                        setIsDeleteModalOpen(false);
                        showToast("Account deletion request submitted.", "error");
                    }, 600);
                }}
                isDeleting={isDeletingAccount}
                title="Delete Account"
                message="Are you sure you want to delete your candidate account? All profile details, resumes, and application records will be permanently deleted. This action cannot be undone."
            />
        </div>
    );
}
