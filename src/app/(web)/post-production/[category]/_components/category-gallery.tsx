'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PostProductionDocument } from '../page'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
interface Asset {
  url: string
  alt: string
  description?: string
}

interface CategoryGalleryProps {
  item: PostProductionDocument
}

export function CategoryGallery({ item }: CategoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null)
  const { t } = useTranslation("post-prod")
  return (
    <div className="space-y-8">
      <div className='flex flex-col md:flex-row justify-between gap-8 md:gap-40'>
        {/* {item.description && (
          <div className="prose max-w-none flex-1">
            <p>{item.description}</p>
          </div>
        )} */}
        {item.subcategories && item.subcategories.length > 0 ? (
          <div className="space-y-4 flex-1">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="p-4 rounded-lg border border-border"
                >
                  <div className="font-medium">{subcategory.name}</div>
                  <div className="text-lg font-bold">
                    {subcategory.price.toFixed(2)}€
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <p>{t('post-production.on_quotation')}</p>
          </div>
        )}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {item.assets.map((asset, index) => (
          <div
            key={index}
            className="relative w-full"
            onClick={() => setSelectedImage(asset)}
          >
            <div className="relative w-full h-auto">
              <Image
                src={asset.url}
                alt={asset.alt}
                className="w-full h-auto object-contain bg-white"
                width={800}
                height={1200}
                priority={index < 3}
              />
            </div>
          </div>
        ))}
      </div>


      {/* {selectedImage && (
        <GalleryItemOverlay selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      )} */}
    </div>
  )
}


export const GalleryItemOverlay = ({ selectedImage, setSelectedImage }: { selectedImage: Asset, setSelectedImage: (image: Asset | null) => void }) => {
  return (
    <div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-16"
      onClick={() => setSelectedImage(null)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50"
        onClick={(e) => {
          e.stopPropagation()
          setSelectedImage(null)
        }}
      >
        <X className="h-16 w-16" />
      </Button>

      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          className="max-h-full w-auto object-contain"
          width={1200}
          height={1600}
          priority
        />
      </div>
    </div>
  )
}