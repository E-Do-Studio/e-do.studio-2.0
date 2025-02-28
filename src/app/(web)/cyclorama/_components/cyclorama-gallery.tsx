'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from '@/components/layout/section'
const images = [
  {
    id: 1,
    src: '/cyclo/cyclo.webp',
    alt: 'Cyclorama E-Do',
    title: 'gallery.cyclorama'
  },
  {
    id: 2,
    src: '/cyclo/cabines.webp',
    alt: 'Cabines de change & poste de maquillage E-Do',
    title: 'gallery.changing'
  },
  {
    id: 3,
    src: '/cyclo/studio.webp',
    alt: 'Studio E-Do',
    title: 'gallery.studio'
  },
  {
    id: 4,
    src: '/cyclo/table.webp',
    alt: 'Table & cuisine E-Do',
    title: 'gallery.kitchen'
  },
  {
    id: 5,
    src: '/cyclo/cuisine.webp',
    alt: 'Cuisine toute équipée E-Do',
    title: 'gallery.kitchen'
  }
]

export function CycloramaGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { t } = useTranslation('cyclorama')

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 1 ? images.length : prev! - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length ? 1 : prev! + 1))
  }

  return (
    <Section className="!mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Large Main Image */}
        <div className="relative aspect-[4/3] md:aspect-square">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            onClick={() => setSelectedImage(1)}
          />
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              className="object-cover"
              onClick={() => setSelectedImage(2)}
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              className="object-cover"
              onClick={() => setSelectedImage(3)}
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src={images[3].src}
              alt={images[3].alt}
              fill
              className="object-cover"
              onClick={() => setSelectedImage(4)}
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src={images[4].src}
              alt={images[4].alt}
              fill
              className="object-cover"
              onClick={() => setSelectedImage(5)}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:opacity-70 bg-black/50 p-2 rounded-full z-[60]"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:opacity-70 bg-black/50 p-2 rounded-full z-[60]"
          >
            <ChevronRight size={32} />
          </button>

          <div
            className="relative w-full max-w-3xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] max-h-[80vh]">
              <Image
                src={images[selectedImage - 1].src}
                alt={images[selectedImage - 1].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
            <p className="text-center text-white mt-4 text-lg">
              {t(images[selectedImage - 1].title)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute top-4 right-4 text-white hover:opacity-70"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </Section>
  )
} 