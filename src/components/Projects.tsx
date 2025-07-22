'use client'

import styled from 'styled-components'
import { projects } from '@/data/projects'
import { Project } from '@/types'

const ProjectsSection = styled.section`
  padding: 5rem 2rem;
  background: #f8fafc;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e293b;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const ProjectCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'featured',
})<{ featured?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: ${props => props.featured ? '2px solid #667eea' : '1px solid #e2e8f0'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`

const ProjectDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const TechnologyTag = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const ProjectLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #4f46e5;
  }
`

const FeaturedBadge = styled.div`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
`

interface ProjectCardComponentProps {
  project: Project
}

function ProjectCardComponent({ project }: ProjectCardComponentProps) {
  return (
    <ProjectCard featured={project.featured}>
      {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
      <TechnologiesContainer>
        {project.technologies.map((tech) => (
          <TechnologyTag key={tech}>{tech}</TechnologyTag>
        ))}
      </TechnologiesContainer>
      <ProjectLinks>
        {project.githubUrl && (
          <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub →
          </ProjectLink>
        )}
        {project.liveUrl && (
          <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live Demo →
          </ProjectLink>
        )}
      </ProjectLinks>
    </ProjectCard>
  )
}

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>Featured Projects</SectionTitle>
        <ProjectsGrid>
          {featuredProjects.map((project) => (
            <ProjectCardComponent key={project.id} project={project} />
          ))}
        </ProjectsGrid>
        
        {otherProjects.length > 0 && (
          <>
            <SectionTitle>Other Projects</SectionTitle>
            <ProjectsGrid>
              {otherProjects.map((project) => (
                <ProjectCardComponent key={project.id} project={project} />
              ))}
            </ProjectsGrid>
          </>
        )}
      </Container>
    </ProjectsSection>
  )
}