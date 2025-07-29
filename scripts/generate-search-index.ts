#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { projects } from "../src/data/projects";
import { socialLinks } from "../src/data/social";
import type { SearchItem } from "../src/types";
import { PostState } from "../src/types";
import {
  loadPostsFromFileSystem,
  filterPublishedPosts,
} from "../src/lib/utils/post-utils";
import { fetchYouTubeVideos } from "../src/lib/utils/youtube-utils";

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
