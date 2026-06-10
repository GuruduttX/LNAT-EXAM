"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Variants } from "framer-motion";
import { useState } from "react";
import EnquiryPopupForm from "@/utils/EnquiryForm";

// --- Design System Animation Variants ---
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

export default function AboutHero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <section className="relative overflow-hidden bg-[#F7F3EC] px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-10">
        {/* Dot Grid Texture (DS 5) */}
        <div
          className="absolute inset-0 pointer-events-none z-0
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          {/* Breadcrumbs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400"
          >
            <Link href="/" className="transition-colors hover:text-[#0D1B3E]">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#C9A84C]">About Us</span>
          </motion.div>

          {/* Centered Editorial Story */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >

            {/* Eyebrow Label */}
            <motion.div
              variants={fadeUp}
              className="mb-4 flex items-center gap-3"
            >
              <div className="h-px w-8 bg-[#C9A84C]/40" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
                Specialist LNAT Coaching
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight text-[#0D1B3E]"
            >
              About LNAT Exam India:{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                Specialist LNAT Coaching
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-[14px] leading-[1.8] text-slate-600 md:text-[15px]"
            >
              LNAT Exam India is a specialist LNAT preparation brand built for
              Indian law aspirants. The LNAT is all we do: we help students
              across India target the scores that open law admissions at top UK
              universities and at JGLS.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center gap-4 w-full sm:w-auto sm:flex-row"
            >
              {/* Primary Gold CTA (DS 6.11) */}
              <Link
                href="#mentor"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-bold text-sm text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
                }}
              >
                Meet Our Mentor
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-black/[0.07] bg-white px-6 py-3.5 text-sm font-bold text-[#0D1B3E] transition-all hover:bg-[#FDFBF7] hover:border-[#C9A84C]/40 sm:w-auto shadow-sm hover:shadow-md"
              >
                Get in touch
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
