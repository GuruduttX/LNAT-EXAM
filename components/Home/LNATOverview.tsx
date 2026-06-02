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
  ArrowRight,
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

      {/* SEO & AEO Direct Answer Block - Visually hidden but extractable */}
      <div className="sr-only" aria-labelledby="what-is-lnat">
        <h2 id="what-is-lnat">What is the LNAT?</h2>
        <p>
          The Law National Aptitude Test (LNAT) is a 2-hour and 15-minute
          computer-based admissions assessment required by top UK universities.
          It evaluates critical reasoning and analytical thinking through 42
          multiple-choice questions (Section A) and a 40-minute argumentative
          essay (Section B), requiring no prior legal knowledge.
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
            A Smarter Path to Global Law
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
        Less Competition.{" "}
        <span
          style={{
            background:
              "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Bigger Opportunities.
        </span>
        <br />
        <span style={{ fontWeight: 300, color: "#4A5568", fontSize: "0.65em" }}>
          LNAT Opens Doors to Global Law Schools.
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
          maxWidth: 600,
          margin: "0 auto 2.5rem",
        }}
      >
        LNAT evaluates reasoning and analytical thinking — not rote learning.
        Accepted by the world&apos;s top law universities, it gives Indian students a
        genuinely differentiated, globally recognised path.
      </motion.p>

      {/* Three pillars */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-wrap justify-center gap-3"
      >
        {[
          { icon: <Brain size={14} />, text: "Critical Thinking" },
          { icon: <Globe size={14} />, text: "Global Recognition" },
          { icon: <Target size={14} />, text: "No Legal Knowledge Needed" },
          { icon: <TrendingUp size={14} />, text: "Elite University Access" },
        ].map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "#fff",
              border: "1px solid rgba(13,27,62,0.08)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ color: "#C9A84C" }}>{p.icon}</span>
            <span
              style={{
                fontFamily: poppins,
                fontSize: "12px",
                fontWeight: 600,
                color: "#0D1B3E",
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

function WhyLNATDifferent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <SectionLabel text="What Makes LNAT Different" />
        <h3
          style={{
            fontFamily: poppins,
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            color: "#0D1B3E",
            letterSpacing: "-0.025em",
          }}
        >
          Built for the Way Great
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Legal Minds Actually Think
          </span>
        </h3>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {differenceCards.map((card, i) => (
          <DifferenceCard key={i} card={card} i={i} />
        ))}
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
      stat: "12x",
      label: "Less competition",
      sub: "vs. major domestic law entrances with 200k+ applicants",
    },
    {
      stat: "40+",
      label: "Countries represented",
      sub: "in LNAT test centres worldwide — you belong globally",
    },
    {
      stat: "28/42",
      label: "Avg. qualifying score",
      sub: "achievable with the right preparation strategy",
    },
    {
      stat: "TOP 10",
      label: "Law Universites",
      sub: "LNAT is accepted by top 10 law schools",
    },
  ];

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center text-center md:text-start">
        {/* Left: editorial text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel text="Why Students Choose LNAT" />
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
            Why LNAT is a More Focused,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Globally Aligned Pathway.
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
          >
            Traditional law entrances are designed for domestic legal systems.
            LNAT is designed for global legal thinking. Less noise. More signal.
            A pathway that genuinely differentiates Indian students on the world
            stage.
          </motion.p>
          {[
            "No rote learning — pure analytical edge",
            "International peer cohort, not just domestic",
            "Directly valued by Oxford & Cambridge admissions",
            "Opens doors that traditional routes simply can't",
          ].map((pt, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-3 mb-2.5 text-start"
            >
              <CheckCircle
                size={14}
                style={{ color: "#C9A84C", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 13,
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                {pt}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: stat grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.08}
              style={{
                borderRadius: 16,
                padding: "1.5rem",
                background: i % 2 === 0 ? "#0D1B3E" : "rgba(201,168,76,0.08)",
                border: i % 2 === 0 ? "none" : "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: poppins,
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: i % 2 === 0 ? "#C9A84C" : "#0D1B3E",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {r.stat}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontWeight: 700,
                  fontSize: 13,
                  color: i % 2 === 0 ? "#fff" : "#0D1B3E",
                  marginBottom: 4,
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 11,
                  color: i % 2 === 0 ? "rgba(255,255,255,0.55)" : "#94A3B8",
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

const journey = [
  {
    step: "01",
    title: "Discover LNAT",
    body: "Understand the exam structure, accepted universities, and what sets LNAT apart from domestic law entrances.",
    icon: <Lightbulb size={18} strokeWidth={1.5} />,
  },
  {
    step: "02",
    title: "Prepare Strategically",
    body: "Build analytical reasoning, critical thinking, and essay writing skills through structured preparation.",
    icon: <Brain size={18} strokeWidth={1.5} />,
  },
  {
    step: "03",
    title: "Take the Exam",
    body: "Sit the computer-based LNAT at an approved centre. 2h 15 mins. One chance to show your potential.",
    icon: <Target size={18} strokeWidth={1.5} />,
  },
  {
    step: "04",
    title: "Apply to Universities",
    body: "Submit UCAS applications to your chosen law schools — Oxford, Cambridge, UCL, LSE and beyond.",
    icon: <GraduationCap size={18} strokeWidth={1.5} />,
  },
  {
    step: "05",
    title: "Receive Offers",
    body: "Interview at top universities. Receive conditional and unconditional offers to study law globally.",
    icon: <Award size={18} strokeWidth={1.5} />,
  },
  {
    step: "06",
    title: "Begin Your Career",
    body: "Graduate from a world-ranked law school. Enter corporate law, international practice, or public service.",
    icon: <Star size={18} strokeWidth={1.5} />,
  },
];
interface LNATJourneyprops {
  setIsOpen: (isOpen: boolean) => void;
}
function LNATJourney({ setIsOpen }: LNATJourneyprops) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <SectionLabel text="Your LNAT Journey" />
        <h3
          style={{
            fontFamily: poppins,
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            color: "#0D1B3E",
            letterSpacing: "-0.025em",
          }}
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

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connector line (desktop) */}
        <div
          className="hidden lg:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 15%, rgba(201,168,76,0.3) 85%, transparent)",
          }}
        />

        <div className="flex flex-col gap-6 lg:gap-0">
          {journey.map((step, i) => {
            const isRight = i % 2 !== 0;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 ${
                  isRight ? "lg:flex-row-reverse" : ""
                }`}
                style={{ marginBottom: i < journey.length - 1 ? "0.5rem" : 0 }}
              >
                {/* Card */}
                <div
                  className={`w-full lg:w-[45%] ${
                    isRight ? "lg:pl-12" : "lg:pr-12"
                  }`}
                >
                  <div
                    style={{
                      borderRadius: 16,
                      padding: "1.5rem",
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.07)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "rgba(13,27,62,0.06)",
                          color: "#0D1B3E",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {step.icon}
                      </div>
                      <span
                        style={{
                          fontFamily: poppins,
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#C9A84C",
                          letterSpacing: "0.1em",
                        }}
                      >
                        STEP {step.step}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontFamily: poppins,
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#0D1B3E",
                        marginBottom: 6,
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: poppins,
                        fontSize: 12,
                        color: "#64748B",
                        lineHeight: 1.75,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>

                {/* Centre dot */}
                <div className="hidden lg:flex w-[10%] items-center justify-center">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#0D1B3E",
                      border: "3px solid rgba(201,168,76,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 4px rgba(201,168,76,0.1)",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: poppins,
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#C9A84C",
                      }}
                    >
                      {step.step}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="
          group relative overflow-hidden rounded-lg
          border border-[#C9A227]/40
          bg-[#0B1F3A] px-5 py-2.5
          text-sm font-medium text-white
          transition-all duration-300
          hover:-translate-y-0.5
          hover:border-[#C9A227]
          hover:bg-[#13294B] block mx-auto
          mt-10
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

        <span className="relative flex items-center gap-2">
          Get Full Guidance
          <span
            className="
              transition-transform duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </span>
      </button>
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

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 relative z-10">
          <LNATHero />
          <WhyLNATDifferent />
          <WhyStudentsChoose />
          <ExamSnapshot />
          <SkillVisualization />
          <LNATJourney setIsOpen={() => setIsOpen(true)} />
        </div>
      </section>
    </>
  );
}
