'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './page.module.css';

const WORDS = ['beautiful', 'art', 'elegant', 'intentional', 'powerful'];
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
    const el = itemRefs.current[index];
    if (!el) return;

    const update = () => setWidth(Math.ceil(el.getBoundingClientRect().width));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    void document.fonts?.ready.then(update);

    return () => observer.disconnect();
  }, [index]);

  return (
    <>
      <span className={styles.visuallyHidden}>intentional.</span>
      <span
        className={styles.rotatingWord}
        aria-hidden="true"
        style={width != null ? { width } : undefined}
      >
        <span className={styles.rotatingWordSizer}>{WORDS[index]}.</span>
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
