import styles from "./page.module.css";
import TechCarousel from "./TechCarousel";

export default function Home() {
  return (
    <>
      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#projects" className={styles.navLink}>
              Projects
            </a>
          </li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.headline}>Software can be beautiful.</h1>
          <p className={styles.name}>Henry Burke</p>
          <p className={styles.tagline}>Software Engineer</p>
          <div className={styles.heroLinks}>
            <a
              href="https://linkedin.com/in/hqburke"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className={styles.socialLabel}>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Pigf00d"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span className={styles.socialLabel}>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Tech Carousel ── */}
      <TechCarousel />

      {/* ── Projects ── */}
      <section id="projects" className={styles.section}>
        <p className={styles.sectionLabel}>Work</p>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectGrid}>
          <a
            href="https://burntbase.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectCard}
          >
            <img
              src="/burntbase.png"
              alt="Burntbase — Instantly scan bases for 3-star attacks"
              className={styles.projectImage}
            />
            <h3 className={styles.projectName}>Burntbase</h3>
            <p className={styles.projectDesc}>
              A web and mobile app for Clash of Clans players. Upload a
              screenshot of an enemy base and an AI vision model identifies
              the layout and defenses, then surfaces YouTube videos of
              three-star attack strategies for that specific base.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.tag}>Next.js</span>
              <span className={styles.tag}>TypeScript</span>
              <span className={styles.tag}>Computer Vision</span>
              <span className={styles.tag}>AWS S3</span>
            </div>
          </a>
          <a
            href="https://crossword-phi-ashy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectCard}
          >
            <img
              src="/crossword.png"
              alt="Crossword — The Mini daily crossword"
              className={styles.projectImage}
            />
            <h3 className={styles.projectName}>Crossword</h3>
            <p className={styles.projectDesc}>
              A SvelteKit mini crossword with an interactive grid, clue
              navigation, error checking, and a confetti finish. Puzzle data
              is defined in code so new grids are easy to ship.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.tag}>SvelteKit</span>
              <span className={styles.tag}>TypeScript</span>
              <span className={styles.tag}>Svelte 5</span>
            </div>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Henry Burke
      </footer>
    </>
  );
}
