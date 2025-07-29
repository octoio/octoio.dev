import Link from "next/link";

interface RssIndicatorProps {
  className?: string;
}

export default function RssIndicator({ className = "" }: RssIndicatorProps) {
  return (
    <Link
      href="/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium transition-all hover:bg-white/20 hover:text-white hover:-translate-y-0.5 hover:shadow-lg ${className}`}
      title="Subscribe to RSS feed for posts, videos, and project updates"
    >
      <svg
        className="w-4 h-4 transition-transform group-hover:scale-110"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795-.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
      </svg>
      <span>RSS</span>
    </Link>
  );
}