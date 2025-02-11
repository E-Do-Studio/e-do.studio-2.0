import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  cookieConsent: boolean
  setCookieConsent: (value: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cookieConsent: false,
      setCookieConsent: (value) => set({ cookieConsent: value }),
    }),
    {
      name: 'edo-studio-storage',
    }
  )
) 