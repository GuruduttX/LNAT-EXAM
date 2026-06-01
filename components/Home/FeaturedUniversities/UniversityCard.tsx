"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, ShieldCheck, ArrowRight, Trophy } from "lucide-react";

// --- Types ---

export interface UniversityCardProps {
  /** The name of the university */
  name: string;
  /** Location of the university */
  location: string;
  /** Short, compelling overview description */
  description: string;
  /** High-quality image URL for the card thumbnail */
  imageUrl: string;
  /** Optional national or global ranking */
  ranking?: string;
  /** Whether the LNAT is required (defaults to true) */
  lnatRequired?: boolean;
  /** The destination link for the card */
  href?: string;
  /** Optional delay for entrance animation stagger */
  delay?: number;
}

// --- Animation Variants ---

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing
    },
  }),
};

// --- Component ---

export default function UniversityCard({
  name,
  location,
  description,
  imageUrl,
  ranking,
  lnatRequired = true,
  href = "#",
  delay = 0,
}: UniversityCardProps) {
  return (
    <motion.a
      href={href}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={cardVariants}
      className="group relative flex flex-col w-full bg-white rounded-2xl border border-[#0F172A]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-700 hover:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.08)] hover:border-[#C4A47C]/30"
    >
      {/* 
        Image Section 
        Uses an elegant 4:3 aspect ratio, avoiding overly tall images 
      */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F172A]/5">
        <Image
          src={imageUrl}
          alt={`${name} campus`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        
        {/* Subtle Dark Gradient Overlay for Badge Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent opacity-80" />

        {/* Floating Badges Area */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {ranking && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/95 text-[10px] font-medium tracking-[0.1em] uppercase text-[#0F172A] shadow-sm">
              <Trophy size={12} strokeWidth={2} className="text-[#C4A47C]" />
              {ranking}
            </span>
          )}
          {lnatRequired && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#0F172A]/90 backdrop-blur-sm text-[10px] font-medium tracking-[0.1em] uppercase text-white shadow-sm">
              <ShieldCheck size={12} strokeWidth={2} className="text-[#C4A47C]" />
              LNAT Required
            </span>
          )}
        </div>
      </div>

      {/* 
        Content Section 
        Controlled padding (p-6) ensures the card feels dense, structured, and premium without empty voids.
      */}
      <div className="flex flex-col flex-grow p-6">
        
        {/* Header: Name & Location */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-serif text-[#0F172A] leading-tight mb-2 group-hover:text-[#C4A47C] transition-colors duration-500 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin size={14} strokeWidth={1.5} />
            <span className="text-xs md:text-sm tracking-wide font-light uppercase">
              {location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
          {description}
        </p>

        {/* Editorial Footer / CTA */}
        <div className="pt-4 mt-auto border-t border-[#0F172A]/5 flex items-center justify-between group-hover:border-[#C4A47C]/20 transition-colors duration-500">
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-[#0F172A] group-hover:text-[#C4A47C] transition-colors duration-500">
            Explore Details
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FDFBF7] text-[#0F172A] transition-all duration-500 group-hover:bg-[#C4A47C] group-hover:text-white">
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:translate-x-0.5" />
          </div>
        </div>

      </div>

      {/* Top Accent Line (Subtle premium detail that appears on hover) */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C4A47C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-20" />
    </motion.a>
  );
}
