#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import RSS from "rss";
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
      "   Copy .env.example to .env.local and add your API key to include videos in RSS."
    );
    return [];
  }

  try {
    console.log("📺 Fetching YouTube videos for RSS...");

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

    console.log(`✅ Fetched ${videos.length} YouTube videos for RSS`);
    return videos;
  } catch (error) {
    console.error("❌ Error fetching YouTube videos:", error);
    return [];
  }
}

async function generateRSSFeed() {
  try {
    console.log("📡 Generating RSS feed...");

    // Get posts data (only published posts)
    const allPosts = loadPostsFromFileSystem();
    const posts = filterPublishedPosts(allPosts);

    // Get YouTube videos
    const youtubeVideos = await fetchYouTubeVideos();

    // Create RSS feed
    const feed = new RSS({
      title: "Octoio - Game Development & Creative Projects",
      description: "Octoio's portfolio - Game development, creative projects, and technical exploration. From OCaml data pipelines to Unity games.",
      feed_url: "https://www.octoio.dev/rss.xml",
      site_url: "https://www.octoio.dev",
      image_url: "https://www.octoio.dev/favicon.ico",
      managingEditor: "octoiodev@gmail.com (Octoio)",
      webMaster: "octoiodev@gmail.com (Octoio)",
      copyright: `${new Date().getFullYear()} Octoio`,
      language: "en",
      categories: ["Game Development", "Programming", "Technology", "OCaml", "TypeScript", "Unity"],
      pubDate: new Date(),
      ttl: 60,
    });

    // Collect all items with dates for sorting
    const allItems: Array<{
      date: Date;
      type: string;
      item: any;
    }> = [];

    // Add posts
    posts.forEach((post) => {
      allItems.push({
        date: new Date(post.publishedAt),
        type: "post",
        item: {
          title: post.title,
          description: post.excerpt,
          url: `https://www.octoio.dev/post/${post.slug}/`,
          guid: `https://www.octoio.dev/post/${post.slug}/`,
          categories: post.tags,
          author: "octoiodev@gmail.com (Octoio)",
          date: new Date(post.publishedAt),
          enclosure: post.thumbnail ? {
            url: `https://www.octoio.dev${post.thumbnail}`,
            type: "image/png"
          } : undefined,
        },
      });
    });

    // Add YouTube videos
    youtubeVideos.forEach((video) => {
      allItems.push({
        date: new Date(video.publishedAt),
        type: "video",
        item: {
          title: `[VIDEO] ${video.title}`,
          description: video.description.length > 400 
            ? video.description.substring(0, 400) + "..." 
            : video.description,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          guid: `https://www.youtube.com/watch?v=${video.id}`,
          categories: [...video.tags, "YouTube", "Video", "Tutorial"],
          author: "octoiodev@gmail.com (Octoio)",
          date: new Date(video.publishedAt),
          enclosure: video.thumbnailUrl ? {
            url: video.thumbnailUrl,
            type: "image/jpeg"
          } : undefined,
        },
      });
    });

    // Add featured projects (treat as "releases" with current date)
    projects
      .filter(project => project.featured)
      .forEach((project, index) => {
        // Use a date slightly in the past so projects don't dominate the feed
        const projectDate = new Date();
        projectDate.setDate(projectDate.getDate() - (30 + index)); // 30+ days ago
        
        allItems.push({
          date: projectDate,
          type: "project",
          item: {
            title: `[PROJECT] ${project.title}`,
            description: `${project.description}\n\nTechnologies: ${project.technologies.join(", ")}`,
            url: project.url || `https://www.octoio.dev/projects#${project.id}`,
            guid: `https://www.octoio.dev/projects#${project.id}`,
            categories: [...project.technologies, "Project", "Open Source"],
            author: "octoiodev@gmail.com (Octoio)",
            date: projectDate,
          },
        });
      });

    // Sort all items by date (newest first)
    allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Add items to RSS feed
    allItems.forEach(({ item }) => {
      feed.item(item);
    });

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write RSS feed to public directory
    const rssXml = feed.xml({ indent: true });
    const outputPath = path.join(publicDir, "rss.xml");
    fs.writeFileSync(outputPath, rssXml);

    console.log(`✅ RSS feed generated with ${allItems.length} items`);
    console.log(`   📝 ${posts.length} posts`);
    console.log(`   📺 ${youtubeVideos.length} YouTube videos`);
    console.log(`   🚀 ${projects.filter(p => p.featured).length} featured projects`);
    console.log(`   💾 Saved to: ${outputPath}`);

    return rssXml;
  } catch (error) {
    console.error("❌ Error generating RSS feed:", error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  generateRSSFeed().catch(() => process.exit(1));
}

export { generateRSSFeed };