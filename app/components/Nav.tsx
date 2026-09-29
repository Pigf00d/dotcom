import { profile } from '../data/profile'
import styles from './Nav.module.css'

const links = [
  { href: '#projects', label: 'projects' },
  { href: '#blog', label: 'blog' },
  { href: '#off-hours', label: 'off-hours' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  return (
    <header className={styles.bar}>
      <div className={styles.host}>
        <span className={styles.user}>{profile.host}</span>
        <span>:</span>
        <span>~</span>
      </div>
      <nav aria-label="Sections" className={styles.links}>
        {links.map((link, i) => (
          <a key={link.href} href={link.href} className={styles.link}>
            [{i + 1}] {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
