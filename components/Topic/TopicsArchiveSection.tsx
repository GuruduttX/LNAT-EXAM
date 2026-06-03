"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  GraduationCap,
  Layers3,
} from "lucide-react";

import type { ICategory } from "@/types/backend.types";

interface TopicsArchiveSectionProps {
  categories: ICategory[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
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

function getCategoryStats(category: ICategory) {
  const linkedPosts = new Set([
    ...(category.featuredPostSlugs || []),
    ...(category.subtopics || []).flatMap(
      (subtopic) => subtopic.postSlugs || [],
    ),
  ]);
  const linkedUniversities = new Set([
    ...(category.featuredUniversitySlugs || []),
    ...(category.subtopics || []).flatMap(
      (subtopic) => subtopic.universitySlugs || [],
    ),
  ]);

  return {
    posts: linkedPosts.size,
    universities: linkedUniversities.size,
    subtopics: category.subtopics?.length || 0,
  };
}

function HubCardItem({ category }: { category: ICategory }) {
  const stats = getCategoryStats(category);
  const visibleSubtopics = (category.subtopics || []).slice(0, 3);

  return (
    <motion.article
      variants={fadeUp}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
              <Compass size={17} strokeWidth={2} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Topic Hub
            </p>
          </div>
          <span className="max-w-[52%] truncate rounded-lg bg-[#F7F3EC] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8B6914]">
            {category.primaryKeyword}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-extrabold leading-tight text-[#0D1B3E]">
          {category.name}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
          {category.topicDefinition}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            {
              label: "Guides",
              value: stats.posts,
              icon: BookOpenCheck,
            },
            {
              label: "Universities",
              value: stats.universities,
              icon: GraduationCap,
            },
            {
              label: "Subtopics",
              value: stats.subtopics,
              icon: Layers3,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-black/[0.05] bg-[#FDFBF7] p-3"
            >
              <Icon size={14} className="text-[#C9A84C]" />
              <p className="mt-3 text-xl font-extrabold leading-none text-[#0D1B3E]">
                {value}
              </p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex-1 rounded-xl border border-black/[0.04] bg-[#FDFBF7] p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E]">
            <Layers3 size={14} className="text-[#C9A84C]" />
            Explore Within This Hub
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleSubtopics.length ? (
              visibleSubtopics.map((subtopic) => (
                <span
                  key={subtopic.title}
                  className="rounded-full border border-[#C9A84C]/15 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500"
                >
                  {subtopic.title}
                </span>
              ))
            ) : (
              <p className="text-[12px] leading-relaxed text-slate-400">
                Open the hub to explore its connected guidance and university
                profiles.
              </p>
            )}
          </div>
        </div>

        <Link
          href={`/topics/${category.slug}`}
          className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B3E] px-5 py-3.5 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#162447] hover:shadow-md"
        >
          Explore Hub
          <ArrowRight
            size={14}
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default function TopicsArchiveSection({
  categories,
}: TopicsArchiveSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/[0.05] bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]
          [background-image:radial-gradient(circle,rgba(13,27,62,1)_1px,transparent_1px)]
          [background-size:24px_24px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C9A84C]/50" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Choose Your Starting Point
            </p>
          </div>
          <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
            Browse every published{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              topic hub
            </span>
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
            Pick the broad question you are working on, then use the connected
            guides and subtopics to build a more focused research path.
          </p>
        </div>

        {categories.length ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5% 0px" }}
            className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            {categories.map((category) => (
              <HubCardItem key={category.slug} category={category} />
            ))}
          </motion.div>
        ) : (
          <div className="mt-8 rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-6 text-[14px] text-slate-500">
            Topic hubs will appear here once they are published.
          </div>
        )}
      </div>
    </section>
  );
}
