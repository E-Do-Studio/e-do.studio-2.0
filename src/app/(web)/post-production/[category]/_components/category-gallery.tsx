'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Asset {
  url: string
  alt: string
  description?: string
}

interface CategoryGalleryProps {
  item: {
    category: string
    assets: Asset[]
    description?: string
    price?: number | string
  }
}

export function CategoryGallery({ item }: CategoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null)

  return (
    <div className="flex flex-col">
      {/* En-tête avec description et prix */}
      <div className="max-w-3xl mx-auto space-y-2 mb-4 md:mb-6">
        {item.description && (
          <p className="text-lg text-gray-700 text-center">
            {item.description}
          </p>
        )}
        {item.price && (
          <p className="text-xl font-semibold text-center">
            Tarif: {typeof item.price === 'number' ? `${item.price}€` : item.price}
          </p>
        )}
      </div>

      {/* Grille d'images */}
      <div className="px-4 md:px-0 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {item.assets.map((asset, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(asset)}
            >
              <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] overflow-hidden">
                <Image
                  src={asset.url}
                  alt={asset.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain bg-white"
                  quality={80}
                  priority={index === 0}
                />
                {asset.description && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm">
                      {asset.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour l'image sélectionnée */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] aspect-auto">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              fill
              className="object-contain"
            />
            {selectedImage.description && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
                <p className="text-white text-center">
                  {selectedImage.description}
                </p>
              </div>
            )}
          </div>
          <button
            className="absolute top-4 right-4 text-white text-xl p-2"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
} 