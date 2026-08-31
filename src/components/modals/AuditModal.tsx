"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [auditType, setAuditType] = useState("Full Growth & SEO Audit");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!website || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#38bdf8", "#ffffff"],
      });
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-black border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] p-6 sm:p-8 z-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Consultation</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            Book a Free Growth & Tech Audit
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            I will personally review your website speed, Core Web Vitals,
            SEO rankings, and marketing funnels to deliver a custom action plan.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                Audit Request Received!
              </h4>
              <p className="text-xs text-slate-300 max-w-xs mb-6">
                You will receive your comprehensive video teardown & report at {email} within 24-48 hours.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Your Website / Channel URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://yourbrand.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Your Best Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@yourbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Audit Focus
                </label>
                <select
                  value={auditType}
                  onChange={(e) => setAuditType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Full Growth & SEO Audit">Full Growth & SEO Audit</option>
                  <option value="Web Performance & Code Audit">Web Performance & Code Audit</option>
                  <option value="YouTube Channel Optimization Audit">YouTube Channel Optimization Audit</option>
                  <option value="Meta & Google Ads Funnel Audit">Meta & Google Ads Funnel Audit</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all cursor-pointer disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Submit Free Audit Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
