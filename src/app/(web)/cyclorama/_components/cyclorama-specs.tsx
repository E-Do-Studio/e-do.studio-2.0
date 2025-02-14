'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AmenityProps {
  text: string
}

function Amenity({ text }: AmenityProps) {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="flex items-center space-x-2">
      <span>{t(text)}</span>
    </div>
  )
}

function Introduction() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <p className='max-w-xl'>
        {t('We know that the comfort takes part in the good progress of creations so we have equipped our photo studio with all the necessary amenities.')}
      </p>
      <div className="max-w-xl md:text-right">
        <h3 className="text-5xl font-light mb-4">30m²</h3>
        <p className='min-w-full'>
          {t('Cyclo 2 sides')}<br />
          {t('6m L x 5m W x 4,7m H')}
        </p>
      </div>
    </div>
  )
}

function AmenitiesList() {
  const amenities = [
    'Sectional door on yard',
    'Changing rooms',
    'Make-up stations',
    'Water fountain',
    'Equipped kitchen',
    'Relaxation area',
    '4 Speakers Sonos Airplay',
    'Parking spaces'
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map((amenity) => (
        <Amenity key={amenity} text={amenity} />
      ))}
    </div>
  )
}

function RentalSection() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">

      <h3 className="text-3xl font-light mb-3">{t('RENTAL')}</h3>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p>{t('On estimate : contact us')}</p>
          <Link href="/#contact">
            <Button
              size="lg"
            >
              {t('Book')}
            </Button>
          </Link>

        </div>

        <div className="flex flex-col justify-center gap-2">
          <p>{t('PRICES')}</p>
          <Badge variant="outline" className='w-fit hover:bg-transparent'>
            *{t('Weekend fee 25%.')}
          </Badge>
        </div>
      </div>

    </div>
  )
}

function ServicesInfo() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
      <p>
        {t('Add all the services you may need at the production level, photographers, project managers, producers, stylists, MUA, studio assistants, casting and more.')}
      </p>
      <p>
        {t('For any equipment requests, our photo equipment rental service offers a vast catalog of lighting, accessories, cameras and production equipment, on quotation.')}
      </p>
    </div>
  )
}

export function CycloramaSpecs() {
  return (
    <Section className="mt-0">
      <Card className="bg-neutral-100 border-none shadow-none rounded-2xl px-4 py-8 md:px-8 md:py-16">

        <Introduction />
        <Separator className="my-8" />
        <AmenitiesList />

      </Card>

      <Card className="bg-neutral-100 border-none shadow-none rounded-2xl px-4 py-8 md:px-8 md:py-16">

        <RentalSection />
        <Separator className="my-8" />
        <ServicesInfo />

      </Card>
    </Section>
  )
}


