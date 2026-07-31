import React, { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import DatePickerInput from "@/Components/CompanyProfile/DatePickerInput";

export default function PostAJobForm({ onJobPosted }) {
    const [jobTitle, setJobTitle] = useState("");
    const [tags, setTags] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");
    const [salaryType, setSalaryType] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [jobType, setJobType] = useState("");
    const [vacancies, setVacancies] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [jobLevel, setJobLevel] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [isRemote, setIsRemote] = useState(true);
    const [description, setDescription] = useState("");
    const [applyMethod, setApplyMethod] = useState("jobpilot");

    // Selectable Benefits Tags
    const [selectedBenefits, setSelectedBenefits] = useState([
        "Distributed Team",
        "Medical Insurance",
        "401k matching",
        "company retreats",
        "We hire old (and young)",
    ]);

    const benefitsList = [
        "401k Salary",
        "Distributed Team",
        "Async",
        "Vision Insurance",
        "Dental Insurance",
        "Medical Insurance",
        "Unlimited vacation",
        "4 day workweek",
        "401k matching",
        "company retreats",
        "Learning budget",
        "Free gym membership",
        "Pay in crypto",
        "Profit Sharing",
        "Equity Compensation",
        "No whiteboard interview",
        "No politics at work",
        "We hire old (and young)",
    ];

    const toggleBenefit = (benefit) => {
        if (selectedBenefits.includes(benefit)) {
            setSelectedBenefits(selectedBenefits.filter((b) => b !== benefit));
        } else {
            setSelectedBenefits([...selectedBenefits, benefit]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onJobPosted();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full bg-white font-sans text-[#18191C] space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#18191C]">
                    Post a job
                </h2>
            </div>

            {/* Section 1: Job Title & Roles */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                        Job Title
                    </label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Add job title, role, vacancies etc"
                        required
                        className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Tags
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Job keyword, tags etc"
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Job Role
                        </label>
                        <select
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Job Role</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="manager">Project Manager</option>
                            <option value="marketing">Marketing Specialist</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 2: Salary Information */}
            <div>
                <h3 className="text-sm font-bold text-[#18191C] mb-3">
                    Salary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Min Salary
                        </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                                placeholder="Minimum salary"
                                className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                            />
                            <span className="h-11 px-3 bg-[#F1F2F4] border border-l-0 border-[#E4E5E8] text-xs font-medium text-[#767E94] flex items-center shrink-0">
                                USD
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Max Salary
                        </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
                                placeholder="Maximum salary"
                                className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                            />
                            <span className="h-11 px-3 bg-[#F1F2F4] border border-l-0 border-[#E4E5E8] text-xs font-medium text-[#767E94] flex items-center shrink-0">
                                USD
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Salary Type
                        </label>
                        <select
                            value={salaryType}
                            onChange={(e) => setSalaryType(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Salary Type</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="hourly">Hourly</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 3: Advance Information */}
            <div>
                <h3 className="text-sm font-bold text-[#18191C] mb-3">
                    Advance Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Education
                        </label>
                        <select
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Education</option>
                            <option value="bachelors">Bachelors Degree</option>
                            <option value="masters">Masters Degree</option>
                            <option value="phd">PhD</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Experience
                        </label>
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Experience</option>
                            <option value="entry">Fresh / Entry Level</option>
                            <option value="mid">1 to 3 Years</option>
                            <option value="senior">5+ Years</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Job Type
                        </label>
                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Job Type</option>
                            <option value="fulltime">Full Time</option>
                            <option value="parttime">Part Time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Vacancies
                        </label>
                        <select
                            value={vacancies}
                            onChange={(e) => setVacancies(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Vacancies</option>
                            <option value="1">1 Position</option>
                            <option value="2">2 Positions</option>
                            <option value="5">5+ Positions</option>
                        </select>
                    </div>

                    {/* Expiration Date with Modern Date Picker */}
                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Expiration Date
                        </label>
                        <DatePickerInput
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            placeholder="Select Expiration Date"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Job Level
                        </label>
                        <select
                            value={jobLevel}
                            onChange={(e) => setJobLevel(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Job Level</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 4: Location Container */}
            <div className="bg-[#F8F9FA] p-5 sm:p-6 border border-[#E4E5E8] rounded-none space-y-4">
                <h3 className="text-sm font-bold text-[#18191C]">
                    Location
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            Country
                        </label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select Country</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                            City
                        </label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                        >
                            <option value="">Select City</option>
                            <option value="ny">New York</option>
                            <option value="sf">San Francisco</option>
                            <option value="ldn">London</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="remoteCheck"
                        checked={isRemote}
                        onChange={(e) => setIsRemote(e.target.checked)}
                        className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer rounded-none"
                    />
                    <label htmlFor="remoteCheck" className="text-xs sm:text-sm font-medium text-[#18191C] cursor-pointer">
                        Fully Remote Position - Worldwide
                    </label>
                </div>
            </div>

            {/* Section 5: Job Benefits */}
            <div>
                <h3 className="text-sm font-bold text-[#18191C] mb-3">
                    Job Benefits
                </h3>
                <div className="flex flex-wrap gap-2.5">
                    {benefitsList.map((benefit) => {
                        const isSelected = selectedBenefits.includes(benefit);
                        return (
                            <button
                                type="button"
                                key={benefit}
                                onClick={() => toggleBenefit(benefit)}
                                className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer rounded-none ${
                                    isSelected
                                        ? "bg-white text-[#0A65CC] border-[#0A65CC] font-semibold"
                                        : "bg-[#F1F2F4] text-[#5E6670] border-transparent hover:bg-[#E4E5E8]"
                                }`}
                            >
                                {benefit}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Section 6: Job Description (Toolbar removed, FileText icon added) */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-[#0A65CC]" />
                    <h3 className="text-sm font-bold text-[#18191C]">
                        Job Description
                    </h3>
                </div>
                <div className="border border-[#E4E5E8] rounded-none bg-white">
                    <textarea
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add your job description"
                        required
                        className="w-full p-4 text-xs sm:text-sm bg-white rounded-none border-none focus:outline-none text-[#18191C] resize-y"
                    />
                </div>
            </div>

            {/* Section 7: Apply Job on */}
            <div className="bg-[#F8F9FA] p-5 sm:p-6 border border-[#E4E5E8] rounded-none space-y-4">
                <h3 className="text-sm font-bold text-[#18191C]">
                    Apply Job on:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                        onClick={() => setApplyMethod("jobpilot")}
                        className={`p-4 bg-white border transition-all cursor-pointer rounded-none ${
                            applyMethod === "jobpilot"
                                ? "border-[#0A65CC] ring-1 ring-[#0A65CC]"
                                : "border-[#E4E5E8]"
                        }`}
                    >
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <input
                                type="radio"
                                name="applyMethod"
                                checked={applyMethod === "jobpilot"}
                                onChange={() => setApplyMethod("jobpilot")}
                                className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-bold text-[#18191C]">
                                On Jobpilot
                            </span>
                        </div>
                        <p className="text-[11px] text-[#767E94] leading-normal pl-6">
                            Candidate will apply job using jobpilot and all application will show on your dashboard.
                        </p>
                    </div>

                    <div
                        onClick={() => setApplyMethod("external")}
                        className={`p-4 bg-white border transition-all cursor-pointer rounded-none ${
                            applyMethod === "external"
                                ? "border-[#0A65CC] ring-1 ring-[#0A65CC]"
                                : "border-[#E4E5E8]"
                        }`}
                    >
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <input
                                type="radio"
                                name="applyMethod"
                                checked={applyMethod === "external"}
                                onChange={() => setApplyMethod("external")}
                                className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-bold text-[#18191C]">
                                External Platform
                            </span>
                        </div>
                        <p className="text-[11px] text-[#767E94] leading-normal pl-6">
                            Candidate apply job on your website, all application on your own website.
                        </p>
                    </div>

                    <div
                        onClick={() => setApplyMethod("email")}
                        className={`p-4 bg-white border transition-all cursor-pointer rounded-none ${
                            applyMethod === "email"
                                ? "border-[#0A65CC] ring-1 ring-[#0A65CC]"
                                : "border-[#E4E5E8]"
                        }`}
                    >
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <input
                                type="radio"
                                name="applyMethod"
                                checked={applyMethod === "email"}
                                onChange={() => setApplyMethod("email")}
                                className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-bold text-[#18191C]">
                                On Your Email
                            </span>
                        </div>
                        <p className="text-[11px] text-[#767E94] leading-normal pl-6">
                            Candidate apply job on your email address, and all application in your email.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Action Submit Button */}
            <div className="pt-2">
                <button
                    type="submit"
                    className="h-12 px-8 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-md flex items-center gap-2.5 transition-all cursor-pointer"
                >
                    <span>Post Job</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
}
