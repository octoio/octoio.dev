import { getPostSummaries } from '@/lib/posts'

// This will be populated at build time with actual markdown posts
export const getStaticPosts = async () => {
  return await getPostSummaries()
}