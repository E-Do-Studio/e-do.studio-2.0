'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { CycloramaGallery } from './cyclorama-gallery'
import { CycloramaSpecs } from './cyclorama-specs'
import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/layout/section'

export function CycloramaView() {
  const { t } = useTranslation('cyclorama')

  return (
    <Section title="CYCLORAMA" subtitle={t('FREE PRODUCTION')} image={
      () => (
        <Image
          src="/cyclo/cyclo-plan.svg"
          alt="Plan du cyclorama"
          className='size-full md:w-auto'
          width={400}
          height={240}
          priority
        />
      )
    }
      description={
        () => (
          <div className='flex flex-col gap-2'>
            <p className="mb-8">
              {t('Our cyclorama allows you to mobilize a production team and take your photos and videos on an infinite white background. With a height of 4.70m and a depth of 10m, you have free rein for any type of design set.')}
            </p>
            <div className='flex gap-4'>
              <Link href="/contact">
                <Button size="lg" className="w-44">
                  {t('Book')}
                </Button>
              </Link>
              <p className="text-sm opacity-70">* {t('Starting at 800€ excl. tax')}</p>
            </div>
          </div>
        )
      }

    >
      <CycloramaGallery />
      <CycloramaSpecs />
    </Section >

  )
} 
