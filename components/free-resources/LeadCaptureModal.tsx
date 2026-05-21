"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
// types/resources.ts (Optional: if you want to extract types)
import { LucideIcon } from "lucide-react";

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: ResourceItem | null;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  resource,
}: LeadCaptureModalProps) {
  if (!isOpen || !resource) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1c]/40 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg overflow-hidden bg-[#fdfbf7] shadow-2xl rounded-sm"
        >
          {/* Header */}
          <div className="bg-[#0a0f1c] px-8 py-10 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-[#c5a059] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Secure Access
            </span>
            <h3 className="text-2xl font-serif text-white mb-2">
              Unlock the {resource.title}
            </h3>
            <p className="text-white/70 text-sm font-light">
              Provide your details to receive instant access to this curated
              resource.
            </p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-[#0a0f1c] uppercase tracking-wider mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-[#0a0f1c] placeholder-gray-400 focus:border-[#c5a059] focus:outline-none focus:ring-0 transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-[#0a0f1c] uppercase tracking-wider mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-[#0a0f1c] placeholder-gray-400 focus:border-[#c5a059] focus:outline-none focus:ring-0 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-[#0a0f1c] uppercase tracking-wider mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-[#0a0f1c] placeholder-gray-400 focus:border-[#c5a059] focus:outline-none focus:ring-0 transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0a0f1c] text-white py-4 mt-4 text-sm tracking-widest uppercase hover:bg-[#c5a059] transition-colors duration-300"
            >
              Request Access
            </button>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider mt-4">
              Your information is securely encrypted and never shared.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
