/**
 * ART SLOT — the moon, drawn at an arbitrary phase.
 *
 * `phase` runs 0 → 1: 0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter.
 * The lit region is a semicircle closed by an elliptical terminator whose
 * semi-minor axis is R·|cos(2πφ)|; waning phases are the waxing path mirrored.
 */

const R = 27;

function litPath(phase: number) {
  const waning = phase > 0.5;
  const p = waning ? 1 - phase : phase;
  const k = Math.cos(Math.PI * 2 * p);
  const rx = Math.abs(k) * R;
  // Terminator bulges toward the lit limb while waxing crescent (k > 0).
  const sweep = k > 0 ? 0 : 1;
  return {
    d: `M 0 ${-R} A ${R} ${R} 0 0 1 0 ${R} A ${rx.toFixed(3)} ${R} 0 0 ${sweep} 0 ${-R} Z`,
    mirrored: waning,
  };
}

export default function Moon({ phase = 0.5 }: { phase?: number }) {
  const { d, mirrored } = litPath(((phase % 1) + 1) % 1);

  return (
    <svg viewBox="-50 -50 100 100" focusable="false" aria-hidden="true">
      <defs>
        <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
          <stop offset="46%" stopColor="rgba(209, 221, 242, 0.34)" />
          <stop offset="100%" stopColor="rgba(209, 221, 242, 0)" />
        </radialGradient>
        <radialGradient id="moonDisc" cx="38%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#f6f8fb" />
          <stop offset="62%" stopColor="#e2e7ee" />
          <stop offset="100%" stopColor="#c2ccd9" />
        </radialGradient>
        <clipPath id="moonLit">
          <path d={d} transform={mirrored ? 'scale(-1, 1)' : undefined} />
        </clipPath>
      </defs>
      <circle cx="0" cy="0" r="50" fill="url(#moonHalo)" />
      {/* Earthshine: the unlit disc, barely there. */}
      <circle cx="0" cy="0" r={R} fill="rgba(150, 163, 186, 0.14)" />
      <g clipPath="url(#moonLit)">
        <circle cx="0" cy="0" r={R} fill="url(#moonDisc)" />
        <circle cx={-R * 0.28} cy={-R * 0.3} r={R * 0.16} fill="rgba(147, 160, 176, 0.3)" />
        <circle cx={R * 0.3} cy={R * 0.24} r={R * 0.11} fill="rgba(147, 160, 176, 0.26)" />
        <circle cx={-R * 0.05} cy={R * 0.42} r={R * 0.07} fill="rgba(147, 160, 176, 0.22)" />
      </g>
    </svg>
  );
}
