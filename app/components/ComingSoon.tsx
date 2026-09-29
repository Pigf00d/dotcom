import styles from './ComingSoon.module.css'

type ComingSoonProps = {
  label: string
}

/** A dashed stand-in for a section whose content isn't ready yet. */
export default function ComingSoon({ label }: ComingSoonProps) {
  return (
    <div className={styles.box}>
      <span className={styles.label}>[ {label} ]</span>
    </div>
  )
}
