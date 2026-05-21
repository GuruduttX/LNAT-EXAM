"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { CalendarClock } from "lucide-react";

// --- Subcomponent Imports ---
// Ensure these paths match your project structure
import SectionHeading from "./SectionHeading";
import TimelineTrack from "./TimelineTrack";
import UpdatesCard from "./UpdatesCard";
import TimelineNotes from "./TimelineNotes";

// --- Animation Variants ---

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Premium calm easing
    },
  },
};

// --- Component ---

export default function LNATTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  // Data for the UpdatesCard
  const updatesData = [
    {
      id: "u1",
      text: "Test sittings prior to August 1st are not valid for the 2026 entry cycle.",
    },
    {
      id: "u2",
      text: "Oxford and Cambridge require LNAT completion strictly by October 15th.",
    },
    {
      id: "u3",
      text: "Late registrations are rarely accommodated; book early to secure your preferred center.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-linear-to-b from-[#FDFBF7] to-white py-20 md:py-10 overflow-hidden border-t border-b border-[#0F172A]/5"
    >
      {/* Subtle Editorial Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#C4A47C]/20 to-transparent"></div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full"
      >
        {/* 1. Header Section */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-16 md:mb-24"
        >
          <SectionHeading
            badge="2026 Admissions Timeline"
            title="Plan Your LNAT Journey"
            description="A comprehensive schedule of critical milestones, registration deadlines, and testing windows required for the elite university admissions cycle. Missing a deadline can invalidate your entire application."
            align="center"
          />
        </motion.div>

        {/* 2. Main Timeline Track */}
        <motion.div
          variants={blockVariants}
          className="px-6 sm:px-8 lg:px-12 mb-20 md:mb-28"
        >
          <div className="max-w-350 mx-auto">
            <TimelineTrack />
          </div>
        </motion.div>

        {/* 3. Updates & Advisory Notes Area */}
        <motion.div variants={blockVariants} className="px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Updates Card (Left Column on Desktop) */}
            <div className="lg:col-span-5 w-full">
              <UpdatesCard
                badge="2026 Cycle Updates"
                title="Critical Adjustments"
                description="The LNAT Consortium has finalized the testing windows. Ensure your application remains valid by adhering to these hard deadlines."
                icon={CalendarClock}
                items={updatesData}
                delay={0.2}
              />
            </div>

            {/* Timeline Notes (Right Column on Desktop) */}
            <div className="lg:col-span-7 w-full">
              {/* 
                TimelineNotes has its own internal max-w and padding that we might 
                want to flow naturally here. If TimelineNotes has a background, 
                it will sit beautifully next to the UpdatesCard.
              */}
              <TimelineNotes />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
