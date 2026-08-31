import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nahidul Islam — Digital Marketer & Web Developer",
  description:
    "Official portfolio of Nahidul Islam. Specializing in fast Next.js & React web development, technical SEO, YouTube channel growth, and high-ROI digital marketing campaigns.",
  keywords: [
    "Nahidul Islam",
    "Digital Marketer",
    "Web Developer",
    "SEO Expert",
    "YouTube SEO",
    "Next.js Developer",
    "Google Ads",
    "Meta Ads",
  ],
  authors: [{ name: "Nahidul Islam" }],
  openGraph: {
    title: "Nahidul Islam — Digital Marketer & Web Developer",
    description:
      "Designing Digital Experiences People Love. Fast, modern and results-driven websites, marketing strategies and digital experiences that grow brands.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white min-h-screen antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
