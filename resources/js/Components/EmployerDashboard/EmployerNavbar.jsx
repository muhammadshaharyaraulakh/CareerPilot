import React from "react";
import { Link } from "@inertiajs/react";
import { Bell } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function EmployerNavbar({ userCompany = "Instagram" }) {
    return (
        <header className="w-full bg-white border-b border-[#E4E5E8] py-3.5 px-4 sm:px-6 lg:px-8 relative z-40">
            <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <ApplicationLogo className="h-9 sm:h-10 w-auto text-[#0A65CC]" />
                </Link>

                {/* Right Action Icons & Buttons */}
                <div className="flex items-center gap-4 sm:gap-5">
                    {/* Bell Notification Icon with Red Badge */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative p-2 text-[#18191C] hover:text-[#0A65CC] hover:bg-[#F1F2F4] rounded-full transition-colors cursor-pointer"
                    >
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E05151] rounded-full ring-2 ring-white" />
                    </button>

                    {/* Post A Jobs Button */}
                    <Link
                        href="/post-job"
                        className="h-10 sm:h-11 px-4 sm:px-5 border-2 border-[#0A65CC] text-[#0A65CC] hover:bg-[#0A65CC] hover:text-white font-semibold text-xs sm:text-sm rounded-md transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    >
                        Post A Jobs
                    </Link>

                    {/* Company Avatar Badge (Instagram gradient / company logo) */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#FFB703] via-[#FF006E] to-[#8338EC] p-[2px] shadow-xs cursor-pointer shrink-0">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                                alt={userCompany}
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
