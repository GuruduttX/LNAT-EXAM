"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Search,
  MessageSquare,
  BookOpen,
  Shield,
  HelpCircle,
} from "lucide-react";

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const float: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatDelayed: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

export default function FAQHero() {
  return (
    <section className="relative bg-[#0a0f1c] pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden px-6 lg:px-12 border-b border-white/5">
      {/* Ambient Atmospheric Background - Slightly smaller for FAQ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft left gold glow */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-[#c5a059] opacity-[0.03] blur-[100px] rounded-full" />
        {/* Deep right slate/navy glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1e293b] opacity-[0.2] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================== */}
          {/* LEFT CONTENT: Editorial & Typography       */}
          {/* ========================================== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
          >
            {/* Premium Badge */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center lg:justify-start mb-6 lg:mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
                <span className="text-[#c5a059] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
                  Information Desk
                </span>
              </div>
            </motion.div>

            {/* Cinematic Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif text-white mb-5 leading-[1.1] tracking-tight"
            >
              Frequently Asked <br className="hidden lg:block" />
              <span className="text-white/50 italic font-light">
                Questions.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-slate-400 font-light leading-relaxed mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Clarification on the admissions process, examination logistics,
              and strategies for securing your placement at elite institutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 lg:mb-10"
            >
              <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#FDFBF7] text-[#0a0f1c] rounded-full overflow-hidden transition-all duration-500 hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(253,251,247,0.15)]">
                <span className="relative z-10 text-sm font-semibold tracking-wide">
                  Contact Support
                </span>
                <MessageSquare
                  size={16}
                  className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </button>

              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent border border-white/20 text-white rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/40">
                <span className="text-sm font-medium tracking-wide">
                  Browse Topics
                </span>
                <Search
                  size={16}
                  className="text-white/70 group-hover:text-white transition-colors"
                />
              </button>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center lg:justify-start gap-3 pt-5 border-t border-white/10"
            >
              <Shield size={16} className="text-[#c5a059]" />
              <span className="text-xs text-slate-400 tracking-wide uppercase font-medium">
                Comprehensive LNAT Guidance
              </span>
            </motion.div>
          </motion.div>

          {/* ========================================== */}
          {/* RIGHT VISUAL: Cinematic Composition        */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            // Notice the reduced height here compared to ApplyHero (max 500px instead of 600px)
            className="lg:col-span-7 relative h-[350px] sm:h-[400px] lg:h-[500px] w-full flex items-center justify-center lg:justify-end"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-[450px] lg:max-w-none aspect-[4/3] lg:aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
              {/* Overlay Gradients for Cinematic Feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1c]/90 via-[#0a0f1c]/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#c5a059]/10 mix-blend-overlay z-10" />

              {/* High-Quality Institutional/Library Image */}
              <img
                src="https://plus.unsplash.com/premium_photo-1679547203062-cb664e169eaf?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Elite Law Library"
                className="w-full h-full object-cover scale-105 transform hover:scale-110 transition-transform duration-[20s] ease-out"
              />

              {/* Decorative Frame Line */}
              <div className="absolute inset-4 border border-[#c5a059]/20 rounded-2xl z-20 pointer-events-none" />
            </div>

            {/* Floating UI Card 1: Support Desk */}
            <motion.div
              variants={float}
              animate="animate"
              className="absolute top-[10%] lg:top-[15%] right-2 lg:-right-4 z-30 w-52 p-4 rounded-2xl bg-[#1e293b]/70 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20">
                  <HelpCircle size={16} className="text-[#c5a059]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                    Admissions
                  </p>
                  <p className="text-sm text-white font-medium">Support Desk</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Response time
                </span>
                <span className="text-[10px] font-medium text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded">
                  &lt; 24 Hours
                </span>
              </div>
            </motion.div>

            {/* Floating UI Card 2: Knowledge Base */}
            <motion.div
              variants={floatDelayed}
              animate="animate"
              className="absolute bottom-[10%] lg:bottom-[15%] left-2 lg:-left-6 z-30 w-60 p-4 rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                  <BookOpen size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium">
                    Knowledge Base
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    50+ Curated Answers
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <Search size={12} className="text-slate-400" />
                <span className="text-xs text-slate-400">
                  Search by topic...
                </span>
              </div>
            </motion.div>

            {/* Subtle floating decorative dots */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 -right-8 w-2 h-2 rounded-full bg-[#c5a059] blur-[2px] hidden lg:block"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/3 -left-10 w-3 h-3 rounded-full bg-white blur-[2px] hidden lg:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
