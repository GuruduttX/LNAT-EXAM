"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Download } from "lucide-react";
import StickyConsultationForm from "./StickyConsultationForm";

export default function StickySidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="w-full lg:sticky lg:top-24 flex flex-col gap-5"
    >
      {/* 1. Componentized Sticky Consultation Form */}
      <StickyConsultationForm />

      {/* 2. Small Resource Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111F] p-5 transition-colors hover:border-[#C2A35E]/30 shadow-lg">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#C2A35E]/10 blur-2xl transition-all group-hover:bg-[#C2A35E]/20 pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2A35E]/10 border border-[#C2A35E]/20 text-[#C2A35E]">
            <Download size={18} strokeWidth={1.5} />
          </div>
          <h4 className="mb-1.5 text-sm font-medium text-[#F8F5EE]">
            Free Admissions Checklist
          </h4>
          <p className="mb-4 text-xs font-light leading-relaxed text-[#7F8A99]">
            A comprehensive guide mapping the structural narrative of an elite
            application.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-[#C2A35E] transition-colors hover:text-[#E7D3A2]"
          >
            Download Now
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* 3. Mini Editorial CTA */}
      <a
        href="/universities"
        className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/10 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <Compass
            size={18}
            className="text-[#7F8A99] group-hover:text-[#C2A35E] transition-colors"
            strokeWidth={1.5}
          />
          <span className="text-sm font-medium text-[#B8C1CC] group-hover:text-[#F8F5EE] transition-colors">
            Explore Universities
          </span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#B8C1CC] transition-all group-hover:bg-[#C2A35E] group-hover:text-[#050B14]">
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </div>
      </a>
    </motion.aside>
  );
}
