"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  X,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import EnquiryPopupForm from "./EnquiryForm";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Universities", href: "/universities", hasDropdown: true },
  { label: "Free Resources", href: "/free-resources" },
  { label: "FAQ", href: "/faq" },
  { label: "How to Apply", href: "/how-to-apply" },
  { label: "About", href: "/about" },
];

const universityLinks = [
  {
    label: "University of Oxford",
    href: "/universities/university-of-oxford",
    rank: "World #1",
  },
  { label: "UCL", href: "/universities/ucl", rank: "World #9" },
  { label: "LSE", href: "/universities/lse", rank: "World #45" },
  {
    label: "King's College London",
    href: "/universities/kings",
    rank: "World #40",
  },
  {
    label: "Durham University",
    href: "/universities/durham",
    rank: "World #92",
  },
  {
    label: "University of Bristol",
    href: "/universities/bristol",
    rank: "World #54",
  },
];

// ─────────────────────────────────────────────────────────────
// NavLogo
// ─────────────────────────────────────────────────────────────

function NavLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center"
      aria-label="LNAT Exam India — Home"
    >
      <Image
        src="/images/LnatLogo.webp"
        alt="LNAT Exam India"
        width={280}
        height={82}
        priority
        className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-16 lg:h-[72px]"
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// UniversityDropdown
// ─────────────────────────────────────────────────────────────

function UniversityDropdown({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.99 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 z-50"
          role="menu"
          aria-label="Universities submenu"
          style={{
            background: "rgba(251, 248, 242, 0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(201,168,76,0.18)",
            borderRadius: "14px",
            boxShadow:
              "0 8px 32px rgba(13,27,62,0.12), 0 2px 8px rgba(13,27,62,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: "rgba(201,168,76,0.12)" }}
          >
            <p
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: "9.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8B6914",
              }}
            >
              LNAT Universities
            </p>
          </div>

          {/* University items */}
          <div className="py-2">
            {universityLinks.map((uni) => (
              <Link
                key={uni.href}
                href={uni.href}
                role="menuitem"
                className="flex items-center justify-between px-4 py-2.5 group transition-colors duration-150"
                style={{ outline: "none" }}
                onFocus={(e) =>
                  (e.currentTarget.style.background = "rgba(201,168,76,0.06)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(201,168,76,0.06)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', Georgia, serif",
                    fontSize: "12.5px",
                    color: "#1A2844",
                    fontWeight: 400,
                  }}
                >
                  {uni.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', Georgia, serif",
                    fontSize: "9px",
                    color: "#8B6914",
                    letterSpacing: "0.06em",
                  }}
                >
                  {uni.rank}
                </span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-3 border-t"
            style={{ borderColor: "rgba(201,168,76,0.12)" }}
          >
            <Link
              href="/universities"
              role="menuitem"
              className="flex items-center gap-1.5 group"
            >
              <span
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "11px",
                  color: "#0D1B3E",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                View All Universities
              </span>
              <ArrowRight
                size={11}
                className="text-[#8B6914] transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// NavLink (desktop)
// ─────────────────────────────────────────────────────────────

function NavLink({
  link,
  isActive,
}: {
  link: (typeof navLinks)[0];
  isActive?: boolean;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (link.hasDropdown) {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <Link
          href={link.href}
          onClick={() => setDropdownOpen((v) => !v)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          className="flex items-center gap-1 py-2 group relative"
          style={{ outline: "none" }}
        >
          <span
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "13px",
              color: dropdownOpen ? "#0D1B3E" : "#2D3748",
              fontWeight: dropdownOpen ? 700 : 400,
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </span>
          <ChevronDown
            size={12}
            className="text-[#8B6914] transition-transform duration-200"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
          {/* Gold underline */}
          <span
            className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
            style={{
              background: "#C9A84C",
              transform: dropdownOpen ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        </Link>
        <UniversityDropdown isOpen={dropdownOpen} />
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      className="relative py-2 group block"
      style={{ outline: "none" }}
    >
      <span
        className="transition-colors duration-200"
        style={{
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontSize: "13px",
          color: isActive ? "#0D1B3E" : "#2D3748",
          fontWeight: isActive ? 700 : 400,
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLElement).style.color = "#0D1B3E")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.color = isActive
            ? "#0D1B3E"
            : "#2D3748")
        }
      >
        {link.label}
      </span>
      {/* Gold underline */}
      <span
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300 origin-left"
        style={{
          background: "#C9A84C",
          transform: "scaleX(0)",
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          parent.addEventListener(
            "mouseenter",
            () => (el.style.transform = "scaleX(1)"),
          );
          parent.addEventListener(
            "mouseleave",
            () => (el.style.transform = isActive ? "scaleX(1)" : "scaleX(0)"),
          );
        }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
// NavbarCTA
// ─────────────────────────────────────────────────────────────
interface NavbarCTAProps {
  setIsOpen: (isOpen: boolean) => void;
}
function NavbarCTA({ setIsOpen }: NavbarCTAProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        {/* 2026 badge */}
        <div
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            border: "1px solid rgba(201,168,76,0.28)",
            background: "rgba(251,248,242,0.8)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "9px",
              color: "#8B6914",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Updated 2027
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-250"
          style={{
            background: "linear-gradient(135deg, #0D1B3E 0%, #162447 100%)",
            color: "#F5F0E8",
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            boxShadow:
              "0 3px 16px rgba(13,27,62,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 24px rgba(13,27,62,0.38), inset 0 1px 0 rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 3px 16px rgba(13,27,62,0.28), inset 0 1px 0 rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
        >
          Talk to Mentor
          <ArrowRight size={12} />
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DesktopNav
// ─────────────────────────────────────────────────────────────

function DesktopNav() {
  return (
    <nav
      className="hidden md:flex items-center gap-7"
      aria-label="Main navigation"
    >
      {navLinks.map((link) => (
        <NavLink key={link.href} link={link} />
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// MobileMenu
// ─────────────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [uniExpanded, setUniExpanded] = useState(false);
  const [isformOpen, setIsFormOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <EnquiryPopupForm
        isOpen={isformOpen}
        onClose={() => setIsFormOpen(false)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: "#F7F3EC" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Subtle noise / grid bg */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #0D1B3E 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                top: "-10%",
                right: "-5%",
                width: "60%",
                height: "50%",
                background:
                  "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
              }}
            />

            {/* Top bar */}
            <div
              className="relative z-50 flex items-center justify-between px-6 py-5 border-b shrink-0"
              style={{ borderColor: "rgba(201,168,76,0.15)" }}
            >
              <NavLogo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
                style={{
                  border: "1px solid rgba(13,27,62,0.15)",
                  background: "transparent",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(13,27,62,0.05)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "transparent")
                }
              >
                <X size={16} className="text-[#0A1628]" />
              </button>
            </div>

            {/* Nav items (Scrollable area) */}
            <div className="relative z-10 flex-1 overflow-y-auto">
              <nav
                className="flex flex-col px-8 pt-6 pb-8 gap-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, i) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.href}>
                        <motion.div
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.08 + i * 0.06,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="w-full flex items-center justify-between border-b group"
                          style={{ borderColor: "rgba(13,27,62,0.07)" }}
                        >
                          {/* Split text Link and Icon Button */}
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="flex-1 py-4"
                          >
                            <span
                              style={{
                                fontFamily:
                                  "'Cormorant Garamond', Georgia, serif",
                                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                                fontWeight: 400,
                                color: "#0A1628",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {link.label}
                            </span>
                          </Link>

                          <button
                            onClick={() => setUniExpanded((v) => !v)}
                            aria-expanded={uniExpanded}
                            className="px-4 py-4 -mr-4 flex items-center justify-center"
                          >
                            <ChevronDown
                              size={16}
                              className="text-[#8B6914] transition-transform duration-300"
                              style={{
                                transform: uniExpanded
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            />
                          </button>
                        </motion.div>

                        <AnimatePresence>
                          {uniExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 flex flex-col gap-0">
                                {universityLinks.map((uni) => (
                                  <Link
                                    key={uni.href}
                                    href={uni.href}
                                    onClick={onClose}
                                    className="flex items-center gap-2 py-2.5 group"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-60 flex-shrink-0" />
                                    <span
                                      style={{
                                        fontFamily:
                                          "'Libre Baskerville', Georgia, serif",
                                        fontSize: "14px",
                                        color: "#1A2844",
                                      }}
                                    >
                                      {uni.label}
                                    </span>
                                  </Link>
                                ))}
                                <Link
                                  href="/universities"
                                  onClick={onClose}
                                  className="flex items-center gap-1.5 py-2 mt-1"
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "'Libre Baskerville', Georgia, serif",
                                      fontSize: "12px",
                                      color: "#0D1B3E",
                                      fontWeight: 700,
                                      letterSpacing: "0.04em",
                                    }}
                                  >
                                    View All Universities
                                  </span>
                                  <ExternalLink
                                    size={10}
                                    className="text-[#8B6914]"
                                  />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.06,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex py-4 border-b w-full"
                        style={{ borderColor: "rgba(13,27,62,0.07)" }}
                      >
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "clamp(1.5rem, 5vw, 2rem)",
                            fontWeight: 400,
                            color: "#0A1628",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 px-8 pb-10 flex flex-col gap-3 shrink-0"
            >
              <div
                className="h-px w-full mb-2"
                style={{ background: "rgba(201,168,76,0.2)" }}
              />

              <button
                onClick={() => {
                  onClose();
                  setIsFormOpen(true);
                }}
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl w-full"
                style={{
                  background:
                    "linear-gradient(135deg, #0D1B3E 0%, #162447 100%)",
                  color: "#F5F0E8",
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 20px rgba(13,27,62,0.3)",
                }}
              >
                <span>Talk to Mentor</span>
                <ArrowRight size={13} />
              </button>

              <Link
                href="/resources"
                onClick={onClose}
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl w-full"
                style={{
                  border: "1px solid rgba(13,27,62,0.18)",
                  color: "#0D1B3E",
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                <BookOpen size={13} className="text-[#8B6914]" />
                <span>Download Free Guide</span>
              </Link>

              {/* Bottom tagline */}
              <p
                className="text-center mt-2"
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "9.5px",
                  color: "#9CA3AF",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Trusted LNAT Guidance for India
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Hamburger button
// ─────────────────────────────────────────────────────────────

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full gap-[5px] transition-all duration-200"
      style={{
        border: "1px solid rgba(13,27,62,0.14)",
        background: "rgba(251,248,242,0.8)",
      }}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="block w-3.5 h-px rounded-full"
        style={{ background: "#0A1628" }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
        className="block w-2.5 h-px rounded-full self-end mr-1"
        style={{ background: "#0A1628" }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="block w-3.5 h-px rounded-full"
        style={{ background: "#0A1628" }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Navbar
// ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 18);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: "#ffffff",
          backdropFilter: scrolled ? "blur(18px) saturate(1.3)" : "blur(10px)",
          WebkitBackdropFilter: scrolled
            ? "blur(18px) saturate(1.3)"
            : "blur(10px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.18)"
            : "1px solid rgba(201,168,76,0.08)",
          boxShadow: scrolled ? "0 2px 24px rgba(13,27,62,0.07)" : "none",
        }}
      >
        <div className="mx-auto max-w-335 px-6 lg:px-10 xl:px-14">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <NavLogo />

            {/* Desktop nav */}
            <DesktopNav />

            {/* Right CTA */}
            <div className="hidden md:block">
              <NavbarCTA setIsOpen={() => setIsOpen(true)} />
            </div>

            {/* Mobile hamburger */}
            <HamburgerButton
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            />
          </div>
        </div>

        {/* Thin gold accent line at very bottom */}
        <div
          className="h-px transition-all duration-400"
          style={{
            background: scrolled
              ? "linear-gradient(to right, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)"
              : "transparent",
          }}
        />
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer to push content below fixed navbar */}
      <div className="h-18 lg:h-20" aria-hidden="true" />
    </>
  );
}
