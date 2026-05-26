"use client";

import { motion } from "framer-motion";
import { Globe2, Coins, Calendar, Percent } from "lucide-react";
import { University } from "@/data/universities";

interface UniversityStatsProps {
  university: University;
}

export default function UniversityStats({ university }: UniversityStatsProps) {
  const stats = [
    {
      label: "Global Ranking",
      value: university.academics.globalRanking,
      icon: Globe2,
    },
    {
      label: "Tuition Fee",
      value: university.finance.tuitionFee,
      icon: Coins,
    },
    {
      label: "Application Deadline",
      value: university.timeline.finalDeadline,
      icon: Calendar,
    },
    
  ];

  return (
    <div className="bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="py-8 md:px-8 first:pl-0 last:pr-0"
              >
                <div className="flex items-center gap-3 mb-3 text-[#c5a059]">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    {stat.label}
                  </span>
                </div>
                <p className="text-xl font-serif text-[#0a0f1c]">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
