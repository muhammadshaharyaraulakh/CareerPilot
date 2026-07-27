import React from 'react';

export default function PopularVacancies() {
    const vacancies = [
        { id: 1, title: 'Anesthesiologists', positions: '45,904 Open Positions' },
        { id: 2, title: 'Surgeons', positions: '50,364 Open Positions' },
        { id: 3, title: 'Obstetricians-Gynecologists', positions: '4,339 Open Positions' },
        { id: 4, title: 'Orthodontists', positions: '20,079 Open Positions' },
        { id: 5, title: 'Maxillofacial Surgeons', positions: '74,875 Open Positions' },
        { id: 6, title: 'Software Developer', positions: '43,359 Open Positions' },
        { id: 7, title: 'Psychiatrists', positions: '18,599 Open Positions' },
        { id: 8, title: 'Data Scientist', positions: '28,200 Open Positions', active: true },
        { id: 9, title: 'Financial Manager', positions: '61,391 Open Positions' },
        { id: 10, title: 'Management Analysis', positions: '93,046 Open Positions' },
        { id: 11, title: 'IT Manager', positions: '50,963 Open Positions' },
        { id: 12, title: 'Operations Research Analysis', positions: '16,627 Open Positions' },
    ];

    return (
        <section className="w-full bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18191C] mb-8 sm:mb-12 tracking-tight">
                    Most Popular Vacancies
                </h2>

                {/* Grid of Vacancies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-6 sm:gap-x-8">
                    {vacancies.map((vacancy) => (
                        <div
                            key={vacancy.id}
                            className="flex flex-col space-y-1.5 group cursor-pointer p-2 rounded-lg -mx-2 hover:bg-gray-50/80 transition-colors duration-150"
                        >
                            <h3
                                className={`text-base font-semibold transition-colors duration-200 ${
                                    vacancy.active
                                        ? 'text-[#0A65CC] underline underline-offset-4 decoration-[#0A65CC]'
                                        : 'text-[#18191C] group-hover:text-[#0A65CC]'
                                }`}
                            >
                                {vacancy.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#767E94] font-normal tracking-normal">
                                {vacancy.positions}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
