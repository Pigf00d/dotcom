'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkyCycle.module.css';

// Later: sync page light/dark with this cycle; at night, street lamps illuminate text.
export default function SkyCycle() {
  const sceneRef = useRef<HTMLDivElement>(null);
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

  const isPaused = !isInView || !isDocumentVisible || reduceMotion;

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
            d="M-4 119 92 77l69 26 104-65 93 50 112-43 94 60 113-81 109 59 90-34 112 66 89-44 104 46 L1444 45 V224 H-4 Z"
          />
          <path
            className={styles.horizonFront}
            d="M-4 151 126 115 227 149 347 96 460 156 590 108 720 168 854 102 961 158 1091 113 1217 157 1444 90 V224 H-4 Z"
          />
          <rect
            className={styles.horizonFront}
            x="-4"
            y="196"
            width="1448"
            height="28"
          />
        </svg>
        <div className={styles.contrastVeil} />
      </div>
    </div>
  );
}
