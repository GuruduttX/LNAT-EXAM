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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative overflow-hidden rounded-2xl bg-[#0D1B3E] p-6 border border-[#C9A84C]/15 shadow-[0_16px_40px_rgba(13,27,62,0.2)]"
    >
      {/* Subtle premium gold bloom */}
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full pointer-events-none blur-3xl"
        style={{ background: "rgba(201,168,76,0.15)" }}
      />

      <div className="relative z-10 mb-6 border-b border-white/10 pb-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#C9A84C]" />
          <span className="text-[10px] font-bold tracking-[0.18em] text-[#C9A84C] uppercase">
            Academic Support
          </span>
        </div>
        <h3 className="font-bold text-[1.25rem] text-white tracking-tight">
          Talk to an LNAT Mentor
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-white/50">
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
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
          >
            Full Name <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/50 transition-colors"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
          >
            Phone Number <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white placeholder:text-white/30 focus:border-[#C9A84C]/50 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/50 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* Design System Primary CTA Button Pattern */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3 font-bold text-sm text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          style={{
            background:
              "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
            boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin text-[#0D1B3E]" />
              Submitting...
            </>
          ) : (
            <>
              Book Consultation
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        <p className="mt-1 text-center text-[11px] font-medium text-white/40">
          Our mentors will contact you shortly.
        </p>
      </form>
    </motion.div>
  );
}
