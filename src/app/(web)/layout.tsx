import '@/styles/main.scss'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Metadata } from 'next'
import { I18nProvider } from '@/providers/i18n-provider'
import { headers } from 'next/headers'
import { NewsletterPopup } from '@/components/layout/newsletter-popup'
import { CookieBanner } from '@/components/layout/cookie-banner'
import { AnalyticsProvider } from '@/providers/analytics-provider'
import { Toaster } from 'sonner'
import { ChatBotWrapper } from '@/components/chat/chat-bot-wrapper'
import { generateMetadata as generateBaseMetadata } from '@/lib/metadata'
import { StructuredData } from '@/components/schema/structured-data'

const SITE_NAME = 'E-Do Studio'

export const metadata: Metadata = generateBaseMetadata({
  title: 'Découvrez nos services de packshot automatisé',
  description: 'Studio de photographie professionnel spécialisé dans le packshot automatisé. Nous proposons des services de photographie et post-production de haute qualité pour mettre en valeur vos produits.',
  templateTitle: false
})

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

async function getLanguageFromAcceptLanguage(): Promise<string> {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')

  if (!acceptLanguage) return 'fr'
  const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0]
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
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-background">
        <I18nProvider defaultLanguage={defaultLanguage}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <NewsletterPopup />
          <CookieBanner />
          <AnalyticsProvider />
          <Toaster />
          <ChatBotWrapper />
        </I18nProvider>
      </body>
    </html>
  )
}
