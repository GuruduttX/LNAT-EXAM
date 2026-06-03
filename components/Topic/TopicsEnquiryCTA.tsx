"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

import EnquiryPopupForm from "@/utils/EnquiryForm";

export default function TopicsEnquiryCTA() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <>
      <EnquiryPopupForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        source="topics-page"
      />

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(14,27,42,0.08)_1px,transparent_0)] bg-[size:22px_22px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] border border-[#C9A84C]/20 bg-[linear-gradient(135deg,#081423_0%,#0D1B2D_70%,#14263D_100%)] shadow-[0_24px_70px_rgba(8,20,35,0.2)]"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#C9A84C]/15 blur-3xl" />
          <div className="absolute bottom-0 left-[40%] h-40 w-40 rounded-full bg-[#315178]/30 blur-3xl" />

          <div className="relative grid gap-7 p-6 text-center sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:text-left">
            <div>
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-9 bg-[#C9A84C]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D9C39A]">
                  Admissions Guidance
                </p>
              </div>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#FDFBF5] sm:text-4xl">
                Turn your reading path into a focused LNAT plan
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#C7D2DF] sm:text-base lg:mx-0">
                Not sure which topic to begin with or how to connect your LNAT
                preparation with university shortlisting? Share your goals and
                request structured admissions guidance.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#D7E0EA] lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[#C9A84C]" />
                  Clarify your next preparation step
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
                  Request admissions support
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D8B34F] px-6 py-3.5 text-sm font-semibold text-[#0E1B2A] shadow-[0_12px_30px_rgba(201,168,76,0.22)] transition-colors hover:bg-[#E4C467] focus:outline-none focus:ring-2 focus:ring-[#F6E2A6] focus:ring-offset-2 focus:ring-offset-[#0D1B2D]"
              >
                Request Guidance
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 max-w-xs text-center text-xs leading-5 text-[#A9B6C5] lg:text-right">
                Tell us your target universities and current preparation stage.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
