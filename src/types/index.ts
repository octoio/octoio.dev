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
  publishedAt: string;
}

// Post-related types
export enum PostState {
  DRAFT = "draft",
  PUBLISHED = "published",
  FEATURED = "featured",
}

export interface PostMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  state: PostState;
  thumbnail?: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

export interface PostSummary extends PostMetadata {
  slug: string;
}

export interface PostFromFileSystem {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  state: PostState;
  thumbnail?: string;
}

export interface SocialLink {
  name: string;
  platform: "discord" | "youtube" | "reddit" | "instagram" | "tiktok" | "email";
  url: string;
  username?: string;
  description: string;
  icon: string;
}

// Search-related types
export interface SearchItem {
  type: "project" | "post" | "social" | "page" | "video";
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured: boolean;
  data: Project | PostFromFileSystem | SocialLink | YouTubeVideo | null;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  viewCount: string;
  duration: string;
  tags: string[];
}
