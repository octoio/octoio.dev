"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { COMMON_STYLES } from "@/styles/constants";

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className={COMMON_STYLES.section}>
      <div className={COMMON_STYLES.container}>
        <h2 className={COMMON_STYLES.sectionTitle}>Featured Projects</h2>
        <div className={`${COMMON_STYLES.gridLayout} mb-12`}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/projects" className={`${COMMON_STYLES.link} text-lg`}>
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
