"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
  type LucideIcon,
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

interface AnswerItem {
  label: string;
  answer: string;
  icon: LucideIcon;
}

// Cards are a fixed height with the answer clamped to 4 lines. Any answer
// longer than this gets a "Read more" that opens the full text in a dialog,
// so one long answer can never stretch its card or misalign the row.
const READ_MORE_THRESHOLD = 160;

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
  const [active, setActive] = useState<AnswerItem | null>(null);

  // While the dialog is open: close on Escape and lock body scroll.
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  const directAnswers = university.directAnswers;
  const answers: AnswerItem[] = [
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
  ].filter((item): item is AnswerItem => Boolean(item.answer));

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
            const isLong = item.answer.length > READ_MORE_THRESHOLD;

            return (
              <motion.article
                key={item.label}
                variants={fadeUp}
                custom={index * 0.08}
                className="mr-4 flex h-72.5 w-[82vw] max-w-[320px] shrink-0 snap-center flex-col rounded-3xl border border-black/[0.07] bg-white p-5 shadow-[0_12px_30px_rgba(20,31,45,0.05)] md:mr-0 md:w-full md:max-w-none"
              >
                <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                  <Icon size={19} strokeWidth={2.2} />
                </div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#0D1B3E]">
                  {item.label}
                </h3>
                <div className="mt-4 flex-1 overflow-hidden">
                  <p className="line-clamp-4 text-[14px] leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </div>
                {isLong && (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="mt-3 self-end text-[12px] font-bold uppercase tracking-[0.12em] text-[#C9A84C] transition-colors hover:text-[#a8862f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
                  >
                    Read more
                  </button>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Full-answer dialog — one card at a time, no inline expansion */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="direct-answer-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
          >
            <div
              className="absolute inset-0 bg-[#0D1B3E]/55 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[82vh] w-full max-w-xl flex-col rounded-3xl border border-black/[0.07] bg-white shadow-[0_24px_60px_rgba(13,27,62,0.25)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-black/6 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                    <active.icon size={19} strokeWidth={2.2} />
                  </div>
                  <h3 className="text-[14px] font-extrabold uppercase tracking-[0.14em] text-[#0D1B3E]">
                    {active.label}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0D1B3E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto p-5 sm:p-6">
                <p className="text-[15px] leading-8 text-slate-700">
                  {active.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
