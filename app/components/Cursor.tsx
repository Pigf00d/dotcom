import styles from './Cursor.module.css'

type CursorProps = {
  /** Sets the block's size (and any glow) for where it is used. */
  className?: string
}

export default function Cursor({ className }: CursorProps) {
  return (
    <span
      className={className ? `${styles.cursor} ${className}` : styles.cursor}
      aria-hidden="true"
    />
  )
}
