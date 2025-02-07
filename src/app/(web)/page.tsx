'use client'

import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { ServiceSection } from './_components/service-section'
import { Location } from './_components/location'
import { OurCustomers } from './_components/our-customers'
import { Introduction } from './_components/introduction'

export default function Page() {

  return (
    <div className="text-xl min-h-screen">
      <Introduction />
      <div className="container">
        <section id="services" className="scroll-mt-24">
          <ServiceSection />
        </section>
        <section id="pricing" className="scroll-mt-24">
          <PricingSection />
        </section>
        <OurCustomers />
        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>
        <Location />
      </div>
    </div>
  )
}
