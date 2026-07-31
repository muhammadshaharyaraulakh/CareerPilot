import React, { useState } from "react";
import { X, CreditCard, ArrowRight, ShieldCheck, Calendar, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutModal({ isOpen, onClose, selectedPlan, onPaymentSuccess }) {
    const [selectedCardOption, setSelectedCardOption] = useState("existing");
    const [cardHolderName, setCardHolderName] = useState("Esther Howard");
    const [cardNumber, setCardNumber] = useState("5847 4920 1829 3840");
    const [expiryDate, setExpiryDate] = useState("12/28");
    const [cvc, setCvc] = useState("892");
    const [saveCardDetails, setSaveCardDetails] = useState(true);

    if (!isOpen) return null;

    const planName = selectedPlan?.name || "Premium";
    const planPrice = selectedPlan?.price || 59;

    const handleSubmitPayment = (e) => {
        e.preventDefault();
        onPaymentSuccess();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                {/* Backdrop Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Modal Dialog Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-3xl bg-white rounded-none shadow-2xl z-50 overflow-hidden border border-[#E4E5E8]"
                >
                    {/* Header Bar */}
                    <div className="p-5 sm:p-6 border-b border-[#E4E5E8] flex items-center justify-between bg-white">
                        <h3 className="text-lg sm:text-xl font-bold text-[#18191C]">
                            Checkout
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-[#767E94] hover:text-[#18191C] hover:bg-[#F1F2F4] rounded-none transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Content Body */}
                    <form onSubmit={handleSubmitPayment} className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                        {/* Left Payment System Form Column (7 cols) */}
                        <div className="lg:col-span-7 space-y-5">
                            <div>
                                <h4 className="text-sm font-bold text-[#18191C] mb-3">
                                    Payment System
                                </h4>

                                {/* Payment Method Tab (Debit or Credit Card - Visa / Mastercard) */}
                                <div className="flex items-center justify-between border-b border-[#E4E5E8] pb-2">
                                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A65CC] border-b-2 border-[#0A65CC] pb-2 px-1">
                                        <CreditCard className="w-4 h-4 text-[#0A65CC]" />
                                        <span>Debit or Credit Card</span>
                                    </div>
                                    <span className="text-[11px] text-[#767E94] font-medium">Visa / Mastercard</span>
                                </div>
                            </div>

                            {/* Card Option 1: Saved Card */}
                            <div
                                onClick={() => setSelectedCardOption("existing")}
                                className={`p-4 border transition-all cursor-pointer rounded-none flex items-center justify-between ${
                                    selectedCardOption === "existing"
                                        ? "border-[#0A65CC] bg-[#E8F1FF]/30"
                                        : "border-[#E4E5E8] hover:border-gray-300 bg-white"
                                }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        checked={selectedCardOption === "existing"}
                                        onChange={() => setSelectedCardOption("existing")}
                                        className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer"
                                    />
                                    <div className="flex items-center gap-2.5">
                                        <div className="px-2 py-0.5 bg-[#18191C] text-white text-[10px] font-bold uppercase rounded-none">
                                            Mastercard
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-[#18191C]">
                                                5847 **** **** ****
                                            </div>
                                            <div className="text-[11px] text-[#767E94]">
                                                Esther Howard
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Option 2: New Card */}
                            <div
                                onClick={() => setSelectedCardOption("new")}
                                className={`p-4 border transition-all cursor-pointer rounded-none flex items-center gap-3.5 ${
                                    selectedCardOption === "new"
                                        ? "border-[#0A65CC] bg-[#E8F1FF]/30"
                                        : "border-[#E4E5E8] hover:border-gray-300 bg-white"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentOption"
                                    checked={selectedCardOption === "new"}
                                    onChange={() => setSelectedCardOption("new")}
                                    className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer"
                                />
                                <span className="text-xs sm:text-sm font-semibold text-[#18191C]">
                                    New payment card
                                </span>
                            </div>

                            {/* Detailed Input Fields */}
                            <div className="space-y-4 pt-1">
                                {/* Card Holder Name Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Card Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        value={cardHolderName}
                                        onChange={(e) => setCardHolderName(e.target.value)}
                                        placeholder="Card Holder Name"
                                        required
                                        className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                                    />
                                </div>

                                {/* Card Number Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                        Card Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            placeholder="Card Number"
                                            required
                                            className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                                        />
                                        <CreditCard className="w-4 h-4 text-[#767E94] absolute left-3.5 top-3.5" />
                                    </div>
                                </div>

                                {/* Expiry Date & CVC Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                            Expiry Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                                placeholder="MM/YY"
                                                required
                                                className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                                            />
                                            <Calendar className="w-4 h-4 text-[#767E94] absolute left-3.5 top-3.5" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-[#18191C] mb-1.5">
                                            CVC
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value)}
                                                placeholder="CVC"
                                                required
                                                className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm bg-white border border-[#E4E5E8] rounded-none focus:outline-none focus:border-[#0A65CC] text-[#18191C]"
                                            />
                                            <Lock className="w-4 h-4 text-[#767E94] absolute left-3.5 top-3.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Card Details Checkbox */}
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="saveCardDetails"
                                        checked={saveCardDetails}
                                        onChange={(e) => setSaveCardDetails(e.target.checked)}
                                        className="w-4 h-4 text-[#0A65CC] focus:ring-0 cursor-pointer rounded-none"
                                    />
                                    <label htmlFor="saveCardDetails" className="text-xs font-medium text-[#5E6670] cursor-pointer">
                                        Save card details for future payments
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right Summary Column (5 cols) */}
                        <div className="lg:col-span-5 bg-[#F8F9FA] p-5 sm:p-6 border border-[#E4E5E8] rounded-none flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-[#18191C] mb-4 pb-2 border-b border-[#E4E5E8]">
                                    Summary
                                </h4>

                                <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
                                    <span className="text-[#5E6670]">Pricing Plan:</span>
                                    <span className="font-semibold text-[#18191C]">{planName}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs sm:text-sm mb-4 pb-4 border-b border-[#E4E5E8]">
                                    <span className="text-[#5E6670]">Subtotal:</span>
                                    <span className="font-semibold text-[#18191C]">${planPrice}.00</span>
                                </div>

                                <div className="flex items-baseline justify-between text-sm sm:text-base font-extrabold text-[#18191C] mb-6">
                                    <span>Total:</span>
                                    <span className="text-[#0A65CC] text-xl sm:text-2xl">${planPrice} USD</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    className="w-full py-3.5 px-4 bg-[#0A65CC] hover:bg-[#0851A8] text-white font-semibold text-xs sm:text-sm rounded-none border-none shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                                >
                                    <span>Choose Plan</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                {/* Perfectly Aligned Package Expiration Notice */}
                                <div className="p-3 bg-[#E8F1FF]/60 border border-[#0A65CC]/20 rounded-none text-center flex items-center justify-center gap-2 text-xs text-[#0A65CC] font-medium">
                                    <ShieldCheck className="w-4 h-4 shrink-0 text-[#0A65CC]" />
                                    <span>This package will expire after one month.</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
