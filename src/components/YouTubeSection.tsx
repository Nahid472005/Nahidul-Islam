"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { VIDEOS_DATA, VideoItem } from "@/data/videos";
import { SOCIAL_PLATFORMS } from "@/data/socialLinks";
import { Play, ArrowRight } from "lucide-react";
import { YoutubeIcon } from "./icons/BrandIcons";

interface YouTubeSectionProps {
  onSelectVideo?: (video: VideoItem) => void;
}

export default function YouTubeSection({ onSelectVideo }: YouTubeSectionProps) {
  const youtubeLink =
    SOCIAL_PLATFORMS.find((s) => s.id === "youtube")?.url ||
    "https://www.youtube.com/@NahidulIslam-47";

  return (
    <section id="blog" className="relative w-full py-20 sm:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Label, Title & Subscribe Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 block"
            >
              04 / YOUTUBE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              LATEST FROM YOUTUBE
            </motion.h2>
          </div>

          {/* Subscribe on YouTube Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.45)] hover:shadow-[0_0_30px_rgba(0,240,255,0.75)] transition-all duration-300 hover:scale-105"
            >
              <YoutubeIcon className="w-4 h-4 fill-black" />
              <span>Subscribe on YouTube</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* 4 Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS_DATA.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => onSelectVideo && onSelectVideo(vid)}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,240,255,0.06)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-400/90 text-black shadow-[0_0_20px_rgba(0,240,255,0.8)] group-hover:scale-115 group-hover:bg-cyan-300 transition-all duration-300">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                  {vid.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 leading-snug">
                    {vid.title}
                  </h3>
                  {vid.subtitle && (
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {vid.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-cyan-400/80 font-mono text-[11px]">{vid.views}</span>
                  <span className="group-hover:text-cyan-300 transition-colors font-medium">Watch Now →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
