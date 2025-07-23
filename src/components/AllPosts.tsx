'use client'

import Link from 'next/link'
import { PostSummary } from '@/lib/posts'

interface AllPostsProps {
  posts: PostSummary[]
}

export default function AllPosts({ posts }: AllPostsProps) {
  return (
    <section className="py-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-indigo-500 no-underline mb-12 font-medium transition-colors duration-200 hover:text-indigo-600"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl md:text-4xl font-bold text-center mb-4 text-slate-800">All Posts</h1>
        <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights from my development journey, covering game development, programming techniques, and creative processes.
        </p>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-200"
              >
                <h2 className="text-2xl font-semibold mb-4 text-slate-800 leading-tight">{post.title}</h2>
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/post/${post.slug}`} 
                  className="text-indigo-500 no-underline font-medium transition-colors duration-200 hover:text-indigo-600"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-8 bg-white rounded-xl shadow-lg border border-slate-200 mt-8">
            <h3 className="text-slate-800 text-2xl font-semibold mb-4">Posts Coming Soon!</h3>
            <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto">
              I&apos;m currently working on sharing insights about game development, technical challenges, and creative processes. Check back soon for the latest updates from my development journey.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}