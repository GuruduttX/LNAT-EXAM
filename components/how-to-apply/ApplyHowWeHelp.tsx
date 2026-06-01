"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BookOpen, Target, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: BookOpen,
    title: "UCAS & Personal Statement",
    desc: "We translate your Indian academic background (CBSE/ISC/IB) into a compelling UCAS narrative, crafting a personal statement that Oxford and UCL admissions tutors actually want to read.",
  },
  {
    icon: Target,
    title: "LNAT Strategy & Preparation",
    desc: "Gain access to elite practice banks, mock simulators, and 1-on-1 essay grading. We identify your weak points in critical reasoning and fix them before test day.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Application Tracking",
    desc: "From shortlisting the right 5 universities to booking your Pearson VUE slot and managing interview invites, we handle the logistics so you can focus on studying.",
  },
];

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

export default function ApplyHowWeHelp() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8 border-b border-black/[0.07]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 flex flex-col items-center text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-px w-6 bg-[#C9A84C]/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Expert Support
            </p>
            <div className="h-px w-6 bg-[#C9A84C]/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.5rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] max-w-2xl"
          >
            Don't Navigate the UK Process{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Alone.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-500"
          >
            Applying as an international student from India leaves zero room for
            error. We provide premium guidance to secure your spot at top-tier
            institutions.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index * 0.1}
              className="group flex flex-col rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D1B3E]/[0.06] text-[#0D1B3E] transition-colors duration-300 group-hover:bg-[#0D1B3E] group-hover:text-[#C9A84C]">
                <service.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-[16px] font-bold text-[#0D1B3E]">
                {service.title}
              </h3>
              <p className="mb-6 flex-1 text-[13px] leading-relaxed text-slate-500">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Embedded CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/consultation"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
              boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
            }}
          >
            Book a Free Strategy Session
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
