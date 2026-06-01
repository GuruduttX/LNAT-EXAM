"use client";

import { useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  BookOpen,
  FileText,
  Target,
  CheckSquare,
  Calendar,
  PenTool,
  Lock,
  FileIcon,
  type LucideIcon,
} from "lucide-react";

import LeadCaptureModal from "./LeadCaptureModal";

// 1. Map to your Mongoose Schema
export interface IResource {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  iconName?: string;
  fileUrl: string;
  fileFormat?: string;
  fileBytes?: number;
  downloadLabel?: string;
  status: "draft" | "published";
}

interface ResourcesClientProps {
  resources: IResource[];
}

// 2. Framer Motion Variants
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

// Utility to convert icon string from DB to Lucide Component
const getIconComponent = (iconName?: string) => {
  const IconMap: Record<string, LucideIcon> = {
    BookOpen,
    FileText,
    Target,
    CheckSquare,
    Calendar,
    PenTool,
  };
  const Icon = iconName && IconMap[iconName] ? IconMap[iconName] : FileIcon;
  return <Icon size={18} strokeWidth={1.5} />;
};

// Utility to format Mongoose fileBytes
const formatBytes = (bytes?: number) => {
  if (!bytes) return "PDF";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

export default function ResourcesClient({ resources = [] }: ResourcesClientProps) {
  const [selectedResource, setSelectedResource] = useState<IResource | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Extract unique categories for the Tab Bar
  const categories = useMemo(() => {
    const publishedResources = resources.filter(
      (r) => r.status === "published",
    );
    const catSet = new Set(
      publishedResources.map((r) => r.category).filter(Boolean),
    );
    return ["All", ...Array.from(catSet).sort()];
  }, [resources]);

  // Filter resources based on active tab
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (resource.status !== "published") return false;
      return activeCategory === "All" || resource.category === activeCategory;
    });
  }, [activeCategory, resources]);

  const handleOpenModal = (resource: IResource) => {
    setSelectedResource(resource);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#F7F3EC] px-4 py-8 sm:px-6 md:py-10 lg:px-8"
    >
      {/* Design System: Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none
        [background-image:radial-gradient(circle,rgba(13,27,62,0.04)_1px,transparent_1px)]
        [background-size:26px_26px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header & Tab Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <div className="h-px w-6 bg-[#C9A84C]/40 md:hidden" />
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] md:text-start">
                Library Directory
              </span>
              <div className="h-px w-8 bg-[#C9A84C]/40" />
            </div>

            <h2 className="text-center text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] md:text-start">
              Browse by strategic{" "}
              <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                category
              </span>
            </h2>
          </div>

          {/* Design System Tab Bar */}
          <div className="flex w-full overflow-x-auto pb-2 md:w-auto md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-1.5 rounded-2xl border border-black/[0.07] bg-white/80 p-1.5 shadow-sm backdrop-blur-sm mx-auto md:mx-0">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl border-none px-4 py-2.5 text-[12px] font-bold transition-all duration-300"
                    style={{
                      background: isActive ? "#0D1B3E" : "transparent",
                      color: isActive ? "#fff" : "#64748B",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(13,27,62,0.25)"
                        : "none",
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Dynamic Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredResources.map((resource) => (
              <motion.div key={resource.id} variants={fadeUp}>
                <div
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
                  onClick={() => handleOpenModal(resource)}
                >
                  {/* Top Color Accent */}
                  <div className="h-[3px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      {/* Icon Container */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/[0.08] text-[#C9A84C] transition-colors duration-300 group-hover:bg-[#C9A84C]/[0.15]">
                        {getIconComponent(resource.iconName)}
                      </div>

                      {/* Category Pill */}
                      <span className="inline-flex items-center rounded-full border border-black/[0.05] bg-[#F7F3EC] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {resource.category}
                      </span>
                    </div>

                    <h3 className="mb-2 text-[16px] font-bold leading-tight text-[#0D1B3E]">
                      {resource.title}
                    </h3>

                    <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-500">
                      {resource.shortDescription}
                    </p>

                    {/* Meta Data & Unlock CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-black/[0.05] pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Format
                        </span>
                        <span className="mt-0.5 text-[12px] font-bold text-[#0D1B3E]">
                          {resource.fileFormat?.toUpperCase() || "PDF"} •{" "}
                          {formatBytes(resource.fileBytes)}
                        </span>
                      </div>

                      {/* Ghost CTA Button from Design System */}
                      <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#F7F3EC] px-4 py-2 text-[12px] font-bold text-[#0D1B3E] transition-colors duration-300 group-hover:bg-[#0D1B3E] group-hover:text-white">
                        <Lock size={12} className="text-[#C9A84C]" />
                        Access
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Assuming LeadCaptureModal handles its own AnimatePresence */}
      <LeadCaptureModal
        isOpen={!!selectedResource}
        onClose={handleCloseModal}
        resource={selectedResource}
      />
    </section>
  );
}
