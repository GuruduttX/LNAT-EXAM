"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import { X, HelpCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems?: FAQItem[];
  eyebrow?: string;
  heading?: string;
  highlightedHeading?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FAQSection({
  faqItems,
  eyebrow = "FAQ",
  heading = "Common questions when comparing",
  highlightedHeading = "LNAT universities",
}: FAQSectionProps) {
  const [activeFaq, setActiveFaq] = useState<FAQItem | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const visibleFaqItems = faqItems || [];

  // Prevent background scrolling when modal is open
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

  if (!visibleFaqItems.length) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="border-t border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header Area */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 flex items-center justify-center gap-3 md:justify-start"
          >
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              {eyebrow}
            </p>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start max-w-3xl"
          >
            {heading}{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              {highlightedHeading}
            </span>
          </motion.h2>
        </motion.div>

        {/* Question Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10"
        >
          {visibleFaqItems.map((item, index) => (
            <motion.button
              key={index}
              variants={fadeUp}
              onClick={() => setActiveFaq(item)}
              className="group flex flex-col items-start justify-between rounded-2xl border border-black/[0.07] bg-white p-5 text-left shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
                  <HelpCircle size={14} strokeWidth={2.5} />
                </div>
                <span className="text-[14px] font-bold leading-relaxed text-[#0D1B3E]">
                  {item.question}
                </span>
              </div>
              <div className="ml-9 mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 transition-colors duration-200 group-hover:text-[#C9A84C]">
                Read answer
                <ArrowRight
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Popup Modal with Backdrop */}
      <AnimatePresence mode="wait">
        {activeFaq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop Layer */}
            <motion.div
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setActiveFaq(null)}
              className="absolute inset-0 bg-[#0A1628]/40 backdrop-blur-sm"
            />

            {/* Modal Content Card */}
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              {/* Decorative Top Bar */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />

              <div className="p-6 md:p-8">
                {/* Close Button */}
                <button
                  onClick={() => setActiveFaq(null)}
                  className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0D1B3E]"
                >
                  <X size={16} />
                </button>

                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D1B3E] text-[#C9A84C]">
                    <HelpCircle size={16} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Question & Answer
                  </span>
                </div>

                <h3 className="mb-4 text-[18px] font-bold leading-tight text-[#0D1B3E]">
                  {activeFaq.question}
                </h3>

                <div className="h-px w-full bg-black/[0.05] mb-4" />

                <p className="text-[14px] leading-relaxed text-slate-600">
                  {activeFaq.answer}
                </p>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setActiveFaq(null)}
                    className="rounded-xl border border-black/[0.07] bg-[#F7F3EC] px-5 py-2 text-[12px] font-bold text-[#0D1B3E] transition-colors hover:bg-black/[0.03]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
