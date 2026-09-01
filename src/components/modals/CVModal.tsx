"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, CheckCircle2, Sparkles, Briefcase, GraduationCap, Award } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate text/markdown or trigger PDF download
    const cvText = `NAHIDUL ISLAM — Digital Marketer & Web Developer\n\nExperience: 3+ Years\nProjects: 100+ Completed\nSpecialties: Next.js, React, TypeScript, SEO, Digital Marketing, YouTube SEO, Google & Meta Ads\nContact: Nahidul472005@gmail.com | WhatsApp: +8801609750137 | Dhaka, Bangladesh`;
    const blob = new Blob([cvText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Nahidul_Islam_CV.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-black border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-900 bg-slate-950/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Nahidul Islam — Curriculum Vitae
                </h3>
                <p className="text-xs text-slate-400">
                  Digital Marketer & Web Developer
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CV Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
            {/* Summary */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Summary</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                High-impact Digital Marketer and Full-Stack Web Developer with 3+ years of experience delivering fast, conversion-optimized Next.js web applications and scaling organic & paid traffic across Google, Meta, and YouTube.
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Core Competencies</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  "Next.js / React / TypeScript",
                  "Technical SEO & On-Page SEO",
                  "YouTube Growth & Ranking",
                  "Meta & Google Ads Funnels",
                  "Tailwind CSS & Animations",
                  "Conversion Rate Optimization",
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Highlights */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Selected Experience</span>
              </h4>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Senior Digital Marketer & Lead Developer</span>
                    <span className="text-[11px] font-mono text-cyan-400">2023 - Present</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Engineered high-performance web platforms and managed omnichannel paid media budgets scaling client revenues by 200%+.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Full-Stack Web & SEO Strategist</span>
                    <span className="text-[11px] font-mono text-cyan-400">2021 - 2023</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Built 60+ client websites, performed in-depth technical audits, and generated millions of organic search impressions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-slate-900 bg-slate-950/90 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Format: Verified CV / Resume
            </span>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
