"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus,
  PlayCircle,
  Landmark,
  Send,
  FileCheck,
  Scale,
} from "lucide-react";

// --- Assuming the TimelineMilestone component is in the same directory ---
import TimelineMilestone from "./TimelineMilestone";

// --- Types & Data ---

interface MilestoneData {
  id: string;
  date: string;
  title: string;
  description: string;
  badge?: string;
  icon: React.ElementType;
}

const milestones: MilestoneData[] = [
  {
    id: "m1",
    date: "01 August",
    title: "Registration Opens",
    description:
      "LNAT account creation and test booking becomes officially available. We highly recommend securing your preferred test center early.",
    badge: "Action Required",
    icon: UserPlus,
  },
  {
    id: "m2",
    date: "01 September",
    title: "Testing Cycle Begins",
    description:
      "The first day candidates can sit for the LNAT exam. Ensure all preparation is finalized prior to your scheduled testing date.",
    badge: "Exam Window",
    icon: PlayCircle,
  },
  {
    id: "m3",
    date: "15 October",
    title: "Oxbridge Deadline",
    description:
      "Final date to sit the LNAT if you are applying to the University of Oxford or Cambridge. UCAS applications must also be submitted.",
    badge: "Strict Deadline",
    icon: Landmark,
  },
  {
    id: "m4",
    date: "29 January",
    title: "UCAS Deadline",
    description:
      "The standard UCAS application deadline for the majority of undergraduate law courses across participating UK universities.",
    icon: Send,
  },
  {
    id: "m5",
    date: "31 January",
    title: "LNAT Final Deadline",
    description:
      "The absolute final date to sit the LNAT for all other participating universities in the consortium.",
    badge: "Final Window",
    icon: FileCheck,
  },
  {
    id: "m6",
    date: "Spring Term",
    title: "University Review",
    description:
      "Admissions committees evaluate your LNAT score and qualitative essay alongside your academic profile and personal statement.",
    icon: Scale,
  },
];

// --- Animation Variants ---

const trackVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// --- Component ---

export default function TimelineTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <div className="relative w-full overflow-hidden">
      {/* 
        Scrollable Track Container 
        - Desktop: Horizontal flex with overflow scroll (snap points for elegance)
        - Mobile: Vertical stacked flex
      */}
      <motion.div
        ref={containerRef}
        variants={trackVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col md:flex-row gap-0 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 hide-scrollbar"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1;

          return (
            <div
              key={milestone.id}
              className="md:min-w-[320px] lg:min-w-[360px] snap-start flex flex-col"
            >
              <TimelineMilestone
                date={milestone.date}
                title={milestone.title}
                description={milestone.description}
                badge={milestone.badge}
                icon={milestone.icon}
                isLast={isLast}
                delay={index * 0.1}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Global styles to hide webkit scrollbar for the horizontal swipe area */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hide-scrollbar::-webkit-scrollbar {
              display: none;
          }
        `,
        }}
      />

      {/* Desktop Scroll Hint (Subtle gradient fade on the right side to indicate more content) */}
      <div className="hidden md:block absolute top-0 right-0 bottom-12 w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent pointer-events-none z-20" />
    </div>
  );
}
