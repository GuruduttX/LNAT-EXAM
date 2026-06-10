import { CalendarClock, GraduationCap, Landmark } from "lucide-react";

const deadlineRows = [
  {
    date: "1 August 2026",
    milestone: "LNAT registration and booking open",
  },
  {
    date: "1 Sep 2026 - 31 Jul 2027",
    milestone: "LNAT testing window",
  },
  {
    date: "On or before 15 October 2026",
    milestone: "Oxford and Cambridge: sit LNAT and submit UCAS by the early deadline",
  },
  {
    date: "Late 2026",
    milestone: "London universities such as UCL, LSE and KCL ask for earlier LNAT sittings; check each university",
  },
  {
    date: "Mid-late January 2027",
    milestone: "Main UCAS equal-consideration deadline; verify the exact date on UCAS",
  },
];

export default function ApplyDeadlines() {
  return (
    <section className="relative overflow-hidden border-b border-black/[0.07] bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              Key Deadlines
            </p>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </div>
          <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
            Plan early for{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              2027 entry
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start">
            Oxford and Cambridge move first, while London universities often
            expect earlier LNAT sittings than the main UCAS deadline. Always
            verify dates on UCAS and each university page before submitting.
          </p>

          <div className="mt-6 rounded-2xl border border-[#C9A84C]/20 bg-[#F7F3EC] p-5">
            <div className="flex items-center justify-center gap-2 text-[#0D1B3E] md:justify-start">
              <GraduationCap className="h-4 w-4 text-[#C9A84C]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em]">
                Applying to JGLS in India
              </p>
            </div>
            <p className="mt-3 text-center text-[13px] leading-6 text-slate-600 md:text-start">
              JGLS requires the LNAT-UK and assesses only Section A. Sit the
              LNAT, then apply to JGLS within its admission windows. The same
              LNAT sitting can support both UK and JGLS applications.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/[0.07] bg-[#FDFBF7] shadow-[0_16px_40px_rgba(13,27,62,0.08)]">
          <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#0D1B3E] px-5 py-4 text-white">
            <CalendarClock className="h-5 w-5 text-[#C9A84C]" />
            <h3 className="text-[15px] font-bold">Application timeline</h3>
          </div>
          <div className="divide-y divide-black/[0.06]">
            {deadlineRows.map((row) => (
              <div
                key={row.date}
                className="grid gap-2 px-5 py-4 md:grid-cols-[180px_1fr]"
              >
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#0D1B3E]">
                  <Landmark className="h-4 w-4 text-[#C9A84C]" />
                  {row.date}
                </div>
                <p className="text-[13px] leading-6 text-slate-600">
                  {row.milestone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
