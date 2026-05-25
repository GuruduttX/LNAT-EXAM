"use client";

import React from "react";
import {  motion, TargetAndTransition, Variants } from "framer-motion";
import {
  MapPin,
  Award,
  Scale,
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

// --------------------------------------------------
// TYPES (As specified)
// --------------------------------------------------
export interface UniversityHerouniversity {
  basicInfo: {
    name: string;
    logo: string;
    location: string;
    established: string;
  };
  academics: {
    globalRanking: string;
    ukLawRanking: string;
    teachingStyle: string;
  };
  overview: {
    shortIntro: string;
    whyChoose: string[];
  };
  lnat: {
    required: boolean;
    averageScore: string;
    considersEssay: boolean;
  };
  admissions: {
    competitiveness: string;
    interviewRequired: boolean;
  };
  finance: {
    tuitionFee: string;
  };
  studentLife: {
    internationalStudentPercentage: string;
    societies: string[];
    cityType: string;
  };
  timeline: {
    applicationOpens: string;
    lnatDeadline: string;
    finalDeadline: string;
    interviewPeriod?: string;
  };
  career: {
    topRecruiters: string[];
    averageGraduateSalary: string;
  };
  ui: {
    eliteUniversity: boolean;
    highlightTag: string;
  };
  media: {
    heroImage: string;
    gallery: {
      campus: string[];
      academics: string[];
      studentLife: string[];
      city: string[];
    };
  };
}

// --------------------------------------------------
// MOCK university (For demonstration)
// --------------------------------------------------
const mockuniversity: UniversityHerouniversity = {
  basicInfo: {
    name: "University of Oxford",
    logo: "OX",
    location: "Oxford, United Kingdom",
    established: "1096",
  },
  academics: {
    globalRanking: "#1 Globally",
    ukLawRanking: "#1 UK Law",
    teachingStyle: "Tutorial Based",
  },
  overview: {
    shortIntro:
      "Join a legacy of legal excellence. The Faculty of Law is one of the largest in the United Kingdom, offering an intellectually demanding curriculum rooted in the unique tutorial system, forging the world's leading legal minds.",
    whyChoose: ["World-class faculty", "Unparalleled alumni network"],
  },
  lnat: {
    required: true,
    averageScore: "29+",
    considersEssay: true,
  },
  admissions: {
    competitiveness: "Highly Competitive (12%)",
    interviewRequired: true,
  },
  finance: {
    tuitionFee: "£38,540 / yr (Intl)",
  },
  studentLife: {
    internationalStudentPercentage: "45%",
    societies: ["Oxford Law Society", "Mooting Society"],
    cityType: "Historic University City",
  },
  timeline: {
    applicationOpens: "Sept 5",
    lnatDeadline: "Oct 15",
    finalDeadline: "Oct 15",
    interviewPeriod: "December",
  },
  career: {
    topRecruiters: ["Magic Circle", "Silver Circle", "Global Elite"],
    averageGraduateSalary: "£65,000+",
  },
  ui: {
    eliteUniversity: true,
    highlightTag: "Russell Group",
  },
  media: {
    heroImage:
      "https://images.unsplash.com/photo-1513686863615-5e0f769024f9?q=80&w=2000&auto=format&fit=crop",
    gallery: {
      campus: [
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585255474320-b0da31ab0056?q=80&w=400&auto=format&fit=crop",
      ],
      academics: [],
      studentLife: [],
      city: [],
    },
  },
};

// --------------------------------------------------
// ANIMATION VARIANTS
// --------------------------------------------------
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const floatAnimation: TargetAndTransition = {
  y: [0, -8, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------
export default function UniversityHero({
  university = mockuniversity,
}: {
  university?: UniversityHerouniversity;
}) {
  return (
    <section className="relative w-full min-h-screen bg-[#0D1B3E] text-[#F7F3EC] overflow-hidden selection:bg-[#C9A84C] selection:text-[#0D1B3E]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#C9A84C]/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#C9A84C]/5 blur-[120px]" />
      </div>

      <div className="max-w-350 mx-auto px-6 py-16 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10 min-h-[90vh] items-center">
        {/* MOBILE: VISUAL FIRST | DESKTOP: RIGHT COLUMN */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-125 lg:h-200 w-full rounded-4xl overflow-hidden">
          {/* Main Cinematic Image */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <div className="absolute inset-0 bg-[#0D1B3E]/30 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0D1B3E] via-transparent to-transparent opacity-80 z-10" />
            <img
              src={university.media.heroImage}
              alt={`${university.basicInfo.name} campus`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Card: LNAT Insight */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-8 right-8 z-20"
          >
            <motion.div
              animate={floatAnimation}
              className="bg-[#0D1B3E]/80 backdrop-blur-md border border-[#C9A84C]/20 p-5 rounded-2xl shadow-2xl max-w-55"
            >
              <div className="flex items-center space-x-3 mb-2">
                <ShieldAlert className="w-5 h-5 text-[#C9A84C]" />
                <span className="font-serif text-sm tracking-wide text-[#C9A84C] uppercase">
                  LNAT Crucial
                </span>
              </div>
              <p className="text-xs text-[#F7F3EC]/80 leading-relaxed font-sans">
                Average successful applicant score is{" "}
                <strong className="text-[#F7F3EC]">
                  {university.lnat.averageScore}
                </strong>
                . Essay rigorously assessed by tutors.
              </p>
            </motion.div>
          </motion.div>

          {/* Floating Card: Career */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-16 left-8 z-20 hidden md:block"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
                transition: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="bg-[#0D1B3E]/80 backdrop-blur-md border border-[#C9A84C]/20 p-5 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-1">
                <Briefcase className="w-4 h-4 text-[#C9A84C]" />
                <span className="font-serif text-sm text-[#F7F3EC]">
                  Top Recruiters
                </span>
              </div>
              <p className="text-xs text-[#F7F3EC]/70 font-sans mt-1">
                {university.career.topRecruiters.join(" • ")}
              </p>
            </motion.div>
          </motion.div>

          {/* Small Preview Gallery Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="absolute bottom-8 right-8 z-20 flex space-x-3"
          >
            {university.media.gallery.campus.slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="w-16 h-20 rounded-lg overflow-hidden border border-[#F7F3EC]/10 shadow-lg group cursor-pointer"
              >
                <img
                  src={img}
                  alt="Campus preview"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* MOBILE: CONTENT BELOW | DESKTOP: LEFT COLUMN */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center space-y-10"
        >
          {/* 1. Identity & Headers */}
          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              className="flex items-center space-x-4 text-xs font-sans uppercase tracking-widest text-[#C9A84C]"
            >
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />{" "}
                {university.basicInfo.location}
              </span>
              <span className="w-1 h-1 bg-[#C9A84C]/50 rounded-full" />
              <span>Est. {university.basicInfo.established}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight"
            >
              {university.basicInfo.name}
            </motion.h1>

            {/* 2. Prestige Tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Badge text={university.ui.highlightTag} gold />
              {university.lnat.required && <Badge text="LNAT Required" />}
              <Badge text={university.academics.teachingStyle} />
              {university.ui.eliteUniversity && (
                <Badge text="Elite Institution" />
              )}
            </motion.div>
          </div>

          {/* 4. Editorial Description */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-[#F7F3EC]/80 font-serif leading-relaxed pr-4"
          >
            {university.overview.shortIntro}
          </motion.p>

          {/* 3. Key Admissions Stats Grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            <StatCard
              label="Law Ranking"
              value={university.academics.ukLawRanking}
              icon={<Award className="w-4 h-4" />}
            />
            <StatCard
              label="Acceptance Rate"
              value={
                university.admissions.competitiveness.match(
                  /\(([^)]+)\)/,
                )?.[1] || university.admissions.competitiveness
              }
              icon={<Scale className="w-4 h-4" />}
            />
            <StatCard
              label="Avg LNAT"
              value={university.lnat.averageScore}
              icon={<BookOpen className="w-4 h-4" />}
            />
            <StatCard
              label="Intl Students"
              value={university.studentLife.internationalStudentPercentage}
              icon={<MapPin className="w-4 h-4" />}
            />
          </motion.div>

          {/* 6. Mini Timeline */}
          <motion.div
            variants={fadeUp}
            className="py-4 border-y border-[#F7F3EC]/10"
          >
            <div className="flex items-center justify-between text-xs font-sans tracking-wider text-[#F7F3EC]/70 uppercase">
              <TimelineStep
                date={university.timeline.applicationOpens}
                label="UCAS"
              />
              <ArrowRight className="w-3 h-3 text-[#C9A84C]" />
              <TimelineStep
                date={university.timeline.lnatDeadline}
                label="LNAT"
              />
              <ArrowRight className="w-3 h-3 text-[#C9A84C]" />
              <TimelineStep
                date={university.timeline.finalDeadline}
                label="Deadline"
              />
              {university.timeline.interviewPeriod && (
                <>
                  <ArrowRight className="w-3 h-3 text-[#C9A84C]" />
                  <TimelineStep
                    date={university.timeline.interviewPeriod}
                    label="Interview"
                  />
                </>
              )}
            </div>
          </motion.div>

          {/* 5. CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button className="group flex items-center justify-center space-x-2 bg-[#C9A84C] text-[#0D1B3E] px-8 py-4 rounded-sm font-sans font-medium tracking-wide transition-all hover:bg-[#D4B55E]">
              <span>Explore Admissions</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center px-8 py-4 rounded-sm font-sans font-medium tracking-wide border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors">
              LNAT Requirements
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// SUBCOMPONENTS
// --------------------------------------------------

function Badge({ text, gold = false }: { text: string; gold?: boolean }) {
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase border ${
        gold
          ? "bg-[#C9A84C]/10 border-[#C9A84C]/50 text-[#C9A84C]"
          : "bg-transparent border-[#F7F3EC]/20 text-[#F7F3EC]/80"
      }`}
    >
      {text}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-[#F7F3EC]/5 border border-[#F7F3EC]/10 hover:border-[#C9A84C]/30 transition-colors duration-300">
      <div className="flex items-center space-x-2 text-[#C9A84C] mb-2">
        {icon}
        <span className="text-xs font-sans uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="font-serif text-2xl text-[#F7F3EC]">{value}</span>
    </div>
  );
}

function TimelineStep({ date, label }: { date: string; label: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-[#C9A84C] font-semibold">{date}</span>
      <span>{label}</span>
    </div>
  );
}
