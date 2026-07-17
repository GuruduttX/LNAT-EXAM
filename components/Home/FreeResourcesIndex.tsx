"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const resourceLinks = [
  {
    id: "01",
    title: "What is the LNAT?",
    description: "The complete beginner's guide",
    href: "/what-is-lnat",
  },
  {
    id: "02",
    title: "LNAT universities",
    description: "Who requires it, and their expectations",
    href: "/universities",
  },
  {
    id: "03",
    title: "How to apply from India",
    description: "LNAT + UCAS, step by step",
    href: "/how-to-apply",
  },
  {
    id: "04",
    title: "LNAT topics",
    description: "Every guide in one place",
    href: "/topics",
  },
  {
    id: "05",
    title: "FAQ",
    description: "Quick answers to common questions",
    href: "/faq",
  },
];

export default function FreeResourcesIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section className="py-10 lg:py-10 bg-[#FCFBFA]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Narrative Content */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp} className="mb-6 text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-6">
                <BookOpen size={12} className="text-[#C9A84C]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
                  Free LNAT Resources
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0D1B3E] leading-[1.15] mb-6 tracking-tight">
                Not ready to enrol? <br />
                <span className="text-[#C9A84C] italic">Start anyway.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-light">
                Our free resources include practice papers and sample essays,
                and our guides cover the whole exam: Section A, Section B,
                scoring, registration and dates & deadlines.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Link Index */}
          <motion.div
            className="lg:col-span-7"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp} className="mb-4 hidden lg:block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Explore Library
              </span>
            </motion.div>

            <div className="border-t border-[#0D1B3E]/10">
              {resourceLinks.map((link, index) => (
                <motion.div key={link.id} variants={fadeUp}>
                  <Link
                    href={link.href}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[#0D1B3E]/10 transition-colors duration-300 hover:bg-[#0D1B3E]/[0.02] px-2 -mx-2 rounded-sm"
                  >
                    <div className="flex items-start sm:items-center gap-4 md:gap-6 mb-2 sm:mb-0">
                      <span className="text-xs font-serif text-slate-400 mt-1 sm:mt-0 transition-colors group-hover:text-[#C9A84C]">
                        {link.id}
                      </span>
                      <div>
                        <h3 className="text-lg md:text-xl font-serif text-[#0D1B3E] transition-colors duration-300 group-hover:text-[#C9A84C]">
                          {link.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-light mt-1">
                          — {link.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 self-end sm:self-center ml-10 sm:ml-4 text-slate-300 transition-all duration-300 group-hover:text-[#C9A84C] group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
