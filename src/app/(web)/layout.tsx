import '@/styles/main.scss'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'

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
  return (
    <html lang="en" className={cn(abcFavorit.variable, 'font-abc-favorit font-light antialiased')}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
