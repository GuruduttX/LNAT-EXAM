"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const floatingCards = [
  {
    title: "LNAT Essay Guide",
    subtitle: "Preparation Resource",
  },
  {
    title: "Oxford Admissions",
    subtitle: "University Insights",
  },
  {
    title: "UCAS Timeline",
    subtitle: "Application Guide",
  },
];

export default function BlogArchiveHero() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-6 py-20 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,97,0.12),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A961]/20 bg-white/5 px-4 py-2 text-sm tracking-wide text-[#E7D3A2] backdrop-blur-sm">
            <BookOpen className="h-4 w-4" />
            LNAT Editorial Resources
          </div>

          <div className="space-y-5">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-[#F8F5EE] md:text-5xl lg:text-6xl">
              LNAT Preparation & Admissions Insights
            </h1>

            <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Explore curated guides, admissions strategies, essay preparation
              resources, and expert insights for aspiring law students applying
              to leading UK universities.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A961] px-6 py-3 text-sm font-medium text-[#07111F] transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Resources
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/how-to-apply"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-[#C9A961]/40 hover:bg-white/10"
            >
              Download Guide
              <FileText className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-sm text-slate-400">
            <span>Updated for 2026 Admissions</span>
            <span>University Specific Guides</span>
            <span>Expert Preparation Insights</span>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop"
                alt="Law preparation"
                width={900}
                height={700}
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/20 to-transparent" />
            </div>
          </div>

          {/* Floating Cards */}
          <div className="absolute -left-6 top-10 hidden space-y-4 lg:block">
            {floatingCards.slice(0, 2).map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-[#0B1727]/90 p-4 shadow-2xl backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A961]">
                  {card.subtitle}
                </p>

                <h3 className="mt-2 text-sm font-medium text-white">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-6 right-0 hidden lg:block">
            <div className="rounded-2xl border border-white/10 bg-[#0B1727]/90 p-5 shadow-2xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A961]">
                Admissions Guide
              </p>

              <h3 className="mt-2 text-base font-medium text-white">
                UCAS & LNAT Timeline
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">
                Understand application deadlines, admissions stages, and LNAT
                preparation milestones.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}