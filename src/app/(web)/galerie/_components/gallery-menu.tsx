'use client'

import Link from "next/link"
import { useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { useGalleryStore } from "./store"
import { Category, Subcategory } from "./types"
import i18n from "@/lib/i18n"
import React from "react"
import { ChevronRight } from 'lucide-react'

function GalleryMenuSkeleton() {
  return (
    <div className={cn(
      "flex flex-col gap-8",
      "fixed top-[5rem] left-0 right-0 z-30 container",
      "lg:sticky lg:top-32 lg:px-0 lg:py-0"
    )}>
      <Skeleton className="h-[44px] w-[200px]" />
      <nav>
        <ul className="flex flex-col gap-1 text-base">
          <li><Skeleton className="h-6 w-32" /></li>
          {[...Array(5)].map((_, i) => (
            <li key={i} className="space-y-1">
              <Skeleton className="h-6 w-40" />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function CategoryLink({ category, isCurrentCategory }: { category: Category; isCurrentCategory: boolean }) {
  const searchParams = useSearchParams()
  const currentSubcategorySlug = searchParams?.get('subcategory')
  const menuRef = React.useRef<HTMLUListElement>(null)
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(isCurrentCategory)
  const router = useRouter()

  React.useEffect(() => {
    if (isSubmenuOpen && category.subcategories && category.subcategories.length > 0) {
      const updateMenuHeight = () => {
        if (menuRef.current) {
          document.documentElement.style.setProperty('--menu-height', `${menuRef.current.scrollHeight}px`)
        }
      }
      updateMenuHeight()
      const observer = new ResizeObserver(updateMenuHeight)
      observer.observe(menuRef.current!)
      return () => {
        observer.disconnect()
        document.documentElement.style.setProperty('--menu-height', '0px')
      }
    }
  }, [isSubmenuOpen, category.subcategories])

  const handleCategoryClick = (e: React.MouseEvent) => {
    if (isCurrentCategory) {
      e.preventDefault()
      setIsSubmenuOpen(!isSubmenuOpen)
      if (isSubmenuOpen) {
        router.push(`/galerie?category=${category.slug}`, { scroll: false })
      }
    } else if (category.subcategories && category.subcategories.length > 0) {
      setIsSubmenuOpen(true)
    }
  }

  return (
    <li className="space-y-1">
      <Link
        href={`/galerie?category=${category.slug}`}
        className={cn(
          "hover:text-neutral-600 transition-colors flex items-center gap-1",
          isCurrentCategory && "font-medium"
        )}
        prefetch={true}
        onClick={handleCategoryClick}
      >
        {category.name}
        {category.subcategories && category.subcategories.length > 0 && (
          <motion.div
            animate={{ rotate: isSubmenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </Link>
      <AnimatePresence>
        {isSubmenuOpen && category.subcategories && category.subcategories.length > 0 && (
          <motion.ul
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-4 space-y-1 overflow-hidden"
          >
            {category.subcategories.map((subcategory: Subcategory) => (
              <motion.li
                key={subcategory.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/galerie?category=${category.slug}&subcategory=${subcategory.slug}`}
                  className={cn(
                    "hover:text-neutral-600 transition-colors",
                    currentSubcategorySlug === subcategory.slug && "font-medium"
                  )}
                  prefetch={true}
                >
                  {subcategory.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

function GalleryContent() {
  const searchParams = useSearchParams()
  const { categories, isLoading, fetchCategories } = useGalleryStore()

  const currentCategorySlug = searchParams?.get('category')
  const currentSubcategorySlug = searchParams?.get('subcategory')

  const sortedCategories = useMemo(() => {
    const regularCategories = categories.filter(cat => cat.slug !== '360' && cat.slug !== 'cyclorama')
    const category360 = categories.find(cat => cat.slug === '360')
    const categoryCyclorama = categories.find(cat => cat.slug === 'cyclorama')

    return [
      ...regularCategories,
      ...(category360 ? [category360] : []),
      ...(categoryCyclorama ? [categoryCyclorama] : [])
    ]
  }, [categories])

  const menuTitle = useMemo(() => {
    if (!currentCategorySlug) return 'Galerie'

    const category = categories.find(
      cat => cat.slug === currentCategorySlug
    )
    if (!category) return 'Galerie'

    if (currentSubcategorySlug) {
      const subcategory = category.subcategories?.find(
        sub => sub.slug === currentSubcategorySlug
      )
      if (subcategory) return subcategory.name
    }

    return category.name
  }, [categories, currentCategorySlug, currentSubcategorySlug])

  useEffect(() => {
    const handleLanguageChange = () => {
      fetchCategories(i18n.language)
    }

    handleLanguageChange()

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [fetchCategories])

  if (isLoading) return <GalleryMenuSkeleton />

  return (
    <div className={cn(
      "flex flex-col gap-8 z-10",
      "fixed top-[5rem] left-0 right-0 z-30 container py-6",
      "lg:sticky lg:top-32 lg:px-0 lg:py-0"
    )}>
      <h1>{menuTitle}</h1>
      <nav className="overflow-y-auto lg:max-h-[calc(100vh-12rem)]">
        <ul className="flex flex-col gap-1 text-base">
          {sortedCategories.map((category) => (
            <CategoryLink
              key={category.id}
              category={category}
              isCurrentCategory={currentCategorySlug === category.slug}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function GalleryMenu() {
  return (
    <Suspense fallback={<GalleryMenuSkeleton />}>
      <GalleryContent />
    </Suspense>
  )
}
