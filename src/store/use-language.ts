import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
import i18n from '@/lib/i18n'

interface LanguageState {
  currentLanguage: string
  isLoading: boolean
  setLanguage: (language: string) => Promise<void>
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'fr',
      isLoading: true,
      setLanguage: async (language: string) => {
        set({ isLoading: true })
        try {
          await i18n.changeLanguage(language)
          document.documentElement.lang = language
          localStorage.setItem('i18nextLng', language)
          set({ currentLanguage: language, isLoading: false })
        } catch (error) {
          console.error('Error changing language:', error)
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
    }
  )
)

// Hook utilitaire pour initialiser la langue
export const useLanguageInit = () => {
  const { setLanguage } = useLanguageStore()

  const initLanguage = async () => {
    const savedLanguage = localStorage.getItem('i18nextLng')
    const browserLanguage = navigator.language.split('-')[0]
    const defaultLanguage = savedLanguage ||
      (['fr', 'en'].includes(browserLanguage) ? browserLanguage : 'fr')

    await setLanguage(defaultLanguage)
  }

  return { initLanguage }
} 