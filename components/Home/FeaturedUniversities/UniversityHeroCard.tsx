"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, ShieldCheck, ArrowRight, Trophy } from "lucide-react";

// --- Types ---

export interface UniversityHeroCardProps {
  /** The name of the university (e.g., "University of Oxford") */
  name: string;
  /** Location of the university */
  location: string;
  /** Short, compelling overview description */
  description: string;
  /** High-quality image URL for the cinematic background */
  imageUrl: string;
  /** Optional global or national ranking (e.g., "#1 in UK") */
  ranking?: string;
  /** Whether the LNAT is required (defaults to true) */
  lnatRequired?: boolean;
  /** CTA button text */
  ctaText?: string;
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
      ease: [0.25, 0.1, 0.25, 1], // Cinematic, calm easing
    },
  }),
};

// --- Component ---

export default function UniversityHeroCard({
  name,
  location,
  description,
  imageUrl,
  ranking,
  lnatRequired = true,
  ctaText = "Explore University",
  delay = 0,
}: UniversityHeroCardProps) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5% 0px" }}
      variants={cardVariants}
      className="group relative w-full overflow-hidden rounded-2xl bg-[#0F172A] border border-[#0F172A]/10 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-700 hover:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.2)] min-h-[420px] md:min-h-[460px] flex items-end md:items-center"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} campus`}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
      </div>

      {/* Premium Dark Overlays for Text Readability */}
      {/* Mobile: Gradient from bottom up */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent md:hidden" />
      {/* Desktop: Gradient from left to right */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent/20 w-3/4" />

      {/* Content Container - Compact padding to avoid excessive vertical space */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 w-full md:w-2/3 lg:w-1/2 flex flex-col justify-end md:justify-center h-full">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {ranking && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#C4A47C]/40 bg-[#C4A47C]/10 backdrop-blur-sm text-[10px] font-medium tracking-[0.1em] uppercase text-[#C4A47C]">
              <Trophy size={12} strokeWidth={2} />
              {ranking}
            </span>
          )}
          {lnatRequired && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] font-medium tracking-[0.1em] uppercase text-white/90">
              <ShieldCheck
                size={12}
                strokeWidth={2}
                className="text-[#C4A47C]"
              />
              LNAT Required
            </span>
          )}
        </div>

        {/* University Name */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 md:mb-3 leading-[1.1]">
          {name}
        </h3>

        {/* Location Row */}
        <div className="flex items-center gap-1.5 text-white/70 mb-4 md:mb-5">
          <MapPin size={14} strokeWidth={1.5} />
          <span className="text-sm tracking-wide font-light">{location}</span>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed mb-6 md:mb-8 max-w-lg">
          {description}
        </p>

        {/* CTA Button */}
        <div>
          <button className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#C4A47C] text-[#C4A47C] text-sm font-medium tracking-wide uppercase transition-all duration-500 hover:bg-[#C4A47C] hover:text-[#0F172A]">
            {ctaText}
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
