"use client";

import { motion } from "framer-motion";
// types/resources.ts (Optional: if you want to extract types)
import { LucideIcon } from "lucide-react";

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

interface ResourceCardProps {
  resource: ResourceItem;
  onClick: (resource: ResourceItem) => void;
}

export default function ResourceCard({ resource, onClick }: ResourceCardProps) {
  const Icon = resource.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer border border-gray-200 bg-white p-8 flex flex-col justify-between h-full hover:border-[#c5a059] hover:shadow-xl hover:shadow-[#0a0f1c]/5 transition-all duration-300"
      onClick={() => onClick(resource)}
    >
      <div>
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-[#fdfbf7] text-[#0a0f1c] border border-gray-100 group-hover:bg-[#0a0f1c] group-hover:text-[#c5a059] transition-colors duration-300">
          <Icon className="w-5 h-5 stroke-[1.5]" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase block mb-3">
          {resource.category}
        </span>
        <h3 className="text-xl font-serif text-[#0a0f1c] mb-3 leading-snug">
          {resource.title}
        </h3>
        <p className="text-sm text-gray-600 font-light leading-relaxed">
          {resource.description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0a0f1c] group-hover:text-[#c5a059] flex items-center transition-colors">
          Access Resource
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
            →
          </span>
        </span>
      </div>
    </motion.div>
  );
}
