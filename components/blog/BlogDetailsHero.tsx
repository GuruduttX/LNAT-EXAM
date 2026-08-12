"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  User,
  CheckCircle2,
  ListRestart,
} from "lucide-react";

import { IBlog } from "@/types/backend.types";

import StickyConsultationForm from "./StickyConsultationForm";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BlogDetailsHeroProps {
  blog: IBlog;
  breadcrumbItems: BreadcrumbItem[];
  displayPublishedAt: string | null;
  displayUpdatedAt: string | null;
}
// ─────────────────────────────────────────────────────────────
// Subcomponent: BlogBreadcrumbs
// ─────────────────────────────────────────────────────────────

function BlogBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 flex flex-wrap items-center justify-center gap-2 lg:mb-6 lg:justify-start"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div
            key={`${item.href}-${index}`}
            className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] md:text-[10px]"
          >
            {isLast ? (
              <span className="text-[#C9A84C] text-center">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-400 transition-colors hover:text-[#0D1B3E]"
              >
                {item.label}
              </Link>
            )}
            {!isLast && <span className="text-slate-300">/</span>}
          </div>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponent: BlogHeroMeta
// ─────────────────────────────────────────────────────────────

function BlogHeroMeta({ blog }: { blog: IBlog }) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
        {blog.category}
      </div>

      {/* Design System Hero Heading Sizing */}
      <h1 className="mb-4 text-[clamp(1.9rem,4.8vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight text-[#0D1B3E] lg:mb-6">
        {blog.title}
      </h1>

      <p className="max-w-xl text-[14px] leading-relaxed text-slate-600 sm:text-[15px] lg:max-w-2xl lg:text-[16px]">
        {blog.excerpt}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponent: BlogTrustStrip (E-E-A-T)
// ─────────────────────────────────────────────────────────────

function BlogTrustStrip({
  blog,
  publishedAt,
  updatedAt,
}: {
  blog: IBlog;
  publishedAt: string | null;
  updatedAt: string | null;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center md:gap-5 rounded-2xl border border-black/[0.07] bg-white p-3 shadow-sm md:flex-row md:flex-wrap md:justify-start lg:gap-6">
      <div className="flex justify-around gap-5">
        {/* Author */}
        <div className="flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3EC] text-[#0D1B3E]">
            <User size={16} />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Written By
            </p>
            <p className="text-[13px] font-bold text-[#0D1B3E]">
              {blog.author.name}
            </p>
          </div>
        </div>

      </div>

      <div className="hidden h-8 w-px bg-slate-200 lg:block" />

      {/* Dates & Time (Grouped & Centered for Mobile) */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-t border-black/[0.05] pt-4 md:mt-0 md:justify-start md:border-none md:pt-0">
        <div className="text-center md:text-left">
          <p className="flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 md:justify-start">
            <CalendarDays size={12} /> Published
          </p>
          <p className="mt-0.5 text-[12px] font-medium text-slate-700">
            {publishedAt || "Recently"}
          </p>
        </div>

        {updatedAt && (
          <div className="text-center md:text-left">
            <p className="flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 md:justify-start">
              <ListRestart size={12} /> Updated
            </p>
            <p className="mt-0.5 text-[12px] font-medium text-slate-700">
              {updatedAt}
            </p>
          </div>
        )}

        <div className="text-center md:text-left">
          <p className="flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 md:justify-start">
            <Clock3 size={12} /> Read Time
          </p>
          <p className="mt-0.5 text-[12px] font-medium text-[#0D1B3E]">
            {blog.readTime} min
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponent: BlogHeroImage
// ─────────────────────────────────────────────────────────────

function BlogHeroImage({ blog }: { blog: IBlog }) {
  const src = (blog.heroImage as any)?.url || blog.featuredImage || blog.image;
  const alt = (blog.heroImage as any)?.alt || blog.alt || blog.title;
  const caption = (blog.heroImage as any)?.caption;

  return (
    <figure className="relative h-full w-full">
      <div className="relative mx-auto aspect-1220/820 w-full max-w-[500px] overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_16px_40px_rgba(13,27,62,0.08)] lg:max-w-none lg:aspect-1220/820 xl:aspect-1220/820">
        <Image
          src={src}
          alt={alt}
          width={1220}
          height={820}
          priority // LCP Image
          className="h-full w-full object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[11px] text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─────────────────────────────────────────────────────────────
// Subcomponent: BlogTldrSection
// ─────────────────────────────────────────────────────────────

// CMS data sometimes already includes a leading "•"/"-"/"*" on each takeaway;
// strip it so it doesn't double up with the bullet dot we render ourselves.
function stripLeadingBullet(text: string) {
  return text.replace(/^[\s]*[•\-\*]\s*/, "");
}

function BlogTldrSection({
  tldr,
  keyTakeaways,
}: {
  tldr?: string;
  keyTakeaways?: string[];
}) {
  if (!tldr && (!keyTakeaways || keyTakeaways.length === 0)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="mt-10 rounded-3xl border border-[#C9A84C]/20 bg-[#FDFBF7] p-5 shadow-sm md:p-6 lg:mt-14"
    >
      <div className="mb-4 flex flex-col items-center justify-center gap-3 border-b border-black/[0.05] pb-4 text-center sm:flex-row sm:justify-start sm:text-left">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <h2 className="text-[16px] font-bold text-[#0D1B3E] md:text-[18px]">
            Quick Summary
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            TL;DR & Key Takeaways
          </p>
        </div>
      </div>

      {/* TL;DR on top, key takeaways below */}
      <div className="flex flex-col gap-5">
        {tldr && (
          <p className="text-[14px] text-center md:text-start font-medium leading-[1.7] text-slate-700 md:text-[15px]">
            {tldr}
          </p>
        )}

        {keyTakeaways && keyTakeaways.length > 0 && (
          <div>
            <h3 className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Takeaways
            </h3>

            {/* Plain bullet list — every takeaway is visible at once, one column
                on mobile and two from md up. */}
            <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
              {keyTakeaways.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-slate-700 md:text-[14px]"
                >
                  <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                  <span>{stripLeadingBullet(point)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Layout: BlogDetailsHero
// ─────────────────────────────────────────────────────────────

export default function BlogDetailsHero({
  blog,
  breadcrumbItems,
  displayPublishedAt,
  displayUpdatedAt,
}: BlogDetailsHeroProps) {
  return (
    <header className="relative w-full border-b border-black/[0.05] bg-[#F7F3EC] px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:20px_20px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* 
          Smart Responsive Grid:
          Mobile: flex-col with order-1 (Meta), order-2 (Image), order-3 (TrustStrip).
          Desktop: 12-column grid.
        */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          {/* 1. Meta (Top on Mobile, Left on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex w-full flex-col lg:col-span-7 lg:col-start-1 lg:row-start-1"
          >
            <BlogBreadcrumbs items={breadcrumbItems} />
            <BlogHeroMeta blog={blog} />
          </motion.div>

          {/* 2. Image (Middle on Mobile, Right on Desktop spanning 2 rows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 w-full lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1"
          >
            <BlogHeroImage blog={blog} />
          </motion.div>

          {/* 3. Trust Strip & Tags (Bottom on Mobile, Left on Desktop under Meta) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-3 flex w-full flex-col items-center lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:items-start"
          >
            <BlogTrustStrip
              blog={blog}
              publishedAt={displayPublishedAt}
              updatedAt={displayUpdatedAt}
            />

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-black/[0.04] bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Consultation form — below lg the sidebar stacks far down the page,
            so the form is surfaced here instead, ahead of the Quick Summary.
            The lg+ copy lives in StickySidebar and is unchanged. */}
        <div className="mt-10 lg:hidden">
          <StickyConsultationForm />
        </div>

        {/* TL;DR Section */}
        <BlogTldrSection tldr={blog.tldr} keyTakeaways={blog.keyTakeaways} />
      </div>
    </header>
  );
}
