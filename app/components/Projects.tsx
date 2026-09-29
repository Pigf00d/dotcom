import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Section from './Section'
import SectionHeader from './SectionHeader'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <Section id="projects" className={styles.projects}>
      <SectionHeader
        cwd="~/projects %"
        command="ls -la"
        title="Projects"
        aside={<div className={styles.total}>total {projects.length}</div>}
      />
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.path} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
