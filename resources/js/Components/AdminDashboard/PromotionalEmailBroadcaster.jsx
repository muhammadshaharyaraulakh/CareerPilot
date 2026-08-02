import React, { useState } from "react";
import {
    EnvelopeIcon,
    PaperAirplaneIcon,
    UsersIcon,
    CheckCircleIcon,
    SparklesIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

export default function PromotionalEmailBroadcaster() {
    const [targetAudience, setTargetAudience] = useState("All Users");
    const [customEmails, setCustomEmails] = useState("");
    const [subject, setSubject] = useState("");
    const [bodyContent, setBodyContent] = useState("");
    const [testEmail, setTestEmail] = useState("");

    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [testSentMessage, setTestSentMessage] = useState(null);

    // Email Broadcast Logs History
    const [broadcastLogs, setBroadcastLogs] = useState([
        {
            id: 1,
            subject: "CareerPilot Platform Upgrade & New Featured Jobs",
            target: "All Candidates (45,800 emails)",
            sentDate: "Aug 01, 2026",
            status: "Delivered",
            opens: "64.2%",
        },
        {
            id: 2,
            subject: "Special 20% Discount on Enterprise Employer Hiring Plans",
            target: "All Employers (1,420 emails)",
            sentDate: "Jul 25, 2026",
            status: "Delivered",
            opens: "58.7%",
        },
    ]);

    const handleApplyTemplate = (templateSubject, templateBody) => {
        setSubject(templateSubject);
        setBodyContent(templateBody);
    };

    const handleSendTestEmail = (e) => {
        e.preventDefault();
        if (!testEmail.trim()) return;
        setTestSentMessage(`Test email sent successfully to ${testEmail}`);
        setTimeout(() => setTestSentMessage(null), 4000);
    };

    const handleBroadcastCampaign = (e) => {
        e.preventDefault();
        if (!subject.trim() || !bodyContent.trim()) return;

        setIsBroadcasting(true);
        setTimeout(() => {
            setIsBroadcasting(false);
            const newLog = {
                id: Date.now(),
                subject: subject,
                target:
                    targetAudience === "Custom List"
                        ? "Custom Gmail List"
                        : `${targetAudience}`,
                sentDate: "Just Now",
                status: "Delivered",
                opens: "0.0%",
            };
            setBroadcastLogs([newLog, ...broadcastLogs]);
            setSuccessMessage(
                `Campaign "${subject}" dispatched successfully to ${targetAudience}!`
            );
            setSubject("");
            setBodyContent("");
            setTimeout(() => setSuccessMessage(null), 5000);
        }, 1200);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Top Container: Broadcaster Form */}
            <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E4E5E8]">
                    <div>
                        <h2 className="text-lg font-bold text-[#18191C] flex items-center gap-2">
                            <EnvelopeIcon className="w-5 h-5 text-[#0A65CC]" />
                            Promotional Email Campaign Broadcaster
                        </h2>
                        <p className="text-xs text-[#767E94] mt-0.5">
                            Compose and send promotional announcements or custom emails directly to all registered candidates and employers.
                        </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 bg-[#E8F1FF] text-[#0A65CC] rounded-lg border border-[#CEE0F5]">
                        SMTP Gateway: Active & Connected
                    </span>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-[#E7F6EA] border border-[#B3E6BE] rounded-xl text-xs font-bold text-[#0BA02C] flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Quick Templates Bar */}
                <div className="mb-6">
                    <span className="text-xs font-bold text-[#18191C] block mb-2">
                        Quick Email Templates:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={() =>
                                handleApplyTemplate(
                                    "Special Promotional Offer for Top Employers",
                                    "Hello Employer,\n\nWe are excited to offer an exclusive 25% promotional discount on our Enterprise hiring packages this month!\n\nBoost your hiring velocity and find top verified talent today on CareerPilot.\n\nBest regards,\nCareerPilot Team"
                                )
                            }
                            className="px-3 py-1.5 bg-[#F8F9FA] hover:bg-[#E8F1FF] text-[#5E6670] hover:text-[#0A65CC] text-xs font-semibold rounded-md border border-[#E4E5E8] transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                            <SparklesIcon className="w-3.5 h-3.5 text-[#F7A531]" />
                            <span>Employer 25% Promo Offer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                handleApplyTemplate(
                                    "Weekly Top Verified Jobs Tailored for You",
                                    "Hello Candidate,\n\nExplore our latest verified high paying tech, design, and finance job vacancies posted by leading global companies this week.\n\nUpdate your profile now to get matched automatically!\n\nBest regards,\nCareerPilot Team"
                                )
                            }
                            className="px-3 py-1.5 bg-[#F8F9FA] hover:bg-[#E8F1FF] text-[#5E6670] hover:text-[#0A65CC] text-xs font-semibold rounded-md border border-[#E4E5E8] transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                            <SparklesIcon className="w-3.5 h-3.5 text-[#0A65CC]" />
                            <span>Weekly Candidates Digest</span>
                        </button>
                    </div>
                </div>

                {/* Main Email Form */}
                <form onSubmit={handleBroadcastCampaign} className="flex flex-col gap-5">
                    {/* Target Audience Selector */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#18191C] mb-1.5">
                                Select Target Email Audience
                            </label>
                            <select
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs font-medium text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                            >
                                <option value="All Users">All Registered Users (47,220 Emails)</option>
                                <option value="All Candidates">All Candidates (45,800 Emails)</option>
                                <option value="All Employers">All Employers & Companies (1,420 Emails)</option>
                                <option value="Enterprise Employers">Enterprise Plan Employers (240 Emails)</option>
                                <option value="Custom List">Custom Email / Gmail List Input</option>
                            </select>
                        </div>

                        {/* Subject Input */}
                        <div>
                            <label className="block text-xs font-bold text-[#18191C] mb-1.5">
                                Email Subject Line
                            </label>
                            <input
                                type="text"
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. Exclusive Hiring Offer / New Feature Announcement"
                                className="w-full h-11 px-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] placeholder-[#9199A3] focus:border-[#0A65CC] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Custom Emails Textarea (Shown if Custom List selected) */}
                    {targetAudience === "Custom List" && (
                        <div>
                            <label className="block text-xs font-bold text-[#18191C] mb-1.5">
                                Custom Email / Gmail Addresses (Comma or newline separated)
                            </label>
                            <textarea
                                rows={3}
                                value={customEmails}
                                onChange={(e) => setCustomEmails(e.target.value)}
                                placeholder="user1@gmail.com, user2@gmail.com, candidate@gmail.com..."
                                className="w-full p-3.5 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] placeholder-[#9199A3] focus:border-[#0A65CC] focus:outline-none"
                            />
                        </div>
                    )}

                    {/* Email Content Editor */}
                    <div>
                        <label className="block text-xs font-bold text-[#18191C] mb-1.5">
                            Email Body Content
                        </label>
                        <textarea
                            rows={7}
                            required
                            value={bodyContent}
                            onChange={(e) => setBodyContent(e.target.value)}
                            placeholder="Write your email body message here..."
                            className="w-full p-4 bg-white border border-[#E4E5E8] rounded-lg text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:border-[#0A65CC] focus:outline-none leading-relaxed"
                        />
                    </div>

                    {/* Test Email Row & Send Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#E4E5E8]">
                        {/* Test Email Tester */}
                        <div className="flex items-center gap-2 flex-1 max-w-md">
                            <input
                                type="email"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                placeholder="Send test copy to email (e.g. admin@gmail.com)"
                                className="flex-1 h-10 px-3 bg-white border border-[#E4E5E8] rounded-lg text-xs text-[#18191C] focus:border-[#0A65CC] focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleSendTestEmail}
                                className="h-10 px-3.5 bg-[#F8F9FA] border border-[#E4E5E8] hover:bg-gray-100 text-xs font-semibold text-[#5E6670] rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                                Test Send
                            </button>
                        </div>

                        {/* Broadcast Campaign Button */}
                        <button
                            type="submit"
                            disabled={isBroadcasting}
                            className="h-11 px-6 bg-[#0A65CC] hover:bg-[#0851A8] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                        >
                            <PaperAirplaneIcon className="w-4 h-4" />
                            <span>
                                {isBroadcasting
                                    ? "Broadcasting Campaign..."
                                    : "Broadcast Email Campaign"}
                            </span>
                        </button>
                    </div>

                    {testSentMessage && (
                        <p className="text-xs text-[#0BA02C] font-semibold">
                            {testSentMessage}
                        </p>
                    )}
                </form>
            </div>

            {/* Bottom Container: Sent Broadcast History Table */}
            <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
                <h3 className="text-base font-bold text-[#18191C] mb-1">
                    Past Broadcast Logs
                </h3>
                <p className="text-xs text-[#767E94] mb-4">
                    Audit trail of previous promotional campaigns sent from the platform.
                </p>

                <div className="overflow-x-auto border border-[#E4E5E8] rounded-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8F9FA] border-b border-[#E4E5E8] text-[11px] font-bold text-[#767E94] uppercase tracking-wider">
                                <th className="py-3 px-4">Subject</th>
                                <th className="py-3 px-4">Audience</th>
                                <th className="py-3 px-4">Sent Date</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Open Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E4E5E8] text-xs text-[#18191C]">
                            {broadcastLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-[#F8F9FA]/60">
                                    <td className="py-3.5 px-4 font-semibold text-[#18191C]">
                                        {log.subject}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5E6670]">
                                        {log.target}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5E6670]">
                                        {log.sentDate}
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <span className="px-2.5 py-1 bg-[#E7F6EA] text-[#0BA02C] text-[11px] font-semibold rounded-full">
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right font-bold text-[#0A65CC]">
                                        {log.opens}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
