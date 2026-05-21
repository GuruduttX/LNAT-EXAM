import React from "react";

export default function PatternOverview() {
  return (
    <section className="w-full bg-[#FDFBF7] py-16 md:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Editorial Kicker */}
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-8 bg-[#C4A47C]/60"></span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#C4A47C]">
            Assessment Architecture
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F172A] tracking-tight leading-tight mb-8">
          A Dual-Component Evaluation
        </h2>

        {/* Introductory Paragraph */}
        <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-12 md:mb-16">
          The Law National Aptitude Test is meticulously structured into two
          distinct, yet complementary sections. Rather than testing
          subject-matter knowledge, this dual-format approach provides
          admissions tutors with a comprehensive diagnostic of both your
          analytical processing speed and your capacity for sustained,
          persuasive argumentation.
        </p>

        {/* Conceptual Breakdown Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t border-[#0F172A]/10 pt-12">
          {/* Concept 1: Objective Reasoning */}
          <div className="relative">
            {/* Subtle numbering/accent */}
            <span className="absolute -top-6 left-0 text-4xl font-serif text-[#0F172A]/5 pointer-events-none">
              01
            </span>
            <h3 className="text-xl font-serif text-[#0F172A] mb-3">
              Objective Reasoning
            </h3>
            <p className="text-base text-slate-600 leading-loose font-light">
              The first phase demands rapid, critical engagement with dense
              texts. It evaluates your ability to filter noise, deduce logic,
              and extract precise meaning from complex academic prose through
              rigorous multiple-choice questions.
            </p>
          </div>

          {/* Concept 2: Constructed Argumentation */}
          <div className="relative">
            <span className="absolute -top-6 left-0 text-4xl font-serif text-[#0F172A]/5 pointer-events-none">
              02
            </span>
            <h3 className="text-xl font-serif text-[#0F172A] mb-3">
              Constructive Argumentation
            </h3>
            <p className="text-base text-slate-600 leading-loose font-light">
              The second phase shifts from reception to production. Under strict
              time constraints, you must formulate, structure, and defend a
              compelling perspective on an unfamiliar topic, demonstrating your
              potential for rigorous legal writing.
            </p>
          </div>

          {/* Concept 3: Holistic Application (Spans full width on desktop) */}
          <div className="relative md:col-span-2 md:w-3/4 md:pr-8 pt-4">
            <h3 className="text-lg font-medium text-[#0F172A] mb-2 uppercase tracking-wide">
              Holistic Admissions Usage
            </h3>
            <p className="text-base text-slate-500 leading-relaxed font-light">
              While the multiple-choice section generates a standardized
              numerical score used for initial benchmarking, the essay component
              is un-scored by the LNAT consortium. Instead, it is forwarded
              directly to university admissions officers to be assessed
              qualitatively alongside your personal statement and academic
              transcripts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
