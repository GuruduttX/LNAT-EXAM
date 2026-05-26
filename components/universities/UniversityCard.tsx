"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <Link href={`/universities/${university.slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#e5ddd0] bg-white shadow-[0_18px_40px_rgba(20,31,45,0.06)] transition-all duration-500 hover:border-[#c5a059]/60 hover:shadow-[0_28px_60px_rgba(20,31,45,0.12)]"
      >
        <div className="relative h-64 overflow-hidden bg-[#14263a]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl font-serif text-[#d0ae6c]">
              {university.name.charAt(0)}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#09111f]/80 via-[#09111f]/20 to-transparent" />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-[#0f1b2b]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              LNAT {university.lnatRequirement}
            </span>
            {university.globalRanking ? (
              <span className="rounded-full border border-[#d7bf92]/35 bg-[#c5a059]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f3dfb8] backdrop-blur">
                {university.globalRanking}
              </span>
            ) : null}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e6cb94]">
              University Guide
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {university.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#b08d4f]" />
              {university.country}
            </span>
            {university.established ? (
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-[#b08d4f]" />
                Est. {university.established}
              </span>
            ) : null}
          </div>

          <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
            {university.excerpt40to60 ||
              university.shortDescription ||
              `Explore admissions strategy, city life, rankings, and LNAT guidance for ${university.name}.`}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-[#eee7d8] bg-[#fbfaf7] p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Law Ranking
              </p>
              <p className="mt-2 text-sm font-medium text-[#0e1b2a]">
                {university.lawSchoolRanking || "Top law school"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Location
              </p>
              <p className="mt-2 text-sm font-medium text-[#0e1b2a]">
                {university.city || university.location}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#eee7d8] pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0e1b2a] transition-colors group-hover:text-[#b08d4f]">
              View full profile
              <ArrowRight className="h-4 w-4" />
            </span>
            <Globe2 className="h-4 w-4 text-[#b08d4f]" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
