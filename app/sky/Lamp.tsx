/**
 * ART SLOT — the streetlamp.
 *
 * Drawn once and reused everywhere: on the hero horizon and in the gutter beside
 * each section. The caller sizes it and decides where it stands; this file only
 * decides what it looks like. Class names are the contract:
 *
 *   .lampBody   the silhouette (takes `currentColor`)
 *   .lampLens   the glass, lit by `--lamp`
 *   .lampBloom  the halo around the bulb, lit by `--lamp`
 */
export default function Lamp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 420"
      preserveAspectRatio="xMidYMax meet"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lampBloomGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 214, 145, 0.85)" />
          <stop offset="38%" stopColor="rgba(255, 192, 112, 0.34)" />
          <stop offset="100%" stopColor="rgba(255, 178, 96, 0)" />
        </radialGradient>
        <linearGradient id="lampLensGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255, 246, 219, 0.95)" />
          <stop offset="100%" stopColor="rgba(255, 190, 108, 0.75)" />
        </linearGradient>
      </defs>

      <g className="lampBody" fill="currentColor">
        {/* Plinth and post */}
        <path d="M14 420 L21 398 L46 398 L53 420 Z" />
        <rect x="22" y="382" width="23" height="18" rx="3" />
        <path d="M27 386 L30.5 96 L36.5 96 L40 386 Z" />
        {/* Collar where the arm leaves the post */}
        <rect x="26" y="88" width="15" height="9" rx="3" />
      </g>

      {/* Gooseneck arm */}
      <path
        className="lampBody"
        d="M33.5 92 C33.5 58 47 40 74 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      <g className="lampBody" fill="currentColor">
        {/* Lantern hood */}
        <path d="M56 36 L92 36 L86 50 L62 50 Z" />
        <rect x="70" y="26" width="8" height="11" rx="2" />
      </g>

      {/* The glass — this is what actually turns on */}
      <path
        className="lampLens"
        d="M62.5 50 L85.5 50 L80 76 L68 76 Z"
        fill="url(#lampLensGradient)"
      />
      <circle
        className="lampBloom"
        cx="74"
        cy="60"
        r="52"
        fill="url(#lampBloomGradient)"
      />
    </svg>
  );
}
