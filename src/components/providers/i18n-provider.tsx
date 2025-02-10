'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'

interface I18nProviderProps extends PropsWithChildren {
  defaultLanguage: string
}

export function I18nProvider({ children, defaultLanguage }: I18nProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Vérifier d'abord le localStorage
    const savedLanguage = localStorage.getItem('i18nextLng')

    // Si pas de langue sauvegardée, utiliser la langue du navigateur
    if (!savedLanguage) {
      i18n.changeLanguage(defaultLanguage)
    }
  }, [defaultLanguage])

  if (!isClient) {
    return null
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
} 