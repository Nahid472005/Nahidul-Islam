"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, BlogPost } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { LinkedinIcon, TwitterXIcon } from "@/components/icons/BrandIcons";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyan-400 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/20">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-cyan-300 font-mono">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-2">
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="w-8 h-8 rounded-full bg-slate-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-colors"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-cyan-500/25 shadow-[0_0_30px_rgba(0,240,255,0.15)] mb-12">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 850px"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed">
          <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed border-l-2 border-cyan-400 pl-4">
            {post.content.introduction}
          </p>

          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <p className="text-slate-300 leading-relaxed">{section.body}</p>

              {section.bulletPoints && (
                <ul className="space-y-2.5 my-4">
                  {section.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.codeSnippet && (
                <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-x-auto shadow-[0_0_20px_rgba(0,240,255,0.08)]">
                  <pre className="text-xs sm:text-sm font-mono text-cyan-300 leading-relaxed">
                    <code>{section.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] my-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Conclusion & Next Steps</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-8 pb-12 border-b border-slate-900">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 text-cyan-300 border border-cyan-500/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="pt-12">
          <h3 className="text-xl font-bold text-white mb-6">Related Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase text-cyan-400">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-1 mb-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 pt-2">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
