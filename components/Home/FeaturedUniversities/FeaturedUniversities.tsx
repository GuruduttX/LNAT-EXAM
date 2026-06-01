"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ShieldCheck, MapPin, Trophy, CalendarClock } from "lucide-react";

// --- Subcomponent Imports ---
import SectionHeading from "./SectionHeading";
import UniversityHeroCard from "./UniversityHeroCard";
import UniversityGrid, {
  type FeaturedUniversityCardData,
} from "./UniversityGrid";
import UniversityMeta, { MetaItem } from "./UniversityMeta";

// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// --- Component ---

interface FeaturedUniversitiesProps {
  universities: FeaturedUniversityCardData[];
}

export default function FeaturedUniversities({
  universities,
}: FeaturedUniversitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  // Dedicated Metadata for the Oxford Visual Highlight Panel
  const oxfordMeta: MetaItem[] = [
    {
      id: "ox-lnat",
      icon: ShieldCheck,
      label: "LNAT Required",
      isHighlight: true,
    },
    { id: "ox-loc", icon: MapPin, label: "Oxford", value: "UK" },
    { id: "ox-rank", icon: Trophy, label: "World Rank", value: "#1 Law" },
    {
      id: "ox-date",
      icon: CalendarClock,
      label: "Deadlines Apply",
      value: "Oct 15",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FDFBF7] py-10 md:py-20 lg:py-10 overflow-hidden border-b border-[#0F172A]/5"
    >
      {/* Delicate Architectural Top Divider Rule */}
      <div className="absolute top-0 left-6 right-6 h-px bg-[#0F172A]/5" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col"
      >
        {/* 1. Header Area - Compact positioning */}
        <motion.div variants={fadeUpVariants} className="mb-10 md:mb-12">
          <SectionHeading
            badge="Featured Institutions"
            title="Explore Premier LNAT Law Schools"
            description="The Law National Aptitude Test is the key benchmark used by global tier-one institutions to select exceptional talent for their highly competitive undergraduate law cohorts."
            align="center"
          />
        </motion.div>

        {/* 2. Visual Centerpiece: Immersive Hero Card */}
        <motion.div variants={fadeUpVariants} className="mb-10 md:mb-12">
          <div className="flex flex-col gap-4">
            <UniversityHeroCard
              name="University of Oxford"
              location="Oxford, United Kingdom"
              description="Consistently ranked as the world’s premier center for legal scholarship, Oxford requires a commanding performance in both Sections A and B of the LNAT to clear its rigorous pre-interview screening thresholds."
              imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
              ranking="#1 Globally"
              lnatRequired={true}
              ctaText="Examine Entry Benchmarks"
            />

            {/* Embedded Premium Institutional Meta bar directly below the Hero Card for added data structure */}
            <div className="w-full bg-white rounded-xl border border-[#0F172A]/5 p-4 flex items-center justify-between shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)]">
              <span className="text-xs font-serif text-[#0F172A] hidden sm:inline">
                Faculty of Law Admissions Parameters
              </span>
              <UniversityMeta
                items={oxfordMeta}
                className="w-full sm:w-auto justify-start sm:justify-end"
              />
            </div>
          </div>
        </motion.div>

        {/* 3. Reusable Asymmetric Editorial Grid Showcase */}
        <motion.div variants={fadeUpVariants}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[#0F172A]/60">
                Consortium Partners & Participating Institutions
              </h4>
              <div className="flex-grow h-[1px] bg-[#0F172A]/5" />
            </div>

            <UniversityGrid universities={universities} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
