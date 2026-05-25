"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, MapPin, ArrowUpRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

interface University {
  id: string;
  name: string;
  location: string;
  shortName: string;
  founded: string;
  rank: string;
  accent: string; // card top-border accent colour
  img: string; // Unsplash image
  bg: string; // subtle card bg tint
}

const universities: University[] = [
  {
    id: "oxford",
    name: "University of Oxford",
    shortName: "Oxford",
    location: "Oxford, UK",
    founded: "Est. 1096",
    rank: "#1 in UK",
    accent: "#0D1B3E",
    img: "https://images.unsplash.com/photo-1612563958093-2c3bcfbd8760?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3hmb3JkfGVufDB8fDB8fHww",
    bg: "rgba(13,27,62,0.03)",
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    shortName: "Cambridge",
    location: "Cambridge, UK",
    founded: "Est. 1209",
    rank: "#2 in UK",
    accent: "#C9A84C",
    img: "https://images.unsplash.com/photo-1605470207062-b72b5cbe2a87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bg: "rgba(201,168,76,0.04)",
  },
  {
    id: "ucl",
    name: "UCL",
    shortName: "UCL",
    location: "London, UK",
    founded: "Est. 1826",
    rank: "Top 10 Global",
    accent: "#C9A84C",
    img: "https://uclpress.co.uk/wp-content/uploads/2026/03/SOL-telegraph-header-1024x538.png",
    bg: "rgba(201,168,76,0.03)",
  },
  {
    id: "lse",
    name: "London School of Economics",
    shortName: "LSE",
    location: "London, UK",
    founded: "Est. 1895",
    rank: "Top 50 Global",
    accent: "#0D1B3E",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f7/The_Land_Registry_Offices%2C_Lincoln_Inn_Fields.jpg",
    bg: "rgba(13,27,62,0.03)",
  },
  {
    id: "kcl",
    name: "King's College London",
    shortName: "King's",
    location: "London, UK",
    founded: "Est. 1829",
    rank: "Top 40 Global",
    accent: "#C9A84C",
    img: "https://indiaeducationdiary.in/wp-content/uploads/2021/06/1599206690133.jpg",
    bg: "rgba(201,168,76,0.03)",
  },
  {
    id: "bristol",
    name: "University of Bristol",
    shortName: "Bristol",
    location: "Bristol, UK",
    founded: "Est. 1909",
    rank: "Top 60 Global",
    accent: "#0D1B3E",
    img: "https://ambitio-django-backend-media.s3.ap-south-1.amazonaws.com/programs/university/gallery-images/1-University%20of%20Bristol.jpeg",
    bg: "rgba(13,27,62,0.03)",
  },
  {
    id: "durham",
    name: "Durham University",
    shortName: "Durham",
    location: "Durham, UK",
    founded: "Est. 1832",
    rank: "Top 100 Global",
    accent: "#C9A84C",
    img: "https://i.guim.co.uk/img/media/ebdaa16ca9f2fb831b3a2fa0dadb47858f805c03/0_256_5197_3118/master/5197.jpg?width=1200&quality=85&auto=format&fit=max&s=ba8597865551f50edec86a59fe562e18",
    bg: "rgba(201,168,76,0.03)",
  },
  {
    id: "glasgow",
    name: "University of Glasgow",
    shortName: "Glasgow",
    location: "Glasgow, UK",
    founded: "Est. 1451",
    rank: "Top 100 Global",
    accent: "#0D1B3E",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=900&h=500&s=1",
    bg: "rgba(13,27,62,0.03)",
  },
];

// ─────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────

const UniversityCard = ({ university }: { university: University }) => (
  <div
    className="relative shrink-0 w-65 rounded-2xl overflow-hidden group cursor-pointer select-none"
    style={{
      border: "1px solid rgba(0,0,0,0.07)",
      background: "#fff",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.3s, transform 0.3s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.boxShadow =
        "0 12px 40px rgba(0,0,0,0.13)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.boxShadow =
        "0 2px 16px rgba(0,0,0,0.06)";
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
    }}
  >
    {/* Top accent bar */}
    <div
      className="absolute top-0 left-0 right-0 h-0.75 z-10"
      style={{ background: university.accent }}
    />

    {/* Image */}
    <div className="relative w-full h-27.5 overflow-hidden">
      <img
        src={university.img}
        alt={university.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />
      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
        }}
      />
      {/* Founded badge */}
      <div
        className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {university.founded}
      </div>
      {/* Arrow icon top-right */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
        }}
      >
        <ArrowUpRight size={14} className="text-white" />
      </div>
    </div>

    {/* Body */}
    <div className="p-3 pt-3" style={{ background: university.bg }}>
      {/* LNAT badge */}
      <div className="flex items-center justify-between mb-2.5">
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{
            background: `${university.accent}15`,
            border: `1px solid ${university.accent}25`,
          }}
        >
          <ShieldCheck size={11} style={{ color: university.accent }} />
          <span
            className="text-[9px] font-bold uppercase tracking-wider"
            style={{
              color: university.accent,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            LNAT Required
          </span>
        </div>
        <span
          className="text-[10px] font-semibold"
          style={{
            color: university.accent,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {university.rank}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-bold text-[#0F172A] mb-1.5 leading-snug"
        style={{ fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}
      >
        {university.name}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-1.5">
        <MapPin size={11} className="text-gray-400" />
        <span
          className="text-[11px] text-gray-400"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {university.location}
        </span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Infinite carousel row
// ─────────────────────────────────────────────────────────────

const CarouselRow = ({
  items,
  direction = 1,
  speed = 35,
}: {
  items: University[];
  direction?: 1 | -1;
  speed?: number;
}) => {
  // Triple the items for a seamless infinite loop
  const repeated = [...items, ...items, ...items];
  const totalCards = items.length;
  // Card width 260 + gap 20 = 280px
  const totalWidth = totalCards * 280;

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-5"
        animate={{ x: direction === 1 ? [-totalWidth, 0] : [0, -totalWidth] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ width: `${repeated.length * 280}px` }}
      >
        {repeated.map((uni, i) => (
          <UniversityCard key={`${uni.id}-${i}`} university={uni} />
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────────────────────

const SectionHeading = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="flex flex-col items-center text-center mb-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-3"
      >
        <div className="h-px w-10 bg-[#C9A84C]/40" />
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A84C]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Institutional Trust
        </span>
        <div className="h-px w-10 bg-[#C9A84C]/40" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-[#0F172A] mb-3 leading-tight"
        style={{
          fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Who accepts{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LNAT scores
        </span>{" "}
        in India and the UK?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-slate-500 max-w-lg leading-relaxed"
        style={{ fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}
      >
        Your LNAT score unlocks the most prestigious undergraduate law programs
        globally. Each of these universities requires it as a core admission
        criterion.
      </motion.p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrustedUniversities() {
  return (
    <section
      className="relative py-8 lg:py-10 overflow-hidden"
      style={{ background: "#FDFBF7" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Subtle dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0F172A 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Faint gold radial glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Heading — constrained */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading />
        </div>

        {/* Carousels — full bleed */}
        <div className="flex flex-col gap-4">
          <CarouselRow items={universities} direction={1} speed={40} />
          <CarouselRow
            items={[...universities].reverse()}
            direction={-1}
            speed={50}
          />
        </div>

        {/* Bottom stat strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { value: "12+", label: "LNAT universities" },
              { value: "2026", label: "Admissions cycle" },
              { value: "500+", label: "Indian students placed" },
              { value: "80%", label: "Reasoning Focused" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-5 py-2 rounded-xl"
                style={{
                  border: "1px solid rgba(201,168,76,0.2)",
                  background: "rgba(201,168,76,0.04)",
                  minWidth: "130px",
                }}
              >
                <span
                  className="font-bold text-[#0D1B3E]"
                  style={{
                    fontSize: "18px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-slate-500"
                  style={{
                    fontSize: "11px",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
