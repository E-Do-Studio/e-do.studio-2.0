'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { CycloramaGallery } from './cyclorama-gallery'
import { CycloramaSpecs } from './cyclorama-specs'
import Link from 'next/link'
import { Section } from '@/components/layout/section'
import { CycloramaModel } from './cyclorama-model'

export function CycloramaView() {
  const { t } = useTranslation('cyclorama')

  return (
    <Section
      title="CYCLORAMA"
      image={() => <CycloramaModel />}
      description={
        () => (
          <div className='flex flex-col gap-2'>
            <p className="mb-8 text-lg">
              {t('description')}
            </p>
            <div className='flex gap-4'>
              <Link href="/#contact">
                <Button size="lg">
                  {t('cta.contact')}
                </Button>
              </Link>
            </div>
          </div>
        )
      }
      className="!mt-0 pt-32 !gap-2"
    >
      <CycloramaGallery />
      <CycloramaSpecs />
    </Section>
  )
} 
