"use client";

import { motion, Variants } from "framer-motion";
import {
  BookOpen,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
} from "lucide-react";

const resources = [
  {
    id: 1,
    category: "Writing Guide",
    title: "LNAT Essay Architecture",
    description:
      "Master the structure and argumentation required for Section B with annotated examples from high-scoring papers.",
    icon: FileText,
    href: "#",
  },
  {
    id: 2,
    category: "Strategy Handbook",
    title: "Logical Reasoning Blueprint",
    description:
      "Advanced techniques to deconstruct complex arguments and efficiently navigate Section A constraints.",
    icon: BookOpen,
    href: "#",
  },
  {
    id: 3,
    category: "Admissions Planning",
    title: "Timeline for Indian Applicants",
    description:
      "A strategic, month-by-month roadmap tailored for Indian students targeting top-tier UK law schools.",
    icon: Bookmark,
    href: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FreeResourcesPreview() {
  return (
    <section className="py-12 md:py-16 bg-[#FCFBFA] border-y border-slate-200/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#9A7B4F] mb-3 block">
              Curated Materials
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
              LNAT Study Resources
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-lg">
              Explore our collection of premium guides and handbooks, designed
              to provide foundational clarity and strategic advantage.
            </p>
          </div>

          <div className="hidden md:block pb-1">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b border-transparent hover:border-[#9A7B4F] transition-all duration-300"
            >
              View Library
              <ArrowRight className="w-4 h-4 text-[#9A7B4F] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Resource Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              className="h-full"
            >
              <a
                href={resource.href}
                className="group flex flex-col h-full p-6 bg-white border border-slate-200/80 hover:border-[#9A7B4F]/40 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <resource.icon
                      className="w-4 h-4 text-[#9A7B4F]"
                      strokeWidth={1.5}
                    />
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {resource.category}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#9A7B4F] transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-serif text-slate-900 mb-2 group-hover:text-[#9A7B4F] transition-colors duration-300">
                  {resource.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 grow">
                  {resource.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-900">
                  <span className="relative overflow-hidden flex h-4">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      Access Guide
                    </span>
                    <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#9A7B4F]">
                      Access Guide
                    </span>
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b border-slate-300 pb-1 hover:border-[#9A7B4F] transition-colors"
          >
            Explore All Materials
            <ArrowRight className="w-4 h-4 text-[#9A7B4F]" />
          </a>
        </div>
      </div>
    </section>
  );
}