'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LandingSection } from '@/components/layout/landing-section'
import { CycloramaGallery } from './cyclorama-gallery'
import { CycloramaSpecs } from './cyclorama-specs'
import Link from 'next/link'
import Image from 'next/image'

export function CycloramaView() {
  const { t } = useTranslation('cyclorama')

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
            <div className="flex-1 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">CYCLORAMA</h1>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('FREE PRODUCTION')}</h2>
              <p className="text-lg mb-8">
                {t('Our cyclorama allows you to mobilize a production team and take your photos and videos on an infinite white background. With a height of 4.70m and a depth of 10m, you have free rein for any type of design set.')}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="w-44">
                    {t('Book')}
                  </Button>
                </Link>
                <p className="text-sm opacity-70">* {t('Starting at 800€ excl. tax')}</p>
              </div>
              <Link 
                href="/documents/cyclorama-brochure.pdf" 
                className="block mt-6 underline hover:opacity-70"
              >
                {t('Get the Cyclorama brochure')}
              </Link>
            </div>
            <div className="w-full md:w-[400px]">
              <Image
                src="/cyclo/cyclo-plan.svg"
                alt="Plan du cyclorama"
                width={400}
                height={240}
                className="w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <CycloramaGallery />

      {/* Specifications Section */}
      <CycloramaSpecs />
    </div>
  )
} 