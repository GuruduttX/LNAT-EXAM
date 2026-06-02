"use client";

import type { FormEventHandler } from "react";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Lock } from "lucide-react";
import { submitEnquiry } from "@/lib/submitEnquiry";

// Import the IResource interface you defined in ResourcesClient
import { IResource } from "./ResourcesClient";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: IResource | null;
}

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LeadCaptureModal({
  isOpen,
  onClose,
  resource,
}: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!resource || isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const leadPayload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      resource: {
        id: resource?.id || "",
        slug: resource?.slug || "",
        title: resource?.title || "",
        category: resource?.category || "",
        fileUrl: resource?.fileUrl || "",
      },
    };

    let downloadSucceeded = false;

    if (resource.fileUrl) {
      setIsSubmitting(true);
      setSubmitError("");

      const downloadLink = document.createElement("a");
      let objectUrl = "";
      let linkWasAttached = false;

      try {
        await submitEnquiry({
          ...leadPayload,
          enquiryType: "resource-download",
          source: "free-resources",
        });

        const response = await fetch(resource.fileUrl);
        if (!response.ok) {
          throw new Error("Unable to fetch resource file");
        }

        const fileBlob = await response.blob();
        objectUrl = URL.createObjectURL(fileBlob);

        downloadLink.href = objectUrl;
        downloadLink.download = `${resource.slug || "lnat-resource"}.${resource.fileFormat || "pdf"}`;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        linkWasAttached = true;
        downloadLink.click();
        downloadSucceeded = true;
      } catch (error) {
        console.error("Resource download failed:", error);
        setSubmitError("Unable to prepare the download. Please try again.");
      } finally {
        if (linkWasAttached) {
          document.body.removeChild(downloadLink);
        }
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
        setIsSubmitting(false);
      }
    }

    if (!resource.fileUrl) {
      setSubmitError("This resource file is currently unavailable.");
      return;
    }

    if (!downloadSucceeded) return;

    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && resource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Background Blur Overlay */}
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-[#0A1628]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
          >
            {/* Design System: Gold Top Accent Bar */}
            <div className="h-[4px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />

            {/* Dark Header Area */}
            <div className="relative bg-[#0D1B3E] px-6 py-8 text-center md:px-10">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#C9A84C]">
                <Lock size={18} />
              </div>

              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Secure Access
              </span>

              <h3 className="mb-2 text-[20px] font-bold leading-tight text-white md:text-[24px]">
                Unlock {resource.title}
              </h3>

              <p className="mx-auto max-w-sm text-[13px] leading-relaxed text-white/60">
                Provide your details to receive instant access to this curated
                resource directly to your inbox.
              </p>
            </div>

            {/* Form Area */}
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="mb-6 space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-black/[0.07] bg-[#F7F3EC] px-4 py-3.5 text-[13px] text-[#0D1B3E] outline-none transition-all duration-300 focus:border-[#C9A84C]/50 focus:bg-white focus:shadow-[0_4px_20px_rgba(201,168,76,0.1)] placeholder:text-slate-400"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-black/[0.07] bg-[#F7F3EC] px-4 py-3.5 text-[13px] text-[#0D1B3E] outline-none transition-all duration-300 focus:border-[#C9A84C]/50 focus:bg-white focus:shadow-[0_4px_20px_rgba(201,168,76,0.1)] placeholder:text-slate-400"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-black/[0.07] bg-[#F7F3EC] px-4 py-3.5 text-[13px] text-[#0D1B3E] outline-none transition-all duration-300 focus:border-[#C9A84C]/50 focus:bg-white focus:shadow-[0_4px_20px_rgba(201,168,76,0.1)] placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Design System Primary CTA */}
              {submitError ? (
                <p className="mb-4 text-center text-xs text-red-600">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
                }}
              >
                {isSubmitting ? "Preparing Download..." : "Request Access"}
              </button>

              <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Your information is securely encrypted.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
