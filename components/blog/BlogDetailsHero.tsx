"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, ShieldCheck } from "lucide-react";

import { IBlog } from "@/types/backend.types";

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

export default function BlogDetailsHero({
  blog,
  breadcrumbItems,
  displayPublishedAt,
  displayUpdatedAt,
}: BlogDetailsHeroProps) {
  const heroImage = blog.heroImage?.url || blog.featuredImage || blog.image;
  const heroAlt = blog.heroImage?.alt || blog.alt || blog.title;

  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
      <div className="absolute inset-x-0 top-0 h-[72%] bg-[#07111F]" />
      <div className="absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.16),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_24%)]" />
      <div className="absolute left-0 right-0 top-[52%] h-40 bg-[linear-gradient(180deg,rgba(7,17,31,0),rgba(247,243,236,1))]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#D9C89A]"
          >
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <div key={`${item.href}-${index}`} className="flex items-center gap-2">
                  {isLast ? (
                    <span className="text-[#F3E8C9]">{item.label}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#FFF6DE]"
                    >
                      {item.label}
                    </Link>
                  )}
                  {!isLast ? <span className="text-[#8B96A5]">/</span> : null}
                </div>
              );
            })}
          </nav>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/25 bg-[#C9A84C]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E9D29B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            {blog.category}
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-[#FDFBF5] sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#C8D1DC] sm:text-lg">
            {blog.excerpt}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#93A0B0]">
                Written By
              </p>
              <p className="mt-2 text-sm font-medium text-[#FDFBF5]">
                {blog.author.name}
              </p>
              {blog.author.role ? (
                <p className="mt-1 text-sm text-[#B9C3D0]">{blog.author.role}</p>
              ) : null}
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#93A0B0]">
                <CalendarDays className="h-3.5 w-3.5 text-[#C9A84C]" />
                Published
              </div>
              <p className="mt-2 text-sm font-medium text-[#FDFBF5]">
                {displayPublishedAt || "Recently updated"}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#93A0B0]">
                <Clock3 className="h-3.5 w-3.5 text-[#C9A84C]" />
                Read Time
              </div>
              <p className="mt-2 text-sm font-medium text-[#FDFBF5]">
                {blog.readTime} min read
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#93A0B0]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" />
                Trust Check
              </div>
              <p className="mt-2 text-sm font-medium text-[#FDFBF5]">
                {blog.reviewedBy?.name || "Editorially reviewed"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-[#D0D8E1] backdrop-blur-sm">
            <div>
              <span className="text-[#97A4B4]">Last updated:</span>{" "}
              <span className="font-medium text-[#FDFBF5]">
                {displayUpdatedAt || "Recently"}
              </span>
            </div>
            {blog.reviewedBy?.name ? (
              <div>
                <span className="text-[#97A4B4]">Reviewed by:</span>{" "}
                <span className="font-medium text-[#FDFBF5]">
                  {blog.reviewedBy.name}
                  {blog.reviewedBy.role ? `, ${blog.reviewedBy.role}` : ""}
                </span>
              </div>
            ) : null}
            {blog.primaryCategorySlug ? (
              <Link
                href={`/topics/${blog.primaryCategorySlug}`}
                className="rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E9D29B] transition-colors hover:bg-[#C9A84C]/15"
              >
                Explore Topic Hub
              </Link>
            ) : null}
          </div>

          {blog.tags.length ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-[#D4DCE5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#C9A84C]/10 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-[#0D1B3E]/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#D8CCB5] bg-[#EFE7D8] shadow-[0_30px_70px_rgba(8,15,25,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#08101D]/65 via-transparent to-transparent" />

            <Image
              src={heroImage}
              alt={heroAlt}
              width={1200}
              height={900}
              className="h-[420px] w-full object-cover object-center"
              priority
            />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-[24px] border border-white/10 bg-[#07111F]/78 p-5 backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D9C89A]">
                  Why this page matters
                </p>
                <p className="mt-2 text-sm leading-7 text-[#D6DEE8]">
                  This guide is designed as a structured starting point for
                  students comparing options, understanding key requirements,
                  and moving deeper into the LNAT topic hub ecosystem.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
