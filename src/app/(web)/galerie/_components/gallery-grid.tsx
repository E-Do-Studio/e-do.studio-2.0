'use client'

import { useMemo } from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { ImageCard } from './image-card'

interface GalleryImage {
  id: number
  alt: string
  url: string
  brand?: {
    name: string
  }
  category?: {
    name: string
  }
  filename: string
}

interface GalleryGridProps {
  initialCategory?: string
}

// Définition du fetcher pour SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function GalleryGrid({ initialCategory }: GalleryGridProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || initialCategory

  // Utiliser SWR pour la mise en cache des données
  const { data, error, isLoading } = useSWR<{ docs: any[] }>(
    '/api/categories',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  // Ajout de logs pour déboguer
  console.log('Raw data:', data)

  const images = useMemo(() => {
    if (!data?.docs) return []

    if (category) {
      const categoryData = data.docs.find((cat) =>
        cat.name.toLowerCase() === category?.toLowerCase()
      )
      console.log('Category data:', categoryData)
      return categoryData?.images || []
    }

    const allImages = data.docs.flatMap((cat) => cat.images || [])
    console.log('All images:', allImages)
    return allImages
  }, [data, category])

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur de chargement</div>
  if (!images.length) return <div>Aucune image trouvée</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image: GalleryImage) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  )
} 