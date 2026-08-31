"use client";

import { motion } from "framer-motion";
import { SKILLS_DATA, SkillItem } from "@/data/skills";
import {
  Code2,
  FileCode2,
  Cpu,
  Layers,
  Search,
  Link2,
  Sliders,
  Megaphone,
  Share2,
  TrendingUp,
  Target,
  FileEdit,
  BarChart3,
  Globe,
  Database,
  Palette,
} from "lucide-react";
import { YoutubeIcon } from "./icons/BrandIcons";

// Helper to render icon for each skill
function SkillIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "html":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
          <path d="M1.5 0h21l-1.91 21.48L12 24l-8.59-2.52L1.5 0zm17.09 4.88H5.41l.36 4.07h11.03l-.44 4.89-4.36 1.21-4.36-1.21-.29-3.23H3.69l.57 6.35 7.74 2.15 7.74-2.15 1.08-12.08-.23-.01z" />
        </svg>
      );
    case "css":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
          <path d="M1.5 0h21l-1.91 21.48L12 24l-8.59-2.52L1.5 0zm17.02 5.02H5.48l.34 3.73h10.9l-.36 4.03-4.36 1.21-4.36-1.21-.24-2.73H3.74l.47 5.25 7.79 2.16 7.79-2.16 1.08-12.03-.35-.25z" />
        </svg>
      );
    case "javascript":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.81l1.454-.93c-.48-.795-1.2-1.305-2.205-1.425-.33-.045-.96-.03-1.47.165-1.246.465-1.875 1.44-1.68 2.535.195 1.155 1.05 1.83 2.565 2.415.96.39 1.485.66 1.605 1.185.195.825-.45 1.29-1.47 1.29-1.155 0-1.77-.66-2.07-1.44l-1.545.885c.42 1.035 1.35 1.77 2.76 1.89 1.755.15 3.39-.78 3.42-2.04zm-8.026-6.15h-1.92v6.645c0 1.605-.63 2.19-2.025 2.19-.51 0-1.005-.09-1.365-.255l-.33 1.515c.495.225 1.155.36 1.95.36 2.475 0 3.69-1.305 3.69-3.57V12.126z" />
        </svg>
      );
    case "react":
      return (
        <svg className="w-6 h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
          <circle cx="0" cy="0" r="2.05" fill={color} />
          <g stroke={color} strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "typescript":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
          <path d="M1.5 0h21l-1.91 21.48L12 24l-8.59-2.52L1.5 0zm9.4 6.89H5.2v2.18h2.3v8.04h2.4V9.07h2.3V6.89h-1.3zm7.9 3.82c-.3-.43-.73-.77-1.3-1.01-.57-.24-1.25-.36-2.04-.36-.7 0-1.3.1-1.8.31-.5.21-.89.5-1.18.88-.29.38-.43.83-.43 1.34 0 .46.12.86.37 1.2.25.34.6.62 1.05.84.45.22 1 .4 1.65.54.49.11.9.23 1.23.36.33.13.58.28.75.45.17.17.25.38.25.63 0 .32-.14.59-.42.8-.28.21-.68.32-1.2.32-.57 0-1.04-.13-1.41-.39-.37-.26-.6-.66-.69-1.2l-2.22.31c.14.89.56 1.58 1.26 2.07.7.49 1.63.74 2.79.74.88 0 1.64-.13 2.28-.39.64-.26 1.13-.63 1.47-1.11.34-.48.51-1.06.51-1.74 0-.58-.15-1.08-.45-1.5-.3-.42-.74-.75-1.32-.99-.58-.24-1.29-.42-2.13-.54-.45-.07-.84-.16-1.17-.27-.33-.11-.58-.24-.75-.39-.17-.15-.25-.33-.25-.54 0-.27.12-.49.36-.66.24-.17.58-.26 1.02-.26.49 0 .89.11 1.2.33.31.22.51.54.6 0.96l2.1-.38c-.1-.7-.44-1.26-1.02-1.69z" />
        </svg>
      );
    case "nextjs":
      return (
        <svg className="w-6 h-6 fill-white" viewBox="0 0 180 180">
          <path
            fill="currentColor"
            d="M90 0a90 90 0 1 0 90 90A90 90 0 0 0 90 0zm38.8 135.2L74 65.5v65.7H58.8V48.8h15.2l54.8 69.7V48.8h15.2v86.4z"
          />
        </svg>
      );
    case "mongodb":
      return <Database className="w-6 h-6" style={{ color }} />;
    case "tailwind":
      return <Palette className="w-6 h-6" style={{ color }} />;
    case "seo-onpage":
      return <Search className="w-6 h-6" style={{ color }} />;
    case "seo-offpage":
      return <Link2 className="w-6 h-6" style={{ color }} />;
    case "seo-tech":
      return <Sliders className="w-6 h-6" style={{ color }} />;
    case "youtube":
      return <YoutubeIcon className="w-6 h-6" style={{ color }} />;
    case "social-mgmt":
      return <Megaphone className="w-6 h-6" style={{ color }} />;
    case "social-mktg":
      return <Share2 className="w-6 h-6" style={{ color }} />;
    case "digital-mktg":
      return <TrendingUp className="w-6 h-6" style={{ color }} />;
    case "google-ads":
      return <Target className="w-6 h-6" style={{ color }} />;
    case "meta-ads":
      return <Share2 className="w-6 h-6" style={{ color }} />;
    case "content":
      return <FileEdit className="w-6 h-6" style={{ color }} />;
    case "analytics":
      return <BarChart3 className="w-6 h-6" style={{ color }} />;
    default:
      return <Code2 className="w-6 h-6 text-cyan-400" />;
  }
}

export default function SkillsCarousel() {
  const duplicatedSkills = [...SKILLS_DATA, ...SKILLS_DATA];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-black overflow-hidden border-t border-b border-cyan-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-3"
        >
          <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
          <h2 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-cyan-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
            MY SKILLS
          </h2>
          <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-black via-black/80 to-transparent" />

        <div className="flex animate-infinite-scroll">
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.id}-${index}`}
              className="group flex-shrink-0 flex items-center gap-3 px-5 py-3.5 mx-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.06)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-110"
                style={{
                  boxShadow: `0 0 10px ${skill.bgGlow}`,
                }}
              >
                <SkillIcon type={skill.iconType} color={skill.color} />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  {skill.name}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
