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
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

export interface PostSummary extends PostMetadata {
  slug: string;
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const postDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (postDirs.length === 0) {
    return [];
  }

  const posts = await Promise.all(postDirs.map(async (postDir) => {
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
        featured: metadata.featured || false,
      };
    } catch (error) {
      console.error(`Error loading metadata for post ${postDir}:`, error);
      return null;
    }
  }));

  // Filter out null entries and sort by date
  return posts
    .filter((post): post is PostSummary => post !== null)
    .sort(
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
      content: '', // MDX content is rendered by the page component
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const postDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Verify each directory has a page.mdx file
  return postDirs.filter(dir => {
    const mdxPath = path.join(postsDirectory, dir, "page.mdx");
    return fs.existsSync(mdxPath);
  });
}
