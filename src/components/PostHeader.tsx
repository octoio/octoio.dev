import Link from "next/link";
import type { PostMetadata } from "@/types";

interface PostHeaderProps {
  metadata: PostMetadata;
}

export default function PostHeader({ metadata }: PostHeaderProps) {
  return (
    <>
      <Link
        href="/posts"
        className="inline-flex items-center gap-2 text-indigo-500 no-underline mb-8 font-medium transition-colors duration-200 hover:text-indigo-600"
      >
        ← Back to Posts
      </Link>

      <header className="mb-12 pb-8 border-b border-slate-200">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
          {metadata.title}
        </h1>
        <p className="text-lg text-slate-600 italic mb-6">{metadata.excerpt}</p>

        {metadata.thumbnail && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={metadata.thumbnail}
              alt={metadata.title}
              className="w-full h-auto max-h-96 object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="flex items-center gap-4 mb-6 text-slate-600 text-sm">
          <span>
            {new Date(metadata.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{metadata.readTime} min read</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
    </>
  );
}
