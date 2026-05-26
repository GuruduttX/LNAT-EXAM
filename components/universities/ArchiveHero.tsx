import { Globe2, GraduationCap, MapPin, ShieldCheck } from "lucide-react";

interface ArchiveHeroProps {
  totalUniversities: number;
  totalCountries: number;
  requiredLnatCount: number;
}

export default function ArchiveHero({
  totalUniversities,
  totalCountries,
  requiredLnatCount,
}: ArchiveHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#0c1727] px-6 pb-20 pt-28 text-[#f7f3ec] md:pb-28 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(82,109,145,0.22),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9c39a]">
              <ShieldCheck className="h-4 w-4" />
              LNAT Universities Hub
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.05]">
              A strategic hub for choosing the right LNAT university, not just a list of names.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#d7e0ea]">
              This page is designed to help you shortlist universities that actually fit
              your admissions profile. Use it to understand which institutions use the
              LNAT, what kind of city and academic environment each one offers, and where
              to go deeper with full university guides.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/15 px-4 py-2 text-[#f7f3ec]">
                Shortlist by city, country, and law-school reputation
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-[#f7f3ec]">
                Move from browse mode to profile-level admissions research
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <MapPin className="h-5 w-5 text-[#d9c39a]" />
              <p className="mt-8 text-4xl font-semibold text-white">
                {totalUniversities}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#d7e0ea]">
                published university profiles in the hub
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <Globe2 className="h-5 w-5 text-[#d9c39a]" />
              <p className="mt-8 text-4xl font-semibold text-white">
                {totalCountries}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#d7e0ea]">
                countries represented across the directory
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <GraduationCap className="h-5 w-5 text-[#d9c39a]" />
              <p className="mt-8 text-4xl font-semibold text-white">
                {requiredLnatCount}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#d7e0ea]">
                profiles where the LNAT is currently required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
