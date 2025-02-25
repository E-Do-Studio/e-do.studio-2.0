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
    <Section title="CYCLORAMA" subtitle={t('title')} image={
      () => (
        <Image
          src="/cyclo/cyclo-plan.svg"
          alt="Plan du cyclorama"
          className='size-full md:w-auto md:h-[50vh] md:pr-40 md:pt-14'
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
              {t('description')}
            </p>
            <div className='flex gap-4'>
              <Link href="/contact">
                <Button size="lg" className="w-44">
                  {t('cta.book')}
                </Button>
              </Link>
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
