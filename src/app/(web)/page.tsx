"use server"

import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { ServiceSection } from './_components/service-section'
import { LocationSection } from './_components/location-section'
import { OurCustomersSection } from './_components/our-customers-section'
import { Introduction } from './_components/introduction'

import { getPayload } from 'payload'
import config from '@/payload.config'

function getRandomElements<T>(array: T[], n: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

export default async function Page() {
  const payload = await getPayload({ config })
  const categoriesResponse = await payload.find({
    collection: 'categories',
    depth: 2,
  })

  // Pour chaque catégorie, sélectionner 10 assets aléatoires
  const categoriesWithRandomAssets = {
    ...categoriesResponse,
    docs: categoriesResponse.docs.map(category => ({
      ...category,
      assets: getRandomElements(category.assets, 10)
    }))
  }

  return (
    <div className="text-xl min-h-screen">
      <Introduction />
      <div className="container">
        <ServiceSection />
        <PricingSection categories={categoriesWithRandomAssets} />
        <OurCustomersSection />
        <ContactSection />
        <LocationSection />
      </div>
    </div>
  )
}

