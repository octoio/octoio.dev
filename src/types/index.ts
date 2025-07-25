export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  displayUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  slug: string;
  tags: string[];
}

export interface SocialLink {
  name: string;
  platform: "discord" | "youtube" | "reddit" | "instagram" | "tiktok" | "email";
  url: string;
  username?: string;
  description: string;
  icon: string;
}
