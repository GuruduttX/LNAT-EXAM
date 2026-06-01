"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  X,
  MapPin,
  Globe2,
  GraduationCap,
  Clock,
} from "lucide-react";

// Simplified type for the component props
interface UniversityOverviewProps {
  university: any; // Replace with your exact Mongoose Schema Type
}

// Design System Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
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

export default function UniversityOverview({
  university,
}: UniversityOverviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section
      ref={ref}
      className="relative w-full border-b border-black/[0.07] bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8 text-center md:text-start"
    >
      {/* Design System: Dot grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8"
        >
          <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              Overview
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </div>
          <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
            University Profile
          </h2>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* LEFT: CMS Content with Fade Out */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            <div className="relative overflow-hidden">
              {/* Max-height wrapper. Adjust 300px based on how much you want to show initially */}
              <div
                className="ds-prose max-h-[280px] w-full"
                dangerouslySetInnerHTML={{ __html: university.overview }}
              />

              {/* Fade out gradient mask over the text */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F3EC] to-transparent" />
            </div>

            {/* Read More Button */}
            <div className="mt-2 flex justify-center md:justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-bold text-[#0D1B3E] shadow-sm transition-all duration-300 hover:shadow-md hover:text-[#C9A84C] border border-black/[0.07]"
              >
                Read full overview
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Key Facts Sidebar */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="h-fit rounded-2xl border border-black/[0.07] bg-white shadow-sm transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
          >
            {/* Header Bar */}
            <div className="flex items-center gap-2 border-b border-black/[0.05] bg-[#0D1B3E]/[0.03] px-5 py-4">
              <div className="h-[14px] w-[3px] rounded-full bg-[#0D1B3E]" />
              <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#0D1B3E]">
                Key Facts
              </h3>
            </div>

            {/* Fact List */}
            <div className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-4 border-b border-black/[0.05] py-3 first:pt-0">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                  <MapPin size={14} className="text-[#C9A84C]" />
                  Location
                </div>
                <div className="text-right text-[13px] font-medium text-[#0D1B3E] max-w-[60%]">
                  {university.locationLabel ||
                    `${university.location}, ${university.country}`}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-black/[0.05] py-3">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                  <GraduationCap size={14} className="text-[#C9A84C]" />
                  LNAT Required
                </div>
                <div className="text-right text-[13px] font-bold text-[#C9A84C]">
                  {university.lnatRequirement}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-black/[0.05] py-3">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                  <Clock size={14} className="text-[#C9A84C]" />
                  Duration
                </div>
                <div className="text-right text-[13px] font-medium text-[#0D1B3E]">
                  {university.courseDuration || "Check official page"}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 py-3 pb-1">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                  <Globe2 size={14} className="text-[#C9A84C]" />
                  Website
                </div>
                <div className="text-right text-[13px] font-medium">
                  {university.officialWebsite ? (
                    <a
                      href={university.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#0D1B3E] transition-colors hover:text-[#C9A84C] underline decoration-[#C9A84C]/40 underline-offset-4"
                    >
                      Visit site
                    </a>
                  ) : (
                    <span className="text-slate-400">Not added</span>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* =========================================
          MODAL: FULL OVERVIEW CONTENT
          ========================================= */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:py-12">
            {/* Backdrop Layer */}
            <motion.div
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0A1628]/50 backdrop-blur-sm"
            />

            {/* Modal Content Window */}
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative z-10 flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
            >
              {/* Fixed Header */}
              <div className="flex items-center justify-between border-b border-black/[0.07] px-6 py-5">
                <div>
                  <h3 className="text-[18px] font-bold text-[#0D1B3E]">
                    University Overview
                  </h3>
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] mt-1">
                    {university.name}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0D1B3E]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto px-6 py-6 md:px-10 md:py-8 [scrollbar-width:thin]">
                <div
                  className="ds-prose"
                  dangerouslySetInnerHTML={{ __html: university.overview }}
                />
              </div>

              {/* Fixed Footer */}
              <div className="border-t border-black/[0.05] bg-[#FDFBF7] px-6 py-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-[#0D1B3E] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#162447]"
                >
                  Close overview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
