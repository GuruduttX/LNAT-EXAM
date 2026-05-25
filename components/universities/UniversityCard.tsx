"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Building2 } from "lucide-react";
import { University } from "@/data/universities";

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Link href={`/universities/${university.basicInfo.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group flex flex-col h-full bg-white border border-gray-200 hover:border-[#c5a059] hover:shadow-2xl hover:shadow-[#0a0f1c]/5 transition-all duration-500 overflow-hidden"
      >
        {/* Monogram/Crest Placeholder Area */}
        <div className="h-48 bg-[#0a0f1c] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent opacity-80" />
          <span className="text-[#c5a059] font-serif text-5xl opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700 ease-out">
            {university.basicInfo.name.charAt(0)}
          </span>

         
        </div>

        {/* Content Area */}
        <div className="p-8 flex-grow flex flex-col">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> {university.basicInfo.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3" /> Est. {university.basicInfo.established}
            </span>
          </div>

          <h3 className="text-2xl font-serif text-[#0a0f1c] mb-3 group-hover:text-[#c5a059] transition-colors duration-300">
            {university.basicInfo.name}
          </h3>

          <p className="text-sm text-gray-600 font-light leading-relaxed mb-6 flex-grow">
            {university.lnat.weightageDescription}
          </p>

          <div className="pt-6 border-t border-gray-100 mt-auto flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0a0f1c] group-hover:text-[#c5a059] transition-colors">
              View Profile
            </span>
            <span className="text-[#c5a059] transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
