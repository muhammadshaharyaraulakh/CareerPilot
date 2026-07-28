import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Robert Fox',
            role: 'UI/UX Designer',
            avatar: '/images/testimonials/avatar1.png',
            quote: 'Finding my ideal UI/UX design position took less than a week. The platform match algorithm connected me directly with top tech employers!',
            rating: 5,
        },
        {
            id: 2,
            name: 'Bessie Cooper',
            role: 'Creative Director',
            avatar: '/images/testimonials/avatar2.png',
            quote: 'As a creative director, hiring qualified candidates used to take months. Jobpilot streamlined our entire recruitment workflow effortlessly.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Jane Cooper',
            role: 'Photographer',
            avatar: '/images/testimonials/avatar3.png',
            quote: 'The career guidance and seamless application process helped me transition into a high-paying photography role smoothly.',
            rating: 5,
        },
        {
            id: 4,
            name: 'Eleanor Pena',
            role: 'Software Engineer',
            avatar: '/images/testimonials/avatar4.png',
            quote: 'I landed my dream software engineering job at a top tech startup! The application tracker and real-time updates were game-changers.',
            rating: 5,
        },
        {
            id: 5,
            name: 'Guy Hawkins',
            role: 'Product Manager',
            avatar: '/images/testimonials/avatar5.png',
            quote: 'We posted our product manager vacancy and received top-tier applicants within 24 hours. Truly an exceptional hiring platform.',
            rating: 5,
        },
        {
            id: 6,
            name: 'Kristin Watson',
            role: 'Data Scientist',
            avatar: '/images/testimonials/avatar6.png',
            quote: 'Jobpilot provided accurate market salary insights and verified job openings that helped me secure a senior data scientist role.',
            rating: 5,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Responsive items per page (3 on lg+, 2 on md (768-1023px), 1 on <768px)
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setItemsPerPage(3);
            } else if (width >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

    // Keep currentIndex within bounds on resize
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [itemsPerPage, maxIndex, currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    // Calculate gap in px for translateX slider shift
    const gapPx = itemsPerPage === 3 ? 24 : itemsPerPage === 2 ? 20 : 0;

    return (
        <section className="w-full bg-[#F8F9FA] py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-[1320px] mx-auto flex flex-col items-center">
                {/* Section Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#18191C] text-center mb-10 sm:mb-12 tracking-tight"
                >
                    Clients Testimonial
                </motion.h2>

                {/* Carousel Container with Side Navigation Arrows */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full relative flex items-center gap-3 sm:gap-5"
                >
                    {/* Previous Arrow Button */}
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-md bg-white border border-[#E4E5E8] flex items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white hover:border-[#0A65CC] transition-all duration-200 shrink-0 shadow-xs z-10 cursor-pointer"
                        aria-label="Previous Testimonial"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>

                    {/* Testimonials Viewport */}
                    <div className="w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                gap: `${gapPx}px`,
                                transform: `translateX(calc(-${currentIndex} * (100% + ${gapPx}px) / ${itemsPerPage}))`,
                            }}
                        >
                            {testimonials.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        width: `calc((100% - ${(itemsPerPage - 1) * gapPx}px) / ${itemsPerPage})`,
                                    }}
                                    className="bg-white rounded-xl p-6 sm:p-7 border border-[#EDF0F5] shadow-xs flex flex-col justify-between shrink-0 hover:shadow-md transition-shadow duration-200"
                                >
                                    <div>
                                        {/* 5 Stars Rating */}
                                        <div className="flex items-center gap-1 mb-3.5">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <StarIcon key={i} className="w-5 h-5 text-[#FFAA00]" />
                                            ))}
                                        </div>

                                        {/* Quote Text */}
                                        <p className="text-sm text-[#5E6670] leading-relaxed font-normal mb-5">
                                            "{item.quote}"
                                        </p>
                                    </div>

                                    {/* Author Info & Quotation Icon */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-11 h-11 rounded-full object-cover border border-gray-100 flex-shrink-0"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=0A65CC&color=fff`;
                                                }}
                                            />
                                            <div className="flex flex-col justify-center min-w-0">
                                                <h3 className="text-base font-normal text-[#18191C] leading-snug truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-[#767E94] leading-normal truncate mt-0.5">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* SVG Double Quotation Mark Icon */}
                                        <svg
                                            width="32"
                                            height="24"
                                            viewBox="0 0 32 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="flex-shrink-0 text-[#DCEBFA] ml-2"
                                        >
                                            <path
                                                d="M0 24V14.4C0 9.6 2.13333 4.8 6.4 0L10.4 2.8C7.46667 6.2 6 9.4 5.6 12.4H12.8V24H0ZM19.2 24V14.4C19.2 9.6 21.3333 4.8 25.6 0L29.6 2.8C26.6667 6.2 25.2 9.4 24.8 12.4H32V24H19.2Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Arrow Button */}
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-md bg-white border border-[#E4E5E8] flex items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white hover:border-[#0A65CC] transition-all duration-200 shrink-0 shadow-xs z-10 cursor-pointer"
                        aria-label="Next Testimonial"
                    >
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </motion.div>

                {/* Pagination Dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-2 mt-8"
                >
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`transition-all duration-300 cursor-pointer ${
                                currentIndex === idx
                                    ? 'w-6 h-2 bg-[#0A65CC] rounded-full'
                                    : 'w-2 h-2 bg-[#0A65CC]/25 hover:bg-[#0A65CC]/50 rounded-full'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

