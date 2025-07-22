import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Posts from '@/components/Posts'
import SocialLinks from '@/components/SocialLinks'
import Footer from '@/components/Footer'
import PageNavigation from '@/components/PageNavigation'
import { getPostSummaries } from '@/lib/posts'

export default async function Home() {
  const posts = await getPostSummaries()

  return (
    <>
      <main>
        <Hero />
        <Projects />
        <Posts posts={posts} />
        <SocialLinks />
        <Footer />
      </main>
      <PageNavigation />
    </>
  )
}
