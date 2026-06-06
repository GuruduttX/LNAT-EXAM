"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  GraduationCap,
  FileText,
  Compass,
  Users,
  CalendarCheck,
  Award,
  ArrowRight,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";

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
  { label: "Curriculum Standard", value: "2026 Entry" },
];

// --- Animation Variants ---

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <EnquiryPopupForm isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
    <section className="relative w-full border-b border-black/[0.05] bg-[#FDFBF7] py-12 md:py-16 lg:py-20 overflow-hidden">
      
      {/* Design System Texture */}
      <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(circle,rgba(13,27,62,0.03)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Editorial Heading Area */}
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-black/[0.05] pb-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                Institutional Paradigm
              </span>
            </div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Trusted LNAT Admissions Guidance
            </h2>
          </div>
          <p className="max-w-sm text-[13px] font-medium leading-relaxed text-slate-500 md:mb-1">
            Bridging elite Indian law aspirants with premier global universities
            through highly precise, non-commercial advisory systems.
          </p>
        </div>

        {/* 
            Refined Functional Pillar Container
            Mobile: Horizontal Scroll | Desktop: Grid 
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                variants={fadeUpItem}
                className="group mr-4 flex w-[85vw] max-w-[320px] shrink-0 snap-center flex-col rounded-xl border border-black/[0.05] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_12px_30px_-4px_rgba(13,27,62,0.08)] md:mr-0 md:w-auto md:max-w-none"
              >
                <div className="mb-3 flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.04] bg-[#FDFBF7] text-[#0D1B3E]/60 transition-colors duration-500 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[14px] font-bold tracking-wide text-[#0D1B3E] transition-colors duration-500 group-hover:text-[#C9A84C]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="pl-[54px] text-[13px] font-medium leading-relaxed text-slate-500">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button Added Here */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 flex justify-center md:mt-8  "
        >
          <button
            onClick={()=> setIsOpen(true)}
            // Update with your actual route
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
              boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
            }}
          >
            Get Expert Guidance
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Muted Editorial Trust Strip (Mobile Optimized) */}
        <div className="mt-10 flex flex-col gap-6 border-t border-black/[0.05] pt-6 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-4">
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
            Admissions Standards Metric
          </span>
          
          {/* Metrics wrapped nicely for mobile screens */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex items-baseline gap-1.5">
                <span className="text-[16px] font-extrabold text-[#0D1B3E]">
                  {metric.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
    </>
  );
}