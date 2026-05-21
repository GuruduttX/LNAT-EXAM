"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { universitiesData } from "@/data/universities";
import UniversityCard from "./UniversityCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ArchiveClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  const regions = ["All", "United Kingdom", "Singapore", "Spain", "India"];

  const filteredUniversities = useMemo(() => {
    return universitiesData.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        activeRegion === "All" || uni.country === activeRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, activeRegion]);

  return (
    <section className="py-20 bg-[#fdfbf7] px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-8 border-b border-gray-200">
          {/* Custom Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 pl-8 pr-4 py-2 text-sm text-[#0a0f1c] placeholder-gray-400 focus:border-[#c5a059] focus:outline-none transition-colors"
            />
          </div>

          {/* Region Filters */}
          <div className="flex flex-wrap gap-4">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`text-[10px] uppercase tracking-widest font-semibold px-4 py-2 border transition-all duration-300 ${
                  activeRegion === region
                    ? "bg-[#0a0f1c] text-white border-[#0a0f1c]"
                    : "bg-transparent text-gray-500 border-gray-300 hover:border-[#0a0f1c] hover:text-[#0a0f1c]"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Container */}
        {filteredUniversities.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredUniversities.map((uni) => (
              <motion.div
                key={uni.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <UniversityCard university={uni} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 font-serif text-xl">
              No institutions match your refined criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveRegion("All");
              }}
              className="mt-6 text-[10px] uppercase tracking-widest text-[#c5a059] font-bold hover:text-[#0a0f1c] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
