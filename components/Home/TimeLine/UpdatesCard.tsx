"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BellRing, ArrowRight } from "lucide-react";

// --- Types ---

export interface UpdateItem {
  id: string;
  text: string;
}

export interface UpdatesCardProps {
  /** Text for the premium top badge (e.g., "2026 ADMISSIONS UPDATE") */
  badge: string;
  /** The main heading of the callout panel */
  title: string;
  /** A concise explanatory description */
  description: string;
  /** Array of important reminder bullet points */
  items: UpdateItem[];
  /** Optional icon to display at the top right */
  icon?: React.ElementType;
  /** Optional delay for entrance animation */
  delay?: number;
}

// --- Animation Variants ---

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  }),
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

export default function UpdatesCard({
  badge,
  title,
  description,
  items,
  icon: Icon = BellRing,
  delay = 0,
}: UpdatesCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="group relative flex flex-col w-full bg-gradient-to-br from-white to-[#FDFBF7] p-8 md:p-10 rounded-2xl border border-[#C4A47C]/30 shadow-[0_8px_30px_-4px_rgba(196,164,124,0.05)] transition-all duration-700 hover:shadow-[0_16px_40px_-4px_rgba(196,164,124,0.12)] hover:border-[#C4A47C]/50 overflow-hidden"
    >
      {/* Subtle Corner Glow (Editorial Elegance) */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-64 h-64 bg-[#C4A47C]/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover:bg-[#C4A47C]/10" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C4A47C]/10 border border-[#C4A47C]/20 text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#C4A47C]">
          {badge}
        </span>
        <div className="p-2.5 rounded-xl bg-white border border-[#C4A47C]/20 text-[#C4A47C] shadow-sm">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col mb-8">
        <h3 className="text-2xl md:text-3xl font-serif text-[#0F172A] mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Reminders List */}
      <div className="relative z-10 flex flex-col space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="flex items-start"
          >
            <div className="mt-1 mr-4 text-[#C4A47C]/60 group-hover:text-[#C4A47C] transition-colors duration-500 shrink-0">
              <ArrowRight size={16} strokeWidth={2} />
            </div>
            <p className="text-sm md:text-base text-[#0F172A]/80 leading-relaxed font-medium">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
