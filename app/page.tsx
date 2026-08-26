import Image from "next/image";
import styles from "./page.module.css";
import RotatingWord from "./RotatingWord";
import SkyCycle from "./SkyCycle";
// import TechCarousel from "./TechCarousel";
// import MiniCrossword from "./MiniCrossword";

export default function Home() {
  return (
    <>
      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#about" className={styles.navLink}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" className={styles.navLink}>
              Projects
            </a>
          </li>
          <li>
            <a href="#research" className={styles.navLink}>
              Research
            </a>
          </li>
          {/* TODO later: Mini
          <li>
            <a href="#mini" className={styles.navLink}>
              Mini
            </a>
          </li>
          */}
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <SkyCycle />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Creative engineering</p>
          <h1 id="hero-title" className={styles.headline}>
            Software can be <RotatingWord />
          </h1>
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

      {/* ── About ── */}
      <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>Profile</p>
          <h2 className={styles.sectionTitle}>About me</h2>
        </div>
        <div className={styles.aboutLayout}>
          <div className={styles.aboutPhotoFrame}>
            <Image
              src="/profile.jpg"
              alt="Henry Burke"
              width={360}
              height={450}
              sizes="(max-width: 768px) 72vw, 360px"
              className={styles.aboutPhoto}
            />
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.aboutLead}>
              I build thoughtful software that makes complex ideas feel
              simple.
            </p>
            <div className={styles.aboutBody}>
              <p>
                I’m Henry, a software engineer who likes building small,
                finished things — tools for games I actually play, puzzles I
                wished existed, and, along the way, research on how large
                language models make sense of source code.
              </p>
              <p>
                The throughline is care: type-checked puzzle grids, vision
                models that squint at game screenshots, and interfaces that
                respect people’s attention. Most of what I make starts as
                something I wanted for myself and ships once a stranger could
                enjoy it too.
              </p>
            </div>
            <div className={styles.contactRow} aria-label="Contact links">
              <a
                href="mailto:hqbcodes@gmail.com"
                className={styles.contactLink}
              >
                Email
              </a>
              <a
                href="https://github.com/Pigf00d"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://linkedin.com/in/hqburke"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Carousel ── */}
      {/* <TechCarousel /> */}

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
            <Image
              src="/burntbase.png"
              alt="Burntbase — Instantly scan bases for 3-star attacks"
              width={800}
              height={400}
              sizes="(max-width: 700px) 100vw, 50vw"
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
            <Image
              src="/crossword.png"
              alt="Crossword — The Mini daily crossword"
              width={800}
              height={400}
              sizes="(max-width: 700px) 100vw, 50vw"
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

      {/* ── Research ── */}
      <section id="research" className={styles.section}>
        <p className={styles.sectionLabel}>Writing</p>
        <h2 className={styles.sectionTitle}>Research</h2>
        <div className={styles.paperList}>
          <a
            href="https://arxiv.org/abs/2308.12415"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.paperCard}
          >
            <p className={styles.paperVenue}>ICSME 2023</p>
            <h3 className={styles.paperTitle}>
              Benchmarking Causal Study to Interpret Large Language Models
              for Source Code
            </h3>
            <p className={styles.paperAuthors}>
              Daniel Rodriguez-Cardenas, David N. Palacio, Dipin Khati,{" "}
              <span className={styles.paperAuthorMe}>Henry Burke</span>,
              Denys Poshyvanyk
            </p>
            <p className={styles.paperDesc}>
              Introduces Galeras, a causal benchmarking strategy for
              interpreting LLM performance on code completion, summarization,
              and commit generation — controlling for confounders that
              accuracy metrics miss.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.tag}>arXiv</span>
              <span className={styles.tag}>LLMs</span>
              <span className={styles.tag}>Causal Inference</span>
            </div>
          </a>
        </div>
      </section>

      {/* TODO later: Mini crossword
      <section id="mini" className={styles.section}>
        <p className={styles.sectionLabel}>Interlude</p>
        <h2 className={styles.sectionTitle}>The Mini</h2>
        <p className={styles.miniIntro}>
          A five-by-five you can solve right here — built in React for this
          page. The full daily version is the{" "}
          <a
            href="https://crossword-phi-ashy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            Crossword project
          </a>
          .
        </p>
        <MiniCrossword />
      </section>
      */}

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Henry Burke
      </footer>
    </>
  );
}
