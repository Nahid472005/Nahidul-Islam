"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";

interface StatsCTAProps {
  onOpenAudit?: () => void;
}

function CounterNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-black text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCTA({ onOpenAudit }: StatsCTAProps) {
  const statsList = [
    { value: 150, suffix: "+", label: "Projects Completed" },
    { value: 80, suffix: "+", label: "Happy Clients" },
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 15, suffix: "+", label: "Industries Served" },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {statsList.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,240,255,0.05)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-300 mb-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <CounterNumber target={st.value} suffix={st.suffix} />
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
                {st.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Large CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative p-8 sm:p-14 lg:p-16 rounded-[32px] bg-gradient-to-b from-cyan-950/40 via-black to-black border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col items-center text-center overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to scale your business?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl mb-8">
            LET&apos;S START A <br />
            <span className="text-cyan-neon font-black drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">
              CONVERSATION.
            </span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenAudit}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] transition-all duration-300 hover:scale-105"
            >
              <span>Book a Free Audit</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-slate-200 bg-black/60 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-cyan-300" />
              <span>Send a Message</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
