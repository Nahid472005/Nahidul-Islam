"use client";

import { motion } from "framer-motion";
import { SOCIAL_PLATFORMS } from "@/data/socialLinks";
import { ArrowUpRight, Share2 } from "lucide-react";
import {
  YoutubeIcon,
  GithubIcon,
  TwitterXIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
} from "./icons/BrandIcons";

function PlatformIcon({ name, color }: { name: string; color: string }) {
  switch (name) {
    case "Youtube":
      return <YoutubeIcon className="w-5 h-5 text-red-500" />;
    case "Github":
      return <GithubIcon className="w-5 h-5 text-white" />;
    case "Twitter":
      return <TwitterXIcon className="w-5 h-5 text-cyan-400" />;
    case "Linkedin":
      return <LinkedinIcon className="w-5 h-5 text-sky-400" />;
    case "Instagram":
      return <InstagramIcon className="w-5 h-5 text-pink-400" />;
    case "Facebook":
      return <FacebookIcon className="w-5 h-5 text-blue-400" />;
    case "Tiktok":
      return <TikTokIcon className="w-5 h-5 fill-cyan-300" />;
    default:
      return <Share2 className="w-5 h-5 text-cyan-400" />;
  }
}

export default function ConnectSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-black border-t border-cyan-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 block"
            >
              CONNECT
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Find me <span className="text-cyan-neon">online.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Follow the tutorials, code, products, and occasional behind-the-scenes
              updates across the platforms I use.
            </p>
          </motion.div>
        </div>

        {/* 7 Social Platform Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SOCIAL_PLATFORMS.map((platform, idx) => (
            <motion.a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex items-center justify-between p-5 rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-400/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300">
                  <PlatformIcon name={platform.iconName} color={platform.color} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {platform.handle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/40 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-400/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
