"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- Assuming UniversityCard is in the components directory ---
import UniversityCard from "./UniversityCard";

// --- Types & Data ---

interface UniversityData {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  ranking?: string;
  lnatRequired?: boolean;
}

const universitiesData: UniversityData[] = [
  {
    id: "lse",
    name: "London School of Economics (LSE)",
    location: "London, UK",
    description:
      "Renowned globally for its rigorous legal education and social sciences, demanding exceptional analytical capacity from its applicants.",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", // Placeholder: use real LSE image
    ranking: "Top 3 UK",
  },
  {
    id: "kcl",
    name: "King's College London",
    location: "London, UK",
    description:
      "Located in the heart of legal London, offering unparalleled access to global law firms and historical judicial institutions.",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", // Placeholder: use real KCL image
    ranking: "Top 10 Global Law",
  },
  {
    id: "durham",
    name: "Durham University",
    location: "Durham, UK",
    description:
      "A prestigious collegiate university known for its collegiate system, historic campus, and highly selective law faculty.",
    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop", // Placeholder: use real Durham image
    ranking: "Russell Group",
  },
  {
    id: "bristol",
    name: "University of Bristol",
    location: "Bristol, UK",
    description:
      "Offering an innovative and critical approach to legal studies within one of the UK's most vibrant and creative cities.",
    imageUrl:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop", // Placeholder: use real Bristol image
  },
  {
    id: "glasgow",
    name: "University of Glasgow",
    location: "Glasgow, UK",
    description:
      "One of the ancient universities of Scotland, offering a distinct approach to legal education encompassing both Scots and Common Law.",
    imageUrl:
      "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop", // Placeholder: use real Glasgow image
  },
  {
    id: "soas",
    name: "SOAS University of London",
    location: "London, UK",
    description:
      "The leading institution for the study of law in Asia, Africa, and the Middle East, offering a uniquely global perspective on legal systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1525926477800-7a3dfd95afcb?q=80&w=2070&auto=format&fit=crop", // Placeholder: use real SOAS image
  },
];

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

export default function UniversityGrid() {
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
      {universitiesData.map((uni, index) => (
        <div key={uni.id} className="flex h-full">
          <UniversityCard
            name={uni.name}
            location={uni.location}
            description={uni.description}
            imageUrl={uni.imageUrl}
            ranking={uni.ranking}
            lnatRequired={uni.lnatRequired !== false}
            delay={index * 0.1}
          />
        </div>
      ))}
    </motion.div>
  );
}
