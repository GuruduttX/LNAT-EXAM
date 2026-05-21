"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  BookOpen,
  PenTool,
  Clock,
  FileText,
  Target,
  Landmark,
  BarChart,
} from "lucide-react";

// --- Subcomponent Imports ---
// Ensure these paths match your project structure
import SectionHeading from "./SectionHeading";
import PatternOverview from "./PatternOverview";
import ExamTimeline from "./ExamTimeline";
import ExamSectionCard, { SectionRow } from "./ExamSectionCard";
import ExamStats from "./ExamStats";

// --- Animation Variants ---

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing
    },
  },
};

// --- Component ---

export default function ExamPattern() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  // Data for Section A Card
  const sectionARows: SectionRow[] = [
    { id: "a-dur", label: "Duration", value: "95 Minutes", icon: Clock },
    {
      id: "a-fmt",
      label: "Format",
      value: "42 Multiple Choice Questions based on 12 argumentative passages.",
      icon: FileText,
    },
    {
      id: "a-scr",
      label: "Scoring",
      value: "Computer-marked out of 42. No negative marking.",
      icon: Target,
    },
    {
      id: "a-use",
      label: "Usage",
      value:
        "Used to automatically filter candidates before qualitative review.",
      icon: Landmark,
    },
    {
      id: "a-bnc",
      label: "Benchmark",
      value: "Average score typically 21-23. Top universities expect 27+.",
      icon: BarChart,
    },
  ];

  // Data for Section B Card
  const sectionBRows: SectionRow[] = [
    { id: "b-dur", label: "Duration", value: "40 Minutes", icon: Clock },
    {
      id: "b-fmt",
      label: "Format",
      value: "1 Essay chosen from 3 provided prompt topics.",
      icon: FileText,
    },
    {
      id: "b-scr",
      label: "Scoring",
      value:
        "Not scored by LNAT. Forwarded directly to university admissions tutors.",
      icon: Target,
    },
    {
      id: "b-use",
      label: "Usage",
      value:
        "Evaluates ability to construct a compelling, logically sound argument.",
      icon: Landmark,
    },
    {
      id: "b-bnc",
      label: "Benchmark",
      value: "Assessed holistically alongside your personal statement.",
      icon: BarChart,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FDFBF7] py-20 md:py-10 overflow-hidden border-t border-b border-[#0F172A]/5"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#0F172A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full"
      >
        {/* 1. Header Section */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-16 md:mb-24"
        >
          <SectionHeading
            badge="LNAT Exam Structure"
            title="Understanding the Exam Pattern"
            description="A detailed breakdown of the Law National Aptitude Test. Discover how the assessment is structured to evaluate your critical reasoning and argumentative capabilities over two rigorous sections."
            align="center"
          />
        </motion.div>

        {/* 2. Pattern Overview Content */}
        <motion.div variants={blockVariants} className="mb-20 md:mb-32">
          <PatternOverview />
        </motion.div>

        {/* 3. Visual Timeline */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-20 md:mb-32"
        >
          <div className="max-w-350 mx-auto flex flex-col items-center">
            <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-[#0F172A]/60 mb-12 text-center">
              Assessment Progression Flow
            </h3>
            <ExamTimeline />
          </div>
        </motion.div>

        {/* 4. Section Comparison Cards */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-20 md:mb-32"
        >
          <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ExamSectionCard
              title="Section A"
              subtitle="Reading & Reasoning"
              headerIcon={BookOpen}
              rows={sectionARows}
              delay={0.1}
            />
            <ExamSectionCard
              title="Section B"
              subtitle="Argumentative Essay"
              headerIcon={PenTool}
              rows={sectionBRows}
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* 5. Exam Statistics Footer */}
        <motion.div variants={blockVariants}>
          <div className="border-t border-[#0F172A]/5 pt-8">
            <ExamStats />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
