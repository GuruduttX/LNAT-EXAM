"use client";

import React from "react";
import { motion } from "framer-motion";

// --- Types ---

export interface SectionHeadingProps {
  /** The text to display inside the premium badge */
  badge: string;
  /** The main heading text or elements */
  title: React.ReactNode;
  /** Optional supporting description text */
  description?: string;
  /** Alignment of the heading block (defaults to center) */
  align?: "left" | "center";
  /** Optional additional CSS classes */
  className?: string;
}

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
      {/* Premium Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center gap-3 mb-6"
      >
        {isCenter && (
          <span className="hidden sm:block h-px w-8 bg-[#C4A47C]/40"></span>
        )}
        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#C4A47C]/20 bg-[#FDFBF7] shadow-[0_2px_10px_-4px_rgba(196,164,124,0.1)] text-xs font-medium tracking-[0.15em] uppercase text-[#C4A47C]">
          {badge}
        </span>
        {isCenter && (
          <span className="hidden sm:block h-px w-8 bg-[#C4A47C]/40"></span>
        )}
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F172A] tracking-tight leading-[1.15] mb-6 max-w-3xl"
      >
        {title}
      </motion.h2>

      {/* Supporting Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
