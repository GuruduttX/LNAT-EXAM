import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/utils/Navbar";
import Footer from "@/utils/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LNAT Exam India | Premium Preparation & Admissions Guide",
  description:
    "Comprehensive guide for Indian students taking the LNAT. Learn about top UK law universities, exam patterns, deadlines, and expert preparation strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-[#fbfaf7] text-[#0e1b2a]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
