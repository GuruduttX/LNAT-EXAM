"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// Design System: Module-level variants
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

const float: Variants = {
  animate: (delay: number = 0) => ({
    y: [0, -8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  }),
};

export default function ApplyHero() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <>
    <EnquiryPopupForm isOpen={isOpen} onClose={()=> setIsOpen(false)} source="how-to-apply"/>
      <section
        ref={ref}
        className="relative w-full overflow-hidden bg-[#F7F3EC] px-4 py-14 sm:px-6 md:py-20 lg:px-8 border-b border-black/[0.07]"
      >
        {/* Design System: Light theme dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
        />

        {/* Subtle ambient light glow (Gold) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "How To Apply", href: "/how-to-apply" },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* ========================================== */}
            {/* LEFT CONTENT: Editorial & Typography       */}
            {/* ========================================== */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col text-center lg:text-left"
            >
              {/* Design System Pill (Light Theme) */}
              <motion.div
                variants={fadeUp}
                className="mb-6 flex justify-center lg:justify-start"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A84C]/[0.08] border border-[#C9A84C]/20 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-[#C9A84C]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                  India Application Guide
                </span>
              </motion.div>

              {/* Cinematic Heading (Navy + Gold) */}
              <motion.h1
                variants={fadeUp}
                className="text-[clamp(1.9rem,4.8vw,3.8rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] mb-5"
              >
                How to Apply for UK & JGLS Law from India:{" "}
                <br className="hidden lg:block" />
                <span className="bg-linear-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                  Full Guide
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                variants={fadeUp}
                className="text-[14px] text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                To apply for UK law from India: meet the academic requirements,
                register and sit the LNAT, apply through UCAS with up to five
                choices, submit your personal statement and reference, and
                attend interviews where required. JGLS uses the LNAT directly.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                {/* Primary Action */}
                <button
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                  }}
                  onClick={()=> setIsOpen(true)}
                >
                  Talk to a Mentor
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                {/* Secondary Action (Light Card Style) */}
                <button className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md sm:w-auto">
                  <Download size={14} className="text-[#C9A84C]" />
                  View Key Deadlines
                </button>
              </motion.div>

              {/* Trust Indicator */}
              <motion.div
                variants={fadeUp}
                className="flex items-center justify-center lg:justify-start gap-2 pt-6 border-t border-black/[0.05] text-[11px] font-semibold text-slate-400"
              >
                <ShieldCheck size={14} className="text-[#C9A84C]" />
                  <span className="uppercase tracking-wider">
                  Oxford and Cambridge have the earliest deadline
                </span>
              </motion.div>
            </motion.div>

            {/* ========================================== */}
            {/* RIGHT VISUAL: Light Theme Composition      */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
              className="relative h-100 sm:h-125 lg:h-137.5 w-full hidden md:flex items-center justify-center lg:justify-end"
            >
              {/* Main Image Container */}
              <div className="relative w-full max-w-120 aspect-4/5 lg:aspect-4/5 rounded-3xl overflow-hidden border border-black/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop"
                  alt="Elite University Architecture"
                  draggable={false}
                  className="w-full h-full object-cover object-center scale-105 transform hover:scale-110 transition-transform duration-[20s] ease-out"
                />

                {/* Light Theme subtle dark gradient at bottom for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
              </div>

              {/* Floating UI Card 1: UCAS (Light Glassmorphism) */}
              <motion.div
                variants={float}
                animate="animate"
                custom={0}
                className="absolute top-[8%] lg:top-[12%] right-2 lg:-right-6 z-30 w-56 p-4 rounded-2xl bg-white/85 backdrop-blur-xl border border-black/[0.07] shadow-[0_16px_40px_rgba(13,27,62,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/[0.08] text-[#C9A84C]">
                    <FileText size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-0.5">
                      Step 01
                    </p>
                    <p className="text-[13px] text-[#0D1B3E] font-bold leading-tight">
                      UCAS Application
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1 flex-grow bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] rounded-full" />
                  </div>
                  <CheckCircle2 size={14} className="text-[#C9A84C]" />
                </div>
              </motion.div>

              {/* Floating UI Card 2: LNAT Booking (Light Glassmorphism) */}
              <motion.div
                variants={float}
                animate="animate"
                custom={1}
                className="absolute bottom-[10%] lg:bottom-[15%] left-2 lg:-left-8 z-30 w-60 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.07] shadow-[0_16px_40px_rgba(13,27,62,0.08)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.05] bg-[#F7F3EC] text-[#0D1B3E]">
                    <Calendar size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[#0D1B3E] text-[13px] font-bold">
                      LNAT Registration
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Secure your test date
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-black/[0.05] flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Status
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-md">
                    Action Required
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
