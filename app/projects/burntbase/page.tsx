import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../project.module.css';

export const metadata: Metadata = {
  title: 'Burntbase — Henry Burke',
  description:
    'Case study: an AI vision tool that identifies Clash of Clans base layouts from a screenshot and finds three-star attack videos for them.',
};

export default function BurntbasePage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.backLink}>
        ← Henry Burke
      </Link>

      <p className={styles.kicker}>Case Study</p>
      <h1 className={styles.title}>Burntbase</h1>
      <p className={styles.lede}>
        Point your camera at an enemy base in Clash of Clans, and get back
        videos of pros three-starring that exact layout.
      </p>
      <div className={styles.meta}>
        <span className={styles.tag}>Next.js</span>
        <span className={styles.tag}>TypeScript</span>
        <span className={styles.tag}>Computer Vision</span>
        <span className={styles.tag}>AWS S3</span>
        <a
          href="https://burntbase.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.external}
        >
          Visit burntbase.com ↗
        </a>
      </div>

      <img
        src="/burntbase.png"
        alt="Burntbase — Instantly scan bases for 3-star attacks"
        className={styles.heroImage}
      />

      <div className={styles.prose}>
        <h2>The problem</h2>
        <p>
          Attacking well in Clash of Clans means studying the defender’s base
          layout before you commit an army to it. Serious players know the meta
          layouts have all been beaten on YouTube — somewhere — but finding the
          right video means describing a picture with words. There’s no good
          search query for “that anti-air ring base with the offset town hall.”
          So players scroll thumbnails and match layouts by eye, every single
          war.
        </p>

        <h2>How it works</h2>
        <p>
          Burntbase replaces that scroll with a screenshot. You upload a
          picture of the enemy base, the upload lands in S3, and an AI vision
          model reads the layout — identifying the defenses and their
          arrangement rather than comparing raw pixels. The identified layout
          is then matched against an index of known bases, and the app surfaces
          YouTube videos of successful three-star attacks against that
          specific layout, on web and mobile.
        </p>

        <h2>Why vision, not image matching</h2>
        <p>
          The tempting first approach is perceptual hashing: fingerprint the
          screenshot, look up near-duplicates. It falls apart immediately,
          because the same base layout almost never produces the same image
          twice. Players run different scenery and building skins, different
          upgrade levels change how every structure looks, and screenshots come
          cropped and zoomed however the player happened to hold their phone.
        </p>
        <p>
          What actually stays constant across all of that is structure — which
          defenses exist and where they sit relative to each other. That’s a
          job for a vision model, not a hash. Reading the base the way a player
          does makes recognition robust to every cosmetic variation the game
          can throw at it.
        </p>
      </div>
    </main>
  );
}
