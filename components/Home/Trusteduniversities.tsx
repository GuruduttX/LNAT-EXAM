"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Landmark, MapPin, ShieldCheck } from "lucide-react";

// --- Types & Data ---

interface University {
  id: string;
  name: string;
  location: string;
  lnatRequired: boolean;
}

const universities: University[] = [
  {
    id: "oxford",
    name: "University of Oxford",
    location: "Oxford, UK",
    lnatRequired: true,
  },
  {
    id: "ucl",
    name: "UCL",
    location: "London, UK",
    lnatRequired: true,
  },
  {
    id: "lse",
    name: "LSE",
    location: "London, UK",
    lnatRequired: true,
  },
  {
    id: "kcl",
    name: "King’s College London",
    location: "London, UK",
    lnatRequired: true,
  },
  {
    id: "durham",
    name: "Durham University",
    location: "Durham, UK",
    lnatRequired: true,
  },
  {
    id: "bristol",
    name: "University of Bristol",
    location: "Bristol, UK",
    lnatRequired: true,
  },
  {
    id: "glasgow",
    name: "University of Glasgow",
    location: "Glasgow, UK",
    lnatRequired: true,
  },
  {
    id: "soas",
    name: "SOAS University of London",
    location: "London, UK",
    lnatRequired: true,
  },
];

// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// --- Subcomponents ---

const SectionHeading = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-12 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="h-[1px] w-8 bg-[#C4A47C]/40"></span>
        <span className="text-xs font-medium tracking-widest uppercase text-[#C4A47C]">
          Institutional Trust
        </span>
        <span className="h-[1px] w-8 bg-[#C4A47C]/40"></span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-2xl md:text-3xl font-serif text-[#0F172A] tracking-tight max-w-2xl"
      >
        LNAT Accepted by Leading Law Universities
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-sm md:text-base text-slate-500 max-w-xl leading-relaxed"
      >
        Your LNAT score is a critical component for admission into the most
        prestigious undergraduate law programs globally.
      </motion.p>
    </div>
  );
};

const UniversityCard = ({ university }: { university: University }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between p-6 min-w-[280px] lg:min-w-0 snap-center bg-white border border-[#0F172A]/5 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] hover:border-[#C4A47C]/30 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="p-2.5 rounded-lg bg-[#FDFBF7] border border-[#0F172A]/5 text-[#0F172A]/70 group-hover:text-[#C4A47C] transition-colors duration-500">
          <Landmark size={20} strokeWidth={1.5} />
        </div>
        {university.lnatRequired && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
            <ShieldCheck size={12} className="text-[#C4A47C]" />
            <span className="text-[10px] font-medium tracking-wide uppercase text-slate-500">
              LNAT Required
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-serif text-[#0F172A] mb-2 group-hover:text-[#C4A47C] transition-colors duration-500">
          {university.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={14} strokeWidth={1.5} />
          <span>{university.location}</span>
        </div>
      </div>

      {/* Subtle bottom accent line that reveals on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C4A47C] transition-all duration-500 group-hover:w-1/2 opacity-0 group-hover:opacity-100 rounded-t-full"></div>
    </motion.div>
  );
};

// --- Main Component ---

export default function TrustedUniversities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <section className="relative py-10 lg:py-10 bg-[#FDFBF7] overflow-hidden">
      {/* Background Subtle Textures/Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#0F172A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading />

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 pb-8 lg:pb-0 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {universities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </motion.div>

        {/* CSS to hide scrollbar on Webkit browsers for the mobile horizontal scroll */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
          `,
          }}
        />
      </div>
    </section>
  );
}
