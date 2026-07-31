import React from "react";
import { Check, ArrowRight } from "lucide-react";

export default function PricingSubscriptionCards({ onSelectPlan }) {
    const plans = [
        {
            id: "basic",
            name: "Basic",
            price: 19,
            period: "/Monthly",
            description: "Suitable for small hiring needs and single job postings.",
            isRecommended: false,
            features: [
                "Post 1 Job",
                "Urgents & Featured Jobs",
                "Highlights Job with Colors",
                "Access & Saved 5 Candidates",
                "10 Days Resume Visibility",
                "24/7 Critical Support",
            ],
        },
        {
            id: "standard",
            name: "Standard",
            price: 39,
            period: "/Monthly",
            description: "Best for growing businesses with regular hiring requirements.",
            isRecommended: true,
            badgeText: "Recommendation",
            features: [
                "3 Active Jobs",
                "Urgents & Featured Jobs",
                "Highlights Job with Colors",
                "Access & Saved 10 Candidates",
                "20 Days Resume Visibility",
                "24/7 Critical Support",
            ],
        },
        {
            id: "premium",
            name: "Premium",
            price: 59,
            period: "/Monthly",
            description: "Maximum reach and full access to candidate databases.",
            isRecommended: false,
            features: [
                "6 Active Jobs",
                "Urgents & Featured Jobs",
                "Highlights Job with Colors",
                "Access & Saved 20 Candidates",
                "30 Days Resume Visibility",
                "24/7 Critical Support",
            ],
        },
    ];

    return (
        <div className="w-full bg-white font-sans text-[#18191C]">
            {/* Top Banner Section with Image Illustration */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#E4E5E8]">
                <div className="max-w-xl">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#18191C] tracking-tight">
                        Buy Premium Subscription to Post a Job
                    </h2>
                    <p className="text-xs sm:text-sm text-[#767E94] mt-2.5 leading-relaxed">
                        Choose the perfect subscription plan to post jobs, find top candidate talent, and access premium recruitment tools for your company.
                    </p>
                </div>

                {/* Right Top Image Illustration from /images/banners/job.png */}
                <div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
                    <img
                        src="/images/banners/job.png"
                        alt="Post a Job Illustration"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto object-contain max-h-44 sm:max-h-52"
                    />
                </div>
            </div>

            {/* 3 Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {plans.map((plan) => {
                    const isRec = plan.isRecommended;

                    return (
                        <div
                            key={plan.id}
                            className={`flex flex-col justify-between p-6 sm:p-7 bg-white rounded-none transition-all duration-200 relative ${
                                isRec
                                    ? "border-2 border-[#0A65CC] shadow-lg transform md:-translate-y-2 z-10"
                                    : "border border-[#E4E5E8] hover:border-[#0A65CC]/50 hover:shadow-md"
                            }`}
                        >
                            {/* Recommendation Top Badge */}
                            {isRec && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0A65CC] text-white text-[11px] font-bold px-4 py-1 uppercase tracking-wider rounded-none shadow-xs">
                                    {plan.badgeText}
                                </div>
                            )}

                            <div>
                                {/* Plan Title & Description */}
                                <div className="mb-4">
                                    <h3 className="text-sm sm:text-base font-bold text-[#18191C] tracking-wide">
                                        {plan.name}
                                    </h3>
                                    <p className="text-xs text-[#767E94] mt-1.5 min-h-[36px]">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Price Header */}
                                <div className="flex items-baseline gap-1 my-5 pb-5 border-b border-[#E4E5E8]">
                                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0A65CC]">
                                        ${plan.price}
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium text-[#767E94]">
                                        {plan.period}
                                    </span>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-3.5 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#5E6670]">
                                            <div className="w-5 h-5 bg-[#E8F1FF] text-[#0A65CC] flex items-center justify-center shrink-0 rounded-none">
                                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Choose Plan CTA Button */}
                            <button
                                onClick={() => onSelectPlan(plan)}
                                className={`w-full py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-none border-none flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                    isRec
                                        ? "bg-[#0A65CC] hover:bg-[#0851A8] text-white shadow-md"
                                        : "bg-[#F1F2F4] hover:bg-[#E8F1FF] text-[#0A65CC]"
                                }`}
                            >
                                <span>Choose Plan</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
