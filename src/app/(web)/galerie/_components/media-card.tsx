'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from "@/components/ui/skeleton"
import { GalleryItemOverlay } from './gallery-item-overlay'
import { useInView } from 'react-intersection-observer'

interface MediaItem {
  id: number
  url: string
  alt?: string
  filename: string
  width?: number
  height?: number
  brand?: {
    name: string
  }
  category?: {
    name: string
  }
}

interface MediaCardProps {
  item: MediaItem
  priority?: boolean
}

// Optimized blur data URL for better performance
const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0VFRUVFRSIvPjwvc3ZnPg=='

export function MediaCard({ item, priority = false }: MediaCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px', // Preload images 50px before they enter viewport
  })

  useEffect(() => {
    if (inView) {
      setShouldLoad(true)
    }
  }, [inView])

  const isVideo = item.url?.includes('.mp4')
  const mediaUrl = item.url?.startsWith('http')
    ? item.url
    : `/api/assets/${item.filename}`

  if (!mediaUrl) return null

  // Calculate optimal image dimensions based on viewport
  const imageWidth = Math.min(item.width || 1200, 1920) // Cap max width
  const imageHeight = Math.min(item.height || 1600, 2560) // Cap max height
  const aspectRatio = imageWidth / imageHeight

  return (
    <Link href={`#${item.id}`} className="block w-full h-full">
      <div
        ref={ref}
        className="relative w-full h-full overflow-hidden group"
        style={{ aspectRatio: aspectRatio }}
      >
        {isLoading && (
          <Skeleton
            className="absolute inset-0 animate-pulse"
          />
        )}

        {(shouldLoad || priority) && (
          isVideo ? (
            <video
              src={mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsLoading(false)}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                "group-hover:scale-105",
                isLoading ? "opacity-0" : "opacity-100"
              )}
            />
          ) : (
            <Image
              src={mediaUrl}
              alt={item.alt || item.filename || ''}
              width={imageWidth}
              height={imageHeight}
              quality={priority ? 85 : 75}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                "group-hover:scale-105",
                isLoading ? "scale-110 blur-2xl grayscale opacity-0" : "scale-100 blur-0 grayscale-0 opacity-100"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              blurDataURL={blurDataURL}
              placeholder="blur"
              onLoad={() => setIsLoading(false)}
              style={{ transform: isLoading ? 'scale(1.1)' : 'scale(1)' }}
            />
          )
        )}

        {!isLoading && (
          <GalleryItemOverlay title={item.brand?.name || 'SANS MARQUE'} />
        )}
      </div>
    </Link>
  )
} 