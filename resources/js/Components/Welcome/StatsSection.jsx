import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animated Counter Component
function AnimatedCounter({ value, duration = 1800 }) {
    const target = parseInt(String(value).replace(/,/g, ''), 10) || 0;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutProgress * target);

            setCount(current);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [target, duration]);

    return <span>{count.toLocaleString('en-US')}</span>;
}

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function StatsSection() {
    const statistics = [
        { value: '1,754', label: 'Live Job', icon: '/images/icons/icon-2.svg', highlighted: false },
        { value: '9,735', label: 'Companies', icon: '/images/icons/icon.svg', highlighted: true },
        { value: '3,841', label: 'Candidates', icon: '/images/icons/icon-1.svg', highlighted: false },
        { value: '7,532', label: 'New Jobs', icon: '/images/icons/icon-2.svg', highlighted: false },
    ];

    return (
        <section className="w-full bg-[#f1f2f4] pt-14 sm:pt-20 lg:pt-28 pb-20 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1320px]">
                <motion.div
                    className="grid grid-cols-1 min-[576px]:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-40px" }}
                    variants={gridContainerVariants}
                >
                    {statistics.map((s, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardItemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`group cursor-pointer rounded-2xl bg-white p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-shadow duration-300 ${
                                s.highlighted
                                    ? 'shadow-[0_12px_48px_rgba(0,44,109,0.12)] ring-1 ring-black/5'
                                    : 'shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
                            }`}
                        >
                            {/* Icon Container Box */}
                            <div
                                className={`w-[68px] h-[68px] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                                    s.highlighted
                                        ? 'bg-[#0A65CC] text-white shadow-md shadow-[#0A65CC]/25'
                                        : 'bg-[#E7F0FA] text-[#0A65CC]'
                                }`}
                            >
                                <img
                                    src={s.icon}
                                    alt={s.label}
                                    className="h-11 w-11 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const fallback = e.target.nextElementSibling;
                                        if (fallback) fallback.style.display = 'block';
                                    }}
                                />
                                <svg className="hidden h-9 w-9 fill-current" viewBox="0 0 24 24">
                                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                </svg>
                            </div>

                            {/* Stat Content */}
                            <div className="min-w-0 flex-1">
                                <p className="text-lg sm:text-2xl lg:text-[26px] font-medium leading-tight text-[#18191C] tracking-tight truncate">
                                    <AnimatedCounter value={s.value} />
                                </p>
                                <p className="text-xs sm:text-sm font-normal text-[#767E94] mt-1 truncate">
                                    {s.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

