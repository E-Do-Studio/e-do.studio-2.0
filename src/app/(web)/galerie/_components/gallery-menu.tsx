'use client'

import Link from "next/link"
import { useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { useGalleryStore } from "./store"
import { Category } from "./types"

function GalleryMenuSkeleton() {
  return (
    <div className={cn(
      "flex flex-col gap-8",
      "fixed top-[5rem] left-0 right-0 z-50 px-4 py-6",
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
  const currentSubcategory = searchParams?.get('subcategory')?.toLowerCase()

  return (
    <li className="space-y-1">
      <Link
        href={`/galerie?category=${category.name.toLowerCase()}`}
        className={cn(
          "hover:text-neutral-600 transition-colors",
          isCurrentCategory && "font-medium"
        )}
        prefetch={true}
      >
        {category.name}
      </Link>
      <AnimatePresence>
        {isCurrentCategory && category.subcategories && category.subcategories.length > 0 && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-4 space-y-1 overflow-hidden"
          >
            {category.subcategories.map((subcategory) => (
              <motion.li
                key={subcategory.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/galerie?category=${category.name.toLowerCase()}&subcategory=${subcategory.name.toLowerCase()}`}
                  className={cn(
                    "hover:text-neutral-600 transition-colors",
                    currentSubcategory === subcategory.name.toLowerCase() && "font-medium"
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
  const currentCategory = searchParams?.get('category')?.toLowerCase()
  const currentSubcategory = searchParams?.get('subcategory')?.toLowerCase()

  const menuTitle = useMemo(() => {
    if (!currentCategory) return 'Galerie'

    const category = categories.find(
      cat => cat.name.toLowerCase() === currentCategory
    )
    if (!category) return 'Galerie'

    if (currentSubcategory) {
      const subcategory = category.subcategories?.find(
        sub => sub.name.toLowerCase() === currentSubcategory
      )
      if (subcategory) return `${category.name} - ${subcategory.name}`
    }

    return category.name
  }, [categories, currentCategory, currentSubcategory])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  if (isLoading) return <GalleryMenuSkeleton />

  return (
    <div className={cn(
      "flex flex-col gap-8",
      "fixed top-[5rem] left-0 right-0 z-50 px-4 py-6",
      "lg:sticky lg:top-32 lg:px-0 lg:py-0"
    )}>
      <h1 className="text-4xl font-medium">{menuTitle}</h1>
      <nav className="overflow-y-auto lg:max-h-[calc(100vh-12rem)]">
        <ul className="flex flex-col gap-1 text-base">
          <li>
            <Link
              href="/galerie"
              className={cn(
                "hover:text-neutral-600 transition-colors",
                !currentCategory && "font-medium"
              )}
              prefetch={true}
            >
              Toutes les images
            </Link>
          </li>
          {categories.map((category) => (
            <CategoryLink
              key={category.id}
              category={category}
              isCurrentCategory={currentCategory === category.name.toLowerCase()}
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
