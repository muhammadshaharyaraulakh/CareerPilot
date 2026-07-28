import React from 'react';
import { motion } from 'framer-motion';

const stepContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const stepCardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.94 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function HowItWorks() {
    return (
        <section className="w-full bg-[#F1F2F4] py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 transition-colors">
            <div className="max-w-[1320px] mx-auto">
                {/* Section Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-tight lg:leading-[48px] text-gray-900 text-center mb-10 sm:mb-14 lg:mb-20 tracking-tight"
                >
                    How jobpilot work
                </motion.h2>

                {/* 4 Steps Grid Container */}
                <motion.div
                    className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-4 items-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-40px" }}
                    variants={stepContainerVariants}
                >
                    {/* Desktop Connecting Arrows Overlay (Icon-to-Icon Level) */}
                    <div className="hidden lg:block absolute inset-x-0 top-0 pointer-events-none z-0">
                        {/* Arrow 1: Step 1 -> Step 2 (Arching Up over icons) */}
                        <div className="absolute left-[17%] top-[2px] w-[140px] xl:w-[170px]">
                            <svg width="100%" viewBox="0 0 223 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.4">
                                    <path d="M0.749997 40.5582C0.749997 40.5582 43.7087 0.750009 108.627 0.750009C173.545 0.750009 216.504 40.5583 216.504 40.5583" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8"/>
                                    <path d="M216.041 28.2485C215.98 27.8381 215.598 27.5552 215.189 27.6166C214.781 27.6781 214.499 28.0606 214.561 28.471L216.041 28.2485ZM217.252 41.3412L217.358 42.0852C217.555 42.0572 217.733 41.9511 217.853 41.7905C217.972 41.6299 218.022 41.4281 217.992 41.2299L217.252 41.3412ZM204.2 42.4332C203.79 42.4912 203.506 42.8714 203.564 43.2823C203.622 43.6932 204.001 43.9792 204.411 43.9212L204.2 42.4332ZM214.561 28.471L216.512 41.4525L217.992 41.2299L216.041 28.2485L214.561 28.471ZM217.147 40.5972L204.2 42.4332L204.411 43.9212L217.358 42.0852L217.147 40.5972Z" fill="#0A65CC"/>
                                </g>
                            </svg>
                        </div>

                        {/* Arrow 2: Step 2 -> Step 3 (Arching Down between icons) */}
                        <div className="absolute left-[42%] top-[34px] w-[140px] xl:w-[170px]">
                            <svg width="100%" viewBox="0 0 223 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.4">
                                    <path d="M0.749997 8.19175C0.749997 8.19175 43.7087 48 108.627 48C173.545 48 216.504 8.19174 216.504 8.19174" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8"/>
                                    <path d="M216.041 20.5015C215.98 20.9119 215.598 21.1948 215.189 21.1334C214.781 21.0719 214.499 20.6894 214.561 20.279L216.041 20.5015ZM217.252 7.40878L217.358 6.66478C217.555 6.6928 217.733 6.79891 217.853 6.95951C217.972 7.12011 218.022 7.32191 217.992 7.52006L217.252 7.40878ZM204.2 6.31682C203.79 6.25878 203.506 5.87862 203.564 5.46772C203.622 5.05681 204.001 4.77077 204.411 4.82881L204.2 6.31682ZM214.561 20.279L216.512 7.2975L217.992 7.52006L216.041 20.5015L214.561 20.279ZM217.147 8.15279L204.2 6.31682L204.411 4.82881L217.358 6.66478L217.147 8.15279Z" fill="#0A65CC"/>
                                </g>
                            </svg>
                        </div>

                        {/* Arrow 3: Step 3 -> Step 4 (Arching Up over icons) */}
                        <div className="absolute left-[67%] top-[2px] w-[140px] xl:w-[170px]">
                            <svg width="100%" viewBox="0 0 223 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.4">
                                    <path d="M0.749997 40.5582C0.749997 40.5582 43.7087 0.750009 108.627 0.750009C173.545 0.750009 216.504 40.5583 216.504 40.5583" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8"/>
                                    <path d="M216.041 28.2485C215.98 27.8381 215.598 27.5552 215.189 27.6166C214.781 27.6781 214.499 28.0606 214.561 28.471L216.041 28.2485ZM217.252 41.3412L217.358 42.0852C217.555 42.0572 217.733 41.9511 217.853 41.7905C217.972 41.6299 218.022 41.4281 217.992 41.2299L217.252 41.3412ZM204.2 42.4332C203.79 42.4912 203.506 42.8714 203.564 43.2823C203.622 43.6932 204.001 43.9792 204.411 43.9212L204.2 42.4332ZM214.561 28.471L216.512 41.4525L217.992 41.2299L216.041 28.2485L214.561 28.471ZM217.147 40.5972L204.2 42.4332L204.411 43.9212L217.358 42.0852L217.147 40.5972Z" fill="#0A65CC"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    
                    {/* STEP 1: Create account */}
                    <motion.div variants={stepCardVariants} className="relative z-10 flex flex-col items-center text-center p-4 sm:p-6 group">
                        <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-105">
                            {/* Icon 1 SVG */}
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="white"/>
                                <g clipPath="url(#clip0_1647_31986_h)">
                                    <path opacity="0.2" d="M36 40C40.4183 40 44 36.4183 44 32C44 27.5817 40.4183 24 36 24C31.5817 24 28 27.5817 28 32C28 36.4183 31.5817 40 36 40Z" fill="#0A65CC"/>
                                    <path d="M42 27H48" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M45 24V30" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M23.8737 46.9988C25.1031 44.8708 26.8709 43.1037 28.9995 41.8752C31.1281 40.6467 33.5425 40 36.0002 40C38.4578 40 40.8722 40.6468 43.0008 41.8754C45.1294 43.1039 46.8971 44.871 48.1265 46.9991" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M43.5063 34.7728C42.9716 36.2167 42.0313 37.4754 40.7985 38.3979C39.5657 39.3203 38.0928 39.8672 36.5568 39.9728C35.0207 40.0784 33.4868 39.7383 32.1394 38.9933C30.7919 38.2483 29.6882 37.1301 28.9609 35.773C28.2335 34.416 27.9135 32.8778 28.0391 31.3432C28.1648 29.8086 28.7309 28.343 29.6693 27.1224C30.6077 25.9017 31.8787 24.978 33.3294 24.4621C34.7801 23.9463 36.3489 23.8602 37.8473 24.2144" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1647_31986_h">
                                        <rect width="32" height="32" fill="white" transform="translate(20 20)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Create account
                        </h3>
                        <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-[240px]">
                            Create your free account and complete your profile to start finding top career opportunities.
                        </p>
                    </motion.div>

                    {/* STEP 2: Upload/Create Resume */}
                    <motion.div variants={stepCardVariants} className="relative z-10 flex flex-col items-center text-center p-4 sm:p-6 group">
                        <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-105">
                            {/* Icon 2 SVG */}
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="#0A65CC"/>
                                <g clipPath="url(#clip0_1647_31998_h)">
                                    <path opacity="0.2" d="M30 35.9981C30 34.0202 30.5865 32.0868 31.6853 30.4423C32.7841 28.7979 34.3459 27.5161 36.1732 26.7593C38.0005 26.0024 40.0111 25.8043 41.9509 26.1902C43.8907 26.5761 45.6726 27.5285 47.0711 28.927C48.4696 30.3255 49.422 32.1073 49.8079 34.0471C50.1937 35.987 49.9957 37.9976 49.2388 39.8249C48.482 41.6521 47.2002 43.2139 45.5557 44.3127C43.9112 45.4116 41.9778 45.9981 40 45.9981H29C28.0073 45.9971 27.0262 45.785 26.1217 45.3758C25.2173 44.9667 24.4102 44.3698 23.754 43.6249C23.0978 42.88 22.6076 42.004 22.3159 41.0551C22.0242 40.1063 21.9376 39.1062 22.062 38.1213C22.1863 37.1364 22.5187 36.1892 23.0371 35.3426C23.5555 34.496 24.248 33.7694 25.0687 33.2109C25.8894 32.6524 26.8195 32.2749 27.7973 32.1033C28.7751 31.9318 29.7781 31.9702 30.7399 32.216" fill="#F1F2F4"/>
                                    <path d="M31.9993 45.998H28.9993C28.0066 45.9971 27.0255 45.785 26.121 45.3758C25.2165 44.9667 24.4094 44.3698 23.7533 43.6249C23.0971 42.88 22.6069 42.004 22.3152 41.0551C22.0235 40.1063 21.9369 39.1062 22.0612 38.1213C22.1856 37.1364 22.518 36.1892 23.0364 35.3426C23.5547 34.496 24.2473 33.7694 25.068 33.2109C25.8887 32.6524 26.8188 32.2749 27.7966 32.1033C28.7743 31.9318 29.7774 31.9702 30.7392 32.216" stroke="#F1F2F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M29.9993 35.998C29.9994 34.4136 30.3761 32.8518 31.0982 31.4415C31.8203 30.0312 32.8672 28.8126 34.1527 27.8862C35.4381 26.9599 36.9253 26.3522 38.4916 26.1133C40.0579 25.8744 41.6586 26.0112 43.1618 26.5123C44.6649 27.0134 46.0275 27.8644 47.1372 28.9954C48.2468 30.1264 49.0719 31.5048 49.5444 33.0172C50.0168 34.5296 50.1231 36.1326 49.8546 37.6941C49.586 39.2557 48.9502 40.731 47.9996 41.9986" stroke="#F1F2F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M34.7566 40.2408L38.9992 35.998L43.2418 40.2408" stroke="#F1F2F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M38.9993 45.998V35.998" stroke="#F1F2F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1647_31998_h">
                                        <rect width="32" height="32" fill="white" transform="translate(20 20)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Upload/Create Resume
                        </h3>
                        <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-[240px]">
                            Upload your existing resume or build a professional CV directly on our platform.
                        </p>
                    </motion.div>

                    {/* STEP 3: Find suitable job */}
                    <motion.div variants={stepCardVariants} className="relative z-10 flex flex-col items-center text-center p-4 sm:p-6 group">
                        <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-105">
                            {/* Icon 3 SVG (Fixed & Fully Unclipped) */}
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="white"/>
                                <path opacity="0.2" d="M34.4994 44.9995C40.2984 44.9995 44.9994 40.2985 44.9994 34.4995C44.9994 28.7005 40.2984 23.9995 34.4994 23.9995C28.7004 23.9995 23.9994 28.7005 23.9994 34.4995C23.9994 40.2985 28.7004 44.9995 34.4994 44.9995Z" fill="#0A65CC"/>
                                <path d="M30.4994 34.5H38.4994" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M34.4994 30.5V38.5" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M34.4994 44.9995C40.2984 44.9995 44.9994 40.2985 44.9994 34.4995C44.9994 28.7005 40.2984 23.9995 34.4994 23.9995C28.7004 23.9995 23.9994 28.7005 23.9994 34.4995C23.9994 40.2985 28.7004 44.9995 34.4994 44.9995Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M41.9236 41.9246L47.9987 47.9996" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Find suitable job
                        </h3>
                        <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-[240px]">
                            Search thousands of relevant job listings matched to your skills and preferences.
                        </p>
                    </motion.div>

                    {/* STEP 4: Apply job */}
                    <motion.div variants={stepCardVariants} className="relative z-10 flex flex-col items-center text-center p-4 sm:p-6 group">
                        <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-105">
                            {/* Icon 4 SVG */}
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="white"/>
                                <g clipPath="url(#clip0_1647_32022_h)">
                                    <path opacity="0.2" d="M26.8076 45.1924C25.6571 44.0419 26.4202 41.6265 25.8346 40.2111C25.2275 38.744 23 37.5631 23 36C23 34.4368 25.2276 33.256 25.8346 31.7888C26.4202 30.3735 25.6571 27.9581 26.8076 26.8076C27.9581 25.6571 30.3735 26.4202 31.7889 25.8346C33.256 25.2275 34.4369 23 36 23C37.5632 23 38.744 25.2276 40.2112 25.8346C41.6265 26.4202 44.0419 25.6571 45.1924 26.8076C46.3429 27.9581 45.5798 30.3735 46.1654 31.7889C46.7725 33.256 49 34.4369 49 36C49 37.5632 46.7724 38.744 46.1654 40.2112C45.5798 41.6265 46.3429 44.0419 45.1924 45.1924C44.0419 46.3429 41.6265 45.5798 40.2111 46.1654C38.744 46.7725 37.5631 49 36 49C34.4368 49 33.256 46.7724 31.7888 46.1654C30.3735 45.5798 27.9581 46.3429 26.8076 45.1924Z" fill="#0A65CC"/>
                                    <path d="M26.8076 45.1924C25.6571 44.0419 26.4202 41.6265 25.8346 40.2111C25.2275 38.744 23 37.5631 23 36C23 34.4368 25.2276 33.256 25.8346 31.7888C26.4202 30.3735 25.6571 27.9581 26.8076 26.8076C27.9581 25.6571 30.3735 26.4202 31.7889 25.8346C33.256 25.2275 34.4369 23 36 23C37.5632 23 38.744 25.2276 40.2112 25.8346C41.6265 26.4202 44.0419 25.6571 45.1924 26.8076C46.3429 27.9581 45.5798 30.3735 46.1654 31.7889C46.7725 33.256 49 34.4369 49 36C49 37.5632 46.7724 38.744 46.1654 40.2112C45.5798 41.6265 46.3429 44.0419 45.1924 45.1924C44.0419 46.3429 41.6265 45.5798 40.2111 46.1654C38.744 46.7725 37.5631 49 36 49C34.4368 49 33.256 46.7724 31.7888 46.1654C30.3735 45.5798 27.9581 46.3429 26.8076 45.1924Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M41.5 33L34.1666 40L30.5 36.5" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1647_32022_h">
                                        <rect width="32" height="32" fill="white" transform="translate(20 20)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            Apply job
                        </h3>
                        <p className="text-xs sm:text-sm text-[#767E94] leading-relaxed max-w-[240px]">
                            Apply with a single click and track your application status in real-time.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
