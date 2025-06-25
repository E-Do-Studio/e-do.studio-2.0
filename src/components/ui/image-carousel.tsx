'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ImageCarousel({
  images,
  alt,
  className,
  autoPlay = true,
  autoPlayInterval = 5000
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  // Logs pour déboguer
  useEffect(() => {
    console.log('ImageCarousel - images:', images)
    console.log('ImageCarousel - currentIndex:', currentIndex)
    console.log('ImageCarousel - currentImage:', images[currentIndex])
  }, [images, currentIndex])

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handleImageError = (index: number) => {
    console.error(`Erreur de chargement de l'image à l'index ${index}:`, images[index])
    setImageError(prev => ({ ...prev, [index]: true }))
  }

  if (!images || images.length === 0) {
    console.log('ImageCarousel - Aucune image à afficher')
    return null
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-auto w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-opacity duration-500"
            priority
            onError={() => handleImageError(currentIndex)}
          />
        </div>
      </div>
    </div>
  )
}
