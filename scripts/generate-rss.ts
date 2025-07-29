#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import RSS, { ItemOptions } from "rss";
import { projects } from "../src/data/projects";
import {
  loadPostsFromFileSystem,
  filterPublishedPosts,
} from "../src/lib/utils/post-utils";
import { fetchYouTubeVideos } from "../src/lib/utils/youtube-utils";

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
      description:
        "Octoio's portfolio - Game development, creative projects, and technical exploration. From OCaml data pipelines to Unity games.",
      feed_url: "https://www.octoio.dev/rss.xml",
      site_url: "https://www.octoio.dev",
      image_url: "https://www.octoio.dev/favicon.ico",
      managingEditor: "octoiodev@gmail.com (Octoio)",
      webMaster: "octoiodev@gmail.com (Octoio)",
      copyright: `${new Date().getFullYear()} Octoio`,
      language: "en",
      categories: [
        "Game Development",
        "Programming",
        "Technology",
        "OCaml",
        "TypeScript",
        "Unity",
      ],
      pubDate: new Date(),
      ttl: 60,
    });

    // Collect all items with dates for sorting
    const allItems: Array<{
      date: Date;
      type: string;
      item: ItemOptions;
    }> = [];

    // Add posts
    posts.forEach((post) => {
      allItems.push({
        date: new Date(post.publishedAt),
        type: "post",
        item: {
          title: `[POST] ${post.title}`,
          description: post.excerpt,
          url: `https://www.octoio.dev/post/${post.slug}/`,
          guid: `https://www.octoio.dev/post/${post.slug}/`,
          categories: post.tags,
          author: "octoiodev@gmail.com (Octoio)",
          date: new Date(post.publishedAt),
          enclosure: post.thumbnail
            ? {
                url: `https://www.octoio.dev${post.thumbnail}`,
                type: "image/png",
              }
            : undefined,
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
          description:
            video.description.length > 400
              ? video.description.substring(0, 400) + "..."
              : video.description,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          guid: `https://www.youtube.com/watch?v=${video.id}`,
          categories: [...video.tags, "YouTube", "Video", "Tutorial"],
          author: "octoiodev@gmail.com (Octoio)",
          date: new Date(video.publishedAt),
          enclosure: video.thumbnailUrl
            ? {
                url: video.thumbnailUrl,
                type: "image/jpeg",
              }
            : undefined,
        },
      });
    });

    // Add all projects using their actual publishedAt dates
    projects.forEach((project) => {
      const projectDate = new Date(project.publishedAt);

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
    console.log(`   🚀 ${projects.length} projects`);
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
