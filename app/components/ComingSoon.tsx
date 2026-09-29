import styles from './ComingSoon.module.css'

/** A dashed stand-in for a section whose content isn't ready yet. */
export default function ComingSoon() {
  return (
    <div className={styles.box}>
      <span className={styles.label}>[ COMING SOON ]</span>
    </div>
  )
}
