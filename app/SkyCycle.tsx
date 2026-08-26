'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkyCycle.module.css';

export default function SkyCycle() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);

    return () => {
      motionQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
    };

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const isPaused =
    manuallyPaused || !isInView || !isDocumentVisible || reduceMotion;

  return (
    <div
      ref={sceneRef}
      className={`${styles.scene} ${isPaused ? styles.paused : ''}`}
      data-reduced-motion={reduceMotion ? 'true' : 'false'}
    >
      <div className={styles.artwork} aria-hidden="true">
        <div className={`${styles.skyLayer} ${styles.dawn}`} />
        <div className={`${styles.skyLayer} ${styles.day}`} />
        <div className={`${styles.skyLayer} ${styles.sunset}`} />
        <div className={`${styles.skyLayer} ${styles.night}`} />
        <div className={styles.stars} />

        <div className={styles.sunTrack}>
          <span className={styles.sun} />
        </div>
        <div className={styles.moonTrack}>
          <span className={styles.moon}>
            <span className={styles.craterOne} />
            <span className={styles.craterTwo} />
            <span className={styles.craterThree} />
          </span>
        </div>

        <div className={`${styles.cloudLayer} ${styles.cloudLayerOne}`}>
          <svg
            className={styles.cloud}
            viewBox="0 0 280 84"
            focusable="false"
          >
            <path d="M18 68c7-17 23-26 42-24 8-24 28-38 53-38 28 0 49 18 55 44 9-9 22-14 36-12 18 2 31 13 36 30H18Z" />
          </svg>
        </div>
        <div className={`${styles.cloudLayer} ${styles.cloudLayerTwo}`}>
          <svg
            className={styles.cloud}
            viewBox="0 0 280 84"
            focusable="false"
          >
            <path d="M25 67c6-15 20-24 37-23 9-19 27-31 48-31 24 0 43 14 51 36 10-11 25-16 40-12 15 3 26 14 30 30H25Z" />
          </svg>
        </div>
        <div className={`${styles.cloudLayer} ${styles.cloudLayerThree}`}>
          <svg
            className={styles.cloud}
            viewBox="0 0 280 84"
            focusable="false"
          >
            <path d="M14 69c8-20 27-31 49-27 10-23 31-37 57-35 25 1 44 17 50 40 11-8 24-10 37-6 15 5 25 14 29 28H14Z" />
          </svg>
        </div>

        <div className={styles.haze} />
        <svg
          className={styles.horizon}
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className={styles.horizonBack}
            d="M0 119 92 77l69 26 104-65 93 50 112-43 94 60 113-81 109 59 90-34 112 66 89-44 104 46 149-72v175H0Z"
          />
          <path
            className={styles.horizonFront}
            d="m0 151 126-36 101 34 120-53 113 60 130-48 130 60 134-66 107 56 130-45 126 44 143-67v120H0Z"
          />
        </svg>
        <div className={styles.contrastVeil} />
      </div>

      <button
        type="button"
        className={styles.motionControl}
        onClick={() => setManuallyPaused((paused) => !paused)}
        aria-pressed={manuallyPaused}
        aria-label={
          reduceMotion
            ? 'Sky animation disabled by reduced motion preference'
            : manuallyPaused
              ? 'Play sky animation'
              : 'Pause sky animation'
        }
        disabled={reduceMotion}
      >
        <span className={styles.controlIcon} aria-hidden="true">
          {reduceMotion ? '—' : manuallyPaused ? '▶' : 'Ⅱ'}
        </span>
        {reduceMotion ? 'Motion reduced' : manuallyPaused ? 'Play sky' : 'Pause sky'}
      </button>
    </div>
  );
}
