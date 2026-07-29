import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import TopHeader from '../Components/Welcome/TopHeader';
import MainNavbar from '../Components/Welcome/MainNavbar';
import Footer from '../Components/Welcome/Footer';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function TermsOfService({ auth }) {
    const [activeSection, setActiveSection] = useState('terms-condition');

    const tocItems = [
        { id: 'terms-condition', number: '01', title: 'Terms & Condition' },
        { id: 'limitations', number: '02', title: 'Limitations' },
        { id: 'security', number: '03', title: 'Security' },
        { id: 'privacy-policy', number: '04', title: 'Privacy Policy' },
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (let i = tocItems.length - 1; i >= 0; i--) {
                const section = document.getElementById(tocItems[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(tocItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Terms & Condition - CareerPilot" />
            <div className="min-h-screen w-screen max-w-full overflow-x-hidden bg-white text-[#18191C] font-sans flex flex-col antialiased selection:bg-transparent selection:text-[#0A65CC]">
                {/* 1. Top Header Bar */}
                <TopHeader />

                {/* 2. Main Navigation Bar */}
                <MainNavbar auth={auth} />

                {/* 3. Sub-header Breadcrumb Bar */}
                <div className="w-full bg-[#F1F2F4] border-b border-[#E4E5E8] py-5 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[1320px] mx-auto flex items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-medium text-[#18191C] tracking-tight">
                            Terms & Condition
                        </h1>
                        <nav className="hidden min-[576px]:flex items-center gap-2 text-xs sm:text-sm text-[#767E94]">
                            <Link href="/" className="hover:text-[#0A65CC] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[#18191C] font-medium">Terms & Condition</span>
                        </nav>
                    </div>
                </div>

                {/* 4. Main Body Content Grid */}
                <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        
                        {/* Left Column: Terms Content */}
                        <div className="lg:col-span-8 xl:col-span-9 space-y-12 sm:space-y-16">
                            
                            {/* 01. Terms & Condition */}
                            <motion.section
                                id="terms-condition"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariants}
                                className="scroll-mt-28"
                            >
                                <h2 className="text-2xl sm:text-3xl font-medium text-[#18191C] tracking-tight mb-6 flex items-center gap-3">
                                    <span>01.</span> Terms & Condition
                                </h2>

                                <div className="space-y-4 text-sm sm:text-base text-[#5E6670] leading-relaxed">
                                    <p>
                                        Welcome to CareerPilot. By accessing or using our website, services, applications, and tools, you agree to be bound by these Terms of Service. Please read these terms carefully before registering an account or posting jobs on our platform. If you do not agree to all of these terms, you may not access or use CareerPilot.
                                    </p>
                                    <p>
                                        CareerPilot provides a digital recruitment network connecting job candidates with hiring organizations. You must be at least 18 years of age or possess legal parental consent in your jurisdiction to create an account and utilize our recruitment tools.
                                    </p>

                                    <ul className="space-y-3 pt-2 pl-1">
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                All account information submitted during registration must be truthful, accurate, complete, and updated promptly upon any change.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Employers agree not to post false, misleading, or deceptive job vacancies, nor demand application processing fees from job candidates.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Candidates agree that resumes, work histories, certifications, and portfolio links uploaded to CareerPilot are accurate representations of their skills.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Users are solely responsible for maintaining the confidentiality of their login credentials and for all activities under their account.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                CareerPilot reserves the right to suspend or terminate accounts that violate our community safety standards or engage in spamming.
                                            </span>
                                        </li>
                                    </ul>

                                    <p className="pt-2">
                                        CareerPilot grants users a non-exclusive, non-transferable, revocable license to access our platform strictly in accordance with these terms. Any unauthorized scraping, data mining, or commercial redistribution of job listings is strictly prohibited.
                                    </p>
                                </div>
                            </motion.section>

                            {/* 02. Limitations */}
                            <motion.section
                                id="limitations"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariants}
                                className="scroll-mt-28"
                            >
                                <h2 className="text-2xl sm:text-3xl font-medium text-[#18191C] tracking-tight mb-6 flex items-center gap-3">
                                    <span>02.</span> Limitations
                                </h2>

                                <div className="space-y-4 text-sm sm:text-base text-[#5E6670] leading-relaxed">
                                    <p>
                                        In no event shall CareerPilot, its parent company, directors, officers, or partners be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access our services.
                                    </p>
                                    <p>
                                        While we strive to ensure high availability and continuous server uptime, CareerPilot does not guarantee uninterrupted operation. Maintenance windows, software updates, or unexpected network disruptions may occur without prior notice.
                                    </p>

                                    <ul className="space-y-3 pt-2 pl-1">
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                CareerPilot does not endorse or guarantee the hiring decisions made by employers or the employment offers made to candidates.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                We are not responsible for verifying the complete background or credentials of third-party employers listing jobs on our platform.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Third-party links, corporate logos, or external career portals displayed on CareerPilot are provided for convenience only.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Total liability for any direct claim arising out of our services shall not exceed the amount paid by you to CareerPilot in the preceding six months.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Candidates and employers are encouraged to conduct independent due diligence prior to entering into any employment contract.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.section>

                            {/* 03. Security */}
                            <motion.section
                                id="security"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariants}
                                className="scroll-mt-28"
                            >
                                <h2 className="text-2xl sm:text-3xl font-medium text-[#18191C] tracking-tight mb-6 flex items-center gap-3">
                                    <span>03.</span> Security
                                </h2>

                                <div className="space-y-4 text-sm sm:text-base text-[#5E6670] leading-relaxed">
                                    <p>
                                        CareerPilot employs industry-standard encryption protocols, SSL secure connections, and modern database access controls to safeguard user account information and personal data against unauthorized access, loss, or alteration.
                                    </p>
                                    <p>
                                        Users must immediately notify our technical support team upon discovering any suspicious activity, account breach, or unauthorized access attempts. CareerPilot will never ask for your account password via unprompted email communications.
                                    </p>
                                </div>
                            </motion.section>

                            {/* 04. Privacy Policy */}
                            <motion.section
                                id="privacy-policy"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariants}
                                className="scroll-mt-28"
                            >
                                <h2 className="text-2xl sm:text-3xl font-medium text-[#18191C] tracking-tight mb-6 flex items-center gap-3">
                                    <span>04.</span> Privacy Policy
                                </h2>

                                <div className="space-y-4 text-sm sm:text-base text-[#5E6670] leading-relaxed">
                                    <p>
                                        Your privacy is fundamental to our service. CareerPilot collects personal information such as your name, email address, resume history, and job preferences solely to facilitate matching candidates with relevant employment opportunities.
                                    </p>
                                    <p>
                                        We do not sell your personal identification details to third-party marketing companies. Resume data uploaded to public candidate pools is visible only to verified employers registered on the CareerPilot network.
                                    </p>

                                    <ul className="space-y-3 pt-2 pl-1">
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Candidates maintain full control over profile visibility settings and can toggle their resume status between Public and Private at any time.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Cookies and session tokens are used strictly to preserve login state, security preferences, and language selections across sessions.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Users retain the right to request full export or permanent deletion of their account data in compliance with international privacy standards.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Employer analytics and job application performance metrics are aggregated anonymously to improve search recommendations.
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6670] mt-2.5 shrink-0" />
                                            <span>
                                                Any changes to our privacy practices will be communicated via email or prominent site notifications prior to taking effect.
                                            </span>
                                        </li>
                                    </ul>

                                    <p className="pt-2">
                                        If you have questions or concerns regarding our terms or privacy policy, please contact our support team at{' '}
                                        <a href="mailto:support@careerpilot.com" className="text-[#0A65CC] font-medium hover:underline">
                                            support@careerpilot.com
                                        </a>.
                                    </p>
                                </div>
                            </motion.section>

                        </div>

                        {/* Right Column: Sticky Table of Contents */}
                        <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                            <div className="sticky top-28 bg-white border border-[#E4E5E8] rounded-md p-6">
                                <h3 className="text-xs font-medium tracking-wider text-[#9199A3] mb-4">
                                    Table of Contents
                                </h3>

                                <ul className="space-y-3.5">
                                    {tocItems.map((item) => {
                                        const isActive = activeSection === item.id;
                                        return (
                                            <li key={item.id}>
                                                <button
                                                    type="button"
                                                    onClick={() => scrollToSection(item.id)}
                                                    className={`w-full text-left text-sm transition-colors duration-150 flex items-center gap-2 cursor-pointer ${
                                                        isActive
                                                            ? 'text-[#0A65CC] font-medium'
                                                            : 'text-[#5E6670] hover:text-[#18191C]'
                                                    }`}
                                                >
                                                    <span>{item.number}.</span>
                                                    <span>{item.title}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                    </div>
                </main>

                {/* 5. Dark Footer */}
                <Footer />
            </div>
        </>
    );
}
