"use client";

import Link from "next/link";
import type { PostSummary } from "@/types";
import { PostState } from "@/types";
import PostCard from "@/components/PostCard";

interface AllPostsProps {
  posts: PostSummary[];
}

export default function AllPosts({ posts }: AllPostsProps) {
  const featuredPosts = posts.filter((p) => p.state === PostState.FEATURED);
  const otherPosts = posts.filter((p) => p.state !== PostState.FEATURED);

  return (
    <section className="py-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-indigo-500 no-underline mb-12 font-medium transition-colors duration-200 hover:text-indigo-600"
        >
          ← Back to Home
        </Link>

        <h1 className="text-5xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          All Posts
        </h1>
        <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights from my development journey,
          covering game development, programming techniques, and creative
          processes.
        </p>

        {featuredPosts.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold my-12 text-slate-800">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {otherPosts.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold my-12 text-slate-800">
              Other Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {otherPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {posts.length === 0 && (
          <div className="text-center py-16 px-8 bg-white rounded-xl shadow-lg border border-slate-200 mt-8">
            <h3 className="text-slate-800 text-2xl font-semibold mb-4">
              Posts Coming Soon!
            </h3>
            <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto">
              I&apos;m currently working on sharing insights about game
              development, technical challenges, and creative processes. Check
              back soon for the latest updates from my development journey.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
