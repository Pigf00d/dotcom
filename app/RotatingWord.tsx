'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const WORDS = ['beautiful', 'art', 'elegant', 'intentional', 'powerful'];
const INTERVAL_MS = 15_000;

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % WORDS.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <span className={styles.rotatingWord} aria-live="polite">
      <span
        className={styles.rotatingWordTrack}
        style={{ '--word-index': index } as React.CSSProperties}
      >
        {WORDS.map((word) => (
          <span key={word} className={styles.rotatingWordItem}>
            {word}.
          </span>
        ))}
      </span>
    </span>
  );
}
