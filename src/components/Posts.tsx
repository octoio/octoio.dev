"use client";

import Link from "next/link";
import { PostSummary } from "@/lib/posts";
import PostCard from "@/components/PostCard";

interface PostsProps {
  posts: PostSummary[];
}

export default function Posts({ posts }: PostsProps) {
  const featuredPosts = posts.filter((p) => p.featured);
  const displayPosts =
    featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 2);

  return (
    <section id="posts" className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">
          Featured Posts
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12">
          Highlighted thoughts, tutorials, and insights from my development
          journey.
        </p>

        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-8 bg-slate-100 rounded-xl mt-8">
            <p className="text-slate-600 text-lg mb-4">No posts yet!</p>
            <p className="text-slate-500 text-sm">
              Posts will appear here as I add markdown files to the
              content/posts directory.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/posts"
              className="text-indigo-500 no-underline font-medium text-lg transition-colors duration-200 hover:text-indigo-600"
            >
              View All Posts →
            </Link>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-8 px-8 bg-slate-100 rounded-xl mt-8">
            <p className="text-slate-600 text-lg mb-4">
              More posts coming soon!
            </p>
            <p className="text-slate-500 text-sm">
              I&apos;m working on sharing more insights about game development,
              technical challenges, and creative processes.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
