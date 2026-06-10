"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BookOpen, Target, ShieldCheck, ArrowRight } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";


const SERVICES = [
  {
    icon: BookOpen,
    title: "Shortlist and UCAS planning",
    desc: "We help you connect your Indian academic profile with realistic UK law choices, UCAS deadlines, personal statement planning and the five-choice application strategy.",
  },
  {
    icon: Target,
    title: "LNAT timing and preparation",
    desc: "We map your LNAT test date around Oxford, Cambridge, London universities or JGLS, then align Section A and essay preparation to that timeline.",
  },
  {
    icon: ShieldCheck,
    title: "JGLS and UK route clarity",
    desc: "We explain how one LNAT sitting can support UK applications and JGLS, while keeping Section A-only and essay-heavy strategies separate.",
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <EnquiryPopupForm isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
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
            Build a personalised application{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              timeline
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-500"
          >
            Applying from India means managing grades, LNAT booking, UCAS
            choices, personal statement work and deadlines together. We help you
            turn that into a clear plan.
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
          <button
            onClick={()=> setIsOpen(true)}
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
          </button>
        </motion.div>
      </div>
    </section>
    </>
  );
}
