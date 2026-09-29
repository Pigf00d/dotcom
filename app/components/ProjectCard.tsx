import Image from 'next/image'
import type { Project } from '../data/projects'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: Project
  index: number
}

const modes = { dir: 'drwxr-xr-x', file: '-rw-r--r--' } as const

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { media } = project
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span>
          {modes[project.type]} {number} ./{project.path}
        </span>
        <span>{project.when}</span>
      </div>

      {media.kind === 'image' ? (
        <div className={styles.imageFrame}>
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 900px) 100vw, 520px"
            className={styles.image}
          />
        </div>
      ) : (
        <div role="img" aria-label={media.alt} className={styles.placeholder}>
          <span className={styles.placeholderLabel}>{media.label}</span>
          {media.path && <span>{media.path}</span>}
        </div>
      )}

      <h3 className={styles.title}>{project.title}</h3>
      <div className={styles.stat}>
        <span className={styles.statValue}>{project.stat.value}</span>
        <span className={styles.statCaption}>{project.stat.caption}</span>
      </div>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span key={tag}>[{tag}]</span>
        ))}
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            [{project.link.label}]
          </a>
        )}
      </div>
    </article>
  )
}
