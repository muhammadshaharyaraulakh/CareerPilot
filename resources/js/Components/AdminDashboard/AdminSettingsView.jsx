import React, { useState } from "react";
import {
    Cog6ToothIcon,
    ShieldCheckIcon,
    EnvelopeIcon,
    KeyIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function AdminSettingsView() {
    const [siteTitle, setSiteTitle] = useState("CareerPilot Job Portal");
    const [supportEmail, setSupportEmail] = useState("support@careerpilot.com");
    const [autoApproveCompanies, setAutoApproveCompanies] = useState(false);
    const [autoApproveJobs, setAutoApproveJobs] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 4000);
    };

    return (
        <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs max-w-4xl">
            <div className="pb-5 mb-5 border-b border-[#E4E5E8]">
                <h2 className="text-lg font-bold text-[#18191C] flex items-center gap-2">
                    <Cog6ToothIcon className="w-5 h-5 text-[#0A65CC]" />
                    Platform Admin Configuration
                </h2>
                <p className="text-xs text-[#767E94] mt-0.5">
                    Configure core system behavior, auto moderation rules, and security credentials.
                </p>
            </div>

            {savedNotice && (
                <div className="mb-6 p-4 bg-[#E7F6EA] border border-[#B3E6BE] rounded-xl text-xs font-bold text-[#0BA02C] flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 shrink-0" />
                    <span>Admin Settings Saved Successfully!</span>
                </div>
            )}

            <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
                {/* Section 1: General Platform Details */}
                <div>
                    <h3 className="text-sm font-bold text-[#18191C] mb-3 flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-[#0A65CC]" />
                        General System Identity
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1">
                                Platform Name
                            </label>
                            <input
                                type="text"
                                value={siteTitle}
                                onChange={(e) => setSiteTitle(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#18191C] mb-1">
                                Official Support Email
                            </label>
                            <input
                                type="email"
                                value={supportEmail}
                                onChange={(e) => setSupportEmail(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Automation Rules */}
                <div className="pt-4 border-t border-[#E4E5E8]">
                    <h3 className="text-sm font-bold text-[#18191C] mb-3">
                        Auto Moderation Rules
                    </h3>
                    <div className="flex flex-col gap-3">
                        <label className="flex items-center justify-between p-3.5 bg-[#F8F9FA] border border-gray-100 rounded-lg cursor-pointer">
                            <div>
                                <span className="text-xs font-bold text-[#18191C] block">
                                    Auto Approve Registered Companies
                                </span>
                                <span className="text-[11px] text-[#767E94]">
                                    If enabled, new companies bypass admin approval queue
                                </span>
                            </div>
                            <input
                                type="checkbox"
                                checked={autoApproveCompanies}
                                onChange={(e) => setAutoApproveCompanies(e.target.checked)}
                                className="w-4 h-4 text-[#0A65CC] rounded border-gray-300 focus:ring-0"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3.5 bg-[#F8F9FA] border border-gray-100 rounded-lg cursor-pointer">
                            <div>
                                <span className="text-xs font-bold text-[#18191C] block">
                                    Auto Approve Employer Job Posts
                                </span>
                                <span className="text-[11px] text-[#767E94]">
                                    If enabled, posted jobs are published immediately without review
                                </span>
                            </div>
                            <input
                                type="checkbox"
                                checked={autoApproveJobs}
                                onChange={(e) => setAutoApproveJobs(e.target.checked)}
                                className="w-4 h-4 text-[#0A65CC] rounded border-gray-300 focus:ring-0"
                            />
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-[#E4E5E8] flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                        Save Configuration Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
