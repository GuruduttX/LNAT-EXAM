"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IBlog } from "@/types/backend.types";
import StickySidebar from "./StickySidebar";
import BlogFAQSection from "./BlogFAQ";
import { ListTree, ChevronDown } from "lucide-react";
import { useState } from "react";
import FAQSection from "../universities/FAQSection";


interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface BlogContentLayoutProps {
  blog: IBlog;
  tocItems: TocItem[];
  displayUpdatedAt: string | null;
}

// Inline SectionLabel component (from DS Section 6.1)
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-[#C9A84C]/40" />
      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
        {text}
      </span>
      {/* Omitted the right line for left-aligned layout */}
    </div>
  );
}

export default function BlogContentLayout({
  blog,
  tocItems,
  displayUpdatedAt,
}: BlogContentLayoutProps) {
  const [isTocOpen, setIsTocOpen] = useState(false);
  return (
    <section className="bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-14 text-[#0D1B3E]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.1,
            }}
            className="mx-auto w-full max-w-3xl lg:mx-0"
          >
            {tocItems.length ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] lg:p-6 mb-4 md:m-5 ">
                {/* 1. Toggle Button Header */}
                <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  aria-expanded={isTocOpen}
                  className="group flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                      <ListTree size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                        On This Page
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-500">
                        Jump to the section you need most.
                      </p>
                    </div>
                  </div>

                  {/* Visual Chevron Indicator */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isTocOpen
                        ? "rotate-180 bg-[#C9A84C] text-white shadow-sm"
                        : "bg-[#C9A84C]/10 text-[#C9A84C] group-hover:bg-[#C9A84C]/20"
                    }`}
                  >
                    <ChevronDown size={16} strokeWidth={2.5} />
                  </div>
                </button>

                {/* 2. Animated Dropdown Content */}
                <AnimatePresence initial={false}>
                  {isTocOpen && (
                    <motion.nav
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.32,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      className="overflow-hidden"
                      aria-label="Table of contents"
                    >
                      <div className="mt-5 flex flex-col gap-1.5 border-t border-black/[0.05] pt-5">
                        {tocItems.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setIsTocOpen(false)} // Closes TOC on click
                            className={`block rounded-xl px-4 py-2.5 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${
                              item.level === 3
                                ? "ml-4 border-l-2 border-black/[0.04] text-slate-500 hover:border-[#C9A84C]/40 hover:bg-[#FDFBF7] hover:text-[#0D1B3E]"
                                : "font-bold text-[#0D1B3E] hover:bg-[#C9A84C]/10 hover:text-[#8B6914]"
                            }`}
                          >
                            {item.text}
                          </a>
                        ))}
                      </div>
                    </motion.nav>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
            {/* 1. Render CMS Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* 2. Sources Section */}
            {blog.sources?.length ? (
              <section className="mt-14 overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                {/* SectionCard Header Bar Pattern */}
                <div
                  className="flex items-center gap-2.5 border-b border-black/[0.05] px-5 py-3.5"
                  style={{ background: "#0D1B3E06" }}
                >
                  <div className="h-[18px] w-[3px] rounded-full bg-[#0D1B3E]" />
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#0D1B3E]">
                    Sources & References
                  </h2>
                </div>

                <div className="p-5 lg:p-7">
                  {/* Alert Box Info Pattern */}
                  <div className="mb-5 flex gap-2.5 rounded-xl border border-[#0D1B3E]/10 bg-[#0D1B3E]/[0.03] p-3 text-[#0D1B3E]">
                    <span className="mt-0.5 shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </span>
                    <span className="text-[12px] leading-relaxed text-slate-500">
                      We use source links to support factual clarity and make
                      this article easier to verify, compare, and cite
                      responsibly.
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {blog.sources.map((source, index) => (
                      <li
                        key={`${source}-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-black/[0.04] bg-[#FDFBF7] px-4 py-3 transition-colors hover:border-[#C9A84C]/30 hover:bg-white"
                      >
                        <div className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                        <a
                          href={source}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all text-[13px] font-medium text-[#C9A84C] underline decoration-[#C9A84C]/30 underline-offset-4 transition-colors hover:text-[#8B6914]"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}

            {/* 3. FAQs Section */}
            <BlogFAQSection faqs={blog.faqs} />
          </motion.article>

          {/* 4. Sidebar */}
          <StickySidebar
            blog={blog}
            tocItems={tocItems}
            displayUpdatedAt={displayUpdatedAt}
          />
        </div>
      </div>
    </section>
  );
}