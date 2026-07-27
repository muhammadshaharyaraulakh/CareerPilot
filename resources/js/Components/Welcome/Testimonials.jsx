import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Robert Fox',
            role: 'UI/UX Designer',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            quote: 'Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Bessie Cooper',
            role: 'Creative Director',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            quote: 'Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Jane Cooper',
            role: 'Photographer',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            quote: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus.',
            rating: 5,
        },
        {
            id: 4,
            name: 'Eleanor Pena',
            role: 'Software Engineer',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
            quote: 'Nullam accumsan est rhoncus, tempor ligula in, efficitur sapien. Mauris nec erat efficitur, iaculis massa ac, molestie odio.',
            rating: 5,
        },
        {
            id: 5,
            name: 'Guy Hawkins',
            role: 'Product Manager',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            quote: 'Vivamus varius libero a libero accumsan facilisis. Felis pellentesque egestas neque, at mollis dui viverra in.',
            rating: 5,
        },
        {
            id: 6,
            name: 'Kristin Watson',
            role: 'Data Scientist',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
            quote: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
            rating: 5,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Responsive items per page calculation (4 on 2xl, 3 on xl/lg, 2 on md, 1 on sm/mobile down to 320px)
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1536) {
                setItemsPerPage(4);
            } else if (width >= 1024) {
                setItemsPerPage(3);
            } else if (width >= 640) {
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

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    return (
        <section className="w-full bg-[#F1F2F4]/60 py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] text-center mb-12 sm:mb-16 tracking-tight">
                    Clients Testimonial
                </h2>

                {/* Carousel Container with Side Navigation Arrows */}
                <div className="w-full relative flex items-center gap-4">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-md border border-gray-100 items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white transition-all duration-200 flex-shrink-0 z-10"
                        aria-label="Previous Testimonial"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>

                    {/* Testimonials Window */}
                    <div className="w-full overflow-hidden">
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 transition-transform duration-500 ease-out"
                        >
                            {testimonials
                                .slice(currentIndex, currentIndex + itemsPerPage)
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div>
                                            {/* 5 Stars */}
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <StarIcon key={i} className="w-5 h-5 text-[#FFAA00]" />
                                                ))}
                                            </div>

                                            {/* Quote Text */}
                                            <p className="text-xs sm:text-sm text-[#474C54] leading-relaxed font-normal mb-6 min-h-[72px]">
                                                "{item.quote}"
                                            </p>
                                        </div>

                                        {/* Author & Decorative Quote Mark */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100/60">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <img
                                                    src={item.avatar}
                                                    alt={item.name}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-100 flex-shrink-0"
                                                />
                                                <div className="flex flex-col min-w-0">
                                                    <h4 className="text-sm sm:text-base font-bold text-[#18191C] truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs text-[#767E94] truncate">{item.role}</p>
                                                </div>
                                            </div>

                                            {/* Double Quote Icon */}
                                            <span className="text-3xl sm:text-4xl font-serif text-blue-200/80 leading-none select-none font-bold">
                                                “
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-md border border-gray-100 items-center justify-center text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white transition-all duration-200 flex-shrink-0 z-10"
                        aria-label="Next Testimonial"
                    >
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation Controls & Pagination Dots */}
                <div className="flex items-center gap-4 mt-8">
                    {/* Mobile Prev */}
                    <button
                        onClick={handlePrev}
                        className="flex sm:hidden w-9 h-9 rounded-lg bg-white shadow-sm border border-gray-100 items-center justify-center text-[#0A65CC]"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(4, totalPages) }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`transition-all duration-300 ${
                                    Math.floor(currentIndex / itemsPerPage) === idx
                                        ? 'w-6 h-2 bg-[#0A65CC] rounded-full'
                                        : 'w-2 h-2 bg-blue-200 hover:bg-blue-300 rounded-full'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Mobile Next */}
                    <button
                        onClick={handleNext}
                        className="flex sm:hidden w-9 h-9 rounded-lg bg-white shadow-sm border border-gray-100 items-center justify-center text-[#0A65CC]"
                    >
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
