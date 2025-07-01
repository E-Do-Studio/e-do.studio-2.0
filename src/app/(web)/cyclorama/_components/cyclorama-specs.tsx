'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { ReceiptEuro, PocketKnife, HandHelping, DiamondPlus, Camera, BadgeEuro, Euro } from 'lucide-react'
interface AmenityProps {
  translationKey: string
}

function Amenity({ translationKey }: AmenityProps) {
  const { t } = useTranslation('cyclorama')
  return (
    <div className="flex space-x-2">
      <span>• {t(`specs.amenities.${translationKey}`)}</span>
    </div>
  )
}

function Introduction() {
  const { t } = useTranslation('cyclorama')
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between gap-8'>
      <div className="flex flex-col gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium mb-4">{t('specs.title')}</h2>
          {/* <h3 className="text-5xl font-light mb-4">30m²</h3> */}
          <p className='min-w-full'>
            {t('specs.dimensions.sides')}
          </p>
          <p className='min-w-full'>
            {t('specs.dimensions.size')}
          </p>
        </div>

        <div className="block lg:hidden">
          <div className="flex justify-center">
            <Image
              src="/cyclo/cyclo-plan.svg"
              alt="Cyclorama"
              className='w-auto h-64'
              width={800}
              height={600}
            />
          </div>
        </div>

        <p className='max-w-xl sm:text-left text-center sm:mx-0 mx-auto'>
          {t('specs.description')}
        </p>
      </div>

      <div className="hidden lg:flex justify-center">
        <Image
          src="/cyclo/cyclo-plan.svg"
          alt="Cyclorama"
          className='w-auto h-72 mr-40'
          width={800}
          height={600}
        />
      </div>
    </div>
  )
}

function AmenitiesList() {
  const amenities = [
    'kitchen',
    'makeup',
    'sound',
    'wifi',
    'relax',
    'changing',
    'door',
    'parking',
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
    <div className="flex flex-col">
      <h3 className="text-2xl font-medium mb-4 flex flex-row gap-1 items-center">{t('rental.title')} <img className='w-11 h-11' src="img/icon-tarif.png" alt="" /> </h3>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-10'>
          <p>{t('rental.estimate')}</p>
          <Link href="/#contact">
            <Button
              size="lg"
            >
              {t('cta.contact')}
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
    <div className="grid grid-cols-1 md:grid-cols-2 text-sm gap-8 md:gap-4">
      {/* Utilisation de hauteur fixe pour les titres */}
      <div className='flex flex-col gap-4'>
        <div className='h-14 flex items-center'>
          <h3 className='text-2xl font-medium flex flex-row gap-2 items-center'>
            {t('services.production.title')}
            <DiamondPlus className='w-6 h-6' />
          </h3>
        </div>
        <p dangerouslySetInnerHTML={{ __html: t('services.production.description') }}></p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='h-14 flex items-center'>
          <h3 className='text-2xl font-medium flex flex-row gap-2 items-center'>
            {t('services.equipment.title')}
            <img src="/img/icon-location.png" alt="" className='w-6 h-6' />
          </h3>
        </div>
        <p dangerouslySetInnerHTML={{ __html: t('services.equipment.description') }}></p>
      </div>
    </div>
  )
}

export function CycloramaSpecs() {
  return (
    <Section className="!mt-0 !mb-2">
      <Card className="bg-neutral-100 border-none shadow-none rounded-2xl px-4 py-4 md:px-8 md:py-4 md:mb-0">

        <Introduction />
        <Separator className="my-3" />
        <AmenitiesList />

      </Card>

      <Card className="bg-neutral-100 border-none shadow-none rounded-2xl px-4 py-4 md:px-8 md:py-4 mt-2">


        <ServicesInfo />
        <Separator className="my-3" />

        <RentalSection />
      </Card>
    </Section>
  )
}


