import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import LatestVideo from "@/components/LatestVideo";
import About from "@/components/About";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import PageNavigation from "@/components/PageNavigation";
import { getPostSummaries } from "@/lib/posts";

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
