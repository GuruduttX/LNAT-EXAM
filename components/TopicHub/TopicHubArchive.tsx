"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import type { IBlog } from "@/types/backend.types";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface Category {
  slug: string;
  name: string;
  topicDefinition: string;
}

export type RelatedBlog = Pick<IBlog, "slug" | "title">;

export interface HubCardData {
  category: Category;
  relatedBlogs: RelatedBlog[];
}

interface TopicHubsArchiveProps {
  hubCards?: HubCardData[];
}

// Helper to format category slugs for the pill
const formatCategoryName = (slug: string) => {
  return slug.replace(/-/g, " ");
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function TopicHubsArchive({
  hubCards = [],
}: TopicHubsArchiveProps) {
  // --- Responsive Pagination State ---
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint

    const frameId = requestAnimationFrame(() => {
      setMounted(true);
      handleResize();
    });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Items per page: 4 for Desktop (2x2 grid), 2 for Mobile (1x2 grid)
  const itemsPerPage = !mounted ? 4 : isMobile ? 2 : 4;
  const totalPages = Math.ceil(hubCards.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const frameId = requestAnimationFrame(() => setCurrentPage(totalPages));
      return () => cancelAnimationFrame(frameId);
    }
  }, [totalPages, currentPage]);

  const currentHubs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return hubCards.slice(startIndex, startIndex + itemsPerPage);
  }, [hubCards, currentPage, itemsPerPage]);

  // --- Smart Pagination Logic ---
  const getPageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number" && page !== currentPage) {
      setCurrentPage(page);
      document
        .getElementById("topic-hubs-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!mounted || hubCards.length === 0) return null;

  return (
    <section
      id="topic-hubs-top"
      className="relative w-full bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-20 border-b border-black/[0.05]"
    >
      {/* Subtle Background Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]
        [background-image:radial-gradient(circle,rgba(13,27,62,1)_1px,transparent_1px)]
        [background-size:24px_24px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:mb-14">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Browse By Topic
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] max-w-2xl">
            Explore the part of the{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              LNAT journey
            </span>{" "}
            you need most.
          </h2>
          <p className="max-w-2xl text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
            Some students need exam strategy, others need university research,
            and others need admissions planning. Use these topic pages to stay
            focused and discover related guides more quickly.
          </p>
        </div>

        {/* Hubs Grid with AnimatePresence */}
        <div className="mb-12 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hubs-page-${currentPage}-${isMobile}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
            >
              {currentHubs.map((hub) => (
                <HubCardItem key={hub.category.slug} hub={hub} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center gap-4 border-t border-black/[0.05] pt-8 md:flex-row md:gap-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="group flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold tracking-wide text-[#0D1B3E] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.03]"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {getPageNumbers().map((pageNum, idx) => {
                if (pageNum === "...") {
                  return (
                    <span key={`dots-${idx}`} className="px-2 text-slate-400">
                      ...
                    </span>
                  );
                }
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => handlePageChange(pageNum)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-bold transition-all duration-300 ${
                      isCurrent
                        ? "bg-[#0D1B3E] text-white shadow-md"
                        : "border border-black/[0.06] bg-[#F7F3EC] text-slate-500 hover:border-[#C9A84C]/40 hover:text-[#0D1B3E]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold tracking-wide text-[#0D1B3E] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.03]"
            >
              Next
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-component: HubCardItem
// ─────────────────────────────────────────────────────────────

export function HubCardItem({ hub }: { hub: HubCardData }) {
  const { category, relatedBlogs } = hub;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Top Gold Accent Bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background: "linear-gradient(90deg, #C9A84C, #E8C96A)",
        }}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
              <Compass size={16} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Topic Hub
            </span>
          </div>
          {/* Ghost Meta Tag moved to top to save vertical footer space */}
          <span className="inline-flex items-center rounded-lg bg-[#F7F3EC] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
            #{formatCategoryName(category.slug)}
          </span>
        </div>

        <h3 className="mb-3 text-[20px] font-extrabold leading-tight text-[#0D1B3E]">
          {category.name}
        </h3>

        <p className="mb-6 text-[13px] leading-relaxed text-slate-500">
          {category.topicDefinition}
        </p>

        {/* Inner Box: Popular Guides (Pushes footer down) */}
        <div className="mb-6 flex-1 rounded-xl border border-black/[0.04] bg-[#FDFBF7] p-4">
          <p className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E]">
            <BookOpen size={14} className="text-[#C9A84C]" /> Popular Guides
          </p>

          <div className="flex flex-col gap-1.5">
            {relatedBlogs.slice(0, 3).map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group/link flex items-start justify-between gap-3 rounded-lg p-1.5 transition-colors hover:bg-[#C9A84C]/10"
              >
                <span className="line-clamp-2 text-[13px] font-medium leading-relaxed text-slate-600 transition-colors group-hover/link:text-[#8B6914]">
                  {blog.title}
                </span>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C] transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            ))}
            {relatedBlogs.length === 0 && (
              <p className="text-[12px] italic text-slate-400">
                Guides coming soon...
              </p>
            )}
          </div>
        </div>

        {/* Card Footer: Full-Width Primary Action */}
        <div className="mt-auto pt-2">
          <Link
            href={`/topics/${category.slug}`}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B3E] px-6 py-3.5 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#162447] hover:shadow-md"
          >
            Explore Topic
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}