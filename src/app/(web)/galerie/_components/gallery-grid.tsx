'use client'

import { useMemo } from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { ImageCard } from './image-card'
import { Skeleton } from "@/components/ui/skeleton"

interface GalleryImage {
  id: number
  alt: string
  url: string
  brand?: {
    name: string
  }
  subcategory?: {
    name: string
  }
  filename: string
}

interface GalleryGridProps {
  initialCategory?: string
}

// Définition du fetcher pour SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

function GalleryGridSkeleton() {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="break-inside-avoid">
          <Skeleton className="w-full h-[400px] mb-4" />
        </div>
      ))}
    </div>
  )
}

export function GalleryGrid({ initialCategory }: GalleryGridProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || initialCategory
  const subcategory = searchParams.get('subcategory')

  // Fetch toutes les images si pas de catégorie sélectionnée
  const { data: allImagesData, error: allImagesError, isLoading: allImagesLoading } = useSWR<{ docs: any[] }>(
    !category ? '/api/images?depth=2' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  // Fetch les catégories seulement si une catégorie est sélectionnée
  const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading } = useSWR<{ docs: any[] }>(
    category ? '/api/categories?depth=2' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const isLoading = allImagesLoading || categoriesLoading
  const error = allImagesError || categoriesError

  const images = useMemo(() => {
    if (category && categoriesData?.docs) {
      const categoryData = categoriesData.docs.find((cat) =>
        cat.name.toLowerCase() === category.toLowerCase()
      )

      if (subcategory && categoryData) {
        const subcategoryData = categoryData.subcategories?.find(
          (sub: any) => sub.name.toLowerCase() === subcategory.toLowerCase()
        )

        return categoryData.images.filter((image: GalleryImage) =>
          image.subcategory?.name.toLowerCase() === subcategory.toLowerCase()
        ) || []
      }

      return categoryData?.images || []
    }

    // Retourner toutes les images si pas de catégorie sélectionnée
    return allImagesData?.docs || []
  }, [category, subcategory, categoriesData, allImagesData])

  if (isLoading) {
    return (
      <div className="pt-[12rem] lg:pt-0">
        <GalleryGridSkeleton />
      </div>
    )
  }

  if (error) return <div>Erreur de chargement</div>
  if (!images.length) return <div>Aucune image trouvée</div>

  return (
    <div className="pt-[12rem] lg:pt-0">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image: GalleryImage) => (
          <div key={image.id} className="break-inside-avoid">
            <ImageCard image={image} />
          </div>
        ))}
      </div>
    </div>
  )
} 