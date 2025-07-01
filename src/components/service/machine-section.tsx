'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { MotionCarousel } from '@/components/ui/motion-carousel'

interface MachineSectionProps {
  namespace: string;
  title?: string;
  imageUrl?: string;
  imageUrls?: string[];
  showPricing?: boolean;
}

export function MachineSection({
  namespace,
  title,
  imageUrl,
  imageUrls,
  showPricing = true
}: MachineSectionProps) {
  const { t } = useTranslation(namespace)
  const { t: tHome } = useTranslation('home')
  const hasTranslation = !!t

  return (
    <Section
      className="container !gap-4"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 !mt-0 !pt-0">
        {/* Colonne de gauche avec titre et description */}
        <div className="flex-1 flex flex-col gap-4">
          <h1>{(title || t('title')).toUpperCase()}</h1>
          <div className="flex flex-col gap-4">
            {/* Utiliser un div au lieu d'un p pour pouvoir appliquer des styles spécifiques à chaque ligne */}
            <div className="text-lg">
              {t('description').split('\n').map((line, index) => (
                <div key={index} className="md:whitespace-nowrap overflow-visible mb-2">{line}</div>
              ))}
            </div>
            <Link href="/#contact">
              <Button size="lg">
                {t('cta', { defaultValue: 'Contact us' })}
              </Button>
            </Link>
          </div>
        </div>

        {/* Colonne de droite avec le carousel */}
        <div className="w-full lg:w-1/2 lg:max-w-[50%]">
          <div className="relative w-full h-auto min-h-[320px] md:min-h-[400px] overflow-visible rounded-lg">
            {imageUrls && imageUrls.length > 0 ? (
              // Afficher la grille d'images si des images sont fournies
              <div className="w-full h-full p-0 m-0">
                {/* Grille d'images avec animations Motion One */}
                <MotionCarousel
                  images={imageUrls}
                  alt={title || t('title')}
                  gridSize={9}
                  className="w-full h-full p-0 m-0"
                />
              </div>
            ) : (
              // Sinon, afficher l'image statique
              <Image
                src={imageUrl || '/img/placeholder.jpg'}
                alt={title || t('title')}
                fill
                className="object-contain bg-transparent"
                priority
              />
            )}
          </div>
        </div>
      </div>
      {/* Process Section */}
      {hasTranslation && t('process', { returnObjects: true }) && t('process.steps', { returnObjects: true }) && (
        <div className="mt-4 mb-4">
          <h2 className="text-2xl font-medium mb-6">{t('process.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('process.steps', { returnObjects: true }) as any[]).map((step: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {hasTranslation && t('pricing.items', { returnObjects: true }) && showPricing && (
        <div className="mt-4">
          <h3 className="text-2xl font-medium mb-6">{t('pricing.title')}</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {(t('pricing.items', { returnObjects: true }) as any[]).map((item, index) => (
              <div
                key={index}
                className="flex-1 flex justify-between md:flex-col gap-4 p-4 bg-neutral-100 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="flex flex-col">
                  <h3 className="">{item.duration}</h3>
                  <p className="text-neutral-500">{item.description}</p>
                </div>
                <div className="hidden md:block border-t border-neutral-200 mt-4 pt-4"></div>
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                  <p className="text-2xl font-medium">
                    {item.price}€ <span className="text-sm">{tHome('pricing.tax')}</span>
                  </p>
                  <p className="text-sm text-neutral-500">{t('pricing.weekend') || item.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
