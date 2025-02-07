'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from "@/components/ui/skeleton"

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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  })

  const isVideo = item.url.includes('.mp4')
  const mediaUrl = item.url.startsWith('http')
    ? item.url
    : `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${isVideo ? 'videos' : 'images'}/${item.filename}`

  if (process.env.NODE_ENV === 'development') {
    console.log('Media URL:', mediaUrl)
  }

  // Précharger la vidéo pour obtenir sa hauteur
  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement
    setVideoHeight(video.videoHeight * (video.clientWidth / video.videoWidth))
  }

  return (
    <Link href={`#${item.id}`} className="block w-full mb-4">
      <div className="relative w-full overflow-hidden group">
        {isLoading && (
          <Skeleton
            className="absolute inset-0"
            style={isVideo && videoHeight ? { height: `${videoHeight}px` } : undefined}
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
            className={cn(
              "w-full h-auto object-cover transition-all duration-300",
              "group-hover:scale-105",
              isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsLoading(false)}
          />
        )}

        {!isLoading && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
              <p className="text-white text-lg tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                {item.brand?.name?.toUpperCase() || 'Sans marque'}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
} 