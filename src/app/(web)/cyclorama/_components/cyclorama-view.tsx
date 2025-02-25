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
          src="/img/machine-cyclorama.webp"
          alt="Machine de cyclorama"
          className="size-full md:w-auto md:h-[35vh] md:pr-40 object-contain"
          width={800}
          height={600}
          quality={90}
          priority
          sizes="(max-width: 768px) 100vw, 800px"
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
              <Link href="/#contact">
                <Button size="lg" className="w-44">
                  {t('cta.contact')}
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
