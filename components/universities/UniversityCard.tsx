"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, GraduationCap, MapPin } from "lucide-react";

import { IUniversity } from "@/types/backend.types";

interface UniversityCardProps {
  university: IUniversity;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  const imageUrl =
    university.cardImage?.url ||
    university.gallery?.campusImages?.[0]?.url ||
    university.image;

  const imageAlt =
    university.cardImage?.alt ||
    university.gallery?.campusImages?.[0]?.alt ||
    university.name;

  return (
    <Link
      href={`/universities/${university.slug}`}
      className="block h-full outline-none"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
        {/* Top Image Container */}
        <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-[#0D1B3E]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              draggable={false}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.07]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl font-extrabold text-[#C9A84C]/30">
              {university.name.charAt(0)}
            </div>
          )}

          {/* Design System: Image Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

          {/* Top Left Pills */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/70 backdrop-blur-sm">
              LNAT {university.lnatRequirement}
            </span>
            {university.globalRanking ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.15] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E8C96A] backdrop-blur-sm">
                {university.globalRanking}
              </span>
            ) : null}
          </div>

          {/* Bottom Left Title over Image */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              University Guide
            </p>
            <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              {university.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Meta Data */}
          <div className="mb-3 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#C9A84C]" />
              {university.country}
            </span>
            {university.established ? (
              <span className="flex items-center gap-1.5">
                <GraduationCap size={13} className="text-[#C9A84C]" />
                Est. {university.established}
              </span>
            ) : null}
          </div>

          {/* Description - Clamped to exactly 3 lines max */}
          <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-500">
            {university.excerpt40to60 ||
              university.shortDescription ||
              `Explore admissions strategy, city life, rankings, and LNAT guidance for ${university.name}.`}
          </p>

          {/* Bottom Data & Footer Wrapper (Pushed to bottom via mt-auto) */}
          <div className="mt-auto pt-6">
            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-black/[0.04] bg-[#F7F3EC] p-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Law Ranking
                </p>
                <p className="mt-1 text-[13px] font-bold text-[#0D1B3E]">
                  {university.lawSchoolRanking || "Top law school"}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Location
                </p>
                <p className="mt-1 truncate text-[13px] font-bold text-[#0D1B3E]">
                  {university.city || university.location}
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-5 flex items-center justify-between border-t border-black/[0.05] pt-4">
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0D1B3E] transition-colors duration-200 group-hover:text-[#C9A84C]">
                View full profile
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
              <Globe2 size={14} className="text-slate-300" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
