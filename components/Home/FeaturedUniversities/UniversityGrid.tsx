"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- Assuming UniversityCard is in the components directory ---
import UniversityCard from "./UniversityCard";

// --- Types ---

export interface FeaturedUniversityCardData {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  ranking?: string;
  lnatRequired?: boolean;
}

interface UniversityGridProps {
  universities: FeaturedUniversityCardData[];
}

// --- Animation Variants ---

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Smooth staggered reveal
      delayChildren: 0.2,
    },
  },
};

// --- Component ---

export default function UniversityGrid({ universities }: UniversityGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={containerRef}
      variants={gridVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full"
    >
      {universities.map((uni, index) => (
        <div key={uni.id} className="flex h-full">
          <UniversityCard
            name={uni.name}
            location={uni.location}
            description={uni.description}
            imageUrl={uni.imageUrl}
            ranking={uni.ranking}
            lnatRequired={uni.lnatRequired !== false}
            href={`/universities/${uni.slug}`}
            delay={index * 0.1}
          />
        </div>
      ))}
    </motion.div>
  );
}
