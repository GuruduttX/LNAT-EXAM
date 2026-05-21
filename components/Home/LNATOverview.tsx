"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { GraduationCap, Landmark, BookOpen } from "lucide-react";

// --- Assuming these components exist in your components directory ---
import OverviewContent from "./OverviewContent";
import ExamSnapshot from "./ExamSnapshot";
import SkillsGrid from "./SkillsGrid";
import OverViewCard from "./OverViewCard";

// --- Animation Variants ---

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// --- Component ---

export default function LNATOverview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FDFBF7] py-10 md:py-28 lg:py-10 overflow-hidden"
    >
      {/* Subtle Background Texture/Grid (Optional premium detail) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(to_right,#0F172A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Header Area */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-[#C4A47C]/60" />
            <span className="text-sm font-medium tracking-widest md:tracking-[0.2em] uppercase text-[#C4A47C]">
              Understanding the LNAT
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#0F172A] tracking-tight leading-[1.1] mb-6">
            The Standard for Elite <br className="hidden md:block" />
            Legal Admissions.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-2xl">
            A comprehensive breakdown of the Law National Aptitude Test,
            exploring its structural methodology and essential role in the
            selection processes of the world’s leading universities.
          </p>
        </motion.div>

        {/* Editorial Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-10 items-start">
          {/* Left Column (55%) - Primary Content */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full lg:w-[55%] flex flex-col"
          >
            {/* 
              We wrap OverviewContent here. Assuming OverviewContent has its own 
              internal padding/margins, it will flow naturally in this column.
            */}
            <div className="prose prose-lg prose-slate max-w-none">
              <OverviewContent />
            </div>
          </motion.div>

          {/* Right Column (45%) - Visuals & Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full lg:w-[45%] flex flex-col gap-8 lg:gap-10 sticky top-32"
          >
            {/* Component 1: Exam Snapshot */}
            <motion.div variants={fadeUpVariant}>
              <ExamSnapshot />
            </motion.div>

            {/* Component 2: Skills Grid */}
            <motion.div variants={fadeUpVariant}>
              <SkillsGrid />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex w-full gap-4 md:gap-0 overflow-x-auto snap-x snap-mandatory px-4 py-4 md:px-0 md:justify-around hide-scrollbar">
          {/* Component 3: Additional Overview Card for context */}
          <motion.div
            variants={fadeUpVariant}
            className="shrink-0 w-[90%] sm:w-[400px] md:w-full md:max-w-[500px] md:shrink snap-center"
          >
            <OverViewCard
              title="Global Recognition"
              description="While originating in the UK, the LNAT is increasingly utilized by premier international institutions in Singapore, Spain, and beyond to identify top legal scholars."
              icon={<Landmark size={22} strokeWidth={1.5} />}
              badge="International"
            />
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            className="shrink-0 w-[90%] sm:w-[400px] md:w-full md:max-w-[500px] md:shrink snap-center"
          >
            <OverViewCard
              title="Not a Knowledge Test"
              description="Zero prior legal knowledge is required or expected. The assessment is purely an evaluation of cognitive aptitude, critical reasoning, and logical deduction."
              icon={<BookOpen size={22} strokeWidth={1.5} />}
              badge="Aptitude"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
