"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Layers3,
} from "lucide-react";

import type { IBlog, IUniversity } from "@/types/backend.types";

export interface TopicSubtopicItem {
  title: string;
  description?: string;
  posts: IBlog[];
  universities: IUniversity[];
}

interface TopicSubtopicSectionsProps {
  subtopics: TopicSubtopicItem[];
}

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

function EmptyLinkState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/[0.1] bg-[#FDFBF7] p-4 text-[13px] leading-relaxed text-slate-500">
      {label}
    </div>
  );
}

export default function TopicSubtopicSections({
  subtopics,
}: TopicSubtopicSectionsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [activeIndex, setActiveIndex] = useState(0);

  if (!subtopics.length) return null;

  const hasMultipleSubtopics = subtopics.length > 1;

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? subtopics.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === subtopics.length - 1 ? 0 : current + 1,
    );
  };

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
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
          >
            <SectionLabel text="What You'll Find Here" />
            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Explore this topic through{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                clear sub-sections
              </span>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
              Each subtopic works like a guided pathway, pairing focused reading
              with university pages so students can move from concept to action.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 lg:justify-end"
          >
            <div className="rounded-full border border-black/[0.07] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm">
              {activeIndex + 1} / {subtopics.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={!hasMultipleSubtopics}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.07] bg-white text-[#0D1B3E] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C9A84C]/40 hover:text-[#8B6914] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                aria-label="Show previous subtopic"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={!hasMultipleSubtopics}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0D1B3E] text-white shadow-[0_10px_24px_rgba(13,27,62,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#162447] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                aria-label="Show next subtopic"
              >
                <ChevronRight className="h-4 w-4 text-[#C9A84C]" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="overflow-hidden rounded-3xl">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtopics.map((subtopic, index) => {
            const sectionId = `subtopic-${index + 1}`;
            const guideCount = subtopic.posts.length;
            const universityCount = subtopic.universities.length;

            return (
              <div
                key={subtopic.title}
                className="min-w-full pr-0"
                aria-hidden={activeIndex !== index}
              >
                <motion.section
                id={sectionId}
                aria-labelledby={`${sectionId}-title`}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.08 + index * 0.07}
                variants={fadeUp}
                className="overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_14px_36px_rgba(13,27,62,0.06)]"
              >
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: "linear-gradient(90deg, #C9A84C, #E8C96A)",
                  }}
                />

                <div className="grid gap-0 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
                  <div className="relative overflow-hidden bg-[#0D1B3E] p-5 text-white sm:p-6">
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-white/[0.04] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8C96A]">
                          <Layers3 className="h-3 w-3" />
                          Subtopic {index + 1}
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 text-[13px] font-extrabold text-[#E8C96A]">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <h3
                        id={`${sectionId}-title`}
                        className="text-xl font-bold leading-tight tracking-tight text-white"
                      >
                        {subtopic.title}
                      </h3>
                      {subtopic.description ? (
                        <p className="mt-3 text-[13px] leading-relaxed text-white/65">
                          {subtopic.description}
                        </p>
                      ) : (
                        <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                          Use the linked guides and university pages to explore
                          this part of the topic in more detail.
                        </p>
                      )}

                      <div className="mt-6 grid grid-cols-2 gap-3 max-w-60">
                        <div className="rounded-2xl  border border-white/10 bg-white/[0.04] p-4">
                          <BookOpenCheck className="h-4 w-4 text-[#C9A84C]" />
                          <p className="mt-3 text-2xl font-extrabold leading-none">
                            {guideCount}
                          </p>
                          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">
                            Guides
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <GraduationCap className="h-4 w-4 text-[#C9A84C]" />
                          <p className="mt-3 text-2xl font-extrabold leading-none">
                            {universityCount}
                          </p>
                          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">
                            Universities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                            <BookOpenCheck className="h-4 w-4" />
                          </span>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">
                            Related Guides
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {guideCount}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {guideCount ? (
                          subtopic.posts.map((post) => (
                            <Link
                              key={post.slug}
                              href={`/blog/${post.slug}`}
                              tabIndex={activeIndex === index ? undefined : -1}
                              className="group flex items-start justify-between gap-4 rounded-2xl border border-black/[0.05] bg-white p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/35 hover:shadow-sm"
                            >
                              <span>
                                <span className="block text-[13px] font-bold leading-snug text-[#0D1B3E] group-hover:text-[#8B6914]">
                                  {post.title}
                                </span>
                                {post.readTime ? (
                                  <span className="mt-1 block text-[11px] text-slate-400">
                                    {post.readTime} min read
                                  </span>
                                ) : null}
                              </span>
                              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
                            </Link>
                          ))
                        ) : (
                          <EmptyLinkState label="Detailed guides for this subtopic will appear here." />
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0D1B3E]/5 text-[#0D1B3E]">
                            <GraduationCap className="h-4 w-4" />
                          </span>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">
                            University Links
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {universityCount}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {universityCount ? (
                          subtopic.universities.map((university) => (
                            <Link
                              key={university.slug}
                              href={`/universities/${university.slug}`}
                              tabIndex={activeIndex === index ? undefined : -1}
                              className="group flex items-start justify-between gap-4 rounded-2xl border border-black/[0.05] bg-white p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/35 hover:shadow-sm"
                            >
                              <span>
                                <span className="block text-[13px] font-bold leading-snug text-[#0D1B3E] group-hover:text-[#8B6914]">
                                  {university.name}
                                </span>
                                <span className="mt-1 block text-[11px] text-slate-400">
                                  {[university.city, university.country]
                                    .filter(Boolean)
                                    .join(", ") || "University guide"}
                                </span>
                              </span>
                              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
                            </Link>
                          ))
                        ) : (
                          <EmptyLinkState label="University-specific links for this subtopic will appear here." />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </motion.section>
              </div>
            );
            })}
          </motion.div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {subtopics.map((subtopic, index) => (
            <button
              key={`${subtopic.title}-indicator`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-[#C9A84C]"
                  : "w-2.5 bg-[#0D1B3E]/15 hover:bg-[#0D1B3E]/30"
              }`}
              aria-label={`Show subtopic ${index + 1}: ${subtopic.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
