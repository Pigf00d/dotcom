/**
 * ART SLOT — the sun.
 *
 * Everything here is purely the drawing. Position, scale and visibility are the
 * caller's job (see SkyCycle), so this file can be replaced wholesale with real
 * artwork — an <Image>, a hand-drawn SVG, a sprite — as long as it fills its box
 * and keeps the `--sun-*` colours off the layout.
 */
export default function Sun() {
  return (
    <svg viewBox="0 0 100 100" focusable="false" aria-hidden="true">
      <defs>
        <radialGradient id="sunCorona" cx="50%" cy="50%" r="50%">
          <stop offset="42%" stopColor="rgba(255, 216, 140, 0.55)" />
          <stop offset="68%" stopColor="rgba(255, 183, 96, 0.22)" />
          <stop offset="100%" stopColor="rgba(255, 168, 84, 0)" />
        </radialGradient>
        <radialGradient id="sunDisc" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fffdf5" />
          <stop offset="58%" stopColor="#fff1c9" />
          <stop offset="100%" stopColor="#ffdb9b" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#sunCorona)" />
      <circle cx="50" cy="50" r="27" fill="url(#sunDisc)" />
    </svg>
  );
}
