"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, FileText, ArrowRight } from "lucide-react";
import { University } from "@/data/universities";

interface UniversityContentProps {
  university: University;
}

export default function UniversityContent({
  university,
}: UniversityContentProps) {
  return (
    <section className="py-24 px-6 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Academic Editorial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-12"
        >
          <div>
            <h2 className="text-3xl font-serif text-[#0a0f1c] mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#c5a059]" />
              Academic Overview
            </h2>
            <div className="prose prose-lg prose-p:font-light prose-p:text-gray-600 prose-p:leading-relaxed max-w-none">
              <p>{university.overview.shortIntro}</p>
              <p>
                Admission to this institution demands more than exceptional
                academic grades; it requires a demonstrated capacity for
                rigorous logical deduction, nuanced argumentation, and
                intellectual resilience. The faculty seeks candidates who can
                thrive in intense dialectical environments.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-serif text-[#0a0f1c] mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#c5a059]" />
              Application Process
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "UCAS Application",
                  desc: "Submit your primary application via UCAS by the October 15th deadline for Oxbridge, or January 31st for others.",
                },
                {
                  step: "02",
                  title: "LNAT Registration",
                  desc: "Ensure you are registered for the LNAT and have linked your candidate profile to your selected institutions.",
                },
                {
                  step: "03",
                  title: "Written Work & Interviews",
                  desc: "If shortlisted, be prepared to submit specific written work or attend rigorous academic interviews.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-[#c5a059] font-serif text-2xl mt-1">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-[#0a0f1c] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: LNAT Focus & Action Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-8 space-y-8">
            {/* LNAT Card */}
            <div className="bg-[#0a0f1c] p-10 text-white relative overflow-hidden">
              <ShieldCheck className="absolute -bottom-8 -right-8 w-40 h-40 text-[#c5a059] opacity-10" />

              <span className="text-[#c5a059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">
                Testing Requirements
              </span>
              <h3 className="text-2xl font-serif mb-6">
                LNAT Status: {university.lnat.required}
              </h3>

              <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
                {university.basicInfo.name} uses the LNAT to assess your aptitude for the
                skills required to study law. A competitive score in both the
                multiple-choice and essay sections is imperative for your
                application to be considered.
              </p>

              <button className="w-full bg-[#c5a059] text-[#0a0f1c] py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2">
                Download Prep Strategy <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Assistance Card */}
            <div className="border border-gray-200 p-10 bg-white">
              <h4 className="text-lg font-serif text-[#0a0f1c] mb-3">
                Need Admissions Guidance?
              </h4>
              <p className="text-sm text-gray-600 font-light mb-6">
                Our elite mentorship team can help you map out an application
                strategy specifically tailored to {university.basicInfo.name}.
              </p>
              <button className="text-[10px] uppercase tracking-widest font-bold text-[#0a0f1c] border-b border-[#0a0f1c] pb-1 hover:text-[#c5a059] hover:border-[#c5a059] transition-all">
                Speak to a Mentor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
