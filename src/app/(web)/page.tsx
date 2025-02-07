'use client'

import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { ServiceSection } from './_components/service-section'
import { LocationSection } from './_components/location-section'
import { OurCustomersSection } from './_components/our-customers-section'
import { Introduction } from './_components/introduction'

export default function Page() {

  return (
    <div className="text-xl min-h-screen">
      <Introduction />
      <div className="container">
        <ServiceSection />
        <PricingSection />
        <OurCustomersSection />
        <ContactSection />
        <LocationSection />
      </div>
    </div>
  )
}
