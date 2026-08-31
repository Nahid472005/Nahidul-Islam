"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VideoItem } from "@/data/videos";
import { X, ExternalLink, Clock, Eye } from "lucide-react";
import { YoutubeIcon } from "../icons/BrandIcons";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl rounded-3xl bg-black border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400">
                <YoutubeIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400">YouTube Video Preview</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Player Frame */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Video Footer Info */}
          <div className="p-6 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {video.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                {video.views}
              </span>
            </div>

            <a
              href={`https://youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
