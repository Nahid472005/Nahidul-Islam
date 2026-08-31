export interface VideoItem {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  views: string;
  youtubeId: string;
  thumbnail: string;
  speaker: string;
}

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "vid-1",
    title: "How to Make $6000 Online Step by Step",
    subtitle: "w/ Spencer Haws from Niche Pursuits",
    duration: "12:45",
    views: "48K views",
    youtubeId: "dQw4w9WgXcQ", // fallback player id
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
    speaker: "Nahidul Islam",
  },
  {
    id: "vid-2",
    title: "Easy Step by Step Guide to Start a Business",
    subtitle: "Business | Greg Isenberg Framework",
    duration: "14:20",
    views: "62K views",
    youtubeId: "LXb3EKWsInQ",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    speaker: "Nahidul Islam",
  },
  {
    id: "vid-3",
    title: "How to Become a Copywriter & Make Money Online",
    subtitle: "Sam Parr Shares His Secrets",
    duration: "15:30",
    views: "39K views",
    youtubeId: "fJ9rUzIMcZQ",
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80",
    speaker: "Nahidul Islam",
  },
  {
    id: "vid-4",
    title: "Digital Marketing Full Course for Beginners (2026)",
    subtitle: "$0 to $10k/month Blueprint",
    duration: "14:20",
    views: "115K views",
    youtubeId: "M576WGiDBdQ",
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&auto=format&fit=crop&q=80",
    speaker: "Nahidul Islam",
  },
];
