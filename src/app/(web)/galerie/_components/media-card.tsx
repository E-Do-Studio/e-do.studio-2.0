'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from "@/components/ui/skeleton"
import { GalleryItemOverlay } from './gallery-item-overlay'

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
}

export function MediaCard({ item }: MediaCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [videoHeight, setVideoHeight] = useState<number>(0)

  const isVideo = item.url.includes('.mp4')
  const mediaUrl = item.url.startsWith('http')
    ? item.url
    : `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${isVideo ? 'videos' : 'images'}/${item.filename}`


  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement
    setVideoHeight(video.videoHeight * (video.clientWidth / video.videoWidth))
  }

  return (
    <Link href={`#${item.id}`} className="block w-full mb-4">
      <div className="relative w-full overflow-hidden group">
        {isLoading && (
          <Skeleton
            className={cn("absolute inset-0", isVideo && videoHeight ? { height: `${videoHeight}px` } : undefined)}
          />
        )}

        {isVideo ? (
          <video
            src={mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={handleVideoMetadata}
            onLoadedData={() => setIsLoading(false)}
            onLoad={() => setIsLoading(false)}
            className={cn(
              "w-full h-auto object-cover transition-all duration-300",
              "group-hover:scale-105",
            )}
          />
        ) : (
          <Image
            src={mediaUrl}
            alt={item.alt || item.filename}
            width={item.width || 800}
            height={item.height || 1200}
            quality={80}
            className={cn(
              "w-full h-auto object-cover transition-all duration-300",
              "group-hover:scale-105",
              isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setIsLoading(false)}
          />
        )}

        {!isLoading && (
          <GalleryItemOverlay title={item.brand?.name || 'SANS MARQUE'} />
        )}
      </div>
    </Link>
  )
} 