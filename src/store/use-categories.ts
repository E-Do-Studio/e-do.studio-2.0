import { create } from 'zustand'

interface Category {
  id: string
  name: string
  slug: string
  parent?: string
  isGhost?: boolean
  order?: number
  children?: Category[]
}

interface CategoriesStore {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  activeCategory: string | null
  setActiveCategory: (slug: string | null) => void
}

export const useCategories = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  activeCategory: null,
  setActiveCategory: (slug) => set({ activeCategory: slug }),
}))

// Fonction utilitaire pour transformer les catégories plates en arborescence
export function buildCategoryTree(categories: Category[]): Category[] {
  const categoryMap = new Map<string, Category>()
  const roots: Category[] = []

  // Première passe : créer un Map de toutes les catégories
  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] })
  })

  // Deuxième passe : construire l'arborescence
  categories.forEach((category) => {
    const currentCategory = categoryMap.get(category.id)!
    if (category.parent) {
      const parentCategory = categoryMap.get(category.parent)
      if (parentCategory) {
        parentCategory.children?.push(currentCategory)
      }
    } else {
      roots.push(currentCategory)
    }
  })

  // Trier les catégories par ordre
  const sortCategories = (cats: Category[]) => {
    return cats.sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  // Trier récursivement
  const sortRecursive = (categories: Category[]) => {
    categories = sortCategories(categories)
    categories.forEach((category) => {
      if (category.children?.length) {
        category.children = sortRecursive(category.children)
      }
    })
    return categories
  }

  return sortRecursive(roots)
}
