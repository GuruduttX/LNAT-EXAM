"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Handshake,
  TrendingUp,
} from "lucide-react";

interface FamousAlumnus {
  name: string;
  designation: string;
}

interface CareerCard {
  title: string;
  text?: string;
  icon: LucideIcon;
}

interface UniversityCareersProps {
  university: {
    careers?: {
      employabilityOverview?: string;
      topRecruiters?: string[];
      alumniOutcomes?: string;
      internshipsAndPlacements?: string;
      reputationForLaw?: string;
    };
    famousAlumni?: FamousAlumnus[];
    notableAlumni?: string[];
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

function OutcomeCard({
  card,
  index,
}: {
  card: CareerCard;
  index: number;
}) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={fadeUp}
      custom={index * 0.08}
      className="group relative mr-4 min-h-[240px] w-[82vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_14px_34px_rgba(20,31,45,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/35 md:mr-5 md:w-[360px]"
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#0D1B3E]/[0.06] blur-2xl transition-opacity group-hover:bg-[#C9A84C]/10" />
      <div className="relative">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
          Outcome {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 text-[18px] font-extrabold leading-tight text-[#0D1B3E]">
          {card.title}
        </h3>
        <p className="mt-4 text-[13px] leading-7 text-slate-600">
          {card.text}
        </p>
      </div>
    </motion.article>
  );
}

export default function UniversityCareers({
  university,
}: UniversityCareersProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const { careers, famousAlumni } = university;
  const careerCards: CareerCard[] = [
    {
      title: "Alumni outcomes",
      text: careers?.alumniOutcomes,
      icon: TrendingUp,
    },
    {
      title: "Internships & placements",
      text: careers?.internshipsAndPlacements,
      icon: Handshake,
    },
    {
      title: "Law reputation",
      text: careers?.reputationForLaw,
      icon: BadgeCheck,
    },
  ].filter((item) => item.text);

  if (
    !careers?.employabilityOverview &&
    !careers?.topRecruiters?.length &&
    !careerCards.length &&
    !famousAlumni?.length
  ) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden border-t border-black/[0.07] bg-[#F7F3EC] px-4 py-8 text-[#0D1B3E] sm:px-6 md:py-10 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] min-w-0">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 flex items-center justify-center gap-2"
          >
            <div className="h-px w-8 bg-[#C9A84C]/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Outcomes
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]"
          >
            Career pathways with{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              real credibility
            </span>
          </motion.h2>
        </motion.div>

        {careers?.employabilityOverview ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[32px] border border-[#C9A84C]/20 bg-[#0D1B3E] p-5 shadow-[0_20px_56px_rgba(13,27,62,0.18)] md:p-7"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8C96A]">
              <Briefcase size={14} />
              Career prospects
            </div>
            <p className="text-center text-[15px] leading-8 text-white/78 md:text-start">
              {careers.employabilityOverview}
            </p>
          </motion.div>
        ) : null}

        {careerCards.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="-mx-4 mt-8 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
          >
            {careerCards.map((card, index) => (
              <OutcomeCard key={card.title} card={card} index={index} />
            ))}
          </motion.div>
        ) : null}

        {careers?.topRecruiters?.length ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-5 rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_14px_34px_rgba(20,31,45,0.045)]"
          >
            <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
              <Building2 size={15} className="text-[#C9A84C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Recruiters & pathways
              </span>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:pb-0">
              {careers.topRecruiters.map((recruiter, index) => (
                <span
                  key={`${recruiter}-${index}`}
                  className="shrink-0 rounded-full border border-[#0D1B3E]/10 bg-[#F7F3EC] px-4 py-2 text-[12px] font-semibold text-[#0D1B3E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0D1B3E] hover:text-white"
                >
                  {recruiter}
                </span>
              ))}
            </div>
          </motion.div>
        ) : null}

        {famousAlumni?.length ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-8"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center justify-center gap-2 md:justify-start"
            >
              <Award size={16} className="text-[#C9A84C]" />
              <h3 className="text-[18px] font-extrabold text-[#0D1B3E]">
                Famous alumni
              </h3>
            </motion.div>

            <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
              {famousAlumni.map((alumnus, index) => (
                <motion.article
                  key={`${alumnus.name}-${index}`}
                  variants={fadeUp}
                  custom={index * 0.08}
                  className="mr-4 flex min-h-[160px] w-[78vw] max-w-[320px] shrink-0 snap-center flex-col justify-between rounded-[26px] border border-black/[0.07] bg-white p-5 shadow-[0_14px_34px_rgba(20,31,45,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/35 md:w-[320px]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                    <Award size={19} strokeWidth={1.7} />
                  </div>
                  <div className="mt-5">
                    <p className="text-[15px] font-extrabold text-[#0D1B3E]">
                      {alumnus.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-slate-500">
                      {alumnus.designation}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
