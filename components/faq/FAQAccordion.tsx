"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, ExternalLink, CalendarCheck } from "lucide-react";

// Matches your CMS schema
export interface FAQItem {
  _id: string;
  category: string;
  question: string;
  answerHtml: string;
  sourceUrl?: string;
  lastReviewedAt?: string;
}

interface FAQCategoryGridProps {
  category: string;
  faqs: FAQItem[];
}

export default function FAQCategoryGrid({
  category,
  faqs,
}: FAQCategoryGridProps) {
  const [selectedFaq, setSelectedFaq] = useState<FAQItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedFaq) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedFaq]);

  if (!faqs.length) return null;

  return (
    <section
      id={`faq-category-${category}`}
      className="md:mx-20 w-full max-w-[1024px] scroll-mt-40 px-4 py-8 sm:px-6 md:py-12"
    >
      {/* Category Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-[24px] w-[4px] rounded-full bg-[#C9A84C]" />
        <h2 className="text-[24px] font-extrabold text-[#0D1B3E]">
          {category}
        </h2>
      </div>

      {/* Responsive Card Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            onClick={() => setSelectedFaq(faq)}
            className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F3EC] text-[#C9A84C] transition-colors group-hover:bg-[#C9A84C] group-hover:text-white">
                <HelpCircle size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-[14px] font-bold leading-snug text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]">
                {faq.question}
              </h3>
            </div>

            {/* =========================================================
                SEO / AEO MAGIC: 
                The answer is injected into the DOM for crawlers & LLMs 
                but is completely invisible to sighted human users.
                ========================================================= */}
            <div
              className="sr-only"
              dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
            />
          </div>
        ))}
      </div>

      {/* =========================================================
          INTERACTIVE UI:
          The Modal Dialog that opens when a user clicks a card.
          ========================================================= */}
      <AnimatePresence mode="wait">
        {selectedFaq && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:py-12">
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedFaq(null)}
              className="absolute inset-0 bg-[#0A1628]/60 backdrop-blur-sm"
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
            >
              {/* Top Accent Bar */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />

              {/* Fixed Header */}
              <div className="flex items-start justify-between border-b border-black/[0.05] px-6 py-5 md:px-8">
                <div className="pr-8">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C]/[0.08] text-[#C9A84C]">
                    <HelpCircle size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] font-bold leading-tight text-[#0D1B3E]">
                    {selectedFaq.question}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedFaq(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-[#0D1B3E] md:right-6 md:top-6"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Answer Content Area */}
              <div className="overflow-y-auto px-6 py-6 md:px-8 [scrollbar-width:thin]">
                {/* CMS HTML Content rendered with our Design System Prose styles */}
                <div
                  className="ds-prose rounded-xl border border-black/[0.05] bg-[#FDFBF7] p-5 md:p-6"
                  dangerouslySetInnerHTML={{ __html: selectedFaq.answerHtml }}
                />

                {/* SOP Trust Signals & Sourcing */}
                {(selectedFaq.sourceUrl || selectedFaq.lastReviewedAt) && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-black/[0.05] bg-white px-5 py-4 shadow-sm">
                    {selectedFaq.lastReviewedAt && (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        <CalendarCheck size={14} className="text-[#C9A84C]" />
                        Last Reviewed:{" "}
                        {new Date(
                          selectedFaq.lastReviewedAt,
                        ).toLocaleDateString("en-GB", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    )}

                    {selectedFaq.sourceUrl && selectedFaq.lastReviewedAt && (
                      <div className="hidden h-4 w-px bg-slate-200 sm:block" />
                    )}

                    {selectedFaq.sourceUrl && (
                      <a
                        href={selectedFaq.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0D1B3E] transition-colors hover:text-[#C9A84C]"
                      >
                        <ExternalLink
                          size={14}
                          className="text-[#C9A84C] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        View Official Source
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Fixed Footer */}
              <div className="flex justify-end border-t border-black/[0.05] bg-[#FDFBF7] px-6 py-4 md:px-8">
                <button
                  onClick={() => setSelectedFaq(null)}
                  className="rounded-xl bg-[#0D1B3E] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#162447]"
                >
                  Close Answer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
