"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { faqData, faqCategories } from "@/data/faq";
import FAQAccordion from "./FAQAccordion";
import { motion } from "framer-motion";

export default function FAQClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // Filter logic based on both search and category
  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleToggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="py-24 bg-[#fdfbf7] px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar (Editorial Style) */}
        <div className="max-w-3xl mx-auto mb-20 relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for questions, terms, or universities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 pl-10 pr-4 py-4 text-lg text-[#0a0f1c] placeholder-gray-400 focus:border-[#c5a059] focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Sticky Category Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-12">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`w-full text-left py-3 px-4 border-l-2 transition-all duration-300 ${
                      activeCategory === "All"
                        ? "border-[#c5a059] text-[#0a0f1c] font-serif text-lg bg-white shadow-sm"
                        : "border-transparent text-gray-500 font-light hover:text-[#0a0f1c]"
                    }`}
                  >
                    All Questions
                  </button>
                </li>
                {faqCategories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left py-3 px-4 border-l-2 transition-all duration-300 ${
                        activeCategory === category
                          ? "border-[#c5a059] text-[#0a0f1c] font-serif text-lg bg-white shadow-sm"
                          : "border-transparent text-gray-500 font-light hover:text-[#0a0f1c]"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Accordion Content */}
          <div className="lg:col-span-8">
            {filteredFAQs.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="border-t border-gray-200"
              >
                {filteredFAQs.map((faq) => (
                  <FAQAccordion
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === faq.id}
                    onClick={() => handleToggle(faq.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-xl font-serif text-gray-400">
                  No questions found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 text-[10px] uppercase tracking-widest text-[#c5a059] font-bold hover:text-[#0a0f1c] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
