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
        const allMedia = [
          ...(categoryData.assets || []),
          ...(categoryData.videos || [])
        ]
        console.log('All Media:', allMedia)
        return allMedia
      }

      // Filtrer les assets et les vidéos par subcategory
      const filteredAssets = categoryData.assets?.filter((asset: GalleryImage) => {
        console.log('Asset subcategory:', asset.subcategory?.slug, 'Looking for:', subcategory)
        return asset.subcategory?.slug === subcategory
      }) || []

      const filteredVideos = categoryData.videos?.filter((video: GalleryVideo) => {
        console.log('Video subcategory:', video.subCategory?.slug, 'Looking for:', subcategory)
        return video.subCategory?.slug === subcategory
      }) || []

      // Log des résultats filtrés
      console.log('Filtered Results:', {
        assets: filteredAssets,
        videos: filteredVideos
      })

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
      <div
        className="columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:balance] mx-auto"
        style={{
          maxWidth: '2400px',
          columnGap: '1rem',
          columnFill: 'balance'
        }}
      >
        {sortedMedia.map((item) => (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid w-full inline-block"
            style={{
              pageBreakInside: 'avoid',
              breakInside: 'avoid'
            }}
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
    </div>
  )
} 