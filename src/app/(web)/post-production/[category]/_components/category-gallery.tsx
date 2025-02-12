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
  }
}

export function CategoryGallery({ item }: CategoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null)

  return (
    <div className="space-y-8">
      {/* Description générale si elle existe */}
      {item.description && (
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          {item.description}
        </p>
      )}

      {/* Grille d'images en ligne */}
      <div className="flex flex-nowrap gap-4 overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-5 pb-4">
        {item.assets.map((asset, index) => (
          <div
            key={index}
            className="group cursor-pointer w-[280px] md:w-auto flex-shrink-0"
            onClick={() => setSelectedImage(asset)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={asset.url}
                alt={asset.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
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