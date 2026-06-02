"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Library } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// Mocking the props for the design (replace with your actual data)
interface BlogArchiveHeroProps {
  blogsCount?: number;
  featuredCount?: number;
  hubsCount?: number;
}

export default function BlogArchiveHero({
  blogsCount = 42,
  featuredCount = 6,
  hubsCount = 4,
}: BlogArchiveHeroProps) {
  return (
    <section className="relative w-full border-b border-black/[0.07] bg-[#F7F3EC] pt-10 pb-12  md:pb-16 ">
      {/* Dense, subtle architectural background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:20px_20px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
          className="mb-7"
        />

        {/* Header Area - Compact and highly readable */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              The Knowledge Base
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(1.8rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight text-[#0D1B3E]">
              LNAT guides, university insights, and{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                strategy articles
              </span>{" "}
              for serious applicants.
            </h1>
            <p className="max-w-md text-[14px] leading-relaxed text-slate-500 lg:text-right">
              Explore preparation guides, essay strategy, admissions advice, and
              university explainers built to help you move from confusion to a
              confident LNAT plan.
            </p>
          </div>
        </motion.div>

        {/* Dense Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {/* Card 1: Published Guides */}
          <div className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_12px_30px_rgba(13,27,62,0.06)] md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Published Guides
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F3EC] text-[#0D1B3E] transition-colors group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]">
                <BookOpen size={16} strokeWidth={2} />
              </div>
            </div>
            <p className="mb-2 text-[32px] font-extrabold leading-none text-[#0D1B3E]">
              {blogsCount}
            </p>
            <p className="mt-auto text-[13px] leading-relaxed text-slate-500">
              Practical articles covering preparation, admissions, essay
              writing, and university research.
            </p>
          </div>

          {/* Card 2: Cornerstone Pieces */}
          <div className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_12px_30px_rgba(13,27,62,0.06)] md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Cornerstone Pieces
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F3EC] text-[#0D1B3E] transition-colors group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]">
                <Award size={16} strokeWidth={2} />
              </div>
            </div>
            <p className="mb-2 text-[32px] font-extrabold leading-none text-[#0D1B3E]">
              {featuredCount}
            </p>
            <p className="mt-auto text-[13px] leading-relaxed text-slate-500">
              Our best starting points if you want high-context guidance before
              going into narrower questions.
            </p>
          </div>

          {/* Card 3: Topic Hubs */}
          <div className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_12px_30px_rgba(13,27,62,0.06)] md:p-6 sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Topic Hubs
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F3EC] text-[#0D1B3E] transition-colors group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]">
                <Library size={16} strokeWidth={2} />
              </div>
            </div>
            <p className="mb-2 text-[32px] font-extrabold leading-none text-[#0D1B3E]">
              {hubsCount}
            </p>
            <p className="mt-auto text-[13px] leading-relaxed text-slate-500">
              Browse broader themes like LNAT prep, universities, and law
              admissions to find the right next read faster.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
