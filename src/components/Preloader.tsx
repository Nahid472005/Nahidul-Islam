"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Exact 4-stage synchronization:
  // 1. RUNNING (0% - 75%): Reaper chases forward.
  // 2. WINDUP (76% - 87%): Reaper closes in, raises scythe high. Developer notices & panics.
  // 3. SLASH & LEAP (88% - 93%): Reaper leaps forward right up to the desk and swings scythe down!
  // 4. IMPACT (94% - 100%): Reaper stands right at the desk, scythe slams into desk, developer collapses!
  const isWindup = progress >= 76 && progress < 88;
  const isSlashing = progress >= 88 && progress < 94;
  const isImpact = progress >= 94;

  useEffect(() => {
    const duration = 3000; // ~3.0 seconds total
    const startTime = performance.now();

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Custom easing curve:
      // - 0 to 0.65: Cruise up to 75%
      // - 0.65 to 0.82: Windup suspense from 75% to 87%
      // - 0.82 to 0.88: Fast strike & lunge forward from 87% to 94%
      // - 0.88 to 1.0: Impact & hold at the desk from 94% to 100%
      let easedProgress: number;
      if (rawProgress < 0.65) {
        easedProgress = (rawProgress / 0.65) * 75;
      } else if (rawProgress < 0.82) {
        easedProgress = 75 + ((rawProgress - 0.65) / 0.17) * 12; // Windup (75 -> 87)
      } else if (rawProgress < 0.88) {
        easedProgress = 87 + ((rawProgress - 0.82) / 0.06) * 7; // Fast strike to desk (87 -> 94)
      } else {
        easedProgress = 94 + ((rawProgress - 0.88) / 0.12) * 6; // Impact at desk (94 -> 100)
      }

      const currentVal = Math.min(Math.round(easedProgress), 100);
      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Let user see the Reaper standing triumphant at the desk for 850ms
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 600);
        }, 850);
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
    }, 200);
  };

  if (isFinished) return null;

  // The red progress bar and the Reaper now travel all the way up to 90.5% (right at the desk edge!)
  // This completely eliminates the empty white gap and places the Reaper right beside the desk!
  const fillWidthPercent = Math.min((progress / 100) * 90.5, 90.5);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-all duration-700 ease-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Outer Border Box - Refined Frame */}
      <div className="absolute inset-5 sm:inset-8 md:inset-10 border border-white/15 rounded-md pointer-events-none" />

      {/* Top Header / Skip Button */}
      <div className="absolute top-6 sm:top-9 md:top-12 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            Nahidul Islam • Portfolio
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <span>Skip</span>
          <span className="text-zinc-500 group-hover:translate-x-0.5 transition-transform">
            [ESC] →
          </span>
        </button>
      </div>

      {/* Center Animation Area */}
      <div className="relative w-full max-w-md sm:max-w-lg px-4 sm:px-6 flex flex-col items-center">
        {/* The Track + Reaper + Developer Container */}
        <div className="relative w-full h-24 flex items-end justify-start">
          {/* Base Track Background (Solid White with rounded corners) */}
          <div className="relative w-full h-6 bg-white rounded-sm overflow-hidden">
            {/* Red Filled Progress Bar - Expands all the way right up to the desk! */}
            <div
              className="h-full bg-[#dc2626] transition-all duration-75 ease-linear rounded-l-sm"
              style={{ width: `${fillWidthPercent}%` }}
            />
          </div>

          {/* 
            Grim Reaper Silhouette:
            - Moves smoothly across the bar and comes RIGHT UP to the desk!
            - Windup: Raises scythe high.
            - Slash: Swings scythe directly down onto the desk surface.
            - Impact: Stands right next to the desk with the scythe embedded in the desk!
          */}
          <div
            className="absolute bottom-6 transition-all duration-75 ease-linear pointer-events-none z-20"
            style={{
              left: `${fillWidthPercent}%`,
              transform: `translateX(${isImpact || isSlashing ? "-48%" : "-75%"})`,
            }}
          >
            <div
              className={`transition-transform duration-150 ${
                isImpact
                  ? "scale-105"
                  : isSlashing
                  ? "scale-110"
                  : isWindup
                  ? "scale-105"
                  : "animate-bounce-gentle"
              }`}
            >
              <svg
                width="52"
                height="52"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Grim Reaper Cloaked Body */}
                <path
                  d="M10 95 C25 80 35 65 42 52 C45 48 44 42 38 40 C32 38 25 42 22 45 C20 40 28 32 40 30 C50 28 58 35 60 42 C62 50 65 60 70 75 C75 88 78 95 80 100 L0 100 Z"
                  fill="#dc2626"
                />
                {/* Hood Peak */}
                <path
                  d="M38 30 C30 24 20 25 15 28 C18 29 25 32 30 33 Z"
                  fill="#dc2626"
                />

                {/* 
                  Animated Scythe Assembly:
                  - Windup: Rotates up & back (-48deg)
                  - Slash / Impact: Swings directly down and slams onto the desk (66deg)!
                */}
                <g
                  className="origin-[48px_48px] transition-transform duration-100 ease-in"
                  style={{
                    transform:
                      isImpact || isSlashing
                        ? "rotate(66deg) translate(20px, 0px)"
                        : isWindup
                        ? "rotate(-48deg) translate(-10px, -6px)"
                        : "rotate(0deg)",
                  }}
                >
                  {/* Reaper Arm */}
                  <path
                    d="M52 46 C58 44 65 42 72 40 C75 39 77 42 74 44 C68 47 60 50 54 52 Z"
                    fill="#dc2626"
                  />
                  {/* Long Scythe Handle */}
                  <line
                    x1="72"
                    y1="10"
                    x2="55"
                    y2="92"
                    stroke="#dc2626"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Scythe Crescent Blade */}
                  <path
                    d="M72 11 C82 7 96 9 100 23 C95 19 85 17 73 17 C70 17 68 13 72 11 Z"
                    fill="#dc2626"
                  />
                  <path
                    d="M72 10 Q90 5 101 26 Q87 13 71 17 Z"
                    fill="#b91c1c"
                  />
                </g>

                {/* Slash trail arc right on top of the desk */}
                {(isSlashing || isImpact) && (
                  <g className="animate-slash-flash">
                    <path
                      d="M60 -5 Q115 15 112 65"
                      stroke="#ff0033"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      className="filter drop-shadow-[0_0_10px_#ff0033]"
                    />
                    <line
                      x1="75"
                      y1="10"
                      x2="114"
                      y2="50"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* 
            Developer at Desk (Right End)
            - Attached to the right end.
            - Reaper comes right up next to the desk to strike!
            - Developer gets knocked out backward onto the chair.
          */}
          <div
            className={`absolute right-0 bottom-0 pointer-events-none z-10 ${
              isImpact ? "animate-desk-shake" : ""
            }`}
          >
            <svg
              width="74"
              height="70"
              viewBox="0 0 110 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Desk Base & Legs */}
              <rect x="70" y="34" width="36" height="66" fill="#ffffff" rx="1.5" />
              <rect x="66" y="30" width="42" height="5" fill="#ffffff" rx="1" />

              {/* Computer Monitor */}
              <rect
                x="79"
                y="10"
                width="5"
                height="20"
                fill="#ffffff"
                transform="rotate(8 79 10)"
                rx="1"
              />
              {/* Monitor Screen Backlight */}
              <polygon
                points="77,12 60,20 63,28 78,24"
                fill={isImpact ? "rgba(220, 38, 38, 0.5)" : "rgba(0, 240, 255, 0.25)"}
                className="animate-pulse"
              />
              {/* Monitor Stand */}
              <rect x="83" y="26" width="4" height="5" fill="#ffffff" />
              <rect x="78" y="30" width="14" height="2" fill="#ffffff" />

              {/* Office Chair */}
              <g
                className="origin-[35px_68px] transition-transform duration-300"
                style={{
                  transform: isImpact ? "rotate(-14deg)" : "rotate(0deg)",
                }}
              >
                {/* Chair Backrest */}
                <rect
                  x="24"
                  y="32"
                  width="5"
                  height="22"
                  fill="#ffffff"
                  transform="rotate(-15 24 32)"
                  rx="1.5"
                />
                {/* Chair Seat */}
                <rect x="26" y="48" width="20" height="4.5" fill="#ffffff" rx="1.5" />
                {/* Chair Column */}
                <rect x="34" y="52.5" width="4" height="15.5" fill="#ffffff" />
                {/* Chair Wheels Base */}
                <circle cx="29" cy="69" r="2.5" fill="#ffffff" />
                <circle cx="43" cy="69" r="2.5" fill="#ffffff" />
                <line x1="27" y1="67" x2="45" y2="67" stroke="#ffffff" strokeWidth="2.5" />
              </g>

              {/* 
                Developer Body:
                - Types during 0% - 75%
                - Panics during 76% - 87%
                - Freezes during 88% - 93%
                - Collapses backward directly upon impact at >= 94%!
              */}
              <g
                className="origin-[42px_55px] transition-transform duration-200 ease-out"
                style={{
                  transform: isImpact
                    ? "translate(-14px, 14px) rotate(-85deg)"
                    : isWindup || isSlashing
                    ? "translate(-2px, -3px) rotate(-8deg)"
                    : "rotate(0deg)",
                }}
              >
                {/* Head */}
                <circle cx="49" cy="20" r="6" fill="#ffffff" />

                {/* KO Face appears strictly upon impact */}
                {isImpact && (
                  <text
                    x="45"
                    y="22"
                    fontSize="7"
                    fill="#dc2626"
                    fontWeight="bold"
                  >
                    x_x
                  </text>
                )}

                {/* Torso */}
                <path
                  d="M47 26 C44 35 43 42 41 48"
                  stroke="#ffffff"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Legs */}
                <path
                  d="M41 48 L54 50 L54 67"
                  stroke="#ffffff"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Arms Animation based on exact state */}
                {isImpact ? (
                  /* Knocked out drooped arms */
                  <path
                    d="M45 30 L30 42 L25 50"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ) : isWindup || isSlashing ? (
                  /* Raised terrified hands */
                  <path
                    d="M45 28 L34 12 L28 16"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="animate-panic"
                  />
                ) : (
                  /* Normal rapid typing */
                  <path
                    d="M46 30 L63 32 L72 28"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-typing"
                  />
                )}
              </g>

              {/* Slash Impact Sparks right on the desk & monitor */}
              {isImpact && (
                <g className="animate-slash-flash">
                  {/* Blade strike mark right on the desk edge */}
                  <circle cx="70" cy="30" r="3.5" fill="#ff0033" />
                  <circle cx="70" cy="30" r="1.5" fill="#ffffff" />
                  {/* Cut mark */}
                  <line
                    x1="65"
                    y1="25"
                    x2="77"
                    y2="35"
                    stroke="#ff0033"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Sparks flying */}
                  <circle cx="62" cy="20" r="1.5" fill="#ff0033" />
                  <circle cx="78" cy="22" r="1.5" fill="#ffaa00" />
                  <circle cx="58" cy="28" r="1.2" fill="#ffffff" />
                </g>
              )}

              {/* Floating RIP text */}
              {isImpact && (
                <g className="animate-fade-up">
                  <text
                    x="16"
                    y="15"
                    fill="#dc2626"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="900"
                    className="tracking-wider"
                  >
                    R.I.P ☠
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="mt-5 flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="text-red-400 font-semibold">{progress}%</span>
          <span>•</span>
          <span className="text-zinc-400">
            {isImpact
              ? "Developer Down! Loading site..."
              : isSlashing
              ? "STRIKE!"
              : isWindup
              ? "Watch Out...!"
              : "Loading Portfolio..."}
          </span>
        </div>
      </div>

      {/* Bottom Footnote */}
      <div className="absolute bottom-6 sm:bottom-9 md:bottom-12 text-center z-20">
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
            transform: translateY(-3px);
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
        @keyframes panicWave {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-12deg);
          }
        }
        @keyframes slashFlash {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          40% {
            opacity: 1;
            transform: scale(1.15);
          }
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
        }
        @keyframes deskShake {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(-1deg);
          }
          50% {
            transform: translateY(2px) rotate(1deg);
          }
          75% {
            transform: translateY(-1px) rotate(0deg);
          }
        }
        @keyframes fadeUpText {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }
        .animate-bounce-gentle {
          animation: bounceGentle 0.8s ease-in-out infinite;
        }
        .animate-typing {
          animation: fastTyping 0.15s ease-in-out infinite;
        }
        .animate-panic {
          animation: panicWave 0.2s ease-in-out infinite;
        }
        .animate-slash-flash {
          animation: slashFlash 0.3s ease-out forwards;
        }
        .animate-desk-shake {
          animation: deskShake 0.25s ease-in-out;
        }
        .animate-fade-up {
          animation: fadeUpText 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
