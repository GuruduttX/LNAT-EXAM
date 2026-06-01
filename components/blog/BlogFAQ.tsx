"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MessageCircleQuestion } from "lucide-react";

interface IBlogFAQ {
  question: string;
  answer: string;
}

export default function BlogFAQSection({ faqs }: { faqs?: IBlogFAQ[] }) {
  const [activeFaq, setActiveFaq] = useState<IBlogFAQ | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeFaq) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeFaq]);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16">
      {/* --- Heading Section --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#C9A84C]/40" />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
            Answer Engine Layer
          </span>
        </div>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[#0D1B3E]">
          Frequently Asked Questions
        </h2>
      </div>

      {/* --- FAQ Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <article
            key={index}
            className="group relative flex flex-col rounded-2xl border border-black/[0.07] bg-white transition-all duration-300"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
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
            {/* 1. Visually Hidden Answer for SEO & Screen Readers */}
            <div className="sr-only">{faq.answer}</div>

            {/* 2. Clickable Question Card */}
            <button
              onClick={() => setActiveFaq(faq)}
              className="flex h-full flex-col justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 rounded-2xl"
              aria-label={`Read answer to: ${faq.question}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
                  <MessageCircleQuestion size={14} />
                </div>
                <h3 className="text-[14px] font-bold text-[#0D1B3E] leading-snug md:text-[15px]">
                  {faq.question}
                </h3>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#C9A84C]">
                Read Answer
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* --- 3. Full Answer Modal (Popup) --- */}
      <AnimatePresence>
        {activeFaq && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#0A1628]/60 backdrop-blur-sm"
              onClick={() => setActiveFaq(null)}
            />

            {/* Modal Content */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="faq-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-[0_24px_64px_rgba(13,27,62,0.3)]
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <button
                onClick={() => setActiveFaq(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#0D1B3E]"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>

              <div className="pr-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-px w-6 bg-[#C9A84C]/40" />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#C9A84C]">
                    Answer
                  </span>
                </div>

                <h2
                  id="faq-modal-title"
                  className="mb-6 text-[18px] font-extrabold leading-snug text-[#0D1B3E] md:text-[22px]"
                >
                  {activeFaq.question}
                </h2>

                <div className="text-[14px] leading-[1.8] text-slate-600 md:text-[15px]">
                  {/* Using dangerouslySetInnerHTML in case CMS sends HTML */}
                  <div dangerouslySetInnerHTML={{ __html: activeFaq.answer }} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
