"use client";

import { motion } from "framer-motion";
import { SERVICES_DATA, ServiceItem } from "@/data/services";
import {
  Code,
  Search,
  Megaphone,
  TrendingUp,
  FileEdit,
  Target,
  Share2,
  Sliders,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { YoutubeIcon } from "./icons/BrandIcons";

interface ServicesProps {
  onSelectService?: (service: ServiceItem) => void;
}

function ServiceCardIcon({ name }: { name: string }) {
  const iconClass = "w-6 h-6 text-cyan-300";
  switch (name) {
    case "Code":
      return <Code className={iconClass} />;
    case "Search":
      return <Search className={iconClass} />;
    case "Youtube":
      return <YoutubeIcon className={iconClass} />;
    case "Megaphone":
      return <Megaphone className={iconClass} />;
    case "TrendingUp":
      return <TrendingUp className={iconClass} />;
    case "FileEdit":
      return <FileEdit className={iconClass} />;
    case "Target":
      return <Target className={iconClass} />;
    case "Share2":
      return <Share2 className={iconClass} />;
    case "Sliders":
      return <Sliders className={iconClass} />;
    default:
      return <Code className={iconClass} />;
  }
}

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="relative w-full py-20 sm:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-3"
          >
            <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
            <h2 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-cyan-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
              SERVICES I PROVIDE
            </h2>
            <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>
        </div>

        {/* 3x3 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.15 }}
              onClick={() => onSelectService && onSelectService(srv)}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,240,255,0.05)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.28)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Top Bar: Number Badge + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-all duration-300">
                    <ServiceCardIcon name={srv.iconName} />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                    {srv.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Bottom Action / Arrow */}
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
                <span>Explore Details</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.6)] transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
