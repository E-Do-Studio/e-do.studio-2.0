"use server"

import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { ServiceSection } from './_components/service-section'
import { LocationSection } from './_components/location-section'
import { OurCustomersSection } from './_components/our-customers-section'
import { Introduction } from './_components/introduction'

import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function Page() {
  const payload = await getPayload({ config })
  const categoriesResponse = await payload.find({
    collection: 'categories',
    depth: 2,
  })

  return (
    <div className="text-xl min-h-screen">
      <Introduction />
      <div className="container">
        <ServiceSection />
        <PricingSection categories={categoriesResponse} />
        <OurCustomersSection />
        <ContactSection />
        <LocationSection />
      </div>
    </div>
  )
}

