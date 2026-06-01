"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import {
  BookOpen,
  Pen,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Monitor,
  Brain,
  Lightbulb,
  FileText,
  TrendingUp,
  Shield,
  Info,
  ArrowRight,
  Zap,
  BarChart3,
  Users,
  MapPin,
  CreditCard,
  RotateCcw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// MOTION VARIANTS
// ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "Overview", icon: <BarChart3 size={15} /> },
  { id: "sectionA", label: "Section A", icon: <BookOpen size={15} /> },
  { id: "sectionB", label: "Section B", icon: <Pen size={15} /> },
  { id: "scoring", label: "Scoring", icon: <TrendingUp size={15} /> },
  { id: "logistics", label: "Logistics", icon: <MapPin size={15} /> },
  { id: "strategy", label: "Strategy", icon: <Brain size={15} /> },
];

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px w-7 bg-[#C9A84C]/50" />
      <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
        {text}
      </span>
    </div>
  );
}

function InfoChip({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-black/[0.07] shadow-sm">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-slate-400 font-medium mb-0.5">
          {label}
        </div>
        <div className="text-[13px] text-[#0D1B3E] font-bold">{value}</div>
      </div>
    </div>
  );
}

function DarkChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-[#0D1B3E] border border-[#C9A84C]/15">
      <div className="text-[#C9A84C] mb-2">{icon}</div>
      <div className="text-[10px] text-white/40 font-medium mb-1">{label}</div>
      <div className="text-sm text-white font-bold">{value}</div>
    </div>
  );
}

function BulletItem({
  text,
  danger,
  sub,
}: {
  text: string;
  danger?: boolean;
  sub?: string;
}) {
  return (
    <div className="flex gap-2.5 mb-2.5 items-start">
      <div
        className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[7px] ${
          danger ? "bg-red-500" : "bg-[#C9A84C]"
        }`}
      />
      <div>
        <span className="text-[13px] text-gray-700 leading-relaxed">
          {text}
        </span>
        {sub && <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
  accent = "#0D1B3E",
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.07] shadow-sm overflow-hidden mb-5">
      <div
        className="flex items-center gap-2 px-5 py-3.5 border-b border-black/[0.05]"
        style={{ background: `${accent}06` }}
      >
        <div
          className="w-[3px] h-[18px] rounded-full"
          style={{ background: accent }}
        />
        <span className="text-[13px] font-bold text-[#0D1B3E]">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function AlertBox({
  type,
  children,
}: {
  type: "tip" | "warning" | "info";
  children: React.ReactNode;
}) {
  const cfg = {
    tip: {
      cls: "bg-[#C9A84C]/[0.06] border-[#C9A84C]/25 text-[#8B6914]",
      icon: <Lightbulb size={14} />,
    },
    warning: {
      cls: "bg-red-500/[0.05] border-red-400/20 text-red-600",
      icon: <AlertCircle size={14} />,
    },
    info: {
      cls: "bg-[#0D1B3E]/[0.05] border-[#0D1B3E]/15 text-[#0D1B3E]",
      icon: <Info size={14} />,
    },
  }[type];
  return (
    <div className={`flex gap-2.5 p-3 rounded-xl border mb-4 ${cfg.cls}`}>
      <span className="shrink-0 mt-0.5">{cfg.icon}</span>
      <span className="text-[12px] text-gray-700 leading-relaxed">
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// UNIVERSITY CARD
// ─────────────────────────────────────────────────────────────
const UNI_IMAGES: Record<string, string> = {
  Oxford:
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80&auto=format&fit=crop",
  Cambridge:
    "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=400&q=80&auto=format&fit=crop",
  UCL: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400&q=80&auto=format&fit=crop",
  LSE: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80&auto=format&fit=crop",
  KCL: "https://images.unsplash.com/photo-1543832923-44667a44c804?w=400&q=80&auto=format&fit=crop",
  Bristol:
    "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&q=80&auto=format&fit=crop",
  Durham:
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80&auto=format&fit=crop",
  SOAS: "https://images.unsplash.com/photo-1581344895194-dc3c0d6e5be2?w=400&q=80&auto=format&fit=crop",
  JGLS: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80&auto=format&fit=crop",
};
const UNI_LOCATIONS: Record<string, string> = {
  Oxford: "Oxford, UK",
  Cambridge: "Cambridge, UK",
  UCL: "London, UK",
  LSE: "London, UK",
  KCL: "London, UK",
  Bristol: "Bristol, UK",
  Durham: "Durham, UK",
  SOAS: "London, UK",
  JGLS: "Sonipat, India",
};
const UNI_FOUNDED: Record<string, string> = {
  Oxford: "Est. 1096",
  Cambridge: "Est. 1209",
  UCL: "Est. 1826",
  LSE: "Est. 1895",
  KCL: "Est. 1829",
  Bristol: "Est. 1909",
  Durham: "Est. 1832",
  SOAS: "Est. 1916",
  JGLS: "Est. 2009",
};

function UniCard({
  uni,
  isIndia,
}: {
  uni: { name: string; short: string; color: string };
  isIndia: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const key = uni.short.replace(" 🇮🇳", "");
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 w-[185px] rounded-2xl overflow-hidden bg-white cursor-default transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? uni.color + "50" : "rgba(0,0,0,0.08)"}`,
        boxShadow: hovered
          ? `0 12px 32px ${uni.color}22, 0 4px 12px rgba(0,0,0,0.1)`
          : "0 2px 10px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* accent bar */}
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${uni.color}, ${uni.color}80)`,
        }}
      />
      {/* image */}
      <div className="relative h-[108px] overflow-hidden">
        <img
          src={UNI_IMAGES[key]}
          alt={uni.name}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="absolute bottom-2 left-2 text-[9px] font-semibold text-white/85 bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {UNI_FOUNDED[key]}
        </span>
        {isIndia && (
          <span className="absolute top-2 right-2 text-[9px] font-bold text-[#0D1B3E] bg-[#C9A84C] px-2 py-0.5 rounded-full">
            🇮🇳 India
          </span>
        )}
      </div>
      {/* body */}
      <div className="p-3 pb-3.5">
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide mb-2"
          style={{
            background: `${uni.color}12`,
            border: `1px solid ${uni.color}25`,
            color: uni.color,
          }}
        >
          <Shield size={9} />
          LNAT Required
        </div>
        <div className="text-[12px] font-bold text-[#0D1B3E] leading-snug mb-1.5">
          {uni.name}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={10} className="text-slate-400 shrink-0" />
          <span className="text-[10px] text-slate-400">
            {UNI_LOCATIONS[key]}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB PANELS
// ─────────────────────────────────────────────────────────────

// ── OVERVIEW ──────────────────────────────────────────────────
function OverviewPanel() {
  const stats = [
    {
      icon: <Monitor size={17} />,
      label: "Exam Mode",
      value: "Computer-Based",
      accent: "#0D1B3E",
    },
    {
      icon: <Clock size={17} />,
      label: "Total Duration",
      value: "2 Hours 15 Mins",
      accent: "#C9A84C",
    },
    {
      icon: <FileText size={17} />,
      label: "Total Sections",
      value: "2 (A + B)",
      accent: "#1A5276",
    },
    {
      icon: <Target size={17} />,
      label: "Max Score (Sec A)",
      value: "42 / 42",
      accent: "#6C1F6E",
    },
    {
      icon: <BookOpen size={17} />,
      label: "Section A",
      value: "42 MCQs · 95 min",
      accent: "#B5451B",
    },
    {
      icon: <Pen size={17} />,
      label: "Section B",
      value: "1 Essay · 40 min",
      accent: "#154360",
    },
    {
      icon: <Users size={17} />,
      label: "Established",
      value: "2004 · Non-profit",
      accent: "#0D1B3E",
    },
    {
      icon: <Shield size={17} />,
      label: "No Legal Knowledge",
      value: "Pure Aptitude Only",
      accent: "#C9A84C",
    },
  ];

  const unis = [
    { name: "University of Oxford", short: "Oxford", color: "#0D1B3E" },
    { name: "University of Cambridge", short: "Cambridge", color: "#C9A84C" },
    { name: "UCL", short: "UCL", color: "#8B1A1A" },
    { name: "LSE", short: "LSE", color: "#1A5276" },
    { name: "King's College London", short: "KCL", color: "#6C1F6E" },
    { name: "University of Bristol", short: "Bristol", color: "#B5451B" },
    { name: "Durham University", short: "Durham", color: "#154360" },
    { name: "SOAS University of London", short: "SOAS", color: "#1B5E20" },
    { name: "Jindal Global Law School", short: "JGLS 🇮🇳", color: "#C9A84C" },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Hero strip */}
      <motion.div
        variants={fadeUp}
        className="relative rounded-2xl p-7 overflow-hidden border border-[#C9A84C]/15"
        style={{
          background:
            "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)",
          boxShadow: "0 16px 48px rgba(13,27,62,0.2)",
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />
        <Label text="At a Glance" />
        <h3 className="text-[#fff] font-extrabold text-2xl tracking-tight mb-2">
          Law National Aptitude Test
        </h3>
        <p className="text-white/50 text-[13px] leading-relaxed mb-5 max-w-lg">
          A professionally calibrated diagnostic tool established in 2004 by the
          LNAT Consortium Ltd. — a not-for-profit entity. Administered globally
          by Pearson VUE. Measures cognitive aptitude, not legal knowledge.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: "95 min", l: "Section A Time" },
            { v: "40 min", l: "Section B Time" },
            { v: "42 MCQs", l: "Questions" },
            { v: "12", l: "Reading Passages" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-3.5 bg-white/[0.06] border border-white/[0.08]"
            >
              <div className="text-[#C9A84C] font-extrabold text-xl leading-none">
                {s.v}
              </div>
              <div className="text-white/40 text-[10px] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Info chips grid */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {stats.map((s, i) => (
          <InfoChip key={i} {...s} />
        ))}
      </motion.div>

      {/* Universities carousel */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl border border-[#C9A84C]/20 overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C9A84C]/12 bg-[#C9A84C]/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-[18px] rounded-full bg-[#C9A84C]" />
              <span className="text-[13px] font-bold text-[#0D1B3E]">
                LNAT Consortium Universities
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              ← scroll →
            </span>
          </div>
          {/* scrollable row */}
          <div className="px-5 pt-5 pb-2">
            <div className="flex gap-3.5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {unis.map((u, i) => (
                <UniCard key={i} uni={u} isIndia={u.short.includes("🇮🇳")} />
              ))}
            </div>
          </div>
          {/* footer note */}
          <div className="px-5 pb-5">
            <div className="flex gap-2.5 p-3 rounded-xl bg-[#0D1B3E]/[0.04] border border-[#0D1B3E]/10">
              <Info size={14} className="text-[#0D1B3E] shrink-0 mt-0.5" />
              <span className="text-[12px] text-gray-700 leading-relaxed">
                <strong>Jindal Global Law School (JGLS)</strong> joined the
                consortium in 2025–26 as the{" "}
                <strong>only Indian member institution</strong>, making LNAT its
                sole entrance exam and replacing CLAT/LSAT-India for its LLB
                programs.
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── SECTION A ─────────────────────────────────────────────────
function SectionAPanel() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const questionTypes = [
    {
      title: "Unstated Assumptions",
      color: "#0D1B3E",
      desc: "Identify the hidden premise upon which the writer's entire argument depends. If this assumption were false, the argument would collapse.",
      example:
        '"Author argues X leads to Y. What must be assumed for this to hold?"',
    },
    {
      title: "Objective vs Subjective",
      color: "#C9A84C",
      desc: "Distinguish between hard empirical evidence and the author's personal commentary, opinion, or interpretation.",
      example: '"Which statement is a fact rather than the author\'s opinion?"',
    },
    {
      title: "Logical Deduction",
      color: "#1A5276",
      desc: "Identify conclusions that MUST follow if premises are accepted as true — even if they contradict real-world facts.",
      example:
        '"If the passage\'s claims are correct, which conclusion necessarily follows?"',
    },
    {
      title: "Fine-grained Discrimination",
      color: "#6C1F6E",
      desc: "Distinguish between closely related propositions. Deliberately includes 'almost right' distractors requiring precision.",
      example:
        '"Which best describes the author\'s PRIMARY argument (not secondary)?"',
    },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Hero */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl overflow-hidden bg-[#0D1B3E]"
      >
        <div className="p-6 pb-0">
          <Label text="Section A — Objective" />
          <h3 className="text-white font-extrabold text-2xl mb-4">
            Analytical Reasoning · MCQ
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { v: "95 min", l: "Time Allowed" },
              { v: "42 Qs", l: "Questions" },
              { v: "12", l: "Passages" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-3 bg-white/[0.06] border border-white/[0.08] text-center"
              >
                <div className="text-[#C9A84C] font-extrabold text-xl leading-none">
                  {s.v}
                </div>
                <div className="text-white/40 text-[10px] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="text-[10px] text-white/40 mb-2 tracking-wide uppercase">
            Section Weight in Exam
          </div>
          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "70.4%" }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #C9A84C, #E8C96A)" }}
            />
          </div>
          <div className="text-[11px] text-[#C9A84C] mt-1.5">
            70.4% of total exam time (95 of 135 mins)
          </div>
        </div>
      </motion.div>

      {/* Structure */}
      <motion.div variants={fadeUp}>
        <SectionCard title="Passage Structure" accent="#0D1B3E">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl p-3.5 bg-[#0D1B3E]/[0.04] border border-[#0D1B3E]/10 text-center">
              <div className="text-[#0D1B3E] font-extrabold text-3xl">12</div>
              <div className="text-slate-500 text-[11px] mt-1">
                Argumentative passages
              </div>
            </div>
            <div className="rounded-xl p-3.5 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/20 text-center">
              <div className="text-[#C9A84C] font-extrabold text-3xl">3–4</div>
              <div className="text-slate-500 text-[11px] mt-1">
                Questions per passage
              </div>
            </div>
          </div>
          <BulletItem text="Passages span philosophy, ethics, science, politics, sociology — no subject gives prior advantage." />
          <BulletItem text="4 answer options per question (updated from 5). No negative marking." />
          <BulletItem text="Passage shown left, questions right on Pearson VUE interface. Can flag & revisit." />
          <BulletItem
            text="Once Section A time expires or is submitted, it is permanently locked."
            danger
          />
        </SectionCard>
      </motion.div>

      {/* Question types accordion */}
      <motion.div variants={fadeUp}>
        <div className="text-[13px] font-bold text-[#0D1B3E] mb-3">
          Question Type Breakdown
        </div>
        <div className="space-y-2.5">
          {questionTypes.map((q, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white transition-all duration-300"
              style={{
                border: `1px solid ${
                  expanded === i ? q.color + "30" : "rgba(0,0,0,0.07)"
                }`,
                boxShadow:
                  expanded === i
                    ? `0 8px 24px ${q.color}12`
                    : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-transparent border-none cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: q.color }}
                  />
                  <span className="text-[13px] font-bold text-[#0D1B3E]">
                    {q.title}
                  </span>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-400 transition-transform duration-200"
                  style={{
                    transform: expanded === i ? "rotate(90deg)" : "none",
                  }}
                />
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="text-[12px] text-gray-600 leading-relaxed mb-2.5">
                        {q.desc}
                      </p>
                      <div
                        className="p-3 rounded-xl text-[12px] text-gray-700 italic"
                        style={{
                          background: `${q.color}08`,
                          border: `1px solid ${q.color}20`,
                        }}
                      >
                        <div
                          className="text-[9px] font-bold uppercase tracking-wide mb-1"
                          style={{ color: q.color }}
                        >
                          Example format
                        </div>
                        {q.example}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-0">
        <AlertBox type="warning">
          <strong>Critical rule:</strong> Bringing external knowledge into
          Section A is a trap. Work solely from information within the passage.
          Real-world facts that contradict a premise are irrelevant.
        </AlertBox>
        <AlertBox type="tip">
          <strong>No negative marking</strong> — never leave a question blank.
          Eliminate known falsehoods first, then make an educated guess.
        </AlertBox>
      </motion.div>
    </motion.div>
  );
}

// ── SECTION B ─────────────────────────────────────────────────
function SectionBPanel() {
  const [activePrompt, setActivePrompt] = useState(0);

  const samplePrompts = [
    "Should judges be elected rather than appointed?",
    "Make the best case you can for public funding of the arts.",
    "Are there sufficient grounds to justify the sacrifice of traditional liberties to defeat terrorism?",
    "Should voting be compulsory in a democracy?",
    "How much should students contribute financially to their own degrees?",
    "Is political correctness important to society?",
  ];

  const evalCriteria = [
    {
      label: "Clear Thesis",
      desc: "A definitive stance stated early. No fence-sitting.",
      score: "Critical",
    },
    {
      label: "Argument Structure",
      desc: "Logical progression from premise to conclusion.",
      score: "Critical",
    },
    {
      label: "Counterargument Handling",
      desc: "Acknowledge then systematically dismantle opposing views.",
      score: "High",
    },
    {
      label: "Assumption Declaration",
      desc: "Explicitly state underlying assumptions your argument depends on.",
      score: "High",
    },
    {
      label: "Written English",
      desc: "Clarity and conciseness — no spell-check or grammar assistance.",
      score: "High",
    },
    {
      label: "Word Economy",
      desc: "Optimal: 500–600 words. Maximum: 750 words.",
      score: "Moderate",
    },
  ];

  const scoreColor = (s: string) =>
    s === "Critical"
      ? "bg-red-500/10 border-red-400/20 text-red-600"
      : s === "High"
      ? "bg-[#C9A84C]/10 border-[#C9A84C]/25 text-[#8B6914]"
      : "bg-[#0D1B3E]/[0.06] border-[#0D1B3E]/12 text-[#0D1B3E]";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Hero */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl p-6 border-0"
        style={{
          background: "linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)",
          boxShadow: "0 12px 36px rgba(201,168,76,0.25)",
        }}
      >
        <Label text="Section B — Subjective" />
        <h3 className="text-[#0D1B3E] font-extrabold text-2xl mb-4">
          Argumentative Essay
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { v: "40 minutes", l: "Time Allowed" },
            { v: "3 prompts", l: "Choose 1" },
            { v: "750 words", l: "Max Length" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-3 bg-black/[0.12] text-center">
              <div className="text-white font-bold md:font-extrabold md:text-xl leading-none">
                {s.v}
              </div>
              <div className="text-white/70 text-[10px] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AlertBox type="warning">
          <strong>Critical distinction:</strong> Section B is NOT scored by the
          LNAT Consortium, Pearson VUE, or Edexcel. The raw essay is sent
          directly to each university's admissions tutors. Oxford independently
          scores it; UCL evaluates it rigorously alongside Section A.
        </AlertBox>
      </motion.div>

      {/* Essay environment */}
      <motion.div variants={fadeUp}>
        <SectionCard title="Digital Essay Environment" accent="#C9A84C">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              {
                icon: <Monitor size={14} />,
                label: "Word Processor",
                value: "Rudimentary only",
                sub: "Cut, Copy, Paste, Undo, Redo",
              },
              {
                icon: <Shield size={14} />,
                label: "No Spell-check",
                value: "Natural English only",
                sub: "No grammar assistance",
              },
              {
                icon: <BarChart3 size={14} />,
                label: "Word Counter",
                value: "Built-in",
                sub: "Visible throughout",
              },
              {
                icon: <AlertCircle size={14} />,
                label: "Final Submission",
                value: "Irreversible",
                sub: "No return after End Review",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#C9A84C]/[0.05] border border-[#C9A84C]/20"
              >
                <div className="flex items-center gap-1.5 mb-1.5 text-[#C9A84C]">
                  {s.icon}
                  <span className="text-[10px] font-semibold text-[#8B6914]">
                    {s.label}
                  </span>
                </div>
                <div className="text-[13px] font-bold text-[#0D1B3E]">
                  {s.value}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
          <AlertBox type="tip">
            Keyboard layout varies by centre. Some Indian Pearson VUE centres
            use local configurations — verify in advance to avoid disruption
            during the 40-minute essay.
          </AlertBox>
        </SectionCard>
      </motion.div>

      {/* Word count */}
      <motion.div variants={fadeUp}>
        <SectionCard title="Word Count Strategy" accent="#0D1B3E">
          <div className="mb-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px] text-slate-400">Too short</span>
              <span className="text-[11px] text-slate-400">Too long</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-black/[0.06] overflow-hidden">
              <div
                className="absolute left-[35%] w-[32%] h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #C9A84C, #E8C96A)",
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-red-500">Under 350</span>
              <span className="text-[10px] font-bold text-[#C9A84C]">
                ★ 500–600 words optimal
              </span>
              <span className="text-[10px] text-red-500">Over 750</span>
            </div>
          </div>
          <BulletItem text="500–600 words is the LNAT Consortium's explicitly recommended optimal length." />
          <BulletItem text="Too little gives insufficient material for admissions tutors to evaluate your reasoning." />
          <BulletItem
            text="Exceeding 600–700 words leads to structural collapse and loss of conciseness."
            danger
          />
        </SectionCard>
      </motion.div>

      {/* Eval criteria */}
      <motion.div variants={fadeUp}>
        <SectionCard title="What Admissions Tutors Evaluate" accent="#1A5276">
          <div className="divide-y divide-black/[0.05]">
            {evalCriteria.map((c, i) => (
              <div
                key={i}
                className="flex justify-between items-start py-2.5 gap-3"
              >
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-[#0D1B3E] mb-0.5">
                    {c.label}
                  </div>
                  <div className="text-[11px] text-slate-500">{c.desc}</div>
                </div>
                <div
                  className={`shrink-0 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${scoreColor(
                    c.score,
                  )}`}
                >
                  {c.score}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* Sample prompts */}
      <motion.div variants={fadeUp}>
        <SectionCard title="Historical Sample Essay Prompts" accent="#6C1F6E">
          <div className="flex flex-wrap gap-2 mb-4">
            {samplePrompts.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePrompt(i)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold border transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    activePrompt === i ? "#6C1F6E" : "rgba(108,31,110,0.07)",
                  color: activePrompt === i ? "#fff" : "#6C1F6E",
                  border: `1px solid ${
                    activePrompt === i ? "#6C1F6E" : "rgba(108,31,110,0.2)"
                  }`,
                }}
              >
                Prompt {i + 1}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePrompt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="p-4 rounded-xl bg-[#6C1F6E]/[0.05] border border-[#6C1F6E]/15"
            >
              <div className="text-[9px] font-bold tracking-wider uppercase text-[#6C1F6E] mb-2">
                Sample Prompt
              </div>
              <p className="text-[14px] font-semibold text-[#0D1B3E] leading-snug">
                {samplePrompts[activePrompt]}
              </p>
            </motion.div>
          </AnimatePresence>
        </SectionCard>
      </motion.div>
    </motion.div>
  );
}

// ── SCORING ───────────────────────────────────────────────────
function ScoringPanel() {
  const uniScoring = [
    {
      uni: "University of Oxford",
      secA: "High — primary shortlisting tool",
      secB: "High — independently scored, anonymised, used for interview selection",
      key: "Proprietary internal essay rubric.",
      color: "#0D1B3E",
    },
    {
      uni: "UCL",
      secA: "High — historical average for offer-holders: 29.4/42",
      secB: "High — excellent MCQ but poor essay routinely rejected",
      key: "Both components evaluated rigorously.",
      color: "#8B1A1A",
    },
    {
      uni: "University of Bristol",
      secA: "60% of LNAT evaluation",
      secB: "40% of LNAT evaluation",
      key: "LNAT = 40% of total UCAS evaluation.",
      color: "#B5451B",
    },
    {
      uni: "Cambridge",
      secA: "High — primary shortlisting",
      secB: "Evaluated alongside academic records",
      key: "Replaced Cambridge Law Test in 2021.",
      color: "#C9A84C",
    },
    {
      uni: "KCL & LSE",
      secA: "High emphasis",
      secB: "Moderate — less decisive than Oxford/UCL",
      key: "Distinguishes borderline candidates.",
      color: "#6C1F6E",
    },
    {
      uni: "JGLS (India)",
      secA: "Only Section A evaluated for admission",
      secB: "Disregarded unless borderline",
      key: "MCQ-only. Waives ₹13k fee from tuition.",
      color: "#154360",
    },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Score overview */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl overflow-hidden border border-[#C9A84C]/15 bg-[#0D1B3E]"
        style={{ boxShadow: "0 16px 40px rgba(13,27,62,0.2)" }}
      >
        <div className="p-6 border-b border-white/[0.06]">
          <Label text="Score Architecture" />
          <h3 className="text-white font-extrabold text-xl mb-2">
            No Universal Pass Mark
          </h3>
          <p className="text-white/50 text-[13px] leading-relaxed">
            No scaled percentile conversion or universal pass threshold exists.
            Section A produces a raw score out of 42. Section B is not scored by
            the Consortium — universities evaluate it independently.
          </p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
          {[
            {
              v: "42",
              l: "Max Section A Score",
              sub: "Raw mark, no negative marking",
            },
            { v: "29.4", l: "UCL Offer Holder Avg", sub: "Historical average" },
            {
              v: "28–32",
              l: "Competitive Target",
              sub: "For Oxford, UCL, LSE, Cambridge",
            },
          ].map((s, i) => (
            <div key={i} className="p-5">
              <div className="text-[#C9A84C] font-extrabold md:text-2xl leading-none">
                {s.v}
              </div>
              <div className="text-white text-[11px] font-bold mt-1.5">
                {s.l}
              </div>
              <div className="text-white/40 text-[10px] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AlertBox type="tip">
          Scores of 30+ are considered exceptional and well above the global
          average. Target 28–32 minimum for highly competitive applications.
        </AlertBox>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-3">
        <div className="text-[13px] font-bold text-[#0D1B3E]">
          Institutional Scoring Policies
        </div>
        {uniScoring.map((u, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-white border border-black/[0.07] shadow-sm"
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.05]"
              style={{ background: `${u.color}06` }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: u.color }}
              />
              <span className="text-[13px] font-bold text-[#0D1B3E]">
                {u.uni}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              <div>
                <div className="text-[9px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                  Section A Usage
                </div>
                <div className="text-[12px] text-[#0D1B3E] leading-relaxed">
                  {u.secA}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                  Section B Usage
                </div>
                <div className="text-[12px] text-[#0D1B3E] leading-relaxed">
                  {u.secB}
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div
                className="px-3 py-2 rounded-lg text-[11px]"
                style={{
                  background: `${u.color}08`,
                  border: `1px solid ${u.color}20`,
                }}
              >
                <span className="font-semibold" style={{ color: u.color }}>
                  Key:{" "}
                </span>
                <span className="text-gray-700">{u.key}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── LOGISTICS ─────────────────────────────────────────────────
function LogisticsPanel() {
  const deadlines = [
    {
      target: "Oxford & Cambridge",
      reg: "Sep 15 (prior year)",
      test: "Oct 15 (prior year)",
      ucas: "Oct 15 (prior year)",
      color: "#0D1B3E",
    },
    {
      target: "KCL, LSE, UCL",
      reg: "Before test date",
      test: "Dec 31 (prior year)",
      ucas: "Jan 14 (entry year)",
      color: "#8B1A1A",
    },
    {
      target: "Bristol & Durham",
      reg: "Before test date",
      test: "Jan 14 (entry year)",
      ucas: "Jan 14 (entry year)",
      color: "#B5451B",
    },
    {
      target: "Other Consortium",
      reg: "Before test date",
      test: "Late Jan (entry year)",
      ucas: "Jan 14 (entry year)",
      color: "#1A5276",
    },
    {
      target: "Late (Intl. Only)",
      reg: "Jul 25 (entry year)",
      test: "Jul 31 (entry year)",
      ucas: "Jun 30 (entry year)",
      color: "#6C1F6E",
    },
  ];

  const cities = [
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Dehradun",
    "Manipal",
    "Sonipat",
    "Jaipur",
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        <DarkChip
          icon={<MapPin size={16} />}
          label="India Test Centres"
          value="40 across India"
        />
        <DarkChip
          icon={<CreditCard size={16} />}
          label="Registration Fee"
          value="£120 (~₹13,000)"
        />
        <DarkChip
          icon={<RotateCcw size={16} />}
          label="Retake Policy"
          value="Once per cycle"
        />
        <DarkChip
          icon={<Monitor size={16} />}
          label="Test Delivery"
          value="Pearson VUE"
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <AlertBox type="info">
          JGLS reportedly deducts the £120 LNAT registration fee from first-year
          tuition for admitted students, effectively making the test free for
          Indian students joining JGLS.
        </AlertBox>
      </motion.div>

      {/* Cities */}
      <motion.div variants={fadeUp}>
        <SectionCard
          title="Indian Test Centre Cities (Major Hubs)"
          accent="#0D1B3E"
        >
          <div className="flex flex-wrap gap-2">
            {cities.map((city, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0D1B3E]/[0.05] border border-[#0D1B3E]/12"
              >
                <MapPin size={10} className="text-[#C9A84C]" />
                <span className="text-[12px] font-semibold text-[#0D1B3E]">
                  {city}
                </span>
              </div>
            ))}
            <div className="px-3 py-1 rounded-full bg-[#C9A84C]/[0.08] border border-[#C9A84C]/20">
              <span className="text-[12px] font-semibold text-[#8B6914]">
                +28 more cities
              </span>
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Test day rules */}
      <motion.div variants={fadeUp}>
        <SectionCard title="Test Day Regulations" accent="#DC2626">
          <BulletItem
            text="Personal belongings are barred from the testing room entirely."
            danger
          />
          <BulletItem
            text="Only a portable whiteboard and marker provided — no paper."
            danger
          />
          <BulletItem
            text="You may only sit LNAT once per admissions cycle (Sep 1 – Jul 31)."
            danger
          />
          <BulletItem
            text="Multiple attempts in the same cycle invalidate subsequent scores."
            danger
          />
          <BulletItem
            text="Results cannot be carried forward to future academic years."
            danger
          />
          <BulletItem text="Booking is done exclusively online via the LNAT portal — not at test centres." />
          <BulletItem text="Payment via major international credit/debit cards at time of booking." />
        </SectionCard>
      </motion.div>

      {/* Deadline table */}
      <motion.div variants={fadeUp}>
        <div className="text-[13px] font-bold text-[#0D1B3E] mb-3">
          Deadline Matrix by Target University
        </div>
        <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
          {/* Added this wrapper for horizontal scrolling on mobile */}
          <div className="w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
            {/* Forces a minimum width to prevent text cramping */}
            <div className="min-w-150">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-2 px-4 py-2.5 bg-[#0D1B3E]">
                {[
                  "Target Institution",
                  "LNAT Registration",
                  "Test Deadline",
                  "UCAS Deadline",
                ].map((h, i) => (
                  <div
                    key={i}
                    className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wide"
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {deadlines.map((d, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-4 gap-2 px-4 py-3 ${
                    i < deadlines.length - 1
                      ? "border-b border-black/5"
                      : ""
                  } ${i % 2 !== 0 ? "bg-black/1.5" : ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: d.color }}
                    />
                    <span className="text-[12px] font-bold text-[#0D1B3E]">
                      {d.target}
                    </span>
                  </div>
                  {[d.reg, d.test, d.ucas].map((v, j) => (
                    <div key={j} className="text-[11px] text-slate-500">
                      {v}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <AlertBox type="warning">
            <strong>Oct 15 is absolute for Oxford/Cambridge.</strong> Students
            who treat it as the start of their process will find it's already
            too late — preparation must begin 5+ months earlier.
          </AlertBox>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── STRATEGY ─────────────────────────────────────────────────
function StrategyPanel() {
  const resources = [
    {
      name: "LNAT Official Simulator",
      type: "Free",
      desc: "On-screen practice tests mirroring exact Pearson VUE software. Most accurate preparation available.",
      priority: "Essential",
    },
    {
      name: "LNAT Paper Practice Tests",
      type: "Free",
      desc: "Official paper-based tests from the Consortium for comprehension practice.",
      priority: "Essential",
    },
    {
      name: "LSAT Sample Questions",
      type: "Free/Paid",
      desc: "US Law School Admission Test — shorter passages but highly analogous logical reasoning. Use when LNAT materials are exhausted.",
      priority: "High",
    },
    {
      name: "The Economist",
      type: "Free/Paid",
      desc: "Dense editorial arguments across politics, economics, science. Daily active reading practice.",
      priority: "High",
    },
    {
      name: "Financial Times / Guardian",
      type: "Free/Paid",
      desc: "High-quality journalism with complex analytical content for comprehension conditioning.",
      priority: "High",
    },
    {
      name: "Critical Thinking — A. Fisher",
      type: "Book",
      desc: "Recommended by the LNAT Consortium for formal logical reasoning foundation.",
      priority: "Recommended",
    },
    {
      name: "Critical Thinking for Students — van den Brink-Budgen",
      type: "Book",
      desc: "Consortium-recommended for argument evaluation and assumption identification.",
      priority: "Recommended",
    },
    {
      name: "Thinking From A to Z — N. Warburton",
      type: "Book",
      desc: "Develops the vocabulary of logical argumentation needed for both sections.",
      priority: "Recommended",
    },
  ];

  const challenges = [
    {
      c: "Rote learning habits",
      s: "LNAT actively punishes memorisation. Shift to analysing why an argument holds, not what it says.",
    },
    {
      c: "Formulaic essay writing",
      s: "CBSE/ICSE essays follow templates. LNAT demands a clear stance, counterargument dismantling, and assumption-driven reasoning.",
    },
    {
      c: "External knowledge in MCQ",
      s: "Real-world knowledge is a trap in Section A. Practise working only from the passage text.",
    },
    {
      c: "Speed under cognitive load",
      s: "12 passages in 95 minutes = ~8 mins/passage. Practice reading dense prose at speed daily.",
    },
    {
      c: "Commercial coaching over-reliance",
      s: "The Consortium warns that third-party simulators misrepresent the interface. Prioritise official materials.",
    },
  ];

  const priorityStyle = (p: string) =>
    p === "Essential"
      ? "bg-[#C9A84C]/10 border-[#C9A84C]/30 text-[#8B6914]"
      : p === "High"
      ? "bg-[#0D1B3E]/[0.07] border-[#0D1B3E]/15 text-[#0D1B3E]"
      : "bg-black/[0.04] border-black/10 text-slate-500";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={fadeUp}>
        <AlertBox type="warning">
          The LNAT Consortium firmly disavows commercial coaching and paid
          preparatory courses. Third-party simulators often misrepresent the
          interface and create false security.
        </AlertBox>
      </motion.div>

      {/* Indian-specific challenges */}
      <motion.div variants={fadeUp}>
        <SectionCard
          title="Indian Student Cognitive Pivot Required"
          accent="#DC2626"
        >
          <div className="divide-y divide-black/[0.06]">
            {challenges.map((c, i) => (
              <div key={i} className="py-3">
                <div className="flex items-start gap-2 mb-1.5">
                  <AlertCircle
                    size={13}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <span className="text-[13px] font-bold text-[#0D1B3E]">
                    {c.c}
                  </span>
                </div>
                <div className="flex items-start gap-2 pl-5">
                  <ArrowRight
                    size={11}
                    className="text-[#C9A84C] shrink-0 mt-1"
                  />
                  <span className="text-[12px] text-gray-600 leading-relaxed">
                    {c.s}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* Active reading */}
      <motion.div variants={fadeUp}>
        <SectionCard
          title="Active Reading Method (Daily Practice)"
          accent="#C9A84C"
        >
          <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
            As you read complex editorial pieces, habitually interrogate the
            text with these three questions:
          </p>
          <div className="space-y-2.5">
            {[
              {
                q: "1. Assumptions",
                a: "What unstated premises does this argument depend on? If one were false, does the whole argument collapse?",
              },
              {
                q: "2. Evidence vs Commentary",
                a: "Which statements are empirical facts? Which are the author's personal interpretation or opinion?",
              },
              {
                q: "3. Counterargument",
                a: "How would a critic dismantle this argument? What evidence would they cite? What would your rebuttal be?",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#C9A84C]/[0.05] border border-[#C9A84C]/15"
              >
                <div className="text-[11px] font-bold text-[#8B6914] mb-1">
                  {item.q}
                </div>
                <div className="text-[12px] text-gray-700 leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </motion.div>

      {/* Resources */}
      <motion.div variants={fadeUp}>
        <div className="text-[13px] font-bold text-[#0D1B3E] mb-3">
          Preparation Resources (Priority Order)
        </div>
        <div className="space-y-2">
          {resources.map((r, i) => (
            <div
              key={i}
              className="flex gap-3 p-3.5 rounded-2xl bg-white border border-black/[0.07] shadow-sm items-start"
            >
              <div
                className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-full border text-[9px] font-bold ${priorityStyle(
                  r.priority,
                )}`}
              >
                {r.priority}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[13px] font-bold text-[#0D1B3E]">
                    {r.name}
                  </span>
                  <span className="text-[10px] text-slate-400">· {r.type}</span>
                </div>
                <div className="text-[12px] text-slate-500 leading-relaxed">
                  {r.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* JGLS advantage */}
      <motion.div variants={fadeUp}>
        <div
          className="rounded-2xl p-5 border border-[#C9A84C]/20"
          style={{
            background: "linear-gradient(135deg, #0D1B3E 0%, #162447 100%)",
          }}
        >
          <div className="flex gap-3 items-start">
            <Zap size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
            <div>
              <div className="text-[13px] font-bold text-white mb-1.5">
                Strategic Dual-Entry Advantage for Indian Students
              </div>
              <p className="text-[12px] text-white/60 leading-relaxed">
                One LNAT sitting simultaneously qualifies you for top UK law
                schools (Oxford, Cambridge, UCL, LSE) AND Jindal Global Law
                School — India's only LNAT Consortium member. JGLS also deducts
                the £120 test fee from first-year tuition. A single,
                well-prepared exam opens doors on two continents.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function LNATExamPattern() {
  const [activeTab, setActiveTab] = useState("overview");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const panels: Record<string, React.ReactNode> = {
    overview: <OverviewPanel />,
    sectionA: <SectionAPanel />,
    sectionB: <SectionBPanel />,
    scoring: <ScoringPanel />,
    logistics: <LogisticsPanel />,
    strategy: <StrategyPanel />,
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F7F3EC]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); * { font-family: 'Poppins', sans-serif; }`}</style>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
      {/* Gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {/* AEO Key Facts Semantic Table & Content Extractability (Visually Hidden) */}
        <div className="sr-only">
          <table>
            <caption>LNAT Exam Key Facts 2026</caption>
            <tbody>
              <tr>
                <th scope="row">Exam Mode</th>
                <td>Computer-Based</td>
              </tr>
              <tr>
                <th scope="row">Total Duration</th>
                <td>2 Hours 15 Mins</td>
              </tr>
              <tr>
                <th scope="row">Section A</th>
                <td>42 MCQs (95 mins)</td>
              </tr>
              <tr>
                <th scope="row">Section B</th>
                <td>1 Essay (40 mins)</td>
              </tr>
              <tr>
                <th scope="row">Registration Fee</th>
                <td>£120 (~₹13,000)</td>
              </tr>
            </tbody>
          </table>
          <article>
            <h3>Section A (Objective)</h3>
            <p>
              42 Multiple Choice Questions focusing on Analytical Reasoning over
              95 minutes.
            </p>
            <h3>Section B (Subjective)</h3>
            <p>1 Argumentative Essay chosen from 3 prompts over 40 minutes.</p>
          </article>
        </div>

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]/40" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
              Complete Exam Guide
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </div>
          <h2
            className="font-extrabold text-[#0D1B3E] tracking-tight leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            LNAT Exam Pattern —{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Everything Explained
            </span>
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-xl mx-auto text-[14px]">
            A complete, research-backed breakdown of Section A, Section B,
            scoring policies, logistics for Indian students, and preparation
            strategy.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          variants={fadeUp}
          custom={0.15}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-around gap-1.5 p-1.5 rounded-2xl mb-8 bg-white/80 backdrop-blur-sm border border-black/[0.07] shadow-md overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-none cursor-pointer whitespace-nowrap shrink-0 text-[12px] font-bold transition-all duration-250"
              style={{
                background: activeTab === tab.id ? "#0D1B3E" : "transparent",
                color: activeTab === tab.id ? "#fff" : "#64748B",
                boxShadow:
                  activeTab === tab.id
                    ? "0 4px 12px rgba(13,27,62,0.25)"
                    : "none",
              }}
            >
              <span
                style={{ color: activeTab === tab.id ? "#C9A84C" : "#94A3B8" }}
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <div className="max-w-3xl lg:max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {panels[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
