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

- `app/layout.tsx` - Root layout: fonts (VT323 + IBM Plex Mono via `next/font/google`), metadata, the scanline overlay, and Vercel Analytics
- `app/page.tsx` - Homepage; composes the section components in order
- `app/globals.css` - Colour tokens, gutters, and base element styles
- `app/components/` - One component per section (`Nav`, `Hero`, `Projects` + `ProjectCard`, `BlogList`, `OffHours`, `Footer`) plus small shared pieces (`Section`, `SectionHeader`, `Prompt`, `Cursor`, `Scanlines`), each with its own CSS module
- `app/data/` - All editable content as typed arrays (`profile.ts`, `projects.ts`, `posts.ts`, `offHours.ts`)

### Key Patterns

- **Server Components by default**: Nothing on the page needs client JavaScript; keep it that way unless a feature requires it
- **CSS Modules**: Component-scoped styles using `.module.css` files; shared values are CSS custom properties in `globals.css`
- **TypeScript paths**: `@/*` alias maps to project root (tsconfig.json:22)
- **Strict mode enabled**: TypeScript strict mode and React strict mode are both on

### Design ("terminal")

- Black background, off-white text (`--fg: #f2f2f2`), grays `#d6d6d6` / `#bdbdbd` / `#9a9a9a` / `#808080`, borders `#2e2e2e` / `#3a3a3a`. Use the tokens in `globals.css`, not raw hex values.
- VT323 (`--font-display`) is for the name and headings only; everything else is IBM Plex Mono (`--font-mono`). Both fall back to `ui-monospace, Menlo` rather than next/font's resized Arial, because Plex lacks glyphs like `→` and `↗`.
- Content is capped at `--content-max` (1200px) and centred by `--gutter`; section borders run edge to edge. Breakpoints are 1100px, 900px (one-column projects) and 720px.
- The blinking cursor (`Cursor`) uses a `steps(1)` animation and stays solid under `prefers-reduced-motion`.

### Content

- Edit content in `app/data/`, not in the components.
- A project shows its `media` image through `next/image` when `kind: 'image'`, otherwise the dashed placeholder box. To add a screenshot, put it in `public/`, import it in `projects.ts`, and switch that project's `media` to `kind: 'image'`.
- The Blog and Outside of Work sections currently render a `ComingSoon` box. Their real markup is commented out in `BlogList.tsx` and `OffHours.tsx` (with the data untouched in `posts.ts` / `offHours.ts`); uncomment it to bring them back.
- There is no blog backend yet: `posts.ts` holds placeholder rows, and `BlogList` sorts by `date`, newest first.
- Bracketed text like `[POST TITLE]` or `[RESUME URL]` is an intentional placeholder; leave it until real content exists.
