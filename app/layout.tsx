import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'
import ThemeToggle from './ThemeToggle'

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
      suppressHydrationWarning
    >
      <body>
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('dev-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
            }}
          />
        )}
        {children}
        {process.env.NODE_ENV === 'development' && <ThemeToggle />}
      </body>
    </html>
  )
}
