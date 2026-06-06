"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  CalendarClock,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  ShieldAlert,
  AlertCircle,
} from "lucide-react";

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const FILTERS = ["ALL", "UCAS", "LNAT", "OXBRIDGE", "INTERVIEWS"] as const;

const timelineData = [
  {
    id: 1,
    month: "JAN — JUL 2026",
    title: "Early Preparation Phase",
    short:
      "Students begin profile building, LNAT preparation, and legal reading.",
    category: ["LNAT"],
    urgency: "normal",
    icon: GraduationCap,
    details: [
      "Build academic profile and supercurricular depth.",
      "Read legal essays, current affairs, and opinion journalism.",
      "Begin structured LNAT preparation.",
      "Draft early personal statement ideas.",
    ],
    note: "This is unofficial preparation time, but it heavily influences elite law school outcomes.",
  },
  {
    id: 2,
    month: "MAY 2026",
    title: "UCAS Applications Open",
    short:
      "Students can officially begin their UCAS application for 2027 entry.",
    category: ["UCAS"],
    urgency: "important",
    icon: FileText,
    details: [
      "Create UCAS account.",
      "Start drafting personal statement.",
      "Shortlist universities.",
      "Understand LNAT university requirements.",
    ],
    note: "Strong applicants usually begin drafting applications months before submission.",
  },
  {
    id: 3,
    month: "AUGUST 2026",
    title: "LNAT Registration Opens",
    short: "Students can now reserve their LNAT testing slot.",
    category: ["LNAT"],
    urgency: "important",
    icon: Clock3,
    details: [
      "Book LNAT exam slot early.",
      "Choose preferred test center.",
      "Continue refining UCAS application.",
      "Practice timed comprehension sections.",
    ],
    note: "Popular testing centers in India fill quickly during peak admissions season.",
  },
  {
    id: 4,
    month: "SEPTEMBER 2026",
    title: "Testing & Submission Window",
    short: "UCAS submissions and LNAT testing officially begin.",
    category: ["UCAS", "LNAT"],
    urgency: "important",
    icon: CalendarClock,
    details: [
      "Begin submitting completed UCAS applications.",
      "Attempt LNAT during the early testing cycle.",
      "Finalize academic references and documents.",
      "Review Oxbridge-specific requirements.",
    ],
    note: "Taking the LNAT earlier gives more buffer before the Oxford deadline.",
  },
  {
    id: 5,
    month: "15 OCTOBER 2026",
    title: "Oxbridge Final Deadline",
    short: "The most critical deadline for elite UK law applicants.",
    category: ["UCAS", "LNAT", "OXBRIDGE"],
    urgency: "critical",
    icon: ShieldAlert,
    details: [
      "Submit Oxford or Cambridge UCAS application.",
      "Complete LNAT before the deadline.",
      "Applicable for Medicine, Dentistry, and Veterinary courses too.",
      "Late submissions are generally not accepted.",
    ],
    note: "Missing this deadline can invalidate an Oxbridge law application entirely.",
  },
  {
    id: 6,
    month: "NOV — DEC 2026",
    title: "Oxbridge Interviews",
    short: "Shortlisted applicants are invited for academic interviews.",
    category: ["INTERVIEWS", "OXBRIDGE"],
    urgency: "important",
    icon: GraduationCap,
    details: [
      "Prepare for analytical and discussion-based interviews.",
      "Expect critical thinking and reasoning questions.",
      "Review personal statement and submitted material.",
      "Practice structured argument formation.",
    ],
    note: "Oxford interviews evaluate intellectual curiosity more than memorized legal knowledge.",
  },
  {
    id: 7,
    month: "JANUARY 2027",
    title: "Main UCAS Deadline",
    short: "Final application deadline for most non-Oxbridge universities.",
    category: ["UCAS"],
    urgency: "critical",
    icon: FileText,
    details: [
      "Submit applications for remaining UK universities.",
      "Ensure all academic references are completed.",
      "Track application confirmations and communications.",
      "Prepare for potential university-specific follow-ups.",
    ],
    note: "Many top universities outside Oxbridge still receive highly competitive law applications.",
  },
];

const updatesData = [
  {
    id: "u1",
    text: "Indian students applying to Oxford Law should ideally complete LNAT preparation before September.",
  },
  {
    id: "u2",
    text: "UCAS and LNAT are separate systems — both are required for LNAT universities.",
  },
  {
    id: "u3",
    text: "Predicted Class 12 scores play a major role in UK undergraduate admissions.",
  },
];

export default function LNATTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("ALL");
  const [expandedId, setExpandedId] = useState<number | null>(5);

  const filteredTimeline = useMemo(() => {
    if (activeFilter === "ALL") return timelineData;
    return timelineData.filter((item) => item.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      ref={containerRef}
      id="exam-timeline"
      className="relative w-full border-y border-black/[0.07] bg-[#F7F3EC] py-14 md:py-20 overflow-hidden"
    >
      {/* Design System Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto max-w-[1280px]"
      >
        {/* 1. Header Section (Inlined SectionHeading) */}
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-col items-center text-center px-4 md:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-[#C9A84C]/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              2026 Admissions Timeline
            </span>
            <div className="h-px w-6 bg-[#C9A84C]/40" />
          </div>
          <h2 className="mb-4 text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] max-w-2xl">
            Plan Your{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              LNAT Journey
            </span>
          </h2>
          <p className="max-w-2xl text-[13px] md:text-[14px] leading-relaxed text-slate-500">
            A comprehensive schedule of critical milestones, registration
            deadlines, and testing windows required for the elite university
            admissions cycle. Missing a deadline can invalidate your entire
            application.
          </p>
        </motion.div>

        {/* 2. Interactive Timeline Experience */}
        <motion.div variants={fadeUp} className="mb-16 md:mb-24">
          <div className="mx-auto max-w-5xl">
            {/* Top Overview Rail (Mobile Horizontal Scroll) */}
            <div className="-mx-4 mb-8 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mb-10 md:px-0">
              <div className="flex items-center gap-3 md:gap-4">
                {timelineData.map((item, index) => {
                  const isCritical = item.urgency === "critical";
                  const isActive = expandedId === item.id;
                  return (
                    <React.Fragment key={`rail-${item.id}`}>
                      <button
                        onClick={() => setExpandedId(item.id)}
                        className={`group relative shrink-0 snap-center rounded-2xl border px-5 py-3 text-left transition-all duration-300 md:py-4 ${
                          isActive
                            ? "border-[#C9A84C]/40 bg-white shadow-[0_12px_30px_rgba(13,27,62,0.08)]"
                            : "border-black/[0.05] bg-white/60 hover:border-[#C9A84C]/30 hover:bg-white"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2 md:mb-3">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${
                              isCritical ? "bg-[#8B1E1E]" : "bg-[#C9A84C]"
                            }`}
                          />
                          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            {item.month}
                          </span>
                        </div>
                        <p
                          className={`text-[12px] md:text-[14px] font-bold leading-snug transition-colors ${
                            isActive
                              ? "text-[#0D1B3E]"
                              : "text-slate-600 group-hover:text-[#0D1B3E]"
                          }`}
                        >
                          {item.title}
                        </p>
                      </button>
                      {index !== timelineData.length - 1 && (
                        <div className="hidden h-px w-8 bg-gradient-to-r from-[#C9A84C]/40 to-transparent md:block" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 px-4 md:mb-12 md:justify-start md:px-0">
              {FILTERS.map((filter) => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                      active
                        ? "border-[#0D1B3E] bg-[#0D1B3E] text-[#C9A84C] shadow-md"
                        : "border-black/[0.06] bg-white text-slate-500 hover:border-[#C9A84C]/40 hover:text-[#0D1B3E]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Main Vertical/Horizontal Timeline */}
            <div className="relative">
              {/* Desktop Vertical Connecting Line */}
              <div className="absolute bottom-0 left-[18px] top-0 hidden w-px bg-gradient-to-b from-[#C9A84C]/10 via-[#C9A84C]/40 to-transparent md:block" />

              {/* Responsive Container: Horizontal Scroll on Mobile, Vertical Stack on Desktop */}
              <div className="-mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-col md:gap-6 md:overflow-visible md:px-0 md:pb-0">
                {filteredTimeline.map((item) => {
                  const expanded = expandedId === item.id;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={`main-${item.id}`}
                      layout
                      className="relative w-[85vw] max-w-[340px] shrink-0 snap-center md:w-full md:max-w-none md:shrink"
                    >
                      <div className="flex items-start gap-5">
                        {/* Timeline Node (Desktop Only) */}
                        <div className="relative z-10 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#FDFBF7] shadow-sm md:flex">
                          <Icon size={16} className="text-[#0D1B3E]" />
                        </div>

                        {/* Expandable Card */}
                        <div
                          className={`w-full overflow-hidden rounded-2xl border transition-all duration-300 ${
                            expanded
                              ? "border-[#C9A84C]/40 bg-white shadow-[0_16px_40px_rgba(13,27,62,0.08)]"
                              : "border-black/[0.06] bg-[#FDFBF7] hover:border-[#C9A84C]/30 hover:bg-white"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setExpandedId(expanded ? null : item.id)
                            }
                            className="w-full p-5 text-left md:p-6"
                          >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
                              <div className="max-w-2xl">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                    {item.month}
                                  </span>
                                  {item.category.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full bg-[#C9A84C]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#0D1B3E] md:text-[20px]">
                                  {item.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed text-slate-500 md:text-[14px]">
                                  {item.short}
                                </p>
                              </div>

                              <div className="flex items-center justify-between lg:justify-end gap-4">
                                <div
                                  className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                                    item.urgency === "critical"
                                      ? "border-[#8B1E1E]/20 bg-[#8B1E1E]/10 text-[#8B1E1E]"
                                      : item.urgency === "important"
                                      ? "border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C]"
                                      : "border-black/[0.05] bg-black/[0.03] text-slate-500"
                                  }`}
                                >
                                  {item.urgency}
                                </div>
                                <motion.div
                                  animate={{ rotate: expanded ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="rounded-full bg-slate-100 p-1.5 text-slate-500"
                                >
                                  <ChevronDown size={14} />
                                </motion.div>
                              </div>
                            </div>
                          </button>

                          {/* Expanded Content (In DOM for AEO) */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: expanded ? "auto" : 0,
                              opacity: expanded ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <div className="border-t border-black/[0.05] p-5 md:p-6">
                              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                                <div className="lg:col-span-7">
                                  <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                                    <GraduationCap size={14} /> Student Action
                                    Plan
                                  </p>
                                  <div className="space-y-3">
                                    {item.details.map((detail, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-3"
                                      >
                                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D1B3E]/20" />
                                        <p className="text-[13px] leading-relaxed text-slate-600 md:text-[14px]">
                                          {detail}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="lg:col-span-5">
                                  <div className="h-full rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.04] p-5">
                                    <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                                      <AlertCircle size={14} /> Strategic Note
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-slate-600 md:text-[14px]">
                                      {item.note}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Updates & Advisory Notes Area */}
        <motion.div variants={fadeUp} className="px-4 md:px-0">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Updates Card (Inlined Premium Dark Card) */}
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#C9A84C]/15 bg-[#0D1B3E] p-6 shadow-[0_16px_48px_rgba(13,27,62,0.2)] lg:col-span-5 md:p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                  <CalendarClock size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]/70">
                    2026 Cycle Updates
                  </p>
                  <h3 className="mt-0.5 text-[16px] font-bold text-white md:text-[18px]">
                    Critical Adjustments
                  </h3>
                </div>
              </div>
              <p className="mb-6 text-[13px] leading-relaxed text-white/60">
                The LNAT Consortium has finalized the testing windows. Ensure
                your application remains valid by adhering to these hard
                deadlines.
              </p>
              <div className="flex flex-col gap-3">
                {updatesData.map((update) => (
                  <div
                    key={update.id}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                    <p className="text-[12px] leading-relaxed text-white/80 md:text-[13px]">
                      {update.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Notes Panel */}
            <div className="rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] lg:col-span-7 md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D1B3E]/[0.06] text-[#0D1B3E]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Admissions Notes
                  </p>
                  <h3 className="text-[16px] font-bold text-[#0D1B3E] md:text-[20px]">
                    Understanding the UK Flow
                  </h3>
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                <div className="rounded-xl border border-black/[0.04] bg-[#FDFBF7] p-4 md:p-5">
                  <p className="text-[13px] leading-relaxed text-slate-600 md:text-[14px]">
                    UCAS is not an entrance examination. It is the centralized
                    university application platform used by students applying to
                    UK undergraduate programs.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  <div className="rounded-xl border border-black/[0.04] p-4 md:p-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      UCAS Purpose
                    </p>
                    <ul className="space-y-2 text-[13px] text-slate-600 md:text-[14px]">
                      <li className="flex gap-2">
                        <span className="text-[#C9A84C]">•</span> Submit
                        applications
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#C9A84C]">•</span> Personal
                        statement
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#C9A84C]">•</span> Academic
                        references
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-black/[0.04] p-4 md:p-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      LNAT Purpose
                    </p>
                    <ul className="space-y-2 text-[13px] text-slate-600 md:text-[14px]">
                      <li className="flex gap-2">
                        <span className="text-[#C9A84C]">•</span> Critical
                        reasoning
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#C9A84C]">•</span> Reading
                        comprehension
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#C9A84C]">•</span> Argumentative
                        essay
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-[#8B1E1E]/20 bg-[#8B1E1E]/[0.04] p-4 md:p-5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B1E1E]">
                    Important Clarification
                  </p>
                  <p className="text-[13px] leading-relaxed text-[#8B1E1E]/80 md:text-[14px]">
                    For universities such as Oxford, UCL, LSE, and King’s
                    College London, students must complete both the UCAS
                    application and the LNAT examination. One does not replace
                    the other.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
