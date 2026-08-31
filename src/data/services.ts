export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Development",
    description: "Fast, responsive and SEO-ready websites built with modern technologies.",
    iconName: "Code",
    features: [
      "Custom Next.js & React Architecture",
      "Mobile-First & Ultra-Responsive",
      "Lighthouse 95+ Core Web Vitals",
      "Integrated SEO & Clean Semantic Code",
    ],
    deliverables: "Production-ready Web Applications, Landing Pages & Portfolios",
  },
  {
    id: "seo-optimization",
    number: "02",
    title: "SEO Optimization",
    description: "On-page, off-page and technical SEO strategies that improve visibility and organic traffic.",
    iconName: "Search",
    features: [
      "Targeted Keyword Architecture",
      "Metadata, Schema & Content Optimization",
      "High-Authority Backlink Acquisition",
      "Algorithmic Penalty Recovery",
    ],
    deliverables: "Comprehensive SEO Roadmap, Ranked Keywords & Organic Traffic",
  },
  {
    id: "youtube-seo",
    number: "03",
    title: "YouTube SEO",
    description: "Complete YouTube channel optimization to grow views, rankings and subscribers.",
    iconName: "Youtube",
    features: [
      "High-CTR Thumbnail & Title Strategy",
      "Search-Engine Tagging & Descriptions",
      "Audience Retention Flow Optimizations",
      "End Screens & Playlist Architectures",
    ],
    deliverables: "Channel Growth Audit, Tag Strategy & View Acceleration",
  },
  {
    id: "social-media-mgmt",
    number: "04",
    title: "Social Media Management",
    description: "Content creation, scheduling and management that builds a strong brand presence.",
    iconName: "Megaphone",
    features: [
      "Consistent Multi-Platform Scheduling",
      "Community Engagement & Response",
      "Brand Voice & Aesthetic Guidelines",
      "Performance Analytics & Monthly Reports",
    ],
    deliverables: "Active Social Channels, Engaged Audience & Cohesive Branding",
  },
  {
    id: "digital-marketing",
    number: "05",
    title: "Digital Marketing",
    description: "Data-driven campaigns that generate leads, increase reach and improve conversions.",
    iconName: "TrendingUp",
    features: [
      "Full-Funnel Customer Acquisition",
      "Conversion Rate Optimization (CRO)",
      "Automated Email & Retargeting Flows",
      "Cross-Channel Attribution Modeling",
    ],
    deliverables: "Scalable Growth Engine, Qualified Leads & High ROI",
  },
  {
    id: "content-creation",
    number: "06",
    title: "Content Creation",
    description: "Engaging content that connects with your audience and supports business growth.",
    iconName: "FileEdit",
    features: [
      "High-Converting Copywriting",
      "Visual Assets & Social Media Graphics",
      "Engaging Video Scripts & Hooks",
      "Educational Lead Magnets & Whitepapers",
    ],
    deliverables: "Publish-Ready Content Packages & Storytelling Frameworks",
  },
  {
    id: "google-ads",
    number: "07",
    title: "Google Ads",
    description: "High-converting search, display and shopping ad campaigns tailored for maximum ROI.",
    iconName: "Target",
    features: [
      "High-Intent Search Keyword Bidding",
      "Negative Keyword Pruning & Cost Control",
      "A/B Tested Ad Copy & Sitelinks",
      "Conversion Tracking via Google Tag Manager",
    ],
    deliverables: "Optimized Ad Campaigns, Low CPA & High Quality Score",
  },
  {
    id: "meta-ads",
    number: "08",
    title: "Meta Ads",
    description: "Targeted Facebook and Instagram advertising campaigns designed to scale revenue.",
    iconName: "Share2",
    features: [
      "Custom Audience & Lookalike Modeling",
      "UGC & High-Impact Creative Testing",
      "Dynamic Product Ads for E-commerce",
      "ROAS-Focused Scaling Protocols",
    ],
    deliverables: "High ROAS Campaigns, Retargeting Funnels & Creative Bank",
  },
  {
    id: "technical-seo",
    number: "09",
    title: "Technical SEO",
    description: "In-depth site architecture, crawlability, core web vitals, and indexing optimization.",
    iconName: "Sliders",
    features: [
      "Crawl Budget & Robots.txt Fine-Tuning",
      "XML Sitemaps & Canonical Tag Audits",
      "Core Web Vitals & Server Latency Fixes",
      "Structured JSON-LD Schema Implementations",
    ],
    deliverables: "Flawless Crawlability, Zero Indexing Errors & Lightning Speed",
  },
];
