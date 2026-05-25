"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  CalendarClock,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";

// --- Subcomponent Imports ---
// Ensure these paths match your project structure
import SectionHeading from "./SectionHeading";
import UpdatesCard from "./UpdatesCard";

// --- Animation Variants ---

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing
    },
  },
};

const FILTERS = [
  "ALL",
  "UCAS",
  "LNAT",
  "OXBRIDGE",
  "INTERVIEWS",
] as const;

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
    note:
      "This is unofficial preparation time, but it heavily influences elite law school outcomes.",
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
    note:
      "Strong applicants usually begin drafting applications months before submission.",
  },
  {
    id: 3,
    month: "AUGUST 2026",
    title: "LNAT Registration Opens",
    short:
      "Students can now reserve their LNAT testing slot.",
    category: ["LNAT"],
    urgency: "important",
    icon: Clock3,
    details: [
      "Book LNAT exam slot early.",
      "Choose preferred test center.",
      "Continue refining UCAS application.",
      "Practice timed comprehension sections.",
    ],
    note:
      "Popular testing centers can fill quickly during peak admissions season.",
  },
  {
    id: 4,
    month: "SEPTEMBER 2026",
    title: "Testing & Submission Window Begins",
    short:
      "UCAS submissions and LNAT testing officially begin.",
    category: ["UCAS", "LNAT"],
    urgency: "important",
    icon: CalendarClock,
    details: [
      "Begin submitting completed UCAS applications.",
      "Attempt LNAT during the early testing cycle.",
      "Finalize academic references and documents.",
      "Review Oxbridge-specific requirements.",
    ],
    note:
      "Taking the LNAT earlier gives more buffer before the Oxford deadline.",
  },
  {
    id: 5,
    month: "15 OCTOBER 2026",
    title: "Oxford / Cambridge Final Deadline",
    short:
      "The most critical deadline for elite UK law applicants.",
    category: ["UCAS", "LNAT", "OXBRIDGE"],
    urgency: "critical",
    icon: ShieldAlert,
    details: [
      "Submit Oxford or Cambridge UCAS application.",
      "Complete LNAT before the deadline.",
      "Applicable for Medicine, Dentistry, and Veterinary courses too.",
      "Late submissions are generally not accepted.",
    ],
    note:
      "Missing this deadline can invalidate an Oxbridge law application entirely.",
  },
  {
    id: 6,
    month: "NOVEMBER — DECEMBER 2026",
    title: "Oxford / Cambridge Interviews",
    short:
      "Shortlisted applicants are invited for academic interviews.",
    category: ["INTERVIEWS", "OXBRIDGE"],
    urgency: "important",
    icon: GraduationCap,
    details: [
      "Prepare for analytical and discussion-based interviews.",
      "Expect critical thinking and reasoning questions.",
      "Review personal statement and submitted material.",
      "Practice structured argument formation.",
    ],
    note:
      "Oxford interviews evaluate intellectual curiosity more than memorized legal knowledge.",
  },
  {
    id: 7,
    month: "JANUARY 2027",
    title: "Main UCAS Deadline",
    short:
      "Final application deadline for most non-Oxbridge universities.",
    category: ["UCAS"],
    urgency: "critical",
    icon: FileText,
    details: [
      "Submit applications for remaining UK universities.",
      "Ensure all academic references are completed.",
      "Track application confirmations and communications.",
      "Prepare for potential university-specific follow-ups.",
    ],
    note:
      "Many top universities outside Oxbridge still receive highly competitive law applications.",
  },
];

// --- Component ---

export default function LNATTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>(
    "ALL"
  );
  const [expandedId, setExpandedId] = useState<number | null>(5);

  const filteredTimeline = useMemo(() => {
    if (activeFilter === "ALL") return timelineData;

    return timelineData.filter((item) =>
      item.category.includes(activeFilter)
    );
  }, [activeFilter]);

  // Data for the UpdatesCard
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

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-linear-to-b from-[#FDFBF7] to-white py-20 md:py-10 overflow-hidden border-t border-b border-[#0F172A]/5"
    >
      {/* Subtle Editorial Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#C4A47C]/20 to-transparent"></div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full"
      >
        {/* 1. Header Section */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-16 md:mb-24"
        >
          <SectionHeading
            badge="2026 Admissions Timeline"
            title="Plan Your LNAT Journey"
            description="A comprehensive schedule of critical milestones, registration deadlines, and testing windows required for the elite university admissions cycle. Missing a deadline can invalidate your entire application."
            align="center"
          />
        </motion.div>

        {/* 2. Interactive Timeline Experience */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-20 md:mb-28"
        >
          <div className="max-w-7xl mx-auto">
            {/* Strategic Overview Rail */}
            <div className="relative overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="min-w-max flex items-center gap-4 md:gap-6 px-1">
                {timelineData.map((item, index) => {
                  const isCritical = item.urgency === "critical";

                  return (
                    <React.Fragment key={item.id}>
                      <button
                        onClick={() => setExpandedId(item.id)}
                        className={`group relative shrink-0 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                          expandedId === item.id
                            ? "border-[#C4A47C]/60 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                            : "border-[#0F172A]/10 bg-white/80 hover:border-[#C4A47C]/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              isCritical ? "bg-[#8B1E1E]" : "bg-[#C4A47C]"
                            }`}
                          />

                          <span className="text-[10px] tracking-[0.24em] uppercase text-[#64748B] font-medium">
                            {item.month}
                          </span>
                        </div>

                        <p className="text-sm md:text-[15px] font-semibold text-[#0F172A] max-w-[180px] leading-relaxed">
                          {item.title}
                        </p>
                      </button>

                      {index !== timelineData.length - 1 && (
                        <div className="h-px w-12 bg-linear-to-r from-[#C4A47C]/40 to-transparent" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-10 md:mb-14">
              {FILTERS.map((filter) => {
                const active = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                      active
                        ? "border-[#C4A47C]/60 bg-[#0F172A] text-white"
                        : "border-[#0F172A]/10 bg-white text-[#475569] hover:border-[#C4A47C]/40"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Main Timeline */}
            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 hidden md:block w-px bg-linear-to-b from-[#C4A47C]/10 via-[#C4A47C]/50 to-transparent" />

              <div className="space-y-6 md:space-y-8">
                {filteredTimeline.map((item) => {
                  const expanded = expandedId === item.id;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative"
                    >
                      <div className="flex items-start gap-5">
                        {/* Timeline Node */}
                        <div className="relative z-10 hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C4A47C]/30 bg-white shadow-sm">
                          <Icon className="h-4 w-4 text-[#0F172A]" />
                        </div>

                        {/* Card */}
                        <div
                          className={`w-full rounded-[28px] border transition-all duration-300 ${
                            expanded
                              ? "border-[#C4A47C]/50 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                              : "border-[#0F172A]/8 bg-white/90 hover:border-[#C4A47C]/30"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setExpandedId(expanded ? null : item.id)
                            }
                            className="w-full text-left p-6 md:p-8"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                              <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#64748B] font-medium">
                                    {item.month}
                                  </span>

                                  {item.category.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full border border-[#C4A47C]/20 bg-[#C4A47C]/8 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#8A6A42]"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <h3 className="text-[1.15rem] md:text-[1.45rem] font-semibold tracking-[-0.03em] text-[#0F172A] leading-tight mb-3">
                                  {item.title}
                                </h3>

                                <p className="text-sm md:text-[15px] leading-7 text-[#475569] max-w-2xl">
                                  {item.short}
                                </p>
                              </div>

                              <div className="flex items-center gap-4">
                                <div
                                  className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] border ${
                                    item.urgency === "critical"
                                      ? "border-[#8B1E1E]/20 bg-[#8B1E1E]/6 text-[#8B1E1E]"
                                      : item.urgency === "important"
                                      ? "border-[#C4A47C]/30 bg-[#C4A47C]/8 text-[#8A6A42]"
                                      : "border-[#0F172A]/10 bg-[#0F172A]/4 text-[#475569]"
                                  }`}
                                >
                                  {item.urgency}
                                </div>

                                <motion.div
                                  animate={{ rotate: expanded ? 180 : 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="rounded-full border border-[#0F172A]/10 p-2"
                                >
                                  <ChevronDown className="h-4 w-4 text-[#475569]" />
                                </motion.div>
                              </div>
                            </div>
                          </button>

                          <motion.div
                            initial={false}
                            animate={{
                              height: expanded ? "auto" : 0,
                              opacity: expanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 pb-7 md:pb-8 border-t border-[#0F172A]/6">
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-7">
                                <div className="lg:col-span-7">
                                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B] mb-5 font-medium">
                                    Student Action Plan
                                  </p>

                                  <div className="space-y-4">
                                    {item.details.map((detail, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-4"
                                      >
                                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C4A47C] shrink-0" />

                                        <p className="text-sm md:text-[15px] leading-7 text-[#334155]">
                                          {detail}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="lg:col-span-5">
                                  <div className="rounded-2xl border border-[#C4A47C]/15 bg-[#F8F5EF] p-6 h-full">
                                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#8A6A42] mb-4 font-medium">
                                      Strategic Note
                                    </p>

                                    <p className="text-sm md:text-[15px] leading-7 text-[#475569]">
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
        <motion.div variants={blockVariants} className="px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Updates Card (Left Column on Desktop) */}
            <div className="lg:col-span-5 w-full">
              <UpdatesCard
                badge="2026 Cycle Updates"
                title="Critical Adjustments"
                description="The LNAT Consortium has finalized the testing windows. Ensure your application remains valid by adhering to these hard deadlines."
                icon={CalendarClock}
                items={updatesData}
                delay={0.2}
              />
            </div>

            <div className="lg:col-span-7 w-full">
              <div className="rounded-[32px] border border-[#0F172A]/8 bg-white p-7 md:p-10 shadow-[0_15px_50px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-2xl bg-[#0F172A] flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B] font-medium mb-1">
                      Strategic Admissions Notes
                    </p>

                    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-[#0F172A]">
                      Understanding the UK Law Admissions Flow
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-[#C4A47C]/15 bg-[#F8F5EF] p-5 md:p-6">
                    <p className="text-sm md:text-[15px] leading-7 text-[#475569]">
                      UCAS is not an entrance examination. It is the centralized university application platform used by students applying to UK undergraduate programs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-2xl border border-[#0F172A]/8 p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#64748B] mb-3 font-medium">
                        UCAS Purpose
                      </p>

                      <ul className="space-y-3 text-sm md:text-[15px] text-[#475569] leading-7">
                        <li>• Submit university applications</li>
                        <li>• Add personal statement</li>
                        <li>• Upload academic references</li>
                        <li>• Manage university choices</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-[#0F172A]/8 p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#64748B] mb-3 font-medium">
                        LNAT Purpose
                      </p>

                      <ul className="space-y-3 text-sm md:text-[15px] text-[#475569] leading-7">
                        <li>• Assess critical reasoning ability</li>
                        <li>• Evaluate reading comprehension</li>
                        <li>• Measure argumentative thinking</li>
                        <li>• Support elite law admissions decisions</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#8B1E1E]/10 bg-[#8B1E1E]/4 p-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8B1E1E] mb-3 font-medium">
                      Important Clarification
                    </p>

                    <p className="text-sm md:text-[15px] leading-7 text-[#475569]">
                      For universities such as Oxford, UCL, LSE, and King’s College London, students must complete both the UCAS application and the LNAT examination. One does not replace the other.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
