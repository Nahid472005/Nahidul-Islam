"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2800; // ~2.8 seconds total
    const startTime = performance.now();

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Custom easing curve: start steady, slight suspense in middle, then finish
      const easedProgress =
        rawProgress < 0.7
          ? Math.pow(rawProgress / 0.7, 1.2) * 70
          : 70 + Math.pow((rawProgress - 0.7) / 0.3, 0.9) * 30;

      const currentVal = Math.min(Math.round(easedProgress), 100);
      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 700);
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 300);
  };

  if (isFinished) return null;

  // Funny deadline messages based on progress percentage
  const getDeadlineMessage = () => {
    if (progress < 25) return "Client: 'Need this urgently today...'";
    if (progress < 50) return "Deadline: 2 days left";
    if (progress < 75) return "3 AM • 4th Coffee • Fixing Bugs...";
    if (progress < 95) return "Deploying to Production... RUN!";
    return "Portfolio Ready! Welcome Nahidul Islam";
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-all duration-700 ease-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Outer Border Box matching reference image */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 border-2 border-white/20 rounded-lg pointer-events-none" />

      {/* Top Header / Skip Button */}
      <div className="absolute top-8 sm:top-12 md:top-16 left-8 sm:left-14 right-8 sm:right-14 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            Nahidul Portfolio • Initializing
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <span>Skip</span>
          <span className="text-zinc-500 group-hover:translate-x-0.5 transition-transform">
            [ESC] →
          </span>
        </button>
      </div>

      {/* Center Animation Area */}
      <div className="relative w-full max-w-2xl px-6 sm:px-10 flex flex-col items-center">
        {/* The Track + Reaper + Developer Container */}
        <div className="relative w-full h-32 flex items-end justify-start">
          {/* Base Track Background (White / Unfilled portion) */}
          <div className="relative w-full h-8 bg-white rounded-l-md rounded-r-md overflow-hidden">
            {/* Red Filled Progress Bar */}
            <div
              className="h-full bg-[#dc2626] transition-all duration-75 ease-linear rounded-l-md"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 
            Grim Reaper Silhouette 
            Positioned right at the leading edge of the red bar 
            and seamlessly colored in the same red (#dc2626)
          */}
          <div
            className="absolute bottom-8 transition-all duration-75 ease-linear pointer-events-none"
            style={{
              left: `${progress}%`,
              transform: "translateX(-75%)",
            }}
          >
            {/* Animated floating bob */}
            <div className="animate-bounce-gentle">
              <svg
                width="70"
                height="70"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Grim Reaper Body / Cowl / Robe */}
                <path
                  d="M10 95 C25 80 35 65 42 52 C45 48 44 42 38 40 C32 38 25 42 22 45 C20 40 28 32 40 30 C50 28 58 35 60 42 C62 50 65 60 70 75 C75 88 78 95 80 100 L0 100 Z"
                  fill="#dc2626"
                />
                {/* Hood Peak */}
                <path
                  d="M38 30 C30 24 20 25 15 28 C18 29 25 32 30 33 Z"
                  fill="#dc2626"
                />
                {/* Reaper Arm extended holding scythe handle */}
                <path
                  d="M52 46 C58 44 65 42 72 40 C75 39 77 42 74 44 C68 47 60 50 54 52 Z"
                  fill="#dc2626"
                />
                {/* Long Scythe Handle / Pole */}
                <line
                  x1="70"
                  y1="15"
                  x2="55"
                  y2="90"
                  stroke="#dc2626"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Scythe Crescent Blade */}
                <path
                  d="M70 16 C78 12 92 14 96 28 C92 24 82 22 71 22 C68 22 66 18 70 16 Z"
                  fill="#dc2626"
                />
                <path
                  d="M70 15 Q88 10 98 32 Q85 18 69 22 Z"
                  fill="#b91c1c"
                />
              </svg>
            </div>
          </div>

          {/* 
            Frantic Developer at Desk (Right End)
            Silhouetted in white to blend into the white track
          */}
          <div className="absolute right-0 bottom-0 pointer-events-none">
            <svg
              width="90"
              height="85"
              viewBox="0 0 110 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Desk Base & Legs */}
              <rect x="70" y="32" width="38" height="68" fill="#ffffff" rx="2" />
              <rect x="66" y="28" width="44" height="6" fill="#ffffff" rx="1" />

              {/* Computer Monitor */}
              <rect
                x="80"
                y="6"
                width="6"
                height="22"
                fill="#ffffff"
                transform="rotate(8 80 6)"
                rx="1"
              />
              {/* Monitor Screen Glowing Backlight */}
              <polygon
                points="78,8 60,18 64,28 80,24"
                fill="rgba(0, 240, 255, 0.25)"
                className="animate-pulse"
              />
              {/* Monitor Stand */}
              <rect x="85" y="24" width="4" height="6" fill="#ffffff" />
              <rect x="80" y="28" width="14" height="2" fill="#ffffff" />

              {/* Office Chair */}
              {/* Chair Backrest */}
              <rect
                x="24"
                y="30"
                width="6"
                height="24"
                fill="#ffffff"
                transform="rotate(-15 24 30)"
                rx="2"
              />
              {/* Chair Seat */}
              <rect x="26" y="48" width="22" height="5" fill="#ffffff" rx="2" />
              {/* Chair Column */}
              <rect x="35" y="53" width="4" height="15" fill="#ffffff" />
              {/* Chair Wheels Base */}
              <circle cx="30" cy="70" r="3" fill="#ffffff" />
              <circle cx="44" cy="70" r="3" fill="#ffffff" />
              <line x1="28" y1="68" x2="46" y2="68" stroke="#ffffff" strokeWidth="3" />

              {/* Developer Body (White Stick-figure) */}
              {/* Head */}
              <circle cx="50" cy="18" r="7" fill="#ffffff" />
              {/* Torso leaning forward to screen */}
              <path
                d="M48 25 C45 35 44 42 42 48"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Thigh & Leg */}
              <path
                d="M42 48 L56 50 L56 68"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Frantic Typing Arms */}
              <path
                d="M47 30 L65 32 L74 28"
                stroke="#ffffff"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-typing"
              />
            </svg>
          </div>
        </div>

        {/* Subtext and Progress Info */}
        <div className="mt-8 flex flex-col items-center gap-2">
          {/* Main Deadline Text (Matching Reference image) */}
          <div className="text-red-500 font-semibold tracking-wider text-sm sm:text-base animate-pulse font-mono">
            Deadline 2 days
          </div>

          {/* Dynamic Status / Progress */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
            <span className="text-cyan-400">[{progress}%]</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">{getDeadlineMessage()}</span>
          </div>
        </div>
      </div>

      {/* Bottom Info Footnote */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 text-center z-20">
        <p className="text-[11px] font-mono tracking-widest text-zinc-600 uppercase">
          Nahidul Islam • Web Developer & Digital Marketer
        </p>
      </div>

      <style jsx global>{`
        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes fastTyping {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-2px) rotate(-2deg);
          }
        }
        .animate-bounce-gentle {
          animation: bounceGentle 0.8s ease-in-out infinite;
        }
        .animate-typing {
          animation: fastTyping 0.15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
