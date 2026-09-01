import Lamp from './sky/Lamp';
import styles from './Streetlamp.module.css';

/**
 * A streetlamp standing in a section's gutter, plus the light it throws across
 * the text beside it. Purely decorative: it reads `--lamp` off <html> and needs
 * no JavaScript of its own, so it stays a server component.
 */
export default function Streetlamp({ className }: { className?: string }) {
  return (
    <div
      className={className ? `${styles.mount} ${className}` : styles.mount}
      aria-hidden="true"
    >
      <span className={styles.cone} />
      <Lamp className={styles.lamp} />
    </div>
  );
}
