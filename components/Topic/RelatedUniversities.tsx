"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export interface IRelatedUniversity {
  slug: string;
  name: string;
  city?: string;
  country?: string;
  cardImage?: { url: string; alt?: string };
  image?: string;
  excerpt40to60?: string;
  shortDescription?: string;
  globalRanking?: string;
  lawSchoolRanking?: string;
  lnatRequirement?: string;
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
      <div className="h-px w-8 bg-[#C9A84C]/40" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
        {text}
      </span>
      <div className="h-px w-8 bg-[#C9A84C]/40" />
    </div>
  );
}

function getRequirementTone(value?: string) {
  if (!value) return "border-slate-200 bg-slate-50 text-slate-500";

  const normalized = value.toLowerCase();
  if (normalized.includes("required")) {
    return "border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#8B6914]";
  }

  if (normalized.includes("not")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-[#0D1B3E]/10 bg-[#0D1B3E]/5 text-[#0D1B3E]";
}

export default function RelatedUniversities({
  universities,
}: {
  universities?: IRelatedUniversity[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  if (!universities?.length) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
    >
      <div
        className="pointer-events-none absolute inset-0
          [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
          [background-size:26px_26px]"
      />
      <div
        className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
        >
          <div className="mx-auto max-w-3xl lg:mx-0">
            <SectionLabel text="Related Universities" />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Compare relevant{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                university guides
              </span>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
              Use these cards to quickly scan fit, LNAT context, and ranking
              signals before opening the full university profile.
            </p>
          </div>

          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm lg:mx-0">
            <GraduationCap className="h-3.5 w-3.5 text-[#C9A84C]" />
            {universities.length} linked
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex gap-4 overflow-x-auto px-1 pb-5 pt-1 -mx-1 snap-x snap-mandatory [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {universities.map((university, index) => {
            const imageUrl = university.cardImage?.url || university.image;
            const imageAlt = university.cardImage?.alt || university.name;
            const location = [university.city, university.country]
              .filter(Boolean)
              .join(", ");
            const ranking =
              university.lawSchoolRanking || university.globalRanking || "";
            const summary =
              university.excerpt40to60 || university.shortDescription || "";

            return (
              <motion.article
                key={university.slug}
                variants={fadeUp}
                custom={index * 0.05}
                className="group flex h-full w-[84vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_10px_28px_rgba(13,27,62,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/35 hover:shadow-[0_18px_44px_rgba(13,27,62,0.12)] md:w-auto md:max-w-none"
              >
                <div className="relative h-44 overflow-hidden bg-[#0D1B3E]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 84vw, (max-width: 1200px) 50vw, 33vw"
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.24),transparent_38%),linear-gradient(135deg,#0A1628_0%,#111D3C_100%)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/85 via-[#0D1B3E]/20 to-transparent" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0D1B3E]/75 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8C96A] backdrop-blur-sm">
                    <Building2 className="h-3 w-3" />
                    University
                  </div>

                  {location ? (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-[11px] font-semibold text-white/80">
                      <MapPin className="h-3.5 w-3.5 text-[#C9A84C]" />
                      <span className="truncate">{location}</span>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[15px] font-bold leading-snug text-[#0D1B3E] transition-colors group-hover:text-[#8B6914]">
                    {university.name}
                  </h3>

                  {summary ? (
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-500">
                      {summary}
                    </p>
                  ) : null}

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-black/[0.06] bg-[#FDFBF7] p-3">
                      <Trophy className="h-4 w-4 text-[#C9A84C]" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Ranking
                      </p>
                      <p className="mt-1 line-clamp-1 text-[12px] font-bold text-[#0D1B3E]">
                        {ranking || "Check profile"}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl border p-3 ${getRequirementTone(
                        university.lnatRequirement,
                      )}`}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] opacity-70">
                        LNAT
                      </p>
                      <p className="mt-1 line-clamp-1 text-[12px] font-bold">
                        {university.lnatRequirement || "Check profile"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/universities/${university.slug}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1B3E] px-4 py-3 text-[13px] font-bold text-white transition-all hover:bg-[#162447] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                  >
                    View University Page
                    <ArrowRight className="h-4 w-4 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
