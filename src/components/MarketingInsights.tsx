"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSIGHT_CATEGORIES, INSIGHT_ARTICLES, InsightArticle } from "@/data/insights";
import { ArrowRight, BookOpen, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { LinkedinIcon } from "./icons/BrandIcons";

export default function MarketingInsights() {
  const [selectedCategory, setSelectedCategory] = useState(INSIGHT_CATEGORIES[0]);

  const activeArticle =
    INSIGHT_ARTICLES.find((a) => a.category === selectedCategory) ||
    INSIGHT_ARTICLES[0];

  return (
    <section className="relative w-full py-20 sm:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase mb-4"
          >
            MARKETING INSIGHTS, STRAIGHT FROM THE FIELD.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed mb-8"
          >
            Follow along for daily marketing insights across SEO, GEO, paid
            media, and building a business in public.
          </motion.p>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10"
          >
            {INSIGHT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-105"
                      : "bg-black/70 text-slate-300 border border-cyan-500/20 hover:border-cyan-400 hover:text-white hover:bg-slate-900/60 shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Follow on LinkedIn Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-14"
          >
            <a
              href="https://linkedin.com/in/nahidul-islam"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-cyan-300 bg-black/80 border border-cyan-500/40 hover:border-cyan-300 hover:text-white hover:bg-slate-900/80 shadow-[0_0_20px_rgba(0,240,255,0.18)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 hover:scale-105"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              <span>Follow on LinkedIn</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Dynamic Insight Card for Selected Category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArticle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto p-7 sm:p-9 rounded-3xl bg-black/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                {activeArticle.category}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {activeArticle.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
              {activeArticle.summary}
            </p>

            <div className="pt-5 border-t border-slate-900">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Strategic Takeaways</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeArticle.keyTakeaways.map((takeaway, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
