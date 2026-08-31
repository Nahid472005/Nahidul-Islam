"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAudit?: () => void;
}

export default function Navbar({ onOpenAudit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const isBlogRoute = pathname?.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (!isBlogRoute) {
        const sections = ["home", "services", "about", "blog", "contact"];
        const scrollPos = window.scrollY + 200;
        for (const s of sections) {
          const el = document.getElementById(s);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(s);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogRoute]);

  const navLinks = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Blog", href: "/blog", id: "blog" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 sm:px-8 lg:px-12 py-5 pointer-events-none transition-all duration-300">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl px-6 sm:px-8 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.18)]"
            : "bg-black/75 backdrop-blur-md border border-cyan-500/25 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
        }`}
      >
        {/* Left: [Small NI Logo] Nahidul Islam */}
        <Link
          href="/#home"
          className="group flex items-center gap-3 text-white no-underline focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-900/30 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_18px_rgba(0,240,255,0.7)] group-hover:border-cyan-300 transition-all duration-300">
            <span className="text-[13px] font-black tracking-wider text-cyan-300 group-hover:text-white transition-colors">
              NI
            </span>
            <div className="absolute inset-0 rounded-lg bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-sm sm:text-base font-semibold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
            Nahidul Islam
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-3">
          {navLinks.map((link) => {
            const isActive = isBlogRoute
              ? link.id === "blog"
              : activeSection === link.id;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full ${
                  isActive
                    ? "text-cyan-300 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#00f0ff]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Let's Talk Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] hover:scale-105"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-black/60 border border-cyan-500/30 text-slate-200 hover:text-cyan-300 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,240,255,0.2)] md:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = isBlogRoute
                  ? link.id === "blog"
                  : activeSection === link.id;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
