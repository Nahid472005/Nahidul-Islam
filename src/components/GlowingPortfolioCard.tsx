"use client";

import React, { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ArrowUpRight, Mail } from "lucide-react";

interface GlowingPortfolioCardProps {
  onOpenContact?: () => void;
  onOpenWork?: () => void;
}

export default function GlowingPortfolioCard({
  onOpenContact,
  onOpenWork,
}: GlowingPortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth 3D tilt with Framer Motion springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 180,
    damping: 18,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* 3D Tilted Perspective Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[16/11] rounded-2xl bg-gradient-to-br from-[#181614]/95 via-[#0e0d0c]/90 to-[#070605]/95 border-2 border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.18),inset_0_0_30px_rgba(251,191,36,0.06)] backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center cursor-pointer group"
      >
        {/* Top-Right Light Burst Sparkles (Matches the reel!) */}
        <div className="absolute -top-3 -right-3 pointer-events-none">
          <div className="relative">
            {/* Burst ray lines */}
            <span className="absolute -top-3 right-5 w-0.5 h-3 bg-amber-300 rotate-[-25deg] shadow-[0_0_8px_#fde047]" />
            <span className="absolute -top-4 right-2 w-0.5 h-3.5 bg-amber-300 rotate-[10deg] shadow-[0_0_8px_#fde047]" />
            <span className="absolute -top-2 -right-2 w-0.5 h-3 bg-amber-300 rotate-[45deg] shadow-[0_0_8px_#fde047]" />
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse drop-shadow-[0_0_12px_rgba(252,211,77,0.9)]" />
          </div>
        </div>

        {/* Ambient Inner Glowing Lighting */}
        <div className="absolute inset-0 rounded-2xl bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

        {/* Card Header Status */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="w-full flex items-center justify-between text-xs font-mono text-zinc-400"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase">Live Preview</span>
          </div>

          <span className="text-zinc-500 text-[11px]">Next.js • React 19</span>
        </div>

        {/* Main 3D Metallic Title & Role */}
        <div style={{ transform: "translateZ(45px)" }} className="my-auto flex flex-col items-center">
          <h3 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-[#fef08a] to-[#ca8a04] drop-shadow-[0_4px_20px_rgba(251,191,36,0.35)]">
            PORTFOLIO
          </h3>

          <p className="mt-2 text-sm sm:text-base font-medium text-zinc-300 tracking-wide">
            Web Developer & Digital Marketer
          </p>

          <p className="mt-1 text-xs text-amber-300/80 font-mono">
            Nahidul Islam
          </p>
        </div>

        {/* Action Button: [ Contact ] matching reel */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="w-full flex items-center justify-center gap-3 pt-2"
        >
          <button
            onClick={onOpenContact}
            className="group/btn relative px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>

          {onOpenWork && (
            <button
              onClick={onOpenWork}
              className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:scale-105"
            >
              My Works
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
