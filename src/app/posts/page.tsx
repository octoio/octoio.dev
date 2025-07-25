import { Metadata } from "next";
import AllPosts from "@/components/AllPosts";
import { getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts | octoio",
  description:
    "Read my latest thoughts, tutorials, and insights about game development, programming, and creative processes.",
};

export default async function PostsPage() {
  const posts = await getPostSummaries();
  return <AllPosts posts={posts} />;
}
