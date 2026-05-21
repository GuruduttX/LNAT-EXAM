"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  FileText,
  Compass,
  Users,
  CalendarCheck,
  Award,
} from "lucide-react";

// --- Types & Data ---

interface PillarItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const pillars: PillarItem[] = [
  {
    id: "expert-guidance",
    title: "Expert LNAT Guidance",
    description:
      "Methodical training architectural strategies focusing on Section A processing speed and diagnostic verbal patterns.",
    icon: GraduationCap,
  },
  {
    id: "essay-review",
    title: "Premium Essay Appraisal",
    description:
      "Rigorous analytical review of Section B arguments mirroring elite university criteria.",
    icon: FileText,
  },
  {
    id: "admissions-strategy",
    title: "Institutional Strategy",
    description:
      "Custom alignment of your profile with specific threshold trends of the LNAT Consortium.",
    icon: Compass,
  },
  {
    id: "mentorship",
    title: "Personalized Mentorship",
    description:
      "Direct strategic paths managed by legal consultants well-versed in global admissions.",
    icon: Users,
  },
  {
    id: "resources",
    title: "Current 2026 Curriculum",
    description:
      "Exclusively tailored resources capturing recent critical reasoning assessment frameworks.",
    icon: CalendarCheck,
  },
  {
    id: "assistance",
    title: "Application Refinement",
    description:
      "Polishing structural narrative alignment across UCAS components and legal personal statements.",
    icon: Award,
  },
];

interface MetricItem {
  label: string;
  value: string;
}

const metrics: MetricItem[] = [
  { label: "Consortium Universities", value: "100%" },
  { label: "Strategic Focus", value: "Premium" },
  { label: "Curriculum Standard", value: "202Entry" },
];

// --- Animation Variants ---

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// --- Component ---

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-[#FDFBF7] py-12 md:py-16 overflow-hidden border-b border-[#0F172A]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Editorial Heading Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#0F172A]/5">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C]" />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#C4A47C]">
                Institutional Paradigm
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#0F172A] tracking-tight">
              Trusted LNAT Admissions Guidance
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 font-light max-w-sm leading-relaxed md:mb-1">
            Bridging elite Indian law aspirants with premier global universities
            through highly precise, non-commercial advisory systems.
          </p>
        </div>

        {/* Refined Functional Pillar Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                variants={fadeUpItem}
                whileHover={{ y: -2 }}
                className="group relative flex flex-col p-5 bg-white rounded-xl border border-[#0F172A]/5 transition-all duration-500 hover:shadow-[0_8px_24px_-4px_rgba(196,164,124,0.08)] hover:border-[#C4A47C]/20"
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="p-2 rounded-lg bg-[#FDFBF7] border border-[#0F172A]/5 text-[#0F172A]/60 group-hover:text-[#C4A47C] transition-colors duration-500 shrink-0">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-medium tracking-wide text-[#0F172A] group-hover:text-[#C4A47C] transition-colors duration-500">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed pl-[38px]">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Muted Editorial Trust Strip */}
        <div className="mt-10 pt-6 border-t border-[#0F172A]/5 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">
            Admissions Standards Metric
          </span>
          <div className="flex items-center gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex items-baseline gap-1.5">
                <span className="text-sm font-serif text-[#0F172A] font-medium">
                  {metric.value}
                </span>
                <span className="text-[10px] text-slate-400 font-light uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
