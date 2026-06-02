"use client";

import { useState, useEffect, type FormEventHandler } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { submitEnquiry } from "@/lib/submitEnquiry";
import type { EnquirySource } from "@/types/backend.types";

interface EnquiryPopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: EnquirySource;
}

export default function EnquiryPopupForm({
  isOpen,
  onClose,
  source = "navbar",
}: EnquiryPopupFormProps) {
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [submitError, setSubmitError] = useState("");

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Minimal Validation
    const newErrors = {
      name: name.trim() === "",
      phone: phone.trim() === "",
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitEnquiry({
        name,
        phone,
        email,
        message,
        enquiryType: "admissions-guidance",
        source,
      });

      onClose();

      // Reset form after close animation completes.
      setTimeout(() => {
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setErrors({ name: false, phone: false });
        setSubmitError("");
      }, 300);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit enquiry",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for smooth, cinematic feel
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
    },
  };

  const inputClass =
    "w-full border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-300 rounded-sm";
  const labelClass =
    "block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1.5";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-[#070B14]/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-105 bg-[#FDFCFB] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/50 rounded-sm z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Header */}
            <div className="pt-8 px-8 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A7B4F] mb-2 block">
                Admissions Support
              </span>
              <h2
                id="modal-headline"
                className="text-2xl font-serif text-slate-900 leading-tight mb-2"
              >
                Request Guidance
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect with our academic advisors to discuss your LNAT
                preparation and university admissions strategy.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="px-8 pb-8 flex flex-col gap-4"
            >
              {/* Name Input */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name{" "}
                  <span className="text-red-700/80 font-normal ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className={`${inputClass} ${errors.name ? "border-red-200 focus:border-red-400 focus:ring-1 focus:ring-red-400/30" : "border-slate-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F]/30"}`}
                  aria-invalid={errors.name}
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number{" "}
                  <span className="text-red-700/80 font-normal ml-0.5">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 90000 00000"
                  className={`${inputClass} ${errors.phone ? "border-red-200 focus:border-red-400 focus:ring-1 focus:ring-red-400/30" : "border-slate-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F]/30"}`}
                  aria-invalid={errors.phone}
                />
              </div>

              {/* Email Input (Optional) */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address{" "}
                  <span className="text-slate-400 font-normal normal-case tracking-normal ml-1">
                    (Optional)
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className={`${inputClass} border-slate-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F]/30`}
                />
              </div>

              {/* Message Textarea (Optional) */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  Your Query{" "}
                  <span className="text-slate-400 font-normal normal-case tracking-normal ml-1">
                    (Optional)
                  </span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your target universities or preparation status..."
                  rows={3}
                  className={`${inputClass} border-slate-200 focus:border-[#9A7B4F] focus:ring-1 focus:ring-[#9A7B4F]/30 resize-none`}
                />
              </div>

              {/* Submit Button */}
              {submitError ? (
                <p className="text-xs text-red-600">{submitError}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 mt-2 px-6 py-3 bg-[#070B14] text-[#FDFCFB] text-sm font-medium transition-all duration-300 hover:bg-[#131C2E] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/50 focus:ring-offset-2 focus:ring-offset-[#FDFCFB] disabled:opacity-70 disabled:cursor-not-allowed rounded-sm overflow-hidden"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </span>
                {!isSubmitting && (
                  <ArrowRight
                    className="relative z-10 w-4 h-4 text-[#9A7B4F] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
