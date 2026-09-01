"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Briefcase, Users, ArrowUpRight } from "lucide-react";

export default function AboutMe() {
  const stats = [
    {
      icon: <Award className="w-5 h-5 text-cyan-300" />,
      value: "1+",
      label: "Years Experience",
      detail: "Full-stack development & SEO",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-cyan-300" />,
      value: "50+",
      label: "Projects Completed",
      detail: "Web apps & growth campaigns",
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-300" />,
      value: "Client",
      label: "Focused",
      detail: "100% satisfaction delivery",
    },
  ];

  return (
    <section id="about" className="relative w-full py-20 sm:py-28 bg-black">
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
              ABOUT ME
            </h2>
            <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT: Seamless Borderless Portrait with New Uploaded Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] flex items-center justify-center">
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              >
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Nahidul Islam - About Me"
                  fill
                  className="object-cover object-top filter contrast-105 hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Story and Stat Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Helping brands grow with{" "}
              <span className="text-cyan-neon font-black">code & strategy.</span>
            </h3>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
              I&apos;m Nahidul Islam, a Digital Marketer and Web Developer with a passion for
              building high-performance websites, data-driven marketing strategies, and digital
              experiences that deliver real results. I combine creative design, clean code, and SEO
              expertise to deliver results that matter.
            </p>

            {/* 3 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((st, i) => (
                <motion.div
                  key={st.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group relative p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.06)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 group-hover:scale-110 transition-transform">
                      {st.icon}
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {st.value}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200">{st.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{st.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
