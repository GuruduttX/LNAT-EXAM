"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Clock,
  FileText,
  Target,
  Landmark,
  BarChart,
  CheckCircle2,
  PenTool,
  BookOpen,
} from "lucide-react";

// --- Types ---

export interface SectionRow {
  id: string;
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
}

export interface ExamSectionCardProps {
  /** e.g., "Section A" */
  title: string;
  /** e.g., "Multiple Choice" */
  subtitle: string;
  /** Icon for the header */
  headerIcon: React.ElementType;
  /** Array of data rows to display */
  rows: SectionRow[];
  /** Optional delay for entrance animation */
  delay?: number;
}

// --- Animation Variants ---

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: customDelay,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  }),
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Component ---

export default function ExamSectionCard({
  title,
  subtitle,
  headerIcon: HeaderIcon,
  rows,
  delay = 0,
}: ExamSectionCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={{ y: -4 }}
      className="group flex flex-col w-full bg-[#FDFBF7] rounded-2xl border border-[#0F172A]/10 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.08)] hover:border-[#C4A47C]/40"
    >
      {/* Premium Navy Header */}
      <div className="relative bg-[#0F172A] p-8 md:p-10 overflow-hidden">
        {/* Subtle background texture/glow in header */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-[#C4A47C]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C4A47C]"></div>

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-[#C4A47C] mb-2">
              {title}
            </h3>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              {subtitle}
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/80 group-hover:text-[#C4A47C] group-hover:border-[#C4A47C]/30 transition-all duration-500">
            <HeaderIcon size={28} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Structured Information Rows */}
      <div className="flex flex-col flex-grow px-8 py-4 md:px-10 md:py-6">
        {rows.map((row, index) => {
          const Icon = row.icon;
          const isLast = index === rows.length - 1;

          return (
            <motion.div
              key={row.id}
              variants={rowVariants}
              className={`flex flex-col sm:flex-row sm:items-start py-5 ${
                !isLast ? "border-b border-[#0F172A]/5" : ""
              }`}
            >
              {/* Row Label & Icon */}
              <div className="flex items-center sm:w-1/3 mb-2 sm:mb-0 shrink-0">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#0F172A]/40 mr-3 group-hover:text-[#C4A47C] transition-colors duration-500"
                />
                <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-slate-500">
                  {row.label}
                </span>
              </div>

              {/* Row Value */}
              <div className="sm:w-2/3 sm:pl-4 text-base md:text-lg font-serif text-[#0F172A] leading-relaxed">
                {row.value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
