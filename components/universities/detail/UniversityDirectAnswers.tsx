"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface UniversityDirectAnswersProps {
  university: {
    name: string;
    lnatRequirement?: string;
    directAnswers?: {
      whatIsSpecial?: string;
      whyStudyLawHere?: string;
      doesItRequireLNAT?: string;
      whatKindOfStudentFits?: string;
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

export default function UniversityDirectAnswers({
  university,
}: UniversityDirectAnswersProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const directAnswers = university.directAnswers;
  const answers = [
    {
      label: "What makes it special?",
      answer: directAnswers?.whatIsSpecial,
      icon: Sparkles,
    },
    {
      label: "Why study law here?",
      answer: directAnswers?.whyStudyLawHere,
      icon: GraduationCap,
    },
    {
      label: "Does it require LNAT?",
      answer:
        directAnswers?.doesItRequireLNAT ||
        (university.lnatRequirement
          ? `LNAT status for this university: ${university.lnatRequirement}.`
          : undefined),
      icon: ShieldCheck,
    },
    {
      label: "Best-fit student",
      answer: directAnswers?.whatKindOfStudentFits,
      icon: UserCheck,
    },
  ].filter((item) => item.answer);

  if (!answers.length) return null;
 
  return (
    <section
      ref={ref}
      className="border-t border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 flex items-center justify-center gap-2"
          >
            <div className="h-px w-8 bg-[#C9A84C]/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Direct Answers
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]"
          >
            Quick answers about{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              {university.name}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-600"
          >
            These short answers are written for students, search engines, and AI
            answer engines that need clear context before the deeper page content.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="-mx-4 mt-8 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4"
        >
          {answers.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.label}
                variants={fadeUp}
                custom={index * 0.08}
                className="mr-4 flex min-h-[230px] w-[82vw] max-w-[320px] shrink-0 snap-center flex-col rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-[0_12px_30px_rgba(20,31,45,0.05)] md:mr-0 md:w-full md:max-w-none"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                  <Icon size={19} strokeWidth={2.2} />
                </div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#0D1B3E]">
                  {item.label}
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-slate-600">
                  {item.answer}
                </p>
              </motion.article> 
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 