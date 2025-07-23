'use client'

import Link from 'next/link'
import { projects } from '@/data/projects'
import { Project } from '@/types'

interface ProjectCardComponentProps {
  project: Project
}

function ProjectCardComponent({ project }: ProjectCardComponentProps) {
  return (
    <div className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      project.featured ? 'border-2 border-indigo-500' : 'border border-slate-200'
    }`}>
      {project.featured && (
        <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
          Featured
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-4 text-slate-800">{project.title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span key={tech} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-500 no-underline font-medium transition-colors duration-200 hover:text-indigo-600"
          >
            GitHub →
          </a>
        )}
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-500 no-underline font-medium transition-colors duration-200 hover:text-indigo-600"
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  )
}

export default function AllProjects() {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section className="py-20 px-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-indigo-500 no-underline mb-12 font-medium transition-colors duration-200 hover:text-indigo-600"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl md:text-4xl font-bold text-center mb-4 text-slate-800">All Projects</h1>
        <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
          A comprehensive collection of my work in game development, web applications, and experimental projects.
        </p>
        
        {featuredProjects.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold my-12 text-slate-800">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project) => (
                <ProjectCardComponent key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
        
        {otherProjects.length > 0 && (
          <>
            <h2 className="text-3xl font-semibold my-12 text-slate-800">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {otherProjects.map((project) => (
                <ProjectCardComponent key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}