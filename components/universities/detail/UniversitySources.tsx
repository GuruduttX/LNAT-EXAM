"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ExternalLink,
  Globe,
  BarChart2,
  Newspaper,
  Link2,
} from "lucide-react";

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
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// Helper to assign a relevant icon based on the source type
const getSourceIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case "official":
      return <Globe size={13} />;
    case "ranking":
      return <BarChart2 size={13} />;
    case "news":
      return <Newspaper size={13} />;
    default:
      return <Link2 size={13} />;
  }
};

// `new URL()` throws on malformed CMS values — never let a bad URL crash the page.
const safeHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

export default function UniversitySources({
  university,
}: UniversitySourcesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [filter, setFilter] = useState<string>("all");

  const sources = university.sourceReferences;

  // Defensive rendering
  if (!sources || sources.length === 0) return null;

  const types = Array.from(
    new Set(sources.map((s) => (s.type || "official").toLowerCase())),
  );
  const visibleSources =
    filter === "all"
      ? sources
      : sources.filter((s) => (s.type || "official").toLowerCase() === filter);

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

          {/* Type filter pills — only when there is more than one type */}
          {types.length > 1 && (
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              {["all", ...types].map((type) => {
                const isActive = filter === type;
                const count =
                  type === "all"
                    ? sources.length
                    : sources.filter(
                        (s) => (s.type || "official").toLowerCase() === type,
                      ).length;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilter(type)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 ${
                      isActive
                        ? "border-[#0D1B3E] bg-[#0D1B3E] text-[#E8C96A] shadow-[0_8px_20px_rgba(13,27,62,0.25)]"
                        : "border-black/10 bg-white text-slate-500 hover:border-[#C9A84C]/40 hover:text-[#0D1B3E]"
                    }`}
                  >
                    {type !== "all" && getSourceIcon(type)}
                    {type}
                    <span
                      className={`rounded-full px-1.5 text-[10px] ${
                        isActive
                          ? "bg-white/10 text-[#E8C96A]"
                          : "bg-[#F7F3EC] text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Table panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_16px_48px_rgba(13,27,62,0.08)]"
        >
          {/* Column headers — desktop only */}
          <div className="hidden bg-[#0D1B3E] px-6 py-3.5 md:grid md:grid-cols-[56px_150px_minmax(0,1fr)_220px_56px] md:items-center md:gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              #
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Type
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Source
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              Domain
            </span>
            <span className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              Visit
            </span>
          </div>

          {/* Rows */}
          <motion.div
            key={filter}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {visibleSources.map((source, index) => (
              <motion.a
                key={`${source.url}-${index}`}
                variants={fadeUp}
                custom={index * 0.05}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="group relative block border-b border-black/5 transition-colors duration-300 last:border-b-0 hover:bg-[#C9A84C]/5 focus:outline-none focus-visible:bg-[#C9A84C]/8"
              >
                {/* Gold accent bar slides in on hover */}
                <span className="absolute left-0 top-0 h-full w-0.75 origin-top scale-y-0 bg-[#C9A84C] transition-transform duration-300 group-hover:scale-y-100" />

                {/* Desktop row */}
                <div className="hidden md:grid md:grid-cols-[56px_150px_minmax(0,1fr)_220px_56px] md:items-center md:gap-4 md:px-6 md:py-4">
                  <span className="text-[12px] font-extrabold tabular-nums text-slate-300 transition-colors group-hover:text-[#C9A84C]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-black/5 bg-[#F7F3EC] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 transition-colors group-hover:border-[#C9A84C]/30 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]">
                    {getSourceIcon(source.type)}
                    {source.type || "official"}
                  </span>
                  <h3 className="truncate text-[14px] font-bold text-[#0D1B3E]">
                    {source.label}
                  </h3>
                  <span className="truncate text-[12px] font-medium text-slate-400">
                    {safeHostname(source.url)}
                  </span>
                  <span className="flex justify-end text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A84C]">
                    <ExternalLink size={17} strokeWidth={2} />
                  </span>
                </div>

                {/* Mobile row — stacked list item */}
                <div className="flex items-start justify-between gap-3 px-4 py-4 md:hidden">
                  <div className="min-w-0">
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-[#F7F3EC] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {getSourceIcon(source.type)}
                      {source.type || "official"}
                    </span>
                    <h3 className="line-clamp-2 text-[14px] font-bold leading-snug text-[#0D1B3E]">
                      {source.label}
                    </h3>
                    <p className="mt-1 truncate text-[11px] font-medium text-slate-400">
                      {safeHostname(source.url)}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-[#C9A84C]">
                    <ExternalLink size={17} strokeWidth={2} />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Footer bar */}
          <div className="flex items-center justify-between border-t border-black/5 bg-[#FDFBF7] px-4 py-3 md:px-6">
            <p className="text-[11px] font-medium text-slate-400">
              {visibleSources.length} of {sources.length} source
              {sources.length === 1 ? "" : "s"}
              {filter !== "all" ? ` · filtered by ${filter}` : ""}
            </p>
            <p className="text-[11px] font-medium text-slate-400">
              Links open in a new tab
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
