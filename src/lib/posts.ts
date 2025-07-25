import type { Post, PostSummary } from "@/types";
import { PostState } from "@/types";
import {
  filterPublishedPosts,
  loadPostMetadataFromImport,
  createPostSummary,
  createPost,
  getPostDirectories,
} from "@/lib/utils/post-utils";

export async function getPostSummaries(
  includeUnpublished: boolean = false
): Promise<PostSummary[]> {
  const postDirs = getPostDirectories();

  if (postDirs.length === 0) {
    return [];
  }

  const posts = await Promise.all(
    postDirs.map(async (postDir) => {
      const metadata = await loadPostMetadataFromImport(postDir);
      return metadata ? createPostSummary(metadata, postDir) : null;
    })
  );

  const validPosts = posts.filter((post): post is PostSummary => post !== null);

  return includeUnpublished ? validPosts : filterPublishedPosts(validPosts);
}

export async function getPost(slug: string): Promise<Post | null> {
  const metadata = await loadPostMetadataFromImport(slug);
  return metadata ? createPost(metadata, slug) : null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const postDirs = getPostDirectories();

  const publishedSlugs = await Promise.all(
    postDirs.map(async (dir) => {
      const metadata = await loadPostMetadataFromImport(dir);
      return metadata && metadata.state !== PostState.DRAFT ? dir : null;
    })
  );

  return publishedSlugs.filter((slug): slug is string => slug !== null);
}
