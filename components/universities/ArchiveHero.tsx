"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Info } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface ArchiveHeroProps {
  totalUniversities: number;
  totalCountries: number;
  requiredLnatCount: number;
}

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

// Extracted Design System Primitive
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8 bg-[#C9A84C]/40" />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
        {text}
      </span>
      <div className="h-px w-8 bg-[#C9A84C]/40" />
    </div>
  );
}

// Extracted Design System Primitive
function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2.5 mb-2.5 items-start">
      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px] bg-[#C9A84C]" />
      <span className="text-[13px] text-gray-700 leading-relaxed">{text}</span>
    </div>
  );
}

export default function ArchiveHero({
  totalUniversities,
  totalCountries,
  requiredLnatCount,
}: ArchiveHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F7F3EC]">
      {/* Design System: Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      {/* Design System: Gold ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Universities", href: "/universities" },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-center md:text-start">
          {/* Left Content Column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel text="LNAT University Directory" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-extrabold text-[#0D1B3E] tracking-tight leading-tight mb-6
                text-[clamp(1.9rem,4.8vw,3.8rem)]"
            >
              Explore Global Law Schools. <br />
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                Find Your Perfect Fit.
              </span>
            </motion.h1>

            {/* AEO / Quick Answer Block using Design System SectionCard logic */}
            <motion.div
              variants={fadeUp}
              className="w-full rounded-2xl bg-white border border-black/[0.07] shadow-sm overflow-hidden mb-8"
            >
              <div
                className="flex items-center gap-2 px-5 py-3.5 border-b border-black/[0.05]"
                style={{ background: "#0D1B3E06" }}
              >
                <div className="w-[3px] h-[18px] rounded-full bg-[#0D1B3E]" />
                <span className="text-[13px] font-bold text-[#0D1B3E]">
                  What are LNAT Universities?
                </span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  The LNAT is required by premier undergraduate law programs
                  worldwide to assess analytical and logical reasoning skills.
                  This directory helps you navigate these institutions, compare
                  their admissions criteria, and shortlist law schools based on
                  your academic profile.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-1">
              {[
                "Compare institutions by LNAT requirement and ranking",
                "Filter globally recognized law schools by country",
                "Shortlist universities that align with your admissions profile",
              ].map((text, i) => (
                <BulletItem key={i} text={text} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Stats Column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-5 w-full"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {/* Primary Stat Card (Full Width) */}
              <motion.div
                variants={fadeUp}
                className="col-span-2 rounded-2xl p-6 md:p-8 bg-[#0D1B3E] border border-[#C9A84C]/15 
                  shadow-[0_16px_48px_rgba(13,27,62,0.2)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-[#C9A84C] font-extrabold text-5xl md:text-6xl tracking-tight mb-2">
                  {totalUniversities}+
                </div>
                <div className="text-white text-[15px] font-bold mb-2">
                  Recognized Law Schools
                </div>
                <div className="text-white/50 text-[12px] leading-relaxed max-w-[90%]">
                  LNAT is accepted by elite institutions globally, giving Indian
                  students a distinct competitive edge.
                </div>
              </motion.div>

              {/* Secondary Stat Card 1 */}
              <motion.div
                variants={fadeUp}
                className="col-span-1 rounded-2xl p-5 bg-[#0D1B3E] border border-[#C9A84C]/15 
                  shadow-[0_16px_48px_rgba(13,27,62,0.2)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-[#C9A84C] font-extrabold text-3xl tracking-tight mb-1.5">
                  {requiredLnatCount}
                </div>
                <div className="text-white text-[13px] font-bold mb-1">
                  LNAT Required
                </div>
                <div className="text-white/40 text-[11px] leading-relaxed">
                  Institutions where the test is a core admission criterion.
                </div>
              </motion.div>

              {/* Secondary Stat Card 2 */}
              <motion.div
                variants={fadeUp}
                className="col-span-1 rounded-2xl p-5 bg-[#0D1B3E] border border-[#C9A84C]/15 
                  shadow-[0_16px_48px_rgba(13,27,62,0.2)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-[#C9A84C] font-extrabold text-3xl tracking-tight mb-1.5">
                  {totalCountries}
                </div>
                <div className="text-white text-[13px] font-bold mb-1">
                  Global Reach
                </div>
                <div className="text-white/40 text-[11px] leading-relaxed">
                  Countries represented in the official LNAT network.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
