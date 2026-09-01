/**
 * The single source of truth for "what time is it?" on this page.
 *
 * Everything visual — the sky, the page palette, the streetlamps, the photo
 * exposure — is derived from one number: `phase`, which runs 0 → 1 over one
 * full day. Nothing else is allowed to keep its own clock.
 *
 *   phase 0.00  sunrise (sun on the eastern horizon)
 *   phase 0.25  noon    (sun at the top of its arc)
 *   phase 0.50  sunset  (sun on the western horizon)
 *   phase 0.75  midnight
 */

/** One full day/night cycle, in seconds. */
export const CYCLE_SECONDS = 300;

/** Where the cycle starts on first paint — mid-morning, so the page opens light. */
export const START_PHASE = 0.12;

/** Frozen time-of-day for `prefers-reduced-motion`: bright, with a hint of warmth. */
export const REDUCED_MOTION_PHASE = 0.46;

/** How far the moon's phase advances per completed cycle. */
export const MOON_PHASE_STEP = 1 / 8;

const TAU = Math.PI * 2;

/** Geometry of the celestial arc, in % of the hero box. */
const HORIZON_Y = 80;
const ZENITH_Y = 10;
const ARC_HALF_WIDTH = 46;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/** Hermite ramp from 0 to 1 between two edges. `edge1 < edge0` inverts it. */
function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Steeper ramp — zero first *and* second derivative at both ends. */
function smootherstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export type PhaseName = 'dawn' | 'day' | 'dusk' | 'night';

export type SkyState = {
  phase: number;
  phaseName: PhaseName;

  /** -1 (nadir) → 1 (zenith). */
  sunElevation: number;
  moonElevation: number;

  /** Position within the hero box, in %. */
  sunX: number;
  sunY: number;
  sunOpacity: number;
  moonX: number;
  moonY: number;
  moonOpacity: number;

  /** 0 = full night, 1 = full day. Drives the sky, not the page. */
  daylight: number;
  nightness: number;
  /** Warm horizon light — peaks as the sun crosses the horizon, either way. */
  golden: number;

  /**
   * How dark the *page* is. Deliberately not `nightness`: this crosses fast, so
   * text and background never linger in the unreadable middle. See `darkness`.
   */
  darkness: number;
  /** Streetlamp brightness. Leads `darkness` slightly, so the lamps light the way. */
  lamp: number;
  /**
   * Strength of the rim of light drawn around body text, peaking exactly at the
   * moment ink and background cross. See `inkHalo`.
   */
  inkHalo: number;
  starOpacity: number;
  hazeOpacity: number;

  /** Pre-composited opacities for the stacked sky layers (day is the base). */
  dawnAlpha: number;
  duskAlpha: number;
  nightAlpha: number;
};

/**
 * The page palette must never sit at a mid-tone with mid-tone text on it, so
 * background and ink are driven by this *one* value and cross together, over
 * roughly two seconds of a five-minute cycle. That brief low-contrast instant
 * lands exactly at dusk, while the lamps are warming up, so it reads as evening
 * falling rather than as a broken theme.
 */
function pageDarkness(nightness: number) {
  return smootherstep(0.58, 0.74, nightness);
}

/**
 * Any continuous path from dark-ink-on-light to light-ink-on-dark has to pass
 * through a moment where ink and background share a luminance — the intermediate
 * value theorem guarantees it, and no choice of easing avoids it. The crossing
 * here is down to about a third of a second, but at its centre the text would
 * genuinely vanish.
 *
 * So instead of trying to dodge it, the letterforms get a dark rim that peaks at
 * exactly that instant and is gone at both ends. It keeps the type readable
 * through the swap by outline rather than by fill, and at dusk it reads as the
 * streetlamps catching the edges of the words.
 */
function inkHalo(darkness: number) {
  return smootherstep(0.16, 0.5, darkness) * smootherstep(0.84, 0.5, darkness);
}

export function computeSky(phase: number): SkyState {
  const wrapped = ((phase % 1) + 1) % 1;
  const angle = TAU * wrapped;

  const sunElevation = Math.sin(angle);
  const moonElevation = -sunElevation;
  const rising = Math.cos(angle) > 0;

  const sunX = 50 - ARC_HALF_WIDTH * Math.cos(angle);
  const sunY = HORIZON_Y - sunElevation * (HORIZON_Y - ZENITH_Y);
  const moonX = 100 - sunX;
  const moonY = HORIZON_Y - moonElevation * (HORIZON_Y - ZENITH_Y);

  const daylight = smoothstep(-0.32, 0.45, sunElevation);
  const nightness = 1 - daylight;

  const goldenRaw = clamp01(1 - Math.abs(sunElevation) / 0.46);
  const golden = goldenRaw * goldenRaw * (3 - 2 * goldenRaw);

  // Normalised weights for the four sky palettes.
  const warmWeight = golden;
  const total = Math.max(daylight + nightness + warmWeight, 1e-4);
  const wDay = daylight / total;
  const wNight = nightness / total;
  const wDawn = (rising ? warmWeight : 0) / total;
  const wDusk = (rising ? 0 : warmWeight) / total;

  // Convert weights to stacked "over" opacities: day (base) → dawn → dusk → night.
  const nightAlpha = clamp01(wNight);
  const duskAlpha = clamp01(wDusk / Math.max(1 - wNight, 1e-4));
  const dawnAlpha = clamp01(wDawn / Math.max(1 - wNight - wDusk, 1e-4));
  void wDay;

  const darkness = pageDarkness(nightness);
  const lamp = smoothstep(0.38, 0.68, nightness);

  let phaseName: PhaseName;
  if (daylight > 0.85) phaseName = 'day';
  else if (nightness > 0.85) phaseName = 'night';
  else phaseName = rising ? 'dawn' : 'dusk';

  return {
    phase: wrapped,
    phaseName,
    sunElevation,
    moonElevation,
    sunX,
    sunY,
    sunOpacity: smoothstep(-0.16, -0.02, sunElevation),
    moonX,
    moonY,
    moonOpacity: smoothstep(-0.16, -0.02, moonElevation),
    daylight,
    nightness,
    golden,
    darkness,
    lamp,
    inkHalo: inkHalo(darkness),
    starOpacity: Math.pow(nightness, 1.4) * 0.9,
    hazeOpacity: golden * 0.8 + 0.06,
    dawnAlpha,
    duskAlpha,
    nightAlpha,
  };
}

const round = (value: number) => Math.round(value * 1000) / 1000;

/** The CSS custom properties every other stylesheet in the app reads. */
export function skyCustomProperties(sky: SkyState): Record<string, string> {
  return {
    '--daylight': String(round(sky.daylight)),
    '--nightness': String(round(sky.nightness)),
    '--golden': String(round(sky.golden)),
    '--dark-t': String(round(sky.darkness)),
    '--lamp': String(round(sky.lamp)),
    '--ink-halo': String(round(sky.inkHalo)),
    '--sun-x': String(round(sky.sunX)),
    '--sun-y': String(round(sky.sunY)),
    '--sun-opacity': String(round(sky.sunOpacity)),
    '--moon-x': String(round(sky.moonX)),
    '--moon-y': String(round(sky.moonY)),
    '--moon-opacity': String(round(sky.moonOpacity)),
    '--sky-dawn-a': String(round(sky.dawnAlpha)),
    '--sky-dusk-a': String(round(sky.duskAlpha)),
    '--sky-night-a': String(round(sky.nightAlpha)),
    '--star-opacity': String(round(sky.starOpacity)),
    '--haze-opacity': String(round(sky.hazeOpacity)),
  };
}
