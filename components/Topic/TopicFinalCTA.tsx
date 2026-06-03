"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import EnquiryPopupForm from "@/utils/EnquiryForm";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
  /\D/g,
  "",
);

const whatsappMessage = encodeURIComponent(
  "Hi, I read an LNAT topic guide and want to start my elite law admissions journey.",
);

const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  : "#";

export default function TopicFinalCTA() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const hasWhatsappNumber = Boolean(whatsappNumber);

  return (
    <>
      <EnquiryPopupForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        source="topics-page"
      />

      <section
        ref={ref}
        className="relative overflow-hidden bg-[#F7F3EC] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      >
        <div
          className="pointer-events-none absolute inset-0
            [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
            [background-size:26px_26px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] border border-[#C9A84C]/20 bg-[linear-gradient(135deg,#081423_0%,#0D1B3E_66%,#14263D_100%)] shadow-[0_24px_70px_rgba(8,20,35,0.2)]"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#C9A84C]/15 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#315178]/35 blur-3xl" />

          <div className="relative grid gap-7 p-6 text-center sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-10 lg:text-left">
            <div>
              <div className="flex items-center gap-3 justify-start">
                <span className="h-px w-9 bg-[#C9A84C]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D9C39A]">
                  Next Step
                </p>
              </div>

              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#FDFBF5] sm:text-4xl">
                Ready to start your{" "}
                <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                  elite law journey?
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#C7D2DF] sm:text-base lg:mx-0">
                You have explored the topic. Now turn that reading into a
                focused LNAT preparation and university admissions plan with
                expert guidance.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#D7E0EA] lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C9A84C]" />
                  Personal next-step guidance
                </span>
                <span className="inline-flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#C9A84C]" />
                  LNAT + law admissions strategy
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
                  Enquiry saved in CMS
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#D8B34F] px-6 py-3.5 text-sm font-bold text-[#0E1B2A] shadow-[0_12px_30px_rgba(201,168,76,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#E4C467] focus:outline-none focus:ring-2 focus:ring-[#F6E2A6] focus:ring-offset-2 focus:ring-offset-[#0D1B2D]"
              >
                Open Enquiry Form
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={whatsappHref}
                target={hasWhatsappNumber ? "_blank" : undefined}
                rel={hasWhatsappNumber ? "noreferrer" : undefined}
                aria-disabled={!hasWhatsappNumber}
                className={`group relative inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/[0.1] ${
                  hasWhatsappNumber
                    ? "hover:-translate-y-0.5"
                    : "cursor-not-allowed opacity-55"
                }`}
                onClick={(event) => {
                  if (!hasWhatsappNumber) {
                    event.preventDefault();
                  }
                }}
              >
                <MessageCircle className="h-4 w-4 text-[#C9A84C]" />
                WhatsApp Us
                {hasWhatsappNumber ? (
                  <span className="absolute right-4 top-1/2 flex h-2 w-2 -translate-y-1/2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                ) : null}
              </a>

              {!hasWhatsappNumber ? (
                <p className="text-center text-[11px] leading-5 text-white/40">
                  Add `NEXT_PUBLIC_WHATSAPP_NUMBER` to enable WhatsApp.
                </p>
              ) : (
                <p className="text-center text-[11px] leading-5 text-white/40">
                  Share your target universities and current prep stage.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
