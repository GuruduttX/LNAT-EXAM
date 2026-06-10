import { Building2, Landmark, ShieldCheck, UsersRound } from "lucide-react";

const audiences = [
  {
    title: "Oxbridge aspirants",
    description:
      "For students who need a high Section A score and an essay that can survive close reading.",
    icon: Landmark,
  },
  {
    title: "UK law applicants",
    description:
      "For students building a shortlist across Oxford, Cambridge, UCL, LSE, KCL, Durham, Bristol, Glasgow and SOAS.",
    icon: Building2,
  },
  {
    title: "JGLS applicants in India",
    description:
      "For India-focused applicants who now need the LNAT-UK and want focused Section A preparation.",
    icon: ShieldCheck,
  },
  {
    title: "Parents planning the journey",
    description:
      "For families who want a clear, honest plan and realistic expectations instead of admission guarantees.",
    icon: UsersRound,
  },
];

export default function WhoWeHelp() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/[0.06] bg-white p-4 shadow-[0_18px_44px_rgba(13,27,62,0.06)] sm:p-6 lg:p-8">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              Who We Help
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              LNAT support for students and families making high-stakes choices.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The same test can matter differently for Oxford, Cambridge, London
              universities and JGLS. We help you prepare according to the route
              you are actually taking.
            </p>
          </div>

          <div className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {audiences.map((audience) => {
              const Icon = audience.icon;

              return (
                <article
                  key={audience.title}
                  className="group flex w-[min(80vw,20rem)] shrink-0 snap-center flex-col rounded-[24px] border border-[#E8DEC9] bg-[#FDFBF7] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/45 hover:shadow-[0_14px_34px_rgba(13,27,62,0.08)] lg:w-auto"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C] transition-colors duration-300 group-hover:bg-[#C9A84C] group-hover:text-[#0D1B3E]">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0D1B3E]">
                        {audience.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-7 text-slate-600">
                        {audience.description}
                      </p>
                    </div>
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
