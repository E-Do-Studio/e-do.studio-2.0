'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { ImageGrid } from '@/components/ui/image-grid'

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
      className="container"
      title={title || t('title')}
      image={() => (
        <div className="w-80 flex-1 md:w-full md:flex md:justify-end">
          <div className="relative w-full h-auto min-h-[400px] md:min-h-[500px] overflow-hidden rounded-lg">
            {imageUrls && imageUrls.length > 0 ? (
              // Afficher la grille d'images si des images sont fournies
              <div className="w-full h-full p-0 m-0">
                {/* Grille d'images 3x3 avec transitions douces */}
                <ImageGrid
                  images={imageUrls}
                  alt={title || t('title')}
                  gridSize={9}
                  changeInterval={3000}
                  className="w-full p-0 m-0"
                />
              </div>
            ) : (
              // Sinon, afficher l'image statique
              <Image
                src={imageUrl || '/img/placeholder.jpg'}
                alt={title || t('title')}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      )}
      description={() => (
        <div className="flex flex-col gap-4">
          <p className="text-lg whitespace-pre-line">{t('description')}</p>
          <Link href="/#contact">
            <Button size="lg">
              {t('cta', { defaultValue: 'Contact us' })}
            </Button>
          </Link>
        </div>
      )}
    >
      {/* Process Section */}
      {hasTranslation && t('process', { returnObjects: true }) && t('process.steps', { returnObjects: true }) && (
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-medium mb-6">{t('process.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('process.steps', { returnObjects: true }) as any[]).map((step: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
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

      {/* Pricing and Features Section */}
      {hasTranslation && t('pricing.items', { returnObjects: true }) && t('features.list', { returnObjects: true }) && showPricing && (
        <div className="mt-12 bg-neutral-100 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tarifs */}
            <div>
              <h3 className="text-2xl font-medium mb-6">{t('pricing.title')}</h3>
              <div className="space-y-4">
                {(t('pricing.items', { returnObjects: true }) as any[]).map((item, index) => (
                  <div key={index} className="border-b border-neutral-200 py-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium">{item.duration}</h4>
                        <p className="text-neutral-600">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <div>
                          <p className="text-xl font-semibold">{item.price}€</p>
                          <p className="text-neutral-600 text-sm">{tHome('pricing.tax')}</p>
                          <p className="text-neutral-600 text-sm mt-1 whitespace-nowrap">{item.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {t('pricing.weekend') && (
                  <p className="text-sm text-neutral-600 mt-4 italic">{t('pricing.weekend')}</p>
                )}
              </div>
            </div>

            {/* Caractéristiques */}
            <div>
              <h3 className="text-2xl font-medium mb-6">{t('features.title')}</h3>
              <ul className="space-y-3">
                {(t('features.list', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary text-xl">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
