import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  GraduationCap,
  Layers3,
} from "lucide-react";

export interface HomeTopicHubCardData {
  slug: string;
  name: string;
  primaryKeyword: string;
  topicDefinition: string;
  subtopicCount: number;
  guideCount: number;
  universityCount: number;
}

interface TopicHubsPreviewProps {
  topicHubs: HomeTopicHubCardData[];
}

export default function TopicHubsPreview({
  topicHubs,
}: TopicHubsPreviewProps) {
  if (!topicHubs.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]
        [background-image:radial-gradient(circle,rgba(13,27,62,0.08)_1px,transparent_1px)]
        [background-size:28px_28px]"
      />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl text-center md:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="h-px w-8 bg-[#C9A84C]/50" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                Topic Hubs
              </p>
            </div>
            <h2 className="text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]">
              Start with the LNAT guidance hubs that matter most
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:mx-0">
              Explore curated hub pages that connect preparation guides,
              university requirements, admissions strategy, and practical next
              steps in one structured path.
            </p>
          </div>

          <Link
            href="/topics"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white px-5 py-3 text-sm font-bold text-[#0D1B3E] shadow-sm transition-all hover:border-[#C9A84C]/40 hover:shadow-md"
          >
            View All Hubs
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {topicHubs.map((hub) => (
            <article
              key={hub.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_14px_36px_rgba(13,27,62,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/35 hover:shadow-[0_20px_46px_rgba(13,27,62,0.1)]"
            >
              <div className="h-1 bg-gradient-to-r from-[#C9A84C] via-[#E8C96A] to-[#C9A84C]" />

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C]">
                    <Compass size={18} strokeWidth={1.8} />
                  </div>
                  <span className="rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B6914]">
                    Hub
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {hub.primaryKeyword}
                </p>
                <h3 className="mt-2 text-xl font-extrabold leading-tight text-[#0D1B3E]">
                  {hub.name}
                </h3>
                <p className="mt-3 line-clamp-4 text-[13px] leading-6 text-slate-600">
                  {hub.topicDefinition}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    {
                      label: "Guides",
                      value: hub.guideCount,
                      icon: BookOpenCheck,
                    },
                    {
                      label: "Unis",
                      value: hub.universityCount,
                      icon: GraduationCap,
                    },
                    {
                      label: "Topics",
                      value: hub.subtopicCount,
                      icon: Layers3,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-black/[0.05] bg-[#FDFBF7] p-3"
                    >
                      <Icon size={14} className="text-[#C9A84C]" />
                      <p className="mt-2 text-lg font-extrabold leading-none text-[#0D1B3E]">
                        {value}
                      </p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/topics/${hub.slug}`}
                  className="group/cta mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B3E] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#162447]"
                >
                  Explore This Hub
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/cta:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
