"use client";

import { motion } from "framer-motion";
import { IBlog } from "@/types/backend.types";
import StickySidebar from "./StickySidebar";
import BlogFAQSection from "./BlogFAQ";
import { ListTree } from "lucide-react";
import FAQSection from "../universities/FAQSection";


interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TocGroup {
  item: TocItem;
  children: TocItem[];
}

interface BlogContentLayoutProps {
  blog: IBlog;
  tocItems: TocItem[];
  displayUpdatedAt: string | null;
}

// Groups flat TOC items into level-2 sections with nested level-3 children,
// so headings can be numbered 1, 2, 3… with sub-items as i, ii, iii…
function groupTocItems(items: TocItem[]): TocGroup[] {
  const groups: TocGroup[] = [];
  items.forEach((item) => {
    if (item.level === 2 || groups.length === 0) {
      groups.push({ item, children: [] });
    } else {
      groups[groups.length - 1].children.push(item);
    }
  });
  return groups;
}

const ROMAN_NUMERALS = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
  "xiii",
  "xiv",
  "xv",
];

function toRoman(index: number): string {
  return ROMAN_NUMERALS[index] ?? `${index + 1}`;
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
  const tocGroups = groupTocItems(tocItems);

  const scrollToHeading = (id: string) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    const navbarOffset = 112;
    const top =
      heading.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

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
            {tocGroups.length ? (
              <div className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-4 md:m-5">
                <div className="mb-3 flex items-center gap-2">
                  <ListTree size={18} strokeWidth={2} className="text-[#C9A84C]" />
                  <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#C9A84C]">
                    On This Page
                  </p>
                </div>

                <ol className="flex flex-col gap-0.5 text-[13px]">
                  {tocGroups.map((group, groupIndex) => (
                    <li key={group.item.id}>
                      <a
                        href={`#${group.item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToHeading(group.item.id);
                        }}
                        className="flex items-baseline gap-2 rounded-lg px-2 py-1.5 font-bold text-[#0D1B3E] transition-colors hover:bg-[#C9A84C]/10 hover:text-[#8B6914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                      >
                        <span className="shrink-0 text-[#C9A84C]">
                          {groupIndex + 1}.
                        </span>
                        <span>{group.item.text}</span>
                      </a>

                      {group.children.length > 0 && (
                        <ol className="ml-6 flex flex-col gap-0.5">
                          {group.children.map((child, childIndex) => (
                            <li key={child.id}>
                              <a
                                href={`#${child.id}`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  scrollToHeading(child.id);
                                }}
                                className="flex items-baseline gap-2 rounded-lg px-2 py-1 text-slate-500 transition-colors hover:bg-[#FDFBF7] hover:text-[#0D1B3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                              >
                                <span className="shrink-0 text-slate-400">
                                  {toRoman(childIndex)}.
                                </span>
                                <span>{child.text}</span>
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
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
