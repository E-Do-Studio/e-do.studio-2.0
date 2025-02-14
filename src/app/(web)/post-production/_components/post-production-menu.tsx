'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Tabs } from '@/app/(web)/_components/tabs'

interface PostProductionMenuItem {
  id: string
  slug: string
  category: string
}

export interface PostProductionMenuProps {
  items: PostProductionMenuItem[]
}

export function PostProductionMenu({ items }: PostProductionMenuProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Filtrer les items pour exclure la catégorie avec le slug "360"
  const filteredItems = items.filter(item => item.slug !== '360')

  // Utiliser les items filtrés pour générer les tabs
  const tabs = filteredItems.map(item => item.category)

  // Logique pour déterminer l'onglet actif
  const currentPath = pathname.split('/').pop()
  const activeTab = currentPath === 'post-production'
    ? 'Tous'
    : filteredItems.find(item => {
      const urlCategory = item.slug
      return urlCategory === currentPath
    })?.category || 'Tous'

  const handleTabChange = (category: string) => {
    if (category.toLowerCase() === 'tous') {
      router.push('/post-production')
      return
    }

    const urlCategory = filteredItems.find(item => item.category === category)?.slug
    router.push(`/post-production/${urlCategory}`)
  }

  return (
    <div
      className="relative mb-4 md:mb-12"
    >
      <Tabs
        tabs={['Tous', ...tabs]}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
    </div>
  )
} 