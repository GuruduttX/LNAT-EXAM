"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import UniversityCard from "./UniversityCard";
import { IUniversity } from "@/types/backend.types";

interface ArchiveClientProps {
  universities: IUniversity[];
}

export default function ArchiveClient({ universities }: ArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  const regions = useMemo(() => {
    const countrySet = new Set(
      universities.map((university) => university.country).filter(Boolean),
    );

    return ["All", ...Array.from(countrySet).sort((a, b) => a.localeCompare(b))];
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const haystack = [
        university.name,
        university.shortName,
        university.country,
        university.city,
        university.location,
        university.locationLabel,
        university.focusKeyword,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(searchQuery.toLowerCase());
      const matchesRegion =
        activeRegion === "All" || university.country === activeRegion;

      return matchesSearch && matchesRegion;
    });
  }, [activeRegion, searchQuery, universities]);

  return (
    <section className="bg-[#fbfaf7] px-6 pb-24 pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 rounded-[28px] border border-[#e4dccf] bg-white p-6 shadow-[0_16px_36px_rgba(20,31,45,0.05)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b08d4f]">
              Directory
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0e1b2a]">
              Browse universities by fit, geography, and LNAT relevance
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Use this directory after reading the hub above. Shortlist universities,
              compare environments, and then open each profile for admissions strategy,
              city-life context, and source-backed details.
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Search universities
            </label>
            <div className="relative mt-3">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Oxford, London, Bristol..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-[#ddd3c3] bg-[#fbfaf7] py-3 pl-11 pr-4 text-sm text-[#0e1b2a] outline-none transition focus:border-[#b08d4f]"
              />
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                activeRegion === region
                  ? "border-[#0e1b2a] bg-[#0e1b2a] text-white"
                  : "border-[#d9d2c4] bg-white text-slate-600 hover:border-[#b08d4f] hover:text-[#0e1b2a]"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {filteredUniversities.length ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.slug || university.name}
                university={university}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[#d8cebe] bg-white px-6 py-16 text-center">
            <p className="font-serif text-2xl text-[#0e1b2a]">
              No universities match your current filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveRegion("All");
              }}
              className="mt-4 text-sm font-semibold text-[#b08d4f] transition hover:text-[#0e1b2a]"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
