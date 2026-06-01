
"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ExternalLink, Globe, BarChart2, Newspaper, Link2 } from "lucide-react";

interface SourceReference {
  label: string;
  url: string;
  type?: "official" | "ranking" | "news" | "internal" | string;
}

interface UniversitySourcesProps {
  university: {
    sourceReferences?: SourceReference[];
  };
}

// Design System Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

// Helper to assign a relevant icon based on the source type
const getSourceIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "official":
      return <Globe size={14} />;
    case "ranking":
      return <BarChart2 size={14} />;
    case "news":
      return <Newspaper size={14} />;
    default:
      return <Link2 size={14} />;
  }
};

export default function UniversitySources({
  university,
}: UniversitySourcesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const sources = university.sourceReferences;

  // Defensive rendering
  if (!sources || sources.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative w-full border-t border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50
        bg-[radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        bg-size-[26px_26px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header Area */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 flex flex-col"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 flex items-center justify-center gap-2 md:justify-start"
          >
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              Sources
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
          >
            References &{" "}
            <span className="bg-linear-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Source Material
            </span>
          </motion.h2>
        </motion.div>

        {/* Hybrid Layout Container: Mobile Carousel -> Desktop 3-Col Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="-mx-4 flex justify-center snap-x snap-mandatory overflow-x-auto px-4 pb-6 
            scrollbar-none [&::-webkit-scrollbar]:hidden 
            md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {sources.map((source, index) => (
            <motion.div
              key={`${source.url}-${index}`}
              variants={fadeUp}
              custom={index * 0.1}
              className="mr-4 w-[75vw] max-w-75 shrink-0 snap-center md:mr-0 md:w-auto md:max-w-none"
            >
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full min-h-35 flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] block"
              >
                {/* Card Top: Source Type Pill & External Icon */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-[#F7F3EC] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]">
                    {getSourceIcon(source.type)}
                    {source.type || "Official"}
                  </span>

                  <div className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A84C]">
                    <ExternalLink size={18} strokeWidth={2} />
                  </div>
                </div>

                {/* Card Bottom: Source Label */}
                <div>
                  <h3 className="line-clamp-2 text-[14px] font-bold leading-snug text-[#0D1B3E] transition-colors group-hover:text-[#0D1B3E]">
                    {source.label}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-medium text-slate-400 truncate">
                    {new URL(source.url).hostname.replace("www.", "")}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}