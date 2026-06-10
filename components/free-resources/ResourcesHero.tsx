"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BookOpen, FileText, CheckCircle2, Download } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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
  animate: (custom: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: custom,
    },
  }),
};

export default function ResourcesHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-4 py-10 sm:px-6 md:py-14 lg:px-8"
      style={{
        background:
          "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)",
      }}
    >
      {/* Design System: Gold ambient top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Free Resources", href: "/free-resources" },
          ]}
          className="mb-8"
          tone="dark"
        />

        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="mb-4 flex items-center justify-center gap-3 md:justify-start"
            >
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Free LNAT Resources
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-center text-[clamp(1.9rem,4.8vw,3.8rem)] font-extrabold leading-tight tracking-tight text-white md:text-start"
            >
              Free LNAT Resources for <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                Indian Students
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-relaxed text-white/60 md:mx-0 md:text-start"
            >
              Start preparing for free with official LNAT practice papers and
              sample essays from lnat.ac.uk, plus our own free guides, essay
              structure template and reading-list support.
            </motion.p>

            {/* Trust Pills */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70 backdrop-blur-sm">
                <FileText size={12} className="text-[#C9A84C]" />
                Official practice links
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70 backdrop-blur-sm">
                <CheckCircle2 size={12} className="text-[#C9A84C]" />
                Free downloadable guides
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Creative Visual (Glassmorphism Document Stack) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[320px] w-full md:block"
          >
            {/* Background Card */}
            <motion.div
              variants={float}
              animate="animate"
              custom={0.8}
              className="absolute right-4 top-4 w-[280px] rounded-2xl p-5"
              style={{
                background: "rgba(13,27,62,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 16px 48px rgba(10,22,40,0.4)",
              }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40">
                <BookOpen size={18} />
              </div>
              <div className="h-3 w-3/4 rounded-full bg-white/10 mb-2" />
              <div className="h-3 w-1/2 rounded-full bg-white/5" />
            </motion.div>

            {/* Foreground Glass Card (Design System 6.15) */}
            <motion.div
              variants={float}
              animate="animate"
              custom={0}
              className="absolute bottom-4 left-4 z-10 w-[300px] rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(201,168,76,0.22)",
                boxShadow:
                  "0 12px 40px rgba(10,22,40,0.5), 0 2px 8px rgba(201,168,76,0.1)",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Download size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                    Featured Guide
                  </div>
                  <div className="mt-0.5 text-[14px] font-bold text-white">
                    Essay Structure Template
                  </div>
                </div>
              </div>
              <p className="text-[12px] leading-relaxed text-white/50">
                A practical framework for writing clear, timed Section B
                arguments without copying sample essays.
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40">
                  PDF Download
                </span>
                <span className="text-[11px] font-bold text-[#E8C96A]">
                  Free PDF
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
