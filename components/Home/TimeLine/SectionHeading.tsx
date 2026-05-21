"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// --- Types ---

export interface SectionHeadingProps {
  /** The text to display inside the premium editorial badge (e.g., "2026 Admissions Timeline") */
  badge: string;
  /** The main heading text */
  title: React.ReactNode;
  /** Optional supporting description text explaining the section */
  description?: string;
  /** Alignment of the heading block (defaults to center for editorial layouts) */
  align?: "left" | "center";
  /** Optional additional CSS classes for custom spacing/overrides */
  className?: string;
}

// --- Animation Variants ---

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing curve
    },
  }),
};

// --- Component ---

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto" : "items-start text-left"
      } ${className}`}
    >
      {/* Premium Editorial Badge */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUpVariants}
        className={`flex items-center gap-4 mb-6 ${isCenter ? "justify-center" : "justify-start"}`}
      >
        {isCenter && (
          <span className="hidden sm:block h-[1px] w-10 bg-[#C4A47C]/40"></span>
        )}
        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#C4A47C]/20 bg-[#FDFBF7] shadow-[0_2px_10px_-4px_rgba(196,164,124,0.08)] text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#C4A47C]">
          {badge}
        </span>
        {isCenter && (
          <span className="hidden sm:block h-[1px] w-10 bg-[#C4A47C]/40"></span>
        )}
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUpVariants}
        className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F172A] tracking-tight leading-[1.15] mb-6 max-w-3xl"
      >
        {title}
      </motion.h2>

      {/* Supporting Description */}
      {description && (
        <motion.p
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={fadeUpVariants}
          className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
