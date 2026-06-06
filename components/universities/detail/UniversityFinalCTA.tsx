"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

interface UniversityFinalCTAProps {
  university: {
    name: string;
    shortName?: string;
  };
}

// Design System: Framer Motion Variants
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

export default function UniversityFinalCTA({
  university,
}: UniversityFinalCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const displayName = university.shortName || university.name;

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-14 lg:px-8"
    >
      {/* Design System: Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50
        bg-[radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        bg-size-[26px_26px]"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#C9A84C]/15 shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
        style={{
          background:
            "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)",
        }}
      >
        {/* Ambient Gold Glow inside the dark card */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-100 w-200 -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-10 p-8 md:flex-row md:items-center md:justify-between md:gap-14 md:p-12 lg:p-16">
          {/* Left: Content Area */}
          <div className="flex max-w-2xl flex-col">
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Need Guidance?
              </p>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-white md:text-start">
              Build a smarter LNAT strategy for{" "}
              <span className="bg-linear-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                {displayName}
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-relaxed text-white/60 md:mx-0 md:text-start">
              Use this profile as your starting point, then map your LNAT
              preparation, admissions narrative, and university shortlist around
              your real targets with our expert advisors.
            </p>

            {/* Trust Indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-semibold text-white/40 md:justify-start">
              <ShieldCheck size={14} className="text-[#C9A84C]" />
              <span>100% Free Initial Consultation</span>
            </div>
          </div>

          {/* Right: Enquiry Buttons Stack */}
          <div className="flex w-full shrink-0 flex-col gap-4 md:w-[320px]">
            {/* Primary Action: Lead Form / Consultation */}
            <Link
              href="/consultation" // Adjust to your actual enquiry form route
              className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
              }}
            >
              Get Expert Guidance
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {/* Secondary Action: WhatsApp (Design System Ghost Button + Live Dot) */}
            <a
              href="https://wa.me/9479982443" // Replace with your actual WhatsApp link
              target="_blank"
              rel="noreferrer"
              className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-4 text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
            >
              {/* WhatsApp specific Icon mapping */}
              <MessageCircle size={16} className="text-[#C9A84C]" />
              Connect on WhatsApp
              {/* Pulsing "Live" indicator to increase conversion */}
              <span className="absolute right-4 top-1/2 flex h-2 w-2 -translate-y-1/2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
              </span>
            </a>

            <p className="mt-1 text-center text-[10px] font-semibold text-white/30">
              Avg. reply time: under 2 hours
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
