'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AmenityProps {
  translationKey: string
}

function Amenity({ translationKey }: AmenityProps) {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="flex items-center space-x-2">
      <span>{t(`specs.amenities.${translationKey}`)}</span>
    </div>
  )
}

function Introduction() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <p className='max-w-xl'>
        {t('specs.description')}
      </p>
      <div className="max-w-xl md:text-right">
        <h3 className="text-5xl font-light mb-4">30m²</h3>
        <p className='min-w-full'>
          {t('specs.dimensions.sides')}<br />
          {t('specs.dimensions.size')}
        </p>
      </div>
    </div>
  )
}

function AmenitiesList() {
  const amenities = [
    'kitchen',
    'makeup',
    'sound',
    'parking',
    'relax',
    'changing',
    'door'
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map((amenity) => (
        <Amenity key={amenity} translationKey={amenity} />
      ))}
    </div>
  )
}

function RentalSection() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">

      <h3 className="text-3xl font-light mb-3">{t('rental.title')}</h3>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p>{t('rental.estimate')}</p>
          <Link href="/#contact">
            <Button
              size="lg"
            >
              {t('cta.book')}
            </Button>
          </Link>

        </div>

        {/* <div className="flex flex-col justify-center gap-2">
          <p>{t('rental.prices.title')}</p>
          <Badge variant="outline" className='w-fit hover:bg-transparent'>
            *{t('rental.prices.weekend')}
          </Badge>
        </div> */}
      </div>

    </div>
  )
}

function ServicesInfo() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
      <p>
        {t('services.production')}
      </p>
      <p>
        {t('services.equipment')}
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


