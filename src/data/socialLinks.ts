export interface SocialPlatformItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  iconName: string;
  color: string;
}

export const SOCIAL_PLATFORMS: SocialPlatformItem[] = [
  {
    id: "youtube",
    name: "YouTube",
    handle: "@nahidul.islam",
    url: "https://youtube.com/@nahidul.islam",
    iconName: "Youtube",
    color: "#FF0000",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@nahidul-islam",
    url: "https://github.com/nahidul-islam",
    iconName: "Github",
    color: "#FFFFFF",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    handle: "@nahidul_islam",
    url: "https://x.com/nahidul_islam",
    iconName: "Twitter",
    color: "#00F0FF",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "/in/nahidul-islam",
    url: "https://linkedin.com/in/nahidul-islam",
    iconName: "Linkedin",
    color: "#0A66C2",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@nahidul.islam",
    url: "https://instagram.com/nahidul.islam",
    iconName: "Instagram",
    color: "#E1306C",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "/nahidul.islam",
    url: "https://facebook.com/nahidul.islam",
    iconName: "Facebook",
    color: "#1877F2",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@nahidul.islam",
    url: "https://tiktok.com/@nahidul.islam",
    iconName: "Tiktok",
    color: "#00F0FF",
  },
];
