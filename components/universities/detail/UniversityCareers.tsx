"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Briefcase, Building2, Award, ArrowRight } from "lucide-react";

interface FamousAlumnus {
  name: string;
  designation: string;
}

interface UniversityCareersProps {
  university: {
    careers?: {
      employabilityOverview?: string;
      topRecruiters?: string[];
    };
    famousAlumni?: FamousAlumnus[];
  };
}

// Design System: Framer Motion Variants
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

export default function UniversityCareers({
  university,
}: UniversityCareersProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const { careers, famousAlumni } = university;

  // Defensive rendering
  if (
    !careers?.employabilityOverview &&
    !careers?.topRecruiters?.length &&
    !famousAlumni?.length
  ) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative w-full border-t border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 md:mb-10"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 flex items-center justify-center gap-2 md:justify-start"
          >
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              Outcomes
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
          >
            Careers &{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Credibility
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* =========================================
              LEFT COLUMN: CAREER PROSPECTS
              ========================================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col h-full"
          >
            <motion.div
              variants={fadeUp}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#FDFBF7] px-6 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D1B3E]/[0.06] text-[#0D1B3E]">
                  <Briefcase size={16} />
                </div>
                <h3 className="text-[15px] font-bold text-[#0D1B3E]">
                  Career Prospects
                </h3>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                {careers?.employabilityOverview && (
                  <p className="mb-8 text-[14px] leading-relaxed text-slate-600">
                    {careers.employabilityOverview}
                  </p>
                )}

                {careers?.topRecruiters && careers.topRecruiters.length > 0 && (
                  <div className="mt-auto">
                    <div className="mb-4 flex items-center gap-2">
                      <Building2 size={14} className="text-[#C9A84C]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Top Recruiters & Pathways
                      </span>
                    </div>

                    {/* Interactive Tag Cloud */}
                    <div className="flex flex-wrap gap-2.5">
                      {careers.topRecruiters.map((recruiter, index) => (
                        <span
                          key={`${recruiter}-${index}`}
                          className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-[#0D1B3E]/12 bg-[#0D1B3E]/[0.04] px-4 py-1.5 text-[12px] font-semibold text-[#0D1B3E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0D1B3E] hover:text-white"
                        >
                          {recruiter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================
              RIGHT COLUMN: FAMOUS ALUMNI
              ========================================= */}
          {famousAlumni && famousAlumni.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col"
            >
              <motion.div
                variants={fadeUp}
                className="mb-5 flex items-center justify-between"
              >
                <h3 className="text-[18px] font-bold text-[#0D1B3E]">
                  Notable Alumni
                </h3>
              </motion.div>

              <div className="flex flex-col gap-3">
                {famousAlumni.map((alumnus, index) => (
                  <motion.div
                    key={`${alumnus.name}-${index}`}
                    variants={fadeUp}
                    custom={index * 0.1}
                    className="group flex items-center gap-4 rounded-2xl border border-black/[0.05] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                  >
                    {/* Dynamic Icon Container (inverts on hover) */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/[0.08] text-[#C9A84C] transition-colors duration-300 group-hover:bg-[#C9A84C] group-hover:text-white">
                      <Award size={20} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col">
                      <p className="text-[15px] font-bold text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]">
                        {alumnus.name}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-snug text-slate-500">
                        {alumnus.designation}
                      </p>
                    </div>

                    {/* Subtle interaction indicator */}
                    <div className="mr-2 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C9A84C] group-hover:opacity-100">
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
