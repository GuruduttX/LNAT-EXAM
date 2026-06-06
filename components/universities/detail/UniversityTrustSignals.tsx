"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Award, BadgeCheck, MessageSquareQuote, ShieldCheck } from "lucide-react";

interface Testimonial {
  name: string;
  course?: string;
  quote: string;
  outcome?: string;
  consentVerified?: boolean;
}

interface UniversityTrustSignalsProps {
  university: {
    reviewedBy?: {
      name: string;
      role?: string;
    };
    lastFactCheckedAt?: string | Date;
    awardsAndRecognition?: string[];
    notableAlumni?: string[];
    testimonials?: Testimonial[];
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function formatDate(value?: string | Date) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function UniversityTrustSignals({
  university,
}: UniversityTrustSignalsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const factCheckedDate = formatDate(university.lastFactCheckedAt);
  const hasEditorialSignal = university.reviewedBy?.name || factCheckedDate;
  const awards = university.awardsAndRecognition || [];
  const notableAlumni = university.notableAlumni || [];
  const testimonials = university.testimonials || [];

  if (!hasEditorialSignal && !awards.length && !notableAlumni.length && !testimonials.length) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative border-t border-black/[0.07] bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="mb-3 flex items-center justify-center gap-2 md:justify-start"
            >
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Trust & Credibility
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
            >
              Credibility signals for better decisions
            </motion.h2>

            {hasEditorialSignal ? (
              <motion.div
                variants={fadeUp}
                className="mt-6 rounded-[26px] border border-[#C9A84C]/20 bg-[#0D1B3E] p-6 text-white shadow-[0_16px_48px_rgba(13,27,62,0.18)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#C9A84C]">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  Editorial review
                </p>
                {university.reviewedBy?.name ? (
                  <p className="mt-3 text-[15px] font-bold">
                    {university.reviewedBy.name}
                    {university.reviewedBy.role
                      ? `, ${university.reviewedBy.role}`
                      : ""}
                  </p>
                ) : null}
                {factCheckedDate ? (
                  <p className="mt-2 text-[13px] leading-6 text-white/70">
                    Last fact checked on {factCheckedDate}
                  </p>
                ) : null}
              </motion.div>
            ) : null}
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {awards.length ? (
              <motion.div
                variants={fadeUp}
                className="rounded-[24px] border border-black/[0.07] bg-[#F7F3EC] p-5"
              >
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  <Award size={15} />
                  Awards & recognition
                </div>
                <div className="flex flex-wrap gap-2">
                  {awards.map((award) => (
                    <span
                      key={award}
                      className="rounded-full border border-[#0D1B3E]/10 bg-white px-4 py-2 text-[12px] font-bold text-[#0D1B3E]"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {notableAlumni.length ? (
              <motion.div
                variants={fadeUp}
                className="rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  <BadgeCheck size={15} />
                  Additional notable alumni
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {notableAlumni.map((alumnus) => (
                    <p
                      key={alumnus}
                      className="rounded-2xl border border-black/[0.05] bg-[#FDFBF7] px-4 py-3 text-[13px] font-semibold text-[#0D1B3E]"
                    >
                      {alumnus}
                    </p>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {testimonials.length ? (
              <motion.div
                variants={stagger}
                className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.article
                    key={`${testimonial.name}-${index}`}
                    variants={fadeUp}
                    custom={index * 0.08}
                    className="mr-4 min-h-[230px] w-[82vw] max-w-[330px] shrink-0 snap-center rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-[0_12px_30px_rgba(20,31,45,0.05)] md:mr-0 md:w-full md:max-w-none"
                  >
                    <MessageSquareQuote
                      className="mb-4 text-[#C9A84C]"
                      size={22}
                    />
                    <p className="text-[14px] leading-7 text-slate-600">
                      “{testimonial.quote}”
                    </p>
                    <p className="mt-4 text-[14px] font-extrabold text-[#0D1B3E]">
                      {testimonial.name}
                    </p>
                    {testimonial.course || testimonial.outcome ? (
                      <p className="mt-1 text-[12px] leading-5 text-slate-500">
                        {[testimonial.course, testimonial.outcome]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    ) : null}
                  </motion.article>
                ))}
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
