"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Landmark,
  Layers,
  Clock,
  Hash,
  ArrowRight,
} from "lucide-react";
import type { Variants } from "framer-motion";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

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
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// --- Types mapping to your Mongoose Schema ---
export interface TopicHubHeroProps {
  category: {
    name: string;
    slug: string;
    primaryKeyword: string;
    topicDefinition: string;
    intro?: string;
    heroImage?: {
      url: string;
      alt: string;
    };
    lastUpdated?: Date | string;
    cta?: {
      label: string;
      href: string;
      type?: "primary" | "secondary";
    };
  };
  stats: {
    posts: number;
    universities: number;
    subtopicSections: number;
  };
}

function formatUpdatedDate(value?: Date | string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TopicHubHero({ category, stats }: TopicHubHeroProps) {
  const updatedDate = formatUpdatedDate(category.lastUpdated);
  const isPrimaryCta = category.cta?.type !== "secondary";

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F3EC] pt-10 pb-12 lg:pt-20 lg:pb-20">
      {/* Subtle Dot Grid Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Topics", href: "/topics" },
            { label: category.name, href: `/topics/${category.slug}` },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* LEFT COLUMN: Content & Stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center md:items-start md:text-left min-w-0"
          >
            {/* 1. Metadata Row (Trust & Freshness + Keyword) */}
            <motion.div
              variants={fadeUp}
              className="mb-5 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1B3E] text-[10px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
                Topic Guide
              </span>

              <div className="hidden h-3 w-px bg-black/10 md:block" />

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-[11px] font-medium text-slate-500 shadow-sm">
                <Hash size={12} className="text-[#C9A84C]" />
                {category.primaryKeyword}
              </span>

              {updatedDate ? (
                <>
                  <div className="hidden h-3 w-px bg-black/10 md:block" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-[11px] font-medium text-slate-500 shadow-sm">
                    <Clock size={12} className="text-[#C9A84C]" />
                    Updated: {updatedDate}
                  </span>
                </>
              ) : null}
            </motion.div>

            {/* 2. H1 Primary Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold tracking-tight text-[#0D1B3E] leading-[1.1]"
            >
              {category.name}
            </motion.h1>

            {/* 3. AEO / GEO Topic Definition & Intro */}
            <motion.div variants={fadeUp} className="mt-5 max-w-2xl lg:mt-6">
              <p className="text-[15px] font-semibold leading-[1.7] text-[#0D1B3E] md:text-[17px]">
                {category.topicDefinition}
              </p>
              {category.intro && (
                <p className="mt-3 text-[14px] leading-[1.8] text-slate-600 md:text-[15px]">
                  {category.intro}
                </p>
              )}
            </motion.div>

            {/* 4. Dynamic CTA from Schema */}
            {category.cta && (
              <motion.div
                variants={fadeUp}
                className="mt-6 lg:mt-8 w-full sm:w-auto"
              >
                <Link
                  href={category.cta.href}
                  className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto ${
                    isPrimaryCta
                      ? "text-[#0D1B3E]"
                      : "bg-white text-[#0D1B3E] border border-black/[0.07] hover:shadow-md"
                  }`}
                  style={
                    isPrimaryCta
                      ? {
                          background:
                            "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                          boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
                        }
                      : undefined
                  }
                >
                  {category.cta.label}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            )}

            {/* 5. Stats Cards Dashboard (Mobile Swipe -> Desktop Grid) */}
            <motion.div variants={fadeUp} className="w-full mt-10 lg:mt-12">
              <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-2 px-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
                {/* Stat 1 */}
                <div className="shrink-0 snap-start w-[75vw] max-w-[240px] md:w-auto md:max-w-none rounded-2xl bg-white p-5 border border-black/[0.07] shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                    <BookOpen size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-[#0D1B3E] font-extrabold text-3xl leading-none mb-1">
                      {stats.posts}
                    </div>
                    <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.1em]">
                      Featured Guides
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="shrink-0 snap-start w-[75vw] max-w-[240px] md:w-auto md:max-w-none rounded-2xl bg-white p-5 border border-black/[0.07] shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1B3E]/5 text-[#0D1B3E]">
                    <Landmark size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-[#0D1B3E] font-extrabold text-3xl leading-none mb-1">
                      {stats.universities}
                    </div>
                    <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.1em]">
                      Universities
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="shrink-0 snap-start w-[75vw] max-w-[240px] md:w-auto md:max-w-none rounded-2xl bg-white p-5 border border-black/[0.07] shadow-sm flex flex-col gap-3 transition-transform hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                    <Layers size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-[#0D1B3E] font-extrabold text-3xl leading-none mb-1">
                      {stats.subtopicSections}
                    </div>
                    <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.1em]">
                      Subtopics
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Hero Image */}
          {category.heroImage?.url && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative w-full h-[320px] md:h-[460px] lg:h-[580px] mt-4 lg:mt-0"
            >
              {/* Offset Gold Geometric Shadow */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-[80%] h-[80%] rounded-3xl bg-[#C9A84C]/15 -z-10" />

              <div className="relative w-full h-full overflow-hidden rounded-3xl border border-black/[0.05] shadow-[0_16px_40px_rgba(13,27,62,0.12)] bg-white">
                <Image
                  src={category.heroImage.url}
                  alt={category.heroImage.alt || category.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  draggable={false}
                  priority
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
