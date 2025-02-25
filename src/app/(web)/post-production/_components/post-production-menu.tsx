'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Tabs } from '@/app/(web)/_components/tabs'
import { cn } from '@/lib/utils'

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScroll, setHasScroll] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const hasHorizontalScroll = scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        setHasScroll(hasHorizontalScroll)
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [items])

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
    <div className="relative mb-4 md:mb-12">
      <div
        ref={scrollRef}
        className={cn(
          "overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent",
          "px-4 md:px-0 -mx-4 md:mx-0 pb-2"
        )}
      >
        <div className="min-w-max md:min-w-0 px-4 md:px-0">
          <div className={cn(
            "relative",
            hasScroll && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-neutral-200 after:rounded-full"
          )}>
            <Tabs
              tabs={['Tous', ...tabs]}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 