"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BookOpenCheck, Building2, GraduationCap, Layers3 } from "lucide-react";

interface FeatureBlock {
  title: string;
  description: string;
  iconName?: string;
}

interface UniversityAcademicStrengthsProps {
  university: {
    name: string;
    strengths?: {
      academicStrengths?: FeatureBlock[];
      facultyHighlights?: FeatureBlock[];
      teachingStyle?: string;
      notableFacilities?: FeatureBlock[];
      standoutPrograms?: string[];
    };
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function StrengthCard({
  item,
  label,
  index,
}: {
  item: FeatureBlock;
  label: string;
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index * 0.08}
      className="mr-4 min-h-55 w-[82vw] max-w-82.5 shrink-0 snap-center rounded-3xl border border-black/[0.07] bg-white p-5 shadow-[0_12px_30px_rgba(20,31,45,0.05)]"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
        {label}
      </p>
      <h3 className="mt-3 text-[18px] font-extrabold leading-tight text-[#0D1B3E]">
        {item.title}
      </h3>
      <p className="mt-4 text-[14px] leading-7 text-slate-600">
        {item.description}
      </p>
    </motion.article>
  );
}

export default function UniversityAcademicStrengths({
  university,
}: UniversityAcademicStrengthsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const strengths = university.strengths;

  const cardItems = [
    ...(strengths?.academicStrengths || []).map((item) => ({
      item,
      label: "Academic strength",
    })),
    ...(strengths?.facultyHighlights || []).map((item) => ({
      item,
      label: "Faculty highlight",
    })),
    ...(strengths?.notableFacilities || []).map((item) => ({
      item,
      label: "Facility",
    })),
  ];

  if (
    !strengths?.teachingStyle &&
    !strengths?.standoutPrograms?.length &&
    !cardItems.length
  ) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative border-t border-black/[0.07] bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(13,27,62,0.045)_1px,transparent_1px)] [background-size:26px_26px]"
      />
      <div className="relative mx-auto max-w-[1280px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12"
        >
          <div className="min-w-0">
            <motion.div
              variants={fadeUp}
              className="mb-3 flex items-center justify-center gap-2 md:justify-start"
            >
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Academic Profile
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
            >
              What strengthens{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                the law experience
              </span>
            </motion.h2>

            {strengths?.teachingStyle ? (
              <motion.div
                variants={fadeUp}
                className="mt-6 rounded-[26px] border border-[#C9A84C]/20 bg-[#0D1B3E] p-6 text-white shadow-[0_16px_48px_rgba(13,27,62,0.18)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#C9A84C]">
                  <GraduationCap size={20} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  Teaching style
                </p>
                <p className="mt-3 text-[14px] leading-7 text-white/78">
                  {strengths.teachingStyle}
                </p>
              </motion.div>
            ) : null}
          </div>

          <div className="min-w-0">
            {strengths?.standoutPrograms?.length ? (
              <motion.div
                variants={fadeUp}
                className="mb-6 rounded-[24px] border border-black/[0.07] bg-[#F7F3EC] p-5"
              >
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  <Layers3 size={14} />
                  Standout programs
                </div>
                <div className="flex flex-wrap gap-2">
                  {strengths.standoutPrograms.map((program) => (
                    <span
                      key={program}
                      className="rounded-full border border-[#0D1B3E]/10 bg-white px-4 py-2 text-[12px] font-bold text-[#0D1B3E]"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {cardItems.length ? (
              <motion.div
                variants={stagger}
                className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
              >
                {cardItems.map(({ item, label }, index) => (
                  <StrengthCard
                    key={`${label}-${item.title}-${index}`}
                    item={item}
                    label={label}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={fadeUp}
                className="rounded-[24px] border border-black/[0.07] bg-[#F7F3EC] p-6"
              >
                <BookOpenCheck className="mb-4 text-[#C9A84C]" size={22} />
                <p className="text-[14px] leading-7 text-slate-600">
                  Academic highlights for {university.name} will appear here
                  once the CMS fields are completed.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
