'use client'

import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface PostProductionMenuItem {
  id: string
  category: string
}

export interface PostProductionMenuProps {
  items: PostProductionMenuItem[]
}

export function PostProductionMenu({ items }: PostProductionMenuProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryClick = (category: string) => {
    const categoryMapping: { [key: string]: string } = {
      'Pique': 'pique',
      'On Model': 'on-model',
    }
    const urlCategory = categoryMapping[category] || category.toLowerCase().replace(' ', '-')
    router.push(`/post-production/${urlCategory}`)
  }

  return (
    <div className="relative mb-12">
      {/* Bouton retour sur mobile */}
      <button
        onClick={() => router.push('/post-production')}
        className="md:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 px-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Retour</span>
      </button>

      {/* Menu de navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-4 px-4 md:px-0">
        {/* Bouton "Tous" uniquement sur desktop */}
        <button
          onClick={() => router.push('/post-production')}
          className="hidden md:block px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100"
        >
          Tous
        </button>

        {/* Liste des catégories */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCategoryClick(item.category)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors w-full md:w-auto text-left",
                pathname === `/post-production/${item.category.toLowerCase().replace(' ', '-')}`
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 