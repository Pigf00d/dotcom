import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
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
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
