export enum SocialMediaPlatforms {
  LINKEDIN = "linkedin",
  GITHUB = "github",
  X = "x",
  TELEGRAM = "telegram",
  YOUTUBE = "youtube",
  INSTAGRAM = "instagram",
  TIKTOK = "tiktok",
  FACEBOOK = "facebook",
}

interface SocialMediaItem {
  name: string;
  icon: string;
  url: string;
}

export const SocialMedia: Record<SocialMediaPlatforms, SocialMediaItem> = {
  [SocialMediaPlatforms.LINKEDIN]: {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/in/",
  },
  [SocialMediaPlatforms.GITHUB]: {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/",
  },
  [SocialMediaPlatforms.X]: {
    name: "X",
    icon: "x",
    url: "https://x.com/",
  },
  [SocialMediaPlatforms.TELEGRAM]: {
    name: "Telegram",
    icon: "telegram",
    url: "https://telegram.me/",
  },
  [SocialMediaPlatforms.YOUTUBE]: {
    name: "YouTube",
    icon: "youtube",
    url: "https://youtube.com/",
  },
  [SocialMediaPlatforms.INSTAGRAM]: {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/",
  },
  [SocialMediaPlatforms.TIKTOK]: {
    name: "TikTok",
    icon: "tiktok",
    url: "https://tiktok.com/",
  },
  [SocialMediaPlatforms.FACEBOOK]: {
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/",
  },
} as const;
