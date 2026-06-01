"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Globe2,
  Trophy,
  Calendar,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";

interface UniversityQuickFactsProps {
  university: {
    globalRanking?: string;
    lawSchoolRanking?: string;
    applicationDeadline?: string;
    tuitionFee?: string;
    acceptanceRate?: string;
  };
}

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

// Design System Variants
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

export default function UniversityQuickFacts({
  university,
}: UniversityQuickFactsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Filter out any missing stats dynamically so we don't render empty cards
  const stats: StatItem[] = [
    {
      icon: Globe2,
      label: "Global Ranking",
      value: university.globalRanking || "",
    },
    {
      icon: Trophy,
      label: "Law Ranking",
      value: university.lawSchoolRanking || "",
    },
    {
      icon: Calendar,
      label: "App Deadline",
      value: university.applicationDeadline || "",
    },
    {
      icon: GraduationCap,
      label: "Tuition Fee",
      value: university.tuitionFee || "",
    },
    {
      icon: Users,
      label: "Acceptance Rate",
      value: university.acceptanceRate || "",
    },
  ].filter((stat) => stat.value.trim() !== "");

  if (stats.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative w-full border-b border-black/[0.07] bg-[#FDFBF7] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Subtle Dot Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.03)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Mobile: Horizontal Scroll Carousel | Desktop: 5-Col Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 
            md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              variants={fadeUp}
              custom={index * 0.1}
              className="group mr-4 w-[240px] shrink-0 snap-center md:mr-0 md:w-auto"
            >
              <div className="flex h-full flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                {/* Icon & Label */}
                <div className="mb-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]/[0.08] text-[#C9A84C] transition-colors duration-300 group-hover:bg-[#C9A84C]/[0.15]">
                    <stat.icon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {stat.label}
                  </h3>
                </div>

                {/* Value */}
                <div>
                  <p className="text-[20px] font-extrabold leading-tight text-[#0D1B3E] xl:text-[22px]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
