"use client";

import { motion } from "framer-motion";

const timelineSteps = [
  {
    numeral: "I",
    title: "The UCAS Application",
    subtitle: "University Application Process",
    content:
      "Before sitting the LNAT, you must begin your primary university application via UCAS. Ensure you note the specific UCAS deadlines for your target institutions (typically October 15th for Oxbridge, January 31st for others). You will need your UCAS Personal Identifier number to register for the LNAT.",
  },
  {
    numeral: "II",
    title: "Account Creation & Registration",
    subtitle: "Step-by-Step LNAT Registration",
    content:
      "Navigate to the official Pearson VUE LNAT portal. You must create an online account using your exact legal name as it appears on your passport. During this phase, you will link your LNAT profile to the specific universities you are applying to.",
  },
  {
    numeral: "III",
    title: "Booking Your Examination",
    subtitle: "The Booking Process",
    content:
      "Once registered, select your preferred Pearson VUE test center and date. Testing slots in major international hubs fill rapidly. We strongly advise booking your slot at least two months prior to your university's specific deadline.",
  },
  {
    numeral: "IV",
    title: "Before The Test",
    subtitle: "Preparation & Logistics",
    content:
      "In the weeks prior, familiarize yourself with the desktop interface using the official practice simulator. On the day before, confirm your test center location, ensure your primary ID (passport) is ready, and print your booking confirmation.",
  },
  {
    numeral: "V",
    title: "After The Test",
    subtitle: "What Happens Next",
    content:
      "You will not receive your results immediately. Your scores and essay are sent directly to your selected universities. If you tested before January 26th, your personal results will be emailed to you by mid-February. The universities will use these scores alongside your UCAS application to make interview or offer decisions.",
  },
];

export default function ApplyTimeline() {
  return (
    <section className="py-24 bg-[#fdfbf7] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-16">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative pl-12 md:pl-24"
            >
              {/* Timeline Spine & Node */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-[#c5a059] rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-[#0a0f1c] rounded-full" />
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-[#c5a059] font-serif text-3xl md:text-4xl block mb-2 opacity-40">
                  {step.numeral}
                </span>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">
                  {step.subtitle}
                </h3>
                <h2 className="text-2xl md:text-3xl font-serif text-[#0a0f1c] mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  {step.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
