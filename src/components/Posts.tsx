"use client";

import Link from "next/link";
import { PostSummary } from "@/lib/posts";

interface PostsProps {
  posts: PostSummary[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <section id="posts" className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">Latest Post</h2>
        <p className="text-lg text-slate-600 text-center mb-12">
          Recent thoughts, tutorials, and insights from my development journey.
        </p>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 1).map((post) => (
              <article 
                key={post.slug} 
                className="bg-slate-50 rounded-xl p-8 border border-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <h3 className="text-2xl font-semibold mb-4 text-slate-800 leading-tight">{post.title}</h3>
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
                <a 
                  href={`/post/${post.slug}`} 
                  className="text-indigo-500 no-underline font-medium transition-colors duration-200 hover:text-indigo-600"
                >
                  Read More →
                </a>
              </article>
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
            <p className="text-slate-600 text-lg mb-4">More posts coming soon!</p>
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
