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
            <p className="mb-8">
              {t('description')}
            </p>
            <div className='flex gap-4'>
              <Link
                href="/#contact"
                prefetch={true}
                scroll={false}
                className="inline-block"
              >
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
    </Section>
  )
} 
