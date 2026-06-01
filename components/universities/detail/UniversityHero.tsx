"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
  Clock,
  Star,
} from "lucide-react";

import { IMediaAsset, IUniversity } from "@/types/backend.types";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface UniversityHeroProps {
  university: IUniversity;
}

// ─────────────────────────────────────────────────────────────
// Motion variants
// ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const imageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function getHeroImages(university: IUniversity): IMediaAsset[] {
  const imageGroups = [
    university.hero?.carouselImages,
    university.gallery?.campusImages,
    university.gallery?.cityLifeImages,
    university.gallery?.studentLifeImages,
    university.gallery?.academicImages,
  ];
  const seenUrls = new Set<string>();
  return imageGroups
    .flatMap((group) => group || [])
    .filter((image) => {
      if (!image.url || seenUrls.has(image.url)) return false;
      seenUrls.add(image.url);
      return true;
    });
}

function getSpecialSummary(university: IUniversity) {
  return (
    university.directAnswers?.whatIsSpecial ||
    university.whyBestSummary ||
    university.excerpt40to60 ||
    university.shortDescription
  );
}

// ─────────────────────────────────────────────────────────────
// Thumbnail strip — clickable image previews at bottom of panel
// ─────────────────────────────────────────────────────────────
function ThumbnailStrip({
  images,
  current,
  onSelect,
}: {
  images: IMediaAsset[];
  current: number;
  onSelect: (i: number) => void;
}) {
  // Show max 5 thumbnails, always centred around current
  const visible = images.slice(0, 5);
  return (
    <div className="flex items-end gap-2">
      {visible.map((img, i) => {
        const isActive = i === current;
        return (
          <button
            key={img.url}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={img.alt || `Image ${i + 1}`}
            className="relative overflow-hidden rounded-xl border-2 transition-all duration-300 shrink-0"
            style={{
              width: isActive ? 68 : 52,
              height: isActive ? 52 : 40,
              borderColor: isActive ? "#C9A84C" : "rgba(255,255,255,0.25)",
              boxShadow: isActive ? "0 0 0 2px rgba(201,168,76,0.35)" : "none",
              opacity: isActive ? 1 : 0.65,
            }}
          >
            <Image
              src={img.url}
              alt={img.alt || ""}
              fill
              unoptimized
              sizes="70px"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            {!isActive && <span className="absolute inset-0 bg-[#0D1B3E]/30" />}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export default function UniversityHero({ university }: UniversityHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(() => getHeroImages(university), [university]);
  const specialSummary = getSpecialSummary(university);
  const activeImage = images[currentIndex] ?? images[0];
  const hasCarouselImages = images.length > 0;

  const locationLabel =
    university.locationLabel ||
    [university.city || university.location, university.country]
      .filter(Boolean)
      .join(", ");

  // Auto-advance carousel every 6s
  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(
      () => setCurrentIndex((p) => (p + 1) % images.length),
      2000,
    );
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <section
      ref={ref}
      className="relative w-full max-w-full overflow-x-hidden bg-[#F7F3EC] text-center md:text-start"
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]
          [background-image:radial-gradient(circle,rgba(13,27,62,0.8)_1px,transparent_1px)]
          [background-size:26px_26px]"
        aria-hidden
      />

      {/* Gold ambient glow top-left */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-[500px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* ── Two-column grid ── */}
      <div
        className={`relative mx-auto grid w-full max-w-[1280px] grid-cols-1 min-h-[70vh] overflow-hidden ${
          hasCarouselImages ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-1"
        }`}
      >
        {/* ══════════════════════════════════════════
            LEFT — text content
        ══════════════════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-20 flex min-w-0 flex-col justify-center
            px-6 py-12 sm:px-10 lg:px-12 lg:py-16 xl:px-16"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp}
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2
              text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400"
          >
            <Link
              href="/universities"
              className="transition-colors hover:text-[#C9A84C]"
            >
              Universities
            </Link>
            <ChevronRight size={11} className="text-slate-300" />
            <span className="text-[#0D1B3E]">
              {university.shortName || university.name}
            </span>
          </motion.nav>

          {/* Badges row */}
          <motion.div
            variants={fadeUp}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full
              border border-[#0D1B3E]/10 bg-[#0D1B3E]/[0.05]
              px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0D1B3E]"
            >
              <MapPin size={11} className="text-[#C9A84C]" />
              {locationLabel}
            </span>

            <span
              className="inline-flex items-center gap-1.5 rounded-full
              border border-[#C9A84C]/25 bg-[#C9A84C]/[0.08]
              px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B6914]"
            >
              <ShieldCheck size={11} className="text-[#C9A84C]" />
              LNAT {university.lnatRequirement}
            </span>

            {university.established && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full
                border border-black/[0.07] bg-white
                px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
              >
                <Clock size={11} className="text-slate-400" />
                {university.established}
              </span>
            )}
          </motion.div>

          {/* Eyebrow label */}
          <motion.p
            variants={fadeUp}
            className="mb-4 flex items-center gap-3
              text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]"
          >
            <span className="h-px w-8 bg-[#C9A84C]/40" />
            {university.hero?.eyebrow || "University Guide"}
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-extrabold leading-[1.12] tracking-tight text-[#0D1B3E]
              text-[clamp(2rem,4vw,3.2rem)] max-w-xl mb-5"
          >
            {university.hero?.headline || university.name}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-[14px] leading-[1.85] text-slate-500 mb-6"
          >
            {university.hero?.subheadline || university.shortDescription}
          </motion.p>

          {/* "Why special" callout */}
          {specialSummary && (
            <motion.div
              variants={fadeUp}
              className="mb-6 max-w-lg rounded-2xl border border-[#C9A84C]/25
                bg-[#C9A84C]/[0.06] p-4"
            >
              <div
                className="mb-1.5 flex items-center gap-2
                text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B6914]"
              >
                <Sparkles size={12} />
                Why this university stands out
              </div>
              <p className="text-[13px] leading-relaxed text-slate-700">
                {specialSummary}
              </p>
            </motion.div>
          )}

          

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 sm:flex-row mb-8"
          >
            <Link
              href={university.hero?.primaryCTA?.href || "#admissions"}
              className="group inline-flex items-center justify-center gap-2.5
                rounded-xl px-6 py-3 text-sm font-bold text-[#0D1B3E]
                transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
              }}
            >
              {university.hero?.primaryCTA?.label || "Review Admissions Fit"}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={university.hero?.secondaryCTA?.href || "/universities"}
              className="inline-flex items-center justify-center gap-2.5
                rounded-xl border border-[#0D1B3E]/12 bg-[#0D1B3E]/[0.04]
                px-6 py-3 text-sm font-bold text-[#0D1B3E]
                transition-all duration-300 hover:bg-[#0D1B3E]/[0.09]"
            >
              {university.hero?.secondaryCTA?.label || "Compare Universities"}
            </Link>
          </motion.div>

          {/* Footer meta */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 text-[12px] text-slate-400 font-medium"
          >
            <span className="inline-flex items-center gap-1.5">
              <Landmark size={13} className="text-[#C9A84C]" />
              {university.country}
            </span>
            {university.courseDuration && (
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={13} className="text-[#C9A84C]" />
                {university.courseDuration}
              </span>
            )}
            {university.globalRanking && (
              <span className="inline-flex items-center gap-1.5">
                <Star size={13} className="text-[#C9A84C]" />
                {university.globalRanking} globally
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════
            RIGHT — image carousel panel
        ══════════════════════════════════════════ */}
        {hasCarouselImages && activeImage ? (
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              delay: 0.12,
            }}
            className="relative hidden min-w-0 overflow-hidden bg-[#F7F3EC] lg:mt-0 lg:block lg:h-[600px] lg:rounded-none"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(201,168,76,0.12), -20px 0 60px rgba(0,0,0,0.12)",
            }}
          >
          {/* ── Main cycling image ── */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`img-${currentIndex}`}
              variants={imageFade}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={activeImage.url}
                alt={activeImage.alt || university.name}
                fill
                priority
                unoptimized
                draggable={false}
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Cinematic overlays ── */}
          {/* Bottom gradient — gives depth for thumbnails + dots */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(6,10,22,0.88) 0%, rgba(6,10,22,0.3) 35%, transparent 65%)",
            }}
          />
          {/* Top subtle vignette */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,10,22,0.35) 0%, transparent 100%)",
            }}
          />

          {/* ── Gold top accent line ── */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #C9A84C 30%, #E8C96A 50%, #C9A84C 70%, transparent 100%)",
            }}
          />

          {/* ── University name overlay — bottom left ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <div className="flex items-end justify-between gap-4">
              {/* Name + location */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] mb-1">
                  {university.hero?.eyebrow || "University Overview"}
                </p>
                <h2 className="text-white font-extrabold text-xl leading-tight truncate">
                  {university.shortName || university.name}
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={11} className="text-white/50 shrink-0" />
                  <span className="text-[11px] text-white/55 font-medium">
                    {locationLabel}
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="shrink-0">
                  <ThumbnailStrip
                    images={images}
                    current={currentIndex}
                    onSelect={setCurrentIndex}
                  />
                </div>
              )}
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="flex items-center gap-1.5 mt-4">
                {images.map((img, i) => (
                  <button
                    key={`${img.url}-dot-${i}`}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Image ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === currentIndex ? 28 : 8,
                      height: 4,
                      background:
                        i === currentIndex
                          ? "#C9A84C"
                          : "rgba(255,255,255,0.35)",
                    }}
                  />
                ))}
                <span className="ml-auto text-[10px] text-white/35 font-medium tabular-nums">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </div>

          {/* ── Floating LNAT score badge ── */}
          {university.admissions?.targetLNATScore && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="absolute top-6 right-6 z-20 rounded-2xl p-3.5"
              style={{
                background: "rgba(13,27,62,0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0">
                  <Star size={14} className="fill-white text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/50 mb-0.5">
                    Target LNAT Score
                  </p>
                  <p className="text-white font-extrabold text-[15px] leading-none">
                    {university.admissions.targetLNATScore}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Floating global rank badge ── */}
          {university.globalRanking && (
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.85,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="absolute top-6 left-10 z-20 hidden lg:flex items-center gap-2
                rounded-full px-3.5 py-2"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <GraduationCap size={13} className="text-[#C9A84C]" />
              <span className="text-[11px] font-bold text-white">
                {university.globalRanking}
              </span>
            </motion.div>
          )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
