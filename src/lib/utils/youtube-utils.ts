import type { YouTubeVideo } from "@/types";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// YouTube API response types
interface YouTubePlaylistItem {
  snippet: {
    resourceId: { videoId: string };
  };
}

interface YouTubeVideoDetails {
  id: string;
  snippet: {
    title: string;
    description?: string;
    publishedAt: string;
    thumbnails?: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
    };
    tags?: string[];
  };
  statistics?: {
    viewCount?: string;
  };
  contentDetails?: {
    duration?: string;
  };
}

// Load environment variables for server-side usage
if (typeof window === "undefined") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  dotenv.config({
    path: path.join(__dirname, "..", "..", "..", ".env.local"),
    quiet: true,
  });
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    console.warn("⚠️  YouTube API key not found. Skipping video fetching.");
    console.warn(
      "   Copy .env.example to .env.local and add your API key to include videos."
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
      .map((item: YouTubePlaylistItem) => item.snippet.resourceId.videoId)
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

    const videos: YouTubeVideo[] = detailsData.items.map(
      (video: YouTubeVideoDetails) => ({
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
      })
    );

    console.log(`✅ Fetched ${videos.length} YouTube videos`);
    return videos;
  } catch (error) {
    console.error("❌ Error fetching YouTube videos:", error);
    return [];
  }
}
