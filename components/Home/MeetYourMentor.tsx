"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Award, Globe, BookOpen, ChevronRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function MeetYourMentor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const credentials = [
    {
      icon: <Award size={20} />,
      title: "IELTS Examiner (British Council & IDP)",
      description:
        "Extensive experience interviewing candidates for spoken English proficiency and examining academic and general writing skills at the highest international standards.",
    },
    {
      icon: <Globe size={20} />,
      title: "Language & Program Director",
      description:
        "Chitkara University (Inlingua Institute of Languages). Mentored students in multiple languages and trained university faculty to effectively guide students in English communication and fluency.",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Specialist Language Trainer",
      description:
        "Austech Language Institute. Mentored undergraduate and MBA professionals, preparing them for rigorous English language proficiency tests and critical communication.",
    },
  ];

  return (
    <section className="py-10 lg:py-10 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0D1B3E] font-bold leading-[1.15] mb-6 tracking-tight text-center ">
          Meet your 
          <span className="text-[#C9A84C] italic">MENTOR</span>
        </h2>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Image with Premium Offset Frame */}
          <motion.div
            className="lg:col-span-5 relative max-w-md mx-auto lg:mx-0 w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Accent background box */}
            <div className="absolute top-6 -left-6 w-full h-full border border-[#C9A84C]/30 bg-[#FCFBFA] rounded-sm hidden sm:block" />

            {/* Image Container */}
            <div className="relative z-10 aspect-[4/5] w-full overflow-hidden shadow-[0_20px_40px_rgba(13,27,62,0.1)] rounded-sm bg-[#0D1B3E]">
              <img
                src="/images/LNAT-mentor.webp"
                alt="Mr. Alastair Murray"
                className="w-full h-full object-cover object-center  hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
              />

              {/* Subtle gradient overlay at bottom for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D1B3E]/80 to-transparent" />
            </div>

            {/* Small Floating Badge */}
            <div className="absolute -bottom-5 -right-5 sm:bottom-8 sm:-right-8 z-20 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 rounded-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                Lead Mentor
              </p>
              <p className="text-sm font-serif font-semibold text-[#0D1B3E]">
                LNAT Exam India
              </p>
            </div>
          </motion.div>

          {/* Right: Editorial Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C] block mb-3">
                Who Teaches You
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0D1B3E] leading-tight mb-4">
                Mr. Alastair Murray
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-light">
                Bringing decades of elite language assessment, pedagogy, and
                rigorous academic evaluation to your LNAT preparation. Your
                writing and reasoning are guided by an expert who understands
                the highest benchmarks of international assessment.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="w-12 h-px bg-[#C9A84C]/30 my-8"
            />

            {/* Credentials List */}
            <div className="space-y-6 mb-10">
              {credentials.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0D1B3E]/5 flex items-center justify-center text-[#C9A84C] mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0D1B3E] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
