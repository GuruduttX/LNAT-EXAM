"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// --- Types ---

export interface OverviewCardProps {
  /** The primary heading of the card */
  title: string;
  /** The body text of the card */
  description: string;
  /** Optional icon to display at the top left */
  icon?: ReactNode;
  /** Optional small badge text (e.g., "LNAT REQUIRED", "KEY METRIC") */
  badge?: string;
  /** Optional delay for staggered entrance animations */
  delay?: number;
  /** Optional class name to override or extend styles */
  className?: string;
}

// --- Component ---

export default function OverviewCard({
  title,
  description,
  icon,
  badge,
  delay = 0,
  className = "",
}: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1], // Premium easing curve
        delay: delay,
      }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col h-full bg-white p-7 md:p-8 rounded-xl border border-[#0F172A]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.06)] hover:border-[#C4A47C]/30 overflow-hidden ${className}`}
    >
      {/* Subtle Gold Accent Line - reveals on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C4A47C] opacity-0 translate-y-[-2px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out" />

      {/* Header Area (Icon & Badge) */}
      {(icon || badge) && (
        <div className="flex items-start justify-between mb-8">
          {icon && (
            <div className="text-[#0F172A] group-hover:text-[#C4A47C] transition-colors duration-500">
              {/* Wrapping icon slightly for alignment if needed, assuming Lucide icons */}
              <div className="p-2.5 rounded-lg bg-[#FDFBF7] border border-[#0F172A]/5">
                {icon}
              </div>
            </div>
          )}

          {badge && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FDFBF7] border border-[#C4A47C]/20 text-[10px] font-medium tracking-[0.08em] uppercase text-[#C4A47C]">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-serif text-[#0F172A] mb-3 leading-snug group-hover:text-[#C4A47C] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
