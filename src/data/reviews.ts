export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "rev-1",
    name: "James Carter",
    role: "Business Owner",
    company: "Apex Digital Solutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "Nahidul completely transformed our online presence. Our organic traffic grew by over 240% within 4 months, and our new web application is blistering fast. Exceptional work ethic and unmatched attention to detail.",
  },
  {
    id: "rev-2",
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "Veloce Media Group",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "The YouTube optimization and ad campaign management delivered immediate ROI. Nahidul combines deep technical coding proficiency with sharp growth marketing acumen. Highly recommended!",
  },
  {
    id: "rev-3",
    name: "Michael Brown",
    role: "Founder & CEO",
    company: "Nexus Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "Working with Nahidul was smooth from start to finish. He delivered our Next.js web platform ahead of schedule with flawless SEO infrastructure that immediately outranked key competitors.",
  },
  {
    id: "rev-4",
    name: "Elena Rostova",
    role: "E-Commerce Director",
    company: "Nordic Goods Co.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "From technical SEO audits to Meta ad funnels, Nahidul provided clear strategic roadmaps and executed them with precision. Our revenue increased by 180% year-over-year.",
  },
];
