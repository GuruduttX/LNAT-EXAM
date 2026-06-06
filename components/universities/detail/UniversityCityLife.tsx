"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  Bus,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Images,
  MapPin,
  ShieldCheck,
  Sparkles,
  Theater,
  X,
} from "lucide-react";

// Types mapping to your schema
type MediaAsset = { url: string; alt: string; caption?: string };
type FeatureBlock = { title: string; description: string; iconName?: string };

interface UniversityCityLifeProps {
  university: {
    city?: string;
    location?: string;
    cityLife?: {
      cityOverview?: string;
      whyStudentsLoveTheCity?: FeatureBlock[];
      neighbourhoodHighlights?: FeatureBlock[];
      transportAndConnectivity?: string;
      cultureAndLifestyle?: string;
      safetyAndPracticality?: string;
      costOfLiving?: string;
    };
    gallery?: {
      cityLifeImages?: MediaAsset[];
    };
  };
}

// Design System Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const lightboxVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function UniversityCityLife({
  university,
}: UniversityCityLifeProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cityOverview = university.cityLife?.cityOverview;
  const cityLife = university.cityLife;
  const cityImages = university.gallery?.cityLifeImages || [];
  const cityName = university.city || university.location || "the city";
  const practicalNotes = [
    {
      label: "Transport",
      text: cityLife?.transportAndConnectivity,
      icon: Bus,
    },
    {
      label: "Culture",
      text: cityLife?.cultureAndLifestyle,
      icon: Theater,
    },
    {
      label: "Safety",
      text: cityLife?.safetyAndPracticality,
      icon: ShieldCheck,
    },
    {
      label: "Cost of living",
      text: cityLife?.costOfLiving,
      icon: CircleDollarSign,
    },
  ].filter((item) => item.text);
  const practicalNotePages = practicalNotes.reduce<(typeof practicalNotes)[]>(
    (pages, note, index) => {
      if (index % 2 === 0) {
        pages.push([note]);
      } else {
        pages[pages.length - 1].push(note);
      }

      return pages;
    },
    [],
  );
  const cityHighlights = [
    ...(cityLife?.whyStudentsLoveTheCity || []).map((item) => ({
      ...item,
      label: "Why students love it",
    })),
    ...(cityLife?.neighbourhoodHighlights || []).map((item) => ({
      ...item,
      label: "Neighbourhood",
    })),
  ];

  // Lightbox Navigation Logic
  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => setGalleryOpen(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === cityImages.length - 1 ? 0 : prev + 1));
  }, [cityImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? cityImages.length - 1 : prev - 1));
  }, [cityImages.length]);

  // Lock body scroll and handle keyboard navigation for Lightbox
  useEffect(() => {
    if (galleryOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [galleryOpen, nextImage, prevImage]);

  // If no content, don't render the section
  if (
    !cityOverview &&
    cityImages.length === 0 &&
    !practicalNotes.length &&
    !cityHighlights.length
  ) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="border-t border-black/[0.07] bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 items-center">
          {/* =========================================
              LEFT COLUMN: TEXT & CTA
              ========================================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            <motion.div
              variants={fadeUp}
              className="mb-3 flex items-center justify-center gap-2 md:justify-start"
            >
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                City Life
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
            >
              Life in{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                {cityName}
              </span>
            </motion.h2>

            {cityOverview && (
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-start"
              >
                {cityOverview}
              </motion.p>
            )}

            {cityImages.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-8 flex justify-center md:justify-start"
              >
                <button
                  onClick={() => openGallery(0)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-black/[0.07] bg-[#F7F3EC] px-5 py-2.5 text-[13px] font-bold text-[#0D1B3E] shadow-sm transition-all duration-300 hover:border-[#C9A84C]/40 hover:bg-white hover:shadow-md"
                >
                  <Images size={16} className="text-[#C9A84C]" />
                  Open City Gallery ({cityImages.length})
                </button>
              </motion.div>
            )}

            {practicalNotes.length > 0 && (
              <motion.div
                variants={stagger}
                className="-mx-4 mt-8 flex snap-x snap-mandatory overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
              >
                {practicalNotePages.map((page, pageIndex) => (
                  <motion.div
                    key={`practical-note-page-${pageIndex}`}
                    variants={fadeUp}
                    custom={pageIndex * 0.08}
                    className="mx-auto mr-4 w-[calc(100%-1rem)] max-w-[520px] shrink-0 snap-center space-y-3 md:mr-5 md:w-[calc(100%-2rem)]"
                  >
                    {page.map((item, noteIndex) => {
                      const Icon = item.icon;
                      const index = pageIndex * 2 + noteIndex;

                      return (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-black/[0.07] bg-[#F7F3EC] p-4"
                        >
                          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C9A84C]">
                            <Icon size={14} />
                            {String(index + 1).padStart(2, "0")} ·{" "}
                            {item.label}
                          </div>
                          <p className="text-[13px] leading-6 text-slate-600">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* =========================================
              RIGHT COLUMN: IMAGE GRID / CAROUSEL
              ========================================= */}
          {cityImages.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
            >
              {cityImages.slice(0, 4).map((image, index) => (
                <motion.div
                  key={`${image.url}-${index}`}
                  variants={fadeUp}
                  custom={index * 0.1}
                  className="group relative mr-4 h-[220px] w-[75vw] max-w-[280px] shrink-0 snap-center overflow-hidden rounded-2xl border border-black/[0.07] bg-[#0D1B3E] shadow-[0_2px_10px_rgba(0,0,0,0.06)] md:mr-0 md:h-[200px] md:w-full md:max-w-none cursor-pointer"
                  onClick={() => openGallery(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    draggable={false}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.07]"
                  />

                  {/* Bottom dark gradient for caption visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent pointer-events-none" />

                  {image.caption && (
                    <div className="absolute inset-x-0 bottom-0 flex items-end p-4">
                      <p className="flex items-start gap-1.5 text-[11px] font-medium leading-snug text-white/90 drop-shadow-md">
                        <MapPin
                          size={12}
                          className="mt-[2px] shrink-0 text-[#C9A84C]"
                        />
                        {image.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {cityHighlights.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="-mx-4 mt-8 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4"
          >
            {cityHighlights.map((item, index) => (
              <motion.article
                key={`${item.label}-${item.title}-${index}`}
                variants={fadeUp}
                custom={index * 0.08}
                className="mr-4 min-h-[210px] w-[82vw] max-w-[320px] shrink-0 snap-center rounded-[24px] border border-black/[0.07] bg-[#FDFBF7] p-5 shadow-[0_12px_30px_rgba(20,31,45,0.04)] md:mr-0 md:w-full md:max-w-none"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Sparkles size={18} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-[16px] font-extrabold text-[#0D1B3E]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-slate-600">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>

      {/* =========================================
          FULL SCREEN LIGHTBOX GALLERY
          ========================================= */}
      <AnimatePresence mode="wait">
        {galleryOpen && cityImages.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={closeGallery}
              className="absolute inset-0 bg-[#0A1628]/95 backdrop-blur-md"
            />

            {/* Top Bar Controls */}
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 md:p-6 pointer-events-none">
              <div className="rounded-full bg-black/40 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white/70 backdrop-blur-md">
                {currentIndex + 1} / {cityImages.length}
              </div>
              <button
                onClick={closeGallery}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex h-[70vh] w-full max-w-5xl items-center justify-center px-4"
            >
              <div className="relative h-full w-full">
                <Image
                  src={cityImages[currentIndex].url}
                  alt={cityImages[currentIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            {cityImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 md:left-8"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 md:right-8"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Lightbox Caption */}
            {cityImages[currentIndex].caption && (
              <div className="absolute bottom-6 left-0 right-0 z-20 mx-auto max-w-2xl px-6 text-center">
                <p className="inline-block rounded-xl bg-black/60 px-5 py-2.5 text-[13px] font-medium text-white/90 backdrop-blur-md">
                  {cityImages[currentIndex].caption}
                </p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
