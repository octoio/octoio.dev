#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { projects } from "../src/data/projects";
import { socialLinks } from "../src/data/social";
import type { SearchItem, YouTubeVideo } from "../src/types";
import { PostState } from "../src/types";
import {
  loadPostsFromFileSystem,
  filterPublishedPosts,
} from "../src/lib/utils/post-utils";

// Load environment variables
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from the project root
dotenv.config({ path: path.join(__dirname, "..", ".env.local"), quiet: true });

async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!API_KEY) {
    console.warn("⚠️  YouTube API key not found. Skipping video fetching.");
    console.warn(
      "   Copy .env.example to .env.local and add your API key to include videos in search."
    );
    return [];
  }

  try {
    console.log("📺 Fetching YouTube videos...");

    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=octoio&key=${API_KEY}`
    );

    let uploadsPlaylistId = "";

    if (channelResponse.ok) {
      const channelData = await channelResponse.json();
      if (channelData.items?.length > 0) {
        uploadsPlaylistId =
          channelData.items[0].contentDetails.relatedPlaylists.uploads;
      }
    }

    // If forUsername didn't work, try with the channel handle
    if (!uploadsPlaylistId) {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=@octoio&key=${API_KEY}`
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.items?.length > 0) {
          const channelId = searchData.items[0].id.channelId;
          const channelDetailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
          );

          if (channelDetailsResponse.ok) {
            const channelDetailsData = await channelDetailsResponse.json();
            if (channelDetailsData.items?.length > 0) {
              uploadsPlaylistId =
                channelDetailsData.items[0].contentDetails.relatedPlaylists
                  .uploads;
            }
          }
        }
      }
    }

    if (!uploadsPlaylistId) {
      console.warn("⚠️  Could not find YouTube channel uploads playlist");
      return [];
    }

    // Fetch videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`
    );

    if (!videosResponse.ok) {
      console.error("❌ YouTube API error:", await videosResponse.text());
      return [];
    }

    const videosData = await videosResponse.json();

    // Get additional video details (statistics, contentDetails)
    const videoIds = videosData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
    );

    if (!detailsResponse.ok) {
      console.error(
        "❌ YouTube video details API error:",
        await detailsResponse.text()
      );
      return [];
    }

    const detailsData = await detailsResponse.json();

    const videos: YouTubeVideo[] = detailsData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description || "",
      publishedAt: video.snippet.publishedAt,
      thumbnailUrl:
        video.snippet.thumbnails?.maxres?.url ||
        video.snippet.thumbnails?.high?.url ||
        video.snippet.thumbnails?.medium?.url ||
        "",
      viewCount: video.statistics?.viewCount || "0",
      duration: video.contentDetails?.duration || "",
      tags: video.snippet.tags || [],
    }));

    console.log(`✅ Fetched ${videos.length} YouTube videos`);
    return videos;
  } catch (error) {
    console.error("❌ Error fetching YouTube videos:", error);
    return [];
  }
}

async function generateSearchIndex() {
  try {
    console.log("🔍 Generating search index...");

    // Get posts data
    const allPosts = loadPostsFromFileSystem();
    const posts = filterPublishedPosts(allPosts);

    // Get YouTube videos
    const youtubeVideos = await fetchYouTubeVideos();

    // Create unified search index
    const searchIndex: SearchItem[] = [
      // Add projects
      ...projects.map((project) => ({
        type: "project" as const,
        title: project.title,
        description: project.description,
        url: `/projects#${project.id}`,
        tags: project.technologies,
        featured: project.featured || false,
        data: project,
      })),

      // Add posts
      ...posts.map((post) => ({
        type: "post" as const,
        title: post.title,
        description: post.excerpt,
        url: `/post/${post.slug}/`,
        tags: post.tags,
        featured: post.state === PostState.FEATURED,
        data: post,
      })),

      // Add YouTube videos
      ...youtubeVideos.map((video) => ({
        type: "video" as const,
        title: video.title,
        description:
          video.description.length > 200
            ? video.description.substring(0, 200) + "..."
            : video.description,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        tags: [...video.tags, "YouTube", "Video", "Tutorial"],
        featured: false,
        data: video,
      })),

      // Add social links
      ...socialLinks.map((social) => ({
        type: "social" as const,
        title: social.name,
        description: social.description,
        url: social.url,
        tags: [social.platform],
        featured: false,
        data: social,
      })),

      // Add static pages
      {
        type: "page" as const,
        title: "Home",
        description:
          "Octoio's portfolio - Game development, creative projects, and technical exploration",
        url: "/",
        tags: ["home", "portfolio", "octoio"],
        featured: true,
        data: null,
      },
      {
        type: "page" as const,
        title: "About Me",
        description:
          "Learn about my journey from discovering programming in 2016 to creating the Octoio persona and developing games",
        url: "/#about",
        tags: ["about", "journey", "biography", "developer"],
        featured: false,
        data: null,
      },
      {
        type: "page" as const,
        title: "Connect & Social Links",
        description:
          "Get in touch via email, Discord, YouTube, and other social platforms",
        url: "/#connect",
        tags: ["contact", "social", "discord", "youtube", "email"],
        featured: false,
        data: null,
      },
      {
        type: "page" as const,
        title: "All Projects",
        description: "View all my projects",
        url: "/projects/",
        tags: ["projects", "showcase"],
        featured: false,
        data: null,
      },
      {
        type: "page" as const,
        title: "All Posts",
        description: "View all my blog posts",
        url: "/posts/",
        tags: ["blog", "posts", "articles"],
        featured: false,
        data: null,
      },
    ];

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write search index to public directory
    const outputPath = path.join(publicDir, "search-index.json");
    fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

    console.log(`✅ Search index generated with ${searchIndex.length} items`);
    console.log(`   📝 ${posts.length} posts`);
    console.log(`   🚀 ${projects.length} projects`);
    console.log(`   📺 ${youtubeVideos.length} YouTube videos`);
    console.log(`   🔗 ${socialLinks.length} social links`);
    console.log(`   📄 5 static pages`);
    console.log(`   💾 Saved to: ${outputPath}`);

    return searchIndex;
  } catch (error) {
    console.error("❌ Error generating search index:", error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  generateSearchIndex().catch(() => process.exit(1));
}

export { generateSearchIndex };
