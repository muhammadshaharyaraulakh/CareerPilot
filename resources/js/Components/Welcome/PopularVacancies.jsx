import React from 'react';
import { motion } from 'framer-motion';

const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
};

const vacancyItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function PopularVacancies({ categories = [] }) {
    const defaultVacancies = [
        { id: 1, title: 'Anesthesiologists', positions: '45,904 Open Positions' },
        { id: 2, title: 'Surgeons', positions: '50,364 Open Positions' },
        { id: 3, title: 'Obstetricians-Gynecologists', positions: '4,339 Open Positions' },
        { id: 4, title: 'Orthodontists', positions: '20,079 Open Positions' },
        { id: 5, title: 'Maxillofacial Surgeons', positions: '74,875 Open Positions' },
        { id: 6, title: 'Software Developer', positions: '43,359 Open Positions' },
        { id: 7, title: 'Psychiatrists', positions: '18,599 Open Positions' },
        { id: 8, title: 'Data Scientist', positions: '28,200 Open Positions' },
        { id: 9, title: 'Financial Manager', positions: '61,391 Open Positions' },
        { id: 10, title: 'Management Analysis', positions: '93,046 Open Positions' },
        { id: 11, title: 'IT Manager', positions: '50,963 Open Positions' },
        { id: 12, title: 'Operations Research Analysis', positions: '16,627 Open Positions' },
    ];

    const listToDisplay = categories && categories.length > 0
        ? categories.map((cat) => ({
            id: cat.id,
            title: cat.title,
            positions: `${(cat.jobs_count ?? 0).toLocaleString()} Open Positions`,
          }))
        : defaultVacancies;

    return (
        <section className="w-full bg-white py-10 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100/60 transition-colors">
            <div className="max-w-[1320px] mx-auto">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-tight lg:leading-[48px] text-gray-900 mb-8 sm:mb-12 tracking-tight text-center sm:text-left"
                >
                    Most Popular Vacancies
                </motion.h2>

                {/* Grid of Vacancies */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-y-7 gap-x-6 sm:gap-x-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-40px" }}
                    variants={gridContainerVariants}
                >
                    {listToDisplay.map((vacancy) => (
                        <motion.div
                            key={vacancy.id}
                            variants={vacancyItemVariants}
                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                            className="flex flex-col space-y-1 group cursor-pointer p-2 rounded-lg -mx-2 hover:bg-gray-50/80 transition-colors duration-150 items-center sm:items-start text-center sm:text-left"
                        >
                            <h3 className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 group-hover:text-[#0A65CC] transition-colors duration-200 self-center sm:self-start">
                                <span className="relative pb-0.5">
                                    {vacancy.title}
                                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#0A65CC] transition-all duration-300 ease-out group-hover:w-full" />
                                </span>
                            </h3>
                            <p className="text-[11px] sm:text-xs lg:text-sm text-[#767E94] font-normal tracking-normal">
                                {vacancy.positions}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

