"use client";

import { useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

import EnquiryPopupForm from "@/utils/EnquiryForm";

export default function AboutCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EnquiryPopupForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="about-page"
      />

      <section className="relative overflow-hidden bg-[#0D1B3E] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.16),transparent_62%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <SectionLabel text="Admissions Guidance" />
          <h2 className="max-w-3xl text-[clamp(1.5rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-white">
            Have a question about your LNAT preparation?
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/65">
            Share your goals and questions. Our team will help you identify a
            sensible next step for your preparation and university research.
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group mt-8 inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
              boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
            }}
          >
            <Mail size={16} />
            Request Guidance
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <div className="mt-6 flex items-center gap-2 text-[11px] font-medium text-white/45">
            <ShieldCheck size={14} className="text-[#C9A84C]" />
            Your enquiry is shared only with the admissions guidance team.
          </div>
        </div>
      </section>
    </>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-8 bg-[#C9A84C]/50" />
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
        {text}
      </span>
      <div className="h-px w-8 bg-[#C9A84C]/50" />
    </div>
  );
}
