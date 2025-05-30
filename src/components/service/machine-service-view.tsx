'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface MachineServiceViewProps {
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

export function MachineServiceView({
  namespace,
  title,
  imageUrl,
  process,
  children,
  showPricing = true
}: MachineServiceViewProps) {
  const { t } = useTranslation(namespace)
  const hasTranslation = !!t

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{title || t('title')}</h1>
          <h2 className="text-2xl font-medium mb-6">{t('subtitle')}</h2>
          <p className="text-lg mb-8">{t('description')}</p>
          <Link href="/#contact">
            <Button size="lg">
              {t('cta', { defaultValue: 'Contact us' })}
            </Button>
          </Link>
        </div>
        {imageUrl && (
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={title || t('title')}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>

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
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-medium">{item.duration}</h4>
                        <p className="text-neutral-600">{item.time}</p>
                      </div>
                      <p className="text-xl font-semibold">{item.price}</p>
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
    </div>
  )
}
