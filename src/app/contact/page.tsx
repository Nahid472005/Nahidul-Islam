"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SOCIAL_PLATFORMS } from "@/data/socialLinks";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Zap,
  ShieldCheck,
  Globe2,
  DollarSign,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import {
  YoutubeIcon,
  GithubIcon,
  TwitterXIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
} from "@/components/icons/BrandIcons";

function getSocialIcon(id: string) {
  switch (id) {
    case "youtube":
      return <YoutubeIcon className="w-5 h-5 text-red-500" />;
    case "github":
      return <GithubIcon className="w-5 h-5 text-white" />;
    case "twitter":
      return <TwitterXIcon className="w-5 h-5 text-cyan-400" />;
    case "linkedin":
      return <LinkedinIcon className="w-5 h-5 text-sky-400" />;
    case "instagram":
      return <InstagramIcon className="w-5 h-5 text-pink-400" />;
    case "facebook":
      return <FacebookIcon className="w-5 h-5 text-blue-400" />;
    case "tiktok":
      return <TikTokIcon className="w-5 h-5 fill-cyan-300" />;
    default:
      return <Globe2 className="w-5 h-5 text-cyan-400" />;
  }
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "$500 - $1,500",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Nahidul472005@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/Nahidul472005@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `⚡ New Project Inquiry from ${formState.name} (${formState.service})`,
          Name: formState.name,
          Email: formState.email,
          WhatsApp_Phone: formState.phone || "Not provided",
          Service: formState.service,
          Budget_Range: formState.budget,
          Project_Details: formState.message,
          _template: "table",
          _captcha: "false",
        }),
      });

      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#0df0d8", "#38bdf8", "#ffffff"],
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "How quickly will you reply to my message?",
      a: "I usually reply within 2 to 4 hours during business hours (9:00 AM - 9:00 PM GMT+6). If you need an instant response, you can message me directly on WhatsApp at +880 1609750137.",
    },
    {
      q: "What is your typical project timeline?",
      a: "Most web development and SEO audit projects take between 1 to 3 weeks depending on scope, complexity, and revisions. Full-scale marketing roadmaps are delivered within 5 to 7 days.",
    },
    {
      q: "Do you work with international clients worldwide?",
      a: "Yes! I work with clients from the US, UK, Canada, Australia, Europe, Asia, and Bangladesh. I support flexible milestone-based contracts and transparent async communication.",
    },
    {
      q: "Can I get a free audit before committing?",
      a: "Absolutely. I provide a complimentary 15-minute digital growth & website audit to identify fast wins for your traffic, conversion rate, and search rankings.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Fixed Sticky Header */}
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono uppercase tracking-widest text-[11px]">
              Available for New Projects • Let&apos;s Talk
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              Extraordinary.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
          >
            Have a project in mind, want to scale your digital marketing, or need
            a high-performance Next.js website? Send a message or reach out
            directly via WhatsApp.
          </motion.p>
        </div>

        {/* 2-Column Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          {/* LEFT: Contact Cards & Direct WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct WhatsApp Callout Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-[#25D366]/15 via-black to-slate-950 border border-[#25D366]/40 shadow-[0_0_30px_rgba(37,211,102,0.15)] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Direct WhatsApp Chat
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fastest response • Instant chat
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                Prefer chatting directly? You can message me anytime on WhatsApp
                for project discussions, quotes, or questions.
              </p>

              <a
                href="https://wa.me/8801609750137?text=Hi%20Nahidul,%20I%20am%20interested%20in%20your%20services!"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.65)] hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+880 1609750137)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Contact Details List */}
            <div className="p-7 rounded-3xl bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_25px_rgba(0,240,255,0.06)] flex flex-col gap-5">
              {/* Email */}
              <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-900">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Direct Email
                    </h4>
                    <a
                      href="mailto:Nahidul472005@gmail.com"
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      Nahidul472005@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 pb-5 border-b border-slate-900">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Phone / WhatsApp
                  </h4>
                  <a
                    href="tel:+8801609750137"
                    className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    +880 1609750137
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 pb-5 border-b border-slate-900">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Location
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    Dhaka, Bangladesh • Worldwide Remote
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Working Hours
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    Mon – Sat • 9:00 AM – 9:00 PM (GMT+6)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels Strip */}
            <div className="p-6 rounded-3xl bg-black/80 border border-cyan-500/20 flex flex-col gap-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Connect on Social Networks
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {SOCIAL_PLATFORMS.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-slate-950/90 border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all hover:scale-105 group"
                  >
                    {getSocialIcon(s.id)}
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Full-Feature Interactive Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-10 rounded-3xl bg-black/85 backdrop-blur-2xl border border-cyan-500/25 shadow-[0_0_40px_rgba(0,240,255,0.08)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 mb-6 shadow-[0_0_30px_rgba(0,240,255,0.5)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 max-w-md mb-8 leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formState.name}</span>.
                    Your message has been delivered to{" "}
                    <span className="text-cyan-300 font-semibold">
                      Nahidul472005@gmail.com
                    </span>
                    . I will review your project details and get back to you within 2–4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        phone: "",
                        service: "Web Development",
                        budget: "$500 - $1,500",
                        message: "",
                      });
                    }}
                    className="px-8 py-3 rounded-full text-xs font-bold text-cyan-300 border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-950/40 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-900">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Project Inquiry Form
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Fill out the details below to start your project.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                      <Zap className="w-3 h-3" />
                      <span>Fast Response</span>
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Connor"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@example.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 555-0199 or +880..."
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Service Needed *
                      </label>
                      <select
                        value={formState.service}
                        onChange={(e) =>
                          setFormState({ ...formState, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                      >
                        <option value="Web Development">01 — Web Development (Next.js/React)</option>
                        <option value="SEO Optimization">02 — SEO Optimization</option>
                        <option value="YouTube SEO & Growth">03 — YouTube SEO & Growth</option>
                        <option value="Social Media Marketing">04 — Social Media Marketing</option>
                        <option value="Digital Marketing Strategy">05 — Digital Marketing Strategy</option>
                        <option value="Google & Meta Ads">06 — Google & Meta Ads</option>
                        <option value="Technical SEO & Performance">07 — Technical SEO Audit</option>
                        <option value="Full Comprehensive Package">08 — Full End-to-End Growth Package</option>
                      </select>
                    </div>
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        "<$500",
                        "$500 - $1,500",
                        "$1,500 - $3,000",
                        "$3,000+",
                      ].map((budgetOption) => (
                        <button
                          key={budgetOption}
                          type="button"
                          onClick={() =>
                            setFormState({ ...formState, budget: budgetOption })
                          }
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                            formState.budget === budgetOption
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                              : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                          }`}
                        >
                          {budgetOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Project Details & Goals *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe what you want to build, existing website URL (if any), target audience, and ideal launch deadline..."
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
                    className="group relative flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm sm:text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all duration-300 hover:scale-[1.01] mt-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending message to Nahidul...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Everything You Need to Know
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-black/80 border border-cyan-500/20 overflow-hidden transition-all duration-300 hover:border-cyan-400/50"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900/60 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
