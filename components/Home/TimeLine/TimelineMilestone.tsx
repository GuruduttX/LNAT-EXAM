"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar } from "lucide-react";

// --- Types ---

export interface TimelineMilestoneProps {
  /** The date or timeframe (e.g., "01 August 2025", "Early September") */
  date: string;
  /** The main title of the milestone */
  title: string;
  /** A concise description of the milestone */
  description: string;
  /** Optional status badge (e.g., "Registration Opens", "Deadline") */
  badge?: string;
  /** Optional icon to display in the timeline node */
  icon?: React.ElementType;
  /** Set to true if this is the last item, removing the connecting line */
  isLast?: boolean;
  /** Optional delay for stagger animations */
  delay?: number;
}

// --- Animation Variants ---

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing
    },
  }),
};

// --- Component ---

export default function TimelineMilestone({
  date,
  title,
  description,
  badge,
  icon: Icon = Calendar,
  isLast = false,
  delay = 0,
}: TimelineMilestoneProps) {
  return (
    <motion.div
      custom={delay}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="group relative flex flex-row md:flex-col flex-1 gap-6 md:gap-8"
    >
      {/* 
        Timeline Visual Component (Node & Connector Line)
        Adapts: Vertical line on mobile, Horizontal line on desktop 
      */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start shrink-0">
        {/* Connector Line */}
        {!isLast && (
          <>
            {/* Mobile Vertical Line */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+1.5rem)] bg-gradient-to-b from-[#C4A47C]/40 to-transparent md:hidden" />
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-6 left-12 w-[calc(100%-1rem)] h-[2px] bg-gradient-to-r from-[#C4A47C]/40 to-transparent" />
          </>
        )}

        {/* Node / Icon */}
        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#0F172A]/10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:border-[#C4A47C]/50 group-hover:shadow-[0_8px_20px_-4px_rgba(196,164,124,0.15)] group-hover:-translate-y-1">
          <Icon
            size={20}
            strokeWidth={1.5}
            className="text-[#0F172A]/60 group-hover:text-[#C4A47C] transition-colors duration-500"
          />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 relative bg-white rounded-2xl border border-[#0F172A]/5 p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.06)] hover:border-[#C4A47C]/30 overflow-hidden">
        {/* Subtle Top Accent Line on Hover */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C4A47C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

        {/* Date & Badge Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <span className="text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-[#C4A47C]">
            {date}
          </span>

          {badge && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FDFBF7] border border-[#0F172A]/5 text-[10px] font-medium tracking-wider uppercase text-slate-500 self-start sm:self-auto group-hover:border-[#C4A47C]/20 transition-colors duration-500">
              {badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl md:text-2xl font-serif text-[#0F172A] mb-3 leading-tight group-hover:text-[#C4A47C] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
