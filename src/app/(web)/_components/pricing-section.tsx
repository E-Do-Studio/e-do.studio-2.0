import { Machines } from '@/app/(web)/_components/machines'
import { LandingSection } from '@/components/layout/landing-section'

export const PricingSection = () => {
  return (
    <LandingSection title="Choisissez l’offre qui vous correspond">
      <Machines />
    </LandingSection>
  )
}
