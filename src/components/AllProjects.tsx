"use client";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import BackNavigation from "@/components/BackNavigation";
import { COMMON_STYLES } from "@/styles/constants";

export default function AllProjects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section className={`${COMMON_STYLES.section} min-h-screen`}>
      <div className={COMMON_STYLES.container}>
        <BackNavigation />

        <h1 className="text-5xl md:text-4xl font-bold text-center mb-4 text-slate-800">
          All Projects
        </h1>
        <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
          A comprehensive collection of my work in game development, web
          applications, and experimental projects.
        </p>

        {featuredProjects.length > 0 && (
          <>
            <h2 className={COMMON_STYLES.subsectionTitle}>Featured Projects</h2>
            <div className={`${COMMON_STYLES.gridLayout} mb-12`}>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}

        {otherProjects.length > 0 && (
          <>
            <h2 className={COMMON_STYLES.subsectionTitle}>Other Projects</h2>
            <div className={`${COMMON_STYLES.gridLayout} mb-12`}>
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
