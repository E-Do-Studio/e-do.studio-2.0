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

  // Redirection automatique si on est sur la route /post-production
  useEffect(() => {
    if (pathname === '/post-production' && filteredItems.length > 0) {
      router.replace(`/post-production/${filteredItems[0].slug}`)
    }
  }, [pathname, filteredItems, router])

  // Utiliser les items filtrés pour générer les tabs
  const tabs = filteredItems.map(item => item.category)

  // Logique pour déterminer l'onglet actif
  const currentPath = pathname.split('/').pop()
  const activeTab = filteredItems.find(item => {
    const urlCategory = item.slug
    return urlCategory === currentPath
  })?.category || tabs[0]

  const handleTabChange = (category: string) => {
    const urlCategory = filteredItems.find(item => item.category === category)?.slug
    router.push(`/post-production/${urlCategory}`)
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={cn(
          "overflow-x-auto scrollbar-hide",
          "pb-2"
        )}
      >
        <div className="min-w-max md:min-w-0 md:px-0">
          <div className={cn(
            "relative",
            hasScroll && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full"
          )}>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 