import React, { useState } from "react";
import {
    ShieldCheck,
    Lock,
    Eye,
    EyeOff,
    Check,
    Bell,
    UserX,
    KeyRound,
} from "lucide-react";

export default function AccountSettingsTab() {
    // Account settings state
    const [accountData, setAccountData] = useState({
        isPublic: true,
        isCvPublic: true,
        emailNotifications: true,
        jobAlerts: true,
        marketingEmails: false,
    });

    // Password change form state
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Alerts
    const [showAccountSuccess, setShowAccountSuccess] = useState(false);
    const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

    const handleSaveAccountSettings = (e) => {
        if (e) e.preventDefault();
        setShowAccountSuccess(true);
        setTimeout(() => setShowAccountSuccess(false), 3000);
    };

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault();
        if (!passwords.currentPassword || !passwords.newPassword) return;
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordSuccess(true);
        setTimeout(() => setShowPasswordSuccess(false), 3000);
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {showAccountSuccess && (
                <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Account privacy & notification settings saved!</span>
                </div>
            )}

            {/* Privacy & Credentials Section */}
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
                                checked={accountData.isPublic}
                                onChange={(e) =>
                                    setAccountData({ ...accountData, isPublic: e.target.checked })
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
                                checked={accountData.isCvPublic}
                                onChange={(e) =>
                                    setAccountData({ ...accountData, isCvPublic: e.target.checked })
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
                                checked={accountData.jobAlerts}
                                onChange={(e) =>
                                    setAccountData({ ...accountData, jobAlerts: e.target.checked })
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
                                checked={accountData.emailNotifications}
                                onChange={(e) =>
                                    setAccountData({
                                        ...accountData,
                                        emailNotifications: e.target.checked,
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
                    className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors"
                >
                    Save Preferences
                </button>
            </form>

            {/* Change Password Section */}
            <form
                onSubmit={handleChangePasswordSubmit}
                className="pt-6 border-t border-[#E4E5E8] space-y-5"
            >
                {showPasswordSuccess && (
                    <div className="p-4 bg-[#EAF6ED] border border-[#0BA02C]/20 rounded-none text-[#0BA02C] text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                        <Check className="w-4 h-4" />
                        <span>Password changed successfully!</span>
                    </div>
                )}

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
                                required
                                value={passwords.currentPassword}
                                onChange={(e) =>
                                    setPasswords({ ...passwords, currentPassword: e.target.value })
                                }
                                placeholder="Enter current password"
                                className="w-full h-12 pl-11 pr-11 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
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
                                required
                                value={passwords.newPassword}
                                onChange={(e) =>
                                    setPasswords({ ...passwords, newPassword: e.target.value })
                                }
                                placeholder="Enter new password"
                                className="w-full h-12 pl-11 pr-11 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
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
                                required
                                value={passwords.confirmPassword}
                                onChange={(e) =>
                                    setPasswords({ ...passwords, confirmPassword: e.target.value })
                                }
                                placeholder="Re-enter new password"
                                className="w-full h-12 pl-11 pr-11 text-sm bg-white border border-[#E4E5E8] rounded-none focus:ring-1 focus:ring-[#0A65CC] focus:border-[#0A65CC] transition-colors placeholder:text-[#9199A8]"
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
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-bold text-xs sm:text-sm rounded-none border-none shadow-xs cursor-pointer transition-colors"
                >
                    Update Password
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
                        onClick={() => {
                            if (confirm("Are you sure you want to delete your candidate account? This action cannot be undone.")) {
                                alert("Account deletion request submitted.");
                            }
                        }}
                        className="px-4 py-2.5 bg-[#E05151] hover:bg-[#C93B3B] text-white font-bold text-xs rounded-none border-none cursor-pointer transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
