"use server"

import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { ServiceSection } from './_components/service-section'
import { LocationSection } from './_components/location-section'
import { OurCustomersSection } from './_components/our-customers-section'
import { Introduction } from './_components/introduction'
import { Accompagnement } from './_components/accompagnement'
import { VideoSection } from './_components/video-section'
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
      <h1 className="sr-only">E-Do Studio - Studio de photographie professionnel</h1>
      <Introduction />
      <div className="container">
        <ServiceSection />
        <PricingSection categories={categoriesResponse} />
        <Accompagnement />
        <OurCustomersSection />
        <VideoSection />
        <ContactSection />
        <LocationSection />
      </div>
    </div>
  )
}

