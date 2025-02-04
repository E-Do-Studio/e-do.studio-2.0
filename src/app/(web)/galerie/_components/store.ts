import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from './types'

interface GalleryStore {
  categories: Category[]
  isLoading: boolean
  lastFetch: number | null
  setCategories: (categories: Category[]) => void
  setIsLoading: (isLoading: boolean) => void
  fetchCategories: () => Promise<void>
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useGalleryStore = create<GalleryStore>()(
  persist(
    (set, get) => ({
      categories: [],
      isLoading: true,
      lastFetch: null,
      setCategories: (categories) => set({ categories }),
      setIsLoading: (isLoading) => set({ isLoading }),
      fetchCategories: async () => {
        const now = Date.now()
        const lastFetch = get().lastFetch

        // Utiliser le cache si les données ont été chargées il y a moins de 5 minutes
        if (lastFetch && now - lastFetch < CACHE_DURATION) {
          set({ isLoading: false })
          return
        }

        try {
          const response = await fetch('/api/categories?depth=2', {
            next: { revalidate: 300 }, // Revalidate every 5 minutes
          })
          const data = await response.json()
          if (data?.docs) {
            const formattedCategories = data.docs.map((category: any) => ({
              id: category.id,
              name: category.name,
              images: category.images || [],
              subcategories: category.subcategories || [],
            }))
            set({
              categories: formattedCategories,
              isLoading: false,
              lastFetch: now,
            })
          }
        } catch (error) {
          console.error('Error fetching categories:', error)
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'gallery-store',
      partialize: (state) => ({
        categories: state.categories,
        lastFetch: state.lastFetch,
      }),
    },
  ),
)
