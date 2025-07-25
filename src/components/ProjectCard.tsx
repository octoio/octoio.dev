import { Project } from '@/types'
import { COMMON_STYLES, getCardStyles } from '@/styles/constants'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={getCardStyles(project.featured)}>
      {project.featured && (
        <div className={COMMON_STYLES.featuredBadge}>
          Featured
        </div>
      )}
      <h3 className={COMMON_STYLES.cardTitle}>{project.title}</h3>
      <p className={COMMON_STYLES.cardDescription}>{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span key={tech} className={COMMON_STYLES.tag}>
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {project.url && (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={COMMON_STYLES.link}
          >
            {project.displayUrl || "View Project"} →
          </a>
        )}
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={COMMON_STYLES.link}
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  )
}