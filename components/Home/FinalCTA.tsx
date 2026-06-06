"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070B14] flex items-center justify-center py-20 md:py-28 min-h-120">
      {/* Cinematic Background Image */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
          alt="Historic university architecture"
          className="w-full h-full object-cover object-center opacity-40"
        />
      </motion.div>

      {/* Premium Deep Navy Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-[#070B14] via-[#070B14]/80 to-[#070B14]/60 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#070B14]/20 to-[#070B14] opacity-90" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Editorial Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9A7B4F]/30 bg-[#9A7B4F]/10 backdrop-blur-sm">
            <GraduationCap
              className="w-3.5 h-3.5 text-[#C8AA76]"
              strokeWidth={2}
            />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8AA76]">
              Your Future Starts Here
            </span>
          </div>
        </motion.div>

        {/* Emotional Heading */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FDFCFB] leading-[1.15] mb-5 tracking-tight">
            Your Path to Elite Law <br className="hidden sm:block" />
            Universities Begins Today
          </h2>
        </motion.div>

        {/* Supporting Description */}
        <motion.div variants={itemVariants}>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-10 font-light">
            Equip yourself with the strategic insights, rigorous preparation,
            and expert guidance required to excel in the LNAT and secure your
            place at a top-tier UK institution.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/free-resources"
            className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#FDFCFB] text-[#070B14] overflow-hidden transition-all duration-300 hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(253,252,251,0.15)]"
          >
            <span className="text-sm font-medium tracking-wide">
              Start Preparation
            </span>
            <ArrowRight
              className="w-4 h-4 text-[#9A7B4F] transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>

          <Link
            href="#exam-timeline"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-[#FDFCFB] transition-all duration-300 hover:bg-white/5 hover:border-white/40"
          >
            <BookOpen
              className="w-4 h-4 text-slate-400 group-hover:text-[#FDFCFB] transition-colors"
              strokeWidth={1.5}
            />
            <span className="text-sm font-medium tracking-wide">
              Explore Timeline
            </span>
          </Link>

          <a
            href="https://wa.me/YOUR_NUMBER_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#0D1B3E] border border-[#C8AA76]/30 text-[#C8AA76] transition-all duration-300 hover:bg-[#15293e]"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-wide">
              WhatsApp an Expert
            </span>
          </a>
        </motion.div>

        {/* Trust Anchors immediately adjacent to CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 opacity-75"
        >
          <div className="flex items-center gap-2 text-slate-300 text-xs tracking-wide">
            <ShieldCheck size={14} className="text-[#C8AA76]" /> Official 2026
            Curriculum
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-xs tracking-wide">
            <ShieldCheck size={14} className="text-[#C8AA76]" /> 95% Top-Tier
            Placement Rate
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
