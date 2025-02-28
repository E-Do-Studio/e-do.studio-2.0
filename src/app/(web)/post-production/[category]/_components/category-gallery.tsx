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
  brand?: {
    name: string
  }
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
                    {t('post-production.a_partir_de')} {subcategory.price.toFixed(2)}&euro;
                  </div>
                  <div className="text-sm text-end text-muted-foreground">
                    {t('post-production.hors_taxe')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 rounded-lg border border-border p-4">
            <p>{t('post-production.on_quotation')}</p>
          </div>
        )}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {item.assets.map((asset, index) => (
          <div
            key={index}
            className="relative w-full aspect-[3/4] cursor-pointer group overflow-hidden"
            onClick={() => setSelectedImage(asset)}
          >
            <Image
              src={asset.url}
              alt={asset.alt}
              className="object-cover bg-white transition-all duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
                <p className="text-white text-lg tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  {asset.brand?.name?.toUpperCase() || 'SANS MARQUE'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {selectedImage && (
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
      )}
    </div>
  )
}
