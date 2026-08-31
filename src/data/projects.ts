export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: "Web Development" | "SEO & Marketing" | "YouTube Growth" | "Paid Media";
  client: string;
  timeline: string;
  metrics: { label: string; value: string }[];
  overview: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
}

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: "proj-1",
    title: "SaaS Next-Gen Analytics Platform",
    category: "Web Development",
    client: "HyperMetric Cloud",
    timeline: "8 Weeks",
    metrics: [
      { label: "Page Load Speed", value: "0.42s" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Conversion Rate", value: "+45%" },
    ],
    overview:
      "Engineered an enterprise-grade dark-themed web platform with real-time WebSocket metric visualization, Next.js App Router, Tailwind CSS, and Framer Motion micro-interactions.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://example.com/project-1",
  },
  {
    id: "proj-2",
    title: "Global E-Commerce Technical SEO & Traffic Scaling",
    category: "SEO & Marketing",
    client: "Nordic Apparel Co.",
    timeline: "6 Months",
    metrics: [
      { label: "Organic Clicks", value: "+340%" },
      { label: "Ranked #1 Keywords", value: "185+" },
      { label: "Revenue Impact", value: "$480K" },
    ],
    overview:
      "Executed an end-to-end technical SEO overhaul including programmatic schema markup, crawl budget optimization, and topical authority clusters.",
    techStack: ["Technical SEO", "Schema.org", "Next.js SSR", "Google Search Console", "Ahrefs"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://example.com/project-2",
  },
  {
    id: "proj-3",
    title: "Tech Creator YouTube Channel Scaling & Monetization",
    category: "YouTube Growth",
    client: "CodeCraft Media",
    timeline: "4 Months",
    metrics: [
      { label: "Subscriber Growth", value: "12K → 115K" },
      { label: "Average CTR", value: "11.8%" },
      { label: "Monthly Views", value: "1.4M" },
    ],
    overview:
      "Optimized thumbnail A/B testing architecture, title hook formulas, SEO video tags, and audience retention pacing for a premier developer education channel.",
    techStack: ["YouTube SEO", "CTR Optimization", "Thumbnail Design", "VidIQ", "TubeBuddy"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://youtube.com",
  },
  {
    id: "proj-4",
    title: "Omnichannel Meta & Google Ads Funnel",
    category: "Paid Media",
    client: "Zenith Digital Store",
    timeline: "3 Months",
    metrics: [
      { label: "Average ROAS", value: "4.8x" },
      { label: "Customer Acq. Cost", value: "-38%" },
      { label: "Total Ad Spend Managed", value: "$120K" },
    ],
    overview:
      "Designed full-funnel paid media architecture with Meta CAPI integration, lookalike behavioral clustering, high-converting dynamic video ads, and Google Search intent campaigns.",
    techStack: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "CAPI", "Klaviyo"],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://example.com/project-4",
  },
];
