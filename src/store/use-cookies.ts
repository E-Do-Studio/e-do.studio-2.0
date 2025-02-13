import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CookieStore {
  cookieConsent: boolean | null
  setCookieConsent: (value: boolean) => void
}

export const useCookieStore = create<CookieStore>()(
  persist(
    (set) => ({
      cookieConsent: null,
      setCookieConsent: (value) => set({ cookieConsent: value }),
    }),
    {
      name: 'cookie-storage',
    }
  )
) 