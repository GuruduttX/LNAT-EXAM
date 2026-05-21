"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

export default function StickyConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for future backend integration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Consultation Request:", formData);

    setIsSubmitting(false);
    setFormData({ name: "", phone: "" }); // Reset form
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A1320]/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      {/* Subtle premium light bloom */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C2A35E]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mb-5 border-b border-white/5 pb-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#C2A35E]" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C2A35E] uppercase">
            Academic Support
          </span>
        </div>
        <h3 className="font-serif text-xl text-[#F8F5EE] tracking-tight">
          Talk to an LNAT Mentor
        </h3>
        <p className="mt-2 text-xs font-light leading-relaxed text-[#7F8A99]">
          Get expert support for LNAT preparation and UK law admissions. Speak
          with our mentors for personalized guidance.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col gap-4"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#B8C1CC]"
          >
            Full Name <span className="text-[#C2A35E]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#050B14]/60 px-4 py-2.5 text-sm text-[#F8F5EE] placeholder:text-[#7F8A99]/40 focus:border-[#C2A35E]/50 focus:outline-none focus:ring-1 focus:ring-[#C2A35E]/50 transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#B8C1CC]"
          >
            Phone Number <span className="text-[#C2A35E]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#050B14]/60 px-4 py-2.5 text-sm text-[#F8F5EE] placeholder:text-[#7F8A99]/40 focus:border-[#C2A35E]/50 focus:outline-none focus:ring-1 focus:ring-[#C2A35E]/50 transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2A35E] px-4 py-3 text-sm font-medium text-[#050B14] transition-all hover:bg-[#E7D3A2] hover:shadow-[0_0_20px_rgba(194,163,94,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Book Consultation
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>
        <p className="mt-1 text-center text-[10px] font-light tracking-wide text-[#7F8A99]">
          Our mentors will contact you shortly.
        </p>
      </form>
    </motion.div>
  );
}
