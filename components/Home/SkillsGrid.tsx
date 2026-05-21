"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, BrainCircuit, Scale, PenTool } from "lucide-react";

// --- Types & Data ---

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const skillsData: Skill[] = [
  {
    id: "reading-comprehension",
    title: "Reading Comprehension",
    description:
      "The ability to parse dense, complex texts quickly, identify core themes, and extract explicit and implicit information from sophisticated academic prose.",
    icon: BookOpen,
  },
  {
    id: "critical-reasoning",
    title: "Critical Reasoning",
    description:
      "Evaluating the strength of arguments, identifying logical fallacies, recognizing underlying assumptions, and differentiating between fact and opinion.",
    icon: BrainCircuit,
  },
  {
    id: "logical-analysis",
    title: "Logical Analysis",
    description:
      "Drawing sound deductive and inductive conclusions from provided evidence without relying on prior factual knowledge or external assumptions.",
    icon: Scale,
  },
  {
    id: "essay-writing",
    title: "Argumentative Writing",
    description:
      "Constructing compelling, logically sound, and well-structured arguments under strict time constraints to demonstrate persuasive reasoning and clarity of thought.",
    icon: PenTool,
  },
];

// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Premium easing curve
    },
  },
};

// --- Component ---

export default function SkillsGrid() {
  return (
    <section className="relative py-10 lg:py-32 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-[#C4A47C]/40"></span>
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-[#C4A47C]">
              Core Competencies
            </span>
            <span className="h-[1px] w-8 bg-[#C4A47C]/40"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F172A] tracking-tight max-w-3xl mb-6"
          >
            Evaluating rigorous analytical ability,{" "}
            <br className="hidden md:block" />
            <span className="text-slate-400 italic font-light">
              not memorization.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            The LNAT does not test your knowledge of the law. It is designed to
            rigorously assess the underlying cognitive skills required to excel
            in premier legal studies.
          </motion.p>
        </div>

        {/* 2x2 Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4"
        >
          {skillsData.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col p-8 md:p-5 bg-white rounded-2xl border border-[#0F172A]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.06)] hover:border-[#C4A47C]/30 overflow-hidden"
              >
                {/* Subtle top gold accent on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C4A47C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col h-full">
                  {/* Icon wrapper */}
                  <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FDFBF7] border border-[#0F172A]/5 text-[#0F172A]/70 group-hover:text-[#C4A47C] group-hover:scale-110 transition-all duration-500 ease-out">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-serif text-[#0F172A] mb-3 group-hover:text-[#C4A47C] transition-colors duration-500">
                      {skill.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 leading-relaxed font-light">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
