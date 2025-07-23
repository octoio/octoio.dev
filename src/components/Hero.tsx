import Link from 'next/link'

export default function Hero() {
  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white px-8"
    >
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
          Octoio
        </h1>
        <h2 className="text-xl md:text-2xl font-light mb-8 opacity-90">
          Game Development & Creative Projects
        </h2>
        <p className="text-lg leading-relaxed opacity-80 mb-8 max-w-2xl mx-auto">
          Welcome to my digital playground where I explore game development, 
          build creative tools, and share my journey through code. 
          From OCaml data pipelines to Unity games, I love crafting systems that bring ideas to life.
        </p>
        <Link 
          href="#projects"
          className="inline-block px-8 py-4 bg-white/20 border-2 border-white/30 rounded-lg text-white no-underline font-semibold transition-all duration-300 backdrop-blur-md hover:bg-white/30 hover:border-white/50 hover:-translate-y-1"
        >
          Explore My Work
        </Link>
      </div>
    </section>
  )
}