"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export interface SectionHeadingProps {
  /** Text for the premium editorial badge (e.g., "Featured Universities") */
  badge: string;
  /** The main cinematic heading text */
  title: React.ReactNode;
  /** Optional concise supporting description */
  description?: string;
  /** Alignment of the heading block (defaults to center) */
  align?: "left" | "center";
  /** Optional additional CSS classes for parent control */
  className?: string;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Cinematic, calm easing
    },
  }),
};

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
      {/* Premium Badge - Controlled bottom margin */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUpVariants}
        className={`flex items-center gap-3 mb-3 ${isCenter ? "justify-center" : "justify-start"}`}
      >
        {isCenter && (
          <span className="hidden sm:block h-[1px] w-6 bg-[#C4A47C]/40"></span>
        )}
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#C4A47C]/30 bg-transparent text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#C4A47C]">
          {badge}
        </span>
        {isCenter && (
          <span className="hidden sm:block h-[1px] w-6 bg-[#C4A47C]/40"></span>
        )}
      </motion.div>

      {/* Main Heading - Refined sizing and compact bottom margin */}
      <motion.h2
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={fadeUpVariants}
        className={`text-2xl md:text-3xl lg:text-4xl font-serif text-[#0F172A] tracking-tight leading-snug max-w-3xl ${
          description ? "mb-3" : "mb-0"
        }`}
      >
        {title}
      </motion.h2>

      {/* Supporting Description - No bottom margin by default to keep vertical rhythm tight */}
      {description && (
        <motion.p
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={fadeUpVariants}
          className="text-sm md:text-base text-slate-500 font-light leading-relaxed max-w-2xl m-0"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
