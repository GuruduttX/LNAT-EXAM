"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  Search,
  HelpCircle,
  X,
  ArrowRight,
  Lightbulb,
  MapPin,
  Globe2,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// --- 10 Highly Relevant FAQs for Indian Students ---
const LNAT_FAQS = [
  {
    id: 1,
    q: "Is the LNAT required for all UK law schools?",
    a: "No, but it is mandatory for the most prestigious 'Russell Group' universities, including Oxford, Cambridge, UCL, LSE, and King's College London. If you are targeting top-tier UK law schools from India, taking the LNAT is non-negotiable.",
  },
  {
    id: 2,
    q: "Can I use my CLAT preparation for the LNAT?",
    a: "While both test reading comprehension and logical reasoning, they are very different. CLAT is heavily knowledge-based (Current Affairs, Legal Reasoning), whereas the LNAT assumes zero prior legal or general knowledge and focuses entirely on critical thinking, deduction, and essay writing.",
  },
  {
    id: 3,
    q: "How much does the LNAT cost for students testing in India?",
    a: "For candidates taking the test at an international test centre (outside the UK/EU), the LNAT costs £120. Payment must be made online via major credit/debit cards during registration.",
  },
  {
    id: 4,
    q: "Where are the LNAT test centres located in India?",
    a: "The LNAT is administered through Pearson VUE. Test centres are typically available in major Indian metropolitan cities including New Delhi, Mumbai, Bangalore, Chennai, and Hyderabad. You can select your preferred centre during registration.",
  },
  {
    id: 5,
    q: "Does my Class 12 board percentage matter if I take the LNAT?",
    a: "Absolutely. UK universities look at your UCAS application holistically. Your Class 12 board scores (CBSE/ISC/State) or IB/A-Level predicted grades must meet the university's minimum entry requirements. The LNAT acts as a differentiator among applicants who all have top grades.",
  },
  {
    id: 6,
    q: "When should I book the LNAT for Oxford or Cambridge?",
    a: "Oxford and Cambridge have an earlier UCAS deadline (typically October 15th). You must register for and sit the LNAT *before* this deadline, usually by mid-October. Booking opens in August, and Indian test slots fill up very quickly.",
  },
  {
    id: 7,
    q: "Is the essay section (Section B) graded by the computer?",
    a: "No. Section A (multiple choice) is computer-marked out of 42. Section B (the essay) is not marked by the LNAT consortium at all. Instead, it is sent directly to the universities you apply to, where admissions tutors read it to assess your ability to argue logically and write persuasively.",
  },
  {
    id: 8,
    q: "Do UK law schools prefer CBSE, ISC, or IB boards?",
    a: "Top UK universities accept CBSE, ISC, and IB equally. However, they have strict equivalent requirements (e.g., 90-95% overall in CBSE/ISC, or 38-40 points in IB). The LNAT levels the playing field regardless of which board you studied under.",
  },
  {
    id: 9,
    q: "Are there scholarships available for Indian law students in the UK?",
    a: "Yes, though they are highly competitive. Universities like UCL, KCL, and Oxford offer specific international scholarships (like the Felix Scholarship). A high LNAT score can indirectly strengthen your application for merit-based financial aid.",
  },
  {
    id: 10,
    q: "What is considered a 'good' LNAT score for an international applicant?",
    a: "The average global LNAT score usually hovers around 22/42. To be competitive for elite universities like Oxford or UCL, you should aim for a score of 27 or higher. However, scores are assessed alongside your personal statement, essay, and academic grades.",
  },
];

// Split FAQs for the two scrolling columns to create the Masonry effect
const col1Faqs = LNAT_FAQS.filter((_, i) => i % 2 === 0);
const col2Faqs = LNAT_FAQS.filter((_, i) => i % 2 !== 0);

// Design System Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export default function FAQHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<(typeof LNAT_FAQS)[0] | null>(
    null,
  );

  // Reusable FAQ Card Component
  const FaqCard = ({ faq }: { faq: (typeof LNAT_FAQS)[0] }) => (
    <div
      onClick={() => setSelectedFaq(faq)}
      className="group cursor-pointer rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F3EC] text-[#C9A84C] transition-colors group-hover:bg-[#C9A84C] group-hover:text-white">
        <HelpCircle size={14} strokeWidth={2.5} />
      </div>
      <h3 className="text-[13px] font-bold leading-snug text-[#0D1B3E] transition-colors group-hover:text-[#C9A84C]">
        {faq.q}
      </h3>
      {/** this is only for the AEO and GEO */}
      <div className="sr-only">{faq.a}</div>
    </div>
  );

  return (
    <>
    <EnquiryPopupForm isOpen={isOpen} onClose={()=> setIsOpen(false)} source="faq-page"/>
      <section
        ref={ref}
        className="relative w-full overflow-hidden bg-[#F7F3EC] px-4 py-14 sm:px-6 md:py-20 lg:px-8"
      >
        {/* Design System: Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60
        [background-image:radial-gradient(circle,rgba(13,27,62,0.05)_1px,transparent_1px)]
        [background-size:26px_26px]"
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FAQs", href: "/faq" },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* ========================================== */}
            {/* LEFT CONTENT: Light Theme Typography       */}
            {/* ========================================== */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col"
            >
              {/* Design System Pill */}
              <motion.div
                variants={fadeUp}
                className="mb-6 flex justify-center lg:justify-start"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0D1B3E]/12 bg-[#0D1B3E]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D1B3E]">
                  <Globe2 size={12} className="text-[#C9A84C]" />
                  India Application Helpdesk
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-center text-[clamp(1.9rem,4.5vw,3.5rem)] font-extrabold leading-tight tracking-tight text-[#0D1B3E] lg:text-start"
              >
                Your Pathway to UK Law, <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
                  Demystified.
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-relaxed text-slate-500 lg:mx-0 lg:text-start"
              >
                From test centre logistics in New Delhi to balancing CBSE boards
                with LNAT prep—find exact answers tailored for Indian students
                targeting Oxford, Cambridge, and UCL.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              >
                <button
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  Ask a Question
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <button className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-6 py-3.5 text-[14px] font-bold text-[#0D1B3E] shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md sm:w-auto">
                  <Search size={14} className="text-[#C9A84C]" />
                  Browse Topics
                </button>
              </motion.div>
            </motion.div>

            {/* ========================================== */}
            {/* RIGHT VISUAL: Scrolling Masonry FAQ Grid   */}
            {/* ========================================== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[450px] w-full overflow-hidden lg:h-[550px]"
              style={{
                // Elegant top/bottom fade to mask the scrolling edges
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="absolute inset-0 grid grid-cols-2 gap-4 px-2">
                {/* Column 1 (Scrolls UP slowly) */}
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="flex flex-col gap-4 pt-8"
                >
                  {/* Render array twice to create seamless infinite loop */}
                  {[...col1Faqs, ...col1Faqs].map((faq, i) => (
                    <FaqCard key={`col1-${i}`} faq={faq} />
                  ))}
                </motion.div>

                {/* Column 2 (Scrolls DOWN slowly - starts offset) */}
                <motion.div
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{
                    duration: 45,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="flex flex-col gap-4"
                >
                  {[...col2Faqs, ...col2Faqs].map((faq, i) => (
                    <FaqCard key={`col2-${i}`} faq={faq} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================== */}
        {/* FULL SCREEN MODAL DIALOG                   */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          {selectedFaq && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              {/* Dark Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedFaq(null)}
                className="absolute inset-0 bg-[#0A1628]/60 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(13,27,62,0.3)]"
              >
                {/* Top Accent Bar */}
                <div className="h-[4px] w-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />

                <div className="p-6 md:p-8">
                  <button
                    onClick={() => setSelectedFaq(null)}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-[#0D1B3E]"
                  >
                    <X size={16} />
                  </button>

                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]/[0.08] text-[#C9A84C]">
                    <HelpCircle size={18} strokeWidth={2} />
                  </div>

                  <h3 className="mb-4 text-[18px] font-bold leading-snug text-[#0D1B3E]">
                    {selectedFaq.q}
                  </h3>

                  <div className="rounded-xl border border-black/[0.05] bg-[#FDFBF7] p-5">
                    <p className="text-[14px] leading-relaxed text-slate-600">
                      {selectedFaq.a}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end border-t border-black/[0.05] pt-4">
                    <button
                      onClick={() => setSelectedFaq(null)}
                      className="rounded-xl bg-[#0D1B3E] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#162447]"
                    >
                      Close Answer
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
