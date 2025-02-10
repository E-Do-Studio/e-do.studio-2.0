'use client'

import { useTranslation } from 'react-i18next'
import { Machines } from '@/app/(web)/_components/machines'
import { LandingSection } from '@/components/layout/landing-section'

export const PricingSection = ({ categories }: { categories: any }) => {
  const { t } = useTranslation('home')

  return (
    <LandingSection title={t('pricing.title')} id='pricing'>
      <Machines categories={categories} />
    </LandingSection>
  )
}
