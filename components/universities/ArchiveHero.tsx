"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Search,
  Building2,
  MapPin,
  GraduationCap,
  Shield,
  Globe,
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
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatDelayed: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

export default function UniversityArchiveHero() {
  return (
    <section className="relative bg-[#0a0f1c] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden px-6 lg:px-12 border-b border-white/5">
      {/* Ambient Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft left gold glow */}
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-[#c5a059] opacity-[0.04] blur-[120px] rounded-full" />
        {/* Deep right slate/navy glow */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#1e293b] opacity-[0.2] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
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
              className="flex justify-center lg:justify-start mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
                <span className="text-[#c5a059] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
                  Institution Directory
                </span>
              </div>
            </motion.div>

            {/* Cinematic Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-white mb-6 leading-[1.1] tracking-tight"
            >
              Elite University <br className="hidden lg:block" />
              <span className="text-white/50 italic font-light">Archive.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-slate-400 font-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
            >
              A curated directory of premier UK institutions accepting the LNAT.
              Explore detailed entry requirements, campus profiles, and
              admissions criteria to identify your ideal academic destination.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FDFBF7] text-[#0a0f1c] rounded-full overflow-hidden transition-all duration-500 hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(253,251,247,0.15)]">
                <span className="relative z-10 text-sm font-semibold tracking-wide">
                  Browse Universities
                </span>
                <Search
                  size={16}
                  className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </button>

              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/40">
                <span className="text-sm font-medium tracking-wide">
                  View Rankings
                </span>
                <Globe
                  size={16}
                  className="text-white/70 group-hover:text-white transition-colors"
                />
              </button>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center lg:justify-start gap-3 pt-6 border-t border-white/10"
            >
              <Shield size={16} className="text-[#c5a059]" />
              <span className="text-xs text-slate-400 tracking-wide uppercase font-medium">
                Featuring Top Tier & Russell Group Institutions
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
            className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[550px] w-full flex items-center justify-center"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[4/5] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              {/* Overlay Gradients for Cinematic Feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f1c]/90 via-[#0a0f1c]/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-[#c5a059]/10 mix-blend-overlay z-10" />

              {/* High-Quality Historic University Architecture Image */}
              <img
                src="https://cdn.britannica.com/03/117103-050-F4C2FC83/view-University-of-Oxford-England-Oxfordshire.jpg"
                alt="Elite UK University Campus"
                className="w-full h-full object-cover scale-105 transform hover:scale-110 transition-transform duration-[20s] ease-out"
              />

              {/* Decorative Frame Line */}
              <div className="absolute inset-4 border border-[#c5a059]/20 rounded-2xl z-20 pointer-events-none" />
            </div>

            {/* Floating UI Card 1: Institution Profile */}
            <motion.div
              variants={float}
              animate="animate"
              className="absolute top-[5%] lg:top-[10%] right-0 lg:-right-6 z-30 w-56 p-4 rounded-2xl bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20">
                  <Building2 size={18} className="text-[#c5a059]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <p className="text-sm text-white font-medium">
                    Russell Group
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <MapPin size={12} className="text-[#c5a059]" />
                <span className="text-xs text-slate-300">United Kingdom</span>
              </div>
            </motion.div>

            {/* Floating UI Card 2: LNAT Requirement Stats */}
            <motion.div
              variants={floatDelayed}
              animate="animate"
              className="absolute bottom-[10%] lg:bottom-[15%] left-0 lg:-left-10 z-30 w-64 p-5 rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                  <GraduationCap size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium">
                    LNAT Requirement
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Competitive Entry
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">
                    Avg. Acceptance Score
                  </span>
                  <span className="text-xs font-medium text-[#c5a059]">
                    27+
                  </span>
                </div>
                {/* Visual Data Bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <div className="h-full w-[70%] bg-[#c5a059] rounded-l-full" />
                  <div className="h-full w-[30%] bg-white/20 rounded-r-full" />
                </div>
              </div>
            </motion.div>

            {/* Subtle floating decorative dots */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-12 w-2 h-2 rounded-full bg-[#c5a059] blur-[2px] hidden lg:block"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 -left-16 w-3 h-3 rounded-full bg-white blur-[2px] hidden lg:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
