'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { cn } from "@/lib/utils"

interface Category {
  id: number
  name: string
  images: any[]
}

export function GalleryMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        if (data && data.docs) {
          setCategories(data.docs)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) return <div>Chargement...</div>

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-medium">Galerie</h1>
      <nav>
        <ul className="flex flex-col gap-1 text-base">
          <li>
            <Link
              href="/galerie"
              className={cn(
                "hover:text-neutral-600 transition-colors",
                !currentCategory

              )}
            >
              Toutes les images
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/galerie?category=${category.name.toLowerCase()}`}
                className={cn(
                  "hover:text-neutral-600 transition-colors",
                  currentCategory === category.name.toLowerCase()
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
