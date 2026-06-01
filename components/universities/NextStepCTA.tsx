"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

export default function NextStepCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Dot grid texture for section background */}
      <div
        className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-[#C9A84C]/15 shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
        style={{
          background:
            "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)",
        }}
      >
        {/* Ambient Gold Glow inside the dark card */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:gap-12 md:p-12">
          <div className="flex max-w-2xl flex-col">
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Next Step
              </p>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-white md:text-start">
              Turn this shortlist into a smarter{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                LNAT application plan
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-relaxed text-white/60 md:mx-0 md:text-start">
              Once you have 3 to 5 credible targets, move into the individual
              university guides and pair them with your preparation strategy,
              essay planning, and application timeline.
            </p>
          </div>

          <div className="flex w-full shrink-0 justify-center md:w-auto md:justify-end">
            <Link
              href="/how-to-apply"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] md:w-auto"
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
              }}
            >
              Explore Application Guidance
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
