"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Clock, FileSignature, Brain, Landmark } from "lucide-react";

// --- Types & Data ---

interface SnapshotItem {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
}

const snapshotData: SnapshotItem[] = [
  {
    id: "format",
    label: "Assessment Format",
    value: "42 MCQs & 1 Essay",
    icon: FileSignature,
  },
  {
    id: "duration",
    label: "Total Duration",
    value: "2 Hours 15 Minutes",
    icon: Clock,
  },
  {
    id: "focus",
    label: "Primary Focus",
    value: "Aptitude & Reasoning",
    icon: Brain,
  },
  {
    id: "recognition",
    label: "Recognition",
    value: "Elite Law Consortium",
    icon: Landmark,
  },
];

// --- Animation Variants ---

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Premium ease
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Component ---

export default function ExamSnapshot() {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="relative w-full max-w-md mx-auto bg-white rounded-2xl border border-[#0F172A]/10 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
    >
      {/* Top Gold Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C4A47C]"></div>

      {/* Header */}
      <div className="px-8 pt-8 pb-6 bg-[#FDFBF7] border-b border-[#0F172A]/5">
        <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[#C4A47C] mb-2">
          At a Glance
        </h3>
        <h2 className="text-2xl font-serif text-[#0F172A] tracking-tight">
          LNAT Specifications
        </h2>
      </div>

      {/* Content List */}
      <div className="px-8 py-2 flex-grow">
        {snapshotData.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === snapshotData.length - 1;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group flex items-center py-5 ${
                !isLast ? "border-b border-[#0F172A]/5" : ""
              }`}
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 mr-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#0F172A]/5 text-[#0F172A]/60 group-hover:text-[#C4A47C] group-hover:bg-white group-hover:border-[#C4A47C]/30 transition-all duration-500 ease-out">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-slate-400 mb-0.5">
                  {item.label}
                </span>
                <span className="text-base sm:text-lg font-serif text-[#0F172A] group-hover:text-[#C4A47C] transition-colors duration-500">
                  {item.value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer / Subtle Info */}
      <div className="px-8 py-4 bg-slate-50 border-t border-[#0F172A]/5">
        <p className="text-[11px] text-slate-400 text-center uppercase tracking-widest font-medium">
          Updated for 2026 Admissions
        </p>
      </div>
    </motion.div>
  );
}
