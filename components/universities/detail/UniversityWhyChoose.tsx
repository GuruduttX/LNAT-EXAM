"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react"; // Fallback icon

interface WhyChooseItem {
  title: string;
  description: string;
  iconName?: string;
}

interface UniversityWhyChooseProps {
  university: {
    name: string;
    shortName?: string;
    whyChooseThisUniversity?: WhyChooseItem[];
  };
}

// Design System Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export default function UniversityWhyChoose({
  university,
}: UniversityWhyChooseProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const items = university.whyChooseThisUniversity;

  if (!items || items.length === 0) return null;

  const displayName = university.shortName || university.name;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header Area */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 flex flex-col"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 flex items-center justify-center gap-2 md:justify-start"
          >
            <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
              Why Choose
            </span>
            <div className="h-px w-8 bg-[#C9A84C]/40" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start"
          >
            Why study at{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              {displayName}
            </span>
            ?
          </motion.h2>
        </motion.div>

        {/* Hybrid Layout Container (Mobile Flex Carousel -> Desktop Grid) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-6 
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 
            md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              variants={fadeUp}
              custom={index * 0.1}
              className="mr-4 w-[85vw] max-w-[320px] shrink-0 snap-center md:mr-0 md:w-auto md:max-w-none"
            >
              <div className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-[#FDFBF7] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                {/* Decorative Icon / Number container */}
               <div className="flex gap-4 items-center">
                <div className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/[0.08] text-[#C9A84C] transition-colors duration-300 group-hover:bg-[#C9A84C]/[0.15]">
                  <CheckCircle2 size={18} strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-center text-[18px] font-bold text-[#0D1B3E] md:text-start">
                  {item.title}
                </h3>
               </div>
               
                <p className="flex-1 text-center text-[13px] leading-relaxed text-slate-500 md:text-start">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
