import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src/app/post");

export interface PostMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  published?: boolean;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

export interface PostSummary extends PostMetadata {
  slug: string;
}

export async function getPostSummaries(
  includeUnpublished: boolean = false
): Promise<PostSummary[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const postDirs = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (postDirs.length === 0) {
    return [];
  }

  const posts = await Promise.all(
    postDirs.map(async (postDir) => {
      const slug = postDir;
      const mdxPath = path.join(postsDirectory, postDir, "page.mdx");

      if (!fs.existsSync(mdxPath)) {
        return null;
      }

      try {
        const { metadata } = await import(`@/app/post/${postDir}/page.mdx`);

        return {
          slug,
          title: metadata.title,
          excerpt: metadata.excerpt,
          publishedAt: metadata.publishedAt,
          readTime: metadata.readTime,
          tags: metadata.tags || [],
          featured: metadata.featured ?? false,
          published: metadata.published ?? false,
        } satisfies PostSummary;
      } catch (error) {
        console.error(`Error loading metadata for post ${postDir}:`, error);
        return null;
      }
    })
  );

  // Filter out null entries and unpublished posts (unless requested), then sort by date
  const validPosts = posts.filter((post) => post !== null) as PostSummary[];
  const filteredPosts = includeUnpublished
    ? validPosts
    : validPosts.filter((post) => post.published);

  return filteredPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const mdxPath = path.join(postsDirectory, slug, "page.mdx");

    if (!fs.existsSync(mdxPath)) {
      return null;
    }

    const { metadata } = await import(`@/app/post/${slug}/page.mdx`);

    return {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      publishedAt: metadata.publishedAt,
      readTime: metadata.readTime,
      tags: metadata.tags || [],
      featured: metadata.featured || false,
      published: metadata.published ?? true,
      content: "", // MDX content is rendered by the page component
    } satisfies Post;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const postDirs = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Filter to only include published posts
  const publishedSlugs = await Promise.all(
    postDirs.map(async (dir) => {
      const mdxPath = path.join(postsDirectory, dir, "page.mdx");

      if (!fs.existsSync(mdxPath)) {
        return null;
      }

      try {
        const { metadata } = await import(`@/app/post/${dir}/page.mdx`);
        const published = metadata.published ?? true;
        return published ? dir : null;
      } catch (error) {
        console.error(`Error loading metadata for post ${dir}:`, error);
        return null;
      }
    })
  );

  return publishedSlugs.filter((slug): slug is string => slug !== null);
}
