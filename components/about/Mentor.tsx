"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Award, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import type { Variants } from "framer-motion";

// --- Design System Animation Variants ---
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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function MentorImageCollage({
  inView,
  className = "",
}: {
  inView: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative mx-auto w-full max-w-sm pb-10 lg:mx-0 lg:max-w-none lg:pb-0 ${className}`}
    >
      <div className="absolute left-8 top-8 h-3/4 w-3/4 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[390px] lg:mx-0 lg:max-w-none">
        <motion.div
          variants={scaleIn}
          className="absolute right-0 top-0 h-[84%] w-[84%] overflow-hidden rounded-3xl border border-black/[0.05] shadow-[0_16px_40px_rgba(13,27,62,0.12)]"
        >
          <Image
            src="/images/LNAT-mentor.webp"
            alt="Mr. Alastair Murray, lead LNAT mentor"
            fill
            sizes="(max-width: 1024px) 82vw, 40vw"
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.3}
          className="absolute bottom-0 left-0 h-[43%] w-[64%] overflow-hidden rounded-2xl border-4 border-white shadow-[0_24px_48px_rgba(13,27,62,0.18)] lg:-bottom-16"
        >
          <Image
            src="/images/LNAT-mentor-2.webp"
            alt="Mr. Alastair Murray working with academic materials"
            fill
            sizes="(max-width: 1024px) 58vw, 30vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function MentorIntroduction() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      id="mentor"
      ref={ref}
      className="bg-white px-4 py-10 sm:px-6 md:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <MentorImageCollage inView={inView} className="hidden lg:block" />

          {/* RIGHT COLUMN: Content & Experience Breakdown */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
            >
              <div className="h-px w-8 bg-[#C9A84C]/40" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
                Lead Mentor
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]"
            >
              Learn from an Official{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                Former IELTS Examiner
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px] lg:mx-0"
            >
              With years of experience assessing candidates for the British
              Council and IDP, our mentor knows exactly what top universities
              demand. Combining institutional language direction with elite exam
              strategy.
            </motion.p>

            <MentorImageCollage inView={inView} className="mt-8 lg:hidden" />

            {/* Experience List */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4">
              {/* Experience 1: IDP/British Council (Most prestigious, goes first) */}
              <div
                className="group flex flex-col items-center gap-4 rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-5 text-center transition-all duration-300 sm:flex-row sm:items-start sm:text-left"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0D1B3E] text-[#C9A84C]">
                  <Award size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0D1B3E]">
                    British Council & IDP IELTS Examiner
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    <li className="flex items-start gap-2 text-[13px] text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="mt-[2px] shrink-0 text-[#C9A84C]"
                      />
                      Interviewed candidates directly for spoken English
                      language proficiency.
                    </li>
                    <li className="flex items-start gap-2 text-[13px] text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="mt-[2px] shrink-0 text-[#C9A84C]"
                      />
                      Examined and graded students' academic and general writing
                      skills.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 2: Chitkara University */}
              <div
                className="group flex flex-col items-center gap-4 rounded-2xl border border-black/[0.07] bg-white p-5 text-center transition-all duration-300 sm:flex-row sm:items-start sm:text-left"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                  <GraduationCap size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0D1B3E]">
                    Language & Program Director
                  </h3>
                  <p className="text-[12px] font-semibold text-[#C9A84C]">
                    Chitkara University (Inlingua Institute)
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    <li className="flex items-start gap-2 text-[13px] text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="mt-[2px] shrink-0 text-[#C9A84C]"
                      />
                      Mentored students in French, Spanish, and English
                      proficiency.
                    </li>
                    <li className="flex items-start gap-2 text-[13px] text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="mt-[2px] shrink-0 text-[#C9A84C]"
                      />
                      Trained faculty and mentors to effectively guide students
                      in communication.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 3: Austech */}
              <div
                className="group flex flex-col items-center gap-4 rounded-2xl border border-black/[0.07] bg-white p-5 text-center transition-all duration-300 sm:flex-row sm:items-start sm:text-left"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Building2 size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0D1B3E]">
                    Lead Trainer & Mentor
                  </h3>
                  <p className="text-[12px] font-semibold text-[#C9A84C]">
                    Austech Language Institute
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    <li className="flex items-start gap-2 text-[13px] text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="mt-[2px] shrink-0 text-[#C9A84C]"
                      />
                      Prepared professionals for advanced English language
                      proficiency tests.
                    </li>
                    <li className="flex items-start gap-2 text-[13px] text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="mt-[2px] shrink-0 text-[#C9A84C]"
                      />
                      Mentored MBA and undergraduate students for IELTS and
                      effective communication.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
