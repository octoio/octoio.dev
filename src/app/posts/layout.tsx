import PostNavigation from '@/components/PostNavigation'
import CopyCodeButton from '@/components/CopyCodeButton'
import HeadingAnchor from '@/components/HeadingAnchor'
import CodeHighlighter from '@/components/CodeHighlighter'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PostNavigation />
      <main className="container mx-auto px-6 py-12">
        <article className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8">
          {children}
          <CodeHighlighter />
          <CopyCodeButton />
          <HeadingAnchor />
        </article>
      </main>
    </div>
  )
}