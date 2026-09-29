import styles from './Section.module.css'

type SectionProps = {
  id?: string
  className?: string
  children: React.ReactNode
}

/** A full-width band with the shared gutters and bottom rule. */
export default function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      {children}
    </section>
  )
}
