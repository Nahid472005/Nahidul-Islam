"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import {
  LinkedinIcon,
  YoutubeIcon,
  TwitterXIcon,
  InstagramIcon,
  GithubIcon,
  FacebookIcon,
} from "./icons/BrandIcons";

interface FooterProps {
  onOpenLegal?: (title: string) => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/nahidul-islam",
      icon: <LinkedinIcon className="w-4 h-4" />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@nahidul.islam",
      icon: <YoutubeIcon className="w-4 h-4" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/nahidul-islam",
      icon: <GithubIcon className="w-4 h-4" />,
    },
    {
      name: "X",
      href: "https://x.com/nahidul_islam",
      icon: <TwitterXIcon className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/nahidul.islam",
      icon: <InstagramIcon className="w-4 h-4" />,
    },
    {
      name: "Facebook",
      href: "https://facebook.com/nahidul.islam",
      icon: <FacebookIcon className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="relative w-full py-12 sm:py-16 bg-black border-t border-cyan-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-900">
          {/* Left: [Small NI Logo] Nahidul Islam */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-900/30 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              <span className="text-[13px] font-black tracking-wider text-cyan-300">
                NI
              </span>
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              Nahidul Islam
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/80 border border-cyan-500/30 text-slate-400 hover:text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-cyan-500/30 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-400">
          <p>© 2026 Nahidul Islam. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal && onOpenLegal("Privacy Policy")}
              className="hover:text-cyan-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal("Terms of Service")}
              className="hover:text-cyan-300 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal("Sitemap")}
              className="hover:text-cyan-300 transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
