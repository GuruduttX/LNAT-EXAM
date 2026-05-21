"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MentorCTA() {
  return (
    <section className="py-24 bg-[#fdfbf7] px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="text-[#c5a059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
          Admissions Support
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#0a0f1c] mb-6">
          Require Personalized Guidance?
        </h2>
        <p className="text-gray-600 font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Navigating the LNAT registration and UK admissions process from India
          requires precision. Speak with our specialized mentors to map out your
          timeline and application strategy.
        </p>

        <button className="inline-flex items-center justify-center gap-3 bg-[#0a0f1c] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-colors duration-300">
          Talk to a Mentor <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}