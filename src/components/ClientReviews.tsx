"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { REVIEWS_DATA } from "@/data/reviews";
import { Star, Quote } from "lucide-react";

export default function ClientReviews() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-black">
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
              CLIENT REVIEWS
            </h2>
            <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,240,255,0.05)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-cyan-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-cyan-400 text-cyan-400 drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-200 leading-relaxed font-normal italic mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-900">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {rev.name}
                  </span>
                  <span className="text-xs text-slate-400">{rev.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
