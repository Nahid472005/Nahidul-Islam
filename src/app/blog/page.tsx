"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS, BlogPost } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tag,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Web Development",
    "Digital Marketing",
    "SEO",
    "YouTube SEO",
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Fixed Sticky Navbar */}
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-cyan" />
            <span>Knowledge Hub & Field Insights</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6"
          >
            Insights on{" "}
            <span className="text-cyan-neon font-black drop-shadow-[0_0_25px_rgba(0,240,255,0.5)]">
              Code, Growth & Marketing.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-10"
          >
            Practical playbooks, technical tutorials, and field-tested strategies across Web Development, SEO, YouTube Optimization, and Paid Acquisition.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full max-w-xl mb-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Search articles by topic, keyword, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-950/90 border border-cyan-500/25 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
            />
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-105"
                      : "bg-black/70 text-slate-300 border border-cyan-500/20 hover:border-cyan-400 hover:text-white hover:bg-slate-900/60 shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Featured Post Banner (Visible when on "All" and no search query) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block rounded-3xl overflow-hidden bg-black/80 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_35px_rgba(0,240,255,0.12)] hover:border-cyan-400 hover:shadow-[0_0_45px_rgba(0,240,255,0.3)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-400 text-black text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                    Featured Article
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/40">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-500/40">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {featuredPost.publishedAt}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex flex-col justify-between h-full rounded-3xl overflow-hidden bg-black/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,240,255,0.06)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.28)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono font-semibold text-cyan-300">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.publishedAt}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Read More Footer */}
                  <div className="px-6 py-4 border-t border-slate-900 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-cyan-300 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-cyan-400" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">No articles found</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6">
              No articles matched your search query &ldquo;{searchQuery}&rdquo;. Try another term.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2 rounded-full text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
