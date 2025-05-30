'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ServiceViewProps {
  namespace: string;
  title?: string;
  imageUrl?: string;
  process?: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  children?: React.ReactNode;
  showPricing?: boolean;
}

export function ServiceView({
  namespace,
  title,
  imageUrl,
  process,
  children,
  showPricing = true
}: ServiceViewProps) {
  const { t, i18n } = useTranslation(namespace)
  const { t: tLayout } = useTranslation('layout')

  // Fallback image if none provided
  const fallbackImage = '/images/services/default-service.jpg'

  // Check if translation exists
  const hasTranslation = Object.keys(i18n.getDataByLanguage(i18n.language) || {}).includes(namespace)

  return (
    <Section
      title={title || t('title')}
      image={() => (
        <div className="w-full max-w-[500px] mx-auto">
          <Image
            src={imageUrl || fallbackImage}
            alt={title || t('title', namespace)}
            width={500}
            height={375}
            className="w-full h-auto"
            priority
          />
        </div>
      )}
      description={
        () => (
          <div className='flex flex-col gap-4'>
            <div className="mb-4 whitespace-pre-line">
              {hasTranslation ? t('description') :
                "Notre service professionnel offre une solution complète pour répondre à vos besoins spécifiques. Avec une expertise technique avancée et une attention particulière aux détails, nous garantissons des résultats de haute qualité qui dépasseront vos attentes."}
            </div>

            <div className='flex gap-4 mt-2'>
              <Link href="/reservation">
                <Button size="lg" className="w-auto px-6">
                  {tLayout('header.cta.book')}
                </Button>
              </Link>
            </div>
          </div>
        )
      }
    >
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

      {hasTranslation && t('pricing.items', { returnObjects: true }) && t('features.list', { returnObjects: true }) && (
        <div className="mt-12 bg-neutral-100 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tarifs */}
            <div>
              <h3 className="text-2xl font-medium mb-6">{t('pricing.title')}</h3>
              <div className="space-y-4">
                {(t('pricing.items', { returnObjects: true }) as any[]).map((item, index) => (
                  <div key={index} className="border-b border-neutral-200 py-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium">{item.duration}</h4>
                        <div className="text-neutral-600 inline-block">
                          <span className="inline-block whitespace-nowrap">{item.time || item.description}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold">{item.price}</p>
                        <p className="text-sm text-neutral-500">HT</p>
                        <p className="text-sm text-neutral-500">{item.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
      {children}
    </Section>
  )
}
