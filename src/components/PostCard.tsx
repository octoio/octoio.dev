"use client";

import type { PostSummary } from "@/types";
import { PostState } from "@/types";

interface PostCardProps {
  post: PostSummary;
}

export default function PostCard({ post }: PostCardProps) {
  const handleCardClick = () => {
    window.location.href = `/post/${post.slug}`;
  };

  return (
    <article
      className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
        post.state === PostState.FEATURED
          ? "border-2 border-indigo-500"
          : "border border-slate-200"
      }`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {post.state === PostState.FEATURED && (
        <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
          Featured
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-4 text-slate-800 leading-tight">
        {post.title}
      </h3>
      <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
        <span>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>•</span>
        <span>{post.readTime} min read</span>
      </div>
      <p className="text-slate-700 leading-relaxed mb-6">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <span
        className="text-indigo-500 no-underline font-medium transition-colors duration-200 hover:text-indigo-600"
        onClick={(e) => e.stopPropagation()} // Prevent double navigation
      >
        Read More →
      </span>
    </article>
  );
}
