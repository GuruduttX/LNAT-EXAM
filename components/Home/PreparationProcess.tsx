import {
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  MapPinCheck,
  MessageCircle,
} from "lucide-react";

const steps = [
  {
    title: "Book a free consultation",
    description:
      "Share your target universities, entry year and current preparation stage on WhatsApp.",
    icon: MessageCircle,
  },
  {
    title: "Get a deadline-led study plan",
    description:
      "We map your preparation around your test window, with Oxbridge timelines planned earliest.",
    icon: ClipboardList,
  },
  {
    title: "Train both LNAT sections",
    description:
      "Build Section A speed and Section B argument quality through classes, drills and weekly mocks.",
    icon: GraduationCap,
  },
  {
    title: "Register and sit the test",
    description:
      "Get guidance on Pearson VUE booking, test timing and practical exam-day decisions.",
    icon: MapPinCheck,
  },
  {
    title: "Apply with confidence",
    description:
      "Use your score, essay preparation and university-specific strategy to make clearer choices.",
    icon: CalendarCheck,
  },
];

export default function PreparationProcess() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
            How LNAT Preparation Works With Us
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
            From first consultation to test-day confidence.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Our process is built around your deadline, target universities and
            weakest LNAT skills, so preparation feels structured instead of
            scattered.
          </p>
        </div>

        <div className="mt-8 flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="relative flex min-h-[260px] w-[min(78vw,19rem)] shrink-0 snap-center flex-col rounded-[24px] border border-black/[0.07] bg-[#FDFBF7] p-5 text-center shadow-[0_14px_34px_rgba(13,27,62,0.06)] lg:w-auto"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                  <span className="text-4xl font-extrabold leading-none text-[#C9A84C]/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-[15px] font-bold leading-snug text-[#0D1B3E]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  {step.description}
                </p>
                <div className="mt-auto pt-6">
                  <div className="h-1.5 rounded-full bg-[#EDE2CA]">
                    <div
                      className="h-full rounded-full bg-[#C9A84C]"
                      style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
