"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Sparkles, Smartphone } from "lucide-react";
import BreakoutGame from "./BreakoutGame";
import GlowingPortfolioCard from "./GlowingPortfolioCard";

interface InteractiveGameSectionProps {
  onOpenContact?: () => void;
  onOpenWork?: () => void;
}

export default function InteractiveGameSection({
  onOpenContact,
  onOpenWork,
}: InteractiveGameSectionProps) {
  const features = [
    {
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
      title: "CLEAN CODE",
      desc: "Well Structured",
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "SMOOTH ANIMATION",
      desc: "60 FPS Physics",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: "MODERN UI",
      desc: "Dark & Cinematic",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      title: "FULLY RESPONSIVE",
      desc: "Mobile & Desktop",
    },
  ];

  return (
    <section
      id="arcade"
      className="relative w-full py-20 sm:py-32 bg-black overflow-hidden flex flex-col items-center justify-center text-white"
    >
      {/* Top Ambient Glow / Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ================= 1. METALLIC HERO HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-10 sm:mb-14"
        >
          {/* 3D Metallic Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f5eed6] to-[#b89552] drop-shadow-[0_10px_35px_rgba(234,179,8,0.35)] select-none">
            PORTFOLIO
            <br />
            ANIMATION
          </h1>

          {/* Subtitle Badge Pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/20 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-200 uppercase font-mono">
              REACT + TAILWIND & NEXT.JS
            </span>
          </div>
        </motion.div>

        {/* ================= 2. MIDDLE INTERACTIVE GAME & 3D CARD ================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center justify-center mb-10 sm:mb-14">
          {/* LEFT: Breakout Mini-Game (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <BreakoutGame />
          </div>

          {/* MIDDLE: Doodle Annotation ("Scroll to play! ->") on desktop */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center -mx-4 pointer-events-none z-20">
            <div className="relative flex flex-col items-center animate-bounce-gentle">
              {/* Speech bubble */}
              <div className="px-3 py-1.5 rounded-full border-2 border-dashed border-amber-300/80 bg-black/80 backdrop-blur-md text-amber-300 text-[11px] font-mono whitespace-nowrap shadow-[0_0_15px_rgba(252,211,77,0.3)]">
                Scroll to play!
              </div>
              {/* Curving SVG doodle arrow */}
              <svg
                width="48"
                height="40"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-300 mt-1"
              >
                <path
                  d="M10 5 C 25 15, 35 25, 42 32"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 3"
                />
                <polyline
                  points="36,32 43,32 43,25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: 3D Glowing Card (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <GlowingPortfolioCard
              onOpenContact={onOpenContact}
              onOpenWork={onOpenWork}
            />
          </div>
        </div>

        {/* ================= 3. BOTTOM FEATURE CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#13110f]/80 to-[#090807]/90 border border-amber-500/20 hover:border-amber-400/50 shadow-[0_0_20px_rgba(234,179,8,0.06)] hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] transition-all duration-300 hover:-translate-y-1 backdrop-blur-md"
            >
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-400/20 mb-3 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                {f.title}
              </h4>
              <p className="mt-1 text-[11px] sm:text-xs text-zinc-400 font-normal">
                {f.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
