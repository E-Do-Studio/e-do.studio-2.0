import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from './types'

// Définir l'ordre des catégories
const CATEGORY_ORDER = ['porte', 'access', 'ghost', 'pique', 'flat']

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

            // Trier les catégories selon l'ordre défini
            const sortedCategories = [...formattedCategories].sort((a, b) => {
              const indexA = CATEGORY_ORDER.indexOf(a.slug)
              const indexB = CATEGORY_ORDER.indexOf(b.slug)
              return indexA - indexB
            })

            set({
              categories: sortedCategories,
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
