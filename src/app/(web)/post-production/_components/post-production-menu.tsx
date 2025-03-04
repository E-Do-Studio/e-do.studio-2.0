'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Tabs } from '@/app/(web)/_components/tabs'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash'

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

  // Memoize filtered items to prevent unnecessary recalculations
  const filteredItems = useMemo(() =>
    items.filter(item => item.slug !== '360'),
    [items]
  )

  // Memoize tabs to prevent unnecessary recalculations
  const tabs = useMemo(() =>
    filteredItems.map(item => item.category),
    [filteredItems]
  )

  // Prefetch all post-production pages in parallel
  useEffect(() => {
    const prefetchPages = async () => {
      const prefetchPromises = filteredItems.map(item =>
        router.prefetch(`/post-production/${item.slug}`)
      )
      await Promise.all(prefetchPromises)
    }
    prefetchPages()
  }, [filteredItems, router])

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const hasHorizontalScroll = scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        setHasScroll(hasHorizontalScroll)
      }
    }

    checkScroll()
    const debouncedCheckScroll = debounce(checkScroll, 100)
    window.addEventListener('resize', debouncedCheckScroll)
    return () => {
      window.removeEventListener('resize', debouncedCheckScroll)
      debouncedCheckScroll.cancel()
    }
  }, [])

  // Redirection automatique si on est sur la route /post-production
  useEffect(() => {
    if (pathname === '/post-production' && filteredItems.length > 0) {
      const firstItemSlug = filteredItems[0].slug
      router.replace(`/post-production/${firstItemSlug}`, {
        scroll: false
      })
    }
  }, [pathname, filteredItems, router])

  // Logique pour déterminer l'onglet actif
  const currentPath = pathname.split('/').pop()
  const activeTab = useMemo(() =>
    filteredItems.find(item => item.slug === currentPath)?.category || tabs[0],
    [currentPath, filteredItems, tabs]
  )

  const handleTabChange = useCallback(async (category: string) => {
    const urlCategory = filteredItems.find(item => item.category === category)?.slug
    if (urlCategory) {
      router.push(`/post-production/${urlCategory}`, {
        scroll: false
      })
    }
  }, [filteredItems, router])

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

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
  }

  return debounced as T & { cancel: () => void }
} 