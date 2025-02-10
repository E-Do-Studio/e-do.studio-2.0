import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from './types'

interface GalleryStore {
  categories: Category[]
  isLoading: boolean
  setCategories: (categories: Category[]) => void
  setIsLoading: (isLoading: boolean) => void
  fetchCategories: (locale: string) => Promise<void>
}

export const useGalleryStore = create<GalleryStore>()(
  persist(
    (set) => ({
      categories: [],
      isLoading: true,
      setCategories: (categories) => set({ categories }),
      setIsLoading: (isLoading) => set({ isLoading }),
      fetchCategories: async (locale: string) => {
        set({ isLoading: true })

        try {
          const response = await fetch(`/api/categories?locale=${locale}&depth=2`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            // Désactiver le cache du navigateur
            cache: 'no-store'
          })

          if (!response.ok) throw new Error('Failed to fetch categories')

          const data = await response.json()
          if (data?.docs) {
            const formattedCategories = data.docs.map((category: any) => ({
              id: category.id,
              name: category.name,
              slug: category.slug,
              images: category.images || [],
              subcategories: category.subcategories || [],
            }))
            set({
              categories: formattedCategories,
              isLoading: false,
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
      }),
    },
  ),
)
