"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#0df0d8", "#38bdf8", "#ffffff"],
      });
    }, 1000);
  };

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 block"
          >
            CONTACT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed"
          >
            Have a project in mind or want to work together? Feel free to reach
            out. I&apos;d love to hear from you.
          </motion.p>
        </div>

        {/* Contact Layout: Left Info + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Contact Information Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_25px_rgba(0,240,255,0.06)] flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Email
                  </h3>
                  <a
                    href="mailto:nahidul@example.com"
                    className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    nahidul@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Phone
                  </h3>
                  <a
                    href="tel:+8801234567890"
                    className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    +880 1234-567890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Location
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Availability
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    Mon - Sat | 9 AM - 9 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Glowing Neon Paper-Plane Illustration Container */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-br from-cyan-950/30 via-black to-black border border-cyan-500/20 flex items-center justify-center overflow-hidden min-h-[160px]">
              {/* Cyan Animated Floating Paper Plane Vector */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  x: [-3, 4, -3],
                  rotate: [0, 4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <svg
                  className="w-24 h-24 stroke-cyan-300 fill-none drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                {/* Glowing Trail */}
                <div className="absolute -bottom-2 -left-8 w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] opacity-70" />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-10 rounded-3xl bg-black/85 backdrop-blur-2xl border border-cyan-500/25 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mb-6">
                    Thank you for reaching out. I will review your project
                    details and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        service: "Web Development",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-cyan-300 border border-cyan-500/40 hover:border-cyan-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Service Interested In
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) =>
                        setFormState({ ...formState, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                    >
                      <option value="Web Development">01 — Web Development</option>
                      <option value="SEO Optimization">02 — SEO Optimization</option>
                      <option value="YouTube SEO">03 — YouTube SEO</option>
                      <option value="Social Media Management">04 — Social Media Management</option>
                      <option value="Digital Marketing">05 — Digital Marketing</option>
                      <option value="Content Creation">06 — Content Creation</option>
                      <option value="Google Ads">07 — Google Ads</option>
                      <option value="Meta Ads">08 — Meta Ads</option>
                      <option value="Technical SEO">09 — Technical SEO</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project, goals, and timeline..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all duration-300 hover:scale-[1.01] mt-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
