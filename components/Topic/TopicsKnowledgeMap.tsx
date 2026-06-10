import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  FileText,
  GraduationCap,
  MapPinned,
} from "lucide-react";

const topicGroups = [
  {
    title: "Core exam topics",
    description: "Understand what the LNAT tests before moving into practice.",
    icon: BookOpenCheck,
    links: [
      {
        label: "What is the LNAT",
        note: "format, purpose, who needs it",
        href: "/what-is-lnat",
      },
      {
        label: "Section A",
        note: "42 MCQs in 95 minutes",
        href: "/topics/lnat-section-a",
      },
      {
        label: "Section B",
        note: "the 40-minute essay",
        href: "/topics/lnat-section-b",
      },
      {
        label: "Scoring",
        note: "the score out of 42 and what is competitive",
        href: "/topics/lnat-score",
      },
    ],
  },
  {
    title: "Registration & logistics",
    description: "Plan booking, deadlines, fees and Indian test-centre choices.",
    icon: CalendarClock,
    links: [
      {
        label: "Registration",
        note: "booking via Pearson VUE",
        href: "/lnat-registration",
      },
      {
        label: "Dates & deadlines",
        note: "the current cycle",
        href: "/lnat-dates",
      },
      {
        label: "Fees & centres in India",
        note: "costs and test-centre planning",
        href: "/topics/lnat-india",
      },
    ],
  },
  {
    title: "Universities & admissions",
    description: "Connect the exam to your UCAS and JGLS application choices.",
    icon: GraduationCap,
    links: [
      {
        label: "LNAT universities",
        note: "the full list",
        href: "/universities",
      },
      {
        label: "How to apply",
        note: "UK & JGLS process from India",
        href: "/how-to-apply",
      },
    ],
  },
  {
    title: "Preparation",
    description: "Build a practical study route from plan to timed practice.",
    icon: FileText,
    links: [
      {
        label: "Study plan",
        note: "how to structure preparation",
        href: "/topics/lnat-preparation",
      },
      {
        label: "Practice papers & free resources",
        note: "downloadable preparation tools",
        href: "/free-resources",
      },
      {
        label: "Common mistakes",
        note: "what to avoid while preparing",
        href: "/topics/lnat-mistakes",
      },
    ],
  },
];

export default function TopicsKnowledgeMap() {
  return (
    <section className="relative overflow-hidden border-b border-black/[0.05] bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]
          [background-image:radial-gradient(circle,rgba(13,27,62,1)_1px,transparent_1px)]
          [background-size:24px_24px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Guided Topic Map
              </p>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
              Move through the LNAT in a{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                logical order
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
              Use this page as your starting map: understand the exam, organise
              registration, connect it to universities, then build your practice
              plan.
            </p>

            <div className="mt-6 rounded-2xl border border-[#C9A84C]/20 bg-[#F7F3EC] p-5">
              <div className="flex items-center justify-center gap-2 text-[#0D1B3E] md:justify-start">
                <MapPinned className="h-4 w-4 text-[#C9A84C]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]">
                  Start here
                </p>
              </div>
              <p className="mt-3 text-center text-[13px] leading-6 text-slate-600 md:text-start">
                Want a guided path through these topics for your target
                university? Use the CTA below to talk to a mentor on WhatsApp.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {topicGroups.map((group) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="flex h-full flex-col rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D1B3E] text-[#C9A84C]">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-extrabold text-[#0D1B3E]">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-[12px] leading-5 text-slate-500">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {group.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-start justify-between gap-3 rounded-xl border border-black/[0.05] bg-white px-4 py-3 transition-colors hover:border-[#C9A84C]/30"
                      >
                        <span>
                          <span className="block text-[13px] font-bold text-[#0D1B3E]">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-[11px] leading-5 text-slate-500">
                            {item.note}
                          </span>
                        </span>
                        <ArrowRight
                          size={14}
                          className="mt-1 shrink-0 text-[#C9A84C] transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
