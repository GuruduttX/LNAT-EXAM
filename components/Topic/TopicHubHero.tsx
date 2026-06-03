"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  GraduationCap,
  Hash,
  Layers3,
  LibraryBig,
} from "lucide-react";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import type { ICategory } from "@/types/backend.types";

interface TopicHubHeroProps {
  category: ICategory;
  stats: {
    posts: number;
    universities: number;
    subtopicSections: number;
  };
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

const statItems = [
  {
    key: "posts",
    label: "Featured Guides",
    icon: BookOpenCheck,
  },
  {
    key: "universities",
    label: "Universities",
    icon: GraduationCap,
  },
  {
    key: "subtopicSections",
    label: "Subtopics",
    icon: Layers3,
  },
] as const;

function formatUpdatedDate(value?: Date) {
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
  const hasImage = Boolean(category.heroImage?.url);
  const isPrimaryCta = category.cta?.type !== "secondary";

  return (
    <section className="relative overflow-hidden border-b border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-80
          [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
          [background-size:26px_26px]"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Topics", href: "/topics" },
            { label: category.name, href: `/topics/${category.slug}` },
          ]}
          className="mb-6"
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex min-w-0 flex-col justify-center text-center lg:text-left"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0D1B3E] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8C96A]">
                <LibraryBig className="h-3 w-3" />
                Topic Guide
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                <Hash className="h-3 w-3 text-[#C9A84C]" />
                {category.primaryKeyword}
              </span>
              {updatedDate ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                  <Clock3 className="h-3 w-3 text-[#C9A84C]" />
                  Updated {updatedDate}
                </span>
              ) : null}
            </motion.div>

            <motion.h1
              custom={0.08}
              variants={fadeUp}
              className="mx-auto mt-5 max-w-4xl text-[clamp(1.9rem,4.8vw,3.8rem)] font-extrabold leading-[1.08] tracking-tight text-[#0D1B3E] lg:mx-0"
            >
              {category.name}
            </motion.h1>

            <motion.div
              custom={0.16}
              variants={fadeUp}
              className="mx-auto mt-5 max-w-3xl rounded-2xl border border-black/[0.07] bg-white text-left shadow-sm lg:mx-0"
            >
              <div className="flex items-center gap-2 border-b border-black/[0.05] px-4 py-3 sm:px-5">
                <div className="h-4 w-[3px] rounded-full bg-[#C9A84C]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">
                  Quick Answer
                </p>
              </div>
              <p className="px-4 py-4 text-[13px] font-medium leading-relaxed text-[#0D1B3E] sm:px-5 sm:text-[14px]">
                {category.topicDefinition}
              </p>
            </motion.div>

            {category.cta?.label && category.cta?.href ? (
              <motion.div
                custom={0.24}
                variants={fadeUp}
                className="mt-5 flex justify-center lg:justify-start"
              >
                <Link
                  href={category.cta.href}
                  className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                    isPrimaryCta
                      ? "bg-[#0D1B3E] text-white shadow-[0_10px_24px_rgba(13,27,62,0.18)] hover:bg-[#162447]"
                      : "border border-black/[0.07] bg-white text-[#0D1B3E] shadow-sm hover:border-[#C9A84C]/50"
                  }`}
                >
                  {category.cta.label}
                  <ArrowRight className="h-4 w-4 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ) : null}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border border-[#C9A84C]/15 bg-[#0D1B3E] shadow-[0_18px_48px_rgba(13,27,62,0.22)]"
          >
            <div className="relative h-48 overflow-hidden sm:h-56 lg:h-60">
              {hasImage ? (
                <Image
                  src={category.heroImage!.url}
                  alt={category.heroImage?.alt || category.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.24),transparent_38%),linear-gradient(135deg,#0A1628_0%,#111D3C_100%)]">
                  <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:22px_22px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#C9A84C]/25 bg-white/[0.05] text-[#E8C96A] backdrop-blur-sm">
                      <LibraryBig className="h-9 w-9" />
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E] via-[#0D1B3E]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-5 pb-4 sm:px-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8C96A]">
                  Structured Learning Path
                </p>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/70">
                  Move from the core answer into focused guides, related
                  universities, and practical next steps.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-white/10">
              {statItems.map(({ key, label, icon: Icon }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.28 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-r border-white/10 px-3 py-4 last:border-r-0 sm:px-4"
                >
                  <Icon className="h-4 w-4 text-[#C9A84C]" />
                  <p className="mt-3 text-2xl font-extrabold leading-none text-white">
                    {stats[key]}
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-white/45">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
