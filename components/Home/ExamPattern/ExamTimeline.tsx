"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, ListChecks, PenTool, Landmark } from "lucide-react";

// --- Types & Data ---

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ElementType;
}

const timelineData: TimelineStep[] = [
  {
    id: "step-1",
    title: "Reading & Reasoning",
    description:
      "Analyzing complex academic passages to extract implicit and explicit arguments.",
    duration: "Section A",
    icon: BookOpen,
  },
  {
    id: "step-2",
    title: "Multiple Choice",
    description:
      "42 rigorous questions testing logical deduction and critical evaluation.",
    duration: "95 Minutes",
    icon: ListChecks,
  },
  {
    id: "step-3",
    title: "Essay Writing",
    description:
      "Constructing a compelling, structured argument under strict time constraints.",
    duration: "40 Minutes",
    icon: PenTool,
  },
  {
    id: "step-4",
    title: "University Review",
    description:
      "Admissions committees evaluate your aptitude alongside your academic profile.",
    duration: "Final Stage",
    icon: Landmark,
  },
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3, // Wait for line to start drawing
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm ease
    },
  },
};

// --- Component ---

export default function ExamTimeline() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* 
        Timeline Lines 
        Positioned to connect the exact centers of the first and last icons 
      */}

      {/* Mobile Vertical Line Container */}
      <div className="md:hidden absolute left-[27px] top-[28px] bottom-[28px] w-[2px]">
        {/* Background track */}
        <div className="absolute inset-0 bg-slate-200/60" />
        {/* Animated fill */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 w-full h-full bg-gradient-to-b from-[#C4A47C] via-[#C4A47C] to-transparent origin-top"
        />
      </div>

      {/* Desktop Horizontal Line Container */}
      <div className="hidden md:block absolute top-[27px] left-[28px] right-[28px] h-[2px]">
        {/* Background track */}
        <div className="absolute inset-0 bg-slate-200/60" />
        {/* Animated fill */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-0 w-full h-full bg-gradient-to-r from-[#C4A47C] via-[#C4A47C] to-transparent origin-left"
        />
      </div>

      {/* Timeline Items Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="relative flex flex-col md:flex-row gap-8 md:gap-4 z-10"
      >
        {timelineData.map((step) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="group flex flex-row md:flex-col items-start md:items-center relative flex-1 gap-5 md:gap-4"
            >
              {/* Icon / Node */}
              <div className="w-14 h-14 rounded-full bg-[#FDFBF7] border border-[#0F172A]/10 flex items-center justify-center shrink-0 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:border-[#C4A47C]/40 group-hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06)] group-hover:-translate-y-0.5">
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#0F172A] group-hover:text-[#C4A47C] transition-colors duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col pt-1.5 md:pt-0 md:text-center md:items-center">
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-[#C4A47C] mb-1.5">
                  {step.duration}
                </span>
                <h4 className="text-lg font-serif text-[#0F172A] mb-1.5 leading-tight group-hover:text-[#C4A47C] transition-colors duration-500">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed md:max-w-[220px] font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
