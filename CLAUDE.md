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

### Later

- Drive the rest of the page light/dark from the hero sun/moon cycle. At night, use street lamps to light the text.
