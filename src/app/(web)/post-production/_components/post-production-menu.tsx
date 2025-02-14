'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Tabs } from '@/app/(web)/_components/tabs'

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

  const tabs = items.map(item => item.category)

  // Logique pour déterminer l'onglet actif
  const currentPath = pathname.split('/').pop()
  const activeTab = currentPath === 'post-production'
    ? 'Tous'
    : items.find(item => {
      const urlCategory = item.category.toLowerCase().replace(' ', '-')
      return urlCategory === currentPath
    })?.category || 'Tous'

  const handleTabChange = (category: string) => {
    if (category.toLowerCase() === 'tous') {
      router.push('/post-production')
      return
    }

    const categoryMapping: { [key: string]: string } = {
      'Pique': 'pique',
      'On Model': 'on-model',
    }
    const urlCategory = categoryMapping[category] || category.toLowerCase().replace(' ', '-')
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