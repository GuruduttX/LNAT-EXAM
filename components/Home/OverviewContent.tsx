import React from "react";

// --- Types & Data ---

interface ContentSection {
  id: string;
  title: string;
  content: string;
  isHighlight?: boolean;
}

const overviewData: ContentSection[] = [
  {
    id: "what-is-lnat",
    title: "What is the LNAT?",
    content:
      "The Law National Aptitude Test (LNAT) is a standardized admissions assessment utilized by a consortium of leading universities. It is not designed to test your knowledge of law or any other specific subject. Instead, it measures your aptitude for the core skills required to study law at the highest academic level.",
  },
  {
    id: "why-important",
    title: "Why is the LNAT Important?",
    content:
      "With top-tier law schools receiving thousands of applications from candidates with exceptional academic transcripts (A-levels, IB, or equivalent), grades alone are often insufficient to differentiate the most capable students. The LNAT provides admissions tutors with an objective, standardized metric to assess a candidate's underlying intellectual potential and critical thinking capacity.",
  },
  {
    id: "who-should-take",
    title: "Who Should Take the LNAT?",
    content:
      "Any student intending to apply for an undergraduate law degree (such as the LLB) at a participating university must take the LNAT. This requirement applies uniformly to domestic, EU, and international applicants. It must be taken in the academic year immediately preceding the intended year of university entry.",
  },
  {
    id: "skills-evaluated",
    title: "Core Skills Evaluated",
    content:
      "The assessment rigorously evaluates your ability to manage complex information under time pressure. Admissions committees look for exceptional proficiency in verbal reasoning, the ability to synthesize dense textual information, and the capacity to construct compelling, logically sound arguments while identifying flaws in the reasoning of others.",
    isHighlight: true,
  },
];

// --- Components ---

export default function OverviewContent() {
  return (
    <article className="w-full bg-[#FDFBF7]  md:py-24 px-0 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Editorial Intro / Header */}
        <header className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-[#C4A47C]/60"></span>
            <span className="text-sm font-medium tracking-widest md:tracking-[0.2em] uppercase text-[#C4A47C]">
              Comprehensive Guide
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F172A] tracking-tight leading-tight mb-6">
            Understanding the Foundation of Legal Admissions
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            A precise overview of the Law National Aptitude Test, its structural
            methodology, and its critical role in the selection processes of the
            world’s elite academic institutions.
          </p>
        </header>

        {/* Content Blocks */}
        <div className="space-y-0 md:space-y-16">
          {overviewData.map((section) => (
            <section key={section.id} className="relative">
              {section.isHighlight ? (
                // Highlighted section (e.g., Skills Evaluated)
                <div className="p-8 md:p-10 bg-white border border-[#0F172A]/5 rounded-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#C4A47C]"></div>
                  <h2 className="text-xl md:text-2xl font-serif text-[#0F172A] mb-4">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed md:leading-loose">
                    {section.content}
                  </p>
                </div>
              ) : (
                // Standard editorial section
                <div className="group">
                  <h2 className="text-xl md:text-2xl font-serif text-[#0F172A] mb-4 group-hover:text-[#C4A47C] transition-colors duration-300">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed md:leading-loose">
                    {section.content}
                  </p>
                </div>
              )}

              {/* Subtle divider after each section except the last, unless it's followed by a highlight block */}
              {!section.isHighlight &&
                section.id !== overviewData[overviewData.length - 1].id && (
                  <div className="mt-12 w-full h-[1px] bg-slate-200/60"></div>
                )}
            </section>
          ))}
        </div>

        {/* Footer Note / Authoritative closing */}
        <footer className="mt-10 md:mt-20 md:pt-8 border-t border-[#0F172A]/10">
          <p className="text-sm text-slate-500 italic text-center">
            Information aligned with the official LNAT Consortium guidelines.
          </p>
        </footer>
      </div>
    </article>
  );
}
