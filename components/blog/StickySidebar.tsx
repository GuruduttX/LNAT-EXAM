"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Download,
  ListTree,
  ShieldCheck,
} from "lucide-react";

import { IBlog } from "@/types/backend.types";

import StickyConsultationForm from "./StickyConsultationForm";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface StickySidebarProps {
  blog: IBlog;
  tocItems: TocItem[];
  displayUpdatedAt: string | null;
}

export default function StickySidebar({
  blog,
  tocItems,
  displayUpdatedAt,
}: StickySidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="flex w-full flex-col gap-5 lg:sticky lg:top-24"
    >
      {tocItems.length ? (
        <div className="rounded-[28px] border border-[#D9D0C1] bg-white p-6 shadow-[0_14px_32px_rgba(20,31,45,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C]/10 text-[#9A7B4F]">
              <ListTree className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D4F]">
                On This Page
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Jump to the section you need most.
              </p>
            </div>
          </div>

          <nav className="mt-5 space-y-2" aria-label="Table of contents">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block rounded-2xl px-4 py-3 text-sm leading-6 transition-colors hover:bg-[#F7F3EC] hover:text-[#0D1B3E] ${
                  item.level === 3
                    ? "ml-4 border-l border-[#E1D6C3] text-slate-500"
                    : "font-medium text-[#0E1B2A]"
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <div className="rounded-[28px] border border-[#D9D0C1] bg-[#07111F] p-6 text-white shadow-[0_16px_38px_rgba(7,17,31,0.22)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C]/12 text-[#D8BE7D]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8BE7D]">
              Trust + Freshness
            </p>
            <p className="mt-2 text-sm leading-7 text-[#D8E0EA]">
              Reviewed for clarity, updated for current LNAT-related guidance,
              and connected to the wider topic hub structure for easier
              research.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-[#DDE4EC]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#9EABB8]">Last reviewed</span>
            <span className="font-medium text-[#F8F5EE]">
              {displayUpdatedAt || "Recently"}
            </span>
          </div>
          {blog.reviewedBy?.name ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9EABB8]">Reviewer</span>
              <span className="text-right font-medium text-[#F8F5EE]">
                {blog.reviewedBy.name}
              </span>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#9EABB8]">Category</span>
            <span className="text-right font-medium text-[#F8F5EE]">
              {blog.category}
            </span>
          </div>
        </div>
      </div>

      <StickyConsultationForm />

      <div className="group relative overflow-hidden rounded-[28px] border border-[#D9D0C1] bg-white p-6 shadow-[0_14px_32px_rgba(20,31,45,0.05)] transition-colors hover:border-[#C9A84C]/40">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#C9A84C]/10 blur-2xl transition-all group-hover:bg-[#C9A84C]/20" />

        <div className="relative z-10">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 text-[#9A7B4F]">
            <Download className="h-4.5 w-4.5" />
          </div>
          <h4 className="mb-1.5 text-base font-semibold text-[#0E1B2A]">
            Free Admissions Checklist
          </h4>
          <p className="mb-4 text-sm leading-7 text-slate-600">
            Use a structured downloadable resource alongside this article when
            you start planning deadlines, prep blocks, and university choices.
          </p>
          <Link
            href="/free-resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#B08D4F] transition-colors hover:text-[#8E6D35]"
          >
            Explore Resources
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <Link
        href={blog.primaryCategorySlug ? `/topics/${blog.primaryCategorySlug}` : "/topics"}
        className="group flex items-center justify-between rounded-[24px] border border-[#D9D0C1] bg-white p-5 shadow-[0_12px_26px_rgba(20,31,45,0.05)] transition-all hover:border-[#C9A84C]/35 hover:bg-[#FCFBF8]"
      >
        <div className="flex items-center gap-3">
          <Compass
            className="h-5 w-5 text-[#9A7B4F] transition-colors group-hover:text-[#C9A84C]"
            strokeWidth={1.7}
          />
          <div>
            <p className="text-sm font-medium text-[#0E1B2A]">
              Continue in the topic hub
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
              Broader context and related articles
            </p>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F3EC] text-[#9A7B4F] transition-all group-hover:bg-[#C9A84C] group-hover:text-[#07111F]">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.aside>
  );
}
