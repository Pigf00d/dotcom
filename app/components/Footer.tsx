import { contactLinks, profile } from '../data/profile'
import Cursor from './Cursor'
import Prompt from './Prompt'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <Prompt cwd="~/contact %" command="cat links.txt" />
      <dl className={styles.links}>
        {contactLinks.map((link) => {
          const external = link.href.startsWith('http')
          return (
            <div key={link.label} className={styles.item}>
              <dt>{link.label}</dt>
              <dd>
                <a
                  href={link.href}
                  className={styles.link}
                  {...(external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  {link.text}
                </a>
              </dd>
            </div>
          )
        })}
      </dl>
      <div className={styles.signoff}>
        <div>
          © {new Date().getFullYear()} {profile.name}
        </div>
        <div className={styles.prompt}>
          <span className={styles.cwd}>~ %</span>
          <Cursor className={styles.cursor} />
        </div>
      </div>
    </footer>
  )
}
