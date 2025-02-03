'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'

interface GalleryImage {
  id: number
  alt: string
  url: string
  filename: string
  brand?: {
    name: string
  }
  category?: {
    name: string
  }
}

interface ImageCardProps {
  image: GalleryImage
}

export function ImageCard({ image }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  })

  // Construire l'URL complète
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const imageUrl = image.url.startsWith('http')
    ? image.url
    : `${baseUrl}${image.url}`

  console.log('Image data:', image)
  console.log('Image URL:', imageUrl)

  return (
    <div ref={ref} className="relative aspect-[3/4] group cursor-pointer overflow-hidden">
      {inView && (
        <>
          <Image
            src={imageUrl}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            loading="lazy"
            onLoadingComplete={() => setIsLoading(false)}
            className={cn(
              "object-cover duration-700 ease-in-out group-hover:scale-105",
              isLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0",
              "transition-all"
            )}
          />
          {/* Overlay avec effet de hover amélioré */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
              <p className="text-white text-lg tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                {image.brand?.name || 'Sans marque'}
              </p>

            </div>
          </div>
        </>
      )}
    </div>
  )
} 