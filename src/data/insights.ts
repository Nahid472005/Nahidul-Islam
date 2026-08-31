export interface InsightArticle {
  id: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  keyTakeaways: string[];
}

export const INSIGHT_CATEGORIES = [
  "Digital Marketing",
  "SEO & Content",
  "On-Page SEO",
  "Off-Page SEO",
  "YouTube SEO",
  "Social Media",
  "Growth Hacking",
  "Entrepreneurship",
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "ins-1",
    category: "Digital Marketing",
    title: "The 2026 Paid Acquisition Playbook: Maximizing First-Party Data",
    summary:
      "How to navigate post-cookie privacy changes using server-side tagging, conversion APIs, and predictive LTV audience segments to consistently beat industry benchmark CPAs.",
    readTime: "4 min read",
    keyTakeaways: [
      "Implement GTM Server-Side Container for Meta CAPI & Google Enhanced Conversions",
      "Shift creative testing velocity to 10+ hook variations per sprint",
      "Build custom LTV-based seed audiences rather than broad targeting",
    ],
  },
  {
    id: "ins-2",
    category: "SEO & Content",
    title: "Generative Engine Optimization (GEO): Ranking in Perplexity & SearchGPT",
    summary:
      "Traditional keywords are shifting towards AI citation density. Here is the framework for structuring technical documentation and content hubs to get sourced by LLM answer engines.",
    readTime: "5 min read",
    keyTakeaways: [
      "Use clear, factual entity relationships in JSON-LD and markdown tables",
      "Optimize for high information gain vs generic summaries",
      "Build topical authority clusters with cross-verified source citations",
    ],
  },
  {
    id: "ins-3",
    category: "On-Page SEO",
    title: "Modern Core Web Vitals: INP & LCP Masterclass for Next.js",
    summary:
      "Achieving 99+ on mobile Lighthouse while preserving dynamic client-side interactivity using selective hydration, critical CSS, and image priority fetch.",
    readTime: "6 min read",
    keyTakeaways: [
      "Prioritize Largest Contentful Paint images with priority prop",
      "Eliminate main-thread blocking JavaScript to score sub-100ms INP",
      "Utilize native container queries over heavy JS resize listeners",
    ],
  },
  {
    id: "ins-4",
    category: "Off-Page SEO",
    title: "Digital PR & High-Authority Backlink Acquisition Without Spam",
    summary:
      "How we gained 140+ DA70+ editorial backlinks by creating original data studies, industry calculators, and interactive market research tools.",
    readTime: "5 min read",
    keyTakeaways: [
      "Build linkable interactive web tools rather than generic guest posts",
      "Pitch journalists exclusive survey data with pre-rendered data charts",
      "Maintain active relationship syndication in target niche communities",
    ],
  },
  {
    id: "ins-5",
    category: "YouTube SEO",
    title: "Cracking the 2026 YouTube Algorithm: CTR & Retention Engineering",
    summary:
      "A deep dive into video pacing, first-30-seconds hook retention, A/B thumbnail testing, and semantic tag indexing that scaled 4 channels past 100k subscribers.",
    readTime: "4 min read",
    keyTakeaways: [
      "Engineer the first 15 seconds to validate the title thumbnail promise",
      "Pattern interrupts every 45-60 seconds to reset viewer engagement drop-off",
      "Optimize chapters and transcript captions for semantic video search",
    ],
  },
  {
    id: "ins-6",
    category: "Social Media",
    title: "Organic Brand Distribution: Building a Founder-Led Social Moat",
    summary:
      "The exact blueprint for repurposing one long-form technical video into 15 multi-platform micro-assets across LinkedIn, X, and Instagram.",
    readTime: "3 min read",
    keyTakeaways: [
      "Turn long-form problem breakdowns into carousel slides and visual diagrams",
      "Focus on contrarian, authentic insights over corporate PR fluff",
      "Engage consistently in peer comment sections to double secondary impressions",
    ],
  },
  {
    id: "ins-7",
    category: "Growth Hacking",
    title: "Product-Led Growth Experiments That Cut CAC by 42%",
    summary:
      "Case study on onboarding friction reduction, viral referral loops, and automated email nurturing that doubled free-to-paid conversion rates.",
    readTime: "5 min read",
    keyTakeaways: [
      "Shorten time-to-value (TTV) under 60 seconds with instant interactive previews",
      "A/B test pricing page checkout micro-copy and social proof trust signals",
      "Trigger automated SMS & email re-engagement at high intent milestones",
    ],
  },
  {
    id: "ins-8",
    category: "Entrepreneurship",
    title: "Building in Public: How Transparency Converts Clients Faster",
    summary:
      "Why documenting your tech stack decisions, marketing wins, and growth experiments openly on LinkedIn generates inbound enterprise leads on autopilot.",
    readTime: "4 min read",
    keyTakeaways: [
      "Share real metrics, breakdown architectures, and honest lessons learned",
      "Inbound clients buy expertise and transparency before they ever jump on a call",
      "Turn client case studies into repeatable video walkthroughs",
    ],
  },
];
