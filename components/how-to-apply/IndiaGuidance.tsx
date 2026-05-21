"use client";

import { motion } from "framer-motion";
import { Globe2, AlertCircle, MapPin } from "lucide-react";

export default function IndiaGuidance() {
  return (
    <section className="py-16 bg-white border-y border-gray-100 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0f1c] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Background Accent */}
          <Globe2 className="absolute -bottom-12 -right-12 w-64 h-64 text-[#c5a059] opacity-5 pointer-events-none" />

          <div className="flex-shrink-0">
            <div className="w-16 h-16 border border-[#c5a059]/30 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-[#c5a059]" />
            </div>
          </div>

          <div className="flex-grow">
            <h3 className="text-2xl font-serif text-white mb-4">
              India-Specific Application Notes
            </h3>
            <ul className="space-y-4 text-white/70 font-light text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-[#c5a059] mt-1">✦</span>
                <p>
                  <strong>Identification:</strong> Indian applicants must
                  present a valid, original, unexpired Passport as their primary
                  ID. Aadhar cards, PAN cards, or Driver's Licenses are strictly
                  NOT accepted at Pearson VUE centers for the LNAT.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c5a059] mt-1">✦</span>
                <p>
                  <strong>Test Centers:</strong> Testing is available at select
                  Pearson VUE professional centers in major metropolitan hubs
                  including New Delhi, Mumbai, Bangalore, Chennai, and
                  Hyderabad. Book early as seats in India are limited.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c5a059] mt-1">✦</span>
                <p>
                  <strong>Time Zones:</strong> When booking, ensure you are
                  calculating deadlines based on UK time (GMT/BST), not IST, to
                  ensure your application reaches the universities before their
                  cut-offs.
                </p>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
