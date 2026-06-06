"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Download,
  BookOpen,
  Star,
  GraduationCap,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const CYCLING_UNIS = ["Oxford", "Cambridge", "UCL", "Bristol", "LSE"];

const UNIVERSITIES = [
  "University of Oxford",
  "University of Cambridge",
  "UCL",
  "London School of Economics",
  "King's College London",
  "University of Nottingham",
];

const STATS = [
  { value: "30+", label: "LNAT Universities" },
  { value: "2026", label: "Updated" },
  { value: "500+", label: "Indian Students" },
  { value: "80%", label: "Reasoning Focused" },
];

const TIMELINE = [
  { phase: "Registration Opens", date: "Aug 2025", done: true },
  { phase: "Testing Window", date: "Sep–Jan", done: true },
  { phase: "Application Deadline", date: "Jan 2026", done: false },
];

const BG_IMAGE =
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1400&q=80&auto=format&fit=crop";
const STUDENT_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop";

// ─────────────────────────────────────────────────────────────
// Cycling university name in headline
// ─────────────────────────────────────────────────────────────

const CyclingUniName = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CYCLING_UNIS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block" style={{ minWidth: "160px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{
            background:
              "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {CYCLING_UNIS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

const Pill = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${className}`}
  >
    {children}
  </span>
);

const GlassCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute rounded-2xl overflow-hidden ${className}`}
    style={{
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(201,168,76,0.22)",
      boxShadow:
        "0 12px 40px rgba(13,27,62,0.14), 0 2px 8px rgba(201,168,76,0.1)",
    }}
  >
    {children}
  </motion.div>
);

const TimelineFloatCard = () => (
  <GlassCard className="-top-10 -left-30 w-48 hidden lg:block" delay={1.0}>
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="p-3.5"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-full bg-[#0D1B3E] flex items-center justify-center">
          <Calendar size={11} className="text-[#C9A84C]" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0D1B3E]">
          2026 Timeline
        </span>
      </div>
      {TIMELINE.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 py-1 border-b border-[#0D1B3E]/5 last:border-0"
        >
          <CheckCircle2
            size={10}
            className={item.done ? "text-[#C9A84C]" : "text-gray-300"}
          />
          <span className="text-[10px] text-gray-600 flex-1 font-medium">
            {item.phase}
          </span>
          <span className="text-[9px] font-bold text-[#0D1B3E]">
            {item.date}
          </span>
        </div>
      ))}
    </motion.div>
  </GlassCard>
);

const ExamCard = () => (
  <GlassCard className="-bottom-10 -right-35 w-44 hidden lg:block" delay={1.2}>
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8,
      }}
      className="p-3.5"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center">
          <BookOpen size={11} className="text-white" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0D1B3E]">
          Exam Snapshot
        </span>
      </div>
      {[
        { label: "Format", value: "MCQs + Essay" },
        { label: "Duration", value: "2h 15m" },
        { label: "Used By", value: "12 Law Schools" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-1 border-b border-[#0D1B3E]/5 last:border-0"
        >
          <span className="text-[9px] text-gray-500 font-medium">
            {item.label}
          </span>
          <span className="text-[9px] font-bold text-[#0D1B3E]">
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  </GlassCard>
);

const UniversitiesMarquee = () => (
  <div className="overflow-hidden">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="flex gap-6 whitespace-nowrap"
    >
      {[...UNIVERSITIES, ...UNIVERSITIES].map((uni, i) => (
        <div key={i} className="flex items-center gap-2 shrink-0">
          <GraduationCap size={11} className="text-[#C9A84C]" />
          <span className="text-[11px] font-semibold text-white/75 tracking-wide">
            {uni}
          </span>
          <span className="text-[#C9A84C]/30 mx-1">·</span>
        </div>
      ))}
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function HomeHero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EnquiryPopupForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="home-hero"
      />

      <section
        className="relative w-full overflow-hidden bg-[#F7F3EC]"
        style={{ height: "107vh", maxHeight: "820px", minHeight: "650px" }}
      >
        {/* ── Background image ── */}
        <div className="absolute inset-0">
          <img
            src={BG_IMAGE}
            alt="Oxford University"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            width="1400"
            height="820"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(9,16,36,0.84) 0%, rgba(13,27,62,0.72) 45%, rgba(9,16,36,0.55) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 60% 0%, rgba(201,168,76,0.10) 0%, transparent 55%)",
            }}
          />
        </div>

        {/* ── Content wrapper ── */}
        <div className="relative z-10 md:h-[94%] gap-16 mx-auto max-w-325 px-6 lg:px-14 xl:px-20 flex flex-col">
          {/* Nav accent */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-5 flex items-center gap-3 shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center">
              <GraduationCap size={14} className="text-[#0D1B3E]" />
            </div>
            <span className="text-white/80 text-sm font-semibold tracking-wide">
              LNAT India
            </span>
            <div className="ml-auto">
              <Pill className="bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30">
                <Star size={9} className="fill-[#C9A84C]" />
                Updated for 2026
              </Pill>
            </div>
          </motion.div>

          {/* Main body */}
          <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 py-4 lg:py-0">
            {/* LEFT */}
            <div className="lg:w-[55%] text-center md:text-start flex flex-col justify-center lg:pr-14">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4"
              >
                <Pill className="bg-white/10 text-white/70 border border-white/15 backdrop-blur-sm">
                  #1 LNAT Resource for Indian Students
                </Pill>
              </motion.div>

              {/* Headline with cycling university */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-white mb-4"
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
                  fontWeight: 700,
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                }}
              >
                Your Path to <CyclingUniName />
                <br />
                <span className="font-light text-white/80">Law school</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42 }}
                className="text-white/60 leading-[1.8] mb-6 max-w-[500px] font-light"
                style={{ fontSize: "clamp(0.8rem, 1vw, 0.93rem)" }}
              >
                India&apos;s most trusted platform for LNAT preparation. Personalised
                mentorship, comprehensive study plans, and end-to-end admissions
                support — built for{" "}
                <span className="text-white font-semibold">
                  Indian students
                </span>{" "}
                aiming for the world&apos;s best universities.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.54 }}
                className="flex flex-col sm:flex-row gap-3 mb-6"
              >
                <button
                  onClick={() => setIsOpen(true)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
                  }}
                >
                  Talk to a Mentor
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <button className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-white/20 bg-white/8 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                  <Download size={13} className="text-[#C9A84C]" />
                  Free Study Guide
                </button>
              </motion.div>

              {/* Trust */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center gap-2 flex-wrap"
              >
                <div className="flex -space-x-2">
                  {["#E8C96A", "#C9A84C", "#8B6914", "#0D1B3E"].map((c, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-[#0D1B3E] flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ background: c, zIndex: 4 - i }}
                    >
                      {["A", "P", "R", "S"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-white/50 text-[11px] font-medium ml-1">
                  500+ Indian students placed
                </span>
                <span className="text-[#C9A84C] text-xs">★★★★★</span>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="lg:w-[45%] relative w-full hidden md:flex items-center justify-center ">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full max-w-85 mx-auto"
              >
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    boxShadow:
                      "0 24px 56px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.2)",
                    height: "360px",
                  }}
                >
                  <img
                    src={STUDENT_IMAGE}
                    alt="Students studying for LNAT"
                    className="w-full h-full object-cover object-top"
                    fetchPriority="high"
                    width="800"
                    height="360"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(9,16,36,0.65) 0%, transparent 55%)",
                    }}
                  />

                  {/* Score badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="rounded-xl p-3 flex items-center gap-2.5"
                      style={{
                        background: "rgba(9,16,36,0.78)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(201,168,76,0.25)",
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0">
                        <Star size={13} className="fill-white text-white" />
                      </div>
                      <div>
                        <p className="text-white text-[11px] font-semibold">
                          Avg. LNAT Score: 28/42
                        </p>
                        <p className="text-white/50 text-[9px]">
                          Top 10% among Indian test-takers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <TimelineFloatCard />
                <ExamCard />

                {/* Pill top-right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="absolute -top-3 -right-3 hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    boxShadow: "0 8px 24px rgba(13,27,62,0.15)",
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#0D1B3E] flex items-center justify-center">
                    <CheckCircle2 size={9} className="text-[#C9A84C]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0D1B3E]">
                    95% Placement Rate
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-2.5 flex flex-col gap-0.5"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="text-xl font-bold leading-none"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-white/45 text-[10px] font-medium tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Universities marquee */}
        <div
          className="relative z-10 border-t shrink-0"
          style={{
            borderColor: "rgba(201,168,76,0.15)",
            background: "rgba(9,16,36,0.72)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="py-2.5">
            <UniversitiesMarquee />
          </div>
        </div>
      </section>
    </>
  );
}
