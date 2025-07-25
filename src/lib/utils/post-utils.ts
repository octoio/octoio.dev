import fs from "fs";
import path from "path";
import type {
  PostFromFileSystem,
  PostMetadata,
  Post,
  PostSummary,
} from "@/types";
import { PostState } from "@/types";

const postsDirectory = path.join(process.cwd(), "src/app/post");

/**
 * Parse post state from metadata string
 */
function parsePostState(metadataString: string): PostState {
  // Check for new state field first
  const stateMatch = metadataString.match(
    /state:\s*"(draft|published|featured)"/
  );
  if (stateMatch) {
    return stateMatch[1] as PostState;
  }

  // Fall back to legacy featured/published fields for backward compatibility
  const featuredMatch = metadataString.match(/featured:\s*true/);
  const publishedMatch = metadataString.match(/published:\s*false/);

  if (featuredMatch) {
    return PostState.FEATURED;
  } else if (publishedMatch) {
    return PostState.DRAFT;
  } else {
    return PostState.PUBLISHED;
  }
}

/**
 * Parse post metadata from MDX file content using regex
 */
export function parsePostMetadataFromContent(
  fileContent: string,
  slug: string
): PostFromFileSystem | null {
  try {
    // Extract metadata from export statement
    const metadataMatch = fileContent.match(
      /export const metadata = \{([\s\S]*?)\}/
    );
    if (!metadataMatch) {
      console.warn(`No metadata found in post: ${slug}`);
      return null;
    }

    // Parse the metadata manually (simplified approach)
    const metadataString = metadataMatch[1];
    const titleMatch = metadataString.match(/title:\s*"([^"]+)"/);
    const excerptMatch = metadataString.match(/excerpt:\s*"([^"]+)"/);
    const publishedAtMatch = metadataString.match(/publishedAt:\s*"([^"]+)"/);
    const readTimeMatch = metadataString.match(/readTime:\s*(\d+)/);
    const tagsMatch = metadataString.match(/tags:\s*\[(.*?)\]/);
    const thumbnailMatch = metadataString.match(/thumbnail:\s*"([^"]+)"/);

    if (!titleMatch || !excerptMatch || !publishedAtMatch || !readTimeMatch) {
      console.warn(`Incomplete metadata in post: ${slug}`);
      return null;
    }

    const tags = tagsMatch
      ? tagsMatch[1].split(",").map((tag) => tag.trim().replace(/"/g, ""))
      : [];

    return {
      slug,
      title: titleMatch[1],
      excerpt: excerptMatch[1],
      publishedAt: publishedAtMatch[1],
      readTime: parseInt(readTimeMatch[1]),
      tags,
      state: parsePostState(metadataString),
      thumbnail: thumbnailMatch ? thumbnailMatch[1] : undefined,
    };
  } catch (error) {
    console.error(`Error parsing metadata for post ${slug}:`, error);
    return null;
  }
}

/**
 * Load post metadata from dynamic import
 */
export async function loadPostMetadataFromImport(
  slug: string
): Promise<PostMetadata | null> {
  try {
    const { metadata } = await import(`@/app/post/${slug}/page.mdx`);

    // Handle new state field or legacy featured/published fields
    let state: PostState = PostState.PUBLISHED;
    if (metadata.state) {
      state = metadata.state as PostState;
    } else {
      // Legacy compatibility
      if (metadata.featured) {
        state = PostState.FEATURED;
      } else if (metadata.published === false) {
        state = PostState.DRAFT;
      }
    }

    return {
      title: metadata.title,
      excerpt: metadata.excerpt,
      publishedAt: metadata.publishedAt,
      readTime: metadata.readTime,
      tags: metadata.tags || [],
      state,
      thumbnail: metadata.thumbnail,
    };
  } catch (error) {
    console.error(`Error loading metadata for post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all post directories from filesystem
 */
export function getPostDirectories(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dir) => {
      const mdxPath = path.join(postsDirectory, dir, "page.mdx");
      return fs.existsSync(mdxPath);
    });
}

/**
 * Load posts from filesystem using regex parsing (for build-time operations)
 */
export function loadPostsFromFileSystem(): PostFromFileSystem[] {
  const postDirs = getPostDirectories();

  const posts = postDirs
    .map((postDir): PostFromFileSystem | null => {
      const mdxPath = path.join(postsDirectory, postDir, "page.mdx");

      try {
        const fileContent = fs.readFileSync(mdxPath, "utf-8");
        return parsePostMetadataFromContent(fileContent, postDir);
      } catch (error) {
        console.error(`Error reading post file ${mdxPath}:`, error);
        return null;
      }
    })
    .filter((post): post is PostFromFileSystem => post !== null);

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Filter posts by published status (published or featured, not draft)
 */
export function filterPublishedPosts<T extends { state: PostState }>(
  posts: T[]
): T[] {
  return posts.filter((post) => post.state !== PostState.DRAFT);
}

/**
 * Filter posts by featured status
 */
export function filterFeaturedPosts<T extends { state: PostState }>(
  posts: T[]
): T[] {
  return posts.filter((post) => post.state === PostState.FEATURED);
}

/**
 * Filter posts by draft status
 */
export function filterDraftPosts<T extends { state: PostState }>(
  posts: T[]
): T[] {
  return posts.filter((post) => post.state === PostState.DRAFT);
}

/**
 * Check if a post is published (published or featured)
 */
export function isPostPublished(state: PostState): boolean {
  return state !== PostState.DRAFT;
}

/**
 * Check if a post is featured
 */
export function isPostFeatured(state: PostState): boolean {
  return state === PostState.FEATURED;
}

/**
 * Sort posts by published date (newest first)
 */
export function sortPostsByDate<T extends { publishedAt: string }>(
  posts: T[]
): T[] {
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Convert PostMetadata + slug to PostSummary
 */
export function createPostSummary(
  metadata: PostMetadata,
  slug: string
): PostSummary {
  return {
    slug,
    ...metadata,
  };
}

/**
 * Convert PostMetadata + slug to Post (without content)
 */
export function createPost(metadata: PostMetadata, slug: string): Post {
  return {
    slug,
    content: "", // MDX content is rendered by the page component
    ...metadata,
  };
}
