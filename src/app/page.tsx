import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import LatestVideo from "@/components/LatestVideo";
import About from "@/components/About";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import PageNavigation from "@/components/PageNavigation";
import { getPostSummaries } from "@/lib/posts";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Octoio | Game Development & Creative Projects",
    description:
      "Octoio's portfolio - Game development, creative projects, and technical exploration. From OCaml data pipelines to Unity games.",
    openGraph: {
      title: "Octoio | Game Development & Creative Projects",
      description:
        "Octoio's portfolio - Game development, creative projects, and technical exploration. From OCaml data pipelines to Unity games.",
      type: "website",
      url: "/",
      siteName: "Octoio",
      images: ["/favicon.ico"], // Using favicon as default home page thumbnail
    },
    twitter: {
      card: "summary",
      title: "Octoio | Game Development & Creative Projects",
      description:
        "Octoio's portfolio - Game development, creative projects, and technical exploration. From OCaml data pipelines to Unity games.",
      images: ["/favicon.ico"],
    },
  };
}

export default async function Home() {
  const posts = await getPostSummaries();

  return (
    <>
      <main>
        <Hero />
        <Posts posts={posts} />
        <LatestVideo />
        <About />
        <Projects />
        <SocialLinks />
        <Footer />
      </main>
      <PageNavigation />
    </>
  );
}
