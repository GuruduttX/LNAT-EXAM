import React from "react";

export default function BlogArchiveHeader() {
  return (
    <header className="flex flex-col items-start gap-4">
      {/* Premium Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#C4A47C]/10 border border-[#C4A47C]/20">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A47C]">
          Knowledge Base
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F172A] leading-[1.15] tracking-tight">
        LNAT Insights &amp; <br className="hidden sm:block" />
        <span className="italic font-light text-[#C4A47C]">
          Editorial Guides.
        </span>
      </h2>

      <p className="text-sm md:text-base text-slate-500 font-light max-w-xl leading-relaxed mt-2">
        Curated preparation resources, comprehensive admissions insights, and
        expert advice tailored for applicants targeting elite UK law schools.
      </p>
    </header>
  );
}
