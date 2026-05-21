"use client";

import { motion } from "framer-motion";

export default function ResourcesHero() {
  return (
    <section className="relative bg-[#0a0f1c] py-24 md:py-32 overflow-hidden flex items-center justify-center text-center px-6">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <span className="text-[#c5a059] text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
          Academic Library
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
          Curated Resources for <br className="hidden md:block" />
          <span className="text-white/80">Elite Admissions.</span>
        </h1>
        <p className="text-lg text-white/60 font-light max-w-xl mx-auto leading-relaxed">
          Access our comprehensive collection of LNAT guides, essay frameworks,
          and strategic checklists designed to secure your placement in the UK's
          most prestigious law schools.
        </p>
      </motion.div>
    </section>
  );
}
