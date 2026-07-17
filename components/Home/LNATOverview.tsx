"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import {
  Brain,
  Globe,
  Pen,
  BookOpen,
  Scale,
  Lightbulb,
  TrendingUp,
  Award,
  Zap,
  Target,
  Users,
  ChevronRight,
  Star,
  MapPin,
  GraduationCap,
  Briefcase,
  Building2,
  Shield,
  Clock,
  CheckCircle,
  Compass,
  User,
  ArrowRight,
  Landmark,
  PenLine,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const poppins = "'Poppins', sans-serif";
const serif = "'Cormorant Garamond', Georgia, serif";

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="h-px w-8"
        style={{ background: "rgba(201,168,76,0.5)" }}
      />
      <span
        style={{
          fontFamily: poppins,
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C9A84C",
        }}
      >
        {text}
      </span>
      <div
        className="h-px w-8"
        style={{ background: "rgba(201,168,76,0.5)" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. HERO STATEMENT
// ─────────────────────────────────────────────────────────────

function LNATHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className="relative text-center mb-20 lg:mb-28">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 340,
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* SEO & AEO Direct Answer Block */}
      <div className="sr-only" aria-labelledby="what-is-lnat">
        <h2 id="what-is-lnat">What is the LNAT?</h2>
        <p>
          The LNAT (Law National Aptitude Test) is a 2-hour-15-minute,
          computer-based admissions test used by around ten UK universities and,
          in India, JGLS. It has two sections: 42 multiple-choice questions in
          95 minutes (this produces your score out of 42) and one 40-minute
          essay. It tests reading, reasoning and argument — not legal knowledge
          — so there's no syllabus to memorise; there's a skill to build.
        </p>
      </div>

      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex justify-center mb-5"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <Star size={10} style={{ color: "#C9A84C", fill: "#C9A84C" }} />
          <span
            style={{
              fontFamily: poppins,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            Exam Overview
          </span>
        </div>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontFamily: poppins,
          fontWeight: 800,
          fontSize: "clamp(2rem, 5vw, 3.8rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#0D1B3E",
          marginBottom: "1.5rem",
        }}
      >
        What is the{" "}
        <span
          style={{
            background:
              "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LNAT?
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        custom={0.2}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontFamily: poppins,
          fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
          color: "#64748B",
          lineHeight: 1.9,
          maxWidth: 1000,
          margin: "0 auto 2.5rem",
        }}
      >
        The LNAT (Law National Aptitude Test) is a 2-hour-15-minute,
        computer-based admissions test used by around ten UK universities and,
        in India, JGLS. It has two sections: 42 multiple-choice questions in 95
        minutes (this produces your score out of 42) and one 40-minute essay. It
        tests reading, reasoning and argument — not legal knowledge — so there's
        no syllabus to memorise; there's a skill to build.
        <br />
        <br />
        New to it?{" "}
        <a
          href="/what-is-lnat"
          className="font-medium text-[#C9A84C] hover:underline transition-all"
        >
          Start with our full guide: what is the LNAT.
        </a>
      </motion.p>

      {/* Four pillars reflecting the new content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex md:flex-wrap items-center md:justify-center gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-4 md:px-0 pb-4 md:pb-0 hide-scrollbar w-full"
      >
        {[
          { icon: <Target size={14} />, text: "42 MCQs & 1 Essay" },
          { icon: <Globe size={14} />, text: "UK Universities & JGLS" },
          { icon: <Brain size={14} />, text: "No Syllabus to Memorise" },
          { icon: <TrendingUp size={14} />, text: "Tests Reading & Reasoning" },
        ].map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0 snap-center"
            style={{
              background: "#fff",
              border: "1px solid rgba(13,27,62,0.08)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ color: "#C9A84C", flexShrink: 0 }}>{p.icon}</span>
            <span
              style={{
                fontFamily: poppins,
                fontSize: "12px",
                fontWeight: 600,
                color: "#0D1B3E",
                whiteSpace: "nowrap",
              }}
            >
              {p.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. WHAT MAKES LNAT DIFFERENT — Glass cards
// ─────────────────────────────────────────────────────────────

const differenceCards = [
  {
    icon: <Brain size={22} strokeWidth={1.5} />,
    title: "Critical Thinking Focus",
    body: "Every question tests how you reason, not what you've memorised. LNAT rewards intellectual sharpness over cramming.",
    accent: "#0D1B3E",
  },
  {
    icon: <BookOpen size={22} strokeWidth={1.5} />,
    title: "Zero Prior Legal Knowledge",
    body: "LNAT expects no background in law. Pure reasoning, comprehension, and structured argument are all you need.",
    accent: "#C9A84C",
  },
  {
    icon: <Globe size={22} strokeWidth={1.5} />,
    title: "International University Recognition",
    body: "Accepted at Oxford, Cambridge, UCL, LSE, King's and 8+ other globally ranked institutions.",
    accent: "#1A5276",
  },
  {
    icon: <Scale size={22} strokeWidth={1.5} />,
    title: "Real-World Legal Aptitude",
    body: "The skills LNAT measures directly mirror what elite law firms, courts, and policy bodies look for in graduates.",
    accent: "#6C1F6E",
  },
  {
    icon: <Pen size={22} strokeWidth={1.5} />,
    title: "Essay-Based Depth",
    body: "Section B challenges you to write a persuasive argument under time pressure — exactly what university law demands.",
    accent: "#B5451B",
  },
  {
    icon: <Zap size={22} strokeWidth={1.5} />,
    title: "Modern Skills Evaluation",
    body: "Unlike traditional entrance exams, LNAT aligns with global standards of academic and professional competence.",
    accent: "#154360",
  },
];

function DifferenceCard({
  card,
  i,
}: {
  card: (typeof differenceCards)[0];
  i: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={i * 0.07}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fff" : "rgba(255,255,255,0.7)",
        border: `1px solid ${
          hovered ? card.accent + "40" : "rgba(0,0,0,0.07)"
        }`,
        borderRadius: 18,
        padding: "1.6rem",
        cursor: "default",
        transition: "all 0.35s ease",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${card.accent}20`
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 0.06 : 0,
          background: `radial-gradient(ellipse at 30% 30%, ${card.accent}, transparent 65%)`,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: hovered
            ? `linear-gradient(90deg, ${card.accent}, transparent)`
            : "transparent",
          transition: "background 0.4s",
        }}
      />

      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${card.accent}12`,
          color: card.accent,
          marginBottom: "1rem",
          transition: "background 0.3s",
        }}
      >
        {card.icon}
      </div>
      <h4
        style={{
          fontFamily: poppins,
          fontWeight: 700,
          fontSize: 15,
          color: "#0D1B3E",
          marginBottom: 8,
        }}
      >
        {card.title}
      </h4>
      <p
        style={{
          fontFamily: poppins,
          fontSize: 13,
          color: "#64748B",
          lineHeight: 1.75,
        }}
      >
        {card.body}
      </p>
    </motion.div>
  );
}

function WhyItMattersForIndia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      {/* 1. Narrative Intro */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center md:text-start mb-12 max-w-4xl mx-auto md:mx-0"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel text="Why It Matters Now For Indian Students" />
        </motion.div>

        <motion.h3
          variants={fadeUp}
          style={{
            fontFamily: poppins,
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            color: "#0D1B3E",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          One Preparation Now Works For
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Two Elite Routes
          </span>
        </motion.h3>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: poppins,
            fontSize: 15,
            color: "#64748B",
            lineHeight: 1.8,
            maxWidth: 800,
          }}
        >
          For years the LNAT mattered only to Indian students aiming at the UK.
          That's changed. From 2026-27, JGLS made the LNAT its sole entrance
          test, replacing CLAT and LSAT-India for its LLB programmes. So the
          same preparation now works for two routes at once:
        </motion.p>
      </motion.div>

      {/* 2. The Two Routes (Cards) */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 gap-6 mb-6 pb-4 md:pb-0 w-full hide-scrollbar"
      >
        {/* Route 1: UK */}
        <motion.div
          variants={fadeUp}
          className="group relative bg-white p-8 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(13,27,62,0.08)] flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center md:snap-align-none"
          style={{ border: "1px solid rgba(13,27,62,0.08)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <Landmark size={22} style={{ color: "#C9A84C" }} />
          </div>
          <h4
            style={{
              fontFamily: poppins,
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#0D1B3E",
              marginBottom: "0.75rem",
            }}
          >
            UK law schools
          </h4>
          <p
            style={{
              fontFamily: poppins,
              fontSize: 14,
              color: "#4A5568",
              lineHeight: 1.7,
              flexGrow: 1,
              marginBottom: "1.5rem",
            }}
          >
            Oxford, Cambridge, UCL, King's, LSE, Durham, Bristol, Glasgow, SOAS.
          </p>
          <a
            href="/universities"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-[#C9A84C]"
            style={{ color: "#0D1B3E", fontFamily: poppins }}
          >
            See the full list of LNAT universities <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Route 2: JGLS */}
        <motion.div
          variants={fadeUp}
          className="group relative bg-[#0D1B3E] p-8 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(13,27,62,0.15)] flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center md:snap-align-none"
          style={{ border: "1px solid #0D1B3E" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <GraduationCap size={22} style={{ color: "#C9A84C" }} />
          </div>
          <h4
            style={{
              fontFamily: poppins,
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            JGLS (India)
          </h4>
          <p
            style={{
              fontFamily: poppins,
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              flexGrow: 1,
              marginBottom: "1.5rem",
            }}
          >
            The LNAT is now mandatory, and only your Section A score is used.
          </p>
          <a
            href="/topics/lnat-india"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] transition-colors hover:text-[#E8C96A]"
            style={{ fontFamily: poppins }}
          >
            More on the LNAT in India <ArrowRight size={14} />
          </a>
        </motion.div>
      </motion.div>

      {/* 3. Logistics Bottom Bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        style={{
          background:
            "linear-gradient(to right, rgba(201,168,76,0.05), rgba(201,168,76,0.02))",
          border: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-[#C9A84C]/20 flex items-center justify-center">
          <MapPin size={18} style={{ color: "#C9A84C" }} />
        </div>
        <p
          style={{
            fontFamily: poppins,
            fontSize: 14,
            color: "#374151",
            lineHeight: 1.7,
          }}
        >
          You sit the test at one of{" "}
          <strong>40+ Pearson VUE centres across India</strong> — Delhi, Mumbai,
          Bengaluru, Chennai, Hyderabad, Pune — for about{" "}
          <strong>£120 (~₹13,000)</strong>.
        </p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. WHY STUDENTS CHOOSE LNAT — Editorial comparison
// ─────────────────────────────────────────────────────────────
function WhyStudentsChoose() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const reasons = [
    {
      icon: <MapPin size={24} />,
      label: "India-Specific Strategy",
      sub: "We coach for your reality — CBSE/ISC/IB backgrounds, the JGLS route, Indian test centres, INR fees, and the UCAS steps Indian applicants get wrong[cite: 1].",
    },
    {
      icon: <Brain size={24} />,
      label: "Proper Skill-Building",
      sub: "Because the LNAT can't be crammed, we train the underlying abilities — argument analysis, inference, timed essay writing — rather than handing you facts to memorise[cite: 1].",
    },
    {
      icon: <Target size={24} />,
      label: "Accurate to the Current Test",
      sub: "We teach the LNAT as it is today (four answer options per question, two sections, the 2027 cycle), not outdated material[cite: 1].",
    },
    {
      icon: <Compass size={24} />,
      label: "The Full Journey",
      sub: "Registration, deadlines, university targeting and application support are part of the plan, not an afterthought[cite: 1].",
    },
  ];

  return (
    <div
      ref={ref}
      className="mb-20 lg:mb-28 max-w-full overflow-hidden md:overflow-visible"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center text-center md:text-start">
        {/* Left: editorial text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          // FIX: Added min-w-0 and w-full to prevent grid blowout
          className="max-w-full min-w-0 w-full"
        >
          <motion.div
            variants={fadeUp}
            className="flex justify-center md:justify-start"
          >
            <SectionLabel text="Built around LNAT" />
          </motion.div>

          <motion.h3
            variants={fadeUp}
            style={{
              fontFamily: poppins,
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
              color: "#0D1B3E",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            Why{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LNAT Exam India
            </span>
          </motion.h3>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: poppins,
              fontSize: 14,
              color: "#64748B",
              lineHeight: 1.9,
              marginBottom: "1.5rem",
            }}
            className="px-4 md:px-0"
          >
            We're not a general law-entrance institute that added an LNAT
            module. The LNAT is the whole point of what we do, and that focus
            shows up in the coaching.
          </motion.p>

          {/* Real Differentiators: Interactive Premium Pills */}
          <motion.div
            variants={fadeUp}
            // Minor fix: removed 'w-full max-w-full' to prevent horizontal padding from breaking the width
            className="flex md:flex-wrap items-center md:justify-start gap-3 mt-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 hide-scrollbar px-4 md:px-0"
          >
            {[
              { text: "1 To 1 Sessions", icon: <User size={14} /> },
              {
                text: "Mentor: Mr. Alastair Murray",
                icon: <Award size={14} />,
              },
              { text: "Small Batches", icon: <Users size={14} /> },
            ].map((pill, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer bg-white border border-[#C9A84C]/30 hover:border-[#0D1B3E] hover:bg-[#0D1B3E] hover:shadow-[0_4px_14px_rgba(13,27,62,0.15)] transition-all duration-300 flex-shrink-0 snap-center"
              >
                <span className="text-[#C9A84C] group-hover:text-[#E8C96A] transition-colors duration-300 flex-shrink-0">
                  {pill.icon}
                </span>
                <span
                  style={{ fontFamily: poppins, whiteSpace: "nowrap" }}
                  className="text-[12px] font-semibold text-[#0D1B3E] group-hover:text-white transition-colors duration-300"
                >
                  {pill.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: stat grid adapted for feature cards (Horizontally scrollable on mobile) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-6 sm:pb-0 w-full max-w-full hide-scrollbar px-4 md:px-0"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.08}
              className="flex flex-col justify-center flex-shrink-0 w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none snap-center sm:snap-align-none text-left sm:text-center md:text-left"
              style={{
                borderRadius: 16,
                padding: "1.5rem",
                background: i % 2 === 0 ? "#0D1B3E" : "rgba(201,168,76,0.08)",
                border: i % 2 === 0 ? "none" : "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <div
                style={{
                  color: i % 2 === 0 ? "#C9A84C" : "#0D1B3E",
                  marginBottom: 12,
                }}
              >
                {r.icon}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontWeight: 700,
                  fontSize: 14,
                  color: i % 2 === 0 ? "#fff" : "#0D1B3E",
                  marginBottom: 8,
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 12,
                  color: i % 2 === 0 ? "rgba(255,255,255,0.65)" : "#64748B",
                  lineHeight: 1.6,
                }}
              >
                {r.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. WHERE CAN LNAT TAKE YOU — Opportunity showcase
// ─────────────────────────────────────────────────────────────

const opportunities = [
  {
    icon: <GraduationCap size={20} strokeWidth={1.5} />,
    title: "World-Class Universities",
    items: ["Oxford", "Cambridge", "UCL", "LSE", "King's College"],
    accent: "#0D1B3E",
  },
  {
    icon: <Briefcase size={20} strokeWidth={1.5} />,
    title: "Corporate Law",
    items: [
      "Magic Circle firms",
      "Wall Street firms",
      "In-house counsel",
      "M&A practice",
    ],
    accent: "#C9A84C",
  },
  {
    icon: <Globe size={20} strokeWidth={1.5} />,
    title: "International Law",
    items: [
      "UN & ICC practice",
      "Trade law",
      "Treaty negotiation",
      "Diplomacy",
    ],
    accent: "#1A5276",
  },
  {
    icon: <Shield size={20} strokeWidth={1.5} />,
    title: "Human Rights Law",
    items: [
      "NGO legal teams",
      "UNHCR",
      "Public interest law",
      "Justice systems",
    ],
    accent: "#6C1F6E",
  },
  {
    icon: <Building2 size={20} strokeWidth={1.5} />,
    title: "Public Policy",
    items: [
      "Govt. legal advisory",
      "Policy think-tanks",
      "Legislative drafting",
      "Regulatory bodies",
    ],
    accent: "#B5451B",
  },
  {
    icon: <Award size={20} strokeWidth={1.5} />,
    title: "Academic & Research",
    items: [
      "Law professorships",
      "Legal research",
      "Judicial clerkships",
      "Scholarships",
    ],
    accent: "#154360",
  },
];

function OpportunitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [active, setActive] = useState(0);

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <SectionLabel text="Where LNAT Takes You" />
        <h3
          style={{
            fontFamily: poppins,
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            color: "#0D1B3E",
            letterSpacing: "-0.025em",
          }}
        >
          One Exam.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Unlimited Destinations.
          </span>
        </h3>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: tab list */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-3"
        >
          {opportunities.map((opp, i) => (
            <motion.button
              key={i}
              variants={fadeUp}
              custom={i * 0.07}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "1rem 1.25rem",
                borderRadius: 14,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                background: active === i ? "#0D1B3E" : "#fff",
                border: active === i ? "none" : "1px solid rgba(0,0,0,0.07)",
                boxShadow:
                  active === i
                    ? "0 8px 24px rgba(13,27,62,0.2)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background:
                    active === i ? "rgba(201,168,76,0.15)" : `${opp.accent}10`,
                  color: active === i ? "#C9A84C" : opp.accent,
                  transition: "all 0.3s",
                }}
              >
                {opp.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: poppins,
                    fontWeight: 700,
                    fontSize: 14,
                    color: active === i ? "#fff" : "#0D1B3E",
                  }}
                >
                  {opp.title}
                </div>
                <div
                  style={{
                    fontFamily: poppins,
                    fontSize: 11,
                    color: active === i ? "rgba(255,255,255,0.5)" : "#94A3B8",
                    marginTop: 2,
                  }}
                >
                  {opp.items.slice(0, 2).join(" · ")}
                </div>
              </div>
              <ChevronRight
                size={14}
                style={{
                  color: active === i ? "#C9A84C" : "#CBD5E1",
                  transition: "color 0.3s",
                }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Right: detail panel */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0.3}
          className="sticky top-28"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: "#0D1B3E",
                boxShadow: "0 24px 64px rgba(13,27,62,0.25)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "2rem 2rem 1.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  background: `linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)`,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(201,168,76,0.12)",
                    color: "#C9A84C",
                    marginBottom: 14,
                  }}
                >
                  {opportunities[active].icon}
                </div>
                <h4
                  style={{
                    fontFamily: poppins,
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  {opportunities[active].title}
                </h4>
                <p
                  style={{
                    fontFamily: poppins,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  Clearing LNAT positions you directly for opportunities in this
                  field through elite university networks.
                </p>
              </div>
              {/* Items */}
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                <div
                  style={{
                    fontFamily: poppins,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: 12,
                  }}
                >
                  Career Paths
                </div>
                <div className="flex flex-col gap-2.5">
                  {opportunities[active].items.map((item, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#C9A84C",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: poppins,
                          fontSize: 14,
                          color: "rgba(255,255,255,0.8)",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. EXAM SNAPSHOT — Sleek horizontal strip
// ─────────────────────────────────────────────────────────────

function ExamSnapshot() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const specs = [
    {
      icon: <BookOpen size={18} strokeWidth={1.5} />,
      label: "Section A",
      value: "MCQ Aptitude",
      sub: "32 questions · 95 min",
    },
    {
      icon: <Pen size={18} strokeWidth={1.5} />,
      label: "Section B",
      value: "Essay Writing",
      sub: "1 essay · 40 min",
    },
    {
      icon: <Clock size={18} strokeWidth={1.5} />,
      label: "Total Duration",
      value: "2h 15 mins",
      sub: "Computer-based exam",
    },
    {
      icon: <Target size={18} strokeWidth={1.5} />,
      label: "No Prior Knowledge",
      value: "Aptitude Only",
      sub: "Reasoning & interpretation",
    },
    {
      icon: <MapPin size={18} strokeWidth={1.5} />,
      label: "Test Centres",
      value: "India-wide",
      sub: "Multiple cities available",
    },
    {
      icon: <CheckCircle size={18} strokeWidth={1.5} />,
      label: "Validity",
      value: "1 Application Cycle",
      sub: "Retake allowed annually",
    },
  ];

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      {/* Dark banner */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          borderRadius: 20,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)",
          border: "1px solid rgba(201,168,76,0.15)",
          boxShadow: "0 20px 60px rgba(13,27,62,0.2)",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            padding: "1.75rem 2rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background:
              "linear-gradient(90deg, rgba(201,168,76,0.07) 0%, transparent 60%)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#C9A84C",
                }}
              />
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                LNAT Exam Snapshot
              </span>
            </div>
            <h4
              style={{
                fontFamily: poppins,
                fontWeight: 800,
                fontSize: 20,
                color: "#fff",
              }}
            >
              Everything You Need to Know
            </h4>
          </div>
          <div
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: 50,
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            <span
              style={{
                fontFamily: poppins,
                fontSize: 12,
                fontWeight: 700,
                color: "#C9A84C",
              }}
            >
              2026 Admissions
            </span>
          </div>
        </div>

        {/* Spec grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          style={{ borderTop: "none" }}
        >
          {specs.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.06}
              style={{
                padding: "1.5rem 1.25rem",
                borderRight:
                  i < specs.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                borderBottom:
                  i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{ color: "#C9A84C", marginBottom: 10 }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 10,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 4,
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.5,
                }}
              >
                {s.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. SKILLS VISUALIZATION — Animated card orbit
// ─────────────────────────────────────────────────────────────

const skills = [
  {
    label: "Critical Thinking",
    icon: <Brain size={16} />,
    pct: 95,
    color: "#0D1B3E",
  },
  {
    label: "Analytical Reasoning",
    icon: <Lightbulb size={16} />,
    pct: 90,
    color: "#C9A84C",
  },
  {
    label: "Structured Writing",
    icon: <Pen size={16} />,
    pct: 85,
    color: "#1A5276",
  },
  {
    label: "Reading Comprehension",
    icon: <BookOpen size={16} />,
    pct: 88,
    color: "#6C1F6E",
  },
  {
    label: "Argument Evaluation",
    icon: <Scale size={16} />,
    pct: 92,
    color: "#B5451B",
  },
  {
    label: "Decision Making",
    icon: <Target size={16} />,
    pct: 87,
    color: "#154360",
  },
];

function SkillBar({
  skill,
  inView,
}: {
  skill: (typeof skills)[0];
  inView: boolean;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: skill.color }}>{skill.icon}</span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 13,
              fontWeight: 600,
              color: "#0D1B3E",
            }}
          >
            {skill.label}
          </span>
        </div>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 12,
            fontWeight: 700,
            color: skill.color,
          }}
        >
          {skill.pct}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 99,
          background: "rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.pct}%` : 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            borderRadius: 99,
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
          }}
        />
      </div>
    </div>
  );
}

function SkillVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center md:text-start"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel text="Skills LNAT Develops" />
          </motion.div>
          <motion.h3
            variants={fadeUp}
            style={{
              fontFamily: poppins,
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
              color: "#0D1B3E",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            What are the six core competencies
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              tested by the LNAT?
            </span>
          </motion.h3>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: poppins,
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            Every component of LNAT preparation directly builds the cognitive
            toolkit you&apos;ll use throughout your legal career — not just to pass
            an exam.
          </motion.p>
          <motion.div variants={fadeUp}>
            {skills.map((s, i) => (
              <SkillBar key={i} skill={s} inView={inView} />
            ))}
          </motion.div>
        </motion.div>

        {/* Right: hexagonal skill cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4"
        >
          {skills.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.07}
              style={{
                borderRadius: 16,
                padding: "1.25rem",
                textAlign: "center",
                background: i === 0 ? "#0D1B3E" : "#fff",
                border: i !== 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
                boxShadow:
                  i === 0
                    ? "0 8px 24px rgba(13,27,62,0.15)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    i === 0 ? "rgba(201,168,76,0.15)" : `${s.color}10`,
                  color: i === 0 ? "#C9A84C" : s.color,
                  margin: "0 auto 10px",
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontWeight: 700,
                  fontSize: 12,
                  color: i === 0 ? "#fff" : "#0D1B3E",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 11,
                  color: i === 0 ? "rgba(255,255,255,0.45)" : "#94A3B8",
                  marginTop: 4,
                }}
              >
                {s.pct}% focus
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. JOURNEY ROADMAP — Cinematic timeline
// ─────────────────────────────────────────────────────────────

interface LNATJourneyProps {
  setIsOpen: (val: boolean) => void;
}

const journey = [
  {
    step: "01",
    title: "Diagnostic",
    body: "A baseline assessment of your reading, reasoning and essay writing, and a target set against your chosen universities[cite: 1].",
    icon: <Target size={20} />,
  },
  {
    step: "02",
    title: "Skills",
    body: "Structured work on Section A question types and Section B essay technique, with worked examples[cite: 1].",
    icon: <BookOpen size={20} />,
  },
  {
    step: "03",
    title: "Timed Practice",
    body: "Full-length, exam-condition mocks with detailed feedback to build accuracy and pacing[cite: 1].",
    icon: <Clock size={20} />,
  },
  {
    step: "04",
    title: "Essay Coaching",
    body: "Individual feedback on timed essays to sharpen argument and structure[cite: 1].",
    icon: <PenLine size={20} />,
  },
  {
    step: "05",
    title: "Application Support",
    body: "Registration, deadlines and university strategy so your score lands where it counts[cite: 1].",
    icon: <GraduationCap size={20} />,
  },
];

// Reusable Card Content Component with Light Theme
const CardContent = ({ step }: { step: any }) => (
  <div className="flex flex-col text-left">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-[#0D1B3E] flex items-center justify-center text-[#C9A84C] shadow-sm flex-shrink-0">
        {step.icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
        Phase {step.step}
      </span>
    </div>
    <h4 className="text-xl font-serif font-bold text-[#0D1B3E] mb-2 leading-tight">
      {step.title}
    </h4>
    <p className="text-sm text-slate-600 font-light leading-relaxed">
      {step.body}
    </p>
  </div>
);

function LNATJourney({ setIsOpen }: LNATJourneyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Separate states for Desktop (hover) and Mobile (click)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [clickedStep, setClickedStep] = useState<number>(0);

  return (
    <div ref={ref} className="mb-10 lg:mb-0 overflow-hidden">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
            Your LNAT Journey
          </span>
        </div>
        <h3
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0D1B3E] leading-tight max-w-3xl mx-auto"
          style={{ letterSpacing: "-0.025em" }}
        >
          How does the LNAT pathway{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            lead to a global law career?
          </span>
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full relative"
      >
        {/* MOBILE ONLY: Centralized Card Display Area (Decoupled from scroll) */}
        <div className="md:hidden w-full max-w-sm mx-auto px-4 min-h-[220px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={clickedStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full bg-white rounded-xl p-6 shadow-[0_12px_40px_rgba(13,27,62,0.1)] border border-slate-200"
            >
              <CardContent step={journey[clickedStep]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scrollable Timeline */}
        <div className="w-full overflow-x-auto pb-8 pt-4 md:pt-60 md:pb-12 px-6 sm:px-12 hide-scrollbar">
          <div className="relative min-w-[700px] md:min-w-[900px] flex justify-between items-center mx-auto max-w-5xl">
            {/* Solid Connecting Line */}
            <div className="absolute left-[24px] right-[24px] h-[2px] top-1/2 -translate-y-1/2 z-0 bg-[#C9A84C]/40 pointer-events-none" />

            {/* Steps */}
            {journey.map((step, index) => {
              const isMobileActive = clickedStep === index;
              const isDesktopActive = hoveredStep === index;
              const isFirst = index === 0;
              const isLast = index === journey.length - 1;

              // Tailor class names cleanly to override mobile styles with desktop hover rules
              let nodeClasses =
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-lg ";

              // Mobile base rules
              if (isMobileActive) {
                nodeClasses +=
                  "bg-[#0D1B3E] border-[#C9A84C] scale-110 text-[#C9A84C] ";
              } else {
                nodeClasses += "bg-white border-slate-200 text-slate-400 ";
              }

              // Desktop override rules
              if (isDesktopActive) {
                nodeClasses +=
                  "md:bg-[#0D1B3E] md:border-[#C9A84C] md:scale-110 md:text-[#C9A84C] md:shadow-[0_0_20px_rgba(201,168,76,0.3)] ";
              } else {
                nodeClasses +=
                  "md:bg-white md:border-slate-200 md:text-slate-400 md:scale-100 md:hover:border-[#C9A84C]/50 md:hover:text-[#C9A84C] md:shadow-lg ";
              }

              return (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setClickedStep(index)}
                >
                  {/* Step Node */}
                  <div className={nodeClasses}>
                    <span className="text-sm font-bold tracking-wider">
                      {step.step}
                    </span>
                  </div>

                  {/* DESKTOP ONLY: Hover Popover Card */}
                  <AnimatePresence>
                    {isDesktopActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`hidden md:block absolute bottom-20 w-72 bg-white rounded-xl p-6 shadow-[0_20px_50px_rgba(13,27,62,0.15)] border border-slate-200 z-20 pointer-events-none ${
                          isFirst
                            ? "left-0"
                            : isLast
                            ? "right-0"
                            : "left-1/2 -translate-x-1/2"
                        }`}
                      >
                        {/* Downward pointing triangle/caret */}
                        <div
                          className={`absolute -bottom-2 w-4 h-4 bg-white border-b border-r border-slate-200 transform rotate-45 ${
                            isFirst
                              ? "left-[16px]"
                              : isLast
                              ? "right-[16px]"
                              : "left-1/2 -translate-x-1/2"
                          }`}
                        />
                        <CardContent step={step} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 flex justify-center"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="
            group relative overflow-hidden rounded-sm
            border border-[#C9A84C]/40
            bg-[#0D1B3E] px-8 py-3.5
            text-sm font-medium text-white
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#C9A84C]
            hover:shadow-[0_10px_20px_rgba(13,27,62,0.15)]
          "
        >
          <span
            className="
            absolute inset-0 -translate-x-full
            bg-gradient-to-r from-transparent via-white/10 to-transparent
            transition-transform duration-700
            group-hover:translate-x-full
          "
          />
          <span className="relative flex items-center gap-2 tracking-wide">
            Get Full Guidance
            <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#C9A84C]">
              →
            </span>
          </span>
        </button>
      </motion.div>

      {/* CSS to hide scrollbar for horizontal scroll area */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────

export default function LNATOverview() {
  const[isOpen, setIsOpen] = useState(false);;
  return (
    <>
      <EnquiryPopupForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="home-hero"
      />
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "#FDFBF7" }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@300;400;500&display=swap');
      `}</style>

        {/* Dot grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(13,27,62,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Gold ambient top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 900,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py- relative z-10">
          <LNATHero />
          <WhyItMattersForIndia />
          <WhyStudentsChoose />
          <ExamSnapshot />
          <SkillVisualization />
          <LNATJourney setIsOpen={() => setIsOpen(true)} />
        </div>
      </section>
    </>
  );
}
