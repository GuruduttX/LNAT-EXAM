"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: "01",
    question: "What exactly is the LNAT exam?",
    answer:
      "The Law National Aptitude Test (LNAT) is a standardized admissions assessment utilized by leading UK universities. It evaluates your aptitude for studying law by testing logical reasoning, comprehension, and the ability to articulate a persuasive argument, rather than substantive legal knowledge.",
  },
  {
    id: "02",
    question: "Which universities require the LNAT for admission?",
    answer:
      "Elite institutions including Oxford, Cambridge, UCL, LSE, King’s College London, and Bristol mandate the LNAT for their undergraduate law programmes. The specific list may vary slightly year by year, requiring careful review of each university’s admissions criteria.",
  },
  {
    id: "03",
    question: "Can Indian students successfully apply to UK law schools?",
    answer:
      "Absolutely. UK law schools highly value the academic rigor of Indian applicants. Your Class 12 board marks, combined with a competitive LNAT score and a compelling personal statement, form the foundation of a strong international application.",
  },
  {
    id: "04",
    question: "When is the optimal time to take the LNAT?",
    answer:
      "Testing typically occurs between September and January of your application cycle. We advise early testing—ideally by mid-October—especially to ensure alignment with early Oxbridge application deadlines.",
  },
  {
    id: "05",
    question: "How should I structure my LNAT preparation?",
    answer:
      "Effective preparation demands consistent engagement with complex texts, refining logical deduction techniques, and practicing timed essay writing. Focus on mastering the architecture of arguments rather than relying on rote memorization.",
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

export default function FAQPreview() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16 bg-[#FDFCFB] border-y border-slate-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7B4F] mb-3 block">
              Admissions Guidance
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Clear, authoritative answers to the most common queries regarding
              the LNAT and the UK law admissions process.
            </p>
          </div>

          <div className="hidden md:block pb-1">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b border-transparent hover:border-[#9A7B4F] transition-all duration-300"
            >
              Read All FAQs
              <ArrowRight className="w-4 h-4 text-[#9A7B4F] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Elegant FAQ Accordion */}
        <motion.div
          className="border-t border-slate-200/60"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="border-b border-slate-200/60 group"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full py-5 md:py-6 flex items-center justify-between gap-6 text-left focus:outline-none"
                aria-expanded={openId === faq.id}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="text-xs font-serif text-[#9A7B4F] mt-1 md:mt-1.5 opacity-80">
                    {faq.id}.
                  </span>
                  <span
                    className={`text-base md:text-lg font-serif transition-colors duration-300 ${
                      openId === faq.id
                        ? "text-[#9A7B4F]"
                        : "text-slate-900 group-hover:text-slate-600"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                <div className="shrink-0 text-slate-400">
                  {openId === faq.id ? (
                    <Minus
                      className="w-4 h-4 text-[#9A7B4F] transition-transform duration-300"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Plus
                      className="w-4 h-4 group-hover:text-slate-600 transition-transform duration-300"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-10 md:pl-12 pr-4 md:pr-12">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b border-slate-300 pb-1 hover:border-[#9A7B4F] transition-colors"
          >
            Explore More Questions
            <ArrowRight className="w-4 h-4 text-[#9A7B4F]" />
          </a>
        </div>
      </div>
    </section>
  );
}
