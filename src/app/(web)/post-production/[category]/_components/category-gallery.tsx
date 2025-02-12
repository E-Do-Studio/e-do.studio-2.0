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
    <div className="pt-24 min-h-[calc(100vh-17rem)]">
      {/* En-tête avec description et prix */}
      <div className="max-w-3xl mx-auto space-y-4 mb-24">
        {item.description && (
          <p className="text-lg text-gray-700 text-center">
            {item.description}
          </p>
        )}
        {item.price && (
          <p className="text-xl font-semibold text-center">
            Prix: {typeof item.price === 'number' ? `${item.price}€` : item.price}
          </p>
        )}
      </div>

      {/* Grille d'images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-0">
        {item.assets.map((asset, index) => (
          <div
            key={index}
            className="group cursor-pointer"
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