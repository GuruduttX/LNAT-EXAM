import React from "react";
import { Info, AlertCircle, CalendarClock, GraduationCap } from "lucide-react";

// --- Types & Data ---

interface AdvisoryNote {
  id: string;
  title: string;
  content: string;
  icon: React.ElementType;
}

const advisoryNotes: AdvisoryNote[] = [
  {
    id: "early-registration",
    title: "Secure Your Test Center Early",
    content:
      "LNAT testing centers in India (managed by Pearson VUE) have limited capacity. We strongly advise registering immediately upon the August 1st opening to secure your preferred date and location, especially for major metropolitan centers.",
    icon: CalendarClock,
  },
  {
    id: "oxbridge-variance",
    title: "The Oxford & Cambridge Exception",
    content:
      "If you are applying to the University of Oxford or the University of Cambridge, your timeline is significantly accelerated. You must sit the LNAT on or before October 15th to be considered for admission.",
    icon: GraduationCap,
  },
  {
    id: "one-sitting",
    title: "Single Testing Cycle Limit",
    content:
      "Candidates are strictly permitted to sit the LNAT only once per academic admissions cycle (September to July). If you are unsatisfied with your performance, you may only retake the assessment in the following academic year.",
    icon: AlertCircle,
  },
];

// --- Component ---

export default function TimelineNotes() {
  return (
    <div className="w-full bg-[#FDFBF7] py-12 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto border border-[#0F172A]/10 rounded-2xl bg-white p-8 md:p-12 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full opacity-50 pointer-events-none"></div>

        {/* Section Header */}
        <div className="relative z-10 flex items-center gap-3 mb-10 pb-6 border-b border-[#0F172A]/5">
          <Info size={20} strokeWidth={1.5} className="text-[#C4A47C]" />
          <h3 className="text-lg md:text-xl font-serif text-[#0F172A]">
            Critical Admissions Advisory
          </h3>
        </div>

        {/* Notes Grid/List */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-10">
          {advisoryNotes.map((note) => {
            const Icon = note.icon;
            return (
              <div key={note.id} className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 rounded-md bg-[#FDFBF7] border border-[#0F172A]/5 text-[#0F172A]/60">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[15px] font-medium text-[#0F172A] tracking-wide">
                    {note.title}
                  </h4>
                </div>
                <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed font-light pl-[38px]">
                  {note.content}
                </p>
              </div>
            );
          })}

          {/* Additional Full-Width Note if needed */}
          <div className="md:col-span-2 flex flex-col pt-6 md:pt-4 border-t md:border-t-0 border-[#0F172A]/5">
            <h4 className="text-[15px] font-medium text-[#0F172A] tracking-wide mb-2">
              A Note for International Applicants (India)
            </h4>
            <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed font-light">
              While the timeline aligns with the UK academic calendar, Indian
              students must ensure their local board examination preparations
              (CBSE/ISC) do not conflict with their chosen testing window. We
              recommend sitting the exam between October and December.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
