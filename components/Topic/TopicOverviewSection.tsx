"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

// --- Design System Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

interface TopicOverviewSectionProps {
  intro: string;
}

export default function TopicOverviewSection({
  intro,
}: TopicOverviewSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const instructions = [
    "Start with the featured guides if you want the strongest introduction to this topic.",
    "Use the subtopics below to move into the exact area you want to understand better.",
    "Open related university pages when you need entity-level detail, fit, and admissions context.",
  ];

  if (!intro) return null;

  return (
    <section
      ref={ref}
      className="bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
        >
          {/* LEFT COLUMN: Overview (Light Theme Pattern) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-sm transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] text-center md:text-start"
          >
            {/* Top Accent Bar */}
            <div
              className="h-[3px] w-full shrink-0"
              style={{ background: "linear-gradient(90deg, #C9A84C, #E8C96A)" }}
            />

            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-6 bg-[#C9A84C]/40" />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  Overview
                </p>
              </div>
              <div className="whitespace-pre-line text-[14px] leading-[1.8] text-slate-600 md:text-[15px]">
                {intro}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Instructions (Dark/Navy High-Importance Pattern) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col rounded-2xl border border-[#C9A84C]/15 bg-[#0D1B3E] p-6 shadow-[0_16px_48px_rgba(13,27,62,0.2)] md:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-6 bg-[#C9A84C]/40" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Best Way To Use This Page
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {instructions.map((item, index) => (
                <div key={index} className="group flex items-start gap-4">
                  {/* Design System Numbered Badge Pattern */}
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[13px] font-bold text-[#C9A84C] transition-colors group-hover:bg-[#C9A84C] group-hover:text-[#0D1B3E]">
                    {index + 1}
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/70 transition-colors group-hover:text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
