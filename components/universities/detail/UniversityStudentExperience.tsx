"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  Images,
  Sparkles,
  UsersRound,
  Wifi,
} from "lucide-react";

interface MediaAsset {
  url: string;
  alt: string;
  caption?: string;
}

interface ExperienceCard {
  label: string;
  text?: string;
  icon: LucideIcon;
}

interface UniversityStudentExperienceProps {
  university: {
    name: string;
    studentExperience?: {
      campusAtmosphere?: string;
      societiesAndClubs?: string;
      accommodation?: string;
      internationalStudentSupport?: string;
      lifeOutsideClassroom?: string;
    };
    gallery?: {
      studentLifeImages?: MediaAsset[];
      academicImages?: MediaAsset[];
    };
  };
}

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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function ImageCarousel({ images }: { images: MediaAsset[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeImage = images[currentIndex];

  useEffect(() => {
    if (images.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  if (!activeImage) {
    return (
      <div className="relative flex min-h-[340px] w-full max-w-full min-w-0 flex-col justify-end overflow-hidden rounded-[28px] border border-[#C9A84C]/20 bg-[#0D1B3E] p-5 shadow-[0_20px_55px_rgba(13,27,62,0.18)] md:min-h-[420px] md:rounded-[32px] md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,168,76,0.16),transparent_32%)]" />
        <Images className="relative mb-5 text-[#C9A84C]" size={34} />
        <p className="relative max-w-sm text-[22px] font-extrabold leading-tight text-white md:text-[24px]">
          Student-life images can be added from the university CMS gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-full min-w-0 overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#0D1B3E] shadow-[0_20px_55px_rgba(13,27,62,0.18)] md:rounded-[32px]">
      <div className="relative h-[440px] sm:h-[480px] md:h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.url}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/88 via-[#0A1628]/14 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0A1628]/42 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#0A1628]/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A84C] backdrop-blur-md sm:left-4 sm:top-4 sm:px-4 sm:tracking-[0.18em]">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>

        {images.length > 1 ? (
          <div className="absolute right-3 top-3 flex gap-2 sm:right-4 sm:top-4">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0A1628]/70 text-white backdrop-blur-md transition-colors hover:bg-[#C9A84C] hover:text-[#0D1B3E] sm:h-10 sm:w-10"
              aria-label="Previous student life image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0A1628]/70 text-white backdrop-blur-md transition-colors hover:bg-[#C9A84C] hover:text-[#0D1B3E] sm:h-10 sm:w-10"
              aria-label="Next student life image"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-6">
          <div className="max-w-full rounded-[20px] border border-white/10 bg-[#0A1628]/72 p-4 backdrop-blur-md md:max-w-md md:rounded-[24px] md:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              Student-life snapshot
            </p>
            <p className="mt-3 break-words text-[13px] leading-6 text-white/82 md:text-[14px] md:leading-7">
              {activeImage.caption ||
                "A visual glimpse of the atmosphere around campus, academics, and student life."}
            </p>
          </div>
        </div>
      </div>

      {images.length > 1 ? (
        <div className="flex max-w-full min-w-0 gap-2 overflow-x-auto border-t border-white/10 bg-[#0A1628] p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-16 sm:w-24 ${
                  isActive
                    ? "border-[#C9A84C] opacity-100"
                    : "border-white/15 opacity-60 hover:opacity-90"
                }`}
                aria-label={`Show student life image ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ExperienceCardItem({
  item,
  index,
}: {
  item: ExperienceCard;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={fadeUp}
      custom={index * 0.08}
      className="group w-full max-w-full min-w-0 rounded-[22px] border border-black/[0.07] bg-[#FDFBF7] p-4 shadow-[0_10px_26px_rgba(20,31,45,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/35 hover:bg-white md:rounded-[24px] md:p-5"
    >
      <div className="flex min-w-0 items-start gap-3 md:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0D1B3E] text-[#C9A84C] shadow-[0_10px_24px_rgba(13,27,62,0.14)] md:h-11 md:w-11">
          <Icon size={19} strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#C9A84C] opacity-60 transition-transform group-hover:translate-x-1" />
          </div>
          <h3 className="break-words text-[15px] font-extrabold leading-tight text-[#0D1B3E] md:text-[16px]">
            {item.label}
          </h3>
          <p className="mt-3 break-words text-[13px] leading-7 text-slate-600">
            {item.text}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function UniversityStudentExperience({
  university,
}: UniversityStudentExperienceProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const experience = university.studentExperience;
  const images = [
    ...(university.gallery?.studentLifeImages || []),
    ...(university.gallery?.academicImages || []),
  ].slice(0, 8);

  const cards: ExperienceCard[] = [
    {
      label: "Campus atmosphere",
      text: experience?.campusAtmosphere,
      icon: Sparkles,
    },
    {
      label: "Societies & clubs",
      text: experience?.societiesAndClubs,
      icon: UsersRound,
    },
    {
      label: "Accommodation",
      text: experience?.accommodation,
      icon: Home,
    },
    {
      label: "International support",
      text: experience?.internationalStudentSupport,
      icon: Wifi,
    },
    {
      label: "Life outside class",
      text: experience?.lifeOutsideClassroom,
      icon: Building2,
    },
  ].filter((item) => item.text);

  if (!cards.length && !images.length) return null;

  return (
    <section
      ref={ref}
      className="relative w-full max-w-full overflow-hidden border-t border-black/[0.07] bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)] [background-size:26px_26px]"
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[720px] -translate-x-1/2 rounded-full bg-[#C9A84C]/[0.08] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1280px] min-w-0">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 grid w-full min-w-0 gap-4 text-center md:text-start lg:grid-cols-[0.78fr_1fr] lg:items-end"
        >
          <div className="min-w-0">
            <motion.div
              variants={fadeUp}
              className="mb-3 flex items-center justify-center gap-2 md:justify-start"
            >
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Student Experience
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E]"
            >
              A more human view of{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                student life
              </span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="min-w-0 break-words text-[14px] leading-7 text-slate-600 lg:max-w-2xl"
          >
            Use these notes to understand the atmosphere, support, housing, and
            life beyond lectures before shortlisting {university.name}.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid w-full min-w-0 gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <motion.div
            variants={fadeUp}
            className="order-2 w-full max-w-full min-w-0 overflow-hidden rounded-[26px] border border-black/[0.07] bg-[#F7F3EC] p-4 shadow-[0_14px_38px_rgba(20,31,45,0.05)] md:rounded-[30px] md:p-5 lg:order-1"
          >
            <div className="mb-4 flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  Field notes
                </p>
                <p className="mt-1 break-words text-[13px] text-slate-500">
                  Scroll through the student-life details
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-[#0D1B3E]/10 bg-white px-3 py-1 text-[11px] font-bold text-[#0D1B3E]">
                {cards.length} notes
              </span>
            </div>

            {cards.length ? (
              <motion.div
                variants={stagger}
                className="max-h-[420px] w-full max-w-full min-w-0 space-y-3 overflow-y-auto pr-1 [scrollbar-color:#C9A84C_transparent] [scrollbar-width:thin] md:max-h-[520px]"
              >
                {cards.map((item, index) => (
                  <ExperienceCardItem
                    key={item.label}
                    item={item}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <p className="rounded-[24px] border border-black/[0.07] bg-white p-5 text-[14px] leading-7 text-slate-600">
                Student-life notes can be added from the university CMS.
              </p>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="order-1 w-full max-w-full min-w-0 lg:order-2"
          >
            <ImageCarousel images={images} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
