"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  ArrowRight,
  Download,
  Clock,
  Building2,
  FileText,
  ChevronRight,
  Star,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

const HeroBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#FBF8F2] text-[#8B6914] text-xs tracking-[0.12em] uppercase font-medium shadow-sm"
    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
  >
    <Star size={10} className="fill-[#C9A84C] text-[#C9A84C]" />
    <span>Updated for 2026 Admissions · India-Focused Guidance</span>
  </motion.div>
);
interface HeroAction {
  setisOepn: (isOpen: boolean)=> void;
}
const HeroActions = ({setisOepn}:HeroAction) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col sm:flex-row gap-3"
  >
    <button
      onClick={()=>setisOepn(true)}
      className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-[#F5F0E8] text-sm font-medium tracking-wide transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #0D1B3E 0%, #162447 100%)",
        boxShadow:
          "0 4px 24px rgba(13,27,62,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 8px 32px rgba(13,27,62,0.45), inset 0 1px 0 rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 4px 24px rgba(13,27,62,0.35), inset 0 1px 0 rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(0)";
      }}
    >
      <span>Talk to a Mentor</span>
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>

    <button
      className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-[#0D1B3E] text-sm font-medium tracking-wide border border-[#0D1B3E]/20 bg-transparent transition-all duration-300 hover:bg-[#0D1B3E]/5 hover:border-[#0D1B3E]/35"
      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
    >
      <Download size={14} className="text-[#8B6914]" />
      <span>Download Free Guide</span>
    </button>
  </motion.div>
);

const HeroStats = () => {
  const stats = [
    { label: "LNAT Universities", value: "10+" },
    { label: "Updated for 2026", value: "✓" },
    { label: "India-Focused", value: "✓" },
    { label: "Application Support", value: "End-to-End" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap gap-2"
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/20 bg-[#FBF8F2]/80 text-[11px] text-[#4A5568] tracking-wide"
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          <span className="font-semibold text-[#8B6914]">{s.value}</span>
          <span>{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
};

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatAmplitude?: number;
  floatDuration?: number;
}

const FloatingCard = ({
  children,
  className = "",
  delay = 0,
  floatAmplitude = 8,
  floatDuration = 4,
}: FloatingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute ${className}`}
    style={{
      background: "rgba(13, 27, 62, 0.72)",
      backdropFilter: "blur(16px) saturate(1.4)",
      WebkitBackdropFilter: "blur(16px) saturate(1.4)",
      border: "1px solid rgba(201, 168, 76, 0.18)",
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
      borderRadius: "16px",
    }}
  >
    <motion.div
      animate={{ y: [0, -floatAmplitude, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const TimelineCard = () => (
  <FloatingCard
    className="top-[8%] left-[3%] w-52 hidden md:block"
    delay={0.9}
    floatAmplitude={6}
    floatDuration={5}
  >
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={13} className="text-[#C9A84C]" />
        <span
          className="text-[10px] uppercase tracking-[0.14em] text-[#C9A84C] font-medium"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          LNAT 2026 Timeline
        </span>
      </div>
      {[
        { phase: "Registration Opens", date: "Aug 2025" },
        { phase: "Testing Begins", date: "Sep 2025" },
        { phase: "Deadline", date: "Jan 2026" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0"
        >
          <span
            className="text-[11px] text-white/60"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {item.phase}
          </span>
          <span
            className="text-[10px] text-[#C9A84C] font-semibold"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {item.date}
          </span>
        </div>
      ))}
    </div>
  </FloatingCard>
);

const UniversitiesCard = () => (
  <FloatingCard
    className="bottom-[2%] left-[3%] w-48 hidden md:block"
    delay={1.1}
    floatAmplitude={7}
    floatDuration={4.5}
  >
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap size={13} className="text-[#C9A84C]" />
        <span
          className="text-[10px] uppercase tracking-[0.14em] text-[#C9A84C] font-medium"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          Top Universities
        </span>
      </div>
      {[
        "University of Oxford",
        "UCL",
        "LSE",
        "King's College London",
        "University of Nottingham",
      ].map((uni, i) => (
        <div
          key={i}
          className="flex items-center gap-2 py-1 border-b border-white/5 last:border-0"
        >
          <ChevronRight size={9} className="text-[#C9A84C]/60 flex-shrink-0" />
          <span
            className="text-[11px] text-white/70"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {uni}
          </span>
        </div>
      ))}
    </div>
  </FloatingCard>
);

const ExamSnapshotCard = () => (
  <FloatingCard
    className="top-[10%] right-[2%] w-52 hidden md:block"
    delay={1.3}
    floatAmplitude={5}
    floatDuration={3.8}
  >
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileText size={13} className="text-[#C9A84C]" />
        <span
          className="text-[10px] uppercase tracking-[0.14em] text-[#C9A84C] font-medium"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          Exam Snapshot
        </span>
      </div>
      {[
        {
          icon: <BookOpen size={11} />,
          label: "Format",
          value: "MCQs + Essay",
        },
        { icon: <Clock size={11} />, label: "Duration", value: "2h 15m" },
        {
          icon: <Building2 size={11} />,
          label: "Used By",
          value: "12 Law Schools",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0"
        >
          <span className="text-[#C9A84C]/70">{item.icon}</span>
          <span
            className="text-[11px] text-white/50 w-16"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {item.label}
          </span>
          <span
            className="text-[11px] text-white/80 font-medium"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </FloatingCard>
);

const HeroVisual = () => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="relative w-full h-full min-h-[520px] lg:min-h-0"
  >
    {/* Main architectural image container */}
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{ minHeight: "480px" }}
    >
      {/* Simulated atmospheric architectural visual using CSS */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(22,36,71,0.9) 0%, transparent 60%),
            linear-gradient(165deg, #0A1628 0%, #111D3C 35%, #162447 65%, #0D1B3E 100%)
          `,
        }}
      >
        {/* Architectural grid lines — simulating gothic arches */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          viewBox="0 0 600 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gothic arch columns */}
          {[80, 200, 320, 440, 560].map((x, i) => (
            <g key={i}>
              <line
                x1={x}
                y1="700"
                x2={x}
                y2="120"
                stroke="#C9A84C"
                strokeWidth="0.8"
              />
              <path
                d={`M${x - 60},120 Q${x},20 ${x + 60},120`}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.8"
              />
            </g>
          ))}
          {/* Horizontal lines */}
          {[150, 300, 450, 600].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2="600"
              y2={y}
              stroke="#C9A84C"
              strokeWidth="0.4"
            />
          ))}
          {/* Cross-vaulting diagonals */}
          <line
            x1="0"
            y1="0"
            x2="600"
            y2="700"
            stroke="#C9A84C"
            strokeWidth="0.3"
          />
          <line
            x1="600"
            y1="0"
            x2="0"
            y2="700"
            stroke="#C9A84C"
            strokeWidth="0.3"
          />
          {/* Central rose window */}
          <circle
            cx="300"
            cy="350"
            r="120"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.6"
          />
          <circle
            cx="300"
            cy="350"
            r="80"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.4"
          />
          <circle
            cx="300"
            cy="350"
            r="40"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.4"
          />
          {[0, 30, 60, 90, 120, 150].map((deg, i) => (
            <line
              key={i}
              x1={300 + 120 * Math.cos((deg * Math.PI) / 180)}
              y1={350 + 120 * Math.sin((deg * Math.PI) / 180)}
              x2={300 - 120 * Math.cos((deg * Math.PI) / 180)}
              y2={350 - 120 * Math.sin((deg * Math.PI) / 180)}
              stroke="#C9A84C"
              strokeWidth="0.4"
            />
          ))}
        </svg>

        {/* Atmospheric glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(201,168,76,0.08) 0%, transparent 55%)",
          }}
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(9,16,36,0.85) 0%, transparent 100%)",
          }}
        />

        {/* Top vignette */}
        <div
          className="absolute inset-x-0 top-0 h-1/4"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,16,36,0.4) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Centered emblem/seal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(201,168,76,0.07)",
              border: "1px solid rgba(201,168,76,0.25)",
              boxShadow: "0 0 40px rgba(201,168,76,0.08)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <GraduationCap
                size={28}
                className="text-[#C9A84C]"
                strokeWidth={1.2}
              />
            </div>
          </div>
          <div className="text-center">
            <p
              className="text-[#C9A84C]/80 text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              LNAT Exam India
            </p>
            <p
              className="text-white/30 text-[9px] tracking-[0.2em] mt-0.5"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Premium Admissions Guidance
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating cards */}
      <TimelineCard />
      <UniversitiesCard />
      <ExamSnapshotCard />
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function HomeHero() {
  const[isOpen, setIsOpen] = useState(false);
  return (
    <>
    <EnquiryPopupForm isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>

      <section
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: "#F7F3EC" }}
      >
        {/* ── Background atmospheric layer ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Soft radial light from top-left */}
          <div
            className="absolute"
            style={{
              top: "-10%",
              left: "-5%",
              width: "55%",
              height: "65%",
              background:
                "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
            }}
          />
          {/* Deep navy bleed from right */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[46%]"
            style={{
              background:
                "linear-gradient(to left, rgba(13,27,62,0.04) 0%, transparent 100%)",
            }}
          />
          {/* Very subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0D1B3E 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Horizontal rule accent */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent 0%, rgba(201,168,76,0.12) 30%, rgba(201,168,76,0.08) 55%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Main grid ── */}
        <div className="relative z-10 mx-auto max-w-[1340px] px-6 lg:px-12 xl:px-16 flex flex-col lg:flex-row lg:items-center min-h-screen">
          {/* LEFT — textual content (55%) */}
          <div className="lg:w-[55%] flex flex-col justify-center py-0 lg:py-0 lg:pr-16 xl:pr-20">
            {/* Thin decorative line above badge */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-12 h-px bg-[#C9A84C]/50 mb-6 origin-left"
            />

            <HeroBadge />

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 mb-7 leading-[1.12] text-center md:text-start tracking-[-0.02em] text-[#0A1628]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 400,
                maxWidth: "640px",
              }}
            >
              Navigate{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "#162447",
                  fontWeight: 300,
                }}
              >
                LNAT Admissions
              </em>{" "}
              with{" "}
              <span
                style={{
                  color: "#8B6914",
                  fontWeight: 500,
                }}
              >
                Clarity
              </span>
              {" & "}
              <span style={{ fontWeight: 500 }}>Confidence</span>
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#4A5568] text-center md:text-start leading-[1.85] mb-9"
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                maxWidth: "560px",
                fontWeight: 400,
              }}
            >
              India&rsquo;s dedicated resource for LNAT preparation and UK law
              school admissions. Access comprehensive university timelines,
              registration deadlines, application strategies, and expert
              mentorship — designed specifically for Indian students pursuing{" "}
              <span className="text-[#0A1628] font-medium">
                Oxford, UCL, LSE
              </span>{" "}
              and beyond.
            </motion.p>

            <HeroActions setisOepn={setIsOpen}/>

            <div className="mt-8">
              <HeroStats />
            </div>

            {/* Bottom decorative signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-7 mb-7 md:mb-0 md:mt-14 flex items-center gap-3"
            >
              <div className="h-px md:w-8 bg-[#C9A84C]/30" />
              <p
                className="text-[10px] text-[#9CA3AF] tracking-[0.18em] uppercase m-1"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Trusted by aspirants across India
              </p>
            </motion.div>
          </div>

          {/* RIGHT — visual (45%) */}
          <div className="lg:w-[45%] hidden md:flex items-center justify-center pb-16 lg:py-12 px-0 lg:px-0">
            <div
              className="w-full max-w-[500px] lg:max-w-none"
              style={{ height: "clamp(480px, 70vh, 680px)" }}
            >
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* ── Bottom edge ornament ── */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-0 pointer-events-none overflow-hidden">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
        </div>
      </section>
    </>
  );
}
