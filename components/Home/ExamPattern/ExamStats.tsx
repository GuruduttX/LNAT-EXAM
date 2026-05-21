"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Clock, ListChecks, PenTool, Landmark } from "lucide-react";

// --- Types & Data ---

interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const statsData: StatItem[] = [
  {
    id: "stat-duration",
    value: "2h 15m",
    label: "Total Duration",
    description: "Strictly timed assessment.",
    icon: Clock,
  },
  {
    id: "stat-mcq",
    value: "42",
    label: "Multiple Choice",
    description: "Rigorous logical deductions.",
    icon: ListChecks,
  },
  {
    id: "stat-essay",
    value: "1",
    label: "Argumentative Essay",
    description: "From 3 provided prompt topics.",
    icon: PenTool,
  },
  {
    id: "stat-uni",
    value: "Elite",
    label: "Law Consortium",
    description: "Required by top universities.",
    icon: Landmark,
  },
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Premium easing
    },
  },
};

// --- Component ---

export default function ExamStats() {
  return (
    <section className="relative w-full bg-[#FDFBF7] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {statsData.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col p-8 bg-white rounded-xl border border-[#0F172A]/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.06)] hover:border-[#C4A47C]/30 overflow-hidden"
              >
                {/* Subtle top gold accent on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C4A47C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                {/* Icon Area */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-[#0F172A]/40 group-hover:text-[#C4A47C] transition-colors duration-500">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Optional decorative minimal dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]/10 group-hover:bg-[#C4A47C]/40 transition-colors duration-500" />
                </div>

                {/* Content Area */}
                <div className="flex-grow flex flex-col">
                  <h4 className="text-3xl md:text-4xl font-serif text-[#0F172A] mb-2 tracking-tight group-hover:text-[#C4A47C] transition-colors duration-500">
                    {stat.value}
                  </h4>
                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-[#0F172A]/70 mb-2">
                    {stat.label}
                  </span>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
