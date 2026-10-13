"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Sparkles, Smartphone } from "lucide-react";
import BreakoutGame from "./BreakoutGame";

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
      icon: <Code2 className="w-5 h-5 text-zinc-300" />,
      title: "CLEAN CODE",
      desc: "Well Structured",
    },
    {
      icon: <Zap className="w-5 h-5 text-zinc-300" />,
      title: "SMOOTH ANIMATION",
      desc: "60 FPS Physics",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-zinc-300" />,
      title: "MODERN UI",
      desc: "Dark & Minimal",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-zinc-300" />,
      title: "FULLY RESPONSIVE",
      desc: "Mobile & Desktop",
    },
  ];

  return (
    <section
      id="arcade"
      className="relative w-full py-20 sm:py-32 bg-black overflow-hidden flex flex-col items-center justify-center text-white"
    >
      {/* Ambient Subtle Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
              INTERACTIVE ARCADE • CANVAS 2D
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white select-none">
            BREAKOUT PLAYGROUND
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Built with React, HTML5 Canvas physics, and zero external game libraries.
          </p>
        </motion.div>

        {/* ================= HELLO WORLD GAME (MATCHING IMAGE 2) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center mb-12 sm:mb-16"
        >
          <BreakoutGame />
        </motion.div>

        {/* ================= BOTTOM FEATURE CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-1 backdrop-blur-md"
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 mb-3 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase font-mono">
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
