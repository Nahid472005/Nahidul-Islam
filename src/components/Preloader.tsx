"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Kill animation stages:
  // stage 0: running / typing (0% - 85%)
  // stage 1: prepare strike / panic (86% - 93%)
  // stage 2: fatal slash / developer knocked out (94% - 100%)
  const isPreparing = progress >= 86 && progress < 94;
  const isKilled = progress >= 94;

  useEffect(() => {
    const duration = 3000; // ~3 seconds total
    const startTime = performance.now();

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Custom easing curve: smooth cruise, brief anticipation near end, then final slash
      let easedProgress: number;
      if (rawProgress < 0.8) {
        easedProgress = (rawProgress / 0.8) * 85;
      } else if (rawProgress < 0.92) {
        easedProgress = 85 + ((rawProgress - 0.8) / 0.12) * 9; // slow down for suspense
      } else {
        easedProgress = 94 + ((rawProgress - 0.92) / 0.08) * 6; // quick strike to 100
      }

      const currentVal = Math.min(Math.round(easedProgress), 100);
      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Give 600ms to enjoy the kill/slash comedic aftermath before fading out
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 600);
        }, 700);
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
    }, 250);
  };

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-all duration-700 ease-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Outer Border Box - Sleek and compact */}
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

      {/* Center Animation Area - Sized down to a compact & refined layout */}
      <div className="relative w-full max-w-lg px-4 sm:px-8 flex flex-col items-center">
        {/* The Track + Reaper + Developer Container */}
        <div className="relative w-full h-24 flex items-end justify-start">
          {/* Base Track Background (White / Unfilled portion) */}
          <div className="relative w-full h-6 bg-white rounded-sm overflow-hidden">
            {/* Red Filled Progress Bar */}
            <div
              className="h-full bg-[#dc2626] transition-all duration-75 ease-linear rounded-l-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 
            Grim Reaper Silhouette
            Moves with the front edge of the red bar.
            Performs attack wind-up and strike slash when reaching developer!
          */}
          <div
            className="absolute bottom-6 transition-all duration-75 ease-linear pointer-events-none z-10"
            style={{
              left: `${progress}%`,
              transform: `translateX(${isKilled ? "-45%" : "-80%"})`,
            }}
          >
            <div
              className={`transition-transform duration-200 ${
                isKilled
                  ? "scale-110"
                  : isPreparing
                  ? "scale-105"
                  : "animate-bounce-gentle"
              }`}
            >
              <svg
                width="54"
                height="54"
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

                {/* Animated Scythe + Arm Assembly */}
                <g
                  className="transition-transform duration-150 origin-[50px_50px]"
                  style={{
                    transform: isKilled
                      ? "rotate(55deg) translate(14px, -6px)"
                      : isPreparing
                      ? "rotate(-35deg) translate(-6px, -4px)"
                      : "rotate(0deg)",
                  }}
                >
                  {/* Reaper Arm holding scythe */}
                  <path
                    d="M52 46 C58 44 65 42 72 40 C75 39 77 42 74 44 C68 47 60 50 54 52 Z"
                    fill="#dc2626"
                  />
                  {/* Long Scythe Handle */}
                  <line
                    x1="72"
                    y1="12"
                    x2="55"
                    y2="92"
                    stroke="#dc2626"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Scythe Crescent Blade */}
                  <path
                    d="M72 13 C82 9 96 11 100 25 C95 21 85 19 73 19 C70 19 68 15 72 13 Z"
                    fill="#dc2626"
                  />
                  <path
                    d="M72 12 Q90 7 101 28 Q87 15 71 19 Z"
                    fill="#b91c1c"
                  />
                </g>

                {/* Dramatic Slash Arc Effect when killed */}
                {isKilled && (
                  <g className="animate-slash-flash">
                    <path
                      d="M75 10 Q110 35 105 75"
                      stroke="#ff0044"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      className="filter drop-shadow-[0_0_8px_#ff0044]"
                    />
                    <line
                      x1="80"
                      y1="20"
                      x2="110"
                      y2="55"
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
            Silhouetted in white to blend into the white track.
            When struck, developer collapses/tumbles off the chair!
          */}
          <div className="absolute right-0 bottom-0 pointer-events-none z-10">
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
                fill={isKilled ? "rgba(220, 38, 38, 0.4)" : "rgba(0, 240, 255, 0.25)"}
                className="animate-pulse"
              />
              {/* Monitor Stand */}
              <rect x="83" y="26" width="4" height="5" fill="#ffffff" />
              <rect x="78" y="30" width="14" height="2" fill="#ffffff" />

              {/* Office Chair */}
              <g
                className="transition-transform duration-300 origin-[35px_68px]"
                style={{
                  transform: isKilled ? "rotate(-12deg)" : "rotate(0deg)",
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
                Developer Body
                When isKilled: Developer knocked out / falls backward!
                When isPreparing: Arms in panic / shock!
              */}
              <g
                className="transition-all duration-300 origin-[42px_55px]"
                style={{
                  transform: isKilled
                    ? "translate(-14px, 12px) rotate(-85deg)"
                    : isPreparing
                    ? "translate(0px, -2px) rotate(-5deg)"
                    : "rotate(0deg)",
                }}
              >
                {/* Head */}
                <circle cx="49" cy="20" r="6" fill="#ffffff" />
                {/* KO Eyes / Shock effect when killed */}
                {isKilled && (
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
                {/* Thigh & Leg */}
                <path
                  d="M41 48 L54 50 L54 67"
                  stroke="#ffffff"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Arms */}
                {isKilled ? (
                  /* Drooped knocked-out arms */
                  <path
                    d="M45 30 L32 40 L28 48"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ) : isPreparing ? (
                  /* Arms thrown up in panic */
                  <path
                    d="M45 28 L35 14 L30 18"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="animate-panic"
                  />
                ) : (
                  /* Normal fast typing arms */
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

              {/* Floating "RIP" / Death skull particles when killed */}
              {isKilled && (
                <g className="animate-fade-up">
                  <text
                    x="20"
                    y="18"
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

        {/* Minimal Progress Indicator (Deadline text removed) */}
        <div className="mt-5 flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="text-red-400 font-semibold">{progress}%</span>
          <span>•</span>
          <span className="text-zinc-400">
            {isKilled
              ? "Developer Down! Initializing..."
              : isPreparing
              ? "Watch Out...!"
              : "Loading Portfolio..."}
          </span>
        </div>
      </div>

      {/* Bottom Info Footnote */}
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
            transform: rotate(-10deg);
          }
        }
        @keyframes slashFlash {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1);
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
        .animate-fade-up {
          animation: fadeUpText 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
