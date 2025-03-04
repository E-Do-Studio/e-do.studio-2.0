'use client'

import { useMemo, useState, useEffect } from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { MediaCard } from './media-card'
import { Skeleton } from "@/components/ui/skeleton"
import { useInView } from 'react-intersection-observer'

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
  subCategory?: {
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

const ITEMS_PER_PAGE = 12
const PRIORITY_ITEMS = 4 // Number of items to load with priority

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
  const [page, setPage] = useState(1)
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px 0px', // Start loading next page earlier
  })

  // Optimized fetcher with cache-control
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
    if (!response.ok) throw new Error('Failed to fetch data')
    return response.json()
  }

  // Fetch images and videos if no category selected with pagination
  const { data: allMediaData, error: allMediaError, isLoading: allMediaLoading } = useSWR<{ docs: any[] }>(
    !category ? `/api/media?depth=2&page=${page}&limit=${ITEMS_PER_PAGE}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
      revalidateIfStale: false,
      dedupingInterval: 3600000, // 1 hour
    }
  )

  // Fetch les catégories seulement si une catégorie est sélectionnée
  const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading } = useSWR<{ docs: any[] }>(
    category ? `/api/categories?depth=2&page=${page}&limit=${ITEMS_PER_PAGE}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
      revalidateIfStale: false,
      dedupingInterval: 3600000, // 1 hour
    }
  )

  const isLoading = allMediaLoading || categoriesLoading
  const error = allMediaError || categoriesError

  // Load more items when reaching the bottom with debounce
  useEffect(() => {
    if (inView && !isLoading) {
      const timer = setTimeout(() => {
        setPage(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [inView, isLoading])

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
        const allMedia = [
          ...(categoryData.assets || []),
          ...(categoryData.videos || [])
        ]
        return allMedia
      }

      // Filtrer les assets et les vidéos par subcategory
      const filteredAssets = categoryData.assets?.filter((asset: GalleryImage) => {
        return asset.subcategory?.slug === subcategory
      }) || []

      const filteredVideos = categoryData.videos?.filter((video: GalleryVideo) => {
        return video.subCategory?.slug === subcategory
      }) || []

      // Combiner les assets et les vidéos filtrés
      return [...filteredAssets, ...filteredVideos]
    }

    // Return all media if no category selected
    return allMediaData?.docs || []
  }, [category, subcategory, categoriesData, allMediaData])

  const sortedMedia = useMemo(() => {
    // Fonction pour estimer la hauteur d'un élément
    const getEstimatedHeight = (item: GalleryImage | GalleryVideo) => {
      // Pour les vidéos, on utilise un ratio 16:9
      if ('thumbnailURL' in item) {
        return 9 / 16 * 100; // Hauteur estimée pour les vidéos
      }

      // Pour les images, on peut utiliser un ratio moyen ou une hauteur fixe
      return 100; // Hauteur estimée pour les images
    }

    // Trier les médias de manière alternée (grand-petit-grand-petit)
    const sortedByHeight = [...media].sort(() => Math.random() - 0.5)
      .map(item => ({
        ...item,
        estimatedHeight: getEstimatedHeight(item)
      }));

    // Distribuer les éléments de manière équilibrée
    const columns = [[], [], []];
    const columnHeights = [0, 0, 0];

    sortedByHeight.forEach((item) => {
      // Trouver la colonne la plus courte
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columns[shortestColumnIndex].push(item as never);
      columnHeights[shortestColumnIndex] += item.estimatedHeight;
    });

    // Aplatir les colonnes en alternant les éléments
    return columns.reduce((acc, column, index) => {
      column.forEach((item, itemIndex) => {
        acc[itemIndex * 3 + index] = item;
      });
      return acc;
    }, new Array(sortedByHeight.length)).filter(Boolean);
  }, [media]);

  if (error) return <div>Erreur de chargement</div>
  if (!media.length) return <div>Aucun média trouvé</div>

  return (
    <div className="pt-[12rem] lg:pt-0">
      {isLoading && page === 1 && <GalleryGridSkeleton />}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{
          maxWidth: '2400px',
        }}
      >
        {sortedMedia.map((item, index) => (
          <div
            key={item.id}
            className="w-full aspect-[3/4]"
          >
            {'type' in item && item.type === '360' ? (
              <iframe
                src={item.url}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <MediaCard
                item={item}
                priority={index < PRIORITY_ITEMS && page === 1}
              />
            )}
          </div>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={ref} className="h-10" />

      {isLoading && page > 1 && (
        <div className="mt-8">
          <GalleryGridSkeleton />
        </div>
      )}
    </div>
  )
} 