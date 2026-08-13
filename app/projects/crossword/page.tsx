import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../project.module.css';

export const metadata: Metadata = {
  title: 'Crossword — Henry Burke',
  description:
    'Case study: a NYT-Mini-style daily crossword built with SvelteKit and Svelte 5, with puzzles defined as typed code.',
};

export default function CrosswordPage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.backLink}>
        ← Henry Burke
      </Link>

      <p className={styles.kicker}>Case Study</p>
      <h1 className={styles.title}>Crossword</h1>
      <p className={styles.lede}>
        A Mini-style daily crossword: interactive grid, clue navigation, error
        checking, and confetti when you finish.
      </p>
      <div className={styles.meta}>
        <span className={styles.tag}>SvelteKit</span>
        <span className={styles.tag}>Svelte 5</span>
        <span className={styles.tag}>TypeScript</span>
        <a
          href="https://crossword-phi-ashy.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.external}
        >
          Play it live ↗
        </a>
      </div>

      <img
        src="/crossword.png"
        alt="Crossword — The Mini daily crossword"
        className={styles.heroImage}
      />

      <div className={styles.prose}>
        <h2>The itch</h2>
        <p>
          The NYT Mini is a perfect piece of software: a five-minute ritual
          with exactly one job. I wanted my own — a place to ship grids I
          wrote myself — and a real project to learn Svelte 5 on, since a
          crossword is secretly a great UI stress test. It needs precise
          keyboard handling, focus management across a grid, two directions of
          navigation that share the same cells, and state that updates on
          every keystroke without jank.
        </p>

        <h2>How it plays</h2>
        <p>
          The grid is keyboard-first: type to fill and advance, arrows to
          move, and a tap on the active cell flips between across and down.
          Clues track your position as you move, and clicking a clue jumps you
          to its word. There’s an error check for when you’re stuck, and
          confetti when the grid is clean — a small reward that makes
          finishing feel like finishing.
        </p>

        <h2>Puzzles as code, not content</h2>
        <p>
          The design decision I’d defend hardest: puzzle data lives in the
          codebase as typed TypeScript, not in a CMS or database. A new grid
          is a new file and a deploy. That sounds primitive, but it buys a
          lot — the type system validates every puzzle’s shape before it can
          ship, git is the puzzle archive, and there’s zero infrastructure to
          maintain for a site whose entire content is a 25-cell grid. For a
          solo daily puzzle, an admin panel is a liability, not a feature.
        </p>
        <p>
          There’s also a playable React port of a mini{' '}
          <Link href="/#mini">on the front page of this site</Link> — same
          idea, different framework, which turned out to be a fun comparison
          of how the two handle the same interaction problems.
        </p>
      </div>
    </main>
  );
}
