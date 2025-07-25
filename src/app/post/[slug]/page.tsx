import { getPost, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://octoio.dev"
      : "http://localhost:3000";

  return {
    title: `${post.title} | Octoio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      url: `${baseUrl}/post/${slug}`,
      siteName: "Octoio",
      ...(post.thumbnail && {
        images: [
          {
            url: post.thumbnail.startsWith('http') ? post.thumbnail : `${baseUrl}${post.thumbnail}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.thumbnail && {
        images: [post.thumbnail.startsWith('http') ? post.thumbnail : `${baseUrl}${post.thumbnail}`],
      }),
    },
  };
}
