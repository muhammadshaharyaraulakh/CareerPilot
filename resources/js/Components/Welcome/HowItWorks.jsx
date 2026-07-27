import React from 'react';
import { UserPlusIcon, ArrowUpTrayIcon, MagnifyingGlassPlusIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            title: 'Create account',
            description: 'Aliquam facilisis egestas sapien, nec tempor leo tristique at.',
            icon: UserPlusIcon,
            highlighted: false,
            arrowType: 'up', // arrow arching up to next step
        },
        {
            id: 2,
            title: 'Upload CV/Resume',
            description: 'Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales',
            icon: ArrowUpTrayIcon,
            highlighted: true, // White elevated card container
            arrowType: 'down', // arrow arching down to next step
        },
        {
            id: 3,
            title: 'Find suitable job',
            description: 'Phasellus quis eleifend ex. Morbi nec fringilla nibh.',
            icon: MagnifyingGlassPlusIcon,
            highlighted: false,
            arrowType: 'up', // arrow arching up to next step
        },
        {
            id: 4,
            title: 'Apply job',
            description: 'Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.',
            icon: CheckBadgeIcon,
            highlighted: false,
            arrowType: null,
        },
    ];

    return (
        <section className="w-full bg-[#F1F2F4]/60 py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Section Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] text-center mb-12 sm:mb-16 tracking-tight">
                    How jobpilot work
                </h2>

                {/* 4 Steps Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center relative">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <div key={step.id} className="relative flex flex-col items-center group">
                                
                                {/* Step Item Box */}
                                <div
                                    className={`w-full flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                                        step.highlighted
                                            ? 'bg-white shadow-xl shadow-gray-200/80 border border-gray-100 z-10 scale-100 sm:scale-105'
                                            : 'bg-transparent hover:bg-white/50'
                                    }`}
                                >
                                    {/* Icon Container */}
                                    <div
                                        className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                                            step.highlighted
                                                ? 'bg-[#0A65CC] text-white shadow-lg shadow-[#0A65CC]/30'
                                                : 'bg-white text-[#0A65CC] shadow-md shadow-gray-200/60 border border-gray-100'
                                        }`}
                                    >
                                        <IconComponent className="w-7 h-7 stroke-[1.8]" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base sm:text-lg font-bold text-[#18191C] mb-2 tracking-tight">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-xs">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Curved Dashed Connecting Arrow (Visible on Desktop) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 -right-12 w-24 h-16 z-20 pointer-events-none transform translate-x-1/2">
                                        {step.arrowType === 'up' ? (
                                            /* Upward Arching Curved Dashed Arrow SVG */
                                            <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                                <path
                                                    d="M 5 45 Q 50 0 92 25"
                                                    stroke="#0A65CC"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="4 4"
                                                    opacity="0.5"
                                                    fill="none"
                                                />
                                                <path d="M 85 28 L 94 26 L 90 18" stroke="#0A65CC" strokeWidth="1.5" fill="none" opacity="0.6" />
                                            </svg>
                                        ) : (
                                            /* Downward Arching Curved Dashed Arrow SVG */
                                            <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                                <path
                                                    d="M 5 10 Q 50 55 92 30"
                                                    stroke="#0A65CC"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="4 4"
                                                    opacity="0.5"
                                                    fill="none"
                                                />
                                                <path d="M 86 24 L 94 30 L 92 38" stroke="#0A65CC" strokeWidth="1.5" fill="none" opacity="0.6" />
                                            </svg>
                                        )}
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
