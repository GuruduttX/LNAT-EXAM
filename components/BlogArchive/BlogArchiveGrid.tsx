"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { IBlog } from "@/types/backend.types";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────



interface BlogArchiveGridProps {
  blogs: IBlog[];
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function BlogArchiveGrid({ blogs }: BlogArchiveGridProps) {
  // --- Responsive Pagination State ---
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);





  // Handle hydration and window resize
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recalculate items per page based on screen size
  // Default to 6 for Server Side Rendering, then switch immediately if mobile
  const itemsPerPage = !mounted ? 6 : isMobile ? 2 : 6;
  const totalPages = Math.ceil((blogs?.length || 0) / itemsPerPage);

  // Ensure current page doesn't exceed total pages if screen size changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return blogs.slice(startIndex, startIndex + itemsPerPage);
  }, [blogs, currentPage, itemsPerPage]);

  // --- Pagination Logic (Smart Array Generator) ---
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
      // Smooth scroll back to the top of the grid
      document
        .getElementById("blog-grid-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Prevent hydration mismatch flashes
  if (!mounted) return null;

  return (
    <section
      id="blog-grid-top"
      className="w-full bg-[#FDFBF7] px-4 py-12 sm:px-6 lg:px-8 lg:py-20 border-b border-black/[0.05]"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:mb-14">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Start Here
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] max-w-2xl">
            Start with our most important guides
          </h2>
          <p className="max-w-2xl text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
            If you are new to the LNAT, begin here. These articles give you the
            clearest overview of the exam, the admissions context, and how to
            structure your preparation.
          </p>
        </div>

        {/* Blog Grid with AnimatePresence for smooth page transitions */}
        <div className="mb-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`page-${currentPage}-${isMobile}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center gap-4 border-t border-black/[0.05] pt-8 md:flex-row md:gap-8">
            {/* Previous Button */}
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

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
              {getPageNumbers().map((pageNum, idx) => {
                const isCurrent = pageNum === currentPage;
                const isDots = pageNum === "...";

                if (isDots) {
                  return (
                    <span key={`dots-${idx}`} className="px-2 text-slate-400">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => handlePageChange(pageNum)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-bold transition-all duration-300 ${
                      isCurrent
                        ? "bg-[#0D1B3E] text-white shadow-md"
                        : "border border-black/[0.06] bg-white text-slate-500 hover:border-[#C9A84C]/40 hover:text-[#0D1B3E]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
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
// Sub-component: BlogCard
// ─────────────────────────────────────────────────────────────

function BlogCard({ blog }: { blog: IBlog }) {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short", // Use "long" for "May", "short" for "May", "narrow" for "M"
        year: "numeric", // Optional: Remove this line if you strictly only want Date & Month
      });
    };
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_16px_40px_rgba(13,27,62,0.06)]">
      {/* Image Container */}
      <Link
        href={`/blog/${blog.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0D1B3E]/5"
      >
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-[#0A1628] to-[#162447]">
            <span className="text-[40px] font-serif text-white/10">LNAT</span>
          </div>
        )}

        {/* Floating Category Pill */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E] backdrop-blur-md shadow-sm">
          {blog.category}
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Meta Info */}
        <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold tracking-wider text-slate-400">
          <span className="uppercase">{formatDate(blog.publishedAt)}</span>
          <span className="h-1 w-1 rounded-full bg-[#C9A84C]/50" />
          <span className="flex items-center gap-1.5 uppercase">
            <Clock size={12} className="text-[#C9A84C]" />
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="mb-3 block outline-none">
          <h3 className="line-clamp-2 text-[18px] font-bold leading-snug text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-6 line-clamp-3 text-[13px] leading-relaxed text-slate-500">
          {blog.excerpt}
        </p>

        {/* Read More Link (Pushed to bottom) */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]"
        >
          Read Article
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
