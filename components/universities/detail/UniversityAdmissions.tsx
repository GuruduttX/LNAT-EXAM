"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  CheckCircle2,
  Landmark,
  Target,
  Calendar,
  FileText,
  Lightbulb,
  X,
  type LucideIcon,
} from "lucide-react";

interface PolicyCard {
  title: string;
  text: string;
  icon: LucideIcon;
}

// Policy cards are a fixed height with the text clamped to 4 lines. Anything
// longer gets a "Read more" that opens the full text in a dialog, so a long
// value from the CMS can never stretch a card or misalign the row.
const READ_MORE_THRESHOLD = 120;

// Simplified Type for Schema Mapping
interface UniversityAdmissionsProps {
  university: {
    name: string;
    lnatRequirement?: string;
    applicationDeadline?: string;
    admissions?: {
      overview?: string;
      howLNATIsUsed?: string;
      targetLNATScore?: string;
      essayPolicy?: string;
      applicationTips?: string[];
      requiredQualifications?: string;
      deadlinesNotes?: string;
      interviewRequired?: boolean;
      essayConsidered?: boolean;
    };
  };
}

// Design System Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export default function UniversityAdmissions({
  university,
}: UniversityAdmissionsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [active, setActive] = useState<PolicyCard | null>(null);

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

  const { admissions, lnatRequirement, applicationDeadline } = university;
  const policyCards: PolicyCard[] = [
    {
      title: "Essay policy",
      text: admissions?.essayPolicy,
      icon: FileText,
    },
    {
      title: "Required qualifications",
      text: admissions?.requiredQualifications,
      icon: CheckCircle2,
    },
    {
      title: "Deadline notes",
      text: admissions?.deadlinesNotes,
      icon: Calendar,
    },
  ].filter((item): item is PolicyCard => Boolean(item.text));

  // Defensive rendering: If no admissions data exists, don't render the section.
  if (
    !admissions?.overview &&
    !admissions?.howLNATIsUsed &&
    !policyCards.length &&
    !admissions?.applicationTips?.length
  ) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative w-full border-t border-black/[0.07] bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Subtle Dot Grid Overlay for depth */}
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
              Admissions
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
          >
            LNAT & Application{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Guidance
            </span>
          </motion.h2>
        </motion.div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* =========================================
              LEFT: ADMISSIONS SNAPSHOT (DARK DASHBOARD)
              ========================================= */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl border border-[#C9A84C]/15 bg-[#0D1B3E] p-6 shadow-[0_16px_48px_rgba(13,27,62,0.2)] md:p-8"
            >
              <h3 className="mb-6 text-[18px] font-bold text-white">
                Admissions Snapshot
              </h3>

              <div className="flex flex-col gap-5">
                {/* Status Row */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#C9A84C]">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      LNAT Status
                    </p>
                    <p className="mt-1 text-[14px] font-bold text-white">
                      {lnatRequirement || "Check official guidelines"}
                    </p>
                  </div>
                </div>

                {/* Target Score Row */}
                {admissions?.targetLNATScore && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/20 text-[#E8C96A]">
                      <Target size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8C96A]/60">
                        Indicative Target
                      </p>
                      <p className="mt-1 text-[16px] font-extrabold text-[#E8C96A]">
                        {admissions.targetLNATScore}
                      </p>
                    </div>
                  </div>
                )}

                {/* Deadline Row */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#C9A84C]">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Application Deadline
                    </p>
                    <p className="mt-1 text-[14px] font-bold text-white">
                      {applicationDeadline || "See UCAS portal"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Interview
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-white">
                      {admissions?.interviewRequired
                        ? "Usually required"
                        : "Not marked as required"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Essay
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-white">
                      {admissions?.essayConsidered
                        ? "Considered in review"
                        : "Not marked as considered"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========================================
              RIGHT: DETAILED GUIDANCE
              ========================================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex min-w-0 flex-col"
          >
            {/* Overview */}
            {admissions?.overview && (
              <motion.p
                variants={fadeUp}
                className="mb-8 text-center text-[14px] leading-relaxed text-slate-600 md:text-start"
              >
                {admissions.overview}
              </motion.p>
            )}

            {/* How LNAT is Used (Design System 6.5 SectionCard) */}
            {admissions?.howLNATIsUsed && (
              <motion.div
                variants={fadeUp}
                className="mb-8 overflow-hidden rounded-2xl border border-black/[0.07] bg-[#FDFBF7] shadow-sm"
              >
                <div className="flex items-center gap-2 border-b border-black/[0.05] bg-[#C9A84C]/[0.06] px-5 py-3.5">
                  <div className="h-[18px] w-[3px] rounded-full bg-[#C9A84C]" />
                  <span className="text-[13px] font-bold text-[#0D1B3E]">
                    How {university.name} uses the LNAT
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-[14px] leading-relaxed text-slate-600">
                    {admissions.howLNATIsUsed}
                  </p>
                </div>
              </motion.div>
            )}

            {policyCards.length > 0 && (
              <motion.div
                variants={stagger}
                className="-mx-4 mb-8 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
              >
                {policyCards.map((item, index) => {
                  const Icon = item.icon;
                  const isLong = item.text.length > READ_MORE_THRESHOLD;

                  return (
                    <motion.article
                      key={item.title}
                      variants={fadeUp}
                      custom={index * 0.08}
                      className="mr-4 flex h-67.5 w-[82vw] max-w-80 shrink-0 snap-center flex-col rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm md:mr-0 md:w-full md:max-w-none"
                    >
                      <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C9A84C]/10 text-[#C9A84C]">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-[15px] font-extrabold text-[#0D1B3E]">
                        {item.title}
                      </h3>
                      <div className="mt-3 flex-1 overflow-hidden">
                        <p className="line-clamp-4 text-[13px] leading-7 text-slate-600">
                          {item.text}
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
            )}

            {/* Application Tips (Interactive Step List) */}
            {admissions?.applicationTips &&
              admissions.applicationTips.length > 0 && (
                <motion.div variants={fadeUp}>
                  <div className="mb-5 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D1B3E] text-[#C9A84C]">
                      <Lightbulb size={14} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#0D1B3E]">
                      Application Strategy
                    </h3>
                  </div>

                  <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pt-2 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
                    {admissions.applicationTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        custom={index * 0.1}
                        className="group mr-3 flex w-[80vw] max-w-80 shrink-0 snap-center items-start gap-4 rounded-xl border border-black/5 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F7F3EC] text-[12px] font-bold text-[#0D1B3E] transition-colors group-hover:bg-[#C9A84C] group-hover:text-white">
                          {index + 1}
                        </div>
                        <p className="mt-[2px] text-[13px] leading-relaxed text-slate-600">
                          {tip}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
          </motion.div>
        </div>
      </div>

      {/* Full-text dialog — one policy card at a time, no inline expansion */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="policy-card-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-80 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C9A84C]/10 text-[#C9A84C]">
                    <active.icon size={18} />
                  </div>
                  <h3 className="text-[15px] font-extrabold text-[#0D1B3E]">
                    {active.title}
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
                <p className="text-[14px] leading-8 text-slate-700">
                  {active.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
