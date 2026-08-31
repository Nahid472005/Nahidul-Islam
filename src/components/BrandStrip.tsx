"use client";

import { motion } from "framer-motion";

export default function BrandStrip() {
  const brands = [
    {
      name: "Google",
      svg: (
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M12.24 10.285V13.8h6.887C18.2 16.35 15.64 18.2 12.24 18.2c-3.41 0-6.17-2.76-6.17-6.2s2.76-6.2 6.17-6.2c1.62 0 3.09.59 4.23 1.57l2.67-2.67C17.43 3.06 14.99 2 12.24 2 6.58 2 2 6.58 2 12.2s4.58 10.2 10.24 10.2c5.92 0 9.84-4.16 9.84-10.01 0-.69-.07-1.37-.2-2.105H12.24z" />
        </svg>
      ),
    },
    {
      name: "Microsoft",
      svg: (
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M1 1h10v10H1V1zm12 0h10v10H13V1zM1 13h10v10H1V13zm12 0h10v10H13V13z" />
        </svg>
      ),
    },
    {
      name: "Dropbox",
      svg: (
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M6 3l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM0 13.5l6-4 6 4-6 4-6-4zm24 0l-6-4-6 4 6 4 6-4zM6 18.5l6-4 6 4-6 4.5-6-4.5z" />
        </svg>
      ),
    },
    {
      name: "Spotify",
      svg: (
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.348-1.435-5.304-1.76-8.785-.963-.335.077-.67-.133-.747-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.502 9.715 1.113.294.18.386.563.207.857zm1.225-2.723c-.226.368-.71.485-1.077.26-2.687-1.652-6.785-2.131-9.965-1.166-.413.126-.848-.109-.974-.522-.125-.413.109-.848.522-.973 3.632-1.102 8.147-.568 11.234 1.325.367.225.485.709.26 1.076zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.128-1.168-.622-.15-.494.128-1.018.622-1.168 3.532-1.072 9.404-.866 13.115 1.338.445.264.59.838.327 1.282-.264.444-.838.59-1.282.328z" />
        </svg>
      ),
    },
    {
      name: "Slack",
      svg: (
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
        </svg>
      ),
    },
    {
      name: "Webflow",
      svg: (
        <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
          <path d="M19.123 5.093c-2.428 0-4.048 1.488-4.707 3.51-.555-1.92-2.023-3.51-4.707-3.51-3.238 0-5.709 2.62-5.709 5.86 0 3.238 2.471 5.858 5.709 5.858 2.684 0 4.152-1.59 4.707-3.51.659 2.022 2.279 3.51 4.707 3.51 3.238 0 5.709-2.62 5.709-5.858 0-3.24-2.471-5.86-5.709-5.86zM9.709 13.911c-1.62 0-2.809-1.288-2.809-2.958 0-1.67 1.189-2.958 2.809-2.958 1.619 0 2.809 1.288 2.809 2.958 0 1.67-1.19 2.958-2.809 2.958zm9.414 0c-1.62 0-2.809-1.288-2.809-2.958 0-1.67 1.189-2.958 2.809-2.958 1.619 0 2.809 1.288 2.809 2.958 0 1.67-1.19 2.958-2.809 2.958z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full pt-10 pb-6">
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-xs sm:text-sm font-medium tracking-wide uppercase text-slate-400 mb-6"
      >
        Trusted by forward-thinking brands worldwide
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 text-slate-500"
      >
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex items-center gap-2 group transition-all duration-300 hover:text-cyan-300 hover:scale-105 cursor-default"
          >
            <div className="transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              {b.svg}
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-400 group-hover:text-cyan-200 transition-colors">
              {b.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
