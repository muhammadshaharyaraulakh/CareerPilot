import React from "react";
import { ArrowRight, MapPin, PhoneCall, Mail } from "lucide-react";

export default function ContactTab({ formData, updateFormData, onPrev, onComplete }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onComplete) {
            onComplete();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 sm:space-y-8">
            <div className="space-y-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#18191C]">
                    Contact Information
                </h3>

                {/* Map Location / Address */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="address" className="text-xs sm:text-sm font-medium text-[#18191C]">
                        Map Location or Office Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0A65CC]">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            placeholder="Enter office address or location"
                            className="w-full h-12 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                        />
                    </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-[#18191C]">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0A65CC]">
                                <PhoneCall className="w-4 h-4" />
                            </div>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className="w-full h-12 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs sm:text-sm font-medium text-[#18191C]">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0A65CC]">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full h-12 pl-10 pr-4 bg-white border border-[#E4E5E8] rounded-md text-xs sm:text-sm text-[#18191C] placeholder-[#9199A3] focus:outline-none focus:border-[#0A65CC] focus:ring-1 focus:ring-[#0A65CC] transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    type="button"
                    onClick={onPrev}
                    className="h-12 px-7 bg-[#E4E5E8]/60 hover:bg-[#E4E5E8] text-[#18191C] font-semibold text-xs sm:text-sm rounded-md transition-all inline-flex items-center justify-center cursor-pointer"
                >
                    Previous
                </button>

                <button
                    type="submit"
                    className="h-12 px-7 bg-[#0A65CC] hover:bg-[#0852A8] text-white font-semibold text-xs sm:text-sm rounded-md transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                    <span>Finish & Save</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
}
