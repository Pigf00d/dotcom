# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal landing page/portfolio site built with Next.js 14, React 18, and TypeScript. It uses the Next.js App Router architecture with server components by default.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm lint
```

## Architecture

### Next.js App Router Structure

- `app/layout.tsx` - Root layout component with metadata configuration (title, description)
- `app/page.tsx` - Homepage component (default server component)
- `app/globals.css` - Global styles
- `app/page.module.css` - CSS modules for homepage

### Key Patterns

- **Server Components by default**: All components in the `app/` directory are React Server Components unless marked with 'use client'
- **CSS Modules**: Component-scoped styles using `.module.css` files
- **TypeScript paths**: `@/*` alias maps to project root (tsconfig.json:22)
- **Strict mode enabled**: TypeScript strict mode and React strict mode are both on

### Customization Notes

- Resume link in `app/page.tsx:10` expects `/resume.pdf` in the `public/` folder
- Site metadata (title, description) is in `app/layout.tsx:4-7`
- Personal name is hardcoded in `app/page.tsx:7` and `app/layout.tsx:5`

### Daylight cycle

The whole page is driven by one clock. `app/daylight.ts` turns a single `phase`
(0 -> 1 over `CYCLE_SECONDS`) into every derived value; `app/DaylightProvider.tsx`
runs that clock and publishes the results as CSS custom properties on `<html>`.
Nothing else may keep its own time base.

- `--dark-t` drives the page palette in `globals.css`. It is intentionally not
  linear in time: ink and background cross in about a second so they never sit
  at a mid-tone together, and `--ink-halo` carries legibility through the
  crossing. Changing that curve means re-checking contrast.
- `--lamp` lights the streetlamps (`app/Streetlamp.tsx`), which stand in each
  section's gutter above 1080px and on the hero horizon.
- `--image-filter` re-exposes photographs so they don't glare at night.
- Append `?daylight=debug` for a scrubber to drag through the cycle.

### Later

- Replace the placeholder artwork with real art. Everything drawable lives in
  `app/sky/` (`Sun`, `Moon`, `Cloud`, `Lamp`) and is positioned entirely by its
  caller, so each file can be swapped without touching the motion or lighting.
- The streetlamp lighting needs another pass. The cone is the only light source
  now (a second rectangular glow was removed because its box edges showed), so
  it is doing all the work alone: the falloff where it ends is still a little
  readable as a shape, and the light does not yet wrap the text the way a real
  lamp would. Worth revisiting once the lamp artwork is final.
