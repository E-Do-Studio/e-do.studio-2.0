import '@/styles/main.scss'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Metadata } from 'next'
import { I18nProvider } from '@/components/providers/i18n-provider'
import { headers } from 'next/headers'
import { NewsletterPopup } from '@/components/layout/newsletter-popup'
import { CookieBanner } from '@/components/layout/cookie-banner'

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

// Fonction pour détecter la langue préférée du navigateur
async function getLanguageFromAcceptLanguage(): Promise<string> {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')

  if (!acceptLanguage) return 'fr'

  // Extraire la première langue préférée
  const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0]

  // Vérifier si la langue est supportée
  return ['fr', 'en'].includes(preferredLanguage) ? preferredLanguage : 'fr'
}

export async function generateStaticParams() {
  return [{ lng: 'fr' }, { lng: 'en' }]
}

export default async function WebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const defaultLanguage = await getLanguageFromAcceptLanguage()

  return (
    <html lang={defaultLanguage} className={cn(abcFavorit.variable, 'font-abc-favorit font-light antialiased')}>
      <body>
        <I18nProvider defaultLanguage={defaultLanguage}>
          <Header />
          {children}
          <Footer />
          <NewsletterPopup />
          <CookieBanner />
        </I18nProvider>
      </body>
    </html>
  )
}
