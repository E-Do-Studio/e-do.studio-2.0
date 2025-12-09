import { cookies, headers } from 'next/headers'

export type SupportedLanguage = 'fr' | 'en'

export async function getLanguage(): Promise<SupportedLanguage> {
  // Vérifier d'abord le cookie
  const cookieStore = await cookies()
  const languageCookie = cookieStore.get('i18next')
  if (languageCookie && (languageCookie.value === 'fr' || languageCookie.value === 'en')) {
    return languageCookie.value
  }

  // Ensuite vérifier les en-têtes HTTP
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')

  if (!acceptLanguage) return 'fr'

  // Analyser la chaîne accept-language pour trouver la langue préférée
  const preferredLanguages = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().split('-')[0].toLowerCase())

  // Retourner la première langue supportée trouvée
  const supportedLanguages: SupportedLanguage[] = ['fr', 'en']
  const isSupportedLanguage = (lang: string): lang is SupportedLanguage =>
    supportedLanguages.includes(lang as SupportedLanguage)

  const detectedLanguage = preferredLanguages.find(isSupportedLanguage)

  return detectedLanguage || 'fr'
}
