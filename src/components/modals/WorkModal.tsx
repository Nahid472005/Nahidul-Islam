"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA, ProjectCaseStudy } from "@/data/projects";
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkModal({ isOpen, onClose }: WorkModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  if (!isOpen) return null;

  const categories = ["All", "Web Development", "SEO & Marketing", "YouTube Growth", "Paid Media"];

  const filteredProjects =
    selectedFilter === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
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
          className="relative w-full max-w-5xl my-8 rounded-3xl bg-black border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-900 bg-slate-950/90">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Case Studies</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Selected Work & Impact
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 px-6 sm:px-8 py-4 border-b border-slate-900 bg-black/95">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === cat
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                    : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects List Container */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="lg:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {/* Info */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                        {proj.category}
                      </span>
                      <span className="text-xs text-slate-400">{proj.client}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {proj.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {proj.overview}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-black/60 border border-slate-800">
                      {proj.metrics.map((m, i) => (
                        <div key={i} className="text-center">
                          <p className="text-xs font-mono text-slate-400">{m.label}</p>
                          <p className="text-sm font-black text-cyan-300">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-6 sm:px-8 py-4 border-t border-slate-900 bg-slate-950/90 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Want similar results for your business?
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
