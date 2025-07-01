'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from "@/components/ui/skeleton"

interface Asset {
  id: number
  alt: string
  url: string
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

interface ImageCardProps {
  asset: Asset
}

export function ImageCard({ asset }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  })

  // Construire l'URL complète
  const imageUrl = asset.url.startsWith('http')
    ? asset.url // URL Cloudinary directe
    : `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/images/${asset.filename}`

  // Log uniquement en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('Image URL:', imageUrl)
  }

  return (
    <Link href={`#${asset.id}`} className="block w-full">
      <div className="relative w-full overflow-hidden group">
        {isLoading && (
          <Skeleton className="absolute inset-0" />
        )}
        <Image
          src={imageUrl}
          alt={asset.alt || asset.filename}
          width={asset.width || 800}
          height={asset.height || 1200}
          className={cn(
            "w-full h-auto object-cover transition-all duration-300",
            "group-hover:scale-105",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoadingComplete={() => setIsLoading(false)}
        />
        {!isLoading && asset.brand?.name && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
              <p className="text-white text-lg tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                {asset.brand.name.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
} 