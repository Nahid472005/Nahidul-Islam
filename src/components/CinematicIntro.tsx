"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Phase 1: "Hello, World" typing / glow (0s - 1.5s)
  // Phase 2: Name reveal "NAHIDUL ISLAM" in 3D metallic style (1.5s - 3.2s)
  // Phase 3: Smooth cinematic exit (3.2s - 3.8s)
  const [phase, setPhase] = useState<"hello" | "name" | "exit">("hello");
  const [typedText, setTypedText] = useState("");
  const fullHello = "Hello, World.";

  useEffect(() => {
    // Type out "Hello, World."
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullHello.length) {
        setTypedText(fullHello.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Switch to "name" phase after a short pause
        setTimeout(() => {
          setPhase("name");
          // Switch to "exit" after showing the name
          setTimeout(() => {
            setPhase("exit");
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 1800);
        }, 500);
      }
    }, 70);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(typeInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase("exit");
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        >
          {/* Ambient Cinematic Backlight Spotlights */}
          <div className="absolute w-[600px] h-[350px] rounded-full bg-amber-500/15 blur-[160px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[180px] pointer-events-none" />

          {/* Top Skip Button */}
          <div className="absolute top-6 sm:top-10 right-6 sm:right-12 z-20">
            <button
              onClick={handleSkip}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <span>Skip</span>
              <span className="text-zinc-500 group-hover:translate-x-0.5 transition-transform">
                [ESC] →
              </span>
            </button>
          </div>

          {/* Center Stage Animation */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
            {/* Phase 1: "Hello, World." */}
            {phase === "hello" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs sm:text-sm font-mono text-amber-400/80 mr-2">
                  &lt;code&gt;
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                  {typedText}
                </span>
                <span className="inline-block w-2.5 sm:w-3.5 h-7 sm:h-10 bg-amber-400 animate-pulse ml-1 rounded-xs" />
                <span className="text-xs sm:text-sm font-mono text-amber-400/80 ml-2">
                  &lt;/code&gt;
                </span>
              </motion.div>
            )}

            {/* Phase 2: Grand Name Reveal "NAHIDUL ISLAM" in 3D Metallic Styling */}
            {phase === "name" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* 3D Metallic Name Typography */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fbf7eb] to-[#b89552] drop-shadow-[0_12px_45px_rgba(234,179,8,0.45)]">
                  NAHIDUL
                  <br />
                  ISLAM
                </h1>

                {/* Subtitle Badge Pill matching the reel */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 sm:mt-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-950/30 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-200 uppercase font-mono">
                    WEB DEVELOPER & DIGITAL MARKETER
                  </span>
                </motion.div>

                {/* Sleek Line Progress Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "160px" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-6 rounded-full"
                />
              </motion.div>
            )}
          </div>

          {/* Bottom Footer Credit */}
          <div className="absolute bottom-6 sm:bottom-10 text-center z-20">
            <p className="text-[11px] font-mono tracking-widest text-zinc-600 uppercase">
              PORTFOLIO • NEXT.JS & REACT
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
