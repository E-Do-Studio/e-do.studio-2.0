'use client'

import { useMemo } from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { MediaCard } from './media-card'
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
    slug: string
  }
  filename: string
}

interface GalleryVideo {
  id: number
  url: string
  brand?: {
    name: string
  }
  subcategory?: {
    name: string
    slug: string
  }
  filename: string
  thumbnailURL?: string | null
  aspectRatio?: number
}

interface GalleryLink {
  id: string
  url: string
}

interface Category {
  slug: string
  links?: GalleryLink[]
  assets: GalleryImage[]
  videos: GalleryVideo[]
}

interface GalleryGridProps {
  initialCategory?: string
}

interface GroupedMedia {
  [brandName: string]: (GalleryImage | GalleryVideo)[]
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

  // Fetch images and videos if no category selected
  const { data: allMediaData, error: allMediaError, isLoading: allMediaLoading } = useSWR<{ docs: any[] }>(
    !category ? '/api/media?depth=2' : null,
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

  const isLoading = allMediaLoading || categoriesLoading
  const error = allMediaError || categoriesError

  const media = useMemo(() => {
    if (category && categoriesData?.docs) {
      const categoryData = categoriesData.docs.find((cat) =>
        cat.slug === category
      )

      if (!categoryData) return []

      // Gestion spéciale pour la catégorie 360
      if (category === '360' && categoryData.links?.length) {
        return categoryData.links.map((link: GalleryLink) => ({
          id: link.id,
          type: '360',
          url: link.url
        }))
      }

      // Si pas de subcategory ou subcategory est 'undefined', retourner tous les médias de la catégorie
      if (!subcategory || subcategory === 'undefined') {
        return [...(categoryData.assets || []), ...(categoryData.videos || [])]
      }

      // Sinon, filtrer par subcategory
      return [
        ...categoryData.assets.filter((asset: GalleryImage) =>
          asset.subcategory?.slug === subcategory
        ),
        ...categoryData.videos.filter((video: GalleryVideo) =>
          video.subcategory?.slug === subcategory
        )
      ]
    }

    // Return all media if no category selected
    return allMediaData?.docs || []
  }, [category, subcategory, categoriesData, allMediaData])

  const sortedMedia = useMemo(() => {
    // Mélanger le tableau de médias de manière aléatoire
    const shuffledMedia = [...media].sort(() => Math.random() - 0.5)

    return shuffledMedia.map(item => {
      if ('thumbnailURL' in item) {
        return {
          ...item,
          aspectRatio: 16 / 9
        }
      }
      return item
    })
  }, [media])

  const columns = useMemo(() => {
    const numberOfColumns = {
      mobile: 1,
      md: 2,
      lg: 3
    }

    // Créer un tableau de colonnes vides
    const cols = Array.from({ length: numberOfColumns.lg }, () => [] as (GalleryImage | GalleryVideo)[])

    // Distribuer les médias dans les colonnes de manière équilibrée
    sortedMedia.forEach((item, index) => {
      const columnIndex = index % numberOfColumns.lg
      cols[columnIndex].push(item)
    })

    return cols
  }, [sortedMedia])

  if (isLoading) {
    return (
      <div className="pt-[12rem] lg:pt-0">
        <GalleryGridSkeleton />
      </div>
    )
  }

  if (error) return <div>Erreur de chargement</div>
  if (!media.length) return <div>Aucun média trouvé</div>

  return (
    <div className="pt-[12rem] lg:pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((item) => (
              <div
                key={item.id}
                className="w-full"
              >
                {'type' in item && item.type === '360' ? (
                  <iframe
                    src={item.url}
                    className="w-full aspect-square rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <MediaCard item={item} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
} 