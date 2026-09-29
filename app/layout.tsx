import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Mono, VT323 } from 'next/font/google'
import './globals.css'
import Scanlines from './components/Scanlines'

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
  // Fall back to a real monospace, not next/font's resized Arial: glyphs the
  // web fonts lack (→, ↗) and the pre-swap paint should stay terminal-like.
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
})

export const metadata: Metadata = {
  title: 'Henry Burke',
  description: 'Personal portfolio of Henry Burke — Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <Scanlines />
        <Analytics />
      </body>
    </html>
  )
}
