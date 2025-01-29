'use client'

import '@/styles/main.scss'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { useMobileMenu } from '@/store/use-mobile-menu'
import { useEffect } from 'react'
import { Footer } from '@/components/layout/footer'

// Import ABC Favorit font
const abcFavorit = localFont({
  src: [
    {
      path: '../../../public/fonts/ABCFavorit-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ABCFavorit-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ABCFavorit-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-abc-favorit',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useMobileMenu()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <html lang="en" className={cn(abcFavorit.variable, 'font-abc-favorit font-light antialiased')}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
