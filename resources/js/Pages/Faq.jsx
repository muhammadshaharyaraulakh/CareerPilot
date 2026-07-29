import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import MainNavbar from '@/Components/Welcome/MainNavbar';
import Footer from '@/Components/Welcome/Footer';

// Expanded FAQ Data Structure (6+ questions per section)
const faqData = [
    {
        category: 'Your Account',
        items: [
            {
                id: 'acc-1',
                question: 'How do I create a candidate or employer account on CareerPilot?',
                answer: 'Click the Sign In or Register button in the top navigation bar. Choose whether you are registering as a Job Seeker or an Employer, fill in your required details, and verify your email address to activate your account instantly.',
            },
            {
                id: 'acc-2',
                question: 'How can I reset my account password if I forget it?',
                answer: 'On the login screen, click the Forgot Password link. Enter your registered email address, and we will send you a secure password reset link to create a new password safely.',
            },
            {
                id: 'acc-3',
                question: 'Can I change my registered email address or phone number?',
                answer: 'Yes. Navigate to your Account Settings from the top right profile menu. Update your personal details and click Save Changes to update your account information.',
            },
            {
                id: 'acc-4',
                question: 'How do I delete or deactivate my account permanently?',
                answer: 'You can deactivate your account from the Profile Settings section under Danger Zone. Deactivating your account will hide your profile and stored data from public searches.',
            },
            {
                id: 'acc-5',
                question: 'How can I enable two factor authentication for added security?',
                answer: 'Go to your Account Security settings, toggle Two Factor Authentication, and scan the QR code using your preferred authenticator app to secure your login.',
            },
            {
                id: 'acc-6',
                question: 'Can I switch my account type from candidate to employer?',
                answer: 'Account types are optimized for specific workflows. If you need employer capabilities, you can register a separate employer profile or contact support for account migration assistance.',
            },
        ],
    },
    {
        category: 'Employers and Jobs',
        items: [
            {
                id: 'emp-1',
                question: 'How do I post a new job vacancy on CareerPilot?',
                answer: 'Log in to your Employer Dashboard and click the Post A Job button. Enter the job title, job description, required skills, salary range, and location details, then submit your posting to go live immediately.',
            },
            {
                id: 'emp-2',
                question: 'How long does a job posting remain active on the platform?',
                answer: 'Standard job postings remain active for thirty days from the date of publication. Employers can renew, edit, or close job listings at any time directly from the dashboard.',
            },
            {
                id: 'emp-3',
                question: 'How can I review and manage candidate applications?',
                answer: 'Employers can access the Applications tab in their dashboard to view candidate resumes, filter applications by status, download candidate profiles, and schedule interviews directly.',
            },
            {
                id: 'emp-4',
                question: 'Can I promote my job posting to feature it at the top?',
                answer: 'Yes! When posting or editing a job, select the Featured option to highlight your listing at the top of search results and attract up to five times more candidate views.',
            },
            {
                id: 'emp-5',
                question: 'How do I filter candidates by experience, location, and skills?',
                answer: 'Our smart candidate search allows you to filter applicant pools by experience level, location radius, key technical skills, and salary expectations to find ideal matches quickly.',
            },
            {
                id: 'emp-6',
                question: 'What payment methods are supported for employer subscriptions?',
                answer: 'We support all major credit/debit cards, PayPal, and invoice billing for enterprise teams. All transactions are securely processed with encryption.',
            },
        ],
    },
    {
        category: 'Candidate & Resume',
        items: [
            {
                id: 'cand-1',
                question: 'How do I upload and update my resume or CV?',
                answer: 'Go to your Candidate Dashboard and select Profile Settings. Under the Resume section, upload your latest resume in PDF or Word format to make it visible to top employers.',
            },
            {
                id: 'cand-2',
                question: 'Is my candidate profile visible to all registered employers?',
                answer: 'Yes, once your profile is set to public, verified employers can view your profile and resume when searching for candidates matching your skills and experience.',
            },
            {
                id: 'cand-3',
                question: 'How do I apply for featured job vacancies?',
                answer: 'Browse open positions on the Find Job page. When you find a suitable vacancy, click Apply Now to send your saved resume and a customized cover letter directly to the employer.',
            },
            {
                id: 'cand-4',
                question: 'Can I save job postings to review and apply later?',
                answer: 'Yes, click the bookmark icon on any job card to save it to your Saved Jobs collection in your candidate dashboard for quick access anytime.',
            },
            {
                id: 'cand-5',
                question: 'How do I set up job alerts for specific job titles or locations?',
                answer: 'From your candidate dashboard, create custom Job Alerts by specifying your desired job title, category, and preferred city. We will send matching opportunities straight to your inbox.',
            },
            {
                id: 'cand-6',
                question: 'Can I track the status of my submitted job applications?',
                answer: 'Yes, visit the My Applications page in your candidate dashboard to view real-time updates as employers review your application or invite you for interviews.',
            },
        ],
    },
];

export default function Faq({ auth }) {
    // Keep track of open accordion IDs. Open the first item by default.
    const [openId, setOpenId] = useState('acc-2');

    const toggleFaq = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <Head title="Frequently Asked Questions - CareerPilot" />

            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col justify-between antialiased selection:bg-[#0A65CC]/10 selection:text-[#0A65CC]">
                {/* 1. Main Navigation Bar Only */}
                <MainNavbar auth={auth} />

                {/* 2. Sub Header / Breadcrumb Bar */}
                <div className="w-full bg-[#F1F2F4] border-b border-[#E4E5E8] py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[1320px] mx-auto flex items-center justify-between">
                        <h1 className="text-lg sm:text-xl font-medium text-[#18191C]">
                            Frequently Asked Questions
                        </h1>
                        {/* Hidden on screens smaller than 576px */}
                        <nav className="hidden min-[576px]:flex items-center gap-2 text-xs sm:text-sm text-[#767E94]">
                            <Link href="/" className="hover:text-[#0A65CC] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[#18191C] font-medium">Faq</span>
                        </nav>
                    </div>
                </div>

                {/* 3. FAQ Content Sections */}
                <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto flex flex-col gap-10 sm:gap-14"
                    >
                        {faqData.map((section, sIdx) => (
                            <motion.div key={sIdx} variants={fadeInUp} className="flex flex-col gap-4">
                                <h2 className="text-xl sm:text-2xl font-medium text-[#18191C] tracking-tight">
                                    {section.category}
                                </h2>

                                <div className="flex flex-col gap-3">
                                    {section.items.map((item) => {
                                        const isOpen = openId === item.id;
                                        return (
                                            <div
                                                key={item.id}
                                                className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                                                    isOpen
                                                        ? 'bg-white border-[#0A65CC] shadow-sm'
                                                        : 'bg-white border-[#E4E5E8] hover:border-[#0A65CC]/40'
                                                }`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => toggleFaq(item.id)}
                                                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                                                >
                                                    <span
                                                        className={`text-sm sm:text-base font-normal transition-colors duration-200 ${
                                                            isOpen ? 'text-[#0A65CC]' : 'text-[#18191C]'
                                                        }`}
                                                    >
                                                        {item.question}
                                                    </span>

                                                    <span
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-base font-medium transition-transform duration-200 ${
                                                            isOpen
                                                                ? 'text-[#18191C] rotate-180'
                                                                : 'text-[#767E94]'
                                                        }`}
                                                    >
                                                        {isOpen ? '✕' : '+'}
                                                    </span>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                        >
                                                            <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5E6670] leading-relaxed border-t border-[#E4E5E8]/60 mt-1">
                                                                {item.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </main>

                {/* 4. Footer Component */}
                <Footer />
            </div>
        </>
    );
}
