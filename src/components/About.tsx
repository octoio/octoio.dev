export default function About() {
  const coreSkills = [
    { name: 'Game Development', icon: '🎮', description: 'Unity, C#, Game Logic Systems' },
    { name: 'Type-Safe Programming', icon: '🔧', description: 'OCaml, TypeScript, Rust' },
    { name: 'Web Development', icon: '🌐', description: 'React, Next.js, Modern UI/UX' },
    { name: 'System Architecture', icon: '🏗️', description: 'Data Pipelines, Code Generation' }
  ]

  const journey = [
    {
      period: 'Present',
      title: 'Game Developer & Content Creator',
      description: 'Building Fey (fæge), an online coop dungeon crawler RPG roguelite, while sharing the development journey through devlogs and technical content.',
      tech: ['Unity', 'OCaml', 'C#', 'TypeScript']
    },
    {
      period: '2023-2024',
      title: 'Multi-Language Ecosystem Architect',
      description: 'Designed and built a comprehensive game development ecosystem spanning OCaml data pipelines, React management interfaces, and Unity integration.',
      tech: ['OCaml', 'React', 'Unity', 'ATD', 'Dune']
    },
    {
      period: 'Earlier',
      title: 'Creative Problem Solver',
      description: 'Developed tools for audio processing, voice analysis, and mathematical visualizations, always focusing on elegant solutions to complex problems.',
      tech: ['Python', 'Audio APIs', 'Manim', 'OpenAI']
    }
  ]

  return (
    <section id="about" className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate game developer who believes in the power of well-crafted code. 
            My approach combines functional programming principles with creative game design, 
            resulting in robust systems that scale from concept to production.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Skills & Philosophy */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Core Expertise</h3>
            <div className="space-y-6">
              {coreSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="text-2xl">{skill.icon}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{skill.name}</h4>
                    <p className="text-slate-600 text-sm">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-slate-900 mb-3">My Philosophy</h4>
              <p className="text-slate-700 leading-relaxed">
                <span className="font-semibold">Type safety isn&apos;t just theory—it&apos;s freedom.</span> 
                {' '}When your compiler catches bugs before they reach players, you can focus on what matters: 
                creating compelling experiences. I architect systems that let creativity flourish within robust, 
                predictable foundations.
              </p>
            </div>
          </div>

          {/* Right side - Journey Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">My Journey</h3>
            <div className="space-y-8">
              {journey.map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index !== journey.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-indigo-300 to-purple-300"></div>
                  )}
                  
                  <div className="flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                          {step.period}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-600 mb-3 leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <a 
            href="#connect"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-1 transition-all duration-300 no-underline"
          >
            <span>Connect with me</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}