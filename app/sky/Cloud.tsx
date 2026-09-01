/** ART SLOT — cloud silhouettes. Three shapes so the drift never looks tiled. */
const SHAPES = [
  'M18 68c7-17 23-26 42-24 8-24 28-38 53-38 28 0 49 18 55 44 9-9 22-14 36-12 18 2 31 13 36 30H18Z',
  'M25 67c6-15 20-24 37-23 9-19 27-31 48-31 24 0 43 14 51 36 10-11 25-16 40-12 15 3 26 14 30 30H25Z',
  'M14 69c8-20 27-31 49-27 10-23 31-37 57-35 25 1 44 17 50 40 11-8 24-10 37-6 15 5 25 14 29 28H14Z',
];

export default function Cloud({
  variant = 0,
  className,
}: {
  variant?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 280 84" focusable="false" aria-hidden="true">
      <path d={SHAPES[variant]} fill="currentColor" />
    </svg>
  );
}
