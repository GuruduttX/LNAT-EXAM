"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Landmark,
  UserPlus,
  CalendarCheck,
  Laptop,
  MailCheck,
} from "lucide-react";

const TIMELINE_STEPS = [
  {
    numeral: "I",
    title: "Choose your universities",
    subtitle: "Shortlist LNAT universities",
    icon: Landmark,
    content:
      "Choose your universities from the nine UK LNAT universities, and include JGLS if you are applying in India. Your shortlist determines your LNAT timing, essay strategy and deadline pressure.",
  },
  {
    numeral: "II",
    title: "Check academic requirements",
    subtitle: "Grades and equivalency",
    icon: UserPlus,
    content:
      "Check academic requirements for each course, including A-levels, IB or accepted equivalents. Oxford, for example, lists A-levels AAA or IB 38 with 6,6,6 at Higher Level; Indian-board equivalency must be confirmed university by university.",
  },
  {
    numeral: "III",
    title: "Register and sit the LNAT",
    subtitle: "Pearson VUE booking",
    icon: CalendarCheck,
    content:
      "Register and book through Pearson VUE, pay the international fee, choose your test centre and sit the LNAT once in the cycle. Oxford and Cambridge applicants must finish earliest.",
  },
  {
    numeral: "IV",
    title: "Apply through UCAS",
    subtitle: "One application, five choices",
    icon: Laptop,
    content:
      "Submit one UCAS application with up to five choices, a personal statement and a reference. You cannot apply to both Oxford and Cambridge in the same cycle.",
  },
  {
    numeral: "V",
    title: "Interview and respond to offers",
    subtitle: "Final admissions stage",
    icon: MailCheck,
    content:
      "Attend interviews if shortlisted, especially for Oxbridge, then respond to conditional or unconditional offers through UCAS. JGLS has its own direct admissions process in India.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ApplyTimeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#F7F3EC] px-4 py-14 sm:px-6 md:py-20 lg:px-8 border-b border-black/[0.07]"
    >
      {/* Design System Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-50 [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative z-10 mx-auto max-w-[1024px]">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-[#C9A84C]/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Step-by-Step Guide
            </p>
            <div className="h-px w-6 bg-[#C9A84C]/40" />
          </div>
          <h2 className="text-[clamp(1.5rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] max-w-2xl">
            The application steps for{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              UK & JGLS law
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-500">
            A practical roadmap from shortlisting and academic requirements to
            LNAT booking, UCAS submission, interviews and offers.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line (Left on mobile, Center on desktop) */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C]/30 to-[#C9A84C]/0 md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-24">
            {TIMELINE_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <TimelineNode
                  key={step.numeral}
                  step={step}
                  isEven={isEven}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual timeline items to handle their own scroll triggers
function TimelineNode({
  step,
  isEven,
  index,
}: {
  step: any;
  isEven: boolean;
  index: number;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isNodeInView = useInView(nodeRef, { once: true, margin: "-15% 0px" });

  return (
    <div
      ref={nodeRef}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Central Node Icon */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F7F3EC] bg-[#0D1B3E] text-[#C9A84C] shadow-sm">
        <step.icon size={18} strokeWidth={2} />
      </div>

      {/* Content Card */}
      <div
        className={`w-full pl-20 md:w-1/2 md:pl-0 ${
          isEven ? "md:pr-16" : "md:pl-16"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          animate={
            isNodeInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isEven ? -20 : 20 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
        >
          {/* Numeral Watermark */}
          <div className="absolute -right-4 -top-6 text-[80px] font-extrabold text-slate-50 transition-colors group-hover:text-[#C9A84C]/[0.03] pointer-events-none select-none">
            {step.numeral}
          </div>

          <div className="relative z-10">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Step {index + 1} • {step.subtitle}
            </span>
            <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#0D1B3E]">
              {step.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-500">
              {step.content}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
