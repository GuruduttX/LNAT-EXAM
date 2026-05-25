"use client";

import { motion, Variants } from "framer-motion";
import { FiMail, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { usePathname } from "next/navigation";
const footerLinks = {
  navigation: [
    { label: "Home", href: "#" },
    { label: "Universities", href: "#" },
    { label: "Free Resources", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "How to Apply", href: "#" },
  ],
  institutions: [
    { label: "University of Oxford", href: "#" },
    { label: "UCL (University College London)", href: "#" },
    { label: "LSE (London School of Economics)", href: "#" },
    { label: "King’s College London", href: "#" },
  ],
  resources: [
    { label: "LNAT Preparation", href: "#" },
    { label: "Essay Writing Guide", href: "#" },
    { label: "Admissions Timeline", href: "#" },
    { label: "Study Resources", href: "#" },
  ],
  socials: [
    { icon: FiInstagram, label: "Instagram", href: "#" },
    { icon: FiLinkedin, label: "LinkedIn", href: "#" },
    { icon: FiTwitter, label: "Twitter", href: "#" },
    { icon: FiMail, label: "Email", href: "mailto:contact@lnatexamindia.com" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathName = usePathname();

  if(pathName.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#070B14] border-t border-white/5 pt-12 pb-6 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 lg:col-span-4"
          >
            <a href="#" className="inline-block mb-4 focus:outline-none">
              <span className="text-xl font-serif text-[#FDFCFB] tracking-wide">
                LNAT Exam <span className="text-[#9A7B4F] italic">India</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Premium LNAT admissions guidance for Indian students aspiring to
              study law at leading UK universities. Curated insights, rigorous
              preparation, and expert strategy.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerLinks.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-slate-500 hover:text-[#9A7B4F] transition-colors duration-300 focus:outline-none"
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-2 lg:col-start-6"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FDFCFB] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#9A7B4F] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Institutions Links */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-3"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FDFCFB] mb-4">
              Institutions
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.institutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#9A7B4F] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-2"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FDFCFB] mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#9A7B4F] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xs text-slate-500 order-2 md:order-1">
            &copy; {currentYear} LNAT Exam India. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 md:order-2 text-xs text-slate-500">
            <a
              href="#"
              className="hover:text-[#9A7B4F] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#9A7B4F] transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
