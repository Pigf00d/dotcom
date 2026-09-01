'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkyCycle.module.css';
import { useDaylight } from './DaylightProvider';
import Sun from './sky/Sun';
import Moon from './sky/Moon';
import Cloud from './sky/Cloud';
import Lamp from './sky/Lamp';

/**
 * The hero sky. It owns no clock of its own — every layer's opacity and the
 * positions of the sun and moon come from the `--sky-*` custom properties that
 * DaylightProvider publishes on <html>, which is what keeps the rest of the page
 * in step with it.
 *
 * The four sky palettes are stacked and composited "over" one another; the
 * alphas are pre-solved in daylight.ts so the result is an exact weighted blend.
 * Cloud drift is the one thing that stays on its own CSS timeline — weather
 * doesn't track the sun.
 */
export default function SkyCycle() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const { moonPhase, reduceMotion, paused } = useDaylight();

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

  const driftPaused = !isInView || paused || reduceMotion;

  return (
    <div
      ref={sceneRef}
      className={`${styles.scene} ${driftPaused ? styles.paused : ''}`}
      data-reduced-motion={reduceMotion ? 'true' : 'false'}
    >
      <div className={styles.artwork} aria-hidden="true">
        {/* Day is the base; the rest are composited over it. */}
        <div className={`${styles.skyLayer} ${styles.day}`} />
        <div className={`${styles.skyLayer} ${styles.dawn}`} />
        <div className={`${styles.skyLayer} ${styles.sunset}`} />
        <div className={`${styles.skyLayer} ${styles.night}`} />
        <div className={styles.stars} />

        <div className={styles.sunTrack}>
          <Sun />
        </div>
        <div className={styles.moonTrack}>
          <Moon phase={moonPhase} />
        </div>

        <div className={`${styles.cloudLayer} ${styles.cloudLayerOne}`}>
          <Cloud variant={0} className={styles.cloud} />
        </div>
        <div className={`${styles.cloudLayer} ${styles.cloudLayerTwo}`}>
          <Cloud variant={1} className={styles.cloud} />
        </div>
        <div className={`${styles.cloudLayer} ${styles.cloudLayerThree}`}>
          <Cloud variant={2} className={styles.cloud} />
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

        {/* The same lamps that light the sections below, standing on the ridge. */}
        <div className={`${styles.heroLamp} ${styles.heroLampLeft}`}>
          <Lamp className={styles.heroLampArt} />
        </div>
        <div className={`${styles.heroLamp} ${styles.heroLampRight}`}>
          <Lamp className={styles.heroLampArt} />
        </div>

        <div className={styles.contrastVeil} />
      </div>
    </div>
  );
}
