import React from "react";
import {
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function SubscriptionsRevenueView() {
    const paymentLogs = [
        {
            id: "INV-9021",
            company: "Figma Design Studio",
            plan: "Premium Plan ($299/mo)",
            amount: "$299.00",
            gateway: "Stripe",
            date: "Aug 02, 2026",
            status: "Paid",
        },
        {
            id: "INV-9020",
            company: "Instagram Media Inc",
            plan: "Enterprise Plan ($599/mo)",
            amount: "$599.00",
            gateway: "Stripe",
            date: "Jul 31, 2026",
            status: "Paid",
        },
        {
            id: "INV-9019",
            company: "TechCorp Global Solutions",
            plan: "Enterprise Plan ($599/mo)",
            amount: "$599.00",
            gateway: "PayPal",
            date: "Jul 29, 2026",
            status: "Paid",
        },
        {
            id: "INV-9018",
            company: "Spotify Music Stream",
            plan: "Standard Plan ($99/mo)",
            amount: "$99.00",
            gateway: "Stripe",
            date: "Jul 25, 2026",
            status: "Paid",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Revenue Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 shadow-2xs">
                    <span className="text-xs font-semibold text-[#767E94]">
                        Gross Recurring Revenue
                    </span>
                    <h3 className="text-2xl font-bold text-[#18191C] mt-2 mb-1">
                        $48,250.00
                    </h3>
                    <p className="text-[11px] text-[#0BA02C] font-semibold flex items-center gap-1">
                        <ArrowTrendingUpIcon className="w-3.5 h-3.5" /> +14.2% from last month
                    </p>
                </div>
                <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 shadow-2xs">
                    <span className="text-xs font-semibold text-[#767E94]">
                        Active Paid Subscriptions
                    </span>
                    <h3 className="text-2xl font-bold text-[#18191C] mt-2 mb-1">
                        840 Companies
                    </h3>
                    <p className="text-[11px] text-[#767E94] font-medium">
                        Standard, Premium & Enterprise
                    </p>
                </div>
                <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 shadow-2xs">
                    <span className="text-xs font-semibold text-[#767E94]">
                        Average Revenue Per User (ARPU)
                    </span>
                    <h3 className="text-2xl font-bold text-[#18191C] mt-2 mb-1">
                        $142.50 / mo
                    </h3>
                    <p className="text-[11px] text-[#0BA02C] font-semibold flex items-center gap-1">
                        <ArrowTrendingUpIcon className="w-3.5 h-3.5" /> High Plan Conversion Rate
                    </p>
                </div>
            </div>

            {/* Payment Transactions Audit Log */}
            <div className="bg-white border border-[#E4E5E8] rounded-xl p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#E4E5E8]">
                    <div>
                        <h3 className="text-base font-bold text-[#18191C]">
                            Recent Payment Transactions & Billing Logs
                        </h3>
                        <p className="text-xs text-[#767E94] mt-0.5">
                            Realtime transaction records from Stripe and PayPal payment gateways.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="px-3.5 py-2 bg-[#F8F9FA] hover:bg-gray-100 border border-[#E4E5E8] text-xs font-semibold text-[#5E6670] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Export Financial Statement</span>
                    </button>
                </div>

                <div className="overflow-x-auto border border-[#E4E5E8] rounded-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8F9FA] border-b border-[#E4E5E8] text-[11px] font-bold text-[#767E94] uppercase tracking-wider">
                                <th className="py-3 px-4">Invoice ID</th>
                                <th className="py-3 px-4">Employer Company</th>
                                <th className="py-3 px-4">Plan Purchased</th>
                                <th className="py-3 px-4">Payment Method</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E4E5E8] text-xs text-[#18191C]">
                            {paymentLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-[#F8F9FA]/60">
                                    <td className="py-3.5 px-4 font-mono font-bold text-[#0A65CC]">
                                        {log.id}
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-[#18191C]">
                                        {log.company}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5E6670]">
                                        {log.plan}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5E6670]">
                                        {log.gateway}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#5E6670]">
                                        {log.date}
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-[#18191C]">
                                        {log.amount}
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7F6EA] text-[#0BA02C] text-[11px] font-semibold rounded-full">
                                            <CheckCircleIcon className="w-3.5 h-3.5" /> {log.status}
                                        </span>
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
