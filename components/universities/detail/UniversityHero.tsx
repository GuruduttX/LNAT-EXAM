"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Building2 } from "lucide-react";
import { University } from "@/data/universities";

interface UniversityHeroProps {
  university: University;
}

export default function UniversityHero({ university }: UniversityHeroProps) {
  return (
    <section className="relative bg-[#0a0f1c] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-[#c5a059]/20">
      {/* Background Cinematic Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c5a059] opacity-[0.03] blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <Link
            href="/universities"
            className="inline-flex items-center text-[10px] uppercase tracking-widest text-white/50 hover:text-[#c5a059] transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Back to Archive
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> {university.location},{" "}
                {university.country}
              </span>
              <span className="flex items-center gap-1.5 opacity-70">
                <Building2 className="w-3 h-3" /> Est. {university.established}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]">
              {university.name}
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl">
              {university.shortDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 hidden lg:flex justify-end"
          >
            {/* Monogram Graphic */}
            <div className="w-48 h-48 border border-[#c5a059]/30 flex items-center justify-center relative bg-[#0a0f1c]/50 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-2 border border-[#c5a059]/10" />
              <span className="text-[#c5a059] font-serif text-8xl opacity-80 select-none">
                {university.name.charAt(0)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
