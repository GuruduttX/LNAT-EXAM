"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { MessageCircle, Mail, ArrowRight, Clock } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";

// Design System: Framer Motion Variants
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

export default function FAQFinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <EnquiryPopupForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="faq-page"
      />
      <section
        ref={ref}
        className="relative w-full bg-[#F7F3EC] px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        {/* Design System: Dot grid texture for the outer section */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50
        bg-[radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        bg-size-[26px_26px]"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#C9A84C]/15 shadow-[0_24px_64px_rgba(13,27,62,0.25)]"
          style={{
            background:
              "linear-gradient(135deg, #0A1628 0%, #0D1B3E 60%, #111D3C 100%)",
          }}
        >
          {/* Ambient Gold Glow inside the dark card */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 -translate-y-1/3"
            style={{
              background:
                "radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center md:px-12 md:py-16 lg:py-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col items-center"
            >
              {/* Avatar Trust Stack (Humanizes the CTA) */}
              <motion.div
                variants={fadeUp}
                className="mb-6 flex items-center justify-center -space-x-3"
              >
                {[
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#0D1B3E] bg-slate-200"
                  >
                    <img
                      src={src}
                      alt="Advisor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0D1B3E] bg-[#C9A84C]/10 text-[10px] font-bold text-[#C9A84C] backdrop-blur-md">
                  +4
                </div>
              </motion.div>

              {/* Design System Eyebrow */}
              <motion.div
                variants={fadeUp}
                className="mb-4 flex items-center justify-center gap-3"
              >
                <div className="h-px w-6 bg-[#C9A84C]/40" />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  Still Have Questions?
                </p>
                <div className="h-px w-6 bg-[#C9A84C]/40" />
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(1.5rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-white max-w-2xl"
              >
                Get direct answers from our{" "}
                <span className="bg-linear-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                  Admissions Experts
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-white/70"
              >
                Stop guessing your way through the UK law school application
                process. Speak directly with our advisors for personalized
                strategies, LNAT prep guidance, and university shortlisting.
              </motion.p>

              {/* Buttons Layout */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
              >
                {/* Primary Action: Lead Form */}
                <button
                  onClick={() => setIsOpen(true)} // Replace with your contact/query route
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
                  }}
                >
                  <Mail size={16} />
                  Ask a Question
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                {/* Secondary Action: WhatsApp (With Live Indicator) */}
                <a
                  href="https://wa.me/9479982443" // Replace with actual WhatsApp link
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/8 px-7 py-4 text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:scale-[0.98] sm:w-auto"
                >
                  <MessageCircle size={16} className="text-[#C9A84C]" />
                  WhatsApp Chat
                  {/* Live Online Indicator */}
                  <span className="absolute right-4 top-1/2 flex h-2 w-2 -translate-y-1/2 items-center justify-center sm:right-3 sm:-top-1 sm:translate-y-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  </span>
                </a>
              </motion.div>

              {/* Trust Footer */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center justify-center gap-2 text-[11px] font-semibold text-white/40"
              >
                <Clock size={14} className="text-[#C9A84C]" />
                <span>Experts online — Average response time &lt; 2 hours</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
