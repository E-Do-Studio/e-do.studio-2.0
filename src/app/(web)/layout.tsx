import '@/styles/main.scss'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Metadata } from 'next'
import { I18nProvider } from '@/components/providers/i18n-provider'

export const metadata: Metadata = {
  title: 'E-Do Studio',
  description: 'E-Do Studio',
}

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

export default function WebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(abcFavorit.variable, 'font-abc-favorit font-light antialiased')}>
      <body>
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
