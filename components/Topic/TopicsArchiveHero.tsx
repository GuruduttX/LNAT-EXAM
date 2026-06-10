"use client";

import { motion, type Variants } from "framer-motion";
import { BookOpenCheck, Layers3, LibraryBig } from "lucide-react";

import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface TopicsArchiveHeroProps {
  totalHubs: number;
  totalSubtopics: number;
  totalLinkedContent: number;
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

const summaryItems = [
  {
    key: "hubs",
    label: "Published Hubs",
    icon: LibraryBig,
  },
  {
    key: "subtopics",
    label: "Focused Subtopics",
    icon: Layers3,
  },
  {
    key: "content",
    label: "Linked Entries",
    icon: BookOpenCheck,
  },
] as const;

export default function TopicsArchiveHero({
  totalHubs,
  totalSubtopics,
  totalLinkedContent,
}: TopicsArchiveHeroProps) {
  const values = {
    hubs: totalHubs,
    subtopics: totalSubtopics,
    content: totalLinkedContent,
  };

  return (
    <section className="relative overflow-hidden border-b border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-70
          [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
          [background-size:26px_26px]"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Topics", href: "/topics" },
          ]}
          className="mb-7"
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#C9A84C]/50" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                LNAT Knowledge Map
              </p>
            </div>

            <h1 className="max-w-4xl text-[clamp(1.9rem,4.8vw,3.8rem)] font-extrabold leading-[1.08] tracking-tight text-[#0D1B3E]">
              LNAT Topics: Everything About the{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                Exam, in One Place
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-500">
              This hub maps every LNAT topic: the exam format and sections,
              scoring, registration and deadlines, the universities that use
              it, the India/JGLS route, and how to prepare. Each path links to a
              complete guide.
            </p>

            <div className="mt-6 max-w-3xl rounded-2xl border border-black/[0.07] bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-black/[0.05] px-5 py-3">
                <div className="h-4 w-[3px] rounded-full bg-[#0D1B3E]" />
                <h2 className="text-[13px] font-bold text-[#0D1B3E]">
                  Quick answer
                </h2>
              </div>
              <p className="px-5 py-4 text-[13px] leading-relaxed text-slate-500">
                Use this page to move from overview to detail: format, Section
                A, Section B, scoring, registration, universities, India/JGLS
                and preparation are organised into linked topic paths.
              </p>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#C9A84C]/15 bg-[#0D1B3E] p-5 shadow-[0_16px_44px_rgba(13,27,62,0.2)] sm:p-6"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                Browse With Context
              </p>
              <h2 className="mt-3 text-xl font-bold leading-snug text-white">
                Build a focused reading path before you start preparation.
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-white/50">
                Pick the area you need now, then use the connected guide pages
                to go deeper without losing the wider admissions context.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {summaryItems.map(({ key, label, icon: Icon }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.22 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <Icon size={15} className="text-[#C9A84C]" />
                  <p className="mt-5 text-2xl font-extrabold leading-none text-white">
                    {values[key]}
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
