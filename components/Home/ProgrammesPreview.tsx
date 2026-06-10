import {
  BookOpenCheck,
  ClipboardCheck,
  PenTool,
  UserRoundCheck,
} from "lucide-react";

const programmes = [
  {
    title: "Full LNAT Course",
    description:
      "Structured preparation for Section A reasoning, Section B essay writing, timed practice, mock analysis and admissions strategy.",
    icon: BookOpenCheck,
    accent: "bg-[#0D1B3E] text-[#C9A84C]",
  },
  {
    title: "Essay Intensive",
    description:
      "Focused Section B support for students who need sharper argument structure, clearer examples and more confident timed essays.",
    icon: PenTool,
    accent: "bg-[#C9A84C] text-[#0D1B3E]",
  },
  {
    title: "Mock Test Series",
    description:
      "Full-length LNAT simulations with score review, pacing feedback and clear next steps before the real test.",
    icon: ClipboardCheck,
    accent: "bg-[#F4E6B3] text-[#0D1B3E]",
  },
  {
    title: "One-to-One Mentoring",
    description:
      "Personal guidance for university shortlisting, LNAT timelines, UCAS planning and application decisions.",
    icon: UserRoundCheck,
    accent: "bg-white text-[#0D1B3E]",
  },
];

export default function ProgrammesPreview() {
  return (
    <section
      id="home-programmes"
      className="w-full max-w-full bg-white px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="mx-auto w-full max-w-2xl min-w-0 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B08D4F]">
              Our LNAT Programmes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0D1B3E] md:text-5xl">
              Choose the level of preparation your target universities demand.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
              Whether you need a complete LNAT plan or focused support for essays,
              mocks or application decisions, each programme is built around timed
              reasoning, feedback and realistic admissions strategy.
            </p>
          </div>

          <div className="w-full min-w-0 rounded-[30px] border border-[#E4D8C2] bg-white/70 p-3 shadow-[0_18px_44px_rgba(13,27,62,0.07)] sm:p-4">
            <div className="flex w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
              {programmes.map((programme) => {
                const Icon = programme.icon;

                return (
                  <article
                    key={programme.title}
                    className="group w-[calc(100vw-4.5rem)] max-w-[18.5rem] shrink-0 snap-center rounded-[24px] border border-[#E8DEC9] bg-[#FFFCF6] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/50 hover:shadow-[0_14px_32px_rgba(13,27,62,0.08)] sm:w-auto sm:max-w-none"
                  >
                    <div
                      className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 ${programme.accent}`}
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[#0D1B3E]">
                      {programme.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {programme.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
