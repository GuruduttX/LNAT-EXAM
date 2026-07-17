"use client";

import { useMemo, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";

import UniversityCard from "./UniversityCard";
import { IUniversity } from "@/types/backend.types";

interface ArchiveClientProps {
  universities: IUniversity[];
}

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

export default function ArchiveClient({ universities }: ArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const regions = useMemo(() => {
    const countrySet = new Set(
      universities.map((university) => university.country).filter(Boolean),
    );
    return [
      "All",
      ...Array.from(countrySet).sort((a, b) => a.localeCompare(b)),
    ];
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const haystack = [
        university.name,
        university.shortName,
        university.country,
        university.city,
        university.location,
        university.locationLabel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(searchQuery.toLowerCase());
      const matchesRegion =
        activeRegion === "All" || university.country === activeRegion;

      return matchesSearch && matchesRegion;
    });
  }, [activeRegion, searchQuery, universities]);

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Main Filter Control Panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 flex flex-col gap-6 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm md:p-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Directory
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            {/* Heading */}
            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
              The complete list of{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                LNAT universities
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
              The LNAT is required by a fixed group of universities under the
              LNAT Consortium and delivered by Pearson VUE. Each uses your score
              differently — some read the Section B essay, others use only
              Section A — so your strategy should follow your shortlist.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:max-w-sm">
            <label className="mb-2 block text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 md:text-start">
              Search universities
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A84C]" />
              <input
                type="text"
                placeholder="Oxford, London, Bristol..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-xl border border-black/[0.07] bg-[#F7F3EC] py-3.5 pl-11 pr-4 text-[13px] text-[#0D1B3E] outline-none transition-all duration-300 focus:border-[#C9A84C]/50 focus:bg-white focus:shadow-[0_4px_20px_rgba(201,168,76,0.1)] placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D1B3E]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Region Filter Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10 flex flex-wrap justify-center gap-2.5 md:justify-start"
        >
          {regions.map((region) => {
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? "bg-[#0D1B3E] text-white shadow-[0_4px_12px_rgba(13,27,62,0.25)]"
                    : "border border-black/[0.07] bg-white text-slate-500 hover:-translate-y-0.5 hover:border-[#C9A84C]/40 hover:text-[#0D1B3E] hover:shadow-sm"
                }`}
              >
                {region}
              </button>
            );
          })}
        </motion.div>

        {/* Grid & Empty States */}
        <AnimatePresence mode="wait">
          {filteredUniversities.length > 0 ? (
            <motion.div
              key="grid"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredUniversities.map((university) => (
                <motion.div
                  key={university.slug || university.name}
                  variants={fadeUp}
                >
                  <UniversityCard university={university} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center rounded-2xl border border-black/[0.07] bg-white px-6 py-16 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                <Search size={20} />
              </div>
              <p className="text-center text-[15px] font-bold text-[#0D1B3E]">
                No universities match your filters.
              </p>
              <p className="mt-2 text-center text-[13px] text-slate-500 max-w-sm">
                Try adjusting your search term or selecting a different
                geographic region.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveRegion("All");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-5 py-2 text-[12px] font-bold text-[#0D1B3E] transition-all hover:bg-slate-50 hover:shadow-sm active:scale-95"
              >
                <X size={14} className="text-[#C9A84C]" />
                Clear search and filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
