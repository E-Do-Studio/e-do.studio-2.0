import { cookies, headers } from "next/headers"

export async function getLanguage(): Promise<string> {
  // Vérifier d'abord le cookie
  const cookieStore = await cookies()
  const languageCookie = cookieStore.get('i18next')
  if (languageCookie) return languageCookie.value

  // Ensuite vérifier les en-têtes HTTP
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')

  if (!acceptLanguage) return 'fr'

  // Analyser la chaîne accept-language pour trouver la langue préférée
  const preferredLanguages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().split('-')[0].toLowerCase())

  // Retourner la première langue supportée trouvée
  const supportedLanguages = ['fr', 'en']
  const detectedLanguage = preferredLanguages.find(lang =>
    supportedLanguages.includes(lang)
  )

  return detectedLanguage || 'fr'
} 
