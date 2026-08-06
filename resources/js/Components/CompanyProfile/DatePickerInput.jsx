import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DatePickerInput({ value, onChange, id, name, placeholder = "Select date", disabled = false, roundedNone = true, alignRight = false }) {
    const [isOpen, setIsOpen] = useState(false);

    // Parse initial date
    const parseInitialDate = (val) => {
        if (!val) return null;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d;
    };

    const [selectedDate, setSelectedDate] = useState(() => parseInitialDate(value));
    const [viewDate, setViewDate] = useState(() => parseInitialDate(value) || new Date());

    const containerRef = useRef(null);

    // Sync state if value prop changes externally
    useEffect(() => {
        const parsed = parseInitialDate(value);
        setSelectedDate(parsed);
        if (parsed) setViewDate(parsed);
    }, [value]);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Format date for UI display (dd/mm/yyyy)
    const formatDateDisplay = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Format date for state / input value (YYYY-MM-DD)
    const formatDateValue = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleDateSelect = (dayNum) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum);
        setSelectedDate(newDate);
        setIsOpen(false);
        if (onChange) {
            onChange({ target: { name, value: formatDateValue(newDate) } });
        }
    };

    const handleMonthChange = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const handleYearSelect = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setViewDate(new Date(newYear, viewDate.getMonth(), 1));
    };

    const handleMonthSelect = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setViewDate(new Date(viewDate.getFullYear(), newMonth, 1));
    };

    const handleToday = () => {
        const today = new Date();
        setSelectedDate(today);
        setViewDate(today);
        setIsOpen(false);
        if (onChange) {
            onChange({ target: { name, value: formatDateValue(today) } });
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        if (disabled) return;
        setSelectedDate(null);
        if (onChange) {
            onChange({ target: { name, value: "" } });
        }
    };

    // Date calculations
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const startOffset = (firstDayOfWeek + 6) % 7; // Monday start offset

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    // Year range choices from 1970 to 2040
    const yearOptions = [];
    for (let y = 1970; y <= 2040; y++) {
        yearOptions.push(y);
    }

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Input Trigger */}
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full h-12 px-4 border flex items-center justify-between transition-all ${
                    roundedNone ? "rounded-none" : "rounded-md"
                } ${
                    disabled
                        ? "bg-[#F1F2F4] border-[#E4E5E8] cursor-not-allowed text-[#9199A3]"
                        : isOpen
                        ? "bg-white border-[#0A65CC] ring-1 ring-[#0A65CC] cursor-pointer"
                        : "bg-white border-[#E4E5E8] hover:border-[#B0B7C3] cursor-pointer"
                }`}
            >
                <span className={`text-xs sm:text-sm ${selectedDate ? (disabled ? "text-[#9199A3]" : "text-[#18191C] font-medium") : "text-[#9199A8]"}`}>
                    {selectedDate ? formatDateDisplay(selectedDate) : placeholder}
                </span>

                <div className="flex items-center gap-2">
                    {selectedDate && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 text-[#9199A3] hover:text-[#E05151] rounded-full transition-colors"
                            title="Clear date"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                    <Calendar className={`w-4 h-4 ${disabled ? "text-[#9199A3]" : "text-[#0A65CC]"}`} />
                </div>
            </div>

            {/* Custom Modern Popover */}
            {isOpen && (
                <div className={`absolute mt-2 z-50 w-[calc(100vw-3.5rem)] sm:w-80 max-w-[320px] bg-white border border-[#E4E5E8] rounded-xl shadow-2xl p-4 animate-fadeIn ${
                    alignRight ? "right-0 left-auto" : "left-0"
                }`}>
                    {/* Header: Month & Year Selectors */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F1F2F4]">
                        <div className="flex items-center gap-1.5">
                            {/* Select Month */}
                            <select
                                value={currentMonth}
                                onChange={handleMonthSelect}
                                className="bg-[#F8F9FB] border border-[#E4E5E8] rounded-md px-2 py-1 text-xs font-semibold text-[#18191C] focus:outline-none focus:border-[#0A65CC] cursor-pointer"
                            >
                                {monthNames.map((m, idx) => (
                                    <option key={idx} value={idx}>{m}</option>
                                ))}
                            </select>

                            {/* Select Year */}
                            <select
                                value={currentYear}
                                onChange={handleYearSelect}
                                className="bg-[#F8F9FB] border border-[#E4E5E8] rounded-md px-2 py-1 text-xs font-semibold text-[#18191C] focus:outline-none focus:border-[#0A65CC] cursor-pointer"
                            >
                                {yearOptions.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => handleMonthChange(-1)}
                                className="p-1.5 hover:bg-[#F1F2F4] text-[#5E6670] rounded-md transition-colors"
                                title="Previous Month"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleMonthChange(1)}
                                className="p-1.5 hover:bg-[#F1F2F4] text-[#5E6670] rounded-md transition-colors"
                                title="Next Month"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {weekDays.map((d, idx) => (
                            <span key={idx} className="text-[11px] font-semibold text-[#767E94] py-1">
                                {d}
                            </span>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {/* Start Padding */}
                        {Array.from({ length: startOffset }).map((_, idx) => (
                            <div key={`empty-${idx}`} className="h-8" />
                        ))}

                        {/* Days List */}
                        {Array.from({ length: daysInMonth }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const isSelected =
                                selectedDate &&
                                selectedDate.getDate() === dayNum &&
                                selectedDate.getMonth() === currentMonth &&
                                selectedDate.getFullYear() === currentYear;

                            const isToday =
                                new Date().getDate() === dayNum &&
                                new Date().getMonth() === currentMonth &&
                                new Date().getFullYear() === currentYear;

                            return (
                                <button
                                    key={dayNum}
                                    type="button"
                                    onClick={() => handleDateSelect(dayNum)}
                                    className={`h-8 w-8 mx-auto flex items-center justify-center rounded-md text-xs font-medium transition-all ${
                                        isSelected
                                            ? "bg-[#0A65CC] text-white shadow-sm font-semibold scale-105"
                                            : isToday
                                            ? "bg-[#E8F1FF] text-[#0A65CC] font-bold border border-[#0A65CC]/30"
                                            : "text-[#18191C] hover:bg-[#F1F2F4]"
                                    }`}
                                >
                                    {dayNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer Links */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F1F2F4]">
                        <button
                            type="button"
                            onClick={handleToday}
                            className="text-xs font-semibold text-[#0A65CC] hover:text-[#0852A8] transition-colors"
                        >
                            Today
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-medium text-[#767E94] hover:text-[#18191C] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
