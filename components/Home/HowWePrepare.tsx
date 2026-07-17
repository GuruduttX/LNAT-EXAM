"use client";

import { motion, Variants } from "framer-motion";
import {
  Target,
  BookOpen,
  Clock,
  PenLine,
  GraduationCap,
  ArrowRight,
  Info,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Diagnostic",
    description:
      "A baseline assessment of your reading, reasoning and essay writing, and a target set against your chosen universities.",
    icon: Target,
  },
  {
    id: "02",
    title: "Skills",
    description:
      "Structured work on Section A question types and Section B essay technique, with worked examples.",
    icon: BookOpen,
  },
  {
    id: "03",
    title: "Timed practice & mocks",
    description:
      "Full-length, exam-condition mocks with detailed feedback to build accuracy and pacing.",
    icon: Clock,
  },
  {
    id: "04",
    title: "Essay coaching",
    description:
      "Individual feedback on timed essays to sharpen argument and structure.",
    icon: PenLine,
  },
  {
    id: "05",
    title: "Application support",
    description:
      "Registration, deadlines and university strategy so your score lands where it counts.",
    icon: GraduationCap,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowWePrepare() {
  return (
    <section className="py-10 lg:py-10 bg-[#FCFBFA] border-y border-slate-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
              Our Methodology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0D1B3E] leading-tight mb-6"
          >
            How We Prepare You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-600 leading-relaxed font-light"
          >
            A structured, rigorous approach designed to build underlying
            analytical skills rather than relying on rote memorisation[cite: 1].
          </motion.p>
        </div>

        {/* 5-Step Grid */}
        <motion.div
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 pb-6 md:pb-0 hide-scrollbar"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`relative bg-white p-8 border border-slate-200/80 hover:border-[#C9A84C]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-[85vw] sm:w-[340px] md:w-auto flex-shrink-0 snap-center md:snap-align-none ${
                index === 3
                  ? "lg:col-start-1 lg:ml-auto lg:w-full lg:max-w-[380px]"
                  : ""
              } ${
                index === 4
                  ? "lg:col-start-2 lg:mr-auto lg:w-full lg:max-w-[380px]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0D1B3E]/5 flex items-center justify-center text-[#C9A84C]">
                  <step.icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-4xl font-serif font-light text-[#0D1B3E] select-none">
                  {step.id}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0D1B3E] mb-3 tracking-tight">
                {step.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA & Course Formats Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0D1B3E] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#0D1B3E]"
        >
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start text-[#C9A84C]">
              <Info size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Programme Details
              </span>
            </div>

            {/* PLACEHOLDERS: Update these with REAL details later */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                Formats: [fill data]
              </span>
              <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                Duration: [fill data]
              </span>
              <span className="px-3 py-1 bg-white/10 text-[#C9A84C] text-xs font-medium rounded-full backdrop-blur-sm border border-[#C9A84C]/30">
                Price: [fill data]
              </span>
            </div>
          </div>

          <a
            href="#"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0D1B3E] font-medium transition-all duration-300 hover:bg-slate-50 flex-shrink-0 w-full lg:w-auto"
          >
            <span className="text-sm tracking-wide">
              See course options & fees
            </span>
            <ArrowRight className="w-4 h-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
