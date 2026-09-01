"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import {
  LinkedinIcon,
  YoutubeIcon,
  TwitterXIcon,
  InstagramIcon,
} from "./icons/BrandIcons";
import BrandStrip from "./BrandStrip";
import { SOCIAL_PLATFORMS } from "@/data/socialLinks";

interface HeroProps {
  onOpenWorkModal?: () => void;
  onOpenCVModal?: () => void;
}

export default function Hero({ onOpenWorkModal, onOpenCVModal }: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
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

  // Pull top 4 social links from central data
  const getSocialIcon = (id: string) => {
    switch (id) {
      case "linkedin":
        return <LinkedinIcon className="w-4 h-4" />;
      case "youtube":
        return <YoutubeIcon className="w-4 h-4" />;
      case "twitter":
        return <TwitterXIcon className="w-4 h-4" />;
      case "instagram":
        return <InstagramIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const heroSocials = SOCIAL_PLATFORMS.filter((s) =>
    ["linkedin", "youtube", "twitter", "instagram"].includes(s.id)
  );

  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-28 sm:pt-36 pb-16 flex flex-col justify-between items-center bg-black overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Text and CTA (7 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Available for new projects badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-cyan" />
              <span>Available for new projects</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Designing Digital <br />
              Experiences{" "}
              <span className="text-cyan-neon font-black drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                People Love.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8"
            >
              I&apos;m a Digital Marketer & Web Developer creating fast, modern
              and results-driven websites, marketing strategies and digital
              experiences that grow brands.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onOpenWorkModal}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all duration-300 hover:scale-105"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenCVModal}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 bg-black/60 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 text-cyan-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Borderless High-Res Animated Portrait + Vertical Floating Socials (5 cols on desktop) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            {/* Seamless 3D Tilt & Floating Portrait Container (No boxed border) */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[460px] aspect-[4/5] flex items-center justify-center"
            >
              {/* Continuous Subtle Breathing & Floating Portrait */}
              <motion.div
                animate={{
                  y: [-5, 6, -5],
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              >
                <Image
                  src="/images/portrait.jpg"
                  alt="Nahidul Islam - Digital Marketer & Web Developer"
                  fill
                  priority
                  className="object-cover object-top filter contrast-105 brightness-100 hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 480px"
                />

                {/* Soft gradient bottom blend into black */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </motion.div>
            </motion.div>

            {/* Vertical Floating Social Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-20"
            >
              {heroSocials.map((s, idx) => (
                <motion.a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: idx * 0.4,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-black/85 backdrop-blur-md border border-cyan-500/40 text-slate-300 hover:text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(0,240,255,0.6)] transition-all duration-300 hover:scale-115"
                >
                  {getSocialIcon(s.id)}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section 4: Trusted Brands Strip */}
        <BrandStrip />
      </div>
    </section>
  );
}
