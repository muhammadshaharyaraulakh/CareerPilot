import React, { useState } from "react";
import { Bell, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";

export default function CandidateJobAlertsView() {
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            title: "UI/UX Designer",
            criteria: "Remote, $60k-$90k/year",
            frequency: "Daily",
            active: true,
            matchedCount: 14,
        },
        {
            id: 2,
            title: "React Frontend Engineer",
            criteria: "Full Time, Washington DC",
            frequency: "Weekly",
            active: true,
            matchedCount: 8,
        },
        {
            id: 3,
            title: "Product Manager",
            criteria: "Dhaka or Remote",
            frequency: "Daily",
            active: true,
            matchedCount: 22,
        },
        {
            id: 4,
            title: "Visual Designer",
            company: "Contract Base, Any location",
            frequency: "Weekly",
            active: true,
            matchedCount: 5,
        },
        {
            id: 5,
            title: "Graphic Designer",
            criteria: "Brazil / South America",
            frequency: "Daily",
            active: true,
            matchedCount: 11,
        },
        {
            id: 6,
            title: "DevOps Specialist",
            criteria: "Hybrid / Remote",
            frequency: "Weekly",
            active: true,
            matchedCount: 19,
        },
        {
            id: 7,
            title: "iOS Mobile Engineer",
            criteria: "Swift / React Native",
            frequency: "Daily",
            active: true,
            matchedCount: 7,
        },
        {
            id: 8,
            title: "Content Marketing Lead",
            criteria: "Full Time, $50k-$75k",
            frequency: "Weekly",
            active: true,
            matchedCount: 12,
        },
        {
            id: 9,
            title: "AI Research Assistant",
            criteria: "Part Time / Internship",
            frequency: "Daily",
            active: true,
            matchedCount: 3,
        },
    ]);

    const toggleAlert = (id) => {
        setAlerts(
            alerts.map((al) => (al.id === id ? { ...al, active: !al.active } : al))
        );
    };

    const deleteAlert = (id) => {
        setAlerts(alerts.filter((al) => al.id !== id));
    };

    return (
        <div className="space-y-6 font-sans text-[#18191C]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                        Job Alerts ({alerts.length})
                    </h2>
                    <p className="text-xs sm:text-sm text-[#767E94] mt-0.5">
                        Manage your instant email notifications for matching job vacancies
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => alert("Create new Job Alert dialog opened")}
                    className="h-10 px-4 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Job Alert</span>
                </button>
            </div>

            <div className="bg-white border border-[#E4E5E8] rounded-none divide-y divide-[#E4E5E8]">
                {alerts.map((alertItem) => (
                    <div
                        key={alertItem.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F9FA] transition-colors"
                    >
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center rounded-none shrink-0 mt-0.5">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm sm:text-base text-[#18191C]">
                                    {alertItem.title}
                                </h3>
                                <p className="text-xs text-[#767E94] mt-0.5">
                                    {alertItem.criteria} • Frequency:{" "}
                                    <span className="font-semibold text-[#18191C]">
                                        {alertItem.frequency}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                            <span className="px-2.5 py-1 text-xs font-semibold bg-[#E6F4EA] text-[#0BA02C] rounded-none">
                                {alertItem.matchedCount} new jobs
                            </span>

                            {/* Toggle Switch */}
                            <button
                                type="button"
                                onClick={() => toggleAlert(alertItem.id)}
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                                    alertItem.active ? "bg-[#0A65CC]" : "bg-[#CBD5E1]"
                                }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                        alertItem.active ? "translate-x-5" : "translate-x-0"
                                    }`}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteAlert(alertItem.id)}
                                className="p-1.5 text-[#767E94] hover:text-[#E05151] transition-colors cursor-pointer"
                                title="Delete alert"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
