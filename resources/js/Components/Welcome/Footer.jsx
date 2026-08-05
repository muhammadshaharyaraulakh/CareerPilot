import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const footerGridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

const footerColVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

function FooterLink({ href = "#", children }) {
    const isInternal = href && href !== '#';
    return (
        <li>
            {isInternal ? (
                <Link
                    href={href}
                    className="group flex items-center text-[#767E94] hover:text-white font-normal text-xs sm:text-sm transition-colors duration-200"
                >
                    <ArrowRightIcon className="w-0 h-3.5 mr-0 opacity-0 group-hover:w-3.5 group-hover:mr-2 group-hover:opacity-100 transition-all duration-200 ease-in-out shrink-0 text-white" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">{children}</span>
                </Link>
            ) : (
                <a
                    href={href}
                    className="group flex items-center text-[#767E94] hover:text-white font-normal text-xs sm:text-sm transition-colors duration-200"
                >
                    <ArrowRightIcon className="w-0 h-3.5 mr-0 opacity-0 group-hover:w-3.5 group-hover:mr-2 group-hover:opacity-100 transition-all duration-200 ease-in-out shrink-0 text-white" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">{children}</span>
                </a>
            )}
        </li>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#18191C] text-white pt-12 sm:pt-16 lg:pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* 5-Column Grid on Desktop, 2 on Tablet, 1 on Mobile down to 320px */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 lg:pb-16 border-b border-gray-800/80"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-40px" }}
                    variants={footerGridVariants}
                >
                    {/* Col 1: Brand & Contact */}
                    <motion.div variants={footerColVariants} className="lg:col-span-1 flex flex-col">
                        {/* MainNavbar Logo adapted for Dark Background */}
                        <a href="/" className="flex items-center shrink-0 mb-5 group w-fit">
                            <svg width="143" height="40" viewBox="0 0 143 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 sm:h-10 w-auto group-hover:scale-105 transition-transform duration-200">
                                <g clipPath="url(#clip0_footer_logo)">
                                    <path d="M33.7512 11.25H6.25122C5.56086 11.25 5.00122 11.8096 5.00122 12.5V32.5C5.00122 33.1904 5.56086 33.75 6.25122 33.75H33.7512C34.4416 33.75 35.0012 33.1904 35.0012 32.5V12.5C35.0012 11.8096 34.4416 11.25 33.7512 11.25Z" stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25" stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M35.0013 19.7358C30.4424 22.3734 25.2669 23.7583 20 23.75C14.734 23.7583 9.55941 22.3739 5.00104 19.7371" stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18.125 18.75H21.875" stroke="#0A65CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <path d="M56.608 11.5455H59.7443V23.8182C59.7386 24.9432 59.5 25.9119 59.0284 26.7244C58.5568 27.5312 57.8977 28.1534 57.0511 28.5909C56.2102 29.0227 55.2301 29.2386 54.1108 29.2386C53.0881 29.2386 52.1676 29.0568 51.3494 28.6932C50.5369 28.3239 49.892 27.7784 49.4148 27.0568C48.9375 26.3352 48.6989 25.4375 48.6989 24.3636H51.8438C51.8494 24.8352 51.9517 25.2415 52.1506 25.5824C52.3551 25.9233 52.6364 26.1847 52.9943 26.3665C53.3523 26.5483 53.7642 26.6392 54.2301 26.6392C54.7358 26.6392 55.1648 26.5341 55.517 26.3239C55.8693 26.108 56.1364 25.7898 56.3182 25.3693C56.5057 24.9489 56.6023 24.4318 56.608 23.8182V11.5455ZM68.7486 29.2557C67.4702 29.2557 66.3622 28.9744 65.4247 28.4119C64.4872 27.8494 63.7599 27.0625 63.2429 26.0511C62.7315 25.0398 62.4759 23.858 62.4759 22.5057C62.4759 21.1534 62.7315 19.9687 63.2429 18.9517C63.7599 17.9347 64.4872 17.1449 65.4247 16.5824C66.3622 16.0199 67.4702 15.7386 68.7486 15.7386C70.027 15.7386 71.1349 16.0199 72.0724 16.5824C73.0099 17.1449 73.7344 17.9347 74.2457 18.9517C74.7628 19.9687 75.0213 21.1534 75.0213 22.5057C75.0213 23.858 74.7628 25.0398 74.2457 26.0511C73.7344 27.0625 73.0099 27.8494 72.0724 28.4119C71.1349 28.9744 70.027 29.2557 68.7486 29.2557ZM68.7656 26.7841C69.4588 26.7841 70.0384 26.5937 70.5043 26.2131C70.9702 25.8267 71.3168 25.3097 71.544 24.6619C71.777 24.0142 71.8935 23.2926 71.8935 22.4972C71.8935 21.696 71.777 20.9716 71.544 20.3239C71.3168 19.6705 70.9702 19.1506 70.5043 18.7642C70.0384 18.3778 69.4588 18.1847 68.7656 18.1847C68.0554 18.1847 67.4645 18.3778 66.9929 18.7642C66.527 19.1506 66.1776 19.6705 65.9446 20.3239C65.7173 20.9716 65.6037 21.696 65.6037 22.4972C65.6037 23.2926 65.7173 24.0142 65.9446 24.6619C66.1776 25.3097 66.527 25.8267 66.9929 26.2131C67.4645 26.5937 68.0554 26.7841 68.7656 26.7841ZM77.7763 29V11.5455H80.8615V18.0739H80.9893C81.1484 17.7557 81.3729 17.4176 81.6626 17.0597C81.9524 16.696 82.3445 16.3864 82.8388 16.1307C83.3331 15.8693 83.9638 15.7386 84.7308 15.7386C85.7422 15.7386 86.6541 15.9972 87.4666 16.5142C88.2848 17.0256 88.9325 17.7841 89.4098 18.7898C89.8928 19.7898 90.1342 21.017 90.1342 22.4716C90.1342 23.9091 89.8984 25.1307 89.4268 26.1364C88.9553 27.142 88.3132 27.9091 87.5007 28.4375C86.6882 28.9659 85.7678 29.2301 84.7393 29.2301C83.9893 29.2301 83.3672 29.1051 82.8729 28.8551C82.3786 28.6051 81.9808 28.304 81.6797 27.9517C81.3842 27.5937 81.1541 27.2557 80.9893 26.9375H80.8104V29H77.7763ZM80.8018 22.4545C80.8018 23.3011 80.9212 24.0426 81.1598 24.679C81.4041 25.3153 81.7536 25.8125 82.2081 26.1705C82.6683 26.5227 83.2251 26.6989 83.8786 26.6989C84.5604 26.6989 85.1314 26.517 85.5916 26.1534C86.0518 25.7841 86.3984 25.2812 86.6314 24.6449C86.87 24.0028 86.9893 23.2727 86.9893 22.4545C86.9893 21.642 86.8729 20.9205 86.6399 20.2898C86.407 19.6591 86.0604 19.1648 85.6001 18.8068C85.1399 18.4489 84.5661 18.2699 83.8786 18.2699C83.2195 18.2699 82.6598 18.4432 82.1996 18.7898C81.7393 19.1364 81.3899 19.6222 81.1513 20.2472C80.9183 20.8722 80.8018 21.608 80.8018 22.4545ZM92.7571 33.9091V15.9091H95.7912V18.0739H95.9702C96.1293 17.7557 96.3537 17.4176 96.6435 17.0597C96.9332 16.696 97.3253 16.3864 97.8196 16.1307C98.3139 15.8693 98.9446 15.7386 99.7116 15.7386C100.723 15.7386 101.635 15.9972 102.447 16.5142C103.266 17.0256 103.913 17.7841 104.391 18.7898C104.874 19.7898 105.115 21.017 105.115 22.4716C105.115 23.9091 104.879 25.1307 104.408 26.1364C103.936 27.142 103.294 27.9091 102.482 28.4375C101.669 28.9659 100.749 29.2301 99.7202 29.2301C98.9702 29.2301 98.348 29.1051 97.8537 28.8551C97.3594 28.6051 96.9616 28.304 96.6605 27.9517C96.3651 27.5937 96.1349 27.2557 95.9702 26.9375H95.8423V33.9091H92.7571ZM95.7827 22.4545C95.7827 23.3011 95.902 24.0426 96.1406 24.679C96.3849 25.3153 96.7344 25.8125 97.1889 26.1705C97.6491 26.5227 98.206 26.6989 98.8594 26.6989C99.5412 26.6989 100.112 26.517 100.572 26.1534C101.033 25.7841 101.379 25.2812 101.612 24.6449C101.851 24.0028 101.97 23.2727 101.97 22.4545C101.97 21.642 101.854 20.9205 101.621 20.2898C101.388 19.6591 101.041 19.1648 100.581 18.8068C100.121 18.4489 99.5469 18.2699 98.8594 18.2699C98.2003 18.2699 97.6406 18.4432 97.1804 18.7898C96.7202 19.1364 96.3707 19.6222 96.1321 20.2472C95.8991 20.8722 95.7827 21.608 95.7827 22.4545ZM107.757 29V15.9091H110.842V29H107.757ZM109.308 14.0511C108.82 14.0511 108.399 13.8892 108.047 13.5653C107.695 13.2358 107.518 12.8409 107.518 12.3807C107.518 11.9148 107.695 11.5199 108.047 11.196C108.399 10.8665 108.82 10.7017 109.308 10.7017C109.803 10.7017 110.223 10.8665 110.57 11.196C110.922 11.5199 111.098 11.9148 111.098 12.3807C111.098 12.8409 110.922 13.2358 110.57 13.5653C110.223 13.8892 109.803 14.0511 109.308 14.0511ZM117.1 11.5455V29H114.015V11.5455H117.1ZM125.983 29.2557C124.705 29.2557 123.597 28.9744 122.659 28.4119C121.722 27.8494 120.994 27.0625 120.477 26.0511C119.966 25.0398 119.71 23.858 119.71 22.5057C119.71 21.1534 119.966 19.9687 120.477 18.9517C120.994 17.9347 121.722 17.1449 122.659 16.5824C123.597 16.0199 124.705 15.7386 125.983 15.7386C127.261 15.7386 128.369 16.0199 129.307 16.5824C130.244 17.1449 130.969 17.9347 131.48 18.9517C131.997 19.9687 132.256 21.1534 132.256 22.5057C132.256 23.858 131.997 25.0398 131.48 26.0511C130.969 27.0625 130.244 27.8494 129.307 28.4119C128.369 28.9744 127.261 29.2557 125.983 29.2557ZM126 26.7841C126.693 26.7841 127.273 26.5937 127.739 26.2131C128.205 25.8267 128.551 25.3097 128.778 24.6619C129.011 24.0142 129.128 23.2926 129.128 22.4972C129.128 21.696 129.011 20.9716 128.778 20.3239C128.551 19.6705 128.205 19.1506 127.739 18.7642C127.273 18.3778 126.693 18.1847 126 18.1847C125.29 18.1847 124.699 18.3778 124.227 18.7642C123.761 19.1506 123.412 19.6705 123.179 20.3239C122.952 20.9716 122.838 21.696 122.838 22.4972C122.838 23.2926 122.952 24.0142 123.179 24.6619C123.412 25.3097 123.761 25.8267 124.227 26.2131C124.699 26.5937 125.29 26.7841 126 26.7841ZM141.411 15.9091V18.2955H133.886V15.9091H141.411ZM135.744 12.7727H138.829V25.0625C138.829 25.4773 138.891 25.7955 139.016 26.017C139.147 26.233 139.317 26.3807 139.528 26.4602C139.738 26.5398 139.971 26.5795 140.227 26.5795C140.42 26.5795 140.596 26.5653 140.755 26.5369C140.92 26.5085 141.045 26.483 141.13 26.4602L141.65 28.8722C141.485 28.929 141.249 28.9915 140.942 29.0597C140.641 29.1278 140.272 29.1676 139.835 29.179C139.062 29.2017 138.366 29.0852 137.746 28.8295C137.127 28.5682 136.636 28.1648 136.272 27.6193C135.914 27.0739 135.738 26.392 135.744 25.5739V12.7727Z" fill="#FFFFFF"/>
                                <defs>
                                    <clipPath id="clip0_footer_logo">
                                        <rect width="40" height="40" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>

                        {/* Call Now */}
                        <p className="text-[#767E94] text-xs sm:text-sm mb-3">
                            Call now:{' '}
                            <span className="text-white font-medium hover:text-[#0A65CC] transition-colors cursor-pointer">
                                (319) 555-0115
                            </span>
                        </p>

                        {/* Address */}
                        <p className="text-[#767E94] text-xs sm:text-sm leading-relaxed max-w-xs mt-1 sm:mt-2">
                            6391 Elgin St. Celina, Delaware 10299, New York, United States of America
                        </p>
                    </motion.div>

                    {/* Col 2: Quick Link */}
                    <motion.div variants={footerColVariants} className="flex flex-col">
                        <h4 className="text-white text-base font-semibold mb-4 sm:mb-5 tracking-wide">Quick Link</h4>
                        <ul className="flex flex-col gap-3">
                            <FooterLink href="/About">About</FooterLink>
                            <FooterLink href="/Contact">Contact</FooterLink>
                            <FooterLink href="/AllBlogs">Blog</FooterLink>
                        </ul>
                    </motion.div>

                    {/* Col 3: Candidate */}
                    <motion.div variants={footerColVariants} className="flex flex-col">
                        <h4 className="text-white text-base font-semibold mb-4 sm:mb-5 tracking-wide">Candidate</h4>
                        <ul className="flex flex-col gap-3">
                            <FooterLink href="/FindJob">Browse Jobs</FooterLink>
                            <FooterLink href="/FindEmployers">Browse Employers</FooterLink>
                            <FooterLink href="/CandidateDashboard">Candidate Dashboard</FooterLink>
                        </ul>
                    </motion.div>

                    {/* Col 4: Employers */}
                    <motion.div variants={footerColVariants} className="flex flex-col">
                        <h4 className="text-white text-base font-semibold mb-4 sm:mb-5 tracking-wide">Employers</h4>
                        <ul className="flex flex-col gap-3">
                            <FooterLink href="/FindJob">Post a Job</FooterLink>
                            <FooterLink href="/FindEmployers">Browse Candidates</FooterLink>
                            <FooterLink href="/CompanyDashboard">Employers Dashboard</FooterLink>
                        </ul>
                    </motion.div>

                    {/* Col 5: Support */}
                    <motion.div variants={footerColVariants} className="flex flex-col">
                        <h4 className="text-white text-base font-semibold mb-4 sm:mb-5 tracking-wide">Support</h4>
                        <ul className="flex flex-col gap-3">
                            <FooterLink href="/Faq">Faqs</FooterLink>
                            <FooterLink href="/TermsOfService">Terms & Conditions</FooterLink>
                        </ul>
                    </motion.div>

                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#5E6670]"
                >
                    <p className="text-center sm:text-left">
                        @ 2021 Jobpilot - Job Portal. All rights Reserved
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-5 text-[#767E94]">
                        {/* Facebook */}
                        <a href="#" className="hover:text-white transition-colors duration-150" aria-label="Facebook">
                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a href="#" className="hover:text-white transition-colors duration-150" aria-label="YouTube">
                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="#" className="hover:text-white transition-colors duration-150" aria-label="Instagram">
                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* Twitter */}
                        <a href="#" className="hover:text-white transition-colors duration-150" aria-label="Twitter">
                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

