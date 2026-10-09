import type { Metadata } from "next";
import {
  Playfair_Display,
  Lato,
  Cormorant_Garamond,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/utils/Navbar";
import Footer from "@/utils/Footer";
import FloatingWhatsAppButton from "@/components/shared/FloatingWhatsAppButton";
import MotionProvider from "@/components/shared/MotionProvider";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  // Only used for section headings below the fold; preloading it put a 38 KB
  // file in front of the hero image on every page.
  preload: false,
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  // Not preloaded: the homepage never renders Lato (its sections use Poppins),
  // so a preload there was 28 KB competing with the hero image. Other pages
  // still fetch it as soon as the stylesheet is parsed.
  preload: false,
});

// Navbar fonts. These used to be pulled in with a CSS `@import` from
// fonts.googleapis.com, which blocked rendering and chained two extra
// cross-origin requests. next/font self-hosts them and inlines the @font-face.
// (Poppins is only used on the homepage, so it lives in app/page.tsx.)
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  preload: false,
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  preload: false,
});

export const metadata: Metadata = {
  title: "LNAT Exam India | Premium Preparation & Admissions Guide",
  description:
    "Comprehensive guide for Indian students taking the LNAT. Learn about top UK law universities, exam patterns, deadlines, and expert preparation strategies.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://lnatexamindia.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} ${cormorant.variable} ${baskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-[#fbfaf7] text-[#0e1b2a]">
        <MotionProvider>
          <Navbar />
          {children}
          <FloatingWhatsAppButton />
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
