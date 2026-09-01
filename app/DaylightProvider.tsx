'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  CYCLE_SECONDS,
  MOON_PHASE_STEP,
  REDUCED_MOTION_PHASE,
  START_PHASE,
  computeSky,
  skyCustomProperties,
  type PhaseName,
} from './daylight';

/**
 * Runs the one clock the whole page shares and publishes it as CSS custom
 * properties on <html>.
 *
 * Continuous values (colours, positions, glow) are written straight to the DOM
 * rather than held in React state — a five-minute cycle updating fifteen times a
 * second would otherwise re-render the entire tree ~4,500 times per day. Only
 * the coarse, rarely-changing bits (`phaseName`, `moonPhase`) live in state.
 */

const FRAME_INTERVAL_MS = 66; // ~15fps; colour drift this slow needs no more.

type DaylightContextValue = {
  phaseName: PhaseName;
  /** 0 = new, 0.5 = full. Advances one step per completed cycle. */
  moonPhase: number;
  reduceMotion: boolean;
  paused: boolean;
  /** Non-null when the debug scrubber has taken over the clock. */
  scrubPhase: number | null;
  setScrubPhase: (phase: number | null) => void;
};

const DaylightContext = createContext<DaylightContextValue>({
  phaseName: 'day',
  moonPhase: 0.5,
  reduceMotion: false,
  paused: false,
  scrubPhase: null,
  setScrubPhase: () => {},
});

export const useDaylight = () => useContext(DaylightContext);

export default function DaylightProvider({ children }: { children: ReactNode }) {
  const [phaseName, setPhaseName] = useState<PhaseName>('day');
  const [moonPhase, setMoonPhase] = useState(0.5);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [scrubPhase, setScrubPhase] = useState<number | null>(null);

  // Elapsed cycle time, accumulated so a hidden tab freezes rather than skips.
  const elapsedRef = useRef(START_PHASE * CYCLE_SECONDS);
  const lastTickRef = useRef<number | null>(null);
  const scrubRef = useRef<number | null>(null);
  const frozenRef = useRef(false);

  scrubRef.current = scrubPhase;
  frozenRef.current = reduceMotion || paused;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const sync = () => setPaused(document.visibilityState !== 'visible');
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  const lastPhaseNameRef = useRef<PhaseName | null>(null);

  const paint = useCallback((phase: number) => {
    const root = document.documentElement;
    const sky = computeSky(phase);
    const properties = skyCustomProperties(sky);
    for (const key in properties) {
      root.style.setProperty(key, properties[key]);
    }
    if (sky.phaseName !== lastPhaseNameRef.current) {
      lastPhaseNameRef.current = sky.phaseName;
      root.dataset.phase = sky.phaseName;
      setPhaseName(sky.phaseName);
    }
  }, []);

  // Scrubbing must repaint immediately rather than waiting for the next frame:
  // rAF is throttled to a standstill in a backgrounded or occluded tab, which
  // would otherwise leave the page stuck on a stale time of day.
  useEffect(() => {
    if (scrubPhase !== null) paint(scrubPhase);
  }, [scrubPhase, paint]);

  useEffect(() => {
    let frame = 0;
    let lastPaint = 0;
    let lastMoonStep = -1;

    // Publish once up front. rAF is throttled to a standstill in a tab that
    // starts backgrounded, and without this the page would sit on the
    // stylesheet defaults until it was first looked at.
    paint(reduceMotion ? REDUCED_MOTION_PHASE : (elapsedRef.current / CYCLE_SECONDS) % 1);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const scrub = scrubRef.current;
      if (scrub !== null) {
        lastTickRef.current = now;
        if (now - lastPaint < FRAME_INTERVAL_MS) return;
        lastPaint = now;
        paint(scrub);
        return;
      }

      const last = lastTickRef.current;
      lastTickRef.current = now;

      if (!frozenRef.current && last !== null) {
        // Cap the delta so a backgrounded tab doesn't lurch on return.
        elapsedRef.current += Math.min((now - last) / 1000, 1);
      }

      if (now - lastPaint < FRAME_INTERVAL_MS) return;
      lastPaint = now;

      const phase = reduceMotion
        ? REDUCED_MOTION_PHASE
        : (elapsedRef.current / CYCLE_SECONDS) % 1;

      const cycles = Math.floor(elapsedRef.current / CYCLE_SECONDS);
      if (cycles !== lastMoonStep) {
        lastMoonStep = cycles;
        setMoonPhase((0.5 + cycles * MOON_PHASE_STEP) % 1);
      }

      paint(phase);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lastTickRef.current = null;
    };
  }, [reduceMotion, paint]);

  // Opt-in scrubber: append ?daylight=debug to drag through the cycle.
  const [debugEnabled, setDebugEnabled] = useState(false);
  useEffect(() => {
    setDebugEnabled(
      new URLSearchParams(window.location.search).get('daylight') === 'debug',
    );
  }, []);

  const handleScrub = useCallback(
    (next: number | null) => {
      if (next === null && scrubRef.current !== null) {
        // Resume the real clock from wherever the scrubber left off.
        elapsedRef.current =
          (Math.floor(elapsedRef.current / CYCLE_SECONDS) + scrubRef.current) *
          CYCLE_SECONDS;
        lastTickRef.current = null;
      }
      setScrubPhase(next);
    },
    [],
  );

  const value = useMemo(
    () => ({
      phaseName,
      moonPhase,
      reduceMotion,
      paused,
      scrubPhase,
      setScrubPhase: handleScrub,
    }),
    [phaseName, moonPhase, reduceMotion, paused, scrubPhase, handleScrub],
  );

  return (
    <DaylightContext.Provider value={value}>
      {children}
      {debugEnabled ? <DaylightScrubber /> : null}
    </DaylightContext.Provider>
  );
}

function DaylightScrubber() {
  const { phaseName, moonPhase, scrubPhase, setScrubPhase } = useDaylight();
  const live = scrubPhase === null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        right: '1rem',
        bottom: '1rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        padding: '0.6rem 0.9rem',
        borderRadius: '999px',
        background: 'rgba(12, 16, 24, 0.82)',
        color: '#e8ecf3',
        font: '400 0.72rem/1 ui-monospace, SFMono-Regular, monospace',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
      }}
    >
      <button
        type="button"
        onClick={() => setScrubPhase(live ? 0.5 : null)}
        style={{
          border: '1px solid rgba(232, 236, 243, 0.3)',
          borderRadius: '999px',
          background: 'transparent',
          color: 'inherit',
          font: 'inherit',
          padding: '0.3rem 0.6rem',
          cursor: 'pointer',
        }}
      >
        {live ? 'scrub' : 'live'}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={scrubPhase ?? 0}
        disabled={live}
        onChange={(event) => setScrubPhase(Number(event.target.value))}
        style={{ width: '11rem' }}
        aria-label="Time of day"
      />
      <span style={{ minWidth: '7.5rem' }}>
        {phaseName} · moon {moonPhase.toFixed(2)}
      </span>
    </div>
  );
}
