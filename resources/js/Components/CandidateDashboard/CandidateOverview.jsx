import React from "react";
import {
    Briefcase,
    Bookmark,
    Bell,
    ArrowRight,
    MapPin,
    DollarSign,
    CheckCircle2,
} from "lucide-react";

export default function CandidateOverview({
    userName = "Esther Howard",
    userAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    onNavigateToSettings,
    onNavigateToAppliedJobs,
    onViewJobDetails,
}) {
    const summaryCards = [
        {
            title: "Applied jobs",
            count: "589",
            icon: Briefcase,
            bgColor: "bg-[#E8F1FF]",
            iconColor: "text-[#0A65CC]",
            iconBoxBg: "bg-white",
        },
        {
            title: "Favorite jobs",
            count: "238",
            icon: Bookmark,
            bgColor: "bg-[#FFF6E6]",
            iconColor: "text-[#FFAA00]",
            iconBoxBg: "bg-white",
        },
        {
            title: "Job Alerts",
            count: "574",
            icon: Bell,
            bgColor: "bg-[#E6F4EA]",
            iconColor: "text-[#0BA02C]",
            iconBoxBg: "bg-white",
        },
    ];

    const recentlyAppliedJobs = [
        {
            id: 1,
            title: "Networking Engineer",
            company: "Upwork",
            logo: null,
            logoBg: "bg-[#6fda44]",
            logoText: "Up",
            type: "Remote",
            typeBg: "bg-[#E8F1FF] text-[#0A65CC]",
            location: "Washington",
            salary: "$50k-80k/month",
            dateApplied: "Feb 2, 2019 19:28",
            status: "Active",
        },
        {
            id: 2,
            title: "Product Designer",
            company: "Dribbble",
            logo: "/images/about/dribbble.svg",
            logoBg: "bg-[#EA4C89]",
            logoText: "🏀",
            type: "Full Time",
            typeBg: "bg-[#E8F1FF] text-[#0A65CC]",
            location: "Dhaka",
            salary: "$50k-80k/month",
            dateApplied: "Dec 7, 2019 23:26",
            status: "Active",
        },
        {
            id: 3,
            title: "Junior Graphic Designer",
            company: "Apple",
            logo: "/images/about/apple.svg",
            logoBg: "bg-[#000000]",
            logoText: "",
            type: "Temporary",
            typeBg: "bg-[#E8F1FF] text-[#0A65CC]",
            location: "Brazil",
            salary: "$50k-80k/month",
            dateApplied: "Feb 2, 2019 19:28",
            status: "Active",
        },
        {
            id: 4,
            title: "Visual Designer",
            company: "Microsoft",
            logo: "/images/about/microsoft.svg",
            logoBg: "bg-[#F25022]",
            logoText: "田",
            type: "Contract Base",
            typeBg: "bg-[#E8F1FF] text-[#0A65CC]",
            location: "Wisconsin",
            salary: "$50k-80k/month",
            dateApplied: "Dec 7, 2019 23:26",
            status: "Active",
        },
    ];

    return (
        <div className="space-y-8 font-sans text-[#18191C]">
            {/* Header Greeting */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                    Hello, {userName}
                </h2>
                <p className="text-xs sm:text-sm text-[#767E94] mt-1">
                    Here is your daily activities and job alerts
                </p>
            </div>

            {/* 3 Activity Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {summaryCards.map((card, idx) => {
                    const IconComp = card.icon;
                    return (
                        <div
                            key={idx}
                            className={`${card.bgColor} p-5 sm:p-6 rounded-none flex items-center justify-between transition-transform hover:-translate-y-0.5`}
                        >
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#18191C]">
                                    {card.count}
                                </h3>
                                <p className="text-xs sm:text-sm font-medium text-[#5E6670] mt-1">
                                    {card.title}
                                </p>
                            </div>

                            <div
                                className={`w-12 h-12 rounded-none ${card.iconBoxBg} flex items-center justify-center shadow-2xs border border-black/5`}
                            >
                                <IconComp className={`w-6 h-6 ${card.iconColor}`} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Red Profile Editing Alert Banner */}
            <div className="bg-[#E05151] text-white p-6 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/40 shrink-0 hidden xs:block">
                        <img
                            src={userAvatar}
                            alt={userName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src =
                                    "https://ui-avatars.com/api/?name=Esther+Howard&background=fff&color=E05151";
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                            Your profile editing is not completed.
                        </h3>
                        <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                            Complete your profile editing & build your custom Resume
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onNavigateToSettings}
                    className="px-5 py-3 bg-white text-[#E05151] hover:bg-gray-100 font-bold text-xs sm:text-sm rounded-none transition-colors shrink-0 flex items-center gap-2 cursor-pointer border-none shadow-xs"
                >
                    <span>Edit Profile</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Recently Applied Table Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-[#18191C]">
                        Recently Applied
                    </h3>

                    <button
                        type="button"
                        onClick={onNavigateToAppliedJobs}
                        className="text-xs sm:text-sm font-semibold text-[#767E94] hover:text-[#0A65CC] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                        <span>View all</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Applied Jobs Table Container */}
                <div className="bg-white border border-[#E4E5E8] rounded-none overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-[#F1F2F4] text-[#767E94] uppercase text-[11px] font-bold border-b border-[#E4E5E8]">
                                <th className="py-3 px-4">Job</th>
                                <th className="py-3 px-4">Date Applied</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E4E5E8]">
                            {recentlyAppliedJobs.map((job) => (
                                <tr
                                    key={job.id}
                                    className="group hover:bg-[#E8F1FF]/30 hover:outline hover:outline-2 hover:outline-[#0A65CC] hover:-outline-offset-2 transition-all cursor-pointer"
                                >
                                    {/* Job Title & Details with Company Logos */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3.5">
                                            {/* Logo Box */}
                                            <div
                                                className={`w-12 h-12 rounded-none shrink-0 flex items-center justify-center p-2.5 shadow-2xs ${
                                                    job.logo ? "bg-white border border-[#E4E5E8]" : job.logoBg + " text-white font-bold text-base"
                                                }`}
                                            >
                                                {job.logo ? (
                                                    <img
                                                        src={job.logo}
                                                        alt={job.company}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <span>{job.logoText}</span>
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-sm sm:text-base text-[#18191C] group-hover:text-[#0A65CC] transition-colors">
                                                        {job.title}
                                                    </span>
                                                    <span
                                                        className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${job.typeBg}`}
                                                    >
                                                        {job.type}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 text-xs text-[#767E94] mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5 text-[#9199A3]" />
                                                        <span>{job.location}</span>
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-3.5 h-3.5 text-[#9199A3]" />
                                                        <span>{job.salary}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Date Applied */}
                                    <td className="py-4 px-4 text-xs sm:text-sm text-[#5E6670] font-medium">
                                        {job.dateApplied}
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0BA02C]">
                                            <CheckCircle2 className="w-4 h-4 text-[#0BA02C]" />
                                            <span>Active</span>
                                        </span>
                                    </td>

                                    {/* Action Button - Increased Height h-11 sm:h-12 and Dynamic Hover State */}
                                    <td className="py-4 px-4 text-right">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewJobDetails(job);
                                            }}
                                            className="h-11 sm:h-12 px-5 sm:px-6 text-xs sm:text-sm font-bold rounded-none bg-[#F1F2F4] text-[#0A65CC] group-hover:bg-[#0A65CC] group-hover:text-white transition-all cursor-pointer border-none shadow-2xs"
                                        >
                                            View Details
                                        </button>
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
