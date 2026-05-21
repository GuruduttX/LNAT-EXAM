"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQAccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function FAQAccordion({
  question,
  answer,
  isOpen,
  onClick,
}: FAQAccordionProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex items-start justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span
          className={`text-lg font-serif transition-colors duration-300 pr-8 ${isOpen ? "text-[#c5a059]" : "text-[#0a0f1c] group-hover:text-[#c5a059]"}`}
        >
          {question}
        </span>
        <span className="mt-1 text-gray-400 group-hover:text-[#c5a059] transition-colors flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
