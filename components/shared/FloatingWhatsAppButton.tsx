"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
  /\D/g,
  "",
);

const whatsappMessage = encodeURIComponent(
  "Hi, I want guidance for my LNAT and law admissions journey.",
);

const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  : "#";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const hasWhatsappNumber = Boolean(whatsappNumber);

  return (
    <a
      href={whatsappHref}
      target={hasWhatsappNumber ? "_blank" : undefined}
      rel={hasWhatsappNumber ? "noreferrer" : undefined}
      aria-label="Chat with LNAT Exam India on WhatsApp"
      aria-disabled={!hasWhatsappNumber}
      onClick={(event) => {
        if (!hasWhatsappNumber) {
          event.preventDefault();
        }
      }}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white shadow-[0_14px_32px_rgba(13,27,62,0.22)] transition-all duration-300 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 ${
        hasWhatsappNumber
          ? "hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(13,27,62,0.28)]"
          : "cursor-not-allowed opacity-60"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-green-400/20 blur-md" />
      <Image
        src="/images/WhatsApp_icon.png.webp"
        alt=""
        width={44}
        height={44}
        className="relative h-10 w-10 object-contain sm:h-12 sm:w-12"
        priority={false}
      />
    </a>
  );
}
