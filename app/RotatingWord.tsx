'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './page.module.css';

const WORDS = ['beautiful', 'art', 'elegant', 'intentional', 'powerful'];
const LONGEST_WORD = WORDS.reduce((longest, word) =>
  word.length > longest.length ? word : longest,
);
const INTERVAL_MS = 15_000;

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [width, setWidth] = useState<number>();
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

  useLayoutEffect(() => {
    const update = () => {
      const maxWidth = itemRefs.current.reduce((widest, el) => {
        if (!el) return widest;
        return Math.max(widest, el.getBoundingClientRect().width);
      }, 0);

      if (maxWidth > 0) setWidth(Math.ceil(maxWidth));
    };

    update();

    const observer = new ResizeObserver(update);
    for (const el of itemRefs.current) {
      if (el) observer.observe(el);
    }
    void document.fonts?.ready.then(update);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span className={styles.visuallyHidden}>intentional.</span>
      <span
        className={styles.rotatingWord}
        aria-hidden="true"
        style={width != null ? { width } : undefined}
      >
        <span className={styles.rotatingWordSizer}>{LONGEST_WORD}.</span>
        <span className={styles.rotatingWordViewport}>
          <span
            className={styles.rotatingWordTrack}
            style={{ '--word-index': index } as React.CSSProperties}
          >
            {WORDS.map((word, i) => (
              <span
                key={word}
                ref={(node) => {
                  itemRefs.current[i] = node;
                }}
                className={styles.rotatingWordItem}
              >
                {word}.
              </span>
            ))}
          </span>
        </span>
      </span>
    </>
  );
}
