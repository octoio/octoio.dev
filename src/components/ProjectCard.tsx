import { Project } from "@/types";
import { COMMON_STYLES, getCardStyles } from "@/styles/constants";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleCardClick = () => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`${getCardStyles(project.featured)} cursor-pointer`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {project.featured && (
        <div className={COMMON_STYLES.featuredBadge}>Featured</div>
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
            onClick={(e) => e.stopPropagation()} // Prevent double navigation
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
            onClick={(e) => e.stopPropagation()} // Prevent double navigation
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}
