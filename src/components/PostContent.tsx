"use client";

import { Post } from "@/lib/posts";
import Link from "next/link";
import { useState, useEffect } from "react";
import CopyCodeButton from "./CopyCodeButton";
import PostNavigation from "./PostNavigation";
import HeadingAnchor from "./HeadingAnchor";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [isVisible, setIsVisible] = useState(true); // Start visible for better SSR

  useEffect(() => {
    // Only use fade-in animation on client side
    if (typeof window !== "undefined") {
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <article
        className={`max-w-4xl mx-auto p-8 leading-relaxed transition-all duration-600 ${
          isVisible ? "opacity-100 animate-fadeInUp" : "opacity-0"
        }`}
      >
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-indigo-500 no-underline mb-8 font-medium transition-colors duration-200 hover:text-indigo-600"
        >
          ← Back to Posts
        </Link>

        <header className="mb-12 pb-8 border-b border-slate-200">
          <h1 className="text-4xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 italic mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 mb-6 text-slate-600 text-sm">
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
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose prose-slate prose-lg max-w-none
          prose-headings:text-slate-800 prose-headings:font-semibold
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0
          prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12
          prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
          prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-6
          prose-p:mb-6 prose-p:leading-relaxed prose-p:text-slate-700
          prose-ul:my-6 prose-ul:pl-6 prose-ol:my-6 prose-ol:pl-6 
          prose-li:mb-2 prose-li:text-slate-700
          prose-strong:font-semibold prose-strong:text-slate-900
          prose-em:italic prose-em:text-slate-700
          prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-slate-600
          prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:my-8 prose-pre:overflow-x-auto
          prose-code:font-mono prose-code:text-sm prose-code:font-medium
          prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-rose-600
          prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0 prose-pre:prose-code:text-slate-100 prose-pre:prose-code:text-base
          prose-a:text-indigo-500 prose-a:underline prose-a:transition-colors prose-a:duration-200 hover:prose-a:text-indigo-600
          prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-img:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <CopyCodeButton />
        <HeadingAnchor />
      </article>
      <PostNavigation />
    </>
  );
}
