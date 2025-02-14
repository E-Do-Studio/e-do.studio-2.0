'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function CycloramaSpecs() {
  const { t } = useTranslation('cyclorama')

  return (
    <section className="w-full bg-white text-black pt-24 pb-16">
      <div className="bg-neutral-100 rounded-2xl py-8 md:py-12 mb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Introduction & Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
            <p className="text-lg leading-relaxed text-neutral-600">
              {t('We know that the comfort takes part in the good progress of creations so we have equipped our photo studio with all the necessary amenities.')}
            </p>
            <div className="md:text-right">
              <h3 className="text-5xl font-light mb-4">30m²</h3>
              <p className="text-2xl font-light text-neutral-800">
                {t('Cyclo 2 sides')}<br />
                {t('6m L x 5m W x 4,7m H')}
              </p>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {[
              'Sectional door on yard',
              'Changing rooms',
              'Make-up stations',
              'Water fountain',
              'Equipped kitchen',
              'Relaxation area',
              '4 Speakers Sonos Airplay',
              'Parking spaces'
            ].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 bg-black rounded-full" />
                <span className="text-neutral-800">{t(amenity)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rental & Services Section */}
      <div className="bg-neutral-100 rounded-2xl py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
            <div>
              <h3 className="text-3xl font-light mb-3">{t('RENTAL')}</h3>
              <p className="text-lg text-gray-600 mb-4">{t('On estimate : contact us')}</p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-black text-white hover:bg-black/90 rounded-full"
                >
                  {t('Book')}
                </Button>
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium mb-2">{t('PRICES')}</p>
              <div className="bg-black text-white px-3 py-2 rounded-lg w-fit">
                <p className="text-sm whitespace-nowrap">*{t('Weekend fee 25%.')}</p>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <p className="text-neutral-600">
              {t('Add all the services you may need at the production level, photographers, project managers, producers, stylists, MUA, studio assistants, casting and more.')}
            </p>
            <p className="text-neutral-600 md:text-right">
              {t('For any equipment requests, our photo equipment rental service offers a vast catalog of lighting, accessories, cameras and production equipment, on quotation.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}