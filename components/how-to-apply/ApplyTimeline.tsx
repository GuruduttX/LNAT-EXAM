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
    title: "The UCAS Application",
    subtitle: "University Application Process",
    icon: Landmark,
    content:
      "Before sitting the LNAT, you must begin your primary university application via UCAS. Ensure you note the specific UCAS deadlines for your target institutions (typically October 15th for Oxbridge, January 31st for others). You will need your UCAS Personal Identifier number to register for the LNAT.",
  },
  {
    numeral: "II",
    title: "Account Creation & Registration",
    subtitle: "Step-by-Step LNAT Registration",
    icon: UserPlus,
    content:
      "Navigate to the official Pearson VUE LNAT portal. You must create an online account using your exact legal name as it appears on your passport. During this phase, you will link your LNAT profile to the specific universities you are applying to.",
  },
  {
    numeral: "III",
    title: "Booking Your Examination",
    subtitle: "The Booking Process",
    icon: CalendarCheck,
    content:
      "Once registered, select your preferred Pearson VUE test center (available in major Indian cities like Delhi, Mumbai, Bangalore). Testing slots in major international hubs fill rapidly. We strongly advise booking your slot at least two months prior to your university's specific deadline.",
  },
  {
    numeral: "IV",
    title: "Before The Test",
    subtitle: "Preparation & Logistics",
    icon: Laptop,
    content:
      "In the weeks prior, familiarize yourself with the desktop interface using the official practice simulator. On the day before, confirm your test center location in India, ensure your primary ID (passport) is ready, and print your booking confirmation.",
  },
  {
    numeral: "V",
    title: "After The Test",
    subtitle: "What Happens Next",
    icon: MailCheck,
    content:
      "You will not receive your results immediately. Your scores and essay are sent directly to your selected universities. If you tested before January 26th, your personal results will be emailed to you by mid-February. The universities will use these scores alongside your UCAS application to make decisions.",
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
            How to Apply for the{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              LNAT in India
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-500">
            A comprehensive roadmap from starting your UCAS application to
            receiving your final LNAT scores.
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
